import React from "react";
import { loadBlogPost } from "@/helpers/file-helpers";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import styles from "./postSlug.module.css";
import { BLOG_TITLE } from "@/constants";
import BlogHero from "@/components/BlogHero/BlogHero";
import COMPONENT_MAP from "@/helpers/mdx-components";

export async function generateMetadata({ params }) {
  const { postSlug } = await params;
  const blogPostData = await loadBlogPost(postSlug);
  if (!blogPostData) {
    return null;
  }

  const { frontmatter } = blogPostData;
  return {
    title: `${frontmatter.title} | ${BLOG_TITLE}`,
    description: frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  const { postSlug } = await params;

  const blogPostData = await loadBlogPost(postSlug);

  // If there is no blog post with the slug taken from the route
  // params, render a 404 page instead.
  if (!blogPostData) {
    notFound();
  }

  const { frontmatter, content } = blogPostData;

  return (
    <>
      <article className={styles.wrapper}>
        <BlogHero
          title={frontmatter.title}
          publishedOn={frontmatter.publishedOn}
        />
        <div className={styles.page}>
          <MDXRemote source={content} components={COMPONENT_MAP} />
        </div>
      </article>
    </>
  );
}

export default BlogPost;
