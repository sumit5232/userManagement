import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";
// import { Auth } from "src/auth/auth.schema";

export type DomainDocument = DomainSetting & Document;

@Schema()
export class DomainSetting {
	@Prop({ required: true, type: String, unique: true })
	domainName: string;

	@Prop({ type: String })
	gtm: string;

	@Prop({ type: String })
	mediaBuyerId: string;

	@Prop({ type: String })
	facebookPixel: string;

	@Prop({ type: Object })
	volum: {
		url: string;
		noScript: string;
		meta: string;
		cta: string;
	};

	@Prop({ type: Object })
	metaDetails: {
		"og:title": string;
		"og:description": string;
		"og:site_name": string;
		title: string;
		description: string;
	};

	@Prop({ type: String })
	tikTok: string;

	@Prop({ type: String })
	industry: string;

	@Prop({ type: String })
	websiteTitle: string;

	@Prop({ type: Object })
	generator: {
		default: boolean;
		generatorName: string
	};

	@Prop({ type: Object })
	domainLabels: {
		name: string;
		caption: string;
		callCaption: string;
		websiteName: string;
	};

	@Prop({ type: String })
	vertical: string;
    
	@Prop({ type: Boolean })
	defaultVoluum: boolean;

	@Prop({ type: String })
	lead: string;

	@Prop({ type: Object })
	congrats: any

	@Prop({ type: Array, default: [] })
	testimonials: string[];

	// @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: Auth.name }] })
	// users: Auth[]
}

export const DomainSchema = SchemaFactory.createForClass(DomainSetting);