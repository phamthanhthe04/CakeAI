import {
  ArrowRightIcon,
  Badge,
  BotIcon,
  FeatureCard,
  FeatureItem,
  OptimizedImage,
  PageContainer,
  SparklesIcon,
  ZapIcon,
  BrainIcon,
  MessageSquareIcon,
  WorkflowIcon,
  UserIcon,
  HeadphonesIcon,
  Layers3Icon,
  GlobeIcon,
  ImageIcon,
  FileTextIcon,
  Link2Icon,
  SettingsIcon,
  IconWrapper,
} from '@/components';
import { BaseButton } from '@/components/ui/button';
import { VideoSection } from '@/components/layout/Video';
import { ImageSection } from '@/components/layout/Image';
import { MantualSection } from '@/components/layout/Mantual';
import { UserSection } from '@/components/layout/User';
import { WhySection } from '@/components/layout/Why';
import { ExperienceSection } from '@/components/layout/Experience';
import { FaqSection } from '@/components/layout/Fqa';

export default function HomePage() {
  const sectionVisibleStyle = { opacity: 1, transform: 'none' as const };

  return (
    <div className='relative min-h-screen overflow-hidden'>
      <PageContainer>
        <section
          className='mb-16 mt-12 flex flex-col items-center gap-4 opacity-0 transition-opacity duration-700 ease-out md:gap-6 '
          style={sectionVisibleStyle}
        >
          <Badge
            tone='gray'
            icon={<SparklesIcon className='text-accent' size={16} />}
            text='Một tài khoản - nhiều sức mạnh AI'
          />
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-foreground1 leading-tight mb-6 text-center'>
            Nền tảng AI
            <span
              style={{
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              tất cả trong một
            </span>
            <br />
            cho cá nhân & tổ chức
          </h1>
          <div style={sectionVisibleStyle}>
            <p className='text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-center'>
              Từ trò chuyện AI, tạo hình ảnh, video đến các AI Agent làm việc
              theo kịch bản. CakeAI giúp bạn tiết kiệm thời gian, nâng cao hiệu
              suất và ra quyết định tốt hơn.
            </p>
          </div>
          <div>
            <BaseButton
              text='Trải nghiệm miễn phí'
              size='xl'
              textClassName='text-white text-xl'
              style={{ background: 'var(--gradient-primary)', border: 'none' }}
              icon={<ArrowRightIcon className='text-white' size={16} />}
            />
            <BaseButton
              text='Xem demo'
              variant='outline'
              size='xl'
              className='ml-4 agent_button'
              textClassName='text-foreground1 text-xl'
            />
          </div>
          <div
            className='mt-12 flex items-center gap-6 opacity-0 transition-opacity duration-700 ease-out'
            style={sectionVisibleStyle}
          >
            <Badge
              tone='soft'
              text='AI Agent thông minh'
              textClassName='text-foreground1'
              icon={<BotIcon className='text-accent' size={20} />}
            />
            <Badge
              tone='soft'
              text='Tạo ảnh & video AI'
              textClassName='text-foreground1'
              icon={<SparklesIcon className='text-accent' size={20} />}
            />
            <Badge
              tone='soft'
              text='Phản hồi tức thì'
              textClassName='text-foreground1'
              icon={<ZapIcon className='text-accent' size={20} />}
            />
          </div>
        </section>
        <section
          className='mb-16 mt-12 flex flex-col items-center gap-4 opacity-0 transition-opacity duration-700 ease-out md:gap-6 '
          style={sectionVisibleStyle}
        >
          <div className='mt-16 relative'>
            <div
              className='rounded-3xl agent_shadowCard__OMD5Z overflow-hidden mx-auto max-w-5xl'
              style={{
                background: 'var(--gradient-card)',
                border: '1px solid hsl(var(--border) / 0.5)',
              }}
            >
              <div
                className='px-4 py-3 flex items-center gap-2'
                style={{
                  background: 'hsl(var(--secondary) / 0.05)',
                  borderBottom: '1px solid hsl(var(--border) / 0.5)',
                }}
              >
                <div className='w-3 h-3 rounded-full bg-destructive/60'></div>
                <div className='w-3 h-3 rounded-full bg-accent/60'></div>
                <div className='w-3 h-3 rounded-full bg-green-500/60'></div>
              </div>
              <div className='p-6 md:p-10'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  <div className='rounded-2xl border border-[hsl(var(--border)/0.5)] bg-white/45 p-5'>
                    <FeatureItem
                      title='AI Chat'
                      icon={<BotIcon className='text-accent' size={18} />}
                    />
                    <div className='space-y-3'>
                      <p className='mt-6 text-[14px] leading-11 text-muted-foreground'>
                        Xin chào! Tôi có thể giúp gì cho bạn?
                      </p>
                      <div className='bg-primary/10 rounded-lg p-3 text-sm text-foreground1 ml-4'>
                        Phân tích báo cáo doanh thu Q4
                      </div>
                    </div>
                  </div>

                  <div className='rounded-2xl border border-[hsl(var(--border)/0.5)] bg-white/45 p-5'>
                    <FeatureItem
                      title='Image AI'
                      icon={<SparklesIcon className='text-accent' size={18} />}
                    />
                    <div className='mt-6 flex h-52.5 items-center justify-center rounded-2xl bg-[#b9d8d8]'>
                      <div className='h-16 w-16 rounded-full bg-accent shadow-[0_0_24px_hsl(var(--accent)/0.45)]'></div>
                    </div>
                  </div>

                  <div className='rounded-2xl border border-[hsl(var(--border)/0.5)] bg-white/45 p-5'>
                    <FeatureItem
                      title='AI Agent'
                      icon={<ZapIcon className='text-accent' size={18} />}
                    />
                    <div className='space-y-2'>
                      <div className='flex items-center gap-2'>
                        <div className='w-2 h-2 rounded-full bg-primary'></div>
                        <span className='text-sm text-muted-foreground'>
                          Marketing
                        </span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <div className='w-2 h-2 rounded-full bg-primary'></div>
                        <span className='text-sm text-muted-foreground'>
                          Bán hàng
                        </span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <div className='w-2 h-2 rounded-full bg-primary'></div>
                        <span className='text-sm text-muted-foreground'>
                          CSKH
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageContainer>
      <PageContainer>
        <section
          className='mb-16 mt-12 flex flex-col items-center gap-4 opacity-0 transition-opacity duration-700 ease-out md:gap-6 '
          style={sectionVisibleStyle}
        >
          <Badge tone='gray' text='AI Agent' />
          <h1 className='text-3xl md:text-4xl font-bold text-foreground1 mb-4 text-center'>
            Trợ lý thông minh cho
            <span> </span>
            <span
              style={{
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              công việc thực tế
            </span>
          </h1>
          <div style={sectionVisibleStyle}>
            <p className='text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-center'>
              AI Agent CakeAI giúp cá nhân và tổ chức tự động hóa công việc,
              tăng hiệu suất và ra quyết định hiệu quả hơn mỗi ngày.
            </p>
          </div>
          <div className='grid lg:grid-cols-2 gap-12 mb-12'>
            <div style={sectionVisibleStyle}>
              <div className='order-2 lg:order-1 content-center items-center'>
                <OptimizedImage imageKey='agent' />
              </div>
            </div>
            <div className='space-y-4 order-1 lg:order-2'>
              <FeatureCard
                icon={<BrainIcon className='text-accent' size={18} />}
                title='Hiểu ngữ cảnh sử dụng'
                description='AI Agent hiểu bối cảnh công việc và đưa ra phản hồi phù hợp với từng tình huống cụ thể.'
              ></FeatureCard>
              <FeatureCard
                icon={<MessageSquareIcon className='text-accent' size={18} />}
                title='Ghi nhớ thông tin làm việc'
                description='Lưu trữ và học hỏi từ các cuộc trò chuyện trước để phục vụ bạn tốt hơn.'
              ></FeatureCard>
              <FeatureCard
                icon={<WorkflowIcon className='text-accent' size={18} />}
                title='Thực hiện theo quy trình'
                description='Không chỉ trả lời câu hỏi mà còn thực hiện công việc theo quy trình được định sẵn.'
              ></FeatureCard>
            </div>
          </div>
          <div style={sectionVisibleStyle} className='w-full'>
            <div className='bg-gradient-card rounded-2xl border-0 border-border/50 p-8 shadow-card '>
              <h3 className='text-lg font-semibold text-foreground1 mb-6 text-center'>
                Phù hợp cho nhiều lĩnh vực
              </h3>
              <div className='flex flex-wrap items-center justify-center gap-4'>
                <Badge
                  tone='soft'
                  text='Marketing'
                  textClassName='text-foreground1'
                  icon={<UserIcon className='text-accent' size={16} />}
                />
                <Badge
                  tone='soft'
                  text='Bán hàng'
                  textClassName='text-foreground1'
                  icon={<MessageSquareIcon className='text-accent' size={16} />}
                />
                <Badge
                  tone='soft'
                  text='Hành chính - Nhân sự'
                  textClassName='text-foreground1'
                  icon={<SettingsIcon className='text-accent' size={16} />}
                />
                <Badge
                  tone='soft'
                  text='Chăm sóc khách hàng'
                  textClassName='text-foreground1'
                  icon={<HeadphonesIcon className='text-accent' size={16} />}
                />
              </div>
            </div>
          </div>
        </section>
      </PageContainer>
      <PageContainer>
        <section
          className='mb-16 mt-12 flex flex-col items-center gap-4 opacity-0 transition-opacity duration-700 ease-out md:gap-6 '
          style={sectionVisibleStyle}
        >
          <Badge tone='gray' text='AI Chat' />
          <h1 className='text-3xl md:text-4xl font-bold text-foreground1 mb-4 text-center'>
            Nền tảng trò chuyện AI
            <span> </span>
            <span
              style={{
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              không giới hạn
            </span>
          </h1>
          <div style={sectionVisibleStyle}>
            <p className='text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-center'>
              CakeAI không chỉ là chatbot thông thường, mà là nền tảng trò
              chuyện AI thông minh phục vụ công việc, học tập và quản lý trong
              thực tế.
            </p>
          </div>
          <div className='grid lg:grid-cols-2 gap-12 items-center mb-12'>
            <div className='space-y-6'>
              <FeatureCard
                icon={<BrainIcon className='text-accent' size={18} />}
                title='Tích hợp nhiều mô hình AI hàng đầu'
                description='Sử dụng linh hoạt nhiều mô hình AI tiên tiến trong cùng một nền tảng, được cập nhật liên tục.'
                badges={[
                  {
                    text: 'Không cần dùng nhiều công cụ rời rạc',
                    icon: <SparklesIcon className='text-accent' size={16} />,
                  },
                  {
                    text: 'Không cần kiến thức kỹ thuật',
                    icon: <SparklesIcon className='text-accent' size={16} />,
                  },
                ]}
              ></FeatureCard>
              <FeatureCard
                icon={<MessageSquareIcon className='text-accent' size={18} />}
                title='Ghi nhớ thông tin làm việc'
                description='Lưu trữ và học hỏi từ các cuộc trò chuyện trước để phục vụ bạn tốt hơn.'
                badges={[
                  {
                    text: 'Trả lời chính xác, có cập nhật',
                    icon: <SparklesIcon className='text-accent' size={16} />,
                  },
                  {
                    text: 'Phục vụ nghiên cứu, báo cáo',
                    icon: <SparklesIcon className='text-accent' size={16} />,
                  },
                ]}
              ></FeatureCard>
              <FeatureCard
                icon={<WorkflowIcon className='text-accent' size={18} />}
                title='Thực hiện theo quy trình'
                description='Không chỉ trả lời câu hỏi mà còn thực hiện công việc theo quy trình được định sẵn.'
                badges={[
                  {
                    text: 'Tự động hiểu nội dung',
                    icon: <SparklesIcon className='text-accent' size={16} />,
                  },
                  {
                    text: 'Phản hồi thông minh',
                    icon: <SparklesIcon className='text-accent' size={16} />,
                  },
                ]}
              ></FeatureCard>
            </div>
            <div style={sectionVisibleStyle}>
              <div className='order-2 lg:order-2 flex items-center'>
                <OptimizedImage imageKey='chat' />
              </div>
            </div>
          </div>
          <div style={sectionVisibleStyle} className='w-full'>
            <div className='bg-secondary text-white rounded-2xl p-8 md:p-12'>
              <div className='text-center mb-8'>
                <h3 className='text-2xl font-bold mb-2'>
                  Hỗ trợ đa dạng đầu vào
                </h3>
                <p className='text-[#ffffffb3]'>
                  Tải lên và phân tích nhiều loại dữ liệu
                </p>
              </div>
              <div className='flex flex-wrap items-center justify-center gap-6'>
                <Badge
                  text='Hình ảnh'
                  textClassName='text-white'
                  className='flex flex-col bg-white/10 rounded-lg px-4 py-3'
                  icon={
                    <IconWrapper size='lg' variant='gradient'>
                      <ImageIcon className='text-white' size={24} />
                    </IconWrapper>
                  }
                />
                <Badge
                  text='PDF / Word / TXT'
                  textClassName='text-white'
                  className='flex flex-col bg-white/10 rounded-lg px-4 py-3'
                  icon={
                    <IconWrapper size='lg' variant='gradient'>
                      <FileTextIcon className='text-white' size={24} />
                    </IconWrapper>
                  }
                />
                <Badge
                  text='Link website'
                  textClassName='text-white'
                  className='flex flex-col bg-white/10 rounded-lg px-4 py-3'
                  icon={
                    <IconWrapper size='lg' variant='gradient'>
                      <Link2Icon className='text-white' size={24} />
                    </IconWrapper>
                  }
                />
              </div>
            </div>
          </div>
        </section>
      </PageContainer>

      <VideoSection />
      <ImageSection />
      <MantualSection />
      <UserSection />
      <WhySection />
      <FaqSection />
      <ExperienceSection />
    </div>
  );
}
