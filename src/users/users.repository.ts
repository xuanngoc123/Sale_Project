import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { EntityRepository } from '../database/entity.repository';
import { User, UserDocument } from './users.schema';
@Injectable()
export class UserRepository extends EntityRepository<UserDocument> {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super(userModel);
  }

  async deleteOne(entityFilterQuery: FilterQuery<UserDocument>): Promise<any> {
    const find = await this.findOne(entityFilterQuery);
    if (!find) {
      throw new NotFoundException();
    }
    find.email = `${find.email}-${Date.now()}}`;
    find._delete = true;
    find.save();
    return true;
  }
}
