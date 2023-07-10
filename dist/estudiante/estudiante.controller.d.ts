import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { Estudiante } from './entities/estudiante.entity';
export declare class EstudianteController {
    private readonly estudianteService;
    constructor(estudianteService: EstudianteService);
    create(createEstudianteDto: CreateEstudianteDto): Estudiante;
    findAll(): Estudiante[];
    findOne(id: number): Estudiante;
    update(id: string, updateEstudianteDto: UpdateEstudianteDto): Estudiante;
    remove(id: string): void;
}
