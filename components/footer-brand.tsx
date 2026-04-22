import styles from "./footer-brand.module.css";

/**
 * Oversized MARAHUYO wordmark for the footer, rendered in a Hofmann-style
 * circle-grid + `clip-path: shape()` letterform. The M / A / R / H / O paths
 * come from the reference project; U and Y are Marahuyo-specific drafts.
 *
 * Lines mirror the reference composition (three on top, five underneath).
 */
export function FooterBrand() {
  return (
    <div className={styles.root} aria-hidden="true">
      <div className={styles.row}>
        <Char value="M" />
        <Char value="A" />
        <Char value="R" />
        <Char value="A" />
        <Char value="H" />
        <Char value="U" />
        <Char value="Y" />
        <Char value="O" />
      </div>
    </div>
  );
}

function Char({ value }: { value: string }) {
  // 20 circle-grid cells per letter; `M` uses all 20 (5x4), the rest hide the
  // trailing four via CSS so they lay out as 4x4.
  return (
    <div className={styles.char} data-char={value}>
      {Array.from({ length: 20 }, (_, i) => (
        <span key={i} />
      ))}
    </div>
  );
}
