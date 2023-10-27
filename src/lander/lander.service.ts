import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Lander, LanderDocument } from './entities/lander.schema';

@Injectable()
export class LanderService {
    constructor(@InjectModel(Lander.name) private landerModel: Model<LanderDocument>){

    }

    async create(payload){

        if (payload.slugName) {
            payload.slugName = payload.slugName.toLowerCase();
        }
        const result = new this.landerModel({...payload, timestamp: new Date()});
        await result.save();
        return result
    }

    async findAll(){
        return await this.landerModel.find({});
    }

    async getOne(landerName){
        return await this.landerModel.findOne({ landerName  })
    }

    async delete(id){
        await this.landerModel.deleteOne({ _id: id })
        return 
    }
}
