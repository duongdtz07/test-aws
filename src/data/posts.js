export const BLOG_POSTS = [
  {
    id: "1",
    slug: "building-scalable-cloud-architecture-nextjs-aws",
    title: "Building Scalable Cloud Architecture with Next.js & AWS",
    excerpt: "Learn how to architect high-performance, cost-effective serverless web applications using Next.js App Router and AWS services like Lambda and CloudFront.",
    category: "DevOps & Cloud",
    tags: ["Next.js", "AWS", "Serverless", "DevOps"],
    date: "Jul 28, 2026",
    readTime: "6 min read",
    author: {
      name: "Thành Dương",
      role: "Cloud Architect & Dev Lead",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    content: `
## Why Next.js + AWS Serverless?

Modern web applications demand high availability, instant global scalability, and minimal operational overhead. Combining **Next.js App Router** with AWS cloud infrastructure provides a robust foundation for building high-traffic production sites.

### Key Architectural Pillars

1. **Edge Caching via Amazon CloudFront**: Deliver static assets and cached HTML pages instantly from edge locations worldwide.
2. **Serverless Functions with AWS Lambda**: Execute dynamic Server Component logic without server management overhead.
3. **Database Integration**: Connecting to Amazon Aurora PostgreSQL using serverless connection pools to prevent connection exhaustion.

\`\`\`javascript
// Next.js Server Action example for fetching cloud telemetry
export async function getTelemetryData() {
  const res = await fetch("https://api.aws.internal/metrics", {
    next: { revalidate: 60 } // Revalidate every minute
  });
  return res.json();
}
\`\`\`

### Performance Optimization Results

By implementing server-side rendering with edge caching, response latency dropped by over 65% while reducing server infrastructure costs by 40%.
    `
  },
  {
    id: "2",
    slug: "mastering-nextjs-app-router-best-practices",
    title: "Mastering Next.js App Router: Patterns & Anti-Patterns",
    excerpt: "A comprehensive deep dive into Layouts, Server Components, Parallel Routes, and Optimizing Bundle Size in modern Next.js apps.",
    category: "Next.js",
    tags: ["Next.js", "React", "Frontend", "JavaScript"],
    date: "Jul 20, 2026",
    readTime: "8 min read",
    author: {
      name: "Thành Dương",
      role: "Cloud Architect & Dev Lead",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    content: `
## Understanding React Server Components (RSC)

React Server Components represent a fundamental shift in how web applications render content. By rendering components exclusively on the server, we eliminate client-side JavaScript overhead for static elements.

### Rules of Thumb for RSC

- **Fetch data where it's used**: Component-level data fetching eliminates props drilling.
- **Keep Client Components at the leaves**: Wrap interactive UI (forms, toggles, stateful buttons) in Client Components while keeping parent layouts as Server Components.
- **Utilize Suspense boundaries**: Stream content progressively to maximize First Contentful Paint (FCP).

\`\`\`jsx
import { Suspense } from 'react';
import PostFeed from './PostFeed';
import SkeletonFeed from './SkeletonFeed';

export default function FeedPage() {
  return (
    <main>
      <h1>Latest Engineering Insights</h1>
      <Suspense fallback={<SkeletonFeed />}>
        <PostFeed />
      </Suspense>
    </main>
  );
}
\`\`\`
    `
  },
  {
    id: "3",
    slug: "modern-ci-cd-pipelines-with-github-actions",
    title: "Streamlining Docker Deployments with GitHub Actions",
    excerpt: "Automate your build, test, and container registry push pipeline with GitHub Actions workflows and multi-stage Docker builds.",
    category: "DevOps & Cloud",
    tags: ["DevOps", "Docker", "CI/CD", "GitHub"],
    date: "Jul 15, 2026",
    readTime: "5 min read",
    author: {
      name: "Alex Rivera",
      role: "DevOps Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1618401471353-b98aedd04e11?auto=format&fit=crop&w=800&q=80",
    content: `
## Automated Deployment Workflows

Continuous Deployment ensures every verified commit reaches staging and production reliably. Leveraging multi-stage Docker builds keeps image sizes minimal while securing credentials.

### GitHub Actions Pipeline Example

\`\`\`yaml
name: Production Deployment

on:
  push:
    branches: [ main ]

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build Docker Image
        run: docker build -t myapp:latest .
      - name: Push to Registry
        run: echo "Deploying container image..."
\`\`\`
    `
  },
  {
    id: "4",
    slug: "harnessing-ai-assistants-in-software-engineering",
    title: "Harnessing AI Pair Programming in Production Workflows",
    excerpt: "How agentic AI models elevate code quality, speed up automated testing, and automate refactoring tasks without compromising safety.",
    category: "AI & Tech",
    tags: ["AI", "Software Development", "Productivity"],
    date: "Jul 08, 2026",
    readTime: "7 min read",
    author: {
      name: "Thành Dương",
      role: "Cloud Architect & Dev Lead",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
    content: `
## The Rise of Agentic Coding Assistants

AI tools have evolved beyond simple autocomplete snippets. Today's agentic systems inspect full project contexts, run automated terminal tests, generate documentation, and collaborate directly with engineers.

### Key Workflow Enhancements

- **Instant Context Synthesis**: Rapidly understand unknown codebases.
- **Automated Test Coverage**: Write edge-case test suites in seconds.
- **Refactoring Guardrails**: Detect security vulnerabilities and performance bottlenecks before merge.
    `
  },
  {
    id: "5",
    slug: "designing-glassmorphic-ui-with-vanilla-css",
    title: "Designing Glassmorphic Web UIs with Pure CSS",
    excerpt: "Craft ultra-premium backdrop filters, glowing gradient borders, and sleek dark modes using modern CSS variables and zero dependencies.",
    category: "Frontend",
    tags: ["CSS", "UI/UX", "Design", "Frontend"],
    date: "Jun 30, 2026",
    readTime: "4 min read",
    author: {
      name: "Elena Rostova",
      role: "UI Engineer",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
    },
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    content: `
## The Power of Backdrop Filters

Glassmorphism creates a sense of depth, elegance, and hierarchy in modern web interfaces. By combining semi-transparent background colors with \`backdrop-filter: blur()\`, components blend seamlessly into dark wallpaper backgrounds.

\`\`\`css
.glass-card {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
}
\`\`\`
    `
  }
];

export const CATEGORIES = ["All", "DevOps & Cloud", "Next.js", "AI & Tech", "Frontend"];
