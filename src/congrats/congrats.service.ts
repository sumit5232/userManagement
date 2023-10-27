import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Congrats, CongratsDocument } from './entities/congrats.schema';



@Injectable()
export class CongratsService {
    constructor(@InjectModel(Congrats.name) private congratsModel: Model<CongratsDocument>){

    }

    async create(payload: any){

        if (payload.slugName) {
            payload.slugName = payload.slugName.toLowerCase();
        }
        const result = new this.congratsModel({...payload, timestamp: new Date()});
        await result.save();
        return result
    }

    async findAll(){
        return await this.congratsModel.find({});
    }

    async getOne(congratsName){
        return await this.congratsModel.findOne({ congratsName  })
    }

    async delete(id){
        await this.congratsModel.deleteOne({ _id: id })
        return 
    }
}
