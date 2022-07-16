import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ItemResponse {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  barcode: string;

  @ApiProperty()
  cost: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  quantitySold: number;

  @ApiProperty()
  weight: number;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  images: string[];

  @ApiProperty()
  description: string;

  @ApiProperty()
  tag: string;

  @ApiProperty()
  categoryId: string;

  @ApiProperty()
  categoryName: string;

  @ApiProperty({ default: false })
  _delete: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiPropertyOptional()
  priceFlashSale: number;

  @ApiPropertyOptional()
  discount: number;

  @ApiPropertyOptional()
  quantityFlashSale: number;

  @ApiPropertyOptional()
  quantitySoldFlashSale: number;

  @ApiProperty()
  urlAvatar: string;

  @ApiProperty()
  urlImage: string[];
}
