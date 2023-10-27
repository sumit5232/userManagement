import { Module } from '@nestjs/common';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { DomainSchema, DomainSetting } from './entities/domainsetting.schema';
import { DomainService } from './domain.service';
import { DomainController } from './domain.controller';

@Module({
  imports:[ 
    MongooseModule.forFeature([
      { name: DomainSetting.name, schema: DomainSchema}
    ])
  ],
  controllers: [DomainController],
  providers: [DomainService]
})
export class DomainModule {}
