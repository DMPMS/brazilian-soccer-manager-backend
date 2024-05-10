import { CountryEntity } from 'src/country/entities/country.entity';
import { RuleEntity } from 'src/rule/entities/rule.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';
import { CreateCompetitionglobalDto } from '../dtos/createCompetitionglobal.dto';

@Entity({ name: 'competitionglobal' })
@TableInheritance({ column: { type: 'varchar', name: 'level' } })
export abstract class CompetitionglobalEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'rule_id', nullable: false })
  ruleId: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'season', nullable: false })
  season: string;

  @Column({ name: 'level', nullable: false })
  level: string;

  @Column({ name: 'src_image', nullable: false })
  srcImage: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => RuleEntity, (rule) => rule.competitionsglobal)
  @JoinColumn({ name: 'rule_id', referencedColumnName: 'id' })
  rule?: RuleEntity;

  @ManyToOne(() => CountryEntity, (country) => country.competitionsglobal)
  @JoinColumn({ name: 'country_id', referencedColumnName: 'id' })
  country?: CountryEntity;

  constructor(createCompetitionglobalDto: CreateCompetitionglobalDto) {
    this.ruleId = createCompetitionglobalDto?.ruleId || 0;
    this.name = createCompetitionglobalDto?.name || '';
    this.season = createCompetitionglobalDto?.season || '';
    this.srcImage = createCompetitionglobalDto?.srcImage || '';
  }
}
