import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import CustomerModel from "./customer.model";
import ProductModel from "./product.model";

@Table({
  tableName: 'orders',
  timestamps: false
})
export class OrderModel extends Model {

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

@Table({
  tableName: 'order_items',
  timestamps: false,
})
export class OrderItemModel extends Model {

  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @ForeignKey(() => OrderModel)
  @Column({ allowNull: false })
  declare order_id: string;

  @ForeignKey(() => ProductModel)
  @Column({ allowNull: false })
  declare product_id: string;

  @Column({ allowNull: false })
  declare quantity: number;

  @Column({ allowNull: false })
  declare price: number;

  @BelongsTo(() => OrderModel)
  declare order?: OrderModel;

  @BelongsTo(() => ProductModel)
  declare product?: ProductModel;
}