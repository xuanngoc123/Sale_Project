import { NotFoundException } from '@nestjs/common';
import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    const result = await this.entityModel
      .findOne(entityFilterQuery, {
        _id: 0,
        __v: 0,
        ...projection,
      })
      .exec();
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  async find(entityFilterQuery: FilterQuery<T>): Promise<T[] | null> {
    return this.entityModel.find(entityFilterQuery);
  }

  async create(createEntityData: unknown): Promise<T> {
    const entity = new this.entityModel(createEntityData);
    return entity.save();
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<T | null> {
    const result = await this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      updateEntityData,
      {
        new: true,
      },
    );
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
    if (deleteResult.deletedCount < 1) {
      throw new NotFoundException();
    }
    return deleteResult.deletedCount >= 1;
  }
}
