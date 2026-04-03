/**
 * FAQ Component
 * Frequently asked questions section with expandable items
 */

'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqItems = [
  {
    question: 'Tôi có cần kiến thức kỹ thuật để sử dụng CakeAI không?',
    answer:
      'Hoàn toàn không! CakeAI được thiết kế để mọi người đều có thể sử dụng dễ dàng. Giao diện trực quan, hướng dẫn rõ ràng và các AI Agent được cấu hình sẵn giúp bạn bắt đầu ngay lập tức mà không cần bất kỳ kiến thức lập trình hay kỹ thuật nào.',
  },
  {
    question: 'CakeAI hỗ trợ những mô hình AI nào?',
    answer:
      'CakeAI tích hợp nhiều mô hình AI hàng đầu thế giới, bao gồm các mô hình xử lý ngôn ngữ, tạo hình ảnh và video tiên tiến nhất. Chúng tôi liên tục cập nhật để đảm bảo bạn luôn được sử dụng công nghệ mới nhất.',
  },
  {
    question: 'Dữ liệu của tôi có được bảo mật không?',
    answer:
      'Bảo mật dữ liệu là ưu tiên hàng đầu của CakeAI. Tất cả dữ liệu được mã hóa end-to-end, lưu trữ trên hệ thống máy chủ bảo mật cao cấp. Chúng tôi cam kết không chia sẻ dữ liệu của bạn với bên thứ ba.',
  },
  {
    question: 'Tôi có thể sử dụng CakeAI cho doanh nghiệp không?',
    answer:
      'Chắc chắn rồi! CakeAI có các gói dành riêng cho doanh nghiệp với tính năng quản lý đội nhóm, phân quyền người dùng, API tích hợp và hỗ trợ ưu tiên. Liên hệ với chúng tôi để được tư vấn gói phù hợp nhất.',
  },
  {
    question: 'Làm thế nào để tạo AI Agent riêng?',
    answer:
      'Bạn có thể tạo AI Agent riêng bằng cách chọn từ thư viện template có sẵn hoặc tùy chỉnh từ đầu. Chỉ cần mô tả mục tiêu công việc, cung cấp ngữ cảnh và CakeAI sẽ giúp bạn thiết lập AI Agent phù hợp trong vài phút.',
  },
  {
    question: 'CakeAI có hỗ trợ tiếng Việt không?',
    answer:
      'Có! CakeAI hỗ trợ đầy đủ tiếng Việt trong tất cả các tính năng từ AI Chat, tạo nội dung, đến Video AI và Image AI. Giao diện cũng được Việt hóa hoàn toàn để mang lại trải nghiệm tốt nhất cho người dùng Việt Nam.',
  },
  {
    question: 'Tôi có thể xuất và tải về các nội dung đã tạo không?',
    answer:
      'Tất nhiên! Bạn có thể tải về tất cả hình ảnh, video và nội dung đã tạo với chất lượng cao. Các file xuất ra thuộc quyền sở hữu của bạn và có thể sử dụng cho mục đích thương mại (tùy theo gói dịch vụ).',
  },
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  const sectionVisibleStyle = { opacity: 1, transform: 'none' as const };

  return (
    <div className='' style={sectionVisibleStyle}>
      <div className='rounded-xl bg-[#edf2f24d] border border-solid border-[#dce5e580] rounded-xl px-6 border-[#0094944d] transition-all duration-300'>
        <button
          onClick={onToggle}
          className='w-full flex items-center justify-between text-left font-semibold text-foreground1 hover:text-accent transition-colors py-5 px-6'
        >
          <span>{question}</span>
          <ChevronDown
            className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        {isOpen && (
          <div className='overflow-hidden text-sm transition-all duration-300 ease-in-out'>
            <div className='text-muted-foreground pb-5 px-6 leading-relaxed'>
              {answer}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function FaqSection() {
  const sectionVisibleStyle = { opacity: 1, transform: 'none' as const };
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className='py-20 bg-[#f9fbfb]'>
      <div className='container mx-auto px-4 max-w-7xl'>
        {/* Header */}
        <div className='max-w-3xl mx-auto text-center mb-12 space-y-4'>
          <div style={sectionVisibleStyle}>
            <span className='inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-medium'>
              FAQ
            </span>
          </div>
          <div style={sectionVisibleStyle}>
            <h2 className='text-3xl md:text-4xl font-bold text-foreground1'>
              Câu hỏi
              <span
                style={{
                  background: 'var(--gradient-primary)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {' '}
                thường gặp
              </span>
            </h2>
          </div>
          <div style={sectionVisibleStyle}>
            <p className='text-muted-foreground text-lg'>
              Giải đáp những thắc mắc phổ biến về CakeAI
            </p>
          </div>
        </div>

        {/* FAQ Items */}
        <div className='max-w-3xl mx-auto'>
          <div className='space-y-4'>
            {faqItems.map((item, idx) => (
              <FAQItem
                key={idx}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === idx}
                onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
              />
            ))}
          </div>

          {/* Support Contact */}
          <div style={sectionVisibleStyle}>
            <div
              className='text-center mt-12 p-6 rounded-2xl border border-border'
              style={{
                background: 'hsl(var(--accent) / 0.05)',
              }}
            >
              <p className='text-foreground1 font-medium mb-2'>
                Không tìm thấy câu trả lời bạn cần?
              </p>
              <p className='text-muted-foreground'>
                Liên hệ đội ngũ hỗ trợ của chúng tôi qua{' '}
                <a
                  href='mailto:support@cakeai.vn'
                  className='text-accent hover:underline'
                >
                  support@cakeai.vn
                </a>{' '}
                hoặc chat trực tiếp trên website.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
