import { Order } from "../../domain/entity/order";
import { OrderItem } from "../../domain/entity/order_item";
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
    let orderModel: OrderModel;
    try {
      orderModel = await OrderModel.findByPk(id);
    } catch (error) {
      throw new Error(`Order not found`);
    }
    const order = new Order(
      orderModel.id,
      orderModel.customer_id,
      orderModel.order_date,
      [],
    );

    orderModel.items.forEach((item) => {
      order.addItem(
        new OrderItem(
          item.id,
          item.product_id,
          item.quantity,
          item.price,
        ),
      );
    });
  
    return order;
  }

  async findAll(): Promise<Order[]> {
    //
    return [];
  }
}