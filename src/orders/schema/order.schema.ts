import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Order {

  @Prop()
  dress_type: string;

  @Prop({ type: Date })
  delivery_date: Date;

  @Prop()
  phone_number: number;

  @Prop()
  cost: number;

  @Prop({
    type: [
      {
        data: Buffer,
        contentType: String,
      },
    ],
    // select: false,
  })
  images: {
    data: Buffer;
    contentType: string;
  }[];

  @Prop({
    type: [
      {
        data: Buffer,
        contentType: String,
      },
    ],
    // select: false,
  })
  voice_recordings: {
    data: Buffer;
    contentType: string;
  }; //  voice recordings

  @Prop()
  link: string; 

  @Prop()
  qrScan: string;


}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);





