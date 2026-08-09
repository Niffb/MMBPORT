/**
 * Section header with index number, title, and extending line.
 */
export default function SectionHeader({ index, title }) {
  return (
    <div className="section-header">
      <span className="section-header__index">{index}</span>
      <h2 className="section-header__title">{title}</h2>
      <div className="section-header__line" />
    </div>
  );
}
