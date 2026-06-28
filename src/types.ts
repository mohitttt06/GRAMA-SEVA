// GramSeva Connect - Type Definitions and Sample Initial Data

export interface Lineman {
  name: string;
  phone: string;
  avatar: string;
  rating: number;
}

export interface ElectricityComplaint {
  id: string;
  ward: string;
  issueType: string;
  issueDescription: string;
  status: 'Pending' | 'Routed' | 'In Progress' | 'Resolved';
  lineman: Lineman | null;
  submittedAt: string;
  citizenName: string;
}

export interface WaterZoneSchedule {
  id: string;
  zone: string;
  timing: string;
  status: 'Upcoming' | 'Active' | 'Delayed' | 'Completed';
  reservoirLevel: number; // percentage
  flowRate: number; // liters per second
  frequency: string;
  lastUpdated: string;
}

export interface WaterAnnouncement {
  id: string;
  title: string;
  type: 'warning' | 'info' | 'success';
  message: string;
  date: string;
}

export interface CropPresetSample {
  id: string;
  name: string;
  image: string; // Base64 or elegant gradient/visual descriptions
  defaultWeather: {
    temp: number;
    humidity: number;
    rainProb: number;
  };
  simulatedResult: {
    condition: string;
    stressLevel: 'Healthy' | 'Low Stress' | 'Moderate Stress' | 'High Stress' | 'Critical';
    riskScore: number; // 0-100
    recommendedActions: string[];
    affectedLeafArea: number; // percentage
    nutrientDeficiency: string;
  };
}

export interface WorkerProfile {
  id: string;
  name: string;
  gender: string;
  age: number;
  ward: string;
  skills: string[];
  experience: string;
  phone: string;
  registeredAt: string;
}

export interface JobOpportunity {
  id: string;
  title: string;
  employer: string;
  ward: string;
  skillsRequired: string[];
  wage: string;
  type: 'Daily Wage' | 'Short Term' | 'Seasonal' | 'Full-time' | 'Contract';
  status: 'Open' | 'Filled';
  postedAt: string;
}

// ==========================================
// SAMPLE INITIAL DATA
// ==========================================

export const Wards = [
  'Ward 1 (Gram Panchayat Area)',
  'Ward 2 (Uttar Basti)',
  'Ward 3 (Purva Tola)',
  'Ward 4 (Harijan Basti)',
  'Ward 5 (Shakti Nagar)',
  'Ward 6 (Kisan Colony)',
  'Ward 7 (Krishi Farm Area)'
];

export const LinemenData: Record<string, Lineman> = {
  'Ward 1 (Gram Panchayat Area)': { name: 'Rajesh Kumar', phone: '+91 98765 43210', avatar: 'RK', rating: 4.8 },
  'Ward 2 (Uttar Basti)': { name: 'Sanjay Singh', phone: '+91 94567 12345', avatar: 'SS', rating: 4.7 },
  'Ward 3 (Purva Tola)': { name: 'Amit Patel', phone: '+91 87654 32109', avatar: 'AP', rating: 4.9 },
  'Ward 4 (Harijan Basti)': { name: 'Ramesh Yadav', phone: '+91 76543 21098', avatar: 'RY', rating: 4.6 },
  'Ward 5 (Shakti Nagar)': { name: 'Vikram Singh', phone: '+91 91234 56789', avatar: 'VS', rating: 4.8 },
  'Ward 6 (Kisan Colony)': { name: 'Manoj Tiwari', phone: '+91 82345 67890', avatar: 'MT', rating: 4.5 },
  'Ward 7 (Krishi Farm Area)': { name: 'Dharmendra Lal', phone: '+91 73456 78901', avatar: 'DL', rating: 4.9 }
};

export const InitialComplaints: ElectricityComplaint[] = [
  {
    id: "COMP-4081",
    ward: "Ward 3 (Purva Tola)",
    issueType: "Transformer Sparking",
    issueDescription: "Heavy sparking near primary school transformer after high winds. Sparking is continuous.",
    status: "In Progress",
    lineman: LinemenData["Ward 3 (Purva Tola)"],
    submittedAt: "2026-06-28 07:15 AM",
    citizenName: "Rameshwar Prasad"
  },
  {
    id: "COMP-4082",
    ward: "Ward 1 (Gram Panchayat Area)",
    issueType: "Streetlight Malfunction",
    issueDescription: "Three major streetlights on the main road are out of order for 4 days, causing safety issues at night.",
    status: "Routed",
    lineman: LinemenData["Ward 1 (Gram Panchayat Area)"],
    submittedAt: "2026-06-28 08:30 AM",
    citizenName: "Geeta Devi"
  },
  {
    id: "COMP-4079",
    ward: "Ward 5 (Shakti Nagar)",
    issueType: "Low Voltage Issue",
    issueDescription: "Low voltage preventing irrigation pumps and household refrigerators from running properly since yesterday evening.",
    status: "Resolved",
    lineman: LinemenData["Ward 5 (Shakti Nagar)"],
    submittedAt: "2026-06-27 04:20 PM",
    citizenName: "Harish Chandra"
  }
];

