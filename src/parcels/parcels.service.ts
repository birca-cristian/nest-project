import { Injectable } from '@nestjs/common';
import { Parcel, ParcelStatus } from './parcel.model';
import { v4 as uuid } from 'uuid';
import { CreateParcelDto } from './dto/create-parcel.dto';

@Injectable()
export class ParcelsService {
  private parcels: Parcel[] = [];

  getAllParcels(): Parcel[] {
    return this.parcels;
  }

  getParcelById(id: string): Parcel {
    return this.parcels.find((parcel) => parcel.id === id);
  }

  createParcel(createParcelDto: CreateParcelDto): Parcel {
    const { recipientName, destinationAddress, weightKg } = createParcelDto;

    const parcel: Parcel = {
      id: uuid(),
      trackingNumber: `AWB-${Math.floor(100000 + Math.random() * 900000)}`,
      recipientName,
      destinationAddress,
      weightKg,
      status: ParcelStatus.PENDING,
    };

    this.parcels.push(parcel);

    return parcel;
  }

  deleteParcel(id: string): void {
    this.parcels = this.parcels.filter((parcel) => parcel.id !== id);
  }

  updateParcelStatus(id: string, status: ParcelStatus) {
    const parcel = this.getParcelById(id);
    parcel.status = status;
    return parcel;
  }
}
