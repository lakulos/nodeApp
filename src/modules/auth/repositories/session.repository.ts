import { Logger } from '@nestjs/common';
import { BaseRepository } from '@shared/repository/base-repository';
import { Session, SessionModel, Prisma } from '../entities/session.entity';

const include: Prisma.SessionInclude = {
  user: true,
};

type CreateSessionDto = {
  userId: string;
  token: string;
  expiresAt: Date;
};

export type SessionWithUser = Prisma.SessionGetPayload<{
  include: typeof include;
}>;

export class SessionRepository extends BaseRepository<Session> {
  private logger = new Logger(SessionRepository.name);
  private readonly sessionRepository: typeof SessionModel;

  constructor() {
    super();
    this.sessionRepository = SessionModel;
  }

  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    return this.sessionRepository.create({
      data: createSessionDto,
    });
  }

  async update(
    id: string,
    data: Partial<Omit<Session, 'id'>>,
  ): Promise<Session> {
    const session = await this.sessionRepository.update({
      where: {
        id,
      },
      data,
    });

    return session;
  }

  async findOne(
    param: Partial<Session>,
    searchType: 'OR' | 'AND' = 'OR',
    expand: boolean = false,
  ): Promise<SessionWithUser | Session> {
    let options: { where: Record<string, any>; include: Record<string, any> };
    let searchParam = [];

    for (let key in param) {
      searchParam.push({ [key]: param[key] });
    }
    options.where[searchType] = searchParam;

    if (expand) {
      options.include = { user: true };
    }

    return this.sessionRepository.findFirst(options);
  }

  async findAll(filter: Record<string, any>): Promise<Session[]> {
    return await this.sessionRepository.findMany();
  }
}
