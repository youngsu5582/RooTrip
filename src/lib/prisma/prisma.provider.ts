import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DatabaseConfigService } from '../config/database.config.service';

@Injectable()
export class PrismaService extends PrismaClient{
  constructor(private readonly databaseConfigService:DatabaseConfigService) {
    super({
      datasources:{
        db :{
          url: databaseConfigService.getDatabaseUrl()
        }
      }
    });
  }
}
