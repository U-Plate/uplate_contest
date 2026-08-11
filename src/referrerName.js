/**
 * First name only, capped so a long (or junk) `ref` query param can't blow out
 * the headline on the join screen.
 */
export function firstName(value) {
  if (!value) return "";
  return value.trim().split(/\s+/)[0].slice(0, 20);
}
