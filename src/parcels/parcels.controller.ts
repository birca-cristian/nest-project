import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ParcelsService } from './parcels.service';
import { Parcel, ParcelStatus } from './parcel.model';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateParcelDto } from './dto/create-parcel.dto';

@ApiTags('Parcels')
@Controller('parcels')
export class ParcelsController {
  constructor(private parcelsService: ParcelsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all parcels' })
  getAllParcels(): Parcel[] {
    return this.parcelsService.getAllParcels();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get parcel by id' })
  getParcelById(@Param('id') id: string): Parcel {
    return this.parcelsService.getParcelById(id);
  }

  @Post('/create')
  @ApiOperation({ summary: 'Create parcel' })
  createParcel(@Body() createParcelDto: CreateParcelDto): Parcel {
    return this.parcelsService.createParcel(createParcelDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete parcel' })
  deleteParcel(@Param('id') id: string): void {
    this.parcelsService.deleteParcel(id);
  }

  @Patch('/:id/status')
  @ApiOperation({ summary: 'Update parcel status' })
  updateParcelStatus(
    @Param('id') id: string,
    @Body('status') status: ParcelStatus,
  ): Parcel {
    return this.parcelsService.updateParcelStatus(id, status);
  }
}
