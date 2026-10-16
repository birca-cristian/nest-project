import { HttpException, HttpStatus } from '@nestjs/common';

export class ParcelNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Parcel with ID ${id} was not found`, HttpStatus.NOT_FOUND);
  }
}
