import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Query } from '@nestjs/common';
import { DomainService } from './domain.service';

@Controller('domain')
export class DomainController {
    constructor(private domainService: DomainService){

    }

    @Get()
    async getAll(
        @Query('name') domainName: string
    ){
        if(domainName && domainName.length){
            return this.domainService.getOne(name)
        } else 
        {
            return this.domainService.findAll()
        }
    }

    @Get('/:domainName')
  async findDomainSetting(@Param('domainName') domainName: string) {
   
    return this.domainService.findDomainSetting(domainName);

  }
    
    @Post()
    async create(
        @Body() payload){
        return this.domainService.create(payload);
    }

    @Delete(':id')
    async delete(
        @Param('id') id
    ){
        return this.domainService.delete(id)
    }
}
