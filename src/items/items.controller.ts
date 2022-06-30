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
import { fileFilter } from '../commons/file-filter';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ROLE_ENUM } from '../users/users.constant';
import { CreateItemDto, UpdateItemDto } from './items.dto';
import { ItemsService } from './items.service';

@ApiTags('Item')
@Roles(ROLE_ENUM.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'images', maxCount: 10 }], {
      fileFilter: fileFilter,
    }),
  )
  createItems(
    @Body() createItemDto: CreateItemDto,
    @UploadedFiles() files: Express.Multer.File,
  ) {
    return this.itemsService.createItem(createItemDto, files);
  }

  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'images', maxCount: 10 }], {
      fileFilter: fileFilter,
    }),
  )
  updateItems(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
    @UploadedFiles() files: Express.Multer.File,
  ) {
    return this.itemsService.updateItem(updateItemDto, files, id);
  }
  @Get()
  getItem(@Query('option') option: string) {
    if (option === 'all') {
      return this.itemsService.getAllItems();
    }
    return this.itemsService.getItemById(option);
  }
  @Delete()
  deleteItemById(@Query('id') id: string) {
    return this.itemsService.deleteItemById(id);
  }
}
