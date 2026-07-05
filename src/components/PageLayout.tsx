import SearchBar from './SearchBar';

interface PageLayoutProps {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function PageLayout({ eyebrow, title, description, children }: PageLayoutProps) {
  return (
    <div className="max-w-[560px] mx-auto px-4 py-5">
      <SearchBar />
      <header className="px-1 pb-5">
        <div className="text-[13px] font-bold text-[var(--primary)] tracking-wide">{eyebrow}</div>
        <h1 className="mt-1.5 mb-2 text-2xl font-extrabold leading-tight tracking-tight">{title}</h1>
        <p className="m-0 text-sm text-[var(--sub)]">{description}</p>
      </header>
      {children}
    </div>
  );
}
