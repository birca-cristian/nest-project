import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateParcelException extends HttpException {
  constructor(trackingNumber: string) {
    super(
      `Parcel with tracking number ${trackingNumber} already exists`,
      HttpStatus.CONFLICT,
    );
  }
}
