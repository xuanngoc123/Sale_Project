import { NotFoundException } from '@nestjs/common';
import {
  ClientSession,
  Document,
  FilterQuery,
  Model,
  UpdateQuery,
} from 'mongoose';
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

  async findList(
    entityFilterQuery: FilterQuery<T>,
    limit = LIMIT_DEFAUT,
    page = PAGE_DEFAUT,
    sort = SORT_DEFAUT,
  ): Promise<any> {
    const list = await this.entityModel
      .find({ ...entityFilterQuery, _delete: false })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort(sort);
    const countElement = await this.entityModel
      .find({
        ...entityFilterQuery,
        _delete: false,
      })
      .count();
    return {
      currentPage: page,
      totalPage: Math.floor(countElement / limit) + 1,
      numberItemPerPage: limit,
      data: list,
    };
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

  async updateMany(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ) {
    return await this.entityModel.updateMany(
      entityFilterQuery,
      updateEntityData,
    );
  }

  async updateOne(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ) {
    return this.entityModel.updateOne(entityFilterQuery, updateEntityData);
  }

  async findOneAndUpdateQuantity(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
    session: ClientSession,
  ): Promise<T | null | any> {
    return this.entityModel.findOneAndUpdate(
      { ...entityFilterQuery, _delete: false },
      updateEntityData,
      { new: true, session: session },
    );
  }

  async deleteOne(entityFilterQuery: FilterQuery<T>): Promise<T | null | any> {
    const find = await this.findOne(entityFilterQuery);
    if (!find) {
      throw new NotFoundException();
    }
    find['name'] = `${find['name']}-${Date.now()}`;
    find['_delete'] = true;
    await find.save();
    return;
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<T | null | any> {
    const find = await this.findAll(entityFilterQuery);
    if (find.length < 1) {
      throw new NotFoundException();
    }
    const arrPromise = [];
    for (let i = 0, length = find.length; i < length; i++) {
      find[i]['name'] = `${find[i]['name']}-${Date.now()}`;
      find[i]['_delete'] = true;
      arrPromise.push(find[i].save());
    }
    Promise.all(arrPromise);
    return;
  }
}
