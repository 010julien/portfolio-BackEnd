import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { ProjectsModule } from '../projects/projects.module';
import { SkillsModule } from '../skills/skills.module';

@Module({
  imports: [ProjectsModule, SkillsModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
