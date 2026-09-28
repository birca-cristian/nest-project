import { StringLiteral } from 'typescript';

export class Parcel {
  id: string;
  trackingNumber: string;
  recipientName: string;
  destinationAddress: string;
  weightKg: number;
  status: ParcelStatus;
}

export enum ParcelStatus {
  PENDING = 'PENDING',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
}
