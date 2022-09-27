import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { User } from '../auth/entities/user.entity';
import { CreateStatDto } from './dto/create-stat.dto';
import { UpdateStatDto } from './dto/update-stat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Product } from '../products/entities';
import { StatsResponse } from './entities/stat.entity';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async findMyStats(user: User, paginationDto: PaginationDto): Promise<Record<any, any>> {
    let limit: number, offset: number;
    // eslint-disable-next-line prefer-const
    ({ limit = 10, offset = 0 } = paginationDto);

    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
      relations: {
        images: true,
      },
      where: {
        user: {
          id: user.id,
        },
      },
    });

    return {
      products: products.map((product) => ({
        ...product,
        images: product.images.map((img) => img.url),
      })) as Record<any, any>[],
      stats: [],
    };
  }
}
