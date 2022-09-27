import { Controller, Get, Query, UseGuards, Logger } from '@nestjs/common';
import { StatsService } from './stats.service';
import { ValidRoles } from '../auth/interfaces';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { User } from '../auth/entities/user.entity';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Auth, GetUser } from '../auth/decorators';
import { StatsResponse } from './entities/stat.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Stats')
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Auth()
  @ApiResponse({ status: 200, description: 'Stats', type: StatsResponse })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findMyStats(@GetUser() user: User, @Query() paginationDto: PaginationDto) {
    const logger = new Logger('Bootstrap');
    logger.debug('StatsController.findMyStats()');
    logger.debug(`StatsController.UserSession: ${JSON.stringify(user)}`);
    return this.statsService.findMyStats(user, paginationDto);
  }
}
