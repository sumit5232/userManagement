import { Body, Controller, Get, NotFoundException, Param, Post } from "@nestjs/common";
import { DomainService } from "src/domain/domain.service";
import { ProductionService } from "./production.service";

@Controller('production')

export class ProductionController{
    constructor(private domainService: DomainService,
               private productionService: ProductionService,
        ){}

    @Post()
    async findDomainId(
      @Body() domainId: string,
      @Body() slugName: string,
    ) {
      return await this.productionService.findDomainId(domainId, slugName);
    }

    @Get('domainSetting/:domainName')
    async findDomainSetting(@Param('domainName') domainName: string) {
     
      return await this.domainService.findDomainSetting(domainName);
    }

    @Get(':slugName')
    async findQuizBySlugName(@Param('slugName') slugName: string){
      return await this.productionService.findBySlugName(slugName);
    }
}