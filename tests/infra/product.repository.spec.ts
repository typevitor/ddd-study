import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../src/infra/db/sequelize/model/product.model";
import { Product } from "../../src/domain/entity/product";
import ProductRepository from "../../src/infra/repository/product.repository";

describe('ProductRepositoryTest', () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      models: [__dirname + '/../../src/infra/db/sequelize/model'],
    });
    
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should be able to create a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('a-b-c', 'Product 1', 100);
    await productRepository.create(product);
    const productModel = await ProductModel.findByPk('a-b-c');
    expect(productModel).toBeDefined();
    expect(productModel?.toJSON()).toStrictEqual({
      id: 'a-b-c',
      name: 'Product 1',
      price: 100,
    });
  });

  it('shoul update a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('a-b-c', 'Product 1', 100);
    await productRepository.create(product);
    product.changeName('Product 2');
    product.changePrice(200);
    await productRepository.update(product);
    const productModel = await ProductModel.findByPk('a-b-c');
    expect(productModel).toBeDefined();
    expect(productModel?.toJSON()).toStrictEqual({
      id: 'a-b-c',
      name: 'Product 2',
      price: 200,
    });
  });

  it('should find a product by id', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('a-b-c', 'Product 1', 100);
    await productRepository.create(product);

    const productModel = await ProductModel.findByPk('a-b-c');
    const foundProduct = await productRepository.find('a-b-c');
    expect(foundProduct).toBeDefined();
    expect(foundProduct?.getId()).toBe(productModel?.id);
    expect(foundProduct?.getName()).toBe(productModel?.name);
    expect(foundProduct?.getPrice()).toBe(productModel?.price);
  });

  it('shoul return all products', async () => {
    const productRepository = new ProductRepository();
    
    const product1 = new Product('a-b-c', 'Product 1', 100);
    await productRepository.create(product1);
    
    const product2 = new Product('d-e-f', 'Product 2', 200);
    await productRepository.create(product2);

    const listProducts = await productRepository.findAll();

    const products = [product1, product2];
    expect(products).toHaveLength(2);
    expect(products).toEqual(listProducts);
  });
});