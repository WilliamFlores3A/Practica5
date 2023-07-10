import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { Estudiante } from './entities/estudiante.entity';

@Injectable()
export class EstudianteService {

  private estudiantes: Estudiante[]=[
    {id:1, identificacion:'1' , nombre:'Uno', direccion:'a',telefono:'123', tipo:1, estado:true},
    {id:2, identificacion:'2' , nombre:'Dos', direccion:'b',telefono:'456', tipo:1, estado:true},
  ]

  create(createEstudianteDto: CreateEstudianteDto) {
    const estudiante = new Estudiante();
    estudiante.id=  Math.max( ... this.estudiantes.map(elemento => elemento.id),0 )+1 ;
    estudiante.nombre= createEstudianteDto.nombre;
    estudiante.direccion= createEstudianteDto.direccion;
    estudiante.telefono= createEstudianteDto.telefono;
    estudiante.identificacion= createEstudianteDto.identificacion;
    estudiante.tipo= createEstudianteDto.tipo;
    this.estudiantes.push(estudiante);
    return estudiante;
  }

  findAll() : Estudiante[] {
    return this.estudiantes;
  }

  findOne(id: number) {
    const estudiante =  this.estudiantes.find(estudiante=> estudiante.id===id);
    if (!estudiante) throw new NotFoundException(`ID ${id} not found`)
    return estudiante;
  }

  update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    const { identificacion, nombre, direccion, telefono, tipo, estado   } = updateEstudianteDto;
    const estudiante = this.findOne(id);
    if (nombre) estudiante.nombre= nombre;
    if (direccion) estudiante.direccion= direccion;
    if (telefono) estudiante.telefono= telefono;
    if (estado!= undefined) estudiante.estado= estado;

    this.estudiantes =  this.estudiantes.map( elemento=> {
      if (elemento.id===id) return estudiante;
      return elemento;
    } )

    return estudiante;

  }

  remove(id: number) {
    this.findOne(id);
    this.estudiantes =  this.estudiantes.filter(elemento=> elemento.id!== id);
  }
}
