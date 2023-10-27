import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateConfigDto } from './dto/create-config.dto';
import { ConfigDocument, NodeMailerConfig } from './entities/config.schema';

@Injectable()
export class ConfigService {
  constructor(
    @InjectModel('Config') private readonly configModel: Model<ConfigDocument>,
  ) {}

  async create(createConfigDto: CreateConfigDto) {
    const oldConfig = await this.configModel.findOne().exec();
    if (oldConfig) {
      return this.configModel.findByIdAndUpdate(oldConfig?._id, createConfigDto);
    }
    return await this.configModel.create(createConfigDto);
  }

  async getConfig() {
    return await this.configModel.findOne().exec();
  }

  updateNodeMailerConfig(nodeMailerConfig: NodeMailerConfig) {
    return this.configModel.findOneAndUpdate({}, { nodeMailerConfig });
  }
}
