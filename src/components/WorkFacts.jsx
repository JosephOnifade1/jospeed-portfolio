export default function WorkFacts({ project }) {
  const facts = [
    ['My role', project.role],
    ['Platforms', project.platforms],
    ['Delivery', project.delivery],
  ].filter(([, value]) => value);
  if (!facts.length) return null;
  return (
    <dl className="work-facts">
      {facts.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
