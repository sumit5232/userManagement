import { Module } from '@nestjs/common';

import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Quiz, QuizSchema } from './entities/quiz.schema';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';


@Module({
  imports:[ 
    MongooseModule.forFeature([
      { name: Quiz.name, schema: QuizSchema}
    ])
  ],
  controllers: [QuizController],
  providers: [QuizService]
})
export class QuizModule {}
