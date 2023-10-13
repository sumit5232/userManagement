import { Module } from '@nestjs/common';
import { ThemeJsonService } from './theme-element-json.service';
import { ThemeJsonController } from './theme-elements-json.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { ThemeJson, ThemeJsonSchema } from './entites/theme-element-json.schema';


@Module({
  imports:[ 
    MongooseModule.forFeature([
      { name: ThemeJson.name, schema: ThemeJsonSchema}
    ])
  ],
  controllers: [ThemeJsonController],
  providers: [ThemeJsonService]
})
export class ThemeJsonModule {}
