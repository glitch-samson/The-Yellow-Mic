import Image from "next/image";
import Link from "next/link";

import { MotionSection } from "../../ui/MotionSection";
import { StudioBanner } from "./StudioBanner";
import { blogPageHeader, posts } from "@/lib/content";
import { images } from "@/lib/assets";

const TITLE_FONT = "var(--font-urbanist), Urbanist, sans-serif";
const BODY_FONT = "var(--font-public-sans), Public Sans, sans-serif";

type Post = (typeof posts)[number];

function PageHeading() {
  const [line1, line2] = blogPageHeader.title.split("\n");

  return (
    <div className="mx-auto w-full max-w-[680px] text-center">
      <h1
        style={{
          fontFamily: TITLE_FONT,
          fontWeight: 700,
          fontSize: "clamp(34px, 6vw, 48px)",
          lineHeight: "1.2",
          letterSpacing: "-0.96px",
          color: "#111418",
        }}
      >
        {line1}
        <br className="hidden sm:inline" />{" "}
        {line2.split(blogPageHeader.highlight).map((part, idx, arr) => (
          <span key={idx}>
            {part}
            {idx < arr.length - 1 && (
              <span className="relative inline-block">
                {blogPageHeader.highlight}
                <span
                  className="pointer-events-none absolute left-0 top-[88%] h-3 w-full min-w-[150px]"
                  aria-hidden
                >
                  <Image
                    src={images.blogUnderline}
                    alt=""
                    width={196}
                    height={12}
                    className="h-full w-full object-contain"
                  />
                </span>
              </span>
            )}
          </span>
        ))}
      </h1>
      <p
        className="mx-auto mt-4 max-w-[560px]"
        style={{
          fontFamily: BODY_FONT,
          fontWeight: 400,
          fontSize: 16,
          lineHeight: "24px",
          letterSpacing: "-0.64px",
          color: "#4E5255",
        }}
      >
        {blogPageHeader.body}
      </p>
    </div>
  );
}

function PostMeta({ post, small = false }: { post: Post; small?: boolean }) {
  return (
    <div
      className="flex items-center"
      style={{
        gap: small ? 22 : 28,
        fontFamily: BODY_FONT,
        fontWeight: 400,
        fontSize: small ? 14 : 16,
        lineHeight: small ? "21px" : "24px",
        letterSpacing: small ? "-0.28px" : "-0.64px",
        color: "#F7F7F7",
      }}
    >
      <span>{post.date}</span>
      <span>{post.readTime}</span>
    </div>
  );
}

function FeaturedPostCard({ post, feature = false }: { post: Post; feature?: boolean }) {
  const useStudioBanner = post.slug === "breaking-down-the-headlines";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative block w-full overflow-hidden rounded-2xl bg-[#111418]"
      style={{ aspectRatio: feature ? "792 / 624" : "384 / 302.4" }}
    >
      {useStudioBanner ? (
        <StudioBanner className="absolute inset-0 transition duration-700 group-hover:scale-[1.03]" />
      ) : (
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes={feature ? "(max-width: 1024px) 100vw, 792px" : "(max-width: 1024px) 50vw, 384px"}
          className="object-cover transition duration-700 group-hover:scale-[1.03]"
        />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,20,24,0)_0%,rgba(17,20,24,0.16)_38%,rgba(17,20,24,0.74)_74%,rgba(0,0,0,0.96)_100%)]" />
      <div className={feature ? "absolute left-[4.04%] top-[74.36%]" : "absolute left-[6.51%] top-[64.8%]"}>
        <PostMeta post={post} small={!feature} />
      </div>
      <h3
        className={feature ? "absolute left-[4.04%] top-[79.49%] w-[82.83%]" : "absolute left-[6.51%] top-[74.07%] w-[86.9%]"}
        style={{
          fontFamily: TITLE_FONT,
          fontWeight: 600,
          fontSize: feature ? "clamp(20px, 2.78vw, 40px)" : "clamp(16px, 1.67vw, 24px)",
          lineHeight: "1.2",
          letterSpacing: "-0.03em",
          color: "#FFFFFF",
        }}
      >
        {post.title}
      </h3>
    </Link>
  );
}

export function BlogPageHero() {
  const [featuredPost, topPost, bottomPost] = posts;

  return (
    <section className="relative overflow-hidden bg-podhub-bg pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pt-48">
      <MotionSection className="mx-auto px-6 sm:px-16 lg:px-0">
        <PageHeading />
      </MotionSection>

      <MotionSection className="mx-auto mt-12 hidden w-full max-w-[1200px] grid-cols-[minmax(0,792fr)_384fr] gap-6 px-6 sm:grid sm:px-16 lg:px-0">
        <FeaturedPostCard post={featuredPost} feature />
        <div className="grid content-between gap-6">
          <FeaturedPostCard post={topPost} />
          <FeaturedPostCard post={bottomPost} />
        </div>
      </MotionSection>

      <MotionSection className="mx-auto mt-12 grid w-full gap-6 px-6 sm:hidden">
        <FeaturedPostCard post={featuredPost} feature />
        <FeaturedPostCard post={topPost} />
        <FeaturedPostCard post={bottomPost} />
      </MotionSection>
    </section>
  );
}
