import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Quiz, QuizDocument } from './entities/quiz.schema';


@Injectable()
export class QuizService {
    constructor(@InjectModel(Quiz.name) private quizModel: Model<QuizDocument>){

    }

    async create(payload: any){

        if (payload.slugName) {
            payload.slugName = payload.slugName.toLowerCase();
        }
        const result = new this.quizModel({...payload, timestamp: new Date()});
        await result.save();
        return result
    }

    async findAll(){
        return await this.quizModel.find({});
    }

    async getOne(quizName){
        return await this.quizModel.findOne({ quizName  })
    }

    async delete(id){
        await this.quizModel.deleteOne({ _id: id })
        return 
    }
}
