import React from 'react';

const TECH_STACK = [
  { name: 'Next.js', category: 'Framework' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Supabase', category: 'BaaS' },
  { name: 'Postgres', category: 'Database' },
  { name: 'React 19', category: 'Frontend' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Gemini AI', category: 'Intelligence' },
  { name: 'Node.js', category: 'Runtime' },
  { name: 'GraphQL', category: 'API' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Redis', category: 'Caching' },
  { name: 'AWS Cloud', category: 'Infrastructure' },
  { name: 'Python', category: 'AI/ML' },
];

export const TechMarquee: React.FC = () => {
  return (
    <section
      id="tech-marquee-section"
      className="py-12 bg-[#0B0B0B] border-y border-[#1A1A1A] overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
        <p className="text-xs font-mono uppercase tracking-widest text-[#8A8A8A]">
          Engineered With Industry-Standard Modern Tech Stacks
        </p>
      </div>

      {/* Marquee Wrapper with Gradient Fades */}
      <div className="relative w-full overflow-hidden py-2">
        {/* Left/Right Gradient Mask */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0B0B0B] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0B0B0B] to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused]">
          {[...TECH_STACK, ...TECH_STACK, ...TECH_STACK].map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#C9A96A]/50 transition-colors cursor-pointer group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#8A8A8A] group-hover:bg-[#C9A96A] transition-colors" />
              <span className="font-semibold text-sm text-[#8A8A8A] group-hover:text-[#FFFFFF] transition-colors font-sans">
                {tech.name}
              </span>
              <span className="text-[10px] font-mono text-[#555555] group-hover:text-[#C9A96A]/80 transition-colors">
                {tech.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
