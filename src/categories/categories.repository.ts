import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../database/entity.repository';
import { Category, CategoryDocument } from './categories.shema';
@Injectable()
export class CategoryRepository extends EntityRepository<CategoryDocument> {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {
    super(categoryModel);
  }
}
