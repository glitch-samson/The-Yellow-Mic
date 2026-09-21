import Image from "next/image";

import { MotionSection } from "../ui/MotionSection";
import { listenOn, newsletter } from "@/lib/content";
import { images } from "@/lib/assets";

const TITLE_FONT = "var(--font-urbanist), Urbanist, sans-serif";
const BODY_FONT = "var(--font-public-sans), Public Sans, sans-serif";

function NewsletterForm() {
  return (
    <form className="flex w-full max-w-[459px] flex-col gap-3 sm:flex-row" action="#">
      <label className="sr-only" htmlFor="newsletter-email">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        placeholder="Enter your email"
        className="h-[75px] min-h-[51px] w-full min-w-0 flex-1 rounded-full border border-[#EAB819] bg-transparent px-6 text-center outline-none transition placeholder:text-[#4E5255] focus:border-[#D4A20D] sm:h-[59px] sm:min-h-0"
        style={{
          fontFamily: BODY_FONT,
          fontWeight: 400,
          fontSize: 18,
          lineHeight: "normal",
          letterSpacing: "-0.72px",
          color: "#111418",
        }}
      />
      <button
        type="submit"
        className="h-14 rounded-full bg-[#EAB819] px-6 text-white transition-all duration-300 hover:bg-[#D4A20D] hover:scale-[1.02] active:scale-[0.98] sm:w-[118px]"
        style={{
          fontFamily: TITLE_FONT,
          fontWeight: 700,
          fontSize: 16,
          lineHeight: "16px",
          letterSpacing: "-0.32px",
        }}
      >
        {newsletter.cta.label}
      </button>
    </form>
  );
}

function PlatformIcons() {
  return (
    <div className="flex items-center gap-3">
      {listenOn.map((platform) => (
        <span key={platform.name} className="relative size-6 shrink-0" title={platform.name}>
          <Image src={platform.icon} alt={platform.name} fill className="object-contain" sizes="24px" />
        </span>
      ))}
    </div>
  );
}

function ListenerCard() {
  return (
    <div className="absolute bottom-0 left-1/2 flex h-[118px] w-[min(376px,calc(100vw-48px))] -translate-x-1/2 items-center rounded-lg bg-white px-6 shadow-[0px_14px_250px_rgba(0,0,0,0.08)] lg:left-4 lg:translate-x-0">
      <div className="w-[101px] shrink-0">
        <p
          style={{
            fontFamily: TITLE_FONT,
            fontWeight: 600,
            fontSize: 32,
            lineHeight: "normal",
            letterSpacing: "0px",
            color: "#111418",
          }}
        >
          {newsletter.subscriberCount}
        </p>
        <p
          className="mt-2"
          style={{
            fontFamily: BODY_FONT,
            fontWeight: 400,
            fontSize: 16,
            lineHeight: "24px",
            letterSpacing: "-0.64px",
            color: "#4E5255",
          }}
        >
          Total Listeners
        </p>
      </div>

      <span className="mx-[38px] h-[51px] w-px bg-[#E7E7E8]" aria-hidden />

      <div className="min-w-0">
        <p
          style={{
            fontFamily: BODY_FONT,
            fontWeight: 400,
            fontSize: 16,
            lineHeight: "24px",
            letterSpacing: "-0.64px",
            color: "#4E5255",
          }}
        >
          Available on
        </p>
        <div className="mt-2">
          <PlatformIcons />
        </div>
      </div>
    </div>
  );
}

function NewsletterVisual() {
  return (
    <div className="relative mx-auto h-[435px] w-full max-w-[408px] lg:mx-0">
      <div className="relative mx-auto size-[min(408px,calc(100vw-48px))] overflow-hidden rounded-full">
        <Image
          src={images.cta}
          alt="Podcast microphone with headphones"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 408px"
        />
      </div>
      <ListenerCard />
    </div>
  );
}

export function Newsletter() {
  return (
    <section id="newsletter" className="relative overflow-hidden bg-white py-20 lg:h-[641px] lg:py-0">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[-483px] z-0 h-[1607px] scale-110 blur-2xl"
        style={{
          backgroundImage: `url(${images.upgradeBgPattern})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      />
      <div className="relative z-10 mx-auto grid w-full max-w-[1240px] items-center gap-12 px-6 sm:px-8 lg:h-full lg:grid-cols-[594px_408px] lg:justify-between lg:px-5">
        <MotionSection className="mx-auto w-full max-w-[594px] text-center lg:mx-0 lg:text-left">
          <h2
            className="whitespace-pre-line"
            style={{
              fontFamily: TITLE_FONT,
              fontWeight: 700,
              fontSize: "clamp(40px, 4.7vw, 48px)",
              lineHeight: "1.2",
              letterSpacing: "-0.02em",
              color: "#111418",
            }}
          >
            {newsletter.title}
          </h2>
          <p
            className="mt-6"
            style={{
              fontFamily: BODY_FONT,
              fontWeight: 400,
              fontSize: 16,
              lineHeight: "24px",
              letterSpacing: "-0.64px",
              color: "#4E5255",
            }}
          >
            {newsletter.body}
          </p>
          <div className="mt-8 flex justify-center lg:justify-start">
            <NewsletterForm />
          </div>
        </MotionSection>

        <MotionSection>
          <NewsletterVisual />
        </MotionSection>
      </div>
    </section>
  );
}
