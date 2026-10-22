import raw from "@/data/projects.json";
import type { Category, CategoryId, Project } from "./types";

export const projects = raw as Project[];

export const categories: Category[] = [
  {
    id: "featured",
    title: "Featured",
    blurb: "The highest-impact builds: governed agents, agentic RAG, research and live products.",
  },
  {
    id: "agentic",
    title: "Agentic AI & RAG",
    blurb: "LangGraph, MCP, Qdrant, Pinecone, LlamaIndex and FastAPI wired into agents that can be audited.",
  },
  {
    id: "bigdata",
    title: "Big data & analytics",
    blurb: "Large-scale exploratory and spatial analysis: tracking data, loans, crime, incidents and SQL.",
  },
  {
    id: "deeplearning",
    title: "Deep learning & NLP",
    blurb: "PyTorch models, vision-language comparisons and interpretability research on transformers.",
  },
  {
    id: "microservices",
    title: "MLOps, services & tools",
    blurb: "Docker, serverless AWS, MLOps curricula and typed, tested service boundaries.",
  },
];

export function projectsFor(id: CategoryId): Project[] {
  return projects.filter((p) => p.categories.includes(id));
}

export const profile = {
  name: "Vishal Fulsundar",
  headline: "AI Systems & Data Science Engineer",
  tagline:
    "I build production ML systems, multi-agent AI pipelines and LLM research. Currently finishing an MS in Data Science at George Washington University.",
  github: "https://github.com/vishalgwu",
  linkedin: "https://www.linkedin.com/in/vishalfulsundar/",
  email: "vishalfulsundar2025@gmail.com",
  school: "George Washington University",
  degree: "M.S. Data Science, GPA 3.87, May 2026",
  typewriter: [
    "LangGraph + FastAPI + Pinecone",
    "MCP servers & memory governance",
    "PyTorch · Transformers · vLLM",
    "Qdrant · LlamaIndex · hybrid RAG",
    "PostgreSQL · RLS · Docker",
    "AWS Lambda · API Gateway · S3",
    "pytest · GitHub Actions · observability",
  ],
  competencies: [
    "Agentic RAG with evidence grading, query rewriting and cited refusal",
    "LLM memory governance, audit trails and fail-closed design",
    "Hallucination detection and transformer interpretability research",
    "Evaluation-first engineering: benchmarks, labelled sets, offline test suites",
    "Full-stack delivery: FastAPI, Next.js, Docker, Supabase, serverless AWS",
    "Data science: forecasting, NLP, spatial analysis and dashboards",
  ],
  skills: [
    { group: "ML & GenAI", items: ["PyTorch", "TensorFlow", "Scikit-learn", "LangChain", "LangGraph", "LlamaIndex", "RAG", "FAISS", "XGBoost", "Grad-CAM", "LIME"] },
    { group: "Cloud & MLOps", items: ["AWS S3", "Lambda", "EC2", "Bedrock", "SageMaker", "API Gateway", "Docker", "MLflow"] },
    { group: "Data Engineering", items: ["PySpark", "Spark", "Hadoop", "ETL pipelines", "Parquet", "Data lakes"] },
    { group: "Databases & Tools", items: ["PostgreSQL", "MySQL", "MongoDB", "Neo4j", "Qdrant", "FastAPI", "Streamlit", "Git"] },
    { group: "Visualization", items: ["Tableau", "Power BI", "Matplotlib", "Seaborn", "Plotly"] },
  ],
  experience: [
    {
      role: "Data Scientist",
      org: "Xampus",
      detail:
        "Recommender system over 21M records (50 features), A/B tested to a 17% subscription lift. 12 production Tableau dashboards cut low-ROI ad spend by 30%.",
    },
    {
      role: "Founder",
      org: "Stoffer",
      detail:
        "B2C SaaS startup scaled to 220 shops and 12K customers; made a data-driven exit after identifying an unsustainable $50K funding gap.",
    },
  ],
  research: [
    {
      title: "Token influence and temperature effects in LLM responses",
      detail:
        "Found LLM outputs collapse into 2-cycle attractors at low temperature, mapped to logistic-map period-doubling, and built a framework to measure how RAG shifts cluster stability across GPT, LLaMA and Qwen.",
    },
    {
      title: "Text Summarization in NLP (JETIR, Vol. 10, Oct 2023)",
      detail: "Extractive versus abstractive summarization with transformers on BBC News data.",
    },
  ],
  headlineMetrics: [
    { label: "Public repos audited", value: "47" },
    { label: "Portfolio projects", value: String(projects.length) },
    { label: "HR agent decisions correct", value: "21 / 21" },
    { label: "Hallucination AUROC (LID)", value: "0.71" },
    { label: "recall@5 lift (WillDocs)", value: "71 → 84%" },
    { label: "Captioner CIDEr (48M params)", value: "0.82" },
  ],
};
