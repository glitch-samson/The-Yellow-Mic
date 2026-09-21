import type { Metadata } from "next";

import { Navbar } from "@/components/sections/Navbar";
import { BlogPageHero } from "@/components/sections/blog/BlogPageHero";
import { BlogGrid } from "@/components/sections/blog/BlogGrid";
import { Newsletter } from "@/components/sections/Newsletter";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "TYMP Podcasts",
  description:
    "Expert insights, industry trends, and in-depth guides on podcasting - from playback tips to building better listening habits.",
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main>
        <BlogPageHero />
        <BlogGrid />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
