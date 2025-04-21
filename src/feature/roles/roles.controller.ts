import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesGuard } from 'src/guard/roles.guard';
import { Roles } from 'src/decoratos/roles.decorator';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  async create(@Body() dto: CreateRoleDto) {
    return await this.rolesService.createRole(dto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin', 'manager')
  getAll() {
    return this.rolesService.getAllRoles();
  }
}
