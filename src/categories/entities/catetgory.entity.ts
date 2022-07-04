import { ObjectID } from '../../commons/commons.type';
import { STATUS_CATEGORY_ENUM } from '../categories.constant';

export interface ICategory {
  _id?: ObjectID;
  name: string;
  imageBanners: string[];
  imageCategory: string;
  status: STATUS_CATEGORY_ENUM;
  description: string;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
}
