import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../schema/order.schema';
import { CreateOrderDto } from '../dtos/create-order.dto';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
  ) { }

  async createOrder(
    createOrderDto: CreateOrderDto,
    files: { images?: Express.Multer.File[]; voice_recordings?: Express.Multer.File },
  ): Promise<Omit<Order, 'images' | 'voice_recordings'>> {
    try {
      // Process images
      const imagesData = files?.images?.map((file) => ({
        data: file.buffer,
        contentType: file.mimetype,
      }));

      // Process voice recordings
      const voiceRecordings = {
        data: files?.voice_recordings?.buffer,
        contentType: files?.voice_recordings?.mimetype,
      }


      // Create a new Order document
      const newOrder = new this.orderModel({
        ...createOrderDto,
        images: imagesData,


      });

      // Save to database
      const savedOrder = await newOrder.save();
      const { images, voice_recordings, ...response } = savedOrder.toObject();
      return response as Omit<Order, 'images' | 'voice_recordings'>;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new BadRequestException('Failed to create order');
    }
  }


  async getAllOrders(): Promise<any> {
    const orders = await this.orderModel.find().exec();

    const data = orders?.map((order) => {
      // Convert images to Base64
      const imagesBase64 = order.images?.map((image) => {
        if (image?.data) {
          return `data:${image.contentType};base64,${image.data.toString('base64')}`;
        }
        return null;  // Return null if no data exists for this image
      }).filter(Boolean);

      // Convert voice recordings to Base64
      // const voiceRecordingsBase64 = order.voice_recordings?.map((voice) => {
      //   return `data:${voice.contentType};base64,${voice.data.toString('base64')}`;
      // });

      return {
        ...order.toObject(),
        images: imagesBase64,  // Include Base64 images in response
        // voice_recordings: voiceRecordingsBase64,  // Include Base64 voice recordings in response
      };
    });

    return data;
  }


}
