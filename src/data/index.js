import { algorithms, devnotes, oscs } from "../assets";

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
    id: "contact",
    title: "Contact",
  },
];

const experiences = [
  {
    title: "Game Design Intern",
    company_name: "Fun motion labs",
    date: "2023 - Present",
    details: [
      "Built a Complete  <span style='color: white;'>Golf game</span> for pc and VR devices",
      "Crafted visually appealling Golf courses with<span style='color: white;'>Beautiful Locations</span>.",
      "Produced high-quality educational and entertaining tutorial videos for<span style='color: white;'>New user and expert</span>.",
    ],
  },
  {
    title: "Unity VR Developer",
    company_name: "Starwatch Technologies",
    date: "June2023 - November2023",
    details: [
      "Developed and delivered custom interdisciplinary coding portfolio for clients including <span style='color: white;'>Nvidia, Hostinger, and Amazon</span>.",
      "<span style='color: white;'>Designed and developed innovative</span> AI applications and interactive websites.",
      "<span style='color: white;'>Managed full project lifecycle</span> from concept to deployment in successful and timely project completions.",
    ],
  },
  // {
  //   title: "Software Engineer",
  //   company_name: "Prime 3",
  //   date: "2018 - 2019",
  //   details: [
  //     "Built custom enterprise applications for a <span style='color: white;'>Fortune 500 company</span> as a full-stack software engineer.",
  //     "Developed and maintained <span style='color: white;'>scalable backend services</span>, ensuring high availability for critical business applications.",
  //     "<span style='color: white;'>Collaborated with a team</span> to design and implement front-end interfaces.",
  //   ],
  // },
  {
    title: "Computer Science",
    company_name: "GITS",
    date: "2021 - 2025",
    details: [
      "Built a <span style='color: white;'>computer science foundation</span> learning theory, computer architecture, and software engineering.",
      "Worked and interned at <span style='color: white;'>NASA and Norfolk Southern Railway</span> to gain practical experience in the field of data analysis.",
      "Acted as a member of the <span style='color: white;'>Association for Computing Machinery</span> (ACM).",
    ],
  },
];

const portfolio = [
  {
    name: "Published on Google PlayStore",
    description:
      "Published a game on Google PlayStore as an Indie game Developer",
    image: oscs,
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