export const InitialWaterSchedules: WaterZoneSchedule[] = [
  {
    id: "SCH-1",
    zone: "Zone A (Main Village Square)",
    timing: "06:00 AM - 08:00 AM",
    status: "Completed",
    reservoirLevel: 85,
    flowRate: 42,
    frequency: "Daily Morning",
    lastUpdated: "Today, 08:05 AM"
  },
  {
    id: "SCH-2",
    zone: "Zone B (Harijan Basti & East Tola)",
    timing: "09:00 AM - 11:00 AM",
    status: "Active",
    reservoirLevel: 72,
    flowRate: 38,
    frequency: "Daily Morning",
    lastUpdated: "Just now"
  },
  {
    id: "SCH-3",
    zone: "Zone C (Kisan Colony & Krishi Farm)",
    timing: "01:30 PM - 03:00 PM",
    status: "Upcoming",
    reservoirLevel: 90,
    flowRate: 45,
    frequency: "Daily Afternoon",
    lastUpdated: "Today, 06:00 AM"
  },
  {
    id: "SCH-4",
    zone: "Zone D (Shakti Nagar Extended Area)",
    timing: "04:30 PM - 06:00 PM",
    status: "Delayed",
    reservoirLevel: 48,
    flowRate: 0,
    frequency: "Daily Evening",
    lastUpdated: "10 mins ago"
  }
];

export const WaterAnnouncements: WaterAnnouncement[] = [
  {
    id: "ANN-1",
    title: "Scheduled Pipeline Maintenance Work",
    type: "warning",
    message: "Inlet pipe repair scheduled for tomorrow. Zone C water release may be delayed by 45 minutes.",
    date: "2026-06-28"
  },
  {
    id: "ANN-2",
    title: "Groundwater Recharge Success",
    type: "success",
    message: "Due to the community rainwater harvesting drive, our village reservoir capacity has reached an all-time high of 92%.",
    date: "2026-06-27"
  },
  {
    id: "ANN-3",
    title: "Purity Test Report: Outstanding",
    type: "info",
    message: "Weekly water quality report received. TDS level is 180ppm, and pH is 7.2. Safe for direct consumption.",
    date: "2026-06-26"
  }
];

export const CropPresets: CropPresetSample[] = [
  {
    id: "preset-1",
    name: "Wheat Crop - Leaf Rust Symptoms",
    image: "🌾", // Standard emoji fallback representing wheat
    defaultWeather: { temp: 24, humidity: 82, rainProb: 65 },
    simulatedResult: {
      condition: "Fungal Leaf Rust (Puccinia recondita)",
      stressLevel: "High Stress",
      riskScore: 78,
      recommendedActions: [
        "Spray Propiconazole 25% EC (fungicide) at 1ml per liter of water.",
        "Ensure uniform drainage; stagnating moisture accelerates fungal spread.",
        "Restrict nitrogenous fertilizer application until recovery.",
        "Monitor adjacent fields for orange/brown pustules on wheat leaves."
      ],
      affectedLeafArea: 35,
      nutrientDeficiency: "None detected (fungal infestation primary driver)"
    }
  },
  {
    id: "preset-2",
    name: "Rice Crop - Drought / Moisture Stress",
    image: "🌾", // Standard emoji fallback representing rice paddies
    defaultWeather: { temp: 37, humidity: 35, rainProb: 10 },
    simulatedResult: {
      condition: "Severe Moisture Stress & Leaf Curling",
      stressLevel: "Critical",
      riskScore: 92,
      recommendedActions: [
        "Immediate emergency irrigation required (alternate wetting & drying if supply limited).",
        "Apply potassium spray (K2O) to increase stomatal control and drought tolerance.",
        "Apply organic mulching on beds to preserve residual soil moisture.",
        "Postpone any active weedicide sprays as it increases plant chemical stress."
      ],
      affectedLeafArea: 60,
      nutrientDeficiency: "Potassium Deficiency aggravated by water deficit"
    }
  },
  {
    id: "preset-3",
    name: "Cotton Crop - Aphid Infestation",
    image: "🌿", // Standard emoji fallback representing lush crop
    defaultWeather: { temp: 31, humidity: 75, rainProb: 40 },
    simulatedResult: {
      condition: "Sucking Pest Attack (Cotton Aphids / Aphis gossypii)",
      stressLevel: "Moderate Stress",
      riskScore: 55,
      recommendedActions: [
        "Spray Neem Seed Kernel Extract (NSKE 5%) as an organic repellent.",
        "Encourage natural predators like Ladybird beetles and hoverfly larvae.",
        "For severe cases, apply Imidacloprid 17.8% SL at 0.5 ml per liter of water.",
        "Prune and destroy heavily infested bottom leaves."
      ],
      affectedLeafArea: 22,
      nutrientDeficiency: "Trace Nitrogen deficiency due to sap-sucking load"
    }
  },
  {
    id: "preset-4",
    name: "Healthy Tomato Crop",
    image: "🍅", // Tomato crop
    defaultWeather: { temp: 28, humidity: 60, rainProb: 20 },
    simulatedResult: {
      condition: "Healthy / Optimal Vigour",
      stressLevel: "Healthy",
      riskScore: 8,
      recommendedActions: [
        "Continue current drip irrigation schedule of 45 mins early morning.",
        "Prepare for trellis staking as heavy fruit-bearing starts in 10 days.",
        "Apply organic compost at the root base to sustain micro-nutrients.",
        "Conduct routine pruning of lower yellowed leaves for air circulation."
      ],
      affectedLeafArea: 0,
      nutrientDeficiency: "None. All parameters optimal."
    }
  }
];

