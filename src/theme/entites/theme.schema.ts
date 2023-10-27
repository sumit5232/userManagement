import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type ThemeDocument = Theme & Document;

export interface Elements {
    ThemeId: string;
    ThemeElementsList: any[] 
}
export interface ElementsConfig {
    ElementName: string;
    ElementConfig: string;
}

export interface Type {
    lander: string;
    quiz: string;
    congrats: string;
}

@Schema()
export class Theme {
    
    @Prop({ required: true, type: String })
    ThemeName: string;

    @Prop({required: true, type: Array })
    Elements: Elements[];

    @Prop({required: true, type: Array })
    ElementsConfig: ElementsConfig[]

    @Prop({required: true, type: Array })
    ElementsDefaultPage: any[]

    @Prop({required: true, type: Array})
    type: Type[]

}

export const ThemeSchema = SchemaFactory.createForClass(Theme)