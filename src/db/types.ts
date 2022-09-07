export interface Entity {
  id: string;
}

export interface Character extends Entity {
  name: string;
  episodes: string[];
  planet?: string | null;
}

export type CreateDto<T> = Omit<T, 'id'>;
export type GetDto<T extends Entity> = Pick<T, 'id'>;
export type DeleteDto<T extends Entity> = Pick<T, 'id'>;
export type UpdateDto<T extends Entity> = {
  id: T['id'];
  patch: Partial<Omit<T, 'id'>>;
};

export type PaginatedData<T extends Entity> = {
  items: [T];
  lastEvaluatedKey: Entity;
};

export type PaginatedSearch = {
  limit?: number;
  lastEvaluatedKey?: Entity['id'];
};
