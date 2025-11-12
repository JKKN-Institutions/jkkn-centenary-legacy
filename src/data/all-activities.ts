import { Activity } from "@/components/ActivityCard";

// Categories are now fetched dynamically from Supabase
// This type is kept flexible to accommodate any category from the database
export type Category = string;

export interface ExtendedActivity extends Activity {
  category: Category;
  progress?: number;
  image?: string;
  hero_image_url?: string; // Direct URL from Supabase Storage
  dateCompleted?: string;
  dateScheduled?: string;
  metrics?: {
    icon: string;
    label: string;
    value: string | number;
  }[];
  visionText?: string[];
  galleryPhotos?: {
    imageKey: string;
    caption: string;
  }[];
  impactStats?: {
    icon: string;
    value: number;
    label: string;
    color?: string;
  }[];
  testimonials?: {
    quote: string;
    name: string;
    role: string;
    avatar?: string;
  }[];
}

export const allActivities: ExtendedActivity[] = [
  // First 9 with real images
  {
    id: "100-placards",
    title: "100 Placards",
    status: "completed",
    impact: "100 pieces distributed across campus",
    imageGradient: "linear-gradient(135deg, hsl(142 76% 36%) 0%, hsl(142 86% 46%) 100%)",
    category: "Culture & Heritage",
    progress: 100,
    image: "placards",
    description: "Inspiring placards placed throughout campus featuring motivational quotes, historical milestones, and values that define JKKN's century-long journey."
  },
  {
    id: "100-workers-honored",
    title: "100 Workers Honored",
    status: "completed",
    impact: "100 staff members recognized for their service",
    imageGradient: "linear-gradient(135deg, hsl(280 80% 50%) 0%, hsl(300 85% 60%) 100%)",
    category: "Community Service",
    progress: 100,
    image: "workers-honored",
    description: "A heartfelt recognition ceremony celebrating the dedication and commitment of 100 workers who have been the backbone of JKKN's success.",
    dateCompleted: "November 10, 2025",
    metrics: [
      { icon: "Users", label: "Workers", value: 100 },
      { icon: "Package", label: "Uniform Pieces", value: 523 },
      { icon: "Building", label: "Departments", value: 15 }
    ],
    visionText: [
      "For the centenary, JKKN honored 100 campus workers with new uniforms, recognizing the hands that built and maintain our institutions. These are the people who wake up before dawn to ensure our campus is clean, safe, and welcoming for thousands of students every day.",
      "From maintenance staff to security personnel, from gardeners to sanitation workers—each person received a complete uniform set featuring the JKKN centenary logo. This initiative wasn't just about clothing; it was about dignity, recognition, and belonging.",
      "The ceremony was attended by college leadership, faculty, and students who expressed their gratitude to these unsung heroes. Many workers, some who have served for over 20 years, said it was the first time they felt truly seen and valued by the institution."
    ],
    galleryPhotos: [
      { imageKey: "workers-honored", caption: "100 workers gathered for the recognition ceremony" },
      { imageKey: "workers-honored", caption: "Workers proudly displaying their new uniforms with JKKN centenary logo" },
      { imageKey: "workers-honored", caption: "Leadership team presenting uniform sets to senior staff members" },
      { imageKey: "workers-honored", caption: "Maintenance team members in their new attire" },
      { imageKey: "workers-honored", caption: "Security personnel honored for their dedication" },
      { imageKey: "workers-honored", caption: "Group photo capturing the spirit of appreciation and unity" }
    ],
    impactStats: [
      { icon: "Package", value: 523, label: "Uniform Pieces", color: "primary" },
      { icon: "Users", value: 100, label: "Workers Honored", color: "success" },
      { icon: "Building", value: 15, label: "Departments Covered", color: "info" }
    ],
    testimonials: [
      {
        quote: "I've worked here 20 years. This is the first time someone honored us like this. I feel like I'm truly part of JKKN now.",
        name: "Murugan",
        role: "Maintenance Staff"
      },
      {
        quote: "These uniforms make us feel professional and proud. We're not just workers anymore—we're ambassadors of this great institution.",
        name: "Lakshmi",
        role: "Sanitation Department"
      },
      {
        quote: "When they called my name on stage, my eyes filled with tears. After 15 years of service, this recognition means everything.",
        name: "Ravi Kumar",
        role: "Security Personnel"
      }
    ]
  },
  {
    id: "100-trees-planted",
    title: "100 Trees Planted",
    status: "in-progress",
    impact: "73 trees planted so far",
    imageGradient: "linear-gradient(135deg, hsl(120 60% 40%) 0%, hsl(140 70% 50%) 100%)",
    category: "Environment",
    progress: 73,
    image: "trees-planted",
    description: "Creating a greener tomorrow by planting 100 trees across our campus and neighboring communities, ensuring a sustainable future for generations to come.",
    dateScheduled: "March 2025",
    metrics: [
      { icon: "TreePine", label: "Trees", value: "73 of 100" },
      { icon: "MapPin", label: "Locations", value: 8 },
      { icon: "Users", label: "Volunteers", value: 250 }
    ],
    visionText: [
      "As part of our centenary celebrations, we're planting 100 native trees across campus and in local communities. So far, 73 trees have been planted, and we're on track to complete all 100 by March 2025.",
      "Each tree represents a year of JKKN's legacy and a promise for a greener future. We've selected species that thrive in our climate, provide shade, and support local biodiversity. Students, faculty, and community members join us every weekend for planting drives.",
      "This initiative goes beyond environmental impact—it's about creating living monuments that will grow with future generations of students, providing shade, clean air, and a reminder of our commitment to sustainability."
    ],
    galleryPhotos: [
      { imageKey: "trees-planted", caption: "Students participating in tree planting drive" },
      { imageKey: "trees-planted", caption: "Native saplings ready for planting" },
      { imageKey: "trees-planted", caption: "Community members joining the green initiative" },
      { imageKey: "trees-planted", caption: "Newly planted trees along campus pathway" },
      { imageKey: "trees-planted", caption: "Faculty members watering young saplings" },
      { imageKey: "trees-planted", caption: "Commemorative plaque marking the centenary plantation" }
    ],
    impactStats: [
      { icon: "TreePine", value: 73, label: "Trees Planted", color: "success" },
      { icon: "Users", value: 250, label: "Volunteers", color: "primary" },
      { icon: "Leaf", value: 8, label: "Species Planted", color: "info" }
    ],
    testimonials: [
      {
        quote: "Planting these trees connects us to the campus in a permanent way. Long after we graduate, these trees will stand as our legacy.",
        name: "Priya Sharma",
        role: "Final Year Engineering Student"
      },
      {
        quote: "It's wonderful to see students so enthusiastic about environmental conservation. This initiative inspires hope for our planet's future.",
        name: "Dr. Anand",
        role: "Environmental Science Faculty"
      }
    ]
  },
  {
    id: "100-scholarships",
    title: "100 Scholarships",
    status: "upcoming",
    impact: "To benefit 100 deserving students",
    imageGradient: "linear-gradient(135deg, hsl(217 91% 60%) 0%, hsl(230 95% 70%) 100%)",
    category: "Education",
    progress: 0,
    image: "scholarships",
    description: "Empowering the next generation by providing 100 merit-based scholarships to exceptional students who demonstrate academic excellence and financial need.",
    dateScheduled: "June 2025",
    metrics: [
      { icon: "GraduationCap", label: "Scholarships", value: 100 },
      { icon: "IndianRupee", label: "Total Value", value: "₹50L" },
      { icon: "Users", label: "Applicants Expected", value: "500+" }
    ],
    visionText: [
      "In honor of our centenary, JKKN is launching 100 merit-cum-need-based scholarships worth ₹50,000 each. These scholarships will support talented students who face financial barriers to education, ensuring that economic circumstances never stand between a brilliant mind and quality education.",
      "Applications will open in June 2025, with selections based on academic performance, financial need, and personal circumstances. Priority will be given to first-generation college students and those from rural backgrounds.",
      "Each scholarship recipient will also receive mentorship from faculty and industry professionals, career guidance, and access to special workshops—investing not just in their education, but in their overall development and future success."
    ],
    impactStats: [
      { icon: "GraduationCap", value: 100, label: "Scholarships", color: "primary" },
      { icon: "IndianRupee", value: 50, label: "Lakhs Total Value", color: "success" },
      { icon: "Award", value: 4, label: "Years of Support", color: "info" }
    ]
  },
  {
    id: "100-books-donated",
    title: "100 Books Donated",
    status: "completed",
    impact: "100 books added to community libraries",
    imageGradient: "linear-gradient(135deg, hsl(35 90% 50%) 0%, hsl(45 95% 60%) 100%)",
    category: "Education",
    progress: 100,
    image: "books-donated",
    description: "Enriching minds through reading by donating 100 carefully selected books to libraries in rural schools and community centers."
  },
  {
    id: "100-meals-served",
    title: "100 Meals Served Daily",
    status: "in-progress",
    impact: "2,340 meals served to date",
    imageGradient: "linear-gradient(135deg, hsl(10 85% 55%) 0%, hsl(25 90% 65%) 100%)",
    category: "Community Service",
    progress: 23,
    image: "meals-served",
    description: "Nourishing our community by serving 100 meals daily to underprivileged families, ensuring no one goes hungry in our neighborhood."
  },
  {
    id: "100-benches-installed",
    title: "100 Benches Installed",
    status: "upcoming",
    impact: "Public seating for community spaces",
    imageGradient: "linear-gradient(135deg, hsl(200 60% 50%) 0%, hsl(210 70% 60%) 100%)",
    category: "Infrastructure",
    progress: 0,
    image: "benches-installed",
    description: "Creating comfortable gathering spaces by installing 100 benches in parks, bus stops, and public areas throughout the city."
  },
  {
    id: "100-alumni-stories",
    title: "100 Alumni Stories",
    status: "in-progress",
    impact: "58 stories collected and published",
    imageGradient: "linear-gradient(135deg, hsl(340 75% 55%) 0%, hsl(350 85% 65%) 100%)",
    category: "Culture & Heritage",
    progress: 58,
    image: "alumni-stories",
    description: "Documenting the inspiring journeys of 100 JKKN alumni who have made significant contributions to society across various fields."
  },
  {
    id: "100-blood-donations",
    title: "100 Blood Donations",
    status: "completed",
    impact: "125 units collected in blood drive",
    imageGradient: "linear-gradient(135deg, hsl(0 85% 60%) 0%, hsl(10 90% 70%) 100%)",
    category: "Health & Wellness",
    progress: 100,
    image: "blood-donations",
    description: "Saving lives through community service with a successful blood donation drive that exceeded our goal, collecting 125 units of blood."
  },
  // Additional 91 activities
  {
    id: "100-uniforms-distributed",
    title: "100 School Uniforms",
    status: "completed",
    impact: "100 uniforms to rural students",
    imageGradient: "linear-gradient(135deg, hsl(220 70% 50%) 0%, hsl(240 80% 60%) 100%)",
    category: "Education",
    progress: 100,
    description: "Providing new school uniforms to 100 students from economically disadvantaged families."
  },
  {
    id: "100-computers-donated",
    title: "100 Computers Donated",
    status: "in-progress",
    impact: "67 computers to schools",
    imageGradient: "linear-gradient(135deg, hsl(200 80% 45%) 0%, hsl(220 85% 55%) 100%)",
    category: "Technology",
    progress: 67,
    description: "Bridging the digital divide by donating refurbished computers to schools lacking technology infrastructure."
  },
  {
    id: "100-science-kits",
    title: "100 Science Kits",
    status: "completed",
    impact: "100 labs equipped",
    imageGradient: "linear-gradient(135deg, hsl(160 70% 40%) 0%, hsl(180 75% 50%) 100%)",
    category: "Education",
    progress: 100,
    description: "Enhancing science education with comprehensive laboratory kits for rural schools."
  },
  {
    id: "100-sports-equipment",
    title: "100 Sports Equipment Sets",
    status: "in-progress",
    impact: "45 sets distributed",
    imageGradient: "linear-gradient(135deg, hsl(30 85% 50%) 0%, hsl(40 90% 60%) 100%)",
    category: "Sports & Recreation",
    progress: 45,
    description: "Promoting physical fitness and sportsmanship with complete sports equipment sets."
  },
  {
    id: "100-water-filters",
    title: "100 Water Filters",
    status: "completed",
    impact: "100 families with clean water",
    imageGradient: "linear-gradient(135deg, hsl(195 75% 50%) 0%, hsl(205 80% 60%) 100%)",
    category: "Health & Wellness",
    progress: 100,
    description: "Providing clean drinking water to 100 households through water filtration systems."
  },
  {
    id: "100-art-supplies",
    title: "100 Art Supply Kits",
    status: "upcoming",
    impact: "For creative development",
    imageGradient: "linear-gradient(135deg, hsl(280 70% 55%) 0%, hsl(300 75% 65%) 100%)",
    category: "Education",
    progress: 0,
    description: "Fostering creativity and artistic expression with comprehensive art supplies for students."
  },
  {
    id: "100-musical-instruments",
    title: "100 Musical Instruments",
    status: "in-progress",
    impact: "32 instruments donated",
    imageGradient: "linear-gradient(135deg, hsl(320 75% 50%) 0%, hsl(340 80% 60%) 100%)",
    category: "Culture & Heritage",
    progress: 32,
    description: "Enriching cultural education through musical instruments for school music programs."
  },
  {
    id: "100-medical-checkups",
    title: "100 Free Health Checkups",
    status: "completed",
    impact: "123 people screened",
    imageGradient: "linear-gradient(135deg, hsl(350 80% 55%) 0%, hsl(10 85% 65%) 100%)",
    category: "Health & Wellness",
    progress: 100,
    description: "Comprehensive health screenings provided free to underprivileged community members."
  },
  {
    id: "100-blankets",
    title: "100 Blankets Distributed",
    status: "completed",
    impact: "100 families during winter",
    imageGradient: "linear-gradient(135deg, hsl(200 60% 45%) 0%, hsl(220 65% 55%) 100%)",
    category: "Community Service",
    progress: 100,
    description: "Providing warmth to homeless and needy families during winter months."
  },
  {
    id: "100-eye-glasses",
    title: "100 Reading Glasses",
    status: "in-progress",
    impact: "54 distributed",
    imageGradient: "linear-gradient(135deg, hsl(180 65% 45%) 0%, hsl(195 70% 55%) 100%)",
    category: "Health & Wellness",
    progress: 54,
    description: "Improving quality of life through free vision correction for elderly community members."
  },
  {
    id: "100-LED-bulbs",
    title: "100 LED Bulb Sets",
    status: "completed",
    impact: "100 homes energy efficient",
    imageGradient: "linear-gradient(135deg, hsl(45 85% 55%) 0%, hsl(55 90% 65%) 100%)",
    category: "Environment",
    progress: 100,
    description: "Reducing energy consumption with LED bulbs for low-income households."
  },
  {
    id: "100-solar-lamps",
    title: "100 Solar Lamps",
    status: "in-progress",
    impact: "78 lamps distributed",
    imageGradient: "linear-gradient(135deg, hsl(40 80% 50%) 0%, hsl(50 85% 60%) 100%)",
    category: "Environment",
    progress: 78,
    description: "Bringing sustainable lighting to rural areas without electricity access."
  },
  {
    id: "100-rain-water-harvesting",
    title: "100 Rainwater Harvesting",
    status: "upcoming",
    impact: "Water conservation systems",
    imageGradient: "linear-gradient(135deg, hsl(190 70% 45%) 0%, hsl(200 75% 55%) 100%)",
    category: "Environment",
    progress: 0,
    description: "Installing rainwater harvesting systems for sustainable water management."
  },
  {
    id: "100-sanitation-kits",
    title: "100 Sanitation Kits",
    status: "completed",
    impact: "100 families with hygiene supplies",
    imageGradient: "linear-gradient(135deg, hsl(170 70% 45%) 0%, hsl(185 75% 55%) 100%)",
    category: "Health & Wellness",
    progress: 100,
    description: "Promoting hygiene and sanitation with comprehensive care kits for families."
  },
  {
    id: "100-skill-training",
    title: "100 Skill Training Sessions",
    status: "in-progress",
    impact: "41 sessions completed",
    imageGradient: "linear-gradient(135deg, hsl(260 75% 50%) 0%, hsl(280 80% 60%) 100%)",
    category: "Education",
    progress: 41,
    description: "Empowering youth with vocational skills for employment opportunities."
  },
  {
    id: "100-entrepreneurship",
    title: "100 Entrepreneur Workshops",
    status: "in-progress",
    impact: "29 workshops conducted",
    imageGradient: "linear-gradient(135deg, hsl(15 80% 50%) 0%, hsl(30 85% 60%) 100%)",
    category: "Education",
    progress: 29,
    description: "Fostering entrepreneurial mindset among aspiring business owners."
  },
  {
    id: "100-women-empowerment",
    title: "100 Women Empowered",
    status: "in-progress",
    impact: "67 women trained",
    imageGradient: "linear-gradient(135deg, hsl(330 75% 55%) 0%, hsl(345 80% 65%) 100%)",
    category: "Community Service",
    progress: 67,
    description: "Providing skills training and financial literacy to empower women economically."
  },
  {
    id: "100-wheelchairs",
    title: "100 Wheelchairs",
    status: "upcoming",
    impact: "For differently-abled",
    imageGradient: "linear-gradient(135deg, hsl(240 70% 50%) 0%, hsl(255 75% 60%) 100%)",
    category: "Health & Wellness",
    progress: 0,
    description: "Enhancing mobility and independence for persons with disabilities."
  },
  {
    id: "100-hearing-aids",
    title: "100 Hearing Aids",
    status: "upcoming",
    impact: "For hearing impaired",
    imageGradient: "linear-gradient(135deg, hsl(270 70% 50%) 0%, hsl(285 75% 60%) 100%)",
    category: "Health & Wellness",
    progress: 0,
    description: "Restoring sound and connection for those with hearing impairment."
  },
  {
    id: "100-walking-sticks",
    title: "100 Walking Sticks",
    status: "completed",
    impact: "For elderly citizens",
    imageGradient: "linear-gradient(135deg, hsl(25 75% 50%) 0%, hsl(35 80% 60%) 100%)",
    category: "Health & Wellness",
    progress: 100,
    description: "Supporting mobility for senior citizens in our community."
  },
  {
    id: "100-teaching-aids",
    title: "100 Teaching Aids",
    status: "completed",
    impact: "100 classrooms equipped",
    imageGradient: "linear-gradient(135deg, hsl(155 70% 45%) 0%, hsl(170 75% 55%) 100%)",
    category: "Education",
    progress: 100,
    description: "Enhancing classroom learning with modern teaching tools and visual aids."
  },
  {
    id: "100-library-cards",
    title: "100 Library Memberships",
    status: "completed",
    impact: "100 students access",
    imageGradient: "linear-gradient(135deg, hsl(210 75% 50%) 0%, hsl(225 80% 60%) 100%)",
    category: "Education",
    progress: 100,
    description: "Providing free library access to students from underprivileged backgrounds."
  },
  {
    id: "100-tution-support",
    title: "100 Tuition Support",
    status: "in-progress",
    impact: "38 students supported",
    imageGradient: "linear-gradient(135deg, hsl(190 75% 50%) 0%, hsl(205 80% 60%) 100%)",
    category: "Education",
    progress: 38,
    description: "Covering educational expenses for talented students facing financial hardship."
  },
  {
    id: "100-school-bags",
    title: "100 School Bags",
    status: "completed",
    impact: "100 students equipped",
    imageGradient: "linear-gradient(135deg, hsl(310 75% 50%) 0%, hsl(325 80% 60%) 100%)",
    category: "Education",
    progress: 100,
    description: "Providing quality school bags filled with essential stationery."
  },
  {
    id: "100-lab-coats",
    title: "100 Lab Coats",
    status: "completed",
    impact: "Science students equipped",
    imageGradient: "linear-gradient(135deg, hsl(185 70% 45%) 0%, hsl(200 75% 55%) 100%)",
    category: "Education",
    progress: 100,
    description: "Professional lab coats for science students pursuing their passion."
  },
  {
    id: "100-covid-kits",
    title: "100 COVID Care Kits",
    status: "completed",
    impact: "100 families protected",
    imageGradient: "linear-gradient(135deg, hsl(5 80% 55%) 0%, hsl(15 85% 65%) 100%)",
    category: "Health & Wellness",
    progress: 100,
    description: "Essential protection kits distributed during the pandemic crisis."
  },
  {
    id: "100-dustbins",
    title: "100 Dustbins Installed",
    status: "completed",
    impact: "Campus-wide cleanliness",
    imageGradient: "linear-gradient(135deg, hsl(140 65% 40%) 0%, hsl(155 70% 50%) 100%)",
    category: "Environment",
    progress: 100,
    description: "Promoting cleanliness with strategically placed waste bins across campus."
  },
  {
    id: "100-compost-pits",
    title: "100 Compost Pits",
    status: "in-progress",
    impact: "56 pits established",
    imageGradient: "linear-gradient(135deg, hsl(95 70% 40%) 0%, hsl(110 75% 50%) 100%)",
    category: "Environment",
    progress: 56,
    description: "Converting organic waste into nutrient-rich compost for gardens."
  },
  {
    id: "100-bird-houses",
    title: "100 Bird Houses",
    status: "in-progress",
    impact: "82 installed",
    imageGradient: "linear-gradient(135deg, hsl(35 75% 50%) 0%, hsl(45 80% 60%) 100%)",
    category: "Environment",
    progress: 82,
    description: "Creating habitats for local bird species across campus grounds."
  },
  {
    id: "100-butterfly-gardens",
    title: "100 Butterfly Gardens",
    status: "upcoming",
    impact: "Biodiversity enhancement",
    imageGradient: "linear-gradient(135deg, hsl(285 75% 55%) 0%, hsl(300 80% 65%) 100%)",
    category: "Environment",
    progress: 0,
    description: "Planting native flowers to attract and support butterfly populations."
  },
  {
    id: "100-bee-boxes",
    title: "100 Bee Boxes",
    status: "upcoming",
    impact: "Pollination support",
    imageGradient: "linear-gradient(135deg, hsl(45 80% 50%) 0%, hsl(60 85% 60%) 100%)",
    category: "Environment",
    progress: 0,
    description: "Installing bee boxes to support pollinator populations and biodiversity."
  },
  {
    id: "100-herb-gardens",
    title: "100 Herb Gardens",
    status: "in-progress",
    impact: "47 gardens established",
    imageGradient: "linear-gradient(135deg, hsl(110 70% 40%) 0%, hsl(125 75% 50%) 100%)",
    category: "Environment",
    progress: 47,
    description: "Creating medicinal and culinary herb gardens in schools and communities."
  },
  {
    id: "100-solar-panels",
    title: "100 Solar Panels",
    status: "upcoming",
    impact: "Renewable energy",
    imageGradient: "linear-gradient(135deg, hsl(40 85% 55%) 0%, hsl(50 90% 65%) 100%)",
    category: "Environment",
    progress: 0,
    description: "Installing solar panels for clean, renewable energy generation."
  },
  {
    id: "100-cycle-stands",
    title: "100 Cycle Stands",
    status: "completed",
    impact: "Green commuting support",
    imageGradient: "linear-gradient(135deg, hsl(165 70% 45%) 0%, hsl(180 75% 55%) 100%)",
    category: "Infrastructure",
    progress: 100,
    description: "Promoting eco-friendly transportation with bicycle parking facilities."
  },
  {
    id: "100-street-lights",
    title: "100 LED Street Lights",
    status: "in-progress",
    impact: "63 lights installed",
    imageGradient: "linear-gradient(135deg, hsl(50 80% 55%) 0%, hsl(60 85% 65%) 100%)",
    category: "Infrastructure",
    progress: 63,
    description: "Improving safety with energy-efficient street lighting in dark areas."
  },
  {
    id: "100-signboards",
    title: "100 Direction Signboards",
    status: "completed",
    impact: "Campus navigation improved",
    imageGradient: "linear-gradient(135deg, hsl(210 70% 50%) 0%, hsl(225 75% 60%) 100%)",
    category: "Infrastructure",
    progress: 100,
    description: "Clear directional signage for better campus navigation."
  },
  {
    id: "100-notice-boards",
    title: "100 Notice Boards",
    status: "completed",
    impact: "Communication enhanced",
    imageGradient: "linear-gradient(135deg, hsl(195 70% 50%) 0%, hsl(210 75% 60%) 100%)",
    category: "Infrastructure",
    progress: 100,
    description: "Dedicated bulletin boards for announcements and information sharing."
  },
  {
    id: "100-water-coolers",
    title: "100 Water Coolers",
    status: "in-progress",
    impact: "71 installed",
    imageGradient: "linear-gradient(135deg, hsl(185 75% 50%) 0%, hsl(200 80% 60%) 100%)",
    category: "Infrastructure",
    progress: 71,
    description: "Providing clean drinking water stations throughout campus."
  },
  {
    id: "100-hand-wash-stations",
    title: "100 Hand Wash Stations",
    status: "completed",
    impact: "Hygiene stations campus-wide",
    imageGradient: "linear-gradient(135deg, hsl(175 70% 45%) 0%, hsl(190 75% 55%) 100%)",
    category: "Health & Wellness",
    progress: 100,
    description: "Installing hand washing facilities to promote hygiene practices."
  },
  {
    id: "100-first-aid-kits",
    title: "100 First Aid Kits",
    status: "completed",
    impact: "Emergency preparedness",
    imageGradient: "linear-gradient(135deg, hsl(355 80% 55%) 0%, hsl(5 85% 65%) 100%)",
    category: "Health & Wellness",
    progress: 100,
    description: "Distributing comprehensive first aid kits for emergency response."
  },
  {
    id: "100-fire-extinguishers",
    title: "100 Fire Extinguishers",
    status: "completed",
    impact: "Fire safety ensured",
    imageGradient: "linear-gradient(135deg, hsl(0 85% 55%) 0%, hsl(10 90% 65%) 100%)",
    category: "Infrastructure",
    progress: 100,
    description: "Installing fire safety equipment across all facilities."
  },
  {
    id: "100-cctv-cameras",
    title: "100 CCTV Cameras",
    status: "in-progress",
    impact: "84 cameras installed",
    imageGradient: "linear-gradient(135deg, hsl(230 70% 45%) 0%, hsl(245 75% 55%) 100%)",
    category: "Infrastructure",
    progress: 84,
    description: "Enhancing security with surveillance systems campus-wide."
  },
  {
    id: "100-smart-boards",
    title: "100 Smart Boards",
    status: "in-progress",
    impact: "31 classrooms digitized",
    imageGradient: "linear-gradient(135deg, hsl(205 75% 50%) 0%, hsl(220 80% 60%) 100%)",
    category: "Technology",
    progress: 31,
    description: "Modernizing education with interactive digital learning boards."
  },
  {
    id: "100-wifi-zones",
    title: "100 WiFi Zones",
    status: "in-progress",
    impact: "52 zones active",
    imageGradient: "linear-gradient(135deg, hsl(195 75% 50%) 0%, hsl(210 80% 60%) 100%)",
    category: "Technology",
    progress: 52,
    description: "Providing free internet access in public areas for students."
  },
  {
    id: "100-charging-stations",
    title: "100 Charging Stations",
    status: "in-progress",
    impact: "68 stations installed",
    imageGradient: "linear-gradient(135deg, hsl(170 70% 45%) 0%, hsl(185 75% 55%) 100%)",
    category: "Technology",
    progress: 68,
    description: "Installing mobile device charging points across campus."
  },
  {
    id: "100-qr-info-points",
    title: "100 QR Info Points",
    status: "upcoming",
    impact: "Digital information access",
    imageGradient: "linear-gradient(135deg, hsl(215 75% 50%) 0%, hsl(230 80% 60%) 100%)",
    category: "Technology",
    progress: 0,
    description: "QR code based information points for instant digital access."
  },
  {
    id: "100-cultural-events",
    title: "100 Cultural Events",
    status: "in-progress",
    impact: "42 events organized",
    imageGradient: "linear-gradient(135deg, hsl(300 75% 55%) 0%, hsl(315 80% 65%) 100%)",
    category: "Culture & Heritage",
    progress: 42,
    description: "Celebrating diversity through cultural festivals and performances."
  },
  {
    id: "100-heritage-walks",
    title: "100 Heritage Walks",
    status: "in-progress",
    impact: "28 walks conducted",
    imageGradient: "linear-gradient(135deg, hsl(30 75% 50%) 0%, hsl(40 80% 60%) 100%)",
    category: "Culture & Heritage",
    progress: 28,
    description: "Guided tours exploring local history and cultural landmarks."
  },
  {
    id: "100-traditional-crafts",
    title: "100 Traditional Craft Workshops",
    status: "in-progress",
    impact: "35 workshops held",
    imageGradient: "linear-gradient(135deg, hsl(15 80% 50%) 0%, hsl(25 85% 60%) 100%)",
    category: "Culture & Heritage",
    progress: 35,
    description: "Preserving traditional arts through hands-on craft workshops."
  },
  {
    id: "100-folk-performances",
    title: "100 Folk Performances",
    status: "in-progress",
    impact: "61 performances",
    imageGradient: "linear-gradient(135deg, hsl(335 75% 55%) 0%, hsl(350 80% 65%) 100%)",
    category: "Culture & Heritage",
    progress: 61,
    description: "Showcasing regional folk arts and traditional performances."
  },
  {
    id: "100-photography-exhibits",
    title: "100 Photography Exhibits",
    status: "in-progress",
    impact: "23 exhibits held",
    imageGradient: "linear-gradient(135deg, hsl(190 70% 50%) 0%, hsl(205 75% 60%) 100%)",
    category: "Culture & Heritage",
    progress: 23,
    description: "Displaying photographic documentation of JKKN's journey."
  },
  {
    id: "100-painting-competition",
    title: "100 Painting Competitions",
    status: "in-progress",
    impact: "19 competitions held",
    imageGradient: "linear-gradient(135deg, hsl(275 75% 55%) 0%, hsl(290 80% 65%) 100%)",
    category: "Culture & Heritage",
    progress: 19,
    description: "Encouraging artistic expression through competitive painting events."
  },
  {
    id: "100-essay-contests",
    title: "100 Essay Contests",
    status: "in-progress",
    impact: "44 contests conducted",
    imageGradient: "linear-gradient(135deg, hsl(220 70% 50%) 0%, hsl(235 75% 60%) 100%)",
    category: "Education",
    progress: 44,
    description: "Promoting writing skills through themed essay competitions."
  },
  {
    id: "100-debate-competitions",
    title: "100 Debate Competitions",
    status: "in-progress",
    impact: "37 debates held",
    imageGradient: "linear-gradient(135deg, hsl(200 75% 50%) 0%, hsl(215 80% 60%) 100%)",
    category: "Education",
    progress: 37,
    description: "Developing critical thinking through structured debate competitions."
  },
  {
    id: "100-quiz-contests",
    title: "100 Quiz Contests",
    status: "in-progress",
    impact: "53 quizzes conducted",
    imageGradient: "linear-gradient(135deg, hsl(180 70% 45%) 0%, hsl(195 75% 55%) 100%)",
    category: "Education",
    progress: 53,
    description: "Testing knowledge and quick thinking through competitive quizzes."
  },
  {
    id: "100-science-fairs",
    title: "100 Science Fairs",
    status: "in-progress",
    impact: "26 fairs organized",
    imageGradient: "linear-gradient(135deg, hsl(165 70% 45%) 0%, hsl(180 75% 55%) 100%)",
    category: "Education",
    progress: 26,
    description: "Inspiring scientific curiosity through project exhibitions."
  },
  {
    id: "100-math-olympiads",
    title: "100 Math Olympiads",
    status: "in-progress",
    impact: "18 olympiads held",
    imageGradient: "linear-gradient(135deg, hsl(240 70% 50%) 0%, hsl(255 75% 60%) 100%)",
    category: "Education",
    progress: 18,
    description: "Challenging mathematical problem-solving skills of students."
  },
  {
    id: "100-sports-tournaments",
    title: "100 Sports Tournaments",
    status: "in-progress",
    impact: "48 tournaments completed",
    imageGradient: "linear-gradient(135deg, hsl(25 80% 50%) 0%, hsl(35 85% 60%) 100%)",
    category: "Sports & Recreation",
    progress: 48,
    description: "Promoting fitness and teamwork through competitive sports."
  },
  {
    id: "100-yoga-sessions",
    title: "100 Yoga Sessions",
    status: "in-progress",
    impact: "76 sessions conducted",
    imageGradient: "linear-gradient(135deg, hsl(155 65% 45%) 0%, hsl(170 70% 55%) 100%)",
    category: "Health & Wellness",
    progress: 76,
    description: "Promoting mental and physical well-being through yoga practice."
  },
  {
    id: "100-health-talks",
    title: "100 Health Awareness Talks",
    status: "in-progress",
    impact: "62 talks delivered",
    imageGradient: "linear-gradient(135deg, hsl(10 80% 55%) 0%, hsl(20 85% 65%) 100%)",
    category: "Health & Wellness",
    progress: 62,
    description: "Educating community on health, nutrition, and preventive care."
  },
  {
    id: "100-fitness-camps",
    title: "100 Fitness Camps",
    status: "in-progress",
    impact: "34 camps organized",
    imageGradient: "linear-gradient(135deg, hsl(30 75% 50%) 0%, hsl(40 80% 60%) 100%)",
    category: "Sports & Recreation",
    progress: 34,
    description: "Residential fitness camps promoting healthy lifestyle habits."
  },
  {
    id: "100-swimming-lessons",
    title: "100 Swimming Lessons",
    status: "upcoming",
    impact: "Life skill training",
    imageGradient: "linear-gradient(135deg, hsl(190 75% 50%) 0%, hsl(200 80% 60%) 100%)",
    category: "Sports & Recreation",
    progress: 0,
    description: "Teaching essential swimming skills for water safety."
  },
  {
    id: "100-chess-tournaments",
    title: "100 Chess Tournaments",
    status: "in-progress",
    impact: "41 tournaments held",
    imageGradient: "linear-gradient(135deg, hsl(270 65% 50%) 0%, hsl(285 70% 60%) 100%)",
    category: "Sports & Recreation",
    progress: 41,
    description: "Developing strategic thinking through competitive chess."
  },
  {
    id: "100-carrom-boards",
    title: "100 Carrom Boards",
    status: "completed",
    impact: "Recreation facilities",
    imageGradient: "linear-gradient(135deg, hsl(35 75% 50%) 0%, hsl(45 80% 60%) 100%)",
    category: "Sports & Recreation",
    progress: 100,
    description: "Providing traditional indoor gaming facilities for students."
  },
  {
    id: "100-table-tennis",
    title: "100 Table Tennis Tables",
    status: "in-progress",
    impact: "23 tables installed",
    imageGradient: "linear-gradient(135deg, hsl(355 75% 55%) 0%, hsl(5 80% 65%) 100%)",
    category: "Sports & Recreation",
    progress: 23,
    description: "Setting up table tennis facilities for recreational sports."
  },
  {
    id: "100-badminton-courts",
    title: "100 Badminton Courts",
    status: "upcoming",
    impact: "Sports infrastructure",
    imageGradient: "linear-gradient(135deg, hsl(140 70% 45%) 0%, hsl(155 75% 55%) 100%)",
    category: "Sports & Recreation",
    progress: 0,
    description: "Creating badminton facilities for competitive and recreational play."
  },
  {
    id: "100-volleyball-nets",
    title: "100 Volleyball Nets",
    status: "in-progress",
    impact: "56 nets installed",
    imageGradient: "linear-gradient(135deg, hsl(20 80% 50%) 0%, hsl(30 85% 60%) 100%)",
    category: "Sports & Recreation",
    progress: 56,
    description: "Establishing volleyball courts for team sports activities."
  },
  {
    id: "100-football-goals",
    title: "100 Football Goals",
    status: "in-progress",
    impact: "39 goals installed",
    imageGradient: "linear-gradient(135deg, hsl(115 70% 40%) 0%, hsl(130 75% 50%) 100%)",
    category: "Sports & Recreation",
    progress: 39,
    description: "Setting up football facilities for popular team sport."
  },
  {
    id: "100-basketball-hoops",
    title: "100 Basketball Hoops",
    status: "in-progress",
    impact: "44 hoops installed",
    imageGradient: "linear-gradient(135deg, hsl(25 80% 55%) 0%, hsl(35 85% 65%) 100%)",
    category: "Sports & Recreation",
    progress: 44,
    description: "Installing basketball facilities for recreational and competitive play."
  },
  {
    id: "100-cricket-kits",
    title: "100 Cricket Kits",
    status: "completed",
    impact: "Teams fully equipped",
    imageGradient: "linear-gradient(135deg, hsl(110 65% 40%) 0%, hsl(125 70% 50%) 100%)",
    category: "Sports & Recreation",
    progress: 100,
    description: "Complete cricket equipment sets for aspiring players."
  },
  {
    id: "100-athletic-tracks",
    title: "100 Athletic Track Lanes",
    status: "upcoming",
    impact: "Track infrastructure",
    imageGradient: "linear-gradient(135deg, hsl(0 80% 55%) 0%, hsl(10 85% 65%) 100%)",
    category: "Sports & Recreation",
    progress: 0,
    description: "Constructing professional athletic tracks for running events."
  },
  {
    id: "100-medals",
    title: "100 Gold Medals",
    status: "completed",
    impact: "Excellence recognition",
    imageGradient: "linear-gradient(135deg, hsl(45 85% 55%) 0%, hsl(50 90% 65%) 100%)",
    category: "Sports & Recreation",
    progress: 100,
    description: "Awarding medals to recognize outstanding athletic achievements."
  },
  {
    id: "100-trophies",
    title: "100 Championship Trophies",
    status: "completed",
    impact: "Winners celebrated",
    imageGradient: "linear-gradient(135deg, hsl(40 80% 50%) 0%, hsl(48 85% 60%) 100%)",
    category: "Sports & Recreation",
    progress: 100,
    description: "Presenting trophies to tournament winners and champions."
  },
  {
    id: "100-certificates",
    title: "100,000 Certificates",
    status: "in-progress",
    impact: "87,234 awarded",
    imageGradient: "linear-gradient(135deg, hsl(215 70% 50%) 0%, hsl(230 75% 60%) 100%)",
    category: "Education",
    progress: 87,
    description: "Recognizing participation and achievement across all centenary events."
  },
  {
    id: "100-volunteers",
    title: "100 Volunteers Mobilized",
    status: "completed",
    impact: "147 active volunteers",
    imageGradient: "linear-gradient(135deg, hsl(340 75% 55%) 0%, hsl(355 80% 65%) 100%)",
    category: "Community Service",
    progress: 100,
    description: "Building a community of dedicated volunteers for social initiatives."
  },
  {
    id: "100-mentorship",
    title: "100 Mentorship Programs",
    status: "in-progress",
    impact: "64 programs active",
    imageGradient: "linear-gradient(135deg, hsl(260 70% 50%) 0%, hsl(275 75% 60%) 100%)",
    category: "Education",
    progress: 64,
    description: "Connecting students with experienced mentors for guidance."
  },
  {
    id: "100-internships",
    title: "100 Internship Opportunities",
    status: "in-progress",
    impact: "72 placed",
    imageGradient: "linear-gradient(135deg, hsl(195 75% 50%) 0%, hsl(210 80% 60%) 100%)",
    category: "Education",
    progress: 72,
    description: "Facilitating industry internships for practical experience."
  },
  {
    id: "100-career-counseling",
    title: "100 Career Counseling Sessions",
    status: "in-progress",
    impact: "81 sessions completed",
    imageGradient: "linear-gradient(135deg, hsl(175 70% 45%) 0%, hsl(190 75% 55%) 100%)",
    category: "Education",
    progress: 81,
    description: "Guiding students in making informed career choices."
  },
  {
    id: "100-industry-visits",
    title: "100 Industry Visits",
    status: "in-progress",
    impact: "47 visits organized",
    imageGradient: "linear-gradient(135deg, hsl(205 75% 50%) 0%, hsl(220 80% 60%) 100%)",
    category: "Education",
    progress: 47,
    description: "Exposing students to real-world industry practices."
  },
  {
    id: "100-guest-lectures",
    title: "100 Guest Lectures",
    status: "in-progress",
    impact: "68 lectures delivered",
    imageGradient: "linear-gradient(135deg, hsl(245 70% 50%) 0%, hsl(260 75% 60%) 100%)",
    category: "Education",
    progress: 68,
    description: "Bringing industry experts to share knowledge with students."
  },
  {
    id: "100-webinars",
    title: "100 Educational Webinars",
    status: "in-progress",
    impact: "89 webinars conducted",
    imageGradient: "linear-gradient(135deg, hsl(185 75% 50%) 0%, hsl(200 80% 60%) 100%)",
    category: "Technology",
    progress: 89,
    description: "Online learning sessions with global experts and thought leaders."
  },
  {
    id: "100-hackathons",
    title: "100 Hackathons",
    status: "in-progress",
    impact: "22 events organized",
    imageGradient: "linear-gradient(135deg, hsl(275 75% 55%) 0%, hsl(290 80% 65%) 100%)",
    category: "Technology",
    progress: 22,
    description: "Fostering innovation through competitive coding challenges."
  },
  {
    id: "100-coding-workshops",
    title: "100 Coding Workshops",
    status: "in-progress",
    impact: "57 workshops held",
    imageGradient: "linear-gradient(135deg, hsl(210 70% 50%) 0%, hsl(225 75% 60%) 100%)",
    category: "Technology",
    progress: 57,
    description: "Teaching programming skills to beginners and advanced learners."
  },
  {
    id: "100-robotics-kits",
    title: "100 Robotics Kits",
    status: "in-progress",
    impact: "34 kits distributed",
    imageGradient: "linear-gradient(135deg, hsl(170 70% 45%) 0%, hsl(185 75% 55%) 100%)",
    category: "Technology",
    progress: 34,
    description: "Introducing students to robotics and automation technology."
  },
  {
    id: "100-3d-printers",
    title: "100 3D Printers",
    status: "upcoming",
    impact: "Advanced manufacturing",
    imageGradient: "linear-gradient(135deg, hsl(190 75% 50%) 0%, hsl(205 80% 60%) 100%)",
    category: "Technology",
    progress: 0,
    description: "Bringing additive manufacturing technology to educational labs."
  },
  {
    id: "100-vr-headsets",
    title: "100 VR Headsets",
    status: "upcoming",
    impact: "Immersive learning",
    imageGradient: "linear-gradient(135deg, hsl(270 75% 55%) 0%, hsl(285 80% 65%) 100%)",
    category: "Technology",
    progress: 0,
    description: "Enabling virtual reality experiences for enhanced learning."
  },
  {
    id: "100-drones",
    title: "100 Educational Drones",
    status: "upcoming",
    impact: "Aerial technology",
    imageGradient: "linear-gradient(135deg, hsl(195 70% 50%) 0%, hsl(210 75% 60%) 100%)",
    category: "Technology",
    progress: 0,
    description: "Teaching drone technology and aerial photography to students."
  },
  {
    id: "100-iot-kits",
    title: "100 IoT Development Kits",
    status: "in-progress",
    impact: "28 kits distributed",
    imageGradient: "linear-gradient(135deg, hsl(180 70% 45%) 0%, hsl(195 75% 55%) 100%)",
    category: "Technology",
    progress: 28,
    description: "Teaching Internet of Things concepts with hands-on hardware."
  },
  {
    id: "100-ai-workshops",
    title: "100 AI Workshops",
    status: "in-progress",
    impact: "16 workshops conducted",
    imageGradient: "linear-gradient(135deg, hsl(255 75% 55%) 0%, hsl(270 80% 65%) 100%)",
    category: "Technology",
    progress: 16,
    description: "Introducing artificial intelligence and machine learning concepts."
  },
  {
    id: "100-startup-pitches",
    title: "100 Startup Pitch Events",
    status: "in-progress",
    impact: "31 events organized",
    imageGradient: "linear-gradient(135deg, hsl(15 80% 55%) 0%, hsl(25 85% 65%) 100%)",
    category: "Education",
    progress: 31,
    description: "Providing platforms for aspiring entrepreneurs to present ideas."
  },
  {
    id: "100-innovation-awards",
    title: "100 Innovation Awards",
    status: "in-progress",
    impact: "67 awards given",
    imageGradient: "linear-gradient(135deg, hsl(42 85% 55%) 0%, hsl(48 90% 65%) 100%)",
    category: "Education",
    progress: 67,
    description: "Recognizing creative solutions and innovative thinking."
  },
  {
    id: "100-research-grants",
    title: "100 Research Grants",
    status: "in-progress",
    impact: "49 grants awarded",
    imageGradient: "linear-gradient(135deg, hsl(225 70% 50%) 0%, hsl(240 75% 60%) 100%)",
    category: "Education",
    progress: 49,
    description: "Funding student research projects and academic investigations."
  },
  {
    id: "100-publications",
    title: "100 Research Publications",
    status: "in-progress",
    impact: "73 papers published",
    imageGradient: "linear-gradient(135deg, hsl(200 75% 50%) 0%, hsl(215 80% 60%) 100%)",
    category: "Education",
    progress: 73,
    description: "Supporting faculty and students in academic publishing."
  },
  {
    id: "100-patents",
    title: "100 Patent Applications",
    status: "in-progress",
    impact: "26 patents filed",
    imageGradient: "linear-gradient(135deg, hsl(165 70% 45%) 0%, hsl(180 75% 55%) 100%)",
    category: "Education",
    progress: 26,
    description: "Encouraging innovation through intellectual property protection."
  },
  {
    id: "100-exhibitions",
    title: "100 Project Exhibitions",
    status: "in-progress",
    impact: "54 exhibitions held",
    imageGradient: "linear-gradient(135deg, hsl(285 75% 55%) 0%, hsl(300 80% 65%) 100%)",
    category: "Education",
    progress: 54,
    description: "Showcasing student projects and innovative solutions."
  },
  {
    id: "100-documentary",
    title: "100-Year Documentary",
    status: "in-progress",
    impact: "75% filming complete",
    imageGradient: "linear-gradient(135deg, hsl(330 75% 55%) 0%, hsl(345 80% 65%) 100%)",
    category: "Culture & Heritage",
    progress: 75,
    description: "Creating a comprehensive documentary of JKKN's centenary journey."
  },
  {
    id: "100-commemorative-book",
    title: "Centenary Commemorative Book",
    status: "in-progress",
    impact: "Content 90% complete",
    imageGradient: "linear-gradient(135deg, hsl(30 80% 50%) 0%, hsl(40 85% 60%) 100%)",
    category: "Culture & Heritage",
    progress: 90,
    description: "Publishing a comprehensive book documenting 100 years of excellence."
  },
  {
    id: "100-time-capsule",
    title: "100-Year Time Capsule",
    status: "upcoming",
    impact: "Legacy for future generations",
    imageGradient: "linear-gradient(135deg, hsl(240 70% 50%) 0%, hsl(255 75% 60%) 100%)",
    category: "Culture & Heritage",
    progress: 0,
    description: "Creating a time capsule to be opened on the 200th anniversary."
  },
  {
    id: "100-grand-celebration",
    title: "Grand Centenary Celebration",
    status: "upcoming",
    impact: "Milestone celebration event",
    imageGradient: "linear-gradient(135deg, hsl(22 100% 60%) 0%, hsl(35 100% 70%) 100%)",
    category: "Culture & Heritage",
    progress: 0,
    description: "A spectacular event celebrating 100 years of educational excellence and community service."
  }
];
