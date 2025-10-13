import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ProjectsModule } from '../projects/projects.module';
import { SkillsModule } from '../skills/skills.module';

@Module({
  imports: [ProjectsModule, SkillsModule],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
