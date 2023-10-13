import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ThemeJsonService } from './theme-element-json.service';

@Controller('theme-json')
export class ThemeJsonController {
    constructor(private themeJsonService: ThemeJsonService){

    }

    @Get()
    async getAll(
        @Query('themeName') themeName: string
    ){
        if(themeName && themeName.length){
            return this.themeJsonService.getOne(themeName)
        } else 
        {
            return this.themeJsonService.findAll()
        }
    }

    @Post()
    async create(
        @Body() payload){
        return this.themeJsonService.create(payload);
    }

    @Delete(':id')
    async delete(
        @Param('id') id
    ){
        return this.themeJsonService.delete(id)
    }
}
