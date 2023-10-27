import { Module } from '@nestjs/common';

import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Lander, LanderSchema } from './entities/lander.schema';
import { LanderController } from './lander.controller';
import { LanderService } from './lander.service';
// import { Theme, ThemeSchema } from './entites/theme.schema';

@Module({
  imports:[ 
    MongooseModule.forFeature([
      { name: Lander.name, schema: LanderSchema}
    ])
  ],
  controllers: [LanderController],
  providers: [LanderService]
})
export class LanderModule {}
