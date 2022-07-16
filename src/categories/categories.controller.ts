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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ROLE_ENUM } from '../users/users.constant';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/categories.dto';
import { CategoriesService } from './categories.service';
import { ICategory } from './entities/catetgory.entity';
import { CategoryResponse } from './dto/swagger.dto';
import {
  BadRequestResponse,
  ForbiddenResponse,
  InternalServerErrorResponse,
  NotFoundResponse,
  UnauthorizedResponse,
} from '../swagger/value-example';

@ApiTags('Category')
@ApiInternalServerErrorResponse({
  description: 'Internal Server Error',
  type: InternalServerErrorResponse,
})
@Controller('categories')
export class CategoriesController {
  constructor(private caegoriesService: CategoriesService) {}

  //CREATE CATEGORY---------------------------------------------
  @ApiBearerAuth('Authorization')
  @ApiCreatedResponse({ type: CategoryResponse })
  @ApiBadRequestResponse({ type: BadRequestResponse })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @Roles(ROLE_ENUM.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<ICategory> {
    return this.caegoriesService.createCategory(createCategoryDto);
  }

  //GET CATEGORY BY ID---------------------------------------
  @ApiNotFoundResponse({ type: NotFoundResponse })
  @ApiOkResponse({ type: CategoryResponse })
  @Get(':id')
  getCategoryById(@Param('id') id: string): Promise<ICategory> {
    return this.caegoriesService.getCategoryById(id);
  }

  //GET ALL CATEGORIES---------------------------------------
  @ApiOkResponse({ type: [CategoryResponse] })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @Get()
  getAllCategory(
    @Query('limit') limit: number,
    @Query('page') page: number,
    @Query('sort') sort: string,
  ): Promise<ICategory[]> {
    return this.caegoriesService.getAllCategories(limit, page, sort);
  }

  //UPDATE CATEGORY---------------------------------------
  @ApiBearerAuth('Authorization')
  @ApiOkResponse({ type: CategoryResponse })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @ApiNotFoundResponse({ type: NotFoundResponse })
  @ApiBadRequestResponse({
    type: BadRequestResponse,
    description: 'status is enum ACTIVE/ INACTVE',
  })
  @Roles(ROLE_ENUM.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<ICategory> {
    return this.caegoriesService.updateCategory(updateCategoryDto, id);
  }

  //DELETE CATEGORY---------------------------------------
  @ApiBearerAuth('Authorization')
  @ApiNoContentResponse({ description: 'Delete success' })
  @ApiNotFoundResponse({ type: NotFoundResponse })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @Roles(ROLE_ENUM.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete()
  deleteCategory(@Query('id') id: string): Promise<any> {
    return this.caegoriesService.deleteCategoryById(id);
  }
}
