import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';

@ApiTags('dashboard')
@Controller('api/dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get dashboard statistics' })
  @ApiResponse({ status: 200, description: 'Return dashboard statistics' })
  getStats() {
    return this.dashboardService.getStats();
  }

  @Get('timeline')
  @ApiOperation({ summary: 'Get timeline of projects and skills' })
  @ApiResponse({ status: 200, description: 'Return timeline data' })
  getTimeline() {
    return this.dashboardService.getTimeline();
  }

  @Get('recent-activity')
  @ApiOperation({ summary: 'Get recent activity' })
  @ApiResponse({ status: 200, description: 'Return recent activity' })
  getRecentActivity() {
    return this.dashboardService.getRecentActivity();
  }
}
