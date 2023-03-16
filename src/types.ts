export type ArtInfo = {
  thumbnail: { alt_text: string };
  artist_display: string;
  date_display: string;
  id: number;
  image_id: string;
  title: string;
  imageUrl: string;
  updatedAt: Date;
  lines: number;
};

export type Team = {
  name: string;
  color: string;
  description: string;
  score: number;
};

export type User = {
  role: 'WRITER' | 'LEADER';
  id: number;
  email: string;
  password: string;
  teamId: string;
  displayName: string;
}
