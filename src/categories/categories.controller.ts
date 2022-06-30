import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ROLE_ENUM } from '../users/users.constant';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.dto';
import { CategoriesService } from './categories.service';
import { fileFilter } from '../commons/file-filter';

@ApiTags('Category')
@Roles(ROLE_ENUM.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private caegoriesService: CategoriesService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'imageCategory', maxCount: 1 },
        { name: 'imageBaners', maxCount: 3 },
      ],
      { fileFilter: fileFilter },
    ),
  )
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFiles()
    files: {
      imageCategory?: Express.Multer.File;
      imageBaners?: Express.Multer.File[];
    },
  ): Promise<any> {
    return this.caegoriesService.createCategory(createCategoryDto, files);
  }

  @Get()
  getCategory(@Query('option') option: string) {
    if (option === 'all') {
      return this.caegoriesService.getAllCategories();
    }
    return this.caegoriesService.getCategoryById(option);
  }

  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'imageCategory', maxCount: 1 },
        { name: 'imageBaners', maxCount: 3 },
      ],
      { fileFilter: fileFilter },
    ),
  )
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFiles()
    files: {
      imageCategory?: Express.Multer.File;
      imageBaners?: Express.Multer.File[];
    },
  ): Promise<any> {
    return this.caegoriesService.updateCategory(updateCategoryDto, files, id);
  }

  @Delete()
  deleteCategory(@Query('id') id: string) {
    return this.caegoriesService.deleteCategoryById(id);
  }
}
