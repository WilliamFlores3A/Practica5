import {
  Body,
  Controller,
  Post,
  Get,
  ParseUUIDPipe,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { InversionistaService } from './inversionista.service';
import { CreateInversionistaDto } from './dto/create-inversionista.dto';
import { UpdateInversionistaDto } from './dto/update-inversionista.dto';

@Controller('inversionista')
export class InversionistaController {
  constructor(private readonly inversionistaService: InversionistaService) {}

  @Post()
  create(@Body() createInversionistaDto: CreateInversionistaDto) {
    return this.inversionistaService.create(createInversionistaDto);
  }

  @Get()
  findAll() {
    return this.inversionistaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.inversionistaService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateInversionistaDto: UpdateInversionistaDto,
  ) {
    return this.inversionistaService.update(id, updateInversionistaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.inversionistaService.remove(id);
  }
}
