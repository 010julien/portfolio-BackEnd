import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill, SkillCategory } from './entities/skill.entity';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private skillsRepository: Repository<Skill>,
  ) {}

  async create(createSkillDto: CreateSkillDto): Promise<Skill> {
    const skill = this.skillsRepository.create(createSkillDto);
    return await this.skillsRepository.save(skill);
  }

  async findAll(): Promise<Skill[]> {
    return await this.skillsRepository.find({
      where: { isActive: true },
      order: { order: 'ASC', createdAt: 'DESC' },
    });
  }

  async findByCategory(category: SkillCategory): Promise<Skill[]> {
    return await this.skillsRepository.find({
      where: { category, isActive: true },
      order: { order: 'ASC', createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Skill> {
    const skill = await this.skillsRepository.findOne({ where: { id } });
    if (!skill) {
      throw new NotFoundException(`Skill with ID "${id}" not found`);
    }
    return skill;
  }

  async update(id: string, updateSkillDto: UpdateSkillDto): Promise<Skill> {
    const skill = await this.findOne(id);
    Object.assign(skill, updateSkillDto);
    return await this.skillsRepository.save(skill);
  }

  async remove(id: string): Promise<void> {
    const result = await this.skillsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Skill with ID "${id}" not found`);
    }
  }

  async count(): Promise<number> {
    return await this.skillsRepository.count({ where: { isActive: true } });
  }

  async countByCategory(category: SkillCategory): Promise<number> {
    return await this.skillsRepository.count({ where: { category, isActive: true } });
  }

  async getByCategories(): Promise<{ [key: string]: Skill[] }> {
    const skills = await this.findAll();
    return skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {} as { [key: string]: Skill[] });
  }
}
