import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

type FadeInProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
};

function FadeIn({
  as = "div",
  children,
  className,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
}: FadeInProps) {
  const MotionTag = motion.create(as);
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </MotionTag>
  );
}

function Magnet({
  children,
  className,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
}: {
  children: ReactNode;
  className?: string;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const insideX = e.clientX >= rect.left - padding && e.clientX <= rect.right + padding;
      const insideY = e.clientY >= rect.top - padding && e.clientY <= rect.bottom + padding;
      const nextActive = insideX && insideY;

      setActive(nextActive);
      if (nextActive) {
        el.style.transform = `translate3d(${dx / strength}px, ${dy / strength}px, 0)`;
      } else {
        el.style.transform = "translate3d(0px, 0px, 0)";
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [padding, strength]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: "transform", transition: active ? activeTransition : inactiveTransition }}
    >
      {children}
    </div>
  );
}

function AnimatedText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });
  const [progress, setProgress] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => setProgress(latest));
  const chars = useMemo(() => text.split(""), [text]);

  return (
    <p ref={ref} className={className}>
      {chars.map((char, index) => {
        const start = index / chars.length;
        const end = (index + 1) / chars.length;
        const charProgress = Math.min(1, Math.max(0, (progress - start) / (end - start || 1)));
        const opacity = 0.2 + charProgress * 0.8;
        return (
          <span key={`${char}-${index}`} className="relative inline-block">
            <span className="invisible">{char === " " ? "\u00A0" : char}</span>
            <span className="absolute left-0 top-0" style={{ opacity }}>
              {char === " " ? "\u00A0" : char}
            </span>
          </span>
        );
      })}
    </p>
  );
}

function ContactButton() {
  return (
    <a
      href="mailto:abhishekgauswami19@gmail.com"
      className="rounded-full border-2 border-white px-8 py-3 text-xs font-medium uppercase tracking-widest text-white outline outline-2 outline-offset-[-3px] outline-white sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
      style={{
        background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
        boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
      }}
    >
      Contact Me
    </a>
  );
}

function LiveProjectButton() {
  return (
    <button className="inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-base">
      Live Project
      <ArrowUpRight size={18} />
    </button>
  );
}

const marqueeImages = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
];

const projects = [
  {
    number: "01",
    category: "Under Development",
    name: "Portfolio Case Study 01",
    images: [
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85",
    ],
  },
  {
    number: "02",
    category: "Under Development",
    name: "Portfolio Case Study 02",
    images: [
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85",
    ],
  },
  {
    number: "03",
    category: "Under Development",
    name: "Portfolio Case Study 03",
    images: [
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85",
    ],
  },
];

