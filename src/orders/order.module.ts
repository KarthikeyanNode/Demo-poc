import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { OrderService } from './services/order.service';
import { OrderController } from './controller/order.controller';
import { Order, OrderSchema } from './schema/order.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]), // Registering the Order schema
        MulterModule.register({
            limits: {
                fileSize: 5 * 1024 * 1024, // Set file size limit to 5MB

            },
        }),
    ],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule { }
