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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  FileUploadCategoryResponse,
  FileUploadItemResponse,
} from './file-upload.dto';
import {
  BadRequestResponse,
  ForbiddenResponse,
  InternalServerErrorResponse,
  UnauthorizedResponse,
} from 'src/swagger/value-example';

@ApiTags('Upload File')
@ApiBearerAuth('Authorization')
@ApiInternalServerErrorResponse({
  description: 'Internal Server Error',
  type: InternalServerErrorResponse,
})
@ApiBadRequestResponse({ type: BadRequestResponse })
@ApiUnauthorizedResponse({ type: UnauthorizedResponse })
@ApiForbiddenResponse({ type: ForbiddenResponse })
@Roles(ROLE_ENUM.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('file-upload')
export class FileUploadController {
  constructor(private fileUploadService: FileUploadService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        imageCategory: {
          type: 'file',
          format: 'binary',
        },
        imageBanners: {
          type: 'array',
          items: {
            type: 'file',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiCreatedResponse({ type: FileUploadCategoryResponse })
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
      imageCategory: Express.Multer.File;
      imageBaners: Express.Multer.File[];
    },
  ) {
    return this.fileUploadService.uploadFileCatetgory(files);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        imageAvatar: {
          type: 'file',
          format: 'binary',
        },
        imageDetail: {
          type: 'array',
          items: {
            type: 'file',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiCreatedResponse({ type: FileUploadItemResponse })
  @Post('item')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'imageAvatar', maxCount: 1 },
        { name: 'imageDetail', maxCount: 10 },
      ],
      { fileFilter: fileFilter },
    ),
  )
  uploadFileItem(
    @UploadedFiles()
    files: {
      imageAvatar: Express.Multer.File;
      imageDetail: Express.Multer.File[];
    },
  ) {
    return this.fileUploadService.uploadFileItem(files);
  }
}
