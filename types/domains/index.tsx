export type MDomain = {
  id: number;
  name: string;
  levels: {
    level: number;
    assessments: string;
  }[];
};

export type MDomainFormType = {
  name: string;
  levels: {
    level: number;
    assessments: string;
  }[];
};

export type DomainsList = MDomain[];

export type DomainLevel = {
  domain_id: number;
  id: number;
  level: number;
};

export type DomainLevels = DomainLevel[];
