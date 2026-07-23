import React from 'react';
import { ServiceItem } from '../types';
import {
  Database,
  Code2,
  Smartphone,
  Palette,
  TrendingUp,
  Target,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface BentoGridProps {
  onSelectService: (service: ServiceItem) => void;
  onRequestProposal: (serviceTitle: string) => void;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'saas-crm',
    title: 'Custom SaaS & CRM',
    subtitle: 'Multi-tenant Platforms & Workflow Automation',
    description:
      'We architect scalable multi-tenant SaaS platforms, subscription billing engines, custom CRM dashboards, and automated lead management systems built to handle millions of transactions.',
    iconName: 'Database',
    features: [
      'Multi-tenant architecture & isolation',
      'Stripe & Recurly subscription pipelines',
      'Real-time analytics & reporting widgets',
      'Role-based access control (RBAC)',
    ],
    techStack: ['Next.js', 'PostgreSQL', 'Redis', 'Stripe API', 'Tailwind'],
    deliverables: ['Production SaaS App', 'Admin CRM Suite', 'API Docs', 'CI/CD Pipeline'],
    caseStudySnippet: {
      client: 'NexusPay',
      metric: 'Enterprise Grade',
      summary: 'Rebuilt payment SaaS architecture processing $40M/mo with zero downtime.',
    },
    gridSpan: 'col-span-1 md:col-span-2 lg:col-span-2',
  },
  {
    id: 'software-dev',
    title: 'Custom Software Development',
    subtitle: 'High-Performance APIs & Microservices',
    description:
      'Enterprise-grade web software, microservice backends, cloud infrastructure, and low-latency API integrations tailored to complex business logic.',
    iconName: 'Code2',
    features: [
      'Microservice & REST/GraphQL APIs',
      'Cloud Run / AWS Serverless deployment',
      'High-speed database indexing & caching',
      'Comprehensive unit & E2E test suites',
    ],
    techStack: ['Node.js', 'TypeScript', 'Docker', 'Postgres', 'GraphQL'],
    deliverables: ['Backend API', 'Cloud Infrastructure', 'Integration Suite'],
    caseStudySnippet: {
      client: 'Kinetix Ops',
      metric: 'High Performance',
      summary: 'Reduced API response times by 72% under heavy peak loads.',
    },
    gridSpan: 'col-span-1 md:col-span-1 lg:col-span-1',
  },
  {
    id: 'mobile-apps',
    title: 'Native Mobile Applications',
    subtitle: 'iOS & Android Engineering',
    description:
      'Fluid, 60fps native mobile applications built with modern frameworks, featuring offline state synchronization, biometrics, and push notifications.',
    iconName: 'Smartphone',
    features: [
      'Cross-platform iOS & Android apps',
      'Offline-first data synchronization',
      'Biometric authentication & Wallet',
      'Push notification automation',
    ],
    techStack: ['React Native', 'Swift', 'Kotlin', 'Firebase', 'SQLite'],
    deliverables: ['App Store Release', 'Play Store Release', 'Native SDKs'],
    caseStudySnippet: {
      client: 'Aura Fitness',
      metric: 'Native iOS & Android',
      summary: 'Scaled mobile app to 250k daily active users with sub-second sync.',
    },
    gridSpan: 'col-span-1 md:col-span-1 lg:col-span-1',
  },
  {
    id: 'ui-ux-design',
    title: 'Premium UI/UX Design',
    subtitle: 'Conversion-Focused Visual Systems',
    description:
      'World-class visual design systems, dark/light luxury interfaces, interactive Figma prototypes, and micro-interactions engineered to drive conversion.',
    iconName: 'Palette',
    features: [
      'Comprehensive Design Systems',
      'Interactive Figma prototypes',
      'Conversion Rate Optimization (CRO)',
      'WCAG AA Accessibility compliance',
    ],
    techStack: ['Figma', 'Design Tokens', 'Tailwind', 'Rive', 'Framer'],
    deliverables: ['Figma Component Library', 'UI Style Guide', 'Interactive Prototypes'],
    caseStudySnippet: {
      client: 'Vanguard Capital',
      metric: 'User-Centric',
      summary: 'Redesigned investment portal resulting in record user signups.',
    },
    gridSpan: 'col-span-1 md:col-span-1 lg:col-span-1',
  },
  {
    id: 'growth-seo',
    title: 'Growth Engineering (SEO)',
    subtitle: 'Programmatic SEO & Core Web Vitals',
    description:
      'Algorithmic SEO engines, programmatic landing page generation, technical schema markups, and core web vitals optimization to capture organic traffic.',
    iconName: 'TrendingUp',
    features: [
      'Programmatic page generation',
      'Sub-second Core Web Vitals scores',
      'Structured data & JSON-LD schema',
      'Automated sitemap & indexing tools',
    ],
    techStack: ['Next.js SSR', 'Schema.org', 'Google Search Console', 'Lighthouse'],
    deliverables: ['Programmatic SEO Engine', 'Audit Report', 'Schema Integration'],
    caseStudySnippet: {
      client: 'SaaSFlow',
      metric: 'Data-Driven',
      summary: 'Generated 1,200 landing pages capturing top non-brand keywords.',
    },
    gridSpan: 'col-span-1 md:col-span-1 lg:col-span-1',
  },
  {
    id: 'performance-marketing',
    title: 'Performance & Brand Marketing',
    subtitle: 'Meta & Google Ads Optimization',
    description:
      'Data-driven advertising campaigns, custom attribution tracking, A/B landing page testing, and algorithmic campaign optimization across Meta & Google.',
    iconName: 'Target',
    features: [
      'Multi-touch attribution tracking',
      'High-converting ad creatives & copy',
      'Real-time ROI dashboard',
      'Dynamic A/B split-testing',
    ],
    techStack: ['Meta Pixel', 'Google Ads API', 'GA4', 'Posthog', 'Mixpanel'],
    deliverables: ['Ad Campaign Setup', 'Attribution Dashboard', 'A/B Test Suite'],
    caseStudySnippet: {
      client: 'HyperLogistics',
      metric: 'ROI Focused',
      summary: 'Engineered omnichannel ad funnel scaling monthly ad spend efficiently.',
    },
    gridSpan: 'col-span-1 md:col-span-2 lg:col-span-2',
  },
];

