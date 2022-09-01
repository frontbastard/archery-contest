export interface Contest {
  id: string;
  name: string;
  description: string;
  hidden: boolean;
  ownerId: string;
  ownerName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContestFilterModel {
  hidden: boolean;
  public: boolean;
}
