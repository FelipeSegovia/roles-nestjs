import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './entities/role.entity';
import { UserRole } from './entities/user-role.entity';

@Module({
  imports: [SequelizeModule.forFeature([Role, UserRole])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
