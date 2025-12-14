import { algorithms, devnotes, oscs, planeGame } from "../assets";

export const navLinks = [
  {
    id: "hero",
    title: "Hero",
  },
  {
    id: "portfolio",
    title: "Portfolio",
  },
  {
    id: "experience",
    title: "Experience",
  },
  {
    id: "skills",
    title: "Skills",
  },
  {
    id: "videos",
    title: "Videos",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const experiences = [
  {
    title: "Unity Developer",
    company_name: "Battlebucks",
    date: "Jun 2025 – Present",
    details: [
      "Developing games and interactive experiences using <span style='color: white;'>Unity</span>.",
      "Working on game mechanics and player engagement features.",
    ],
  },
  {
    title: "Game Developer",
    company_name: "Paymind Technology Pvt. Ltd",
    date: "Sep 2024 – May 2025 · New Delhi, India",
    details: [
      "Developed engaging games using <span style='color: white;'>Unity</span>.",
      "Collaborated with designers and product managers to refine gameplay.",
      "Applied <span style='color: white;'>Firebase</span> for backend support and user analytics.",
    ],
  },
  {
    title: "Unity Developer (VR Projects)",
    company_name: "Alite Reality",
    date: "Jun 2024 – Sep 2024 · Jaipur, India",
    details: [
      "Developed multiplayer VR applications integrated with <span style='color: white;'>Firebase</span>.",
      "Optimized rendering performance and ensured cross‑platform compatibility.",
      "Worked with the <span style='color: white;'>UI/UX</span> team to enhance interactivity in VR.",
    ],
  },
  {
    title: "Game Design Intern",
    company_name: "FunMotion Labs",
    date: "Sep 2023 – May 2024 · Noida, India",
    details: [
      "Designed core gameplay mechanics and levels for mobile games.",
      "Created intuitive UI interfaces and debugged functional issues.",
      "Implemented animations to enhance game dynamics.",
    ],
  },
  {
    title: "Unity VR Development Intern",
    company_name: "StarWatch Technologies",
    date: "Jun 2023 – Sep 2023 · Bangalore, India",
    details: [
      "Built interactive VR projects for internal and client use.",
      "Used Unity's <span style='color: white;'>XR Toolkit</span> and <span style='color: white;'>Oculus SDK</span> for immersive experiences.",
    ],
  },
  {
    title: "Solo Developer",
    company_name: "Indie Game Developer",
    date: "",
    details: [
      "Published an Android game on Google Play Store and a PC game on <span style='color: white;'>itch.io</span>.",
      "Managed the full development lifecycle from ideation to release.",
    ],
  },
  {
    title: "Computer Science",
    company_name: "GITS",
    date: "2021 – 2025 · Udaipur, India",
    details: [
      "Built a foundation in <span style='color: white;'>algorithms</span>, <span style='color: white;'>computer architecture</span>, and <span style='color: white;'>software engineering</span>.",
      "Completed internships and projects with a focus on <span style='color: white;'>VR and game design</span>.",
      "Active member of the <span style='color: white;'>Unity developer community</span>.",
    ],
  },
];

const portfolio = [
  {
    name: "Plane",
    description:
      "Fly your plane, dodge obstacles, beat your high score! Classic arcade action on Google Play Store.",
    image: planeGame,
    link: "https://play.google.com/store/apps/details?id=com.lightning.android.Plane",
  },
  {
    name: "Published on Google PlayStore",
    description:
      "Published a game on Google PlayStore as an Indie game Developer",
    image: oscs,
    link: "https://play.google.com/store/apps/details?id=com.manasj.guessthepicture",
  },
  {
    name: "PC Game",
    description:
      "Touch the finish line, avoiding obstacles in different challenging environments",
    image: devnotes,
  },
  {
    name: "Visually Understanding Data",
    description: "A showcase of animated data in VR environment",
    image: algorithms,
  },
];

export { experiences, portfolio };
// CV-aligned skills list
export const skills = [
  // Core Game/VR
  "Unity",
  "C#",
  "VR Development",
  "XR Interaction Toolkit",
  "Oculus SDK",
  "Multiplayer (Networking)",

  // Backend/Services
  "Firebase",

  // Design & Content
  "Game Design",
  "Level Design",
  "UI/UX",
  "Animation",
  "Blender",
  "3D Modeling",

  // Web & Tools
  "JavaScript",
  "React",
  "Git",

  // General
  "Problem Solving",
];
