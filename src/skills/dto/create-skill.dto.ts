import { IsString, IsNotEmpty, IsEnum, IsOptional, IsNumber, Min, Max, IsBoolean, IsIn } from 'class-validator';
import { SkillCategory, SkillLevel } from '../entities/skill.entity';

export class CreateSkillDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsIn(['Frontend', 'Backend', 'Database & Other', 'Management', 'Cybersécurité', 'Design'])
  @IsNotEmpty()
  category: SkillCategory;

  @IsIn(['beginner', 'intermediate', 'advanced', 'expert'])
  @IsOptional()
  level?: SkillLevel;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  percentage?: number;

  @IsString()
  @IsOptional()
  description?: string;

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

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
