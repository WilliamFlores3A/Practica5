import { Module } from '@nestjs/common';
import { InversionistaController } from './inversionista.controller';
import { InversionistaService } from './inversionista.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inversionista } from './inversionista.entity';

@Module({
  controllers: [InversionistaController],
  imports: [TypeOrmModule.forFeature([Inversionista])],
  providers: [InversionistaService],
  exports: [InversionistaService, TypeOrmModule],
})
export class InversionistaModule {}
