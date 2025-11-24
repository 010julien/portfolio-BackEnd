import { Injectable } from "@nestjs/common";
import { ProjectsService } from "../projects/projects.service";
import { SkillsService } from "../skills/skills.service";
import { ProjectStatus } from "../projects/entities/project.entity";

@Injectable()
export class DashboardService {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly skillsService: SkillsService
  ) {}

  async getStats() {
    const totalProjects = await this.projectsService.count();
    const completedProjects = await this.projectsService.countByStatus(
      ProjectStatus.COMPLETED
    );
    const inProgressProjects = await this.projectsService.countByStatus(
      ProjectStatus.IN_PROGRESS
    );
    const futureProjects = await this.projectsService.countByStatus(
      ProjectStatus.FUTURE
    );
    const totalSkills = await this.skillsService.count();

    const projects = await this.projectsService.findAll();
    const skills = await this.skillsService.findAll();

    // Calculate average skill level
    const avgSkillPercentage =
      skills.length > 0
        ? Math.round(
            skills.reduce((acc, skill) => acc + skill.percentage, 0) /
              skills.length
          )
        : 0;

    // Group projects by status
    const projectsByStatus = {
      completed: completedProjects,
      inProgress: inProgressProjects,
      future: futureProjects,
    };

    // Group skills by category
    const skillsByCategory = await this.skillsService.getByCategories();
    const skillCategoryCounts = Object.entries(skillsByCategory).map(
      ([category, skills]) => ({
        category,
        count: skills.length,
      })
    );

    return {
      overview: {
        totalProjects,
        completedProjects,
        inProgressProjects,
        futureProjects,
        totalSkills,
        avgSkillPercentage,
      },
      charts: {
        projectsByStatus,
        skillsByCategory: skillCategoryCounts,
      },
    };
  }

  async getTimeline() {
    const projects = await this.projectsService.findAll();

    const timeline = projects.map((project) => ({
      id: project.id,
      title: project.title,
      date: project.createdAt,
      type: "project",
      status: project.status,
      category: project.category,
    }));

    return timeline.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  async getRecentActivity() {
    const projects = await this.projectsService.findAll();
    const skills = await this.skillsService.findAll();

    const recentProjects = projects
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
      .slice(0, 5)
      .map((p) => ({
        type: "project",
        title: p.title,
        action: "updated",
        date: p.updatedAt,
      }));

    const recentSkills = skills
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
      .slice(0, 5)
      .map((s) => ({
        type: "skill",
        title: s.name,
        action: "updated",
        date: s.updatedAt,
      }));

    const combined = [...recentProjects, ...recentSkills]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);

    return combined;
  }
}
