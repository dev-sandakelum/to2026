'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Section from '../components/Section';
import ProjectCard from '../components/ProjectCard';

export default function Works() {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      title: 'NexEra – Full-Stack Academic Learning Platform',
      description:
        'A full-stack academic learning platform for university students — Markdown notes, PDFs, quizzes, and real-time sync.',
      tags: ['Next.js', 'TypeScript', 'Firebase'],
      category: 'Full-Stack',
      href: '/project',
    },
    {
      title: 'Birthday Post Creator',
      description:
        'Automates birthday post creation for the student union — reduced a 30-min process to under 2 minutes. 95% time saved.',
      tags: ['Next.js', 'Canvas API', 'AI'],
      category: 'Full-Stack',
      href: '/project',
    },
    {
      title: 'AI Question Generator (Q-Gen)',
      description:
        'Generates contextual questions from course materials with AI-powered 1–5 star evaluation and personalized feedback.',
      tags: ['Next.js', 'Groq AI', 'MongoDB'],
      category: 'AI / EdTech',
      href: '/project',
    },
    {
      title: 'Content Extractor',
      description:
        'Python-based OCR tool using Tesseract to extract text from images, process scanned documents, and output structured data.',
      tags: ['Python', 'OCR', 'Tesseract'],
      category: 'Systems',
      href: '/project',
    },
  ];

  const filters = ['all', 'Full-Stack', 'AI / EdTech', 'Systems'];

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      <Navbar />
      <main>
        <Section title="Works">
          <div className="filter-bar">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter === 'all' ? 'All' : filter}
              </button>
            ))}
          </div>

          <div className="cards-grid">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                tags={project.tags}
                category={project.category}
                href={project.href}
              />
            ))}
          </div>
        </Section>
      </main>
    </>
  );
}