function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const row1 = useMemo(() => marqueeImages.slice(0, 11), []);
  const row2 = useMemo(() => marqueeImages.slice(11), []);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const top = sectionRef.current.offsetTop;
      const nextOffset = (window.scrollY - top + window.innerHeight) * 0.3;
      setOffset(nextOffset);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const renderRow = (items: string[]) => [...items, ...items, ...items];

  return (
    <section ref={sectionRef} className="bg-[#0C0C0C] px-5 pb-10 pt-24 sm:px-8 sm:pt-32 md:px-10 md:pt-40">
      <div className="flex flex-col gap-3 overflow-hidden">
        <div className="flex gap-3" style={{ transform: `translateX(${offset - 200}px)`, willChange: "transform" }}>
          {renderRow(row1).map((src, i) => (
            <img key={`r1-${i}`} src={src} loading="lazy" className="h-[270px] w-[420px] shrink-0 rounded-2xl object-cover" />
          ))}
        </div>
        <div className="flex gap-3" style={{ transform: `translateX(${-1 * (offset - 200)}px)`, willChange: "transform" }}>
          {renderRow(row2).map((src, i) => (
            <img key={`r2-${i}`} src={src} loading="lazy" className="h-[270px] w-[420px] shrink-0 rounded-2xl object-cover" />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ index, totalCards, project }: { index: number; totalCards: number; project: (typeof projects)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={ref} className="h-[85vh]">
      <motion.article
        className="sticky top-24 rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:top-24 sm:rounded-[50px] sm:p-6 md:top-32 md:rounded-[60px] md:p-8"
        style={{ scale, top: `${index * 28}px` }}
      >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 sm:mb-8">
          <div className="flex items-end gap-4">
            <span className="hero-heading text-[clamp(3rem,10vw,140px)] font-black leading-none">{project.number}</span>
            <div className="pb-2">
              <p className="text-sm uppercase tracking-widest text-[#D7E2EA]/70">{project.category}</p>
              <h3 className="text-2xl font-medium uppercase tracking-wide text-[#D7E2EA] sm:text-3xl">{project.name}</h3>
            </div>
          </div>
          <LiveProjectButton />
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2 flex flex-col gap-3">
            <img src={project.images[0]} className="h-[clamp(130px,16vw,230px)] w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]" />
            <img src={project.images[1]} className="h-[clamp(160px,22vw,340px)] w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]" />
          </div>
          <div className="col-span-3">
            <img src={project.images[2]} className="h-full min-h-[320px] w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]" />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function App() {
  return (
    <main className="overflow-x-clip bg-[#0C0C0C] text-[#D7E2EA]">
      <section className="relative flex h-screen flex-col overflow-x-clip px-5 sm:px-8 md:px-10">
        <FadeIn as="nav" delay={0} y={-20} className="z-20 flex items-center justify-between px-1 pt-6 text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-all md:pt-8 md:text-lg lg:text-[1.4rem]">
          {["About", "Price", "Projects", "Contact"].map((item) => (
            <a key={item} href="#" className="transition-opacity duration-200 hover:opacity-70">
              {item}
            </a>
          ))}
        </FadeIn>

        <div className="overflow-hidden">
          <FadeIn as="h1" delay={0.15} y={40} className="hero-heading mt-6 w-full whitespace-nowrap text-center text-[14vw] font-black uppercase leading-none tracking-tight sm:mt-4 sm:text-[15vw] md:-mt-5 md:text-[16vw] lg:text-[17.5vw]">
            Hi, i&apos;m abhishek
          </FadeIn>
        </div>

        <FadeIn delay={0.6} y={30} className="absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[520px]">
          <Magnet>
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
              alt="Jack portrait"
              className="w-full object-contain"
            />
          </Magnet>
        </FadeIn>

        <div className="relative z-20 mt-auto flex items-end justify-between pb-7 sm:pb-8 md:pb-10">
          <FadeIn delay={0.35} y={20}>
            <p className="max-w-[160px] text-[clamp(0.75rem,1.4vw,1.5rem)] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]">
              a full stack developer building clean, scalable, and high-performing digital products
            </p>
          </FadeIn>
          <FadeIn delay={0.5} y={20}>
            <ContactButton />
          </FadeIn>
        </div>
      </section>

      <MarqueeSection />

      <section className="relative flex min-h-screen flex-col items-center justify-center gap-10 px-5 py-20 text-center sm:gap-14 sm:px-8 md:gap-16 md:px-10">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute left-[1%] top-[4%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]">
          <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" />
        </FadeIn>
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]">
          <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" />
        </FadeIn>
        <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute right-[1%] top-[4%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]">
          <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png" />
        </FadeIn>
        <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]">
          <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" />
        </FadeIn>

        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight">About me</h2>
        </FadeIn>
        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <AnimatedText
            text="I am Abhishek Gauswami, a full stack developer focused on building robust web applications from backend architecture to polished frontend experiences. I enjoy solving real-world problems with clean code, thoughtful UI, and reliable performance. I love turning ideas into products that users genuinely enjoy."
            className="max-w-[560px] text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-[#D7E2EA]"
          />
          <ContactButton />
        </div>
      </section>

      <section className="rounded-t-[40px] bg-white px-5 py-20 text-[#0C0C0C] sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
        <h2 className="mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28">Services</h2>
        <div className="mx-auto max-w-5xl">
          {[
            ["01", "Frontend Development", "Building responsive and accessible interfaces with React, TypeScript, and modern CSS workflows focused on performance and usability."],
            ["02", "Backend Development", "Designing secure and scalable APIs, authentication systems, and business logic using reliable backend frameworks and databases."],
            ["03", "Full Stack Architecture", "Connecting frontend and backend into maintainable systems with clean structure, reusable components, and clear deployment strategies."],
            ["04", "Database Design", "Creating optimized database schemas, queries, and data flows that support product growth and smooth user experiences."],
            ["05", "Web App Optimization", "Improving speed, code quality, and production stability through profiling, refactoring, and deployment best practices."],
          ].map(([num, title, desc], i) => (
            <FadeIn key={num} delay={i * 0.1} y={25} className="flex border-b border-[rgba(12,12,12,0.15)] py-8 sm:py-10 md:py-12">
              <div className="w-1/3">
                <p className="text-[clamp(3rem,10vw,140px)] font-black leading-none">{num}</p>
              </div>
              <div className="w-2/3">
                <h3 className="text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase">{title}</h3>
                <p className="max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] font-light leading-relaxed opacity-60">{desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="-mt-10 z-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pb-16 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10">
        <h2 className="hero-heading mb-10 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-14 md:mb-16">Project</h2>
        <p className="mb-12 text-center text-sm uppercase tracking-[0.3em] text-[#D7E2EA]/70 sm:text-base">Under Development</p>
        <div className="space-y-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.number} index={index} totalCards={projects.length} project={project} />
          ))}
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a href="mailto:abhishekgauswami19@gmail.com" className="rounded-full border border-[#D7E2EA]/40 px-5 py-2 text-xs uppercase tracking-widest text-[#D7E2EA] transition hover:bg-[#D7E2EA]/10 sm:text-sm">
            Email
          </a>
          <a href="https://wa.me/919016820018" target="_blank" rel="noreferrer" className="rounded-full border border-[#D7E2EA]/40 px-5 py-2 text-xs uppercase tracking-widest text-[#D7E2EA] transition hover:bg-[#D7E2EA]/10 sm:text-sm">
            WhatsApp
          </a>
          <a href="https://instagram.com/abhishek_____2812" target="_blank" rel="noreferrer" className="rounded-full border border-[#D7E2EA]/40 px-5 py-2 text-xs uppercase tracking-widest text-[#D7E2EA] transition hover:bg-[#D7E2EA]/10 sm:text-sm">
            Instagram
          </a>
          <a href="https://discord.com/users/agaming0529" target="_blank" rel="noreferrer" className="rounded-full border border-[#D7E2EA]/40 px-5 py-2 text-xs uppercase tracking-widest text-[#D7E2EA] transition hover:bg-[#D7E2EA]/10 sm:text-sm">
            DC: agaming0529
          </a>
        </div>
      </section>
    </main>
  );
}
