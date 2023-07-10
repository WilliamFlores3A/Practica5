import { Socket } from 'socket.io';
import { Inversionista } from '../inversionista/inversionista.entity';

export interface Clients {
  [id: string]: {
    socket: Socket;
    user: Inversionista;
  };
}
