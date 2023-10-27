import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { DomainSetting } from "./domainsetting.schema";

export type DomainDocument = Domain & Document;

export interface Lander {
    ThemeId: string;
    LanderName: string;
    LanderConfig: string; 
}

export interface Congrats {
    CongratsName: string;
    CongratsConfig: string;
}

export interface Quiz {
    QuizName: string;
    QuizConfig: string;
    QuizNodes: string;
}

@Schema()
export class Domain {
    
    @Prop({required: true, type: Array })
    Lander: Lander[];

    @Prop({required: true, type: Array })
    Congrats: Congrats[]

    @Prop({required: true, type: Array })
    Quiz: Quiz[]

    @Prop({ required: true, type: Object, ref: DomainSetting.name })
    DomainSetting: DomainSetting;


}

export const DomainSchema = SchemaFactory.createForClass(Domain)