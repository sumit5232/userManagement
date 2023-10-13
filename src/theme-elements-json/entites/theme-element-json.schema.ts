import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type ThemeJsonDocument = ThemeJson & Document;

@Schema()
export class ThemeJson {
    
    @Prop({ required: true, type: String })
    themeName: string;

    @Prop({required: true, type: Array })
    elementsJson: any[];

    @Prop({required: true, type: Date })
    timestamp: Date

}

export const ThemeJsonSchema = SchemaFactory.createForClass(ThemeJson)