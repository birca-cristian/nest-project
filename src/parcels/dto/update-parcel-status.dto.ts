import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ParcelStatus } from '../schemas/parcel.schema';

export class UpdateParcelStatusDto {
  @ApiProperty({ enum: ParcelStatus })
  @IsEnum(ParcelStatus)
  status: ParcelStatus;
}
