import apoa from "./images/Gemini images/APOA.png";
import agriCultivate from "./images/Gemini images/Agri-Cultivate.png";
import aresAI from "./images/Gemini images/AresAI.png";
import athElite from "./images/Gemini images/AthElite.png";
import f1Overtake from "./images/Gemini images/F1 Overtake Prediction.png";
import fitnessTrendz from "./images/Gemini images/FitnessTrendz.png";
import frontDesk from "./images/Gemini images/Front Desk.png";
import gwsb from "./images/Gemini images/GWSB.png";
import greenHoyas from "./images/Gemini images/GreenHoyas.png";
import ieeeCsvitc from "./images/Gemini images/IEEECSVITC.png";
import novelty from "./images/Gemini images/Novelty.png";
import photographyClub from "./images/Gemini images/Photography club.png";
import taskhub from "./images/Gemini images/Taskhub.png";
import youtubeSentiment from "./images/Gemini images/Youtube Sentiment Analysis.png";
import bananaleaf from "./images/Gemini images/bananaleaf.png";
import kycSystem from "./images/Gemini images/kyc system.png";
import skills from "./images/Gemini images/skills.png";
import dsIntern1 from "./images/Gemini images/Data Science Intern 1.png";
import dsIntern2 from "./images/Gemini images/Data Science Intern 2.png";
import fullStackIntern from "./images/Gemini images/Full Stack Web Development Intern.png";
import softwareEngineerImg from "./images/Gemini images/Software Engineer.jpeg";
import introImg from "./images/Gemini images/Introduction.png";
import resumeImg from "./images/Gemini images/Resume.png";
import researchPaperImg from "./images/Gemini images/Research Paper.png";

// Document URLs for official files (Resume, Introduction, Research Paper)
export const FileURLs = {
  Resume: "https://drive.google.com/file/d/1tqc2OhVe6sfObhxyiEb7Tg3S7xmUkX_k/preview",
  Introduction: "https://drive.google.com/file/d/1zCFlT4yaULyjQlqWqKvLVEQY7T8WmBbv/preview",
  "Research Paper": "https://drive.google.com/file/d/1cBMwBs3mFkzbgIVuplHPSPrI0zcOxlmA/preview",
};

