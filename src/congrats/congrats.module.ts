import { Module } from '@nestjs/common';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Congrats, CongratsSchema } from './entities/congrats.schema';
import { CongratsService } from './congrats.service';
import { CongratsController } from './congrats.controller';



@Module({
  imports:[ 
    MongooseModule.forFeature([
      { name: Congrats.name, schema: CongratsSchema}
    ])
  ],
  controllers: [CongratsController],
  providers: [CongratsService]
})
export class CongratsModule {}
