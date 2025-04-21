import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role)
    private roleModel: typeof Role,
  ) {}

  async createRole(dto: CreateRoleDto): Promise<Role> {
    return this.roleModel.create({
      ...dto,
    });
  }

  async getRoleByValue(value: string): Promise<Role> {
    return this.roleModel.findOne({ where: { name: value } });
  }

  async getAllRoles(): Promise<Role[]> {
    return this.roleModel.findAll();
  }
}
