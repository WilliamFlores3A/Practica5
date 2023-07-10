import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { inversionista } from './inversionista.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateinversionistaDto } from './dto/create-inversionista.dto';
import { UpdateinversionistaDto } from './dto/update-inversionista.dto';

@Injectable()
export class inversionistaService {
  private readonly logger = new Logger('inversionistaService');

  constructor(
    @InjectRepository(inversionista)
    private readonly inversionistaRepository: Repository<inversionista>,
  ) {}

  async create(createinversionistaDto: CreateinversionistaDto): Promise<inversionista> {
    try {
      const inversionista = this.inversionistaRepository.create(createinversionistaDto);
      await this.inversionistaRepository.save(inversionista);
      return inversionista;
    } catch (error) {
      console.error(error);
      if (error.code === '23505') throw new BadRequestException(error.detail);
      this.logger.error(error);
      throw new InternalServerErrorException('Error creating inversionista');
    }
  }

  async findAll(): Promise<inversionista[]> {
    return await this.inversionistaRepository.find({});
  }

  async findOne(id: string): Promise<inversionista> {
    const inversionista = await this.inversionistaRepository.findOneBy({ id });
    if (!inversionista) throw new NotFoundException(`Inversionista ${id} not found`);
    return inversionista;
  }

  async findOneByName(name: string): Promise<inversionista> {
    const inversionista = await this.inversionistaRepository.findOneBy({ name });
    if (!inversionista) throw new NotFoundException(`Inversionista ${name} not found`);
    return inversionista;
  }

  async update(
    id: string,
    updateInversionistaDto: UpdateinversionistaDto,
  ): Promise<inversionista> {
    const inversionista = await this.inversionistaRepository.preload({
      id: id,
      ...updateInversionistaDto,
    });
    if (!inversionista) throw new NotFoundException(`Inversionista ${id} not found`);

    try {
      await this.inversionistaRepository.save(inversionista);
      return inversionista;
    } catch (error) {
      console.error(error);
    }
  }

  async remove(id: string): Promise<void> {
    const inversionista = await this.findOne(id);
    await this.inversionistaRepository.remove(inversionista);
  }
}
