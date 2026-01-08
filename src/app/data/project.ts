interface Project {
  title: string;
  number: string;
  date: string;
  slug: string;
  description: string;
  technologies: string[];
  images?: string[];
  features: string[];
  demo: string;
  github: string;
  videoUrl?: string;
  members?: { name: string; url: string }[];
}

// Define page props interface
interface PageProps {
  params: {
    slug: string;
  };
}

const projects: Record<string, Project> = {
  jencyLab: {
    
    title: "Jency Lab",
    number: "01",
    date: "December 2025",
    slug: "an e-commerce website for Skincare products",
    description: "An e-commerce website for Skincare products.",    
    technologies: ["Nextjs", "Tailwind", "Js", "Supabase"],
    images: ["/images/jency.png"],
    features: [
      "User-friendly interface for browsing and purchasing skincare products",
      "Secure payment gateway integration",
      "Personalized product recommendations based on user preferences",
      "Inventory management system for real-time stock updates",
    ],
    demo: "https://jencylab.vercel.app/",
    github: "https://github.com/wanchanlin/Jency-Lab.git",
      
  },    
    
  powerOfBalance: {
    number: "02",
    date: "April 2025",
    title: "Power Of Balance",
    slug: "A series of cooperative audio storytelling games",
    description:
      "An immersive series of cooperative audio storytelling games set during the Cold War between the United States and Cuba. \nPlayers work together to uncover secrets, navigate political tension, and make impactful decisions through rich audio-driven narratives.",
    technologies: ["Html", "Css", "Js"],
    images: ["/images/pob.svg"],
    features: [
      "Cooperative Gameplay: Collaborate with others to shape the story's outcome.",
      "Audio-Driven Storytelling: Experience the Cold War through atmospheric sound design and voice-acted scenes",
      "Historical Immersion: Engage with real events and fictionalized scenarios inspired by the US–Cuba conflict.",
      "Interactive maps and guides",
    ],
    demo: "https://balance-of-power.vercel.app/",
    github: "https://github.com/awsactivators/balance-of-power-game.git",
    members: [
      { name: "Heather", url: "https://github.com/heatherfeather-code" },
      { name: "Gabi", url: "https://github.com/gabi-studio" },
      { name: "Genevieve", url: "https://github.com/awsactivators" },
      { name: "Wanchan", url: "https://github.com/wanchanlin" },
    ],
  },
  birdIP: {
    number: "02",
    date: "April 2025",
    videoUrl: "https://www.youtube.com/embed/oj6NyqT32OA",
    title: "BirdIP",
    slug: "Your IP address indicates your local bird species",
    images: ["/images/birdip.svg"],
    description:
      "Your IP address is used to identify local bird species in your area. By clicking the More button, you can view a ranked list of recently sighted birds nearby, along with their observed locations. For each bird species, you'll also have the option to access more detailed information by following a link to its Wikipedia page.n/The bird-sighting website integrates several APIs to offer a location-based, informative experience for users. \n\n Here's a breakdown of each:\n 1. IP Geolocation API\n Purpose: Identify the user's approximate location using their IP address.\n2. eBird API (Bird Observation Data)\nPurpose: Retrieve a ranked list of recently sighted bird species in the user's region.\n3. Google Maps JavaScript API\nPurpose: Visualize bird sighting locations on an interactive map. ",
    technologies: ["Html", "Css", "Js", "php", "api"],
    features: [
      "A ranked list of recently sighted birds in your region",
      "The locations where these birds were last observed",
      "Detailed information about each species, with a link to their Wikipedia page for more in-depth reading",

    ],
    demo: "https://joycelin.infinityfreeapp.com/",
    github: "https://github.com/wanchanlin/BirdIP",
  },
  nationalParks: {
    number: "03",
    date: "April 2025",
   slug: "A project where admins manage national park info and users can view/save it",
    videoUrl: "https://www.youtube.com/embed/mLvPdRS_Bp8", // Optional
    title: "National Parks Project",
    description:
      "A comprehensive project for managing and exploring national parks information.they can view and save their information.\nand the admin can manage the information.\n\nAdmin \nUsername: admin@example.com \nPassword:test\n\nUser \nUsername: henry.clark@example.com \nPassword:test",
    technologies: ["Html", "Css", "Js", "php", "mysql"],
    images: ["/images/npe.svg"],
    features: [
      "Admin dashboard for park management",
      "User-friendly interface for park exploration",
      "Real-time data updates",
      "Interactive maps and guides",
      "CRUD operations",
    ],
    demo: "https://lavender-dolphin-454296.hostingersite.com/index.php",
    github: "https://github.com/wanchanlin/national-parks-ecology",
    members: [
      { name: "Gabi", url: "https://github.com/gabi-studio" },
      { name: "Tashrif", url: "https://github.com/Ramdao" },
      { name: "Wanchan", url: "https://github.com/wanchanlin" },
    ],
  },
  weather: {
    number: "04",
    date: "March 2025",
    title: "Earth V.S. Mars Weather",
    slug: "A project that explores the differences between Earth and Mars using APIs",
    description:
      "Compare weather conditions between Earth and Mars using real-time data.",
    technologies: ["pug", "Css", "node", "Js"],
    images: ["/images/evm.svg"],
    features: [
      "Real-time weather data comparison",
      "Interactive visualizations",
      "Historical data analysis",
      "API integration",
    ],
    demo: "https://weather-mars-earth.vercel.app/",
    github: "https://github.com/wanchanlin/MarsVSEarth",
  },
  birdanimation: {
    number: "05",
    date: "Nov 2024",
    title: "Animation",
    description:
      "A creative animation project showcasing various bird species.",
    technologies: ["Html", "Css", "Js"],
    slug: "Joyce's first coding project",
    images: ["/images/animation.svg"],
    features: [
      "Interactive animations",
      "Not Responsive",
      "Smooth transitions",
      "Cross-browser compatibility",
    ],
    demo: "https://animation-project-lemon.vercel.app/",
    github: "https://github.com/wanchanlin/AnimationProject",
 
  },
};
export default projects;