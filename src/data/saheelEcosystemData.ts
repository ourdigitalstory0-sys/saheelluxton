export interface SaheelProject {
  id: string;
  name: string;
  brandName: string;
  category: string;
  locality: string;
  configurations: string[];
  startingPrice: string;
  keyHighlight: string;
  reraNumber?: string;
  status: string;
  description: string;
  keywords: string[];
}

export interface LocationHub {
  name: string;
  tag: string;
  headline: string;
  avgRate: string;
  growthYoY: string;
  keyConnectivity: string;
  projects: string[];
  topKeywords: string[];
}

export const saheelProjectsList: SaheelProject[] = [
  {
    id: "luxton-wakad",
    name: "Luxton By Saheel",
    brandName: "Saheel Luxton",
    category: "Ultra-Luxury High-Rise Flagship",
    locality: "Wakad, Pune (Near Phoenix Mall)",
    configurations: ["2 BHK (753-809 sq.ft)", "3 BHK (1,027-1,162 sq.ft)", "4 BHK (1,458 sq.ft)"],
    startingPrice: "₹97 Lakhs*",
    keyHighlight: "Pune's 1st 4,000 Sq.Ft. Double-Height Grand Lobby & 5-Star Rooftop Aqua Theatre",
    reraNumber: "PM1260002502043",
    status: "New Launch / Under Construction",
    description: "30-Storey iconic architectural towers on 3.38 acres featuring designer walk-in closets in every home and 30+ 5-star lifestyle amenities.",
    keywords: [
      "Saheel Luxton", "Luxton by Saheel", "Saheel Luxton Wakad", "Luxton Wakad Pune", 
      "2 BHK in Wakad", "3 BHK in Wakad", "4 BHK in Wakad", "Luxury flats in Wakad", 
      "Rooftop Aqua Theatre Pune", "4000 sq ft grand lobby Wakad", "MahaRERA PM1260002502043"
    ]
  },
  {
    id: "itrend-vesta-tathawade",
    name: "iTrend Vesta & Vesta 2.0",
    brandName: "Saheel iTrend Vesta",
    category: "Premium Urban Living",
    locality: "Tathawade / Wakad Annex, Pune",
    configurations: ["2 BHK", "3 BHK"],
    startingPrice: "₹68 Lakhs*",
    keyHighlight: "Modern Lifestyle Township with State-of-the-Art Clubhouse & Podiums",
    reraNumber: "MahaRERA Registered",
    status: "Ongoing / Fast Selling",
    description: "Designed for modern families and IT professionals seeking seamless access to Hinjawadi IT Park, Mumbai-Pune Expressway, and top schools.",
    keywords: [
      "iTrend Vesta", "Saheel iTrend Vesta", "iTrend Vesta Tathawade", "iTrend Vesta Wakad",
      "iTrend Vesta 2.0", "2 BHK Tathawade", "3 BHK Tathawade", "flats in Tathawade"
    ]
  },
  {
    id: "itrend-futura-mahalunge",
    name: "iTrend Futura",
    brandName: "Saheel iTrend Futura",
    category: "Mega High-Rise Township",
    locality: "Mahalunge Hi-Tech City, Pune",
    configurations: ["2 BHK", "3 BHK", "4 BHK"],
    startingPrice: "₹72 Lakhs*",
    keyHighlight: "6-Acre Master-Planned Sanctuary with 6 High-Rise Skyline Towers",
    reraNumber: "MahaRERA Registered",
    status: "Under Construction",
    description: "Futuristic 6-acre gated community bordering Hinjawadi IT Park and Baner with over 40 lifestyle amenities and riverfront views.",
    keywords: [
      "iTrend Futura", "Saheel iTrend Futura", "iTrend Futura Mahalunge", "iTrend Futura Pune",
      "2 BHK Mahalunge", "3 BHK Mahalunge", "4 BHK Mahalunge", "flats in Mahalunge"
    ]
  },
  {
    id: "landmarc-hinjawadi",
    name: "Landmarc by Saheel",
    brandName: "Saheel Landmarc",
    category: "IT Corridor Landmark Residences",
    locality: "Hinjawadi / Hinjewadi, Pune",
    configurations: ["2 BHK", "3 BHK"],
    startingPrice: "₹65 Lakhs*",
    keyHighlight: "Walk-to-Work Proximity to Rajiv Gandhi Infotech Park & Metro Line 3",
    reraNumber: "MahaRERA Registered",
    status: "New Launch",
    description: "Future-ready smart apartments with convertible layouts, high rental yields, and direct arterial access to Phase 1, 2, and 3 IT campuses.",
    keywords: [
      "Landmarc by Saheel", "Saheel Landmarc", "Landmarc Hinjawadi", "Landmarc Hinjewadi",
      "2 BHK Hinjawadi", "3 BHK Hinjawadi", "flats near Hinjawadi IT Park"
    ]
  },
  {
    id: "palacio-chinchwad",
    name: "Palacio by Saheel",
    brandName: "Saheel Palacio / iTrend Palacio",
    category: "Boutique Luxury Living",
    locality: "Chinchwad, Pune",
    configurations: ["2 BHK", "3 BHK"],
    startingPrice: "₹62 Lakhs*",
    keyHighlight: "Grand Entrance, Rooftop Leisure & Central PCMC Connectivity",
    reraNumber: "MahaRERA Registered",
    status: "Under Construction",
    description: "Palatial urban residences designed with expansive living balconies, podium amenities, and direct access to Old Pune-Mumbai Highway.",
    keywords: [
      "Palacio by Saheel", "Saheel Palacio", "Palacio Chinchwad", "iTrend Palacio",
      "2 BHK Chinchwad", "3 BHK Chinchwad", "flats in Chinchwad"
    ]
  },
  {
    id: "itrend-city-life",
    name: "iTrend City Life",
    brandName: "Saheel iTrend City Life",
    category: "Smart Convertible Living",
    locality: "Wakad / West Pune",
    configurations: ["2 BHK", "3 BHK"],
    startingPrice: "₹64 Lakhs*",
    keyHighlight: "Zero Space Wastage, Smart Convertible Rooms & Work-From-Home Suites",
    reraNumber: "MahaRERA Registered",
    status: "Delivered / Ready",
    description: "Innovative homes built with convertible layouts offering flexible living for young professionals and expanding families.",
    keywords: [
      "iTrend City Life", "Saheel iTrend City Life", "convertible homes Pune", "smart apartments Pune"
    ]
  },
  {
    id: "saheel-hinjewadi-phase-3",
    name: "Saheel Phase 3 Skybridge Launch",
    brandName: "Saheel Hinjawadi Phase 3",
    category: "Skybridge-Connected High-Rise",
    locality: "Hinjawadi Phase 3, Pune (Near Metro)",
    configurations: ["2 BHK", "3 BHK"],
    startingPrice: "₹59 Lakhs*",
    keyHighlight: "Iconic Skybridge-Connected Towers & Proximity to Upcoming Metro",
    reraNumber: "MahaRERA In-Process",
    status: "Pre-Launch / Expression of Interest",
    description: "Pioneering architectural skybridge connecting residential towers with sky-deck fitness arenas, co-working pods, and WFH infrastructure.",
    keywords: [
      "Saheel Hinjewadi Phase 3", "Saheel Hinjawadi Phase 3", "skybridge apartments Hinjewadi",
      "pre launch projects Hinjewadi Phase 3", "2 BHK flats Hinjewadi Phase 3"
    ]
  }
];

export const locationHubsList: LocationHub[] = [
  {
    name: "Wakad",
    tag: "Epicenter of Luxury & Phoenix Mall",
    headline: "West Pune's #1 Luxury Real Estate Corridor",
    avgRate: "₹9,200 - ₹12,500 / sq.ft",
    growthYoY: "+14.8%",
    keyConnectivity: "5 mins to Phoenix Mall, 8 mins to Hinjawadi, 5 mins to Expressway",
    projects: ["Luxton By Saheel", "iTrend City Life"],
    topKeywords: ["flats in Wakad", "2 BHK in Wakad", "3 BHK in Wakad", "4 BHK in Wakad", "luxury flats Wakad", "Saheel Luxton Wakad"]
  },
  {
    name: "Hinjawadi / Hinjewadi",
    tag: "IT Hub & Metro Line 3 Corridor",
    headline: "India's Tech Capital & High Rental Yield Hub",
    avgRate: "₹7,800 - ₹10,500 / sq.ft",
    growthYoY: "+12.4%",
    keyConnectivity: "400,000+ tech workforce, PMRDA Metro Line 3, Rajiv Gandhi Infotech Park",
    projects: ["Landmarc by Saheel", "Saheel Phase 3 Skybridge Launch"],
    topKeywords: ["flats Hinjawadi", "flats Hinjewadi", "2 BHK Hinjawadi", "3 BHK Hinjewadi", "flats near Hinjawadi IT Park"]
  },
  {
    name: "Tathawade",
    tag: "Education & Expressway Hub",
    headline: "Rapidly Growing Residential Hotspot",
    avgRate: "₹7,500 - ₹9,800 / sq.ft",
    growthYoY: "+13.5%",
    keyConnectivity: "Direct connectivity to D.Y. Patil, Indira College, Mumbai-Pune Highway",
    projects: ["iTrend Vesta & Vesta 2.0"],
    topKeywords: ["flats in Tathawade", "2 BHK Tathawade", "3 BHK Tathawade", "iTrend Vesta Tathawade"]
  },
  {
    name: "Mahalunge",
    tag: "Hi-Tech City & Bridge Connectivity",
    headline: "Integrated Planned Township Destination",
    avgRate: "₹8,200 - ₹10,200 / sq.ft",
    growthYoY: "+13.1%",
    keyConnectivity: "Hinjawadi-Mahalunge bridge, 12 mins to Balewadi High Street",
    projects: ["iTrend Futura"],
    topKeywords: ["flats in Mahalunge", "2 BHK Mahalunge", "3 BHK Mahalunge", "4 BHK Mahalunge", "iTrend Futura Mahalunge"]
  },
  {
    name: "Baner & Balewadi",
    tag: "High Street & Cosmopolitan Lifestyle",
    headline: "Pune's Elite Retail & Culinary Capital",
    avgRate: "₹11,000 - ₹14,500 / sq.ft",
    growthYoY: "+11.2%",
    keyConnectivity: "Balewadi High Street, Cummins India, Jupiter Hospital",
    projects: ["Luxton By Saheel (Neighbouring Luxury Corridor)"],
    topKeywords: ["3 BHK in Baner", "4 BHK in Baner", "luxury flats Baner", "Balewadi High Street flats"]
  },
  {
    name: "Chinchwad & PCMC",
    tag: "Industrial & Metro Connected",
    headline: "Established Infrastructure & Broad Avenues",
    avgRate: "₹7,000 - ₹9,200 / sq.ft",
    growthYoY: "+10.8%",
    keyConnectivity: "Old Pune-Mumbai Highway, PCMC Metro Station, Auto Cluster",
    projects: ["Palacio by Saheel"],
    topKeywords: ["flats in Chinchwad", "2 BHK Chinchwad", "3 BHK Chinchwad", "Palacio Chinchwad"]
  },
  {
    name: "Ravet & Punawale",
    tag: "Expressway Gateway",
    headline: "Emerging Western Suburbs with High ROI",
    avgRate: "₹6,800 - ₹8,900 / sq.ft",
    growthYoY: "+12.1%",
    keyConnectivity: "BRTS Corridor, Mukai Chowk, Expressway Toll Plaza",
    projects: ["Saheel Completed Portfolio (ITrend Homes, ITrend Waterfront)"],
    topKeywords: ["flats in Ravet", "flats in Punawale", "2 BHK Ravet", "2 BHK Punawale"]
  }
];

export const semanticIntentMatrix = [
  {
    title: "1. Brand & Developer Monopoly",
    description: "Saheel Properties legacy, 25+ years track record, 10M+ sq.ft delivered, RERA credentials & official builder direct portal.",
    tags: [
      "Saheel Properties", "Saheel Properties Pune", "Saheel Properties projects", "Saheel Properties upcoming projects",
      "Saheel Properties new launch", "Saheel Properties RERA", "Saheel Properties contact", "Saheel builder Pune",
      "best projects by Saheel Properties", "Saheel Properties official website", "Saheel Properties reviews"
    ]
  },
  {
    title: "2. Purchase & Commercial Intent",
    description: "High-converting search strings from homebuyers and NRI investors ready to transact.",
    tags: [
      "buy flat from Saheel Properties", "Saheel Properties flats for sale", "Saheel Properties 2 BHK",
      "Saheel Properties 3 BHK", "Saheel Properties 4 BHK", "Saheel Properties luxury flats",
      "Saheel Properties site visit", "Saheel Properties book flat", "Saheel Properties price list 2026",
      "invest in Saheel Properties", "Saheel Properties new launch flats"
    ]
  },
  {
    title: "3. Typology & Configuration Matrix",
    description: "Precision searches across 1 BHK, 2 BHK, 3 BHK, 4 BHK, and Sky Duplex residences.",
    tags: [
      "2 BHK in Wakad", "3 BHK in Wakad", "4 BHK in Wakad", "2 BHK Hinjawadi", "3 BHK Hinjawadi",
      "2 BHK Tathawade", "3 BHK Tathawade", "3 BHK Mahalunge", "4 BHK Mahalunge", "4 BHK in Baner",
      "Sky Duplex in Wakad", "2 BHK near IT park", "3 BHK near IT park", "4 BHK luxury apartments Pune"
    ]
  },
  {
    title: "4. Floor Plans, RERA & Technical Engineering",
    description: "Detailed blueprints, carpet areas, earthquake-resistant RCC shear wall technology, and MahaRERA PM1260002502043 compliance.",
    tags: [
      "Saheel Luxton floor plan", "Luxton 2 BHK floor plan", "Luxton 3 BHK floor plan", "Luxton 4 BHK floor plan",
      "Luxton carpet area", "vastu floor plan Wakad", "MahaRERA PM1260002502043", "zero wastage floor plans Pune",
      "earthquake resistant RCC shear wall homes", "downloadable floor plan PDF"
    ]
  },
  {
    title: "5. 5-Star Amenities & Luxury Lifestyle",
    description: "Pune's exclusive architectural features: 4,000 sq.ft lobby, rooftop aqua theatre, and walk-in dressing suites.",
    tags: [
      "Pune 1st 4000 sq ft grand lobby", "5 Star Rooftop Aqua Theatre Pune", "Apartments with designer walk-in closets",
      "30 Storey high rise towers Wakad", "Luxton rooftop club Wakad", "infinity horizon pool Wakad",
      "co working space Wakad", "EV charging residential Pune"
    ]
  },
  {
    title: "6. Connectivity, Transit & Infrastructure",
    description: "Proximity to Hinjawadi IT Park, PMRDA Metro Line 3, Phoenix Mall, and Mumbai-Pune Expressway.",
    tags: [
      "flats near Phoenix Mall of Millennium", "flats near Hinjawadi IT Park", "flats near Rajiv Gandhi Infotech Park",
      "flats near Metro Line 3 Wakad", "apartments near Mumbai Pune Expressway", "flats for IT professionals Pune",
      "Wakad highway connectivity", "Hinjawadi metro connectivity"
    ]
  },
  {
    title: "7. Investment ROI & Micro-Market Comparisons",
    description: "Evaluating capital appreciation (14.8% YoY), rental yields (4.8% - 5.6%), and cross-corridor market trends.",
    tags: [
      "Wakad property investment", "rental yield Wakad", "rental yield Hinjawadi", "capital appreciation Pune",
      "Wakad vs Tathawade", "Wakad vs Hinjawadi", "Mahalunge vs Baner", "best investment location West Pune",
      "is Saheel Luxton worth buying", "which Saheel project is best in Pune"
    ]
  }
];
