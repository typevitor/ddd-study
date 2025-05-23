import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: 'customers',
  timestamps: false,
})
export default class CustomerModel extends Model {

  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare phone: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare active: boolean;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  declare street: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare city: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare state: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare zipCode: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  declare rewardPoints: number;
}