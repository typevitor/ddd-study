import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import CustomerModel from "./customer.model";
import OrderItemModel from "./order_item.model";

@Table({
  tableName: 'orders',
  timestamps: false
})
export default class OrderModel extends Model {

  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @ForeignKey(() => CustomerModel)
  @Column({ allowNull: false })
  declare customer_id: string;

  @Column({ allowNull: false })
  declare order_date: Date;

  @Column({ allowNull: false })
  declare total: number;

  @BelongsTo(() => CustomerModel)
  declare customer?: CustomerModel;

  @HasMany(() => OrderItemModel, { as: 'items', foreignKey: 'order_id' })
  declare items?: OrderItemModel[];
}