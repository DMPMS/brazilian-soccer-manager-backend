import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CountryService } from 'src/country/country.service';
import { TeamglobalEntity } from './entities/teamglobal.entity';
import { CreateTeamglobalDTO } from './dtos/createTeamglobal.dto';
import { ManagerglobalService } from 'src/managerglobal/managerglobal.service';
import { UpdateTeamglobalDTO } from './dtos/updateTeamglobal.dto';
import { RelationsOptions } from 'src/types/RelationsOptions.type';
import { PlayerglobalService } from 'src/playerglobal/playerglobal.service';
import { countPlayerglobalByTeamglobalId } from 'src/playerglobal/dtos/countPlayerglobalByTeamglobalId.dto';

@Injectable()
export class TeamglobalService {
  constructor(
    @InjectRepository(TeamglobalEntity)
    private readonly teamglobalRepository: Repository<TeamglobalEntity>,
    private readonly countryService: CountryService,

    @Inject(forwardRef(() => ManagerglobalService))
    private readonly managerglobalService: ManagerglobalService,

    @Inject(forwardRef(() => PlayerglobalService))
    private readonly playerglobalService: PlayerglobalService,
  ) {}

  async createTeamglobal(
    createTeamglobalDTO: CreateTeamglobalDTO,
  ): Promise<TeamglobalEntity> {
    await this.countryService.findCountryById(createTeamglobalDTO.countryId);

    const relations = { teamglobal: true };

    await this.managerglobalService.findManagerglobalById(
      createTeamglobalDTO.managerglobalId,
      relations,
      true,
    );

    await Promise.all(
      createTeamglobalDTO.playerglobalIds.map(async (playerglobalId) => {
        await this.playerglobalService.findPlayerglobalById(
          playerglobalId,
          undefined,
          true,
        );
      }),
    );

    const teamglobal =
      await this.teamglobalRepository.save(createTeamglobalDTO);

    await Promise.all(
      createTeamglobalDTO.playerglobalIds.map(async (playerglobalId) => {
        await this.playerglobalService.updatePlayerglobalTeamglobalId(
          teamglobal.id,
          playerglobalId,
        );
      }),
    );

    return teamglobal;
  }

  async findAllTeamglobal(
    relations?: RelationsOptions,
  ): Promise<TeamglobalEntity[]> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      order: {
        updatedAt: 'DESC',
        id: 'DESC',
      },
    };

    if (relations && Object.keys(relations).length > 0) {
      findOptions = {
        ...findOptions,
        relations,
      };
    }

    const teamsglobal = await this.teamglobalRepository.find(findOptions);

    if (!teamsglobal) {
      throw new NotFoundException(`Teamsglobal not found.`);
    }

    const countPlayersglobalList =
      await this.playerglobalService.countPlayerglobalByTeamglobalId();

    return teamsglobal.map((teamglobal) => {
      return {
        ...teamglobal,
        playersglobalCount: Number(
          this.countPlayersglobalInTeamglobal(
            teamglobal,
            countPlayersglobalList,
          ),
        ),
      };
    });
  }

  async findTeamglobalById(
    teamglobalId: number,
    relations?: RelationsOptions,
  ): Promise<TeamglobalEntity> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      where: {
        id: teamglobalId,
      },
    };

    if (relations && Object.keys(relations).length > 0) {
      findOptions = {
        ...findOptions,
        relations,
      };
    }

    const teamglobal = await this.teamglobalRepository.findOne(findOptions);

    if (!teamglobal) {
      throw new NotFoundException(`teamglobalId: ${teamglobalId} not found.`);
    }

    const countPlayersglobalList =
      await this.playerglobalService.countPlayerglobalByTeamglobalId();

    return {
      ...teamglobal,
      playersglobalCount: Number(
        this.countPlayersglobalInTeamglobal(teamglobal, countPlayersglobalList),
      ),
    };
  }

  async updateTeamglobal(
    updateTeamglobalDTO: UpdateTeamglobalDTO,
    teamglobalId: number,
  ): Promise<TeamglobalEntity> {
    const teamglobal = await this.findTeamglobalById(teamglobalId);

    await this.countryService.findCountryById(updateTeamglobalDTO.countryId);

    if (updateTeamglobalDTO.managerglobalId !== teamglobal.managerglobalId) {
      await this.managerglobalService.findManagerglobalById(
        updateTeamglobalDTO.managerglobalId,
        { teamglobal: true },
        true,
      );
    }

    await Promise.all(
      updateTeamglobalDTO.playerglobalIds.map(async (playerglobalId) => {
        const playerglobal =
          await this.playerglobalService.findPlayerglobalById(playerglobalId);

        if (
          playerglobal.teamglobalId &&
          playerglobal.teamglobalId !== Number(teamglobalId)
        ) {
          throw new BadRequestException(
            `playerglobalId: ${playerglobalId} with teamglobal.`,
          );
        }
      }),
    );

    await this.playerglobalService.updatePlayersglobalAfterUpdateTeamglobal(
      updateTeamglobalDTO.playerglobalIds,
      teamglobalId,
    );

    return this.teamglobalRepository.save({
      ...teamglobal,
      ...updateTeamglobalDTO,
    });
  }

  async deleteTeamglobal(teamglobalId: number): Promise<DeleteResult> {
    const relations = {
      competitionsglobalTeamglobal: true,
      playersglobal: true,
    };

    const teamglobal = await this.findTeamglobalById(teamglobalId, relations);

    if (teamglobal.competitionsglobalTeamglobal.length > 0) {
      throw new BadRequestException(
        `teamglobalId: ${teamglobalId} with relations.`,
      );
    }

    await Promise.all(
      teamglobal.playersglobal.map(async (playerglobal) => {
        await this.playerglobalService.updatePlayerglobalTeamglobalId(
          null,
          playerglobal.id,
        );
      }),
    );

    return this.teamglobalRepository.delete({ id: teamglobalId });
  }

  countPlayersglobalInTeamglobal(
    teamglobal: TeamglobalEntity,
    countPlayersglobalList: countPlayerglobalByTeamglobalId[],
  ): number {
    const count = countPlayersglobalList.find(
      (item) => item.teamglobal_id === teamglobal.id,
    );

    if (count) {
      return count.total;
    }

    return 0;
  }
}
