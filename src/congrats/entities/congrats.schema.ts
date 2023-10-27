import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";


export type CongratsDocument = Congrats & Document;
export interface Config {}
@Schema()
export class Congrats{
   

    @Prop({required: true, type: String})
    themeId: string;
    
     @Prop({ required:true, type: String})
     domainId: string;
     
     @Prop({ required:true, type: String})
     congratsName: string;

    @Prop({required: true, type: String})
    slugName: string;

      
    @Prop({ required:true, type: Object})
    config: Config;

      
    @Prop({ required:true, type: Array})
    renderingData: any[];

}
export const CongratsSchema = SchemaFactory.createForClass(Congrats)