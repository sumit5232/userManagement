import { Module } from '@nestjs/common';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { DomainSchema, DomainSetting } from 'src/domain/entities/domainsetting.schema';
import { ProductionController } from './production.controller';
import { ProductionService } from './production.service';
import { Congrats, CongratsSchema } from 'src/congrats/entities/congrats.schema';
import { Lander, LanderSchema } from 'src/lander/entities/lander.schema';
import { Quiz, QuizSchema } from 'src/quiz/entities/quiz.schema';
import { DomainService } from 'src/domain/domain.service';


@Module({
  imports:[ 
    MongooseModule.forFeature([
      { name: DomainSetting.name, schema: DomainSchema},
      { name: Congrats.name, schema: CongratsSchema},
      { name: Lander.name, schema: LanderSchema},
      { name: Quiz.name, schema: QuizSchema}
    ])
  ],
  controllers: [ProductionController],
  providers: [ProductionService, DomainService]
})
export class ProductionModule {}
