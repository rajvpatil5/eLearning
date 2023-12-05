type SyllabusItem = {
  week: number;
  topic: string;
  content: string;
};

type Course = {
  id: number;
  name: string;
  instructor: string;
  description: string;
  enrollmentStatus: string;
  thumbnail: string;
  duration: string;
  schedule: string;
  location: string;
  prerequisites: string[];
  syllabus: SyllabusItem[];
};

const courseModel: Course[] = [
  {
    id: 1,
    name: "Introduction to React Native",
    instructor: "John Doe",
    description:
      "Learn the basics of React Native development and build your first mobile app.",
    enrollmentStatus: "Open",
    thumbnail: "https://dummyimage.com/600x400",
    duration: "8 weeks",
    schedule: "Tuesdays and Thursdays, 6:00 PM - 8:00 PM",
    location: "Online",
    prerequisites: ["Basic JavaScript knowledge", "Familiarity with React"],
    syllabus: [
      {
        week: 1,
        topic: "Introduction to React Native",
        content:
          "Overview of React Native, setting up your development environment.",
      },
      {
        week: 2,
        topic: "Building Your First App",
        content: "Creating a simple mobile app using React Native components.",
      },
    ],
  },
  {
    id: 2,
    name: "Introduction to Android",
    instructor: "Sandra D",
    description:
      "Learn the basics of android development and build your first mobile app.",
    enrollmentStatus: "Open",
    thumbnail: "https://dummyimage.com/600x400",
    duration: "8 weeks",
    schedule: "Tuesdays and Thursdays, 6:00 PM - 8:00 PM",
    location: "Online",
    prerequisites: ["Basic Java knowledge", "Familiarity with Java"],
    syllabus: [
      {
        week: 1,
        topic: "Introduction to Java and Android",
        content:
          "Overview of Java and Android, setting up your development environment.",
      },
      {
        week: 2,
        topic: "Building Your First App",
        content: "Creating a simple mobile app using React Native components.",
      },
    ],
  },
  {
    id: 3,
    name: "Full Stack Web Development Bootcamp",
    instructor: "Jane Smith",
    description:
      "Comprehensive training on full-stack web development technologies.",
    enrollmentStatus: "Open",
    thumbnail: "https://dummyimage.com/600x400",
    duration: "12 weeks",
    schedule: "Mondays and Wednesdays, 7:00 PM - 9:00 PM",
    location: "Online",
    prerequisites: ["Basic HTML, CSS, and JavaScript knowledge"],
    syllabus: [
      {
        week: 1,
        topic: "HTML Basics",
        content: "Introduction to HTML tags and structure.",
      },
      {
        week: 2,
        topic: "CSS Styling",
        content: "Fundamentals of CSS for styling web pages.",
      },
    ],
  },
  {
    id: 4,
    name: "Finance Fundamentals",
    instructor: "Emily Johnson",
    description:
      "Explore the fundamentals of finance and investment strategies.",
    enrollmentStatus: "Open",
    thumbnail: "https://dummyimage.com/600x400",
    duration: "6 weeks",
    schedule: "Tuesdays and Thursdays, 5:00 PM - 7:00 PM",
    location: "Online",
    prerequisites: ["Basic understanding of financial concepts"],
    syllabus: [
      {
        week: 1,
        topic: "Introduction to Finance",
        content: "Overview of financial principles and terminology.",
      },
      {
        week: 2,
        topic: "Investment Strategies",
        content: "Exploring different investment approaches.",
      },
    ],
  },
  {
    id: 5,
    name: "Digital Marketing Mastery",
    instructor: "Alex Turner",
    description:
      "Master the art of digital marketing and enhance your online presence.",
    enrollmentStatus: "Open",
    thumbnail: "https://dummyimage.com/600x400",
    duration: "10 weeks",
    schedule: "Wednesdays and Fridays, 3:00 PM - 5:00 PM",
    location: "Online",
    prerequisites: ["Basic understanding of marketing concepts"],
    syllabus: [
      {
        week: 1,
        topic: "Introduction to Digital Marketing",
        content: "Overview of digital marketing channels and strategies.",
      },
      {
        week: 2,
        topic: "Social Media Marketing",
        content: "Utilizing social media platforms for effective marketing.",
      },
    ],
  },
  {
    id: 6,
    name: "UI/UX Design Fundamentals",
    instructor: "Emily Johnson",
    description:
      "Explore the fundamentals of UI/UX design and create user-friendly interfaces.",
    enrollmentStatus: "Open",
    thumbnail: "https://dummyimage.com/600x400",
    duration: "12 weeks",
    schedule: "Mondays and Thursdays, 4:00 PM - 6:00 PM",
    location: "Online",
    prerequisites: ["Basic design concepts"],
    syllabus: [
      {
        week: 1,
        topic: "Introduction to UI/UX Design",
        content:
          "Understanding the role and importance of UI/UX in product design.",
      },
      {
        week: 2,
        topic: "Wireframing and Prototyping",
        content:
          "Creating wireframes and interactive prototypes for design projects.",
      },
    ],
  },
  {
    id: 7,
    name: "DevOps Fundamentals",
    instructor: "Michael Smith",
    description:
      "Dive into the fundamentals of DevOps and learn to streamline software development and operations.",
    enrollmentStatus: "Open",
    thumbnail: "https://dummyimage.com/600x400",
    duration: "10 weeks",
    schedule: "Wednesdays and Fridays, 5:00 PM - 7:00 PM",
    location: "Online",
    prerequisites: ["Basic understanding of software development"],
    syllabus: [
      {
        week: 1,
        topic: "Introduction to DevOps",
        content: "Understanding the principles and benefits of DevOps.",
      },
      {
        week: 2,
        topic: "Continuous Integration and Deployment",
        content:
          "Implementing CI/CD pipelines for automated software delivery.",
      },
    ],
  },
  {
    id: 8,
    name: "Human Resource Management",
    instructor: "Emily Johnson",
    description:
      "Explore the principles and practices of effective human resource management in the modern workplace.",
    enrollmentStatus: "Open",
    thumbnail: "https://dummyimage.com/600x400",
    duration: "12 weeks",
    schedule: "Mondays and Thursdays, 7:00 PM - 9:00 PM",
    location: "Online",
    prerequisites: ["Basic understanding of organizational management"],
    syllabus: [
      {
        week: 1,
        topic: "Introduction to HR Management",
        content:
          "Understanding the role and functions of human resource management.",
      },
      {
        week: 2,
        topic: "Talent Acquisition and Recruitment",
        content: "Strategies for attracting and recruiting top talent.",
      },
    ],
  },
  {
    id: 9,
    name: "Motorbike Riding Basics",
    instructor: "Tom Wheeler",
    description:
      "Learn the fundamentals of safe and enjoyable motorbike riding.",
    enrollmentStatus: "Open",
    thumbnail: "https://dummyimage.com/600x400",
    duration: "4 weeks",
    schedule: "Saturdays and Sundays, 10:00 AM - 12:00 PM",
    location: "Outdoor Riding Range",
    prerequisites: ["Valid motorcycle learner's permit"],
    syllabus: [
      {
        week: 1,
        topic: "Introduction to Motorbike Riding",
        content: "Overview of basic riding principles and safety measures.",
      },
      {
        week: 2,
        topic: "Gear and Equipment",
        content: "Understanding and choosing the right riding gear.",
      },
    ],
  },
  {
    id: 10,
    name: "Introduction to Scuba Diving",
    instructor: "Amanda Deepsea",
    description:
      "Explore the wonders of the underwater world with scuba diving basics.",
    enrollmentStatus: "Open",
    thumbnail: "https://dummyimage.com/600x400",
    duration: "6 weeks",
    schedule: "Mondays and Wednesdays, 7:00 PM - 9:00 PM",
    location: "Local Diving Center",
    prerequisites: [
      "Swimming proficiency",
      "Medical clearance for scuba diving",
    ],
    syllabus: [
      {
        week: 1,
        topic: "Getting Started with Scuba Diving",
        content:
          "Introduction to scuba diving equipment and safety procedures.",
      },
      {
        week: 2,
        topic: "Underwater Exploration Techniques",
        content:
          "Learning how to navigate and explore underwater environments.",
      },
    ],
  },
];
export default courseModel;
