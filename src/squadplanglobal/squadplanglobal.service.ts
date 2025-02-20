import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SquadplanglobalEntity } from './entities/squadplanglobal.entity';
import { DeleteResult, Repository } from 'typeorm';
import { RelationsOptionsType } from 'src/types/RelationsOptions.type';
import { FormationEnum } from 'src/shared/enums/Formation.enum';

@Injectable()
export class SquadplanglobalService {
  constructor(
    @InjectRepository(SquadplanglobalEntity)
    private readonly squadplanglobalRepository: Repository<SquadplanglobalEntity>,
  ) {}

  async createSquadplanglobal(
    teamglobalId: number,
    formationId: FormationEnum,
    playerglobalIds: number[],
  ): Promise<SquadplanglobalEntity> {
    return this.squadplanglobalRepository.save({
      teamglobalId,
      formationId,
      playerglobalIds,
    });
  }

  async findSquadplanglobalByTeamglobalId(
    teamglobalId: number,
    relations?: RelationsOptionsType,
  ): Promise<SquadplanglobalEntity> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      where: {
        teamglobalId: teamglobalId,
      },
    };

    if (relations && Object.keys(relations).length > 0) {
      findOptions = {
        ...findOptions,
        relations,
      };
    }

    const squadplanglobal =
      await this.squadplanglobalRepository.findOne(findOptions);

    if (!squadplanglobal) {
      throw new NotFoundException(
        `Squadplanglobal of teamglobalId: ${teamglobalId} not found.`,
      );
    }

    return squadplanglobal;
  }

  async updateSquadplanglobal(
    squadplanglobalId: number,
    teamglobalId: number,
    formationId: FormationEnum,
    playerglobalIds: number[],
  ): Promise<SquadplanglobalEntity> {
    const squadplanglobal =
      await this.findSquadplanglobalByTeamglobalId(squadplanglobalId);

    return this.squadplanglobalRepository.save({
      ...squadplanglobal,
      teamglobalId,
      formationId,
      playerglobalIds,
    });
  }

  async deleteSquaplanglobalByTeamglobalId(
    teamglobalId: number,
  ): Promise<DeleteResult> {
    return this.squadplanglobalRepository.delete({
      teamglobalId,
    });
  }
}
