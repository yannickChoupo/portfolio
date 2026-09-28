# Portfolio Accessibility — Progressive WCAG 2.2 AA Checklist

> **Goal:** Make the portfolio visually distinctive, technically sophisticated, and progressively more accessible without changing the existing black/purple visual identity.
>
> **Target:** WCAG 2.2 AA-oriented implementation.

---

## Step 0 — Establish the baseline

Before changing anything, check the current site.

### Checklist

* [ ] Open the portfolio in Chrome.
* [ ] Navigate the entire site using only `Tab`.
* [ ] Navigate backwards using `Shift + Tab`.
* [ ] Activate links/buttons with `Enter` and `Space`.
* [ ] Check whether every interactive element receives visible focus.
* [ ] Check the page at 100% zoom.
* [ ] Check the page at 200% zoom.
* [ ] Test the mobile layout.
* [ ] Run Lighthouse accessibility audit.
* [ ] Run an automated accessibility checker such as axe.

### Important

Don't try to fix everything at once.

Record the existing problems first. This gives us a baseline to compare against later.

---

# Step 1 — Semantic HTML

**Goal:** Give the page a meaningful document structure.

Replace generic layout containers where appropriate.

### Prefer

```tsx
<header>
  <nav aria-label="Primary navigation">
    ...
  </nav>
</header>

<main id="main-content">
  <section aria-labelledby="about-heading">
    <h2 id="about-heading">About me</h2>
    ...
  </section>

  <section aria-labelledby="projects-heading">
    <h2 id="projects-heading">Projects</h2>
    ...
  </section>
</main>

<footer>
  ...
</footer>
```

### Use the correct elements

* [ ] `<header>` for page/header content.
* [ ] `<nav>` for navigation.
* [ ] `<main>` for the primary page content.
* [ ] `<section>` for meaningful sections.
* [ ] `<article>` for independent pieces of content/projects when appropriate.
* [ ] `<footer>` for footer content.
* [ ] `<button>` for actions.
* [ ] `<a>` for navigation.
* [ ] `<form>` for forms.

### Avoid

```tsx
<div onClick={openProject}>
  View project
</div>
```

Use:

```tsx
<button onClick={openProject}>
  View project
</button>
```

Or:

```tsx
<a href="/projects/union">
  View project
</a>
```

### Done when

The HTML structure makes sense even without CSS.

---

# Step 2 — Fix the heading hierarchy

**Goal:** Make the page structure understandable to screen-reader users.

A typical portfolio structure could be:

```text
h1
├── h2 About
├── h2 Projects
│   ├── h3 Union
│   ├── h3 IoT Attendance
│   └── h3 Other Project
├── h2 Experience
└── h2 Contact
```

### Checklist

* [ ] One logical `<h1>` for the page.
* [ ] Major sections use `<h2>`.
* [ ] Project titles use `<h3>` when projects belong to the Projects section.
* [ ] Don't select headings because they "look right".
* [ ] Use CSS to control visual size.

### Example

```tsx
<h2>Projects</h2>

<article>
  <h3>Union</h3>
  ...
</article>

<article>
  <h3>IoT Attendance</h3>
  ...
</article>
```

### Done when

The heading outline makes sense independently of the visual design.

---

# Step 3 — Add the skip link

**Goal:** Allow keyboard users to bypass repeated navigation.

At the beginning of the page:

```tsx
<a
  className="skip-link"
  href="#main-content"
>
  Skip to main content
</a>
```

Then:

```tsx
<main id="main-content">
  ...
</main>
```

Add styling:

```scss
.skip-link {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 9999;

  transform: translateY(-200%);

  padding: 0.75rem 1rem;

  background-color: $color--white;
  color: $color--dark;

  font-weight: 700;
  text-decoration: none;
}

.skip-link:focus-visible {
  transform: translateY(0);
}
```

### Test

Press:

```text
Tab
```

The skip link should become visible.

Press:

```text
Enter
```

Focus should move to `<main>`.

---

# Step 4 — Create the accessibility mixins

**Goal:** Put accessibility behavior into the existing SCSS architecture.

Add these to `mixins.scss`:

