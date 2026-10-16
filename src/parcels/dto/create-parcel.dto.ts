import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateParcelDto {
  @ApiProperty({ example: 'AWB-100001' })
  @IsString()
  @IsNotEmpty()
  trackingNumber: string;

  @ApiProperty({ example: 'Ion Popescu' })
  @IsString()
  @IsNotEmpty()
  senderName: string;

  @ApiProperty({ example: 'Maria Ionescu' })
  @IsString()
  @IsNotEmpty()
  recipientName: string;

  @ApiProperty({ example: '+37369123456' })
  @IsString()
  @IsNotEmpty()
  recipientPhone: string;

  @ApiProperty({ example: 'Str. Stefan cel Mare 1, Chisinau' })
  @IsString()
  @IsNotEmpty()
  destinationAddress: string;

  @ApiProperty({ example: 2.5 })
  @IsNumber()
  @Min(0.1)
  weightKg: number;
}
