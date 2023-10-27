import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TokenRequestDocument = TokenRequest & Document;

export enum LoginResponseType {
  SUCCESS = 'success',
  ERROR = 'error',
}

@Schema()
export class TokenRequest {
  @Prop({
    type: Date,
    expires: '12h',
    default: Date.now,
  })
  createdAt: Date;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  userId: Types.ObjectId;

  @Prop({ required: false, type: Number, default: 0 })
  resendCount: number;
}

export const TokenRequestSchema = SchemaFactory.createForClass(TokenRequest);
