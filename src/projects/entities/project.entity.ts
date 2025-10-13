import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum ProjectStatus {
  IN_PROGRESS = 'en_cours',
  COMPLETED = 'termine',
  FUTURE = 'futur',
}

export enum ProjectRole {
  DEVELOPER = 'developer',
  MANAGER = 'manager',
  BOTH = 'both',
}

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  category: string;

  @Column('text')
  description: string;

  @Column('simple-array')
  technologies: string[];

  @Column({
    type: 'enum',
    enum: ProjectRole,
    default: ProjectRole.DEVELOPER,
  })
  role: ProjectRole;

  @Column({ nullable: true })
  roleDescription: string;

  @Column({ nullable: true })
  team: string;

  @Column({ nullable: true })
  duration: string;

  @Column({ nullable: true })
  githubLink: string;

  @Column({ nullable: true })
  demoLink: string;

  @Column('simple-array', { nullable: true })
  images: string[];

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.COMPLETED,
  })
  status: ProjectStatus;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: true })
  color: string;

  @Column({ default: 0 })
  order: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
