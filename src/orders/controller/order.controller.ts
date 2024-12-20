import { Controller, Post,Get, Body, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { OrderService } from '../services/order.service';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order with files' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Order created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'images', maxCount: 5 }, // Allow up to 5 image files
      { name: 'voice_recordings', maxCount: 1 }, // Allow up to 1 voice recording files
    ]),
  )
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @UploadedFiles()
    files: {
      images?: Express.Multer.File[];
      voice_recordings?: Express.Multer.File;
    },
  ) {
    return this.orderService.createOrder(createOrderDto, files);
  }


  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'Returns a list of all orders.' })
  @Get()
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

}
