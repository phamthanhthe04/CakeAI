import { HOMEPAGE_SECTIONS } from './sections';

export default function HomePage() {
  return (
    <div className='relative min-h-screen overflow-hidden'>
      {HOMEPAGE_SECTIONS.map(({ id, Component }) => (
        <Component key={id} />
      ))}
    </div>
  );
}
