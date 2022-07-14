import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ROLE_ENUM } from '../users/users.constant';
import { ItemsService } from './items.service';
import { IItem } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import {
  BadRequestResponse,
  ForbiddenResponse,
  InternalServerErrorResponse,
  NotFoundResponse,
  UnauthorizedResponse,
} from '../swagger/value-example';
import { ItemResponse } from './dto/swagger.dto';

@ApiTags('Item')
@ApiInternalServerErrorResponse({
  description: 'Internal Server Error',
  type: InternalServerErrorResponse,
})
@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  //CREATE ITEM-----------------------------------------
  @ApiBearerAuth('Authorization')
  @ApiCreatedResponse({ type: ItemResponse })
  @ApiBadRequestResponse({ type: BadRequestResponse })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @Roles(ROLE_ENUM.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  createItem(@Body() createItemDto: CreateItemDto): Promise<IItem> {
    return this.itemsService.createItem(createItemDto);
  }

  //UPDATE ITEM--------------------------------------------
  @ApiBearerAuth('Authorization')
  @ApiOkResponse({ type: ItemResponse })
  @ApiBadRequestResponse({ type: BadRequestResponse })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @ApiNotFoundResponse({ type: NotFoundResponse })
  @Roles(ROLE_ENUM.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  updateItems(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
  ): Promise<IItem> {
    return this.itemsService.updateItem(updateItemDto, id);
  }

  //GET ITEM BY ID-------------------------------------------------
  @ApiNotFoundResponse({ type: NotFoundResponse })
  @ApiOkResponse({ type: ItemResponse })
  @Get(':id')
  getItemById(@Param('id') id: string): Promise<IItem> {
    return this.itemsService.getItemById(id);
  }

  //GET LIST ITEMS-------------------------------------------------
  @ApiOkResponse({ type: [ItemResponse] })
  @Get()
  getListItem(
    @Query('category') category: string,
    @Query('tag') tag: string,
    @Query('limit') limit: number,
    @Query('page') page: number,
    @Query('sort') sort: string,
  ): Promise<IItem[]> {
    return this.itemsService.getListItem(category, tag, limit, page, sort);
  }

  //DELETE ITEM--------------------------------------------
  @ApiBearerAuth('Authorization')
  @ApiNoContentResponse({ description: 'Delete success' })
  @ApiNotFoundResponse({ type: NotFoundResponse })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @Roles(ROLE_ENUM.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  deleteItemById(@Query('id') id: string): Promise<any> {
    return this.itemsService.deleteItemById(id);
  }
}
