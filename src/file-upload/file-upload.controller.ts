import {
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { fileFilter } from '../commons/file-filter';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ROLE_ENUM } from '../users/users.constant';
import { FileUploadService } from './file-upload.service';

@Roles(ROLE_ENUM.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('file-upload')
export class FileUploadController {
  constructor(private fileUploadService: FileUploadService) {}

  @Post('category')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'imageCategory', maxCount: 1 },
        { name: 'imageBanners', maxCount: 3 },
      ],
      { fileFilter: fileFilter },
    ),
  )
  uploadFileCategory(
    @UploadedFiles()
    files: {
      imageCategory?: Express.Multer.File;
      imageBaners?: Express.Multer.File[];
    },
  ) {
    return this.fileUploadService.uploadFileCatetgory(files);
  }

  @Post('item')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'images', maxCount: 10 }], {
      fileFilter: fileFilter,
    }),
  )
  uploadFileItem(
    @UploadedFiles()
    files: {
      images?: Express.Multer.File[];
    },
  ) {
    return this.fileUploadService.uploadFileItem(files);
  }
}
