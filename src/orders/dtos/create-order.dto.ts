import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import * as moment from 'moment'

export class CreateOrderDto {
    @ApiProperty({ description: 'Type of the dress', type: String })
    @IsString()
    @IsOptional()
    dressType: string;

    @ApiProperty({ description: 'Delivery date', example: moment().format('YYYY-MM-DD') })
    @IsNotEmpty({ message: 'Delivery date is required' })
    deliveryDate: Date;

    @ApiProperty({ description: 'Cost of the dress', type: Number, format: 'currency', required: false })
    @IsNumber()
    cost: number;

    @ApiProperty({ description: 'Phone number', type: Number })
    @IsNumber()
    phoneNumber: number;

    @ApiProperty({ description: 'Image upload', type: 'string', format: 'binary', items: { type: 'file', format: 'binary' }, isArray: true })
    @IsOptional()
    images: any[];

    @ApiProperty({ description: 'Voice recording', type: 'string', format: 'binary', required: false })
    @IsOptional()
    voiceRecording: any;

    @ApiProperty({ description: 'Link', type: String, required: false })
    @IsString()
    link: string;

    @ApiProperty({ description: 'QR scan', type: String, required: false })
    @IsString()
    @IsOptional()
    qrScan: string;
}