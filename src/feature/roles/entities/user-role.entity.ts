import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/feature/user/entities/user.entity';
import { Role } from './role.entity';

@Table({ tableName: 'user_roles', timestamps: true, paranoid: false })
export class UserRole extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  userId: string;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.UUID,
  })
  roleId: string;
}