export const InitialWorkers: WorkerProfile[] = [
  {
    id: "WORK-001",
    name: "Ram Singh",
    gender: "Male",
    age: 34,
    ward: "Ward 2 (Uttar Basti)",
    skills: ["Masonry", "Plumbing", "Concrete Mixing"],
    experience: "8 Years in rural housing construction",
    phone: "+91 99887 76655",
    registeredAt: "2026-06-20"
  },
  {
    id: "WORK-002",
    name: "Savitri Devi",
    gender: "Female",
    age: 28,
    ward: "Ward 4 (Harijan Basti)",
    skills: ["Organic Composting", "Tailoring", "Seed Sorting"],
    experience: "4 Years in agricultural self-help groups (SHG)",
    phone: "+91 98989 87878",
    registeredAt: "2026-06-25"
  },
  {
    id: "WORK-003",
    name: "Karan Johar Patel",
    gender: "Male",
    age: 26,
    ward: "Ward 6 (Kisan Colony)",
    skills: ["Tractor Driving", "Drip Irrigation Setup", "Electrician"],
    experience: "5 Years operating farm machinery and solar pump wiring",
    phone: "+91 91122 33445",
    registeredAt: "2026-06-27"
  },
  {
    id: "WORK-004",
    name: "Suman Bai",
    gender: "Female",
    age: 41,
    ward: "Ward 3 (Purva Tola)",
    skills: ["Fruit Processing", "Pickle Making", "Nursery Management"],
    experience: "10 Years running village agro-cottage cooperative",
    phone: "+91 88776 65544",
    registeredAt: "2026-06-22"
  },
  {
    id: "WORK-005",
    name: "Mahendra Yadav",
    gender: "Male",
    age: 39,
    ward: "Ward 5 (Shakti Nagar)",
    skills: ["Carpentry", "Roofing", "Masonry"],
    experience: "12 Years in wooden framing and thatch roofing design",
    phone: "+91 77665 54433",
    registeredAt: "2026-06-26"
  }
];

export const InitialJobs: JobOpportunity[] = [
  {
    id: "JOB-101",
    title: "Amrit Sarovar Pond Excavation Mason",
    employer: "Gram Panchayat Engineering Dept",
    ward: "Ward 4 (Harijan Basti)",
    skillsRequired: ["Masonry", "Concrete Mixing"],
    wage: "₹450 / Day",
    type: "Short Term",
    status: "Open",
    postedAt: "2026-06-26"
  },
  {
    id: "JOB-102",
    title: "Solar Pump Assembly Assistant",
    employer: "Urja Urvarak Ltd (Village Subcontractor)",
    ward: "Ward 6 (Kisan Colony)",
    skillsRequired: ["Electrician", "Drip Irrigation Setup"],
    wage: "₹550 / Day",
    type: "Contract",
    status: "Open",
    postedAt: "2026-06-27"
  },
  {
    id: "JOB-103",
    title: "Nursery Seed Sorter & Packer",
    employer: "Kisan Vikas Co-operative",
    ward: "Ward 7 (Krishi Farm Area)",
    skillsRequired: ["Seed Sorting", "Nursery Management"],
    wage: "₹380 / Day",
    type: "Seasonal",
    status: "Open",
    postedAt: "2026-06-28"
  },
  {
    id: "JOB-104",
    title: "Gram Panchayat Office Tailoring Instructor",
    employer: "Mahila Vikas SHG Association",
    ward: "Ward 1 (Gram Panchayat Area)",
    skillsRequired: ["Tailoring"],
    wage: "₹400 / Day",
    type: "Daily Wage",
    status: "Filled",
    postedAt: "2026-06-25"
  }
];
