import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ROLE_ENUM } from 'src/users/users.constant';
import { CreateCategoryDto } from './categories.dto';
import { CategoriesService } from './categories.service';
import { Express } from 'express';

@ApiTags('Category')
@Controller('categories')
export class CategoriesController {
  constructor(private caegoriesService: CategoriesService) {}

  @Post()
  @Roles(ROLE_ENUM.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'imageCategory', maxCount: 1 },
      { name: 'imageBaners', maxCount: 3 },
    ]),
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
    return option;
  }
  @Put()
  updateCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return createCategoryDto;
  }
}
