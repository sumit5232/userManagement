import { Module } from '@nestjs/common';
import { ThemeConfigService } from './theme-elements-config.service';
import { ThemeConfigController } from './theme-elements-config.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { ThemeConfig, ThemeConfigSchema } from './entites/theme-config.schema';


@Module({
  imports:[ 
    MongooseModule.forFeature([
      { name: ThemeConfig.name, schema: ThemeConfigSchema}
    ])
  ],
  controllers: [ThemeConfigController],
  providers: [ThemeConfigService]
})
export class ThemeConfigModule {}
