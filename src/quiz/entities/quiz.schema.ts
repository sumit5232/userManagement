import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
export type QuizDocument = Quiz & Document;
@Schema()
export class Quiz {
  
    @Prop({ required: true, type: String})
    quizName: string;

    @Prop({ required: true, type: String})
    slugName: string;

    @Prop({ required: true, type: String})
    domainId: string;

    @Prop({required: true, type: String})
    themeId: string;
    
    @Prop({ required:true, type: Array})
    nodes: any[];
    
   @Prop({ required: true, type: Array})
   renderingData: any[];

  @Prop({required: true, type: Object})
  config: any;
  
}
export const QuizSchema = SchemaFactory.createForClass(Quiz)