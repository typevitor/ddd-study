import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../src/infra/db/sequelize/model/product.model";

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
    
  });

});