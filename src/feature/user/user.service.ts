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
}
