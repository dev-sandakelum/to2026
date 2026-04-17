import Navbar from '../components/Navbar';
import Section from '../components/Section';

export default function Working() {
  return (
    <>
      <Navbar />
      <main>
        <Section title="Working">
          <div
            className="card"
            style={{
              gridColumn: '1/-1',
              padding: '32px',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
              Projects coming soon. Currently working on new features.
            </p>
          </div>
        </Section>
      </main>
    </>
  );
}
