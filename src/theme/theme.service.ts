import { Injectable } from '@nestjs/common';
import { Theme, ThemeDocument } from './entites/theme.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ThemeService {
    constructor(@InjectModel(Theme.name) private themeModel: Model<ThemeDocument>){

    }

    async create(payload){
        const result = new this.themeModel({...payload, timestamp: new Date()});
        await result.save();
        return result
    }

    async findAll(){
        return await this.themeModel.find({});
    }

    async getOne(themeName){
        return await this.themeModel.findOne({ themeName  })
    }

    async delete(id){
        await this.themeModel.deleteOne({ _id: id })
        return 
    }
}