```scss
@mixin focus-visible {
  &:focus-visible {
    outline: 3px solid $def-pri;
    outline-offset: 4px;
  }
}

@mixin reduced-motion {
  @media (prefers-reduced-motion: reduce) {
    @content;
  }
}

@mixin touch-target {
  min-width: 44px;
  min-height: 44px;
}

@mixin visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### Important

Your existing mixins already use:

```scss
@use "../abstracts/variables" as *;
```

so `$def-pri` is available inside `mixins.scss`.

Use namespaced calls in components:

```scss
@include mixins.focus-visible();
```

```scss
@include mixins.touch-target();
```

---

# Step 5 — Add global keyboard focus

**Goal:** Make keyboard focus consistently visible.

Add to your global stylesheet:

```scss
:focus-visible {
  outline: 3px solid $def-pri;
  outline-offset: 4px;
}
```

Don't use:

```scss
*:focus {
  outline: none;
}
```

unless you provide an equivalent accessible focus indicator.

### Test

Navigate the entire site with:

```text
Tab
Shift + Tab
```

### Check

* [ ] Navigation links have visible focus.
* [ ] Buttons have visible focus.
* [ ] Form controls have visible focus.
* [ ] Project links have visible focus.
* [ ] Mobile menu button has visible focus.
* [ ] Focus isn't hidden behind fixed/sticky elements.

---

# Step 6 — Fix the navigation

**Goal:** Make the navigation understandable and keyboard accessible.

Use:

```tsx
<nav aria-label="Primary navigation">
  ...
</nav>
```

For a mobile menu:

```tsx
<button
  type="button"
  aria-label={isOpen ? "Close navigation" : "Open navigation"}
  aria-expanded={isOpen}
  aria-controls="main-navigation"
>
  ...
</button>
```

And:

```tsx
<nav
  id="main-navigation"
  aria-label="Primary navigation"
>
  ...
</nav>
```

### Checklist

* [ ] Navigation uses `<nav>`.
* [ ] Navigation has an accessible name.
* [ ] Menu button is a real `<button>`.
* [ ] `aria-expanded` reflects the menu state.
* [ ] `aria-controls` points to the menu.
* [ ] Menu can be opened with keyboard.
* [ ] Menu can be closed with keyboard.
* [ ] Focus remains visible.
* [ ] Escape closes the menu if appropriate.

---

# Step 7 — Fix the hamburger button

**Goal:** Make the mobile menu button accessible.

The button should have a minimum comfortable target:

```scss
.hamburger {
  width: 44px;
  height: 44px;

  @include mixins.flexCenter();
  @include mixins.touch-target();
  @include mixins.focus-visible();

  position: relative;

  border: 0;
  border-radius: 50%;
  background: transparent;

  cursor: pointer;
}
```

The decorative hamburger lines should not be announced:

```tsx
<span
  className="hamburger__line"
  aria-hidden="true"
/>
```

### Test

* [ ] Can reach button with Tab.
* [ ] Enter opens menu.
* [ ] Space opens menu.
* [ ] Button state is announced.
* [ ] Button has visible focus.
* [ ] Menu can be closed again.

---

# Step 8 — Fix typography and readability

**Goal:** Make text comfortable to read.

Start with:

```scss
body {
  font-size: 1rem;
  line-height: 1.6;
}
```

Aim roughly for:

```text
Body text:       16–18px
Line height:     1.5–1.7
Paragraph width: ~60–70ch
```

Example:

```scss
.prose {
  max-width: 70ch;
}
```

### Checklist

* [ ] Body text is readable.
* [ ] Paragraphs aren't excessively wide.
* [ ] Line height is comfortable.
* [ ] Text remains readable at 200% zoom.
* [ ] Content doesn't disappear when text becomes larger.

---

# Step 9 — Introduce semantic color tokens

**Goal:** Separate your visual brand from accessibility decisions.

Keep your existing brand:

```scss
$brand-primary: hsl(264, 98%, 47%);
$brand-secondary: hsl(294, 98%, 47%);
```

Then introduce semantic tokens:

```scss
// Surfaces
$surface-primary: #000;
$surface-secondary: #111;
$surface-elevated: #181818;

