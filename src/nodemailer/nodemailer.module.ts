import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { NodemailerService } from './nodemailer.service';

@Module({
  imports: [ConfigModule],
  providers: [NodemailerService],
  exports: [NodemailerService],
})
export class NodemailerModule {}
