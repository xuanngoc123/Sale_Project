import { ApiProperty } from '@nestjs/swagger';

export class FileUploadCategoryResponse {
  @ApiProperty()
  keyOfImageCategory: string;
  @ApiProperty()
  keyOfImageBanners: [string];
}

export class FileUploadItemResponse {
  @ApiProperty()
  keyOfImageAvatar: string;
  @ApiProperty()
  keyOfImageItems: [string];
}
