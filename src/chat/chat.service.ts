import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Clients } from './clients.interface';
import { InversionistaService } from '../inversionista/inversionista.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Inversionista } from 'src/inversionista/inversionista.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  private clients: Clients = {};

  constructor(
    @InjectRepository(Inversionista)
    private readonly inversionistaRepository: Repository<Inversionista>,
    private readonly inversionistaService: InversionistaService,
  ) {}

  async registerClient(client: Socket, name: string) {
    console.log('Attempt to login: ', name);
    const inversionista = await this.inversionistaService.findOneByName(name);
    if (!inversionista) throw new Error(`Inversionista ${name} not found`);
    if (this.findClientByName(name)) {
      console.error(`Inversionista ${name} already logged in`);
      throw new Error(`Inversionista ${name} already logged in`);
    }

    this.clients[client.id] = { socket: client, user: inversionista };
  }

  removeClient(clientId: string) {
    delete this.clients[clientId];
  }

  getClients() {
    return Object.values(this.clients).map((client) => client.user.name);
  }

  getClientName(clientId: string) {
    return this.clients[clientId].user.name;
  }

  private findClientByName(name: string) {
    return Object.values(this.clients).find(
      (client) => client.user.name === name,
    );
  }
}
