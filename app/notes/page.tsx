'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Section from '../components/Section';

export default function Notes() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const notes = [
    {
      title: 'Information Systems',
      category: 'dev',
      tags: ['ICT', 'IS', 'University'],
      preview:
        'What is an IS? The five-component model (Hardware, Software, Data, Procedures, People). Types: TPS, MIS, DSS. Systems Development Life Cycle (SDLC) — Waterfall phases.',
      href: '/note-is',
    },
  ];

  const filters = ['all', 'dev', 'design', 'ideas'];

  const filteredNotes = notes.filter((note) => {
    const matchFilter = activeFilter === 'all' || note.category === activeFilter;
    const matchSearch = note.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <>
      <Navbar />
      <main>
        <Section title="Notes">
          <div className="search-bar" style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn">Search</button>
          </div>

          <div className="filter-bar">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          <div className="notes-list">
            {filteredNotes.map((note) => (
              <Link key={note.title} href={note.href} style={{ textDecoration: 'none' }}>
                <div className="note-card" data-category={note.category}>
                  <div className="note-card-title">{note.title}</div>
                  <div className="card-tags" style={{ margin: '6px 0' }}>
                    {note.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="note-card-preview">{note.preview}</div>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      </main>
    </>
  );
}
