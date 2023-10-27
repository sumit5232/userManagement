import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConfigDocument = Config & Document;

export type NodeMailerConfig = {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  }
}

@Schema()
export class Config {
  @Prop({
    required: true, type: {
      host: String,
      port: Number,
      secure: Boolean,
      auth: {
        user: String,
        pass: String,
      }
  } })
  nodeMailerConfig: NodeMailerConfig;
}

export const ConfigSchema = SchemaFactory.createForClass(Config);