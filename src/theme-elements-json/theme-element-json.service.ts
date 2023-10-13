import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ThemeJson, ThemeJsonDocument} from './entites/theme-element-json.schema';

@Injectable()
export class ThemeJsonService {
    constructor(@InjectModel(ThemeJson.name) private themeJsonModel: Model<ThemeJsonDocument>){

    }

    async create(payload){
        const result = new this.themeJsonModel({...payload, timestamp: new Date()});
        await result.save();
        return result
    }

    async findAll(){
        return await this.themeJsonModel.find({});
    }

    async getOne(themeName){
        return await this.themeJsonModel.findOne({ themeName  })
    }

    async delete(id){
        await this.themeJsonModel.deleteOne({ _id: id })
        return 
    }
}
