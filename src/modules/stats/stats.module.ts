import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { ProductsModule } from '../products/products.module';

@Module({
  controllers: [StatsController],
  providers: [StatsService],
  // import ProductsModule
  imports: [ProductsModule],
  exports: [StatsService],
})
export class StatsModule {}
