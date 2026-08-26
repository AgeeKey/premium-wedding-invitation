## 2025-05-18 - Lightbox Keyboard Navigation & Focus Ring Patterns
**Learning:** Interactive image galleries with modal lightboxes often miss key binding controls (Escape to close, Arrow keys to navigate photos) and proper focus rings/keyboard activation for thumbnail buttons.
**Action:** Always bind `keydown` listeners for Escape and Arrow keys inside modal lightboxes, and ensure gallery thumbnail items have `role="button"`, `tabIndex={0}`, Enter/Space activation, and visible focus rings (`focus-visible:ring-2`).
