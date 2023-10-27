import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DomainDocument, DomainSetting } from './entities/domainsetting.schema';

@Injectable()
export class DomainService {
    constructor(@InjectModel(DomainSetting.name) private domainSettingModel: Model<DomainDocument>){

    }

    async create(payload){
        const result = new this.domainSettingModel({...payload, timestamp: new Date()});
        await result.save();
        return result
    }

    async findAll(){
        return await this.domainSettingModel.find({});
    }

    async getOne(name){
        return await this.domainSettingModel.findOne({ name  })
    }
    async findDomainSetting(domainName: string) {

        return await this.domainSettingModel.findOne({ domainName: domainName }).exec();
        
      }
    

    async delete(id){
        await this.domainSettingModel.deleteOne({ _id: id })
        return 
    }
}
