import Navbar from './components/Navbar';
import Section from './components/Section';
import ProjectCard from './components/ProjectCard';
import SkillItem from './components/SkillItem';

export default function Home() {
  const skills = [
    'Next.js',
    'TypeScript',
    'React.js',
    'JavaScript',
    'HTML5',
    'CSS',
    'PHP',
    'Python',
    'C / C#',
    'SQL',
    'MongoDB',
    'Firebase',
    'AWS',
    'Azure',
    'Machine Learning',
    'AI / LLM',
    'TensorFlow',
    'Computer Vision',
    'Postman API',
    'GitHub Models',
    'OCR',
    'Prompt Writing',
    'Responsive Design',
    'State Management',
    'Cloud Computing',
    'Automation',
    'Critical Thinking',
    'Team Leadership',
    'Problem Solving',
  ];

  const projects = [
    {
      title: 'NexEra – Full-Stack Academic Learning Platform',
      description:
        'A full-stack academic learning platform for university students to access, organize, and interact with study materials — Markdown notes, PDFs, and quizzes.',
      tags: ['Next.js', 'TypeScript', 'Firebase'],
      category: 'Full-Stack',
      href: '/project',
    },
    {
      title: 'Birthday Post Creator',
      description:
        'Automates birthday post creation for the university student union\'s social media, reducing a 30-minute manual process to under 2 minutes.',
      tags: ['Next.js', 'Canvas API', 'AI'],
      category: 'Full-Stack',
      href: '/project',
    },
    {
      title: 'AI Question Generator (Q-Gen)',
      description:
        'AI-powered platform that generates contextual questions from course materials and provides automated evaluation with detailed feedback.',
      tags: ['Next.js', 'Groq AI', 'MongoDB'],
      category: 'AI / EdTech',
      href: '/project',
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* HERO */}
        <Section title="About">
          <div className="hero-grid">
            <div className="hero-text">
              <h1>Hasitha Sandakelum</h1>
              <div className="role">Full-Stack Dev & AI Builder</div>
              <p className="bio">
                A Full-Stack Developer and AI Builder specializing in Next.js,
                TypeScript, and Firebase. Currently pursuing a Bachelor&apos;s
                degree in Information & Communication Technology at the
                University of Ruhuna, Sri Lanka. Passionate about building
                AI-powered applications, cloud solutions, and real-time systems.
              </p>
              <div className="hero-btns">
                <a href="/works" className="btn primary">
                  View Works
                </a>
                <a href="mailto:dev.sandakelum@gmail.com" className="btn">
                  Contact Me
                </a>
                <a
                  href="https://github.com/dev-sandakelum/"
                  className="btn"
                  target="_blank"
                  rel="noopener"
                >
                  GitHub ↗
                </a>
                <a
                  href="https://www.linkedin.com/in/hasitha-sandakelum/"
                  className="btn"
                  target="_blank"
                  rel="noopener"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
            <div className="placeholder-img xl">Profile Photo</div>
          </div>
        </Section>

        {/* SKILLS */}
        <Section title="Skills">
          <div className="skills-grid">
            {skills.map((skill) => (
              <SkillItem key={skill} skill={skill} />
            ))}
          </div>
        </Section>

        {/* FEATURED PROJECTS */}
        <Section title="Featured Projects">
          <div className="cards-grid">
            {projects.map((project) => (
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
