import { Users } from 'src/db/models/models';
import { IDefaultModelAttributes } from 'src/db/models/models.interface';

export interface ISessionsModelCreationAttributes {
  userId: string;
  ip: string;
  refreshToken: string;
}

export interface ISessionsModelAttributes
  extends IDefaultModelAttributes,
    ISessionsModelCreationAttributes {
  user?: Users;
}
