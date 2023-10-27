import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
export type UserDocument = User & Document;

@Schema()
export class User{

    @Prop({type: String, required:false })
    name: string;

    @Prop({required: true, type: String})
    email: string;

    @Prop({ required: false, type: Number, maxlength: 12, unique: false})
    phone: number;

    @Prop({type: String })
    password: string;

    @Prop({type: String, required: false })
    temporaryPassword: string;

    @Prop({type: String })
    role: string;
    
    @Prop({ default: true })
    active: boolean;

    @Prop({type: Boolean, default: false})
    isDeleted: boolean;

    @Prop({ type:Date, default: null  })
    deleteAt: Date;

    timestamps: {
        exceededPasswordResetRequest: Date;
        exceededLoginRequest: Date;
      };
    
    
}

export const UserSchema = SchemaFactory.createForClass(User);