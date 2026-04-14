export function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2
        className="mt-4 section-title"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {title}
      </h2>
      {description ? <p className="mt-3 text-lg text-slate-600">{description}</p> : null}
    </div>
  );
}
