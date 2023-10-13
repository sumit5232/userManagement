import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type ThemeDocument = Theme & Document;

@Schema()
export class Theme {
    
    @Prop({ required: true, type: String })
    themeName: string;

    @Prop({required: true, type: Array })
    elementsList: any[];

    @Prop({required: true, type: Date })
    timestamp: Date

}

export const ThemeSchema = SchemaFactory.createForClass(Theme)