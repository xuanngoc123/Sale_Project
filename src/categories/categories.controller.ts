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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ROLE_ENUM } from '../users/users.constant';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/categories.dto';
import { CategoriesService } from './categories.service';
import { ICategory } from './entities/catetgory.entity';

@ApiTags('Category')
@Roles(ROLE_ENUM.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('Authorization')
@Controller('categories')
export class CategoriesController {
  constructor(private caegoriesService: CategoriesService) {}

  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<ICategory> {
    return this.caegoriesService.createCategory(createCategoryDto);
  }

  @Get()
  getCategoryById(@Query('id') id: string): Promise<ICategory> {
    return this.caegoriesService.getCategoryById(id);
  }

  @Get()
  getAllCategory(): Promise<ICategory[]> {
    return this.caegoriesService.getAllCategories();
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<ICategory> {
    return this.caegoriesService.updateCategory(updateCategoryDto, id);
  }

  @Delete()
  deleteCategory(@Query('id') id: string): Promise<any> {
    return this.caegoriesService.deleteCategoryById(id);
  }
}
