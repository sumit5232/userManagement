import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CongratsService } from './congrats.service';

@Controller('congrats')
export class CongratsController {
    constructor(private congratsService: CongratsService){

    }

    @Get()
    async getAll(
        @Query('congratsName') congratsName: string
    ){
    //     if(landerName && landerName.length){
    //         return this.landerService.getOne(landerName)
    //     } else 
    //     {
            return this.congratsService.findAll()
    
    }

    @Post()
    async create(
        @Body() payload: any){
        return this.congratsService.create(payload);
    }

    @Delete(':id')
    async delete(
        @Param('id') id
    ){
        return this.congratsService.delete(id)
    }
}
