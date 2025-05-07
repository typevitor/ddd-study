import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: 'products',
  timestamps: false,
})
export default class ProductModel extends Model {

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
    type: DataType.NUMBER,
    allowNull: false,
  })
  declare price: number;

}