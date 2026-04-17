import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  category: string;
  image?: string;
  href?: string;
}

export default function ProjectCard({
  title,
  description,
  tags,
  category,
  image,
  href = '#',
}: ProjectCardProps) {
  return (
    <div className="card" data-category={category}>
      <div className="placeholder-img md">{image || 'Project Preview'}</div>
      <div className="card-body">
        <div className="card-title">{title}</div>
        <p className="card-text">{description}</p>
        <div className="card-tags">
          {tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <Link href={href}>
          <button className="btn sm">View Project</button>
        </Link>
      </div>
    </div>
  );
}
