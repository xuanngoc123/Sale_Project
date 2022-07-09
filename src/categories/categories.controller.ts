import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ROLE_ENUM } from '../users/users.constant';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/categories.dto';
import { CategoriesService } from './categories.service';
import { ICategory } from './entities/catetgory.entity';

@ApiTags('Category')
@ApiBearerAuth('Authorization')
@Controller('categories')
export class CategoriesController {
  constructor(private caegoriesService: CategoriesService) {}

  @Roles(ROLE_ENUM.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<ICategory> {
    return this.caegoriesService.createCategory(createCategoryDto);
  }

  @Get(':id')
  getCategoryById(@Param('id') id: string): Promise<ICategory> {
    return this.caegoriesService.getCategoryById(id);
  }

  @Get()
  getAllCategory(
    @Query('limit') limit: number,
    @Query('page') page: number,
    @Query('sort') sort: string,
  ): Promise<ICategory[]> {
    return this.caegoriesService.getAllCategories(limit, page, sort);
  }

  @Roles(ROLE_ENUM.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<ICategory> {
    return this.caegoriesService.updateCategory(updateCategoryDto, id);
  }

  @Roles(ROLE_ENUM.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete()
  deleteCategory(@Query('id') id: string): Promise<any> {
    return this.caegoriesService.deleteCategoryById(id);
  }
}
