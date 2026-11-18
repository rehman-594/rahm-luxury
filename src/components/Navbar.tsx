import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { RahmLogo } from './RahmLogo';

interface NavbarProps {
  onDiscoverClick: () => void;
}

const NAV_LINKS = [
  { label: 'Journey', href: '#journey' },
  { label: 'About', href: '#about' },
  { label: 'Properties', href: '#properties' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ onDiscoverClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F7F5F0]/95 backdrop-blur-md border-b border-[#DCD4C6] py-3.5 shadow-sm'
          : 'bg-gradient-to-b from-[#171918]/55 via-[#171918]/20 to-transparent py-5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#hero"
          className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B69A69]"
          aria-label="RAHM LUXURY Home"
        >
          <RahmLogo tone={scrolled ? 'dark' : 'light'} compact />
        </a>

        {/* Zone 2: Clean Single-Line Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className={`hidden md:flex items-center gap-8 text-[13px] tracking-[0.12em] uppercase font-medium ${
            scrolled ? 'text-[#171918]' : 'text-[#FFFFFF]'
          }`}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors duration-200 hover:text-[#B69A69] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#B69A69] after:transition-all after:duration-200 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            type="button"
            onClick={onDiscoverClick}
            className={`hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-[11px] font-medium tracking-[0.16em] uppercase whitespace-nowrap shrink-0 border transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B69A69] ${
              scrolled
                ? 'border-[#171918] text-[#171918] hover:bg-[#171918] hover:text-[#F7F5F0]'
                : 'border-[#FFFFFF]/70 text-[#FFFFFF] bg-[#171918]/20 hover:bg-[#FFFFFF] hover:text-[#171918] hover:border-[#FFFFFF]'
            }`}
          >
            Discover Properties
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className={`md:hidden p-2 rounded transition-colors ${
              scrolled ? 'text-[#171918]' : 'text-[#FFFFFF]'
            }`}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#F7F5F0] border-b border-[#DCD4C6] px-6 py-6 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm uppercase tracking-[0.14em] text-[#171918] hover:text-[#B69A69] py-1.5 border-b border-[#DCD4C6]/50"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onDiscoverClick();
            }}
            className="mt-2 w-full py-3 bg-[#171918] text-[#F7F5F0] text-xs uppercase tracking-[0.16em] font-medium"
          >
            Discover Properties
          </button>
        </div>
      )}
    </header>
  );
}
