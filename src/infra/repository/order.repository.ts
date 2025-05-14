import { Order } from "../../domain/entity/order";
import { OrderRepositoryInterface } from "../../domain/repository/order_repository_interface.interface";
import {OrderModel, OrderItemModel} from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.getId(),
      customer_id: entity.getCustomerId(),
      order_date: entity.getOrderDate(),
      total: entity.calculateTotal(),
      items: entity.getItems().map(item => ({
        id: item.getId(),
        product_id: item.getProductId(),
        quantity: item.getQuantity(),
        price: item.getPrice(),
      })),
    }, {
      include: [{ model: OrderItemModel, as: 'items' }],
    });
  }

  async update(entity: Order): Promise<void> {
    //
  }

  async find(id: string): Promise<Order | null> {
    //
    return null
  }

  async findAll(): Promise<Order[]> {
    //
    return [];
  }
}