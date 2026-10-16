import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateParcelDto } from './dto/create-parcel.dto';
import { UpdateParcelStatusDto } from './dto/update-parcel-status.dto';
import { ParcelsService } from './parcels.service';

@ApiTags('Parcels')
@Controller('parcels')
export class ParcelsController {
  constructor(private parcelsService: ParcelsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all parcels' })
  getAllParcels() {
    return this.parcelsService.getAllParcels();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get parcel by id' })
  getParcelById(@Param('id') id: string) {
    return this.parcelsService.getParcelById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create parcel' })
  createParcel(@Body() createParcelDto: CreateParcelDto) {
    return this.parcelsService.createParcel(createParcelDto);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update parcel' })
  updateParcel(
    @Param('id') id: string,
    @Body() updateParcelDto: CreateParcelDto,
  ) {
    return this.parcelsService.updateParcel(id, updateParcelDto);
  }

  @Patch('/:id/status')
  @ApiOperation({ summary: 'Update parcel status' })
  updateParcelStatus(
    @Param('id') id: string,
    @Body() updateParcelStatusDto: UpdateParcelStatusDto,
  ) {
    return this.parcelsService.updateParcelStatus(
      id,
      updateParcelStatusDto.status,
    );
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete parcel' })
  deleteParcel(@Param('id') id: string) {
    return this.parcelsService.deleteParcel(id);
  }
}
