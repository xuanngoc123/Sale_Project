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
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ROLE_ENUM } from '../users/users.constant';
import { ItemsService } from './items.service';
import { IItem } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@ApiTags('Item')
@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Roles(ROLE_ENUM.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  createItem(@Body() createItemDto: CreateItemDto): Promise<IItem> {
    return this.itemsService.createItem(createItemDto);
  }

  @Roles(ROLE_ENUM.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  updateItems(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
  ): Promise<IItem> {
    return this.itemsService.updateItem(updateItemDto, id);
  }

  @Get(':id')
  getItemById(@Param('id') id: string): Promise<IItem> {
    return this.itemsService.getItemById(id);
  }

  @Get()
  getItemsByCategory(
    @Query('category') category: string,
    @Query('tag') tag: string,
    @Query('limit') limit: number,
    @Query('page') page: number,
    @Query('sort') sort: string,
  ): Promise<IItem[]> {
    return this.itemsService.getItemsByCategory(
      category,
      tag,
      limit,
      page,
      sort,
    );
  }

  @Roles(ROLE_ENUM.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete()
  deleteItemById(@Query('id') id: string): Promise<any> {
    return this.itemsService.deleteItemById(id);
  }
}
