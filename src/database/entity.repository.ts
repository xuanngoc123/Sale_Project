import { NotFoundException } from '@nestjs/common';
import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';
import { LIMIT_DEFAUT, PAGE_DEFAUT, SORT_DEFAUT } from './database.constant';
export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    return this.entityModel
      .findOne(
        { ...entityFilterQuery, _delete: false },
        {
          __v: 0,
          ...projection,
        },
      )
      .exec();
  }

  async find(
    entityFilterQuery: FilterQuery<T>,
    limit = LIMIT_DEFAUT,
    page = PAGE_DEFAUT,
    sort = SORT_DEFAUT,
  ): Promise<T[] | null> {
    return this.entityModel
      .find({ ...entityFilterQuery, _delete: false })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort(sort);
  }

  async findAll(entityFilterQuery: FilterQuery<T>): Promise<T[] | null> {
    return this.entityModel.find({ ...entityFilterQuery, _delete: false });
  }

  async create(createEntityData: unknown): Promise<T> {
    const entity = new this.entityModel(createEntityData);
    return entity.save();
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<T | null | any> {
    const result = await this.findOne(entityFilterQuery);
    if (!result) {
      throw new NotFoundException();
    }
    const arrKey = Object.keys(updateEntityData);
    for (let i = 0, length = arrKey.length; i < length; i++) {
      result[`${arrKey[i]}`] = updateEntityData[`${arrKey[i]}`];
    }

    return result.save();
  }

  async deleteOne(entityFilterQuery: FilterQuery<T>): Promise<T | null | any> {
    const find = await this.findOne(entityFilterQuery);
    if (!find) {
      throw new NotFoundException();
    }
    find['name'] = `${find['name']}-${Date.now()}`;
    find['_delete'] = true;
    find.save();
    return true;
  }
}
