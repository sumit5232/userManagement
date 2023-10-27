import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConfigService } from './config.service';
import { CreateConfigDto } from './dto/create-config.dto';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Post()
  create(@Body() createConfigDto: CreateConfigDto) {
    return this.configService.create(createConfigDto);
  }

  @Get()
  findConfig() {
    return this.configService.getConfig();
  }

  @Post('node-mailer')
  updateNodeMailerConfig(@Body() nodeMailerConfig) {
    return this.configService.updateNodeMailerConfig(nodeMailerConfig);
  }
}
