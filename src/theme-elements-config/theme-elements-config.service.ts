import { Injectable } from '@nestjs/common';
import { ThemeConfig, ThemeConfigDocument } from './entites/theme-config.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ThemeConfigService {
    constructor(@InjectModel(ThemeConfig.name) private themeConfigModel: Model<ThemeConfigDocument>){

    }

    async create(payload){
        const result = new this.themeConfigModel({...payload, timestamp: new Date()});
        await result.save();
        return result
    }

    async findAll(){
        return await this.themeConfigModel.find({});
    }

    async getOne(themeName){
        return await this.themeConfigModel.findOne({ themeName  })
    }

    async delete(id){
        await this.themeConfigModel.deleteOne({ _id: id })
        return 
    }
}
