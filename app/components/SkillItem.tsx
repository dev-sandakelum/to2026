interface SkillItemProps {
  skill: string;
}

export default function SkillItem({ skill }: SkillItemProps) {
  return <div className="skill-item">{skill}</div>;
}
