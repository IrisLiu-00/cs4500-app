export type UserPartial = {
  id: number;
  teamId: string;
  displayName: string;
};

export interface UserPatch {
  displayName: string;
  email: string;
  password: string;
}

export interface User extends UserPartial {
  role: 'WRITER' | 'LEADER';
  email: string;
  password: string;
}

export type Line = {
  id: number;
  text: string;
  timestamp: Date;
  user: UserPartial;
};

export type StoryPartial = {
  id: number;
  image_id: string;
  imageUrl: string;
  title: string;
  thumbnail: { alt_text: string };
};

export interface StorySummary extends StoryPartial {
  updatedAt: Date;
  length: number;
}

export interface StoryDetail extends StoryPartial {
  artist_display: string;
  date_display: string;
  lines: Line[];
}

export type Team = {
  id: string;
  color: string;
  description: string;
  score: number;
  leadId: number;
};

export type TeamDetail = {
  id: string;
  color: string;
  description: string;
  score: number;
  leadId: number;
  members: UserPartial[];
};

export type TeamPatch = {
  description: string;
  color: string;
};
