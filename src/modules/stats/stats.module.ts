import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { ProductsModule } from '../products/products.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [StatsController],
  providers: [StatsService],
  // import ProductsModule
  imports: [ProductsModule, AuthModule],
  exports: [StatsService],
})
export class StatsModule {}
