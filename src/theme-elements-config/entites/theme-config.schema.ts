import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type ThemeConfigDocument = ThemeConfig & Document;

@Schema()
export class ThemeConfig {
    
    @Prop({ required: true, type: String })
    themeName: string;

    @Prop({required: true, type: Array })
    elementsConfigJson: any[];

    @Prop({required: true, type: Date })
    timestamp: Date

}

export const ThemeConfigSchema = SchemaFactory.createForClass(ThemeConfig)