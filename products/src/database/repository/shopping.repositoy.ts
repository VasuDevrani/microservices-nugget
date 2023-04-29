import { ProductInterface } from '../../types/product/productInputs.types';
import { ProductModel } from '../models';

//Dealing with data base operations
class ProductRepository {
  async CreateProduct({
    name,
    desc,
    type,
    unit,
    price,
    available,
    suplier,
    banner,
  }: ProductInterface) {
    const product = new ProductModel({
      name,
      desc,
      type,
      unit,
      price,
      available,
      suplier,
      banner,
    });

    const productResult = await product.save();
    return productResult;
  }

  async Products() {
    return await ProductModel.find();
  }

  async FindById(id: string) {
    return await ProductModel.findById(id);
  }

  async FindByCategory(category: string) {
    const products = await ProductModel.find({ type: category });

    return products;
  }

  async FindSelectedProducts(selectedIds: string[]) {
    const products = await ProductModel.find()
      .where('_id')
      .in(selectedIds.map((_id) => _id))
      .exec();
    return products;
  }
}

export default ProductRepository;
