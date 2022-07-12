import { ApiProperty } from '@nestjs/swagger';

export class CreatedUserResponse {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  userName: string;
  @ApiProperty()
  status: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

export class UpdateUserResponse {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  userName: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