export const FileAssets = {
  // Projects
  "Agri-Cultivate": {
    name: "Agri-Cultivate: AI-Powered Farming Assistant",
    image: agriCultivate,
    category: "Projects",
    role: "AI & Full-Stack Developer",
    techStack: ["Python", "Random Forest (97%)", "Logistic Regression (95%)", "IBM Watson Assistant", "React.js", "Vercel"],
    description:
      "AI-powered smart farming platform recommending optimal crop selection (22 Indian species) based on N-P-K, temperature, pH, and rainfall data, featuring profit yield prediction and an interactive IBM Watson AI chatbot assistant.",
    highlights: [
      "Crop Recommendation Engine using Random Forest Classifier (97% accuracy across 22 crop species)",
      "Yield Profit Prediction using Logistic Regression (95% accuracy) evaluating cost, yield, and market prices",
      "AI Chatbot Assistant powered by IBM Watson Assistant for region, crop selection, and profit queries",
      "React.js Frontend DApp hosted on Vercel processing multi-parameter soil and weather telemetry",
    ],
  },
  AresAI: {
    name: "Ares.AI - Mobile AI Agent for Everyday Tasks",
    image: aresAI,
    category: "Projects",
    role: "AI Systems Engineer",
    techStack: ["Python", "Kotlin", "Android", "WebSockets", "Pydantic", "Gemini 2.5 Pro"],
    description:
      "Android AI Agent automating 100+ real-world mobile tasks with sub-5s latency, featuring real-time screen interaction via MediaProjection API, dynamic UI automation, and Pydantic function calling.",
    highlights: [
      "Automates 100+ real-world mobile tasks with sub-5s latency on Android devices",
      "Real-time live screen input processing using MediaProjection API and Gemini 2.5 Pro",
      "Bidirectional WebSocket communication layer connecting Kotlin mobile agent to Python backend",
      "Dynamic UI automation with modular prompts and Pydantic structured schemas",
    ],
  },
  AthElite: {
    name: "AthElite Sports Complex: Website Development",
    image: athElite,
    category: "Projects",
    role: "Full-Stack Web Developer",
    techStack: ["PHP", "MySQLi", "HTML5", "CSS3", "JavaScript", "Apache", "XAMPP"],
    description:
      "Full-stack web portal for AthElite Sports Complex managing member profiles, membership plans, facility bookings, trainer contacts, and admission inquiries.",
    highlights: [
      "Member Profiles & Membership Plans management system",
      "Facility info & sports court/field booking system",
      "Trainer contact directory & online admission inquiries",
      "PHP + MySQLi backend architecture with interactive UI animations",
    ],
  },
  Bananaleaf: {
    name: "Banana Leaf Restaurant: Website Development",
    image: bananaleaf,
    category: "Projects",
    role: "Full-Stack Web Developer",
    techStack: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript", "GitHub Pages", "000webhost"],
    description:
      "Restaurant web app with digital menu ordering, bulk orders, shopping cart, and administrative dashboard for menu and customer order management.",
    highlights: [
      "Online menu & ordering platform with detailed dish visuals and descriptions",
      "Shopping cart system supporting individual and bulk catering orders",
      "Admin dashboard for real-time menu management, order tracking, and query resolution",
      "PHP & MySQL server-side database integration hosted on 000webhost and GitHub Pages",
    ],
  },
  "F1 Overtake Prediction": {
    name: "F1 Overtake Prediction | Deep Learning",
    image: f1Overtake,
    category: "Projects",
    role: "Deep Learning Engineer",
    techStack: ["Python", "FastF1 API", "Transformers", "LSTM", "MLP", "PyTorch"],
    description:
      "Deep learning system analyzing lap-level Formula 1 telemetry via FastF1 API to forecast overtake probabilities with 87% accuracy within 3–5 laps.",
    highlights: [
      "87% prediction accuracy for Formula 1 overtakes within 3-5 laps",
      "Multi-architecture deep learning model combining Transformers, LSTM, and MLP networks",
      "Real-time telemetry data integration and lap-level race analysis via FastF1 API",
    ],
  },
  FitnessTrendz: {
    name: "FitnessTrendz: Gym Supplement Marketplace",
    image: fitnessTrendz,
    category: "Projects",
    role: "Full-Stack MERN Developer",
    techStack: ["React", "Tailwind CSS", "Node.js", "MongoDB", "Render", "PhonePe API"],
    description:
      "Full-stack MERN gym supplement e-commerce marketplace achieving a 40% increase in user engagement with product discovery, category sorting, customer reviews, and PhonePe payment gateway.",
    highlights: [
      "40% increase in user engagement through optimized UX and category filtering",
      "Complete shopping cart, customer verified reviews, and product discovery workflow",
      "Node.js & MongoDB backend for server-side product and user data management",
      "Integrated PhonePe payment gateway and reliable deployment on Render",
    ],
  },
  "Front Desk": {
    name: "GWSB Front Desk Assistant | AI Assistant with RAG Pipeline",
    image: frontDesk,
    category: "Projects",
    role: "AI & Front Desk Lead Developer",
    organization: "GWSB Undergraduate Office",
    location: "Washington, D.C.",
    period: "2023 - 2024",
    techStack: ["Flutter", "Dart", "Gemini 2.5 Pro", "LlamaIndex", "Pinecone Vector DB"],
    description:
      "Built iOS AI Front Desk Assistant powered by Gemini 2.5 Pro, LlamaIndex, and Pinecone vector database to handle 500+ undergraduate student queries with voice & text chat.",
    highlights: [
      "Handled 500+ undergraduate student inquiries with fast, accurate SOP answers",
      "Integrated RAG pipeline using LlamaIndex and Pinecone vector database",
      "Developed Flutter/Dart iOS App supporting text and voice AI chat",
    ],
  },
  GreenHoyas: {
    name: "GreenHoyas – HoyaHacks'26 Sustainability Track Winner",
    image: greenHoyas,
    category: "Projects",
    role: "Lead Developer",
    techStack: ["Next.js", "Node.js", "MongoDB Atlas", "Snowflake AI", "Vultr"],
    description:
      "Award-winning sustainability platform incentivizing eco-friendly behavior with verified rewards, plastic-free campus events, Snowflake analytics, and Gemini AI-powered nudges.",
    highlights: [
      "HoyaHacks'26 Sustainability Track Winner",
      "Incentivized eco-friendly action tracking with verified rewards for sustainable student behavior",
      "Gemini AI-powered smart reminders and Snowflake analytics for data-driven campus insights",
      "Organized plastic-free campus events with scalable MERN architecture deployed on Vultr",
    ],
  },
  "KYC System": {
    name: "SecureID: Blockchain KYC Validation",
    image: kycSystem,
    category: "Projects",
    role: "Blockchain & Security Engineer",
    techStack: ["React.js", "Ethereum Smart Contracts", "IPFS", "Web3.storage", "Netlify"],
    description:
      "Decentralized Know-Your-Customer (KYC) identity verification DApp using webcam photo capture, immutable IPFS / Web3.storage, and Ethereum blockchain smart contracts.",
    highlights: [
      "Tamper-proof data verification using Ethereum smart contracts",
      "User-owned identity management with webcam ID photo capture",
      "Immutable document storage leveraging IPFS and Web3.storage APIs",
      "Interactive React.js DApp interface deployed on Netlify",
    ],
  },
  Novelty: {
    name: "Novelty: Decentralized Chess DApp",
    image: novelty,
    category: "Projects",
    role: "Web3 Full-Stack Engineer",
    techStack: ["React.js", "Chess.js", "Ethereum / Web3", "Supabase", "Web3.storage", "Netlify"],
    description:
      "Web3 chess gaming platform enabling token staking matches, Chess.js rule validation, and an NFT store for owning iconic game moments.",
    highlights: [
      "Play-to-win token staking chess matches with real-time turn validation via Chess.js",
      "NFT Store for minting, trading, and owning iconic chess game moments",
      "Web3.storage for decentralized NFT storage and Supabase for user session data",
    ],
  },
  TaskHub: {
    name: "TaskHub: Project Overview",
    image: taskhub,
    category: "Projects",
    role: "Full-Stack Developer",
    techStack: ["React.js", "Google Auth", "Supabase", "Netlify"],
    description:
      "Productivity & task management app with Google OAuth, Supabase security, drag-and-drop task boards, and personal vs organizational workspace separation.",
    highlights: [
      "Create, edit, and categorize personal and organizational tasks with drag-and-drop lists",
      "Google OAuth login and Supabase database security rules",
      "Efficient workspace workflow deployed reliably on Netlify",
    ],
  },
  "Youtube Sentiment Analysis": {
    name: "YouTube Comments Sentiment Analysis",
    image: youtubeSentiment,
    category: "Projects",
    role: "NLP & Data Engineer",
    techStack: ["Python", "Flask", "NLTK", "VADER", "TextBlob", "spaCy", "Chart.js", "SSE"],
    description:
      "Real-time NLP web app analyzing up to 4,000 YouTube comments per video using VADER, TextBlob, and spaCy NER, streaming live sentiment metrics via Server-Sent Events.",
    highlights: [
      "Processes up to 4,000 comments per YouTube video with real-time Server-Sent Events (SSE)",
      "Multi-engine sentiment scoring using VADER, TextBlob, and spaCy Named Entity Recognition (NER)",
      "Interactive Chart.js visualizations for sentiment distribution and emotion breakdowns",
    ],
  },
  "A Piece Of Advice": {
    name: "A Piece Of Advice (APOA)",
    image: apoa,
    category: "Projects",
    role: "Lead Full-Stack Engineer",
    organization: "APOA Platform",
    location: "Washington, D.C.",
    period: "2022 - 2023",
    techStack: ["Next.js App Router", "React", "TypeScript", "Tailwind CSS", "Supabase"],
    description:
      "Advice sharing web platform with public `/give/<username>` links, Google Sign-In, server-authoritative writes, and owner-level advice management.",
    highlights: [
      "Public personalized advice links (`/give/<username>`) and Google OAuth authentication",
      "Server-authoritative database writes and owner advice deletion controls",
      "Next.js App Router & Tailwind CSS interface backed by Supabase Postgres",
    ],
  },

  // Professional Experience (4 Core Work Experiences as per Resume)
  "Software Engineer": {
    name: "Software Engineer | Becton Dickinson (BD)",
    image: softwareEngineerImg,
    category: "Professional Experience",
    role: "Software Engineer",
    organization: "Becton Dickinson (BD)",
    location: "Bengaluru, India",
    period: "Jun. 2023 – Jul. 2024",
    techStack: ["Python", "Alteryx", "Azure Data Factory", "Docker", "Power Automate", "Power BI", "ReactJS", "Flask"],
    description:
      "Reengineered ETL pipelines, optimized global business workflows, automated data collection custom interfaces, and conducted structured GPT prompt engineering.",
    highlights: [
      "Reengineered ETL pipelines using Python, Alteryx, Azure Data Factory, and Docker (Cut time by 35%)",
      "Optimized global workflows using Power Automate, Power BI, Teams, and Excel (Boosted efficiency by 60%)",
      "Automated data collection with custom interface using ReactJS and Flask (Cut effort by 40%)",
      "Researched GPT prompts and structured prompt engineering (Improved reliability by 20%)",
      "★ SPOT AWARD RECIPIENT - Only first-year engineer to receive award",
    ],
  },
  "Data Science Intern 1": {
    name: "Data Science Intern | Becton Dickinson (BD)",
    image: dsIntern1,
    category: "Professional Experience",
    role: "Data Science Intern",
    organization: "Becton Dickinson (BD)",
    location: "Bengaluru, India",
    period: "Jan. 2023 – Jun. 2023",
    techStack: ["Python", "ReactJS", "Flask", "Data Modeling", "Chatbot Analytics"],
    description:
      "Analyzed 50k chatbot transcripts, built data modeling cost savings pipelines, presented findings to leadership with ReactJS/Flask interfaces, and drove cost reduction initiatives.",
    highlights: [
      "Analyzed 50k chatbot transcripts to identify failure patterns (Enhanced accuracy by 18%)",
      "Modeled data pipeline cost savings (Projected $40K annual cost savings)",
      "Presented analytics findings to executive leadership using custom ReactJS and Flask interfaces",
      "Reduced operational expenses by 15% through cost-cutting graph insights",
      "★ Excellent Communication & Strategic Influence Recognition",
    ],
  },
  "Data Science Intern 2": {
    name: "Data Science Intern | Becton Dickinson (BD)",
    image: dsIntern2,
    category: "Professional Experience",
    role: "Data Science Intern",
    organization: "Becton Dickinson (BD)",
    location: "Bengaluru, India",
    period: "May 2022 – Jul. 2022",
    techStack: ["Python", "Databricks", "NLP", "EDA", "Automated Classification"],
    description:
      "Automated complaint triage classification pipeline, fine-tuned NLP models on 10k+ customer complaints, and conducted exploratory data analysis.",
    highlights: [
      "Eliminated manual complaint triage costing 8 FTE hours/month with automated classification pipeline (Achieved 91% accuracy)",
      "Fine-tuned NLP model on 10K+ customer complaints using Python & Databricks",
      "Conducted Exploratory Data Analysis (EDA) on historical complaint data uncovering quality trends",
      "Boosted downstream response accuracy on future complaints by 12%",
    ],
  },
  "Full Stack Web Development Intern": {
    name: "Full Stack Web Development Intern | Acumensa Technologies",
    image: fullStackIntern,
    category: "Professional Experience",
    role: "Full Stack Web Development Intern",
    organization: "Acumensa Technologies Pvt. Ltd.",
    location: "Remote",
    period: "Jun. 2021 – Aug. 2021",
    techStack: ["ReactJS", "Django REST Framework", "Python", "UI/UX Design"],
    description:
      "Built optimized UI/UX frontend for agriculture supply chain platform using ReactJS and integrated Django REST APIs.",
    highlights: [
      "Built optimized UI/UX frontend for agriculture supply chain platform using ReactJS",
      "Created dynamic and responsive ReactJS components for seamless user navigation",
      "Integrated Django REST APIs to connect frontend UI to backend services",
      "Increased platform engagement for farmers and distributors by 30%",
    ],
  },

  // Leadership Roles
  "GW School of Business": {
    name: "Student Program Coordinator | GWSB Undergraduate Programs",
    image: gwsb,
    category: "Leadership Roles",
    role: "Student Program Coordinator",
    organization: "George Washington University School of Business (GWSB)",
    location: "Washington, D.C.",
    period: "2025 - 2026",
    techStack: ["Program Coordination", "Leadership Coaching", "Assessment Analytics", "Event Strategy"],
    description:
      "Coordinated undergraduate student leadership initiatives, annual student awards, leadership coaching workshops, career networking treks, and student engagement assessment data.",
    highlights: [
      "Coached student organization leaders and conducted leadership workshops & training",
      "Spearheaded Annual Student Leadership Awards and large-scale co-curricular programming",
      "Analyzed student engagement assessment data and curated career networking guides",
    ],
  },
  "IEEE Computer Society": {
    name: "President, IEEE Computer Society | VIT Chennai",
    image: ieeeCsvitc,
    category: "Leadership Roles",
    role: "President",
    organization: "IEEE Computer Society VIT Chennai",
    location: "Chennai, India",
    period: "August 2021 - August 2022",
    techStack: ["Executive Leadership", "Event Strategy", "Sponsorship Outreach", "Community Building"],
    description:
      "Executive leader of IEEE Computer Society VIT Chennai, driving tech events, team management, and flagship hackathons.",
    highlights: [
      "Spearheaded 'HackHub' flagship 36-hour hackathon (20+ sponsors, 250+ participants, $1000+ prize pool)",
      "Organized 'Paradox' Cryptic Hunt and Datathon competitions",
      "Led core executive team, driving club growth, brand identity, and technical seminars",
    ],
  },
  "Photography Club": {
    name: "Design Head, Photography Club | VIT Chennai",
    image: photographyClub,
    category: "Leadership Roles",
    role: "Design Head",
    organization: "Photography Club VIT Chennai",
    location: "Chennai, India",
    period: "August 2021 - August 2022",
    techStack: ["Graphic Design", "Brand Identity", "Event Promotion", "Social Media Strategy"],
    description:
      "Led creative design and branding for Photography Club VIT Chennai, overseeing event announcements, social media graphics, and member engagement.",
    highlights: [
      "Led design team creating social media graphics, event announcements, and certificates",
      "Significantly boosted online presence and club visibility across campus",
      "Coordinated creative direction and event promotional campaigns",
    ],
  },

  // About Me
  "Tech skills": {
    name: "Technical Skills Portfolio",
    image: skills,
    category: "About Me",
    role: "Technical Expertise",
    description:
      "Comprehensive breakdown of programming languages, machine learning & AI frameworks, web technologies, and cloud/database platforms.",
    skillsBreakdown: {
      "Programming Languages": ["Python", "Java", "C++", "C", "Swift", "TypeScript", "SQL", "Kotlin", "PHP"],
      "Machine Learning & AI": ["PyTorch", "TensorFlow", "Scikit-Learn", "LangChain", "LlamaIndex", "OpenAI", "VADER", "spaCy", "TextBlob", "Pandas"],
      "Web Technologies": ["React", "Next.js", "Node.js", "Flask", "FastAPI", "HTML5", "Express.js", "Django", "Bootstrap", "Chart.js"],
      "Cloud & Databases": ["AWS", "Azure", "Flutter", "Databricks", "MySQL", "Pinecone", "SQLite", "Supabase", "Alteryx", "SSMS"],
    },
  },
  Introduction: {
    name: "Samank Gupta - Introduction Document",
    image: introImg,
    category: "About Me",
    role: "Personal Biography & Intro",
    description:
      "Personal profile document introducing Samank Gupta's background in Software Engineering, Data Science, Full-Stack Web Development, and Machine Learning.",
  },
  Resume: {
    name: "Samank Gupta - Official Resume",
    image: resumeImg,
    category: "About Me",
    role: "Official Resume Document",
    docUrl: FileURLs["Resume"],
    description:
      "Official Resume of Samank Gupta covering Education at GWU and VIT, Professional Experience, Key Technical Projects, Leadership Roles, and Technical Skills.",
  },

  // Desktop
  "Research Paper": {
    name: "Advanced Machine Learning & Data Analytics Research Paper",
    image: researchPaperImg,
    category: "Desktop",
    role: "Academic Research Publication",
    docUrl: FileURLs["Research Paper"],
    description:
      "Academic Research Paper exploring novel methodologies in Deep Reinforcement Learning, Neural Architecture Search, and Scalable Data Analytics.",
  },
};
