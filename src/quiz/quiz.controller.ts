import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
// import { QuizService } from './Quiz.service';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
    constructor(private quizService: QuizService){

    }

    @Get()
    async getAll(
        @Query('QuizName') quizName: string
    ){
    //     if(landerName && landerName.length){
    //         return this.landerService.getOne(landerName)
    //     } else 
    //     {
            return this.quizService.findAll()
    
    }

    @Post()
    async create(
        @Body() payload: any){
        return this.quizService.create(payload);
    }

    @Delete(':id')
    async delete(
        @Param('id') id
    ){
        return this.quizService.delete(id)
    }
}
