export interface BrandHero {
  id: number;
  brand: string;
  alias: string;
  headline: string;
  role: string;
  bio: string;
  cta_label: string;
  video_url: string;
}

export interface Stat {
  id: number;
  value: number;
  prefix: string;
  suffix: string;
  label: string;
}

export interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface TickerItem {
  id: number;
  text: string;
}

export interface GalleryItem {
  id: number;
  image_url: string;
  title: string;
  category: string;
  pos_top: number;
  pos_left: number;
  width: number;
  rotation: number;
}
