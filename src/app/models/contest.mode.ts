export interface Contest {
  _id: string;
  name: string;
  description: string;
  hidden: boolean;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContestFilterModel {
  hidden: boolean;
}
