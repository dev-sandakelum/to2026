'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/works', label: 'Works', icon: '🗂' },
    { href: '/apps', label: 'Apps', icon: '🧩' },
    { href: '/notes', label: 'Notes', icon: '📝' },
    { href: '/quiz', label: 'Quiz', icon: '🧠' },
    { href: '/blog', label: 'Blog', icon: '✍️' },
    { href: '/working', label: 'Working', icon: '🔭' },
  ];

  return (
    <>
      <nav className="navbar">
        <Link href="/" className="nav-logo">
          <div className="nav-logo-badge">HS</div>
          <span className="nav-logo-name">Hasitha</span>
        </Link>

        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={pathname === link.href ? 'active' : ''}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-right-group">
          <button className="nav-settings-btn" aria-label="Settings">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
          <div className="nav-right">Hasitha ▾</div>
        </div>

        <button
          className="nav-toggle"
          aria-label="Open menu"
          onClick={() => setIsDrawerOpen(true)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div className="nav-drawer">
          <div
            className="nav-drawer-overlay"
            onClick={() => setIsDrawerOpen(false)}
          ></div>
          <div className="nav-drawer-panel">
            <div className="nav-drawer-header">
              <div className="nav-drawer-logo">
                <div className="nav-drawer-logo-badge">HS</div>
                <span className="nav-drawer-logo-name">Hasitha</span>
              </div>
              <button
                className="nav-drawer-close"
                aria-label="Close menu"
                onClick={() => setIsDrawerOpen(false)}
              >
                ✕
              </button>
            </div>
            <nav className="nav-drawer-links">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={pathname === link.href ? 'active' : ''}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <span className="nav-drawer-link-icon">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="nav-drawer-footer">
              <button className="nav-drawer-profile">Hasitha Sandakelum</button>
              <button className="nav-drawer-settings">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
                Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
