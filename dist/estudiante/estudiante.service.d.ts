import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { Estudiante } from './entities/estudiante.entity';
export declare class EstudianteService {
    private estudiantes;
    create(createEstudianteDto: CreateEstudianteDto): Estudiante;
    findAll(): Estudiante[];
    findOne(id: number): Estudiante;
    update(id: number, updateEstudianteDto: UpdateEstudianteDto): Estudiante;
    remove(id: number): void;
}
