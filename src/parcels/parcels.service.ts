import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateParcelDto } from './dto/create-parcel.dto';
import { DuplicateParcelException } from './exceptions/duplicate-parcel.exception';
import { ParcelNotFoundException } from './exceptions/parcel-not-found.exception';
import { Parcel, ParcelStatus } from './schemas/parcel.schema';

@Injectable()
export class ParcelsService {
  constructor(@InjectModel(Parcel.name) private parcelModel: Model<Parcel>) {}

  async getAllParcels() {
    return this.parcelModel.find();
  }

  async getParcelById(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid parcel ID: ${id}`);
    }

    const parcel = await this.parcelModel.findById(id);
    if (!parcel) {
      throw new ParcelNotFoundException(id);
    }

    return parcel;
  }

  async createParcel(createParcelDto: CreateParcelDto) {
    const existing = await this.parcelModel.findOne({
      trackingNumber: createParcelDto.trackingNumber,
    });
    if (existing) {
      throw new DuplicateParcelException(createParcelDto.trackingNumber);
    }

    return this.parcelModel.create(createParcelDto);
  }

  async updateParcel(id: string, updateParcelDto: CreateParcelDto) {
    const parcel = await this.getParcelById(id);

    const existing = await this.parcelModel.findOne({
      trackingNumber: updateParcelDto.trackingNumber,
    });
    if (existing && existing.id !== parcel.id) {
      throw new DuplicateParcelException(updateParcelDto.trackingNumber);
    }

    parcel.set(updateParcelDto);
    return parcel.save();
  }

  async updateParcelStatus(id: string, status: ParcelStatus) {
    const parcel = await this.getParcelById(id);

    if (parcel.status === ParcelStatus.DELIVERED) {
      throw new BadRequestException(
        'Parcel was already delivered, status cannot be changed',
      );
    }

    parcel.status = status;
    return parcel.save();
  }

  async deleteParcel(id: string) {
    const parcel = await this.getParcelById(id);
    await parcel.deleteOne();
    return { message: `Parcel with ID ${id} was deleted` };
  }
}
