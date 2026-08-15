export interface KeyStat {
  value: string;
  unit: string;
  label: string;
  icon: string;
}

export interface HeroMedia {
  desktopBanner: string;
  mobileBanner: string;
  dayElevation: string;
  nightView: string;
  birdsEyeView: string;
  entranceView: string;
}

export interface HighlightItem {
  id: string;
  title: string;
  badge: string;
  desc: string;
  icon: string;
  image: string;
}

export interface AmenityItem {
  title: string;
  desc: string;
  image: string;
  tag: string;
}

export interface UnitPlan {
  title: string;
  carpet: string;
  image: string;
}

export interface Typology {
  id: string;
  type: string;
  carpetArea: string;
  balconies: string;
  bathrooms: string;
  startingPrice: string;
  priceNumber: number;
  description: string;
  features: string[];
  plans: UnitPlan[];
}

export interface GalleryRender {
  title: string;
  category: 'Exterior' | 'Interiors' | 'Rooftop' | 'Podium' | 'All';
  image: string;
  caption: string;
}

export interface LocationItem {
  name: string;
  distance: string;
  time: string;
}

export interface LocationCategory {
  id: string;
  name: string;
  icon: string;
  items: LocationItem[];
}

export interface LocationData {
  mapEmbed: string;
  mapImage: string;
  categories: LocationCategory[];
}

export interface SpecificationCategory {
  category: string;
  icon: string;
  items: string[];
}

export interface DeveloperProject {
  name: string;
  location: string;
  type: string;
}

export interface DeveloperInfo {
  name: string;
  tagline: string;
  experience: string;
  sqftDelivered: string;
  happyFamilies: string;
  overview: string;
  otherProjects: DeveloperProject[];
}

export interface ProjectData {
  title: string;
  tagline: string;
  subTagline: string;
  developer: string;
  reraNo: string;
  location: string;
  exactAddress: string;
  corporateAddress: string;
  contactPhone: string;
  whatsappPhone: string;
  contactEmail: string;
  landParcel: string;
  structure: string;
  possessionDate: string;
  videoTourUrl: string;
  brochurePdfUrl: string;
  googleMapsUrl: string;
  keyStats: KeyStat[];
  heroMedia: HeroMedia;
  overviewText: string;
  highlights: HighlightItem[];
  amenitiesByLevel: {
    rooftop: AmenityItem[];
    ground: AmenityItem[];
  };
  typologies: Typology[];
  masterPlanImage: string;
  galleryRenders: GalleryRender[];
  locationData: LocationData;
  specifications: SpecificationCategory[];
  developerInfo: DeveloperInfo;
}
