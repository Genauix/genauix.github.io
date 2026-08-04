/**
 * Marketing Layout — Section 10.5
 * 
 * Wraps all marketing pages with:
 * - Nav (Section 5.5)
 * - Footer (Section 5.6)  
 * - Custom Cursor (Section 5.1)
 * - Progress Bar (Section 5.3)
 * - Page Transitions (Section 5.2)
 */
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { CustomCursor } from '@/components/cursor';
import { ProgressBar } from '@/components/progress-bar';
import { PageTransition } from '@/components/page-transition';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CustomCursor />
      <ProgressBar />
      <Nav />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </>
  );
}
