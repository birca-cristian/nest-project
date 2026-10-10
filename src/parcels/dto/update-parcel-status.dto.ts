import { ApiProperty } from '@nestjs/swagger';
import { ParcelStatus } from '../parcel.model';


export class UpdateParcelStatusDto {
  @ApiProperty({ enum: ParcelStatus })
  status: ParcelStatus;
}
