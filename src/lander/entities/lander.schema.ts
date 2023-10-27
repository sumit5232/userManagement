import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
export type LanderDocument = Lander & Document;
@Schema()
export class Lander {
    @Prop({required: true, type: String})
    landerName: string;

    @Prop({required: true, type: String})
    themeId: string;

    @Prop({required: true, type: String})
    slugName: string;

    @Prop({ required:true, type: String})
    domainId: string;
    
    @Prop({ required:true, type: String})
    description: string;

      
    @Prop({ required:true, type: Boolean})
    isPublished: boolean;

      
    @Prop({ required:true, type: Array})
    renderingData: any[];

}
export const LanderSchema = SchemaFactory.createForClass(Lander)