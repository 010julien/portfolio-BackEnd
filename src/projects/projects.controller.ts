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
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ProjectsService } from "./projects.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { ProjectStatus } from "./entities/project.entity";

@ApiTags("projects")
@Controller()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

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
  findAll(@Query("status") status?: ProjectStatus) {
    if (status) {
      return this.projectsService.findByStatus(status);
    }
    return this.projectsService.findAll();
  }

  @Get("projects/:id")
  @Get("api/projects/:id")
  @ApiOperation({ summary: "Get a project by id" })
  @ApiResponse({ status: 200, description: "Return the project" })
  @ApiResponse({ status: 404, description: "Project not found" })
  findOne(@Param("id") id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch("projects/:id")
  @Patch("api/projects/:id")
  @ApiOperation({ summary: "Update a project" })
  @ApiResponse({ status: 200, description: "Project updated successfully" })
  @ApiResponse({ status: 404, description: "Project not found" })
  update(@Param("id") id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
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
