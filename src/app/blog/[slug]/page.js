import { BLOG_POSTS } from "@/data/posts";
import ArticleDetail from "@/components/ArticleDetail";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} — EngLog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const initialPost = BLOG_POSTS.find((p) => p.slug === slug) || null;

  return <ArticleDetail initialPost={initialPost} slug={slug} />;
}
