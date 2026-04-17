import Navbar from '../components/Navbar';
import Section from '../components/Section';

export default function Blog() {
  return (
    <>
      <Navbar />
      <main>
        <Section title="Blog">
          <div
            className="card"
            style={{
              gridColumn: '1/-1',
              padding: '32px',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
              No blog posts yet. Check back soon for updates.
            </p>
          </div>
        </Section>
      </main>
    </>
  );
}
