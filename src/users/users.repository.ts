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
}
