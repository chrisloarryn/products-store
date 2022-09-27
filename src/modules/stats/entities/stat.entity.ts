import { Product } from 'src/modules/products/entities';

export class StatsResponse {
  products: Product[];
  sells: unknown[];
}
