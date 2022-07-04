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
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ROLE_ENUM } from '../users/users.constant';
import { CreateItemDto, UpdateItemDto } from './dto/items.dto';
import { ItemsService } from './items.service';
import { IItem } from './entities/item.entity';

@ApiTags('Item')
@Roles(ROLE_ENUM.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Post()
  createItems(@Body() createItemDto: CreateItemDto): Promise<IItem> {
    return this.itemsService.createItem(createItemDto);
  }

  @Put(':id')
  updateItems(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
  ): Promise<IItem> {
    return this.itemsService.updateItem(updateItemDto, id);
  }

  @Get()
  getItemById(@Query('id') id: string): Promise<IItem> {
    return this.itemsService.getItemById(id);
  }

  @Get()
  getAllItems(): Promise<IItem[]> {
    return this.itemsService.getAllItems();
  }

  @Delete()
  deleteItemById(@Query('id') id: string): Promise<any> {
    return this.itemsService.deleteItemById(id);
  }
}