export const BentoGrid: React.FC<BentoGridProps> = ({
  onSelectService,
  onRequestProposal,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Database':
        return <Database className="w-6 h-6 text-[#C9A96A]" />;
      case 'Code2':
        return <Code2 className="w-6 h-6 text-[#C9A96A]" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-[#C9A96A]" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-[#C9A96A]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-[#C9A96A]" />;
      case 'Target':
        return <Target className="w-6 h-6 text-[#C9A96A]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#C9A96A]" />;
    }
  };

  return (
    <section id="bento-grid-section" className="py-24 bg-[#0B0B0B] px-4 sm:px-6 lg:px-8 relative">
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#C9A96A]/3 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFFFFF] tracking-tight mb-4">
            Services Engineered For <br />
            <span className="text-[#C9A96A]">Scale & Dominance</span>
          </h2>
          <p className="text-base text-[#8A8A8A] leading-relaxed">
            From multi-tenant SaaS platforms to high-ROAS marketing engines, we deliver end-to-end
            digital engineering designed for maximum commercial impact.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              id={`bento-card-${service.id}`}
              className={`${service.gridSpan} rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#C9A96A]/60 hover:shadow-[0_10px_30px_rgba(201,169,106,0.1)] group relative overflow-hidden`}
            >
              {/* Corner Ambient Glow */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#C9A96A]/5 rounded-full blur-2xl group-hover:bg-[#C9A96A]/15 transition-all duration-500" />

              <div>
                {/* Header Icon + Subtitle */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] flex items-center justify-center group-hover:border-[#C9A96A]/50 transition-colors">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-[11px] font-mono text-[#8A8A8A] uppercase tracking-wider px-2.5 py-1 rounded bg-[#0B0B0B] border border-[#222222]">
                    {service.caseStudySnippet.metric}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl sm:text-2xl font-bold text-[#FFFFFF] mb-2 group-hover:text-[#E2C889] transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs font-mono text-[#C9A96A] mb-3">{service.subtitle}</p>
                <p className="text-sm text-[#8A8A8A] leading-relaxed mb-6">{service.description}</p>

                {/* Feature Bullet Highlights */}
                <ul className="space-y-2 mb-6">
                  {service.features.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-[#8A8A8A]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A96A] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 border-t border-[#2A2A2A] flex items-center justify-between">
                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                  {service.techStack.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono text-[#8A8A8A] bg-[#0B0B0B] px-2 py-0.5 rounded border border-[#222222]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Explore Details Trigger */}
                <button
                  onClick={() => onSelectService(service)}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#C9A96A] hover:text-[#FFFFFF] transition-colors cursor-pointer group/btn"
                >
                  <span>Details</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
