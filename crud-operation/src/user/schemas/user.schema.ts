import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class User {
    @Prop()
    name: string;

    @Prop({required: true})
    username: string;

    @Prop({required: true})
    password: string;

    @Prop()
    role: string;

    @Prop({ default: true })
    active: boolean;
    
    @Prop()
    resetToken: String;

    @Prop()
    resetTokenExpiration: Date;

}

export const UserSchema = SchemaFactory.createForClass(User)