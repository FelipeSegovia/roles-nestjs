import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(user: CreateUserDto) {
    try {
      await this.userModel.create({
        ...user,
      });

      return 'User created successfully!';
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.findAll();
  }

  async findOne(id: string): Promise<User | null> {
    const user = await this.userModel.findByPk(id, {
      attributes: ['name', 'email'], // Especifico que valores devolver
    });

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    return user;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({
      where: {
        email,
      },
    });

    if (!user)
      throw new NotFoundException(`User with email ${email} not found`);

    return user;
  }

  async update(id: string, user: CreateUserDto) {
    await this.findOne(id);

    await this.userModel.update(user, { where: { id } });

    return await this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.userModel.destroy({ where: { id } });
  }
}
