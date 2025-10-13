import { Injectable } from '@nestjs/common';
import { ProjectsService } from '../projects/projects.service';
import { SkillsService } from '../skills/skills.service';
import { ProjectStatus, ProjectRole } from '../projects/entities/project.entity';
import { SkillCategory, SkillLevel } from '../skills/entities/skill.entity';

@Injectable()
export class SeedService {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly skillsService: SkillsService,
  ) {}

  async seedProjects() {
    const projects = [
      {
        title: 'TogoSchool',
        category: 'Plateforme Éducative',
        description: 'Plateforme éducative complète pour faciliter l\'apprentissage en ligne. En tant que chef de projet et développeur, j\'ai coordonné une équipe pluridisciplinaire pour créer une solution moderne et accessible.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
        role: ProjectRole.BOTH,
        roleDescription: 'Chef de Projet & Développeur',
        team: 'Équipe de 5 personnes',
        duration: '6 mois',
        status: ProjectStatus.COMPLETED,
        icon: '🎓',
        color: 'from-wax-blue to-wax-purple',
        order: 1,
      },
      {
        title: 'E-commerce Artisanal',
        category: 'Site E-commerce',
        description: 'Plateforme e-commerce dédiée aux artisans togolais pour valoriser et commercialiser leurs produits. Interface moderne avec système de paiement intégré et gestion des stocks.',
        technologies: ['Laravel', 'PHP', 'MySQL', 'Bootstrap'],
        role: ProjectRole.DEVELOPER,
        roleDescription: 'Développeur Full-Stack',
        team: 'Équipe de 3 personnes',
        duration: '4 mois',
        status: ProjectStatus.COMPLETED,
        icon: '🛍️',
        color: 'from-wax-orange to-wax-red',
        order: 2,
      },
      {
        title: 'AutoWash Digital',
        category: 'Application de Service',
        description: 'Solution digitale complète pour la gestion d\'un service de lavage automobile : réservation en ligne, suivi des services, gestion client et facturation automatisée.',
        technologies: ['React', 'NestJS', 'PostgreSQL', 'TypeScript'],
        role: ProjectRole.DEVELOPER,
        roleDescription: 'Développeur & Concepteur',
        team: 'Projet solo',
        duration: '3 mois',
        status: ProjectStatus.COMPLETED,
        icon: '🚗',
        color: 'from-wax-green to-wax-blue',
        order: 3,
      },
    ];

    for (const project of projects) {
      await this.projectsService.create(project);
    }

    console.log('✅ Projects seeded successfully');
  }

  async seedSkills() {
    const skills = [
      // Frontend
      { name: 'HTML/CSS', category: SkillCategory.FRONTEND, level: SkillLevel.ADVANCED, percentage: 90, order: 1 },
      { name: 'JavaScript', category: SkillCategory.FRONTEND, level: SkillLevel.ADVANCED, percentage: 85, order: 2 },
      { name: 'React', category: SkillCategory.FRONTEND, level: SkillLevel.ADVANCED, percentage: 80, order: 3 },
      { name: 'Tailwind CSS', category: SkillCategory.FRONTEND, level: SkillLevel.ADVANCED, percentage: 85, order: 4 },
      
      // Backend
      { name: 'Node.js', category: SkillCategory.BACKEND, level: SkillLevel.INTERMEDIATE, percentage: 75, order: 5 },
      { name: 'NestJS', category: SkillCategory.BACKEND, level: SkillLevel.INTERMEDIATE, percentage: 70, order: 6 },
      { name: 'PHP (Laravel)', category: SkillCategory.BACKEND, level: SkillLevel.INTERMEDIATE, percentage: 75, order: 7 },
      { name: 'C#', category: SkillCategory.BACKEND, level: SkillLevel.INTERMEDIATE, percentage: 65, order: 8 },
      
      // Database
      { name: 'SQL', category: SkillCategory.DATABASE, level: SkillLevel.ADVANCED, percentage: 80, order: 9 },
      { name: 'C', category: SkillCategory.DATABASE, level: SkillLevel.INTERMEDIATE, percentage: 70, order: 10 },
      { name: 'Python', category: SkillCategory.DATABASE, level: SkillLevel.BEGINNER, percentage: 50, order: 11 },
      { name: 'Git/GitHub', category: SkillCategory.DATABASE, level: SkillLevel.ADVANCED, percentage: 85, order: 12 },
      
      // Management
      { name: 'Gestion d\'équipe', category: SkillCategory.MANAGEMENT, level: SkillLevel.ADVANCED, percentage: 85, order: 13 },
      { name: 'Planification Agile', category: SkillCategory.MANAGEMENT, level: SkillLevel.ADVANCED, percentage: 80, order: 14 },
      { name: 'Communication', category: SkillCategory.MANAGEMENT, level: SkillLevel.EXPERT, percentage: 90, order: 15 },
      { name: 'Suivi de projet', category: SkillCategory.MANAGEMENT, level: SkillLevel.ADVANCED, percentage: 85, order: 16 },
    ];

    for (const skill of skills) {
      await this.skillsService.create(skill);
    }

    console.log('✅ Skills seeded successfully');
  }

  async seed() {
    console.log('🌱 Starting database seeding...');
    await this.seedProjects();
    await this.seedSkills();
    console.log('✅ Database seeded successfully!');
  }
}
