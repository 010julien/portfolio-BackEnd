import { IsString, IsNotEmpty, IsArray, IsEnum, IsOptional, IsNumber, Min, Max, IsIn } from 'class-validator';
import { ProjectStatus, ProjectRole } from '../entities/project.entity';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsString({ each: true })
  technologies: string[];

  @IsIn(['developer', 'manager', 'both'])
  @IsOptional()
  role?: ProjectRole;

  @IsString()
  @IsOptional()
  roleDescription?: string;

  @IsString()
  @IsOptional()
  team?: string;

  @IsString()
  @IsOptional()
  duration?: string;

  @IsString()
  @IsOptional()
  githubLink?: string;

  @IsString()
  @IsOptional()
  demoLink?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @IsIn(['en_cours', 'termine', 'futur'])
  @IsOptional()
  status?: ProjectStatus;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsNumber()
  @Min(0)
  @Max(999)
  @IsOptional()
  order?: number;
}
