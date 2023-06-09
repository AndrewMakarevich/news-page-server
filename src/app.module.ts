import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './modules/users/users.module';
import * as dbConfig from './db/config/config';
import * as dotenv from 'dotenv';
import { env } from 'process';
import {
  Roles,
  Permissions,
  Posts,
  RolesPermissions,
  Users,
  Tags,
  PostsTags,
  Comments,
  Collections,
  PostsCollections,
  Sessions,
  Images,
} from './db/models/models';
import { RolesModule } from './modules/roles/roles.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { RolesPermissionsModule } from './modules/rolesPermissions/rolesPermissions.module';
import { PostsModule } from './modules/posts/posts.module';
import { TagsModule } from './modules/tags/tags.module';
import { PostsTagsModule } from './modules/postsTags/postsTags.module';
import { CommentsModule } from './modules/comments/comments.module';
import { CollectionsModule } from './modules/collections/collections.module';
import { PostsCollectionsModule } from './modules/postsCollections/postsCollections.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { ImagesModule } from './modules/images/images.module';
import { RedisModule } from './modules/redis/redis.module';

dotenv.config();
const sequelizeConfig = dbConfig[env.NODE_ENV || 'development'];

@Module({
  imports: [
    UsersModule,
    RolesModule,
    PermissionsModule,
    RolesPermissionsModule,
    PostsModule,
    TagsModule,
    PostsTagsModule,
    CommentsModule,
    CollectionsModule,
    PostsCollectionsModule,
    SessionsModule,
    ImagesModule,
    TagsModule,
    CommentsModule,
    SequelizeModule.forRoot({
      ...sequelizeConfig,
      autoLoadModels: true,
      sync: { force: true },
      models: [
        Users,
        Roles,
        Permissions,
        RolesPermissions,
        Posts,
        Tags,
        PostsTags,
        Comments,
        Collections,
        PostsCollections,
        Sessions,
        Images,
      ],
      logging: console.log,
    }),
    RedisModule.forRoot({
      socket: {
        host: env.REDIS_HOST,
        port: +env.REDIS_PORT || 6379,
      },
    }),
  ],
})
export class AppModule {}
