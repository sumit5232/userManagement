import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ThemeService } from './theme.service';

@Controller('theme')
export class ThemeController {
    constructor(private themeService: ThemeService){

    }

    @Get()
    async getAll(
        @Query('themeName') themeName: string
    ){
        if(themeName && themeName.length){
            return this.themeService.getOne(themeName)
        } else 
        {
            return this.themeService.findAll()
        }
    }

    @Post()
    async create(
        @Body() payload){
        return this.themeService.create(payload);
    }

    @Delete(':id')
    async delete(
        @Param('id') id
    ){
        return this.themeService.delete(id)
    }
}
