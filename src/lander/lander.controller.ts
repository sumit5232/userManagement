import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { Lander } from './entities/lander.schema';
import { LanderService } from './lander.service';
export type LanderDocument = Lander & Document;

@Controller('lander')


export class LanderController {
    constructor(private landerService: LanderService){

    }

    @Get()
    async getAll(
        @Query('landerName') landerName: string
    ){
        if(landerName && landerName.length){
            return this.landerService.getOne(landerName)
        } else 
        {
            return this.landerService.findAll()
        }
    }

    @Post()
    async create(
        @Body() payload){
        return this.landerService.create(payload);
    }

    @Delete(':id')
    async delete(
        @Param('id') id
    ){
        return this.landerService.delete(id)
    }
}
