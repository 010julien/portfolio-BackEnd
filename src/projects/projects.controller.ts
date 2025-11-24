import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  Req,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ProjectsService } from "./projects.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { Project, ProjectStatus } from "./entities/project.entity";
import { Request } from "express";

@ApiTags("projects")
@Controller()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  private resolveUrl(url?: string, req?: Request): string | undefined {
    if (!url) return url;
    const baseUrl = (req && (process.env.API_URL || `${req.protocol}://${req.get("host")}`)) || process.env.API_URL;
    if (!baseUrl) return url;
    if (url.startsWith("http")) {
      return url.replace(/^https?:\/\/localhost:\d+/i, baseUrl);
    }
    if (url.startsWith("/")) return `${baseUrl}${url}`;
    if (url.startsWith("uploads/")) return `${baseUrl}/${url}`;
    return url;
  }

  private mapProject(project: Project, req?: Request): Project {
    if (!project) return project;
    const mapped: Project = { ...project } as Project;
    if (mapped.icon) mapped.icon = this.resolveUrl(mapped.icon as unknown as string, req) as any;
    if (Array.isArray(mapped.images)) {
      mapped.images = mapped.images.map((u) => this.resolveUrl(u as unknown as string, req) as any);
    }
    return mapped;
  }

  @Post("projects")
  @Post("api/projects")
  @ApiOperation({ summary: "Create a new project" })
  @ApiResponse({ status: 201, description: "Project created successfully" })
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get("projects")
  @Get("api/projects")
  @ApiOperation({ summary: "Get all projects" })
  @ApiResponse({ status: 200, description: "Return all projects" })
  findAll(@Query("status") status?: ProjectStatus, @Req() req?: Request) {
    if (status) {
      return this.projectsService
        .findByStatus(status)
        .then((projects) => projects.map((p) => this.mapProject(p, req)));
    }
    return this.projectsService
      .findAll()
      .then((projects) => projects.map((p) => this.mapProject(p, req)));
  }

  @Get("projects/:id")
  @Get("api/projects/:id")
  @ApiOperation({ summary: "Get a project by id" })
  @ApiResponse({ status: 200, description: "Return the project" })
  @ApiResponse({ status: 404, description: "Project not found" })
  findOne(@Param("id") id: string, @Req() req?: Request) {
    return this.projectsService.findOne(id).then((p) => this.mapProject(p, req));
  }

  @Patch("projects/:id")
  @Patch("api/projects/:id")
  @ApiOperation({ summary: "Update a project" })
  @ApiResponse({ status: 200, description: "Project updated successfully" })
  @ApiResponse({ status: 404, description: "Project not found" })
  update(
    @Param("id") id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Req() req?: Request
  ) {
    return this.projectsService.update(id, updateProjectDto).then((p) => this.mapProject(p, req));
  }

  @Delete("projects/:id")
  @Delete("api/projects/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete a project" })
  @ApiResponse({ status: 204, description: "Project deleted successfully" })
  @ApiResponse({ status: 404, description: "Project not found" })
  remove(@Param("id") id: string) {
    return this.projectsService.remove(id);
  }
}
