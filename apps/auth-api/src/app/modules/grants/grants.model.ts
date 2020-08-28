import {
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
@Table({
  tableName: 'grant',
  indexes: [
    {
      fields: ['id'],
    },
  ],
})
export class Grant extends Model<Grant> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  @ApiProperty()
  id: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty()
  key: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty()
  clientId: string

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  @ApiProperty()
  creationTime: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty()
  data: string

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  @ApiProperty()
  expiration: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty()
  subjectId: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty()
  type: string
}