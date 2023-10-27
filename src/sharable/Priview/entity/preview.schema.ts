import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type PreviewDocument = Preview & Document;

export interface Preview_Lander {
    ThemeId: string;
    LanderName: string;
    LanderConfig: string;
    key:string[]; 
}
export interface Preview_Congrats {
    CongratsName: string;
    CongratsConfig: string;
}

export interface Preview_Quiz {
    QuizName: string;
    QuizConfig: string;
}

@Schema()
export class Preview {
    
    @Prop({ required: true, type: Array })
    Preview_Lander: Preview_Lander[];

    @Prop({required: true, type: Array })
    Preview_Congrats: Preview_Congrats[];

    @Prop({required: true, type: Array })
    Preview_Quiz: Preview_Quiz[]
}

export const PreviewSchema = SchemaFactory.createForClass(Preview)