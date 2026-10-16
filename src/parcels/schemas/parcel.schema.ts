import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum ParcelStatus {
  PENDING = 'PENDING',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
}

@Schema({ timestamps: true })
export class Parcel {
  @Prop({ required: true, unique: true })
  trackingNumber: string;

  @Prop({ required: true })
  senderName: string;

  @Prop({ required: true })
  recipientName: string;

  @Prop({ required: true })
  recipientPhone: string;

  @Prop({ required: true })
  destinationAddress: string;

  @Prop({ required: true, min: 0.1 })
  weightKg: number;

  @Prop({ type: String, enum: ParcelStatus, default: ParcelStatus.PENDING })
  status: ParcelStatus;
}

export const ParcelSchema = SchemaFactory.createForClass(Parcel);
