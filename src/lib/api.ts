import type { BrandHero, GalleryItem, Service, Stat, TickerItem } from './types';

const fallbackBrand: BrandHero = {
  id: 1,
  brand: 'MONARCH',
  alias: 'Adil Chandio',
  headline: 'Architecting High-Yield Faceless YouTube Empires with AI',
  role: 'YT Automation × AI Expert',
  bio: 'Building automated content systems, algorithmic growth engines, and high-retention faceless channels powered by state-of-the-art AI pipelines.',
  cta_label: 'Claim Your Empire',
  video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
};

const fallbackStats: Stat[] = [
  { id: 1, value: 150, prefix: '+', suffix: 'M', label: 'Total Views Generated' },
  { id: 2, value: 45, prefix: '', suffix: '+', label: 'Monetized Channels' },
  { id: 3, value: 99.4, prefix: '', suffix: '%', label: 'AI Pipeline Automation' },
  { id: 4, value: 8, prefix: '$', suffix: 'M+', label: 'Client Revenue Tracked' },
];

const fallbackServices: Service[] = [
  {
    id: 1,
    icon: 'bot',
    title: 'AI Scripting & Voice',
    description: 'Hyper-engaging algorithmic scripts engineered for maximum watch time, paired with natural emotive voice models.',
  },
  {
    id: 2,
    icon: 'rocket',
    title: 'Automated Production',
    description: 'End-to-end video pipeline including dynamic pacing, 4K rendering, automatic asset sourcing, and sound design.',
  },
  {
    id: 3,
    icon: 'chart',
    title: 'Algorithmic Growth',
    description: 'High CTR thumbnail strategy, SEO keyword domination, and trend-jacking systems that trigger YouTube browse features.',
  },
  {
    id: 4,
    icon: 'crown',
    title: 'Channel Empire Scaling',
    description: 'Turnkey YouTube media businesses scaled from zero to consistent monthly passive monetization.',
  },
];

const fallbackTicker: TickerItem[] = [
  { id: 1, text: 'YT AUTOMATION' },
  { id: 2, text: 'AI CONTENT PIPELINES' },
  { id: 3, text: 'VIRAL RETENTION SYSTEMS' },
  { id: 4, text: 'SCALE TO 8-FIGURE VIEWS' },
  { id: 5, text: 'MONARCH BY ADIL CHANDIO' },
];

const fallbackGallery: GalleryItem[] = [
  {
    id: 1,
    image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    title: 'Neural Velocity',
    category: 'AI Pipeline',
    pos_top: 6,
    pos_left: 8,
    width: 38,
    rotation: -3,
  },
  {
    id: 2,
    image_url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=80',
    title: 'Apex Retention',
    category: 'Case File 01',
    pos_top: 18,
    pos_left: 54,
    width: 36,
    rotation: 2,
  },
  {
    id: 3,
    image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    title: 'Empire Genesis',
    category: 'Scale Architecture',
    pos_top: 36,
    pos_left: 10,
    width: 40,
    rotation: -2,
  },
  {
    id: 4,
    image_url: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=800&auto=format&fit=crop&q=80',
    title: 'Algorithmic Gold',
    category: 'Monetization',
    pos_top: 52,
    pos_left: 52,
    width: 38,
    rotation: 3,
  },
  {
    id: 5,
    image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    title: 'Quantum Media',
    category: 'Faceless Systems',
    pos_top: 68,
    pos_left: 12,
    width: 38,
    rotation: -4,
  },
  {
    id: 6,
    image_url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop&q=80',
    title: 'Royal Syndicate',
    category: 'Automated Brand',
    pos_top: 82,
    pos_left: 50,
    width: 36,
    rotation: 2,
  },
];

async function get<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`${path} returned ${res.status}`);
    const data = await res.json();
    if (!data || (Array.isArray(data) && data.length === 0)) return fallback;
    return data;
  } catch {
    return fallback;
  }
}

export const fetchBrand = () => get<BrandHero>('/api/brand', fallbackBrand);
export const fetchStats = () => get<Stat[]>('/api/stats', fallbackStats);
export const fetchServices = () => get<Service[]>('/api/services', fallbackServices);
export const fetchTicker = () => get<TickerItem[]>('/api/ticker', fallbackTicker);
export const fetchGallery = () => get<GalleryItem[]>('/api/gallery', fallbackGallery);
