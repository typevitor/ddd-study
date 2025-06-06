import { Order } from "../../../../domain/checkout/entity/order";
import { OrderItem } from "../../../../domain/checkout/entity/order_item";
import { OrderRepositoryInterface } from "../../../../domain/checkout/repository/order_repository_interface.interface";
import OrderModel from "./order.model";
import OrderItemModel from "./order_item.model";

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
    const items = entity.getItems().map(item => ({
      id: item.getId(),
      product_id: item.getProductId(),
      quantity: item.getQuantity(),
      price: item.getPrice(),
    }));

    await OrderModel.update({
      customer_id: entity.getCustomerId(),
      order_date: entity.getOrderDate(),
      total: entity.calculateTotal(),
    }, {
      where: { id: entity.getId() },
    });

    await OrderItemModel.destroy({
      where: { order_id: entity.getId() },
    });

    await OrderItemModel.bulkCreate(items.map(item => ({
      ...item,
      order_id: entity.getId(),
    })));
  }

  async find(id: string): Promise<Order | null> {
    let orderModel: OrderModel;
    try {
      orderModel = await OrderModel.findByPk(id, {
        include: [{ model: OrderItemModel, as: 'items' }],
      });
    } catch (error) {
      throw new Error(`Order not found`);
    }

    const items = orderModel.items.map((item) => {
      return new OrderItem(
          item.id,
          item.product_id,
          item.quantity,
          item.price,
        )
    });

    const order = new Order(
      orderModel.id,
      orderModel.customer_id,
      orderModel.order_date,
      items,
    );

    return order;
  }

  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({
      include: [{ model: OrderItemModel, as: 'items' }],
    });

    return orders.map((orderModel) => {
      const items = orderModel.items.map((item) => {
        return new OrderItem(
          item.id,
          item.product_id,
          item.quantity,
          item.price,
        );
      });

      return new Order(
        orderModel.id,
        orderModel.customer_id,
        orderModel.order_date,
        items,
      );
    });
  }
}