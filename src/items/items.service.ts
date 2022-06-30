import { Injectable } from '@nestjs/common';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { ResponseUploadFile } from '../commons/commons.type';
import { CreateItemDto, UpdateItemDto } from './items.dto';
import { ItemRepository } from './items.repository';

@Injectable()
export class ItemsService {
  constructor(
    private itemRepository: ItemRepository,
    private fileUploadService: FileUploadService,
  ) {}
  async createItem(createItemDto: CreateItemDto, files) {
    const arrKeyImages: string[] = [];
    for (let i = 0; i < files.images.length; i++) {
      const uploadImages: ResponseUploadFile =
        await this.fileUploadService.uploadFile(files.images[i]);
      arrKeyImages.push(uploadImages.key);
    }
    return this.itemRepository.create({
      ...createItemDto,
      images: arrKeyImages,
    });
  }
  async updateItem(updateItemDto: UpdateItemDto, files, id: string) {
    let payload = {
      ...updateItemDto,
    };
    if (files.images) {
      const arrKeyImages: string[] = [];
      for (let i = 0; i < files.images.length; i++) {
        const uploadImages: ResponseUploadFile =
          await this.fileUploadService.uploadFile(files.images[i]);
        arrKeyImages.push(uploadImages.key);
      }
      payload = {
        ...payload,
        images: arrKeyImages,
      };
    }
    return this.itemRepository.findOneAndUpdate({ _id: id }, payload);
  }
  async getAllItems() {
    return this.itemRepository.find({});
  }
  async getItemById(id) {
    return this.itemRepository.findOne({ _id: id });
  }
  async deleteItemById(id) {
    return this.itemRepository.deleteMany({ _id: id });
  }
}
