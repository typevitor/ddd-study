import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import ProductModel from "../../../product/repository/sequelize/product.model";
import OrderModel from "./order.model";

@Table({
  tableName: 'order_items',
  timestamps: false,
})

export default class OrderItemModel extends Model {

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
  declare order?: 'orders';

  @BelongsTo(() => ProductModel)
  declare product?: ProductModel;
}