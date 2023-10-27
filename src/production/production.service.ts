import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Congrats, CongratsDocument } from "src/congrats/entities/congrats.schema";
import { DomainDocument, DomainSetting } from "src/domain/entities/domainsetting.schema";
import { Lander } from "src/lander/entities/lander.schema";
import { LanderDocument } from "src/lander/lander.controller";
import { Quiz, QuizDocument } from "src/quiz/entities/quiz.schema";

@Injectable()
export class ProductionService{
    constructor(@InjectModel(DomainSetting.name) private domainSettingModel: Model<DomainDocument>,
                @InjectModel(Lander.name) private readonly landerModel: Model<LanderDocument>,
                @InjectModel(Congrats.name) private readonly congratsModel: Model<CongratsDocument>,
                @InjectModel(Quiz.name) private readonly quizModel: Model<QuizDocument>,    
    ){

    }

    async findDomainId(routeName: string, slugName: string) {
        let domainId = null;

        const pattern: RegExp = /^\/[a-zA-Z0-9]+\/[a-zA-Z0-9]+$/;    //   /.../...
        const pattern2: RegExp = /^[a-zA-Z0-9]+\/[a-zA-Z0-9]+\/[a-zA-Z0-9/]+$/;    //   /.../.../.../
        const quiz1: RegExp = /^\/[a-zA-Z0-9]+\/[a-zA-Z0-9]+$/;    //   /.../.../
        const quiz2: RegExp = /^\/[a-zA-Z0-9]+\/[a-zA-Z0-9]+\/[a-zA-Z0-9]+$/;  // /.../.../... 
        const quiz3: RegExp = /^\/[a-zA-Z0-9]+\/[a-zA-Z0-9]+$/;  // /../../
        const landerP1: RegExp = /^[/a-zA-Z0-9]+\/[a-zA-Z0-9/]+$/;    //   /.../

        const landerP2: RegExp = /^[/a-zA-Z0-9]+\/[a-zA-Z0-9]+$/;    // /...
       

  if (pattern.test(routeName)) {
   
    if (routeName.includes('-congrats')) {
      const congrats = await this.congratsModel.findOne({ slugName: { $regex: slugName} }).exec();
      if (congrats) {
        domainId = congrats.domainId;
      }
    }
  } else if (landerP1.test(routeName) || landerP2.test(routeName)) {
    
    const lander = await this.landerModel.findOne({ slugName: { $regex: slugName} }).exec();
    if (lander) {
      domainId = lander.domainId;
    }
  } else if (

           quiz1.test(routeName) ||
           quiz2.test(routeName) ||
           quiz3.test(routeName)
  ) {
    
    const quiz = await this.quizModel.findOne({ slugName: { $regex: slugName} }).exec();
    if (quiz) {
      domainId = quiz.domainId;
    }
  }
  return domainId;
 }
    
    async findDomainSetting(domainName: string) {

        const domainSetting = await this.domainSettingModel.findOne({ domainName : domainName }).exec();
        if(domainSetting){
          return domainSetting;
        }else {
          throw new NotFoundException();
        }
      }
      
      async findBySlugName(slugName: string){
        const quiz = await this.quizModel.findOne({ slugName : slugName }).exec();
        if(quiz){
            return {...quiz.toJSON(), type: 'quiz'}
        }else {
          throw new NotFoundException();
          
        }
      }

}