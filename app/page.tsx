import { VideoSection } from '@/components/layout/Video';
import { ImageSection } from '@/components/layout/Image';
import { AIAgentSection } from '@/components/layout/AIAgent';
import { AIChatSection } from '@/components/layout/ALChat';
import { AIMainSection } from '@/components/layout/AIMain';
import { MantualSection } from '@/components/layout/Mantual';
import { UserSection } from '@/components/layout/User';
import { WhySection } from '@/components/layout/Why';
import { ExperienceSection } from '@/components/layout/Experience';
import { FaqSection } from '@/components/layout/Fqa';

export default function HomePage() {
  return (
    <div className='relative min-h-screen overflow-hidden'>
      <AIMainSection />
      <AIAgentSection />
      <AIChatSection />
      <VideoSection />
      <ImageSection />
      <MantualSection />
      <WhySection />
      <UserSection />
      <FaqSection />
      <ExperienceSection />
    </div>
  );
}
