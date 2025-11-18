import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ProjectsModule } from "./projects/projects.module";
import { SkillsModule } from "./skills/skills.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { SeedModule } from "./seed/seed.module";
import { UploadModule } from "./upload/upload.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // ---------- TYPEORM CONFIG COMPATIBLE RENDER ----------
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isProduction = configService.get("NODE_ENV") === "production";
        const databaseUrl = configService.get("DATABASE_URL");

        if (isProduction && databaseUrl) {
          // --- CONFIGURATION RENDER ---
          return {
            type: "postgres",
            url: databaseUrl,
            autoLoadEntities: true,
            synchronize: false,
            ssl: {
              rejectUnauthorized: false,
            },
          };
        }

        // --- CONFIGURATION LOCALE ---
        return {
          type: "postgres",
          host: configService.get("DB_HOST", "localhost"),
          port: configService.get("DB_PORT", 5432),
          username: configService.get("DB_USERNAME", "postgres"),
          password: configService.get("DB_PASSWORD", ""),
          database: configService.get("DB_DATABASE", "portfolio_db"),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),

    ProjectsModule,
    SkillsModule,
    DashboardModule,
    SeedModule,
    UploadModule,
  ],
})
export class AppModule {}
