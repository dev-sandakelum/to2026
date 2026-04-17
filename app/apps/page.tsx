import Navbar from '../components/Navbar';
import Section from '../components/Section';

export default function Apps() {
  return (
    <>
      <Navbar />
      <main>
        <Section title="Apps">
          <div
            className="card"
            style={{
              gridColumn: '1/-1',
              padding: '32px',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
              No apps published yet. Check back soon.
            </p>
          </div>
        </Section>
      </main>
    </>
  );
}
