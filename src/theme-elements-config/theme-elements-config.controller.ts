import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ThemeConfigService } from './theme-elements-config.service';

@Controller('theme-config')
export class ThemeConfigController {
    constructor(private themeConfigService: ThemeConfigService){

    }

    @Get()
    async getAll(
        @Query('themeName') themeName: string
    ){
        if(themeName && themeName.length){
            return this.themeConfigService.getOne(themeName)
        } else 
        {
            return this.themeConfigService.findAll()
        }
    }

    @Post()
    async create(
        @Body() payload){
        return this.themeConfigService.create(payload);
    }

    @Delete(':id')
    async delete(
        @Param('id') id
    ){
        return this.themeConfigService.delete(id)
    }
}
