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
import { SkillsService } from "./skills.service";
import { CreateSkillDto } from "./dto/create-skill.dto";
import { UpdateSkillDto } from "./dto/update-skill.dto";
import { SkillCategory } from "./entities/skill.entity";

@ApiTags("skills")
@Controller("api/skills")
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new skill" })
  @ApiResponse({ status: 201, description: "Skill created successfully" })
  create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillsService.create(createSkillDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all skills" })
  @ApiResponse({ status: 200, description: "Return all skills" })
  findAll(@Query("category") category?: SkillCategory) {
    if (category) {
      return this.skillsService.findByCategory(category);
    }
    return this.skillsService.findAll();
  }

  @Get("by-categories")
  @ApiOperation({ summary: "Get skills grouped by categories" })
  @ApiResponse({
    status: 200,
    description: "Return skills grouped by categories",
  })
  getByCategories() {
    return this.skillsService.getByCategories();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a skill by id" })
  @ApiResponse({ status: 200, description: "Return the skill" })
  @ApiResponse({ status: 404, description: "Skill not found" })
  findOne(@Param("id") id: string) {
    return this.skillsService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a skill" })
  @ApiResponse({ status: 200, description: "Skill updated successfully" })
  @ApiResponse({ status: 404, description: "Skill not found" })
  update(@Param("id") id: string, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillsService.update(id, updateSkillDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete a skill" })
  @ApiResponse({ status: 204, description: "Skill deleted successfully" })
  @ApiResponse({ status: 404, description: "Skill not found" })
  remove(@Param("id") id: string) {
    return this.skillsService.remove(id);
  }
}

@Controller("skills")
export class PublicSkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  @ApiOperation({ summary: "Get all skills" })
  @ApiResponse({ status: 200, description: "Return all skills" })
  findAll() {
    return this.skillsService.findAll();
  }

  @Get("by-categories")
  @ApiOperation({ summary: "Get skills grouped by categories" })
  @ApiResponse({
    status: 200,
    description: "Return skills grouped by categories",
  })
  getByCategories() {
    return this.skillsService.getByCategories();
  }
}