// Text
$text-primary: #fff;
$text-secondary: rgba(255, 255, 255, 0.75);
$text-muted: rgba(255, 255, 255, 0.55);

// UI
$border-default: rgba(255, 255, 255, 0.16);
$focus-color: #fff;

// Feedback
$color-success: ...;
$color-warning: ...;
$color-error: ...;
```

### Important

Don't assume that every muted color is accessible.

Contrast-test the actual combinations before using them for important text.

---

# Step 10 — Test your purple

**Goal:** Keep the purple visual identity while using accessible combinations.

Test:

```text
White on black
Gray on black

Purple on black
Magenta on black

Black on purple
White on purple

White on magenta
Purple on white
```

Your current colors are:

```scss
$def-pri: hsl(264, 98%, 47%);
$def-sec: hsl(294, 98%, 47%);
```

### Rule

Use vibrant colors freely for:

* decoration
* large graphical elements
* backgrounds where appropriate
* branding

But test them carefully when they're used for:

* normal-size text
* icons conveying meaning
* borders
* focus indicators
* interactive controls

### Done when

You know which brand colors are safe for each usage.

---

# Step 11 — Fix links

**Goal:** Make links distinguishable from normal text.

For links inside paragraphs:

```scss
a {
  text-underline-offset: 0.15em;
}
```

Consider:

```scss
.prose a {
  text-decoration: underline;
}
```

Navigation links can have a different visual treatment because their context already identifies them as navigation.

### Avoid

Making the entire accessibility model:

```text
Purple = clickable
White = not clickable
```

Color should not be the only distinction.

---

# Step 12 — Fix images

**Goal:** Give images meaningful alternative text.

For meaningful project screenshots:

```tsx
<img
  src={unionScreenshot}
  alt="Union dashboard showing attendance and player responsibility tracking"
/>
```

For decorative images:

```tsx
<img
  src={background}
  alt=""
  aria-hidden="true"
