import {
  AIMainSection,
  AIAgentSection,
  AIChatSection,
  VideoSection,
  ImageSection,
  UserSection,
  WhySection,
  ManualSection,
  FaqSection,
  ExperienceSection,
} from '@/components/layout/sections';

export const HOMEPAGE_SECTIONS = [
  { id: 'hero', Component: AIMainSection },
  { id: 'agent', Component: AIAgentSection },
  { id: 'chat', Component: AIChatSection },
  { id: 'video', Component: VideoSection },
  { id: 'image', Component: ImageSection },
  { id: 'users', Component: UserSection },
  { id: 'why', Component: WhySection },
  { id: 'manual', Component: ManualSection },
  { id: 'faq', Component: FaqSection },
  { id: 'experience', Component: ExperienceSection },
] as const;
