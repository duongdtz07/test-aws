"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { BLOG_POSTS as INITIAL_POSTS, CATEGORIES } from "@/data/posts";

const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState(INITIAL_POSTS);

  // Sync state with localStorage
  useEffect(() => {
    try {
      const savedPosts = localStorage.getItem("englog_posts_data");
      if (savedPosts) {
        const parsed = JSON.parse(savedPosts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPosts(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load posts from localStorage", e);
    }
  }, []);

  const savePosts = (newPosts) => {
    setPosts(newPosts);
    try {
      localStorage.setItem("englog_posts_data", JSON.stringify(newPosts));
    } catch (e) {
      console.error("Failed to save posts to localStorage", e);
    }
  };

  const addPost = (postData) => {
    const newId = Date.now().toString();
    const slug = postData.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    const newPost = {
      id: newId,
      slug: slug || `post-${newId}`,
      title: postData.title,
      excerpt: postData.excerpt,
      category: postData.category || "Ngữ pháp (Grammar)",
      tags: postData.tags ? postData.tags.split(",").map(t => t.trim()).filter(Boolean) : ["Ngữ pháp"],
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      readTime: postData.readTime || "5 phút đọc",
      author: {
        name: postData.authorName || "Admin",
        role: postData.authorRole || "English Teacher",
        avatar: postData.authorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
      },
      featured: postData.featured || false,
      coverImage: postData.coverImage || "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80",
      content: postData.content
    };

    savePosts([newPost, ...posts]);
    return newPost;
  };

  const updatePost = (id, updatedData) => {
    const updatedPosts = posts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          ...updatedData,
          tags: typeof updatedData.tags === "string" 
            ? updatedData.tags.split(",").map(t => t.trim()).filter(Boolean)
            : (updatedData.tags || post.tags)
        };
      }
      return post;
    });
    savePosts(updatedPosts);
  };

  const deletePost = (id) => {
    const filtered = posts.filter(p => p.id !== id);
    savePosts(filtered);
  };

  return (
    <PostContext.Provider value={{ posts, categories: CATEGORIES, addPost, updatePost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostProvider");
  }
  return context;
}