/>
```

### Avoid

```tsx
alt="image"
```

or:

```tsx
alt="screenshot"
```

### Checklist

Every image:

* [ ] Is meaningful → descriptive `alt`.
* [ ] Is decorative → `alt=""`.
* [ ] Doesn't duplicate nearby text unnecessarily.

---

# Step 13 — Don't communicate meaning with color alone

**Goal:** Make status information understandable without color.

Avoid:

```text
🟢 Completed
🟡 In progress
🔴 Failed
```

where color is the only meaningful distinction.

Prefer:

```text
✓ Completed
◐ In progress
! Failed
```

with color as an additional visual cue.

### Check

Look at:

* [ ] Project status.
* [ ] Skills.
* [ ] Progress indicators.
* [ ] GitHub information.
* [ ] Form validation.
* [ ] Error messages.
* [ ] Success messages.

---

# Step 14 — Make every interactive element keyboard accessible

**Goal:** Everything that works with a mouse should work with a keyboard.

Test:

```text
Tab
Shift + Tab
Enter
Space
Escape
```

Use arrow keys where the component pattern requires them.

### Check

* [ ] Navigation.
* [ ] Project cards.
* [ ] Buttons.
* [ ] Filters.
* [ ] Dropdowns.
* [ ] Modals.
* [ ] Forms.
* [ ] Carousel controls.
* [ ] Mobile menu.
* [ ] External links.

### Important

Don't create custom keyboard behavior unless the component actually requires it.

Native HTML controls should be preferred whenever possible.

---

# Step 15 — Add reduced-motion support

**Goal:** Respect users who request less animation.

Add:

```scss
@include mixins.reduced-motion {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Or globally:

```scss
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Test

Enable reduced motion in the operating system.

Then check:

* [ ] Page animations.
* [ ] Menu animations.
* [ ] Hover animations.
* [ ] Scroll animations.
* [ ] Project transitions.
* [ ] Carousels.

---

# Step 16 — Mobile accessibility

**Goal:** Make the mobile experience equally usable.

### Check

* [ ] Interactive targets are comfortably sized.
* [ ] Icon buttons aren't tiny.
* [ ] Buttons have sufficient spacing.
* [ ] No accidental horizontal scrolling.
* [ ] Text remains readable.
* [ ] Mobile navigation is keyboard/screen-reader friendly.
* [ ] Focus remains visible.
* [ ] Content doesn't depend on hover.
* [ ] Important actions don't require precise pointer movement.

A practical target size is around:

```scss
min-width: 44px;
min-height: 44px;
```

WCAG 2.2 AA's Target Size criterion uses a 24 × 24 CSS pixel minimum in applicable cases, with exceptions. 44px is a comfortable practical target for many controls.

---

# Step 17 — Browser zoom and text resizing

**Goal:** Ensure the site survives significant zoom.

Test:

```text
100%
125%
150%
200%
400%
```

### Check

* [ ] Text doesn't overlap.
* [ ] Navigation remains usable.
* [ ] Buttons remain usable.
* [ ] Content isn't clipped.
* [ ] Important information doesn't disappear.
* [ ] No unnecessary horizontal scrolling.
* [ ] Fixed elements don't cover important content.

### Avoid

```css
height: 100vh;
overflow: hidden;
```

for containers holding content unless there's a specific reason.

Never disable browser zoom with viewport restrictions such as:

```html
user-scalable=no
```

---

# Step 18 — Check focus with sticky/fixed UI

**Goal:** Make sure focused elements aren't hidden.

This is especially important for:

* [ ] Sticky navigation.
* [ ] Fixed headers.
* [ ] Mobile menus.
* [ ] Modals.
* [ ] Animated sections.
* [ ] Anchor navigation.

When jumping to sections, consider:

```scss
section {
  scroll-margin-top: 6rem;
}
```

Adjust the value to match your actual header height.

---

# Step 19 — Forms

**Goal:** Make the contact form understandable and usable.

Every input should have a proper label.

Prefer:

```tsx
<label htmlFor="email">
  Email
</label>

<input
  id="email"
  name="email"
  type="email"
/>
```

### Check

* [ ] Every input has a label.
* [ ] Required fields are communicated.
* [ ] Errors are understandable.
* [ ] Errors aren't communicated only through color.
* [ ] Keyboard navigation works.
* [ ] Focus moves appropriately after submission errors.
* [ ] Input types are correct.
* [ ] Form controls have visible focus.

---

# Step 20 — Accessibility for project cards

**Goal:** Make project browsing intuitive.

Avoid making an entire `<div>` clickable.

Prefer a semantic structure:

```tsx
<article>
  <h3>Union</h3>

  <p>
    Attendance and responsibility management platform.
  </p>

  <a href="/projects/union">
    View Union project
  </a>
</article>
```

### Check

* [ ] Project has a heading.
* [ ] Project description is readable.
* [ ] Project image has appropriate alt text.
* [ ] Project action is a real link.
* [ ] Focus is visible.
* [ ] Entire card doesn't need to be a fake button.

---

# Step 21 — Page titles and landmarks

**Goal:** Make every page identifiable.

Each page should have a meaningful document title.

For example:

```text
Alex — Portfolio
Alex — Projects
Alex — Union Case Study
Alex — Contact
```

### Landmarks

Aim for a clear structure:

```text
header
  nav

main
  sections/articles

footer
```

Avoid creating unnecessary ARIA landmarks everywhere.

Native HTML should do most of the work.

---

# Step 22 — Test with keyboard only

Now stop using the mouse.

### Test the complete site

Start from the browser address bar and use:

```text
Tab
Tab
Tab
...
```

### Ask:

* Can I reach everything?
* Can I tell where I am?
* Can I activate everything?
* Can I close menus?
* Can I close dialogs?
* Can I reach the footer?
* Can I skip navigation?
* Does focus ever disappear?
* Does focus ever get trapped unexpectedly?
* Does anything require a mouse?

Fix every problem before moving on.

---

# Step 23 — Test screen-reader semantics

After keyboard navigation works, test with assistive technology.

### Minimum testing

**Windows**

* NVDA
* Chrome or Firefox

**macOS**

* VoiceOver
* Safari or Chrome

### Check

* [ ] Page title is announced.
* [ ] Landmarks are understandable.
* [ ] Headings form a logical structure.
* [ ] Navigation has a name.
* [ ] Buttons have meaningful names.
* [ ] Links have meaningful names.
* [ ] Images have appropriate alternatives.
* [ ] Form fields have labels.
* [ ] Errors are announced appropriately.

---

# Step 24 — Automated accessibility testing

Use automated tools as a supplement.

Run:

* [ ] Lighthouse accessibility.
* [ ] axe.
* [ ] Browser accessibility inspection tools.

Automated testing is useful, but it won't detect everything.

A page can pass automated checks while still being difficult to navigate with a keyboard or screen reader.

---

# Step 25 — Final accessibility pass

Once everything above is implemented, do one complete pass.

## Structure

* [ ] Semantic HTML.
* [ ] Correct headings.
* [ ] Landmarks.
* [ ] Page titles.
* [ ] Skip link.

## Keyboard

* [ ] Tab navigation.
* [ ] Shift + Tab.
* [ ] Enter.
* [ ] Space.
* [ ] Escape where appropriate.
* [ ] Visible focus.
* [ ] No unexpected focus traps.

## Visual

* [ ] Text contrast.
* [ ] UI contrast.
* [ ] Focus contrast.
* [ ] Text resizing.
* [ ] 200%+ zoom.
* [ ] Mobile layout.

## Content

* [ ] Meaningful alt text.
* [ ] Clear link names.
* [ ] Clear button names.
* [ ] Form labels.
* [ ] Errors aren't color-only.

## Motion

* [ ] Reduced motion.
* [ ] No problematic flashing.
* [ ] Animations don't interfere with navigation.

## Responsive

* [ ] Desktop.
* [ ] Tablet.
* [ ] Mobile.
* [ ] Touch targets.
* [ ] No unnecessary horizontal scrolling.

## Assistive technology

* [ ] Keyboard.
* [ ] NVDA or VoiceOver.
* [ ] Lighthouse.
* [ ] axe.

---

# Recommended implementation order

Don't implement everything simultaneously.

Use this order:

### Phase 1 — Structure

1. [ ] Semantic HTML
2. [ ] Heading hierarchy
3. [ ] Page landmarks
4. [ ] Page titles
5. [ ] Real links/buttons

### Phase 2 — Navigation

6. [ ] Skip link
7. [ ] Keyboard navigation
8. [ ] Focus-visible
9. [ ] Mobile hamburger
10. [ ] Mobile menu states

### Phase 3 — Visual accessibility

11. [ ] Typography
12. [ ] Color tokens
13. [ ] Contrast testing
14. [ ] Link distinction
15. [ ] Focus contrast
16. [ ] Touch targets

### Phase 4 — Content

17. [ ] Image alt text
18. [ ] Color-independent status
19. [ ] Form labels
20. [ ] Form errors
21. [ ] Project-card semantics

### Phase 5 — Resilience

22. [ ] Reduced motion
23. [ ] Browser zoom
24. [ ] Text resizing
25. [ ] Focus not obscured
26. [ ] Mobile testing

### Phase 6 — Verification

27. [ ] Keyboard-only test
28. [ ] Screen-reader test
29. [ ] Lighthouse
30. [ ] axe
31. [ ] Final WCAG review

---

# Suggested Git workflow

Make each phase a separate commit so accessibility changes remain easy to review and revert.

Example:

```text
feat(a11y): add semantic page structure
feat(a11y): fix heading hierarchy
feat(a11y): add skip navigation
feat(a11y): add global focus styles
feat(a11y): improve mobile navigation
feat(a11y): improve typography
feat(a11y): add semantic color tokens
feat(a11y): improve image alternatives
feat(a11y): respect reduced motion
feat(a11y): improve keyboard navigation
test(a11y): add automated accessibility checks
```

This way, accessibility becomes a **progressive improvement of the existing design system**, rather than one giant refactor.

---

# Final goal

The portfolio should still look like **your portfolio**.

The black/purple identity stays.

The difference is that the underlying implementation becomes:

* semantic
* keyboard navigable
* screen-reader friendly
* readable
* zoom-friendly
* touch-friendly
* motion-aware
* contrast-aware
* predictable

The accessibility work should feel invisible to most users — but make the site substantially easier to use for everyone.
