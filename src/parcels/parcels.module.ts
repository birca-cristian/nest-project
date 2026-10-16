import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ParcelsController } from './parcels.controller';
import { ParcelsService } from './parcels.service';
import { Parcel, ParcelSchema } from './schemas/parcel.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Parcel.name, schema: ParcelSchema }]),
  ],
  controllers: [ParcelsController],
  providers: [ParcelsService],
})
export class ParcelsModule {}
