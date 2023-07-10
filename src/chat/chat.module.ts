import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { InversionistaModule } from '../inversionista/inversionista.module';
import { InversionistaController } from 'src/inversionista/inversionista.controller';

@Module({
  providers: [ChatGateway, ChatService],
  imports: [InversionistaModule],
})
export class ChatModule {}
