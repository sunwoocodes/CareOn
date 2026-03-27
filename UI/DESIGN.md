# Design System Strategy: Clinical Editorial

## 1. Overview & Creative North Star: "The Curated Wellness Sanctuary"
The digital healthcare landscape is often cluttered with "utility-first" grids that feel sterile and anxiety-inducing. This design system rejects the clinical coldness of traditional medical apps in favor of a **High-End Editorial** experience. 

**The Creative North Star: The Curated Wellness Sanctuary.**
We are building a space that feels like a premium wellness boutique—authoritative yet breathing. We break the "template" look by utilizing **intentional asymmetry**, where large editorial display type sits offset from content blocks, and **tonal depth**, where hierarchy is defined by light and shadow rather than rigid lines. This system moves beyond "clean" into "sophisticated," using the 20-30s demographic’s appreciation for lifestyle aesthetics to build a deeper sense of trust.

---

## 2. Colors & Surface Architecture
Color is not just a brand identifier here; it is a spatial tool. We utilize a Material-based logic to create a system that feels alive and atmospheric.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or containment. 
Boundaries must be defined solely through:
*   **Background Color Shifts:** Use `surface-container-low` (#f2f4f6) sections sitting on a `surface` (#f7f9fb) background.
*   **Subtle Tonal Transitions:** Contrast should be felt, not seen as a stroke.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine vellum.
*   **Base:** `surface` (#f7f9fb) or `surface-bright`.
*   **Level 1 (Sections):** `surface-container-low` (#f2f4f6).
*   **Level 2 (Interactive Cards):** `surface-container-lowest` (#ffffff) to create a "lifted" feel.
*   **Nesting:** When placing an element inside a container, use a tier shift (e.g., an input field inside a card should use `surface-container-high`).

### The "Glass & Gradient" Rule
To elevate the experience from "app" to "lifestyle tool":
*   **Glassmorphism:** Use `surface-container-lowest` at 70% opacity with a `24px` backdrop blur for floating navigation bars or modal headers.
*   **Signature Textures:** For primary CTAs and Hero sections, apply a linear gradient from `primary` (#004ac6) to `primary-container` (#2563eb) at a 135-degree angle. This adds "soul" and a sense of movement that flat fills lack.

---

## 3. Typography: The Editorial Voice
We utilize a dual-font strategy to balance medical authority with modern lifestyle warmth.

*   **The Hero (Manrope):** Used for `display` and `headline` scales. Its geometric yet friendly curves provide a modern, high-fashion medical aesthetic. Use `headline-lg` (2rem) with tight letter-spacing (-2%) for a bold, confident voice.
*   **The Utility (Plus Jakarta Sans):** Used for `title`, `body`, and `label` scales. This typeface ensures maximum readability for health data and instructions.
*   **Hierarchy Tip:** Never center-align long-form medical data. Use left-aligned `body-md` (0.875rem) with generous line-height (1.6) to reduce cognitive load for users under stress.

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are often "muddy." In this system, depth is clean and architectural.

*   **The Layering Principle:** Depth is achieved by "stacking." A `surface-container-lowest` (#ffffff) card placed on a `surface-container` (#eceef0) background creates a natural elevation without a single pixel of shadow.
*   **Ambient Shadows:** For floating elements (FABs, Modals), use "Cloud Shadows."
    *   *Values:* Y: 12px, Blur: 32px, Spread: -4px.
    *   *Color:* Use `on-surface` (#191c1e) at 6% opacity. Never use pure black.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility (e.g., high-contrast mode), use `outline-variant` (#c3c6d7) at **15% opacity**. 100% opaque borders are strictly forbidden.

---

## 5. Component Guidelines

### Buttons (High-Contrast CTAs)
*   **Primary:** Gradient fill (`primary` to `primary-container`), `xl` (1.5rem / 24px) rounded corners. Use `on-primary` (#ffffff) for text.
*   **Secondary:** `surface-container-highest` (#e0e3e5) background with `on-secondary-container` (#54647a) text. No border.
*   **Padding:** Vertical `3` (1rem), Horizontal `6` (2rem).

### Cards & Lists (The Divider-Free Approach)
*   **Cards:** Use `xl` (1.5rem) corner radius. Separate cards using `spacing-5` (1.7rem) rather than lines. 
*   **Lists:** Items are separated by a subtle background shift on hover/tap. To separate list groups, use a `label-md` header in `secondary` (#505f76) with 50% opacity.

### Input Fields
*   **Style:** Soft-filled. Use `surface-container-high` (#e6e8ea) as the field background.
*   **States:** On focus, the background remains, but a 2px "Ghost Border" in `primary` (#004ac6) at 40% opacity appears to indicate activity.

### Specialized Component: The "Health-Pulse" Chip
*   For status indicators (e.g., "Heart Rate Normal"), use `tertiary-container` (#007c60) with 10% opacity for the background and `on-tertiary-fixed-variant` (#00513e) for the text. Add a 4px "pulse" dot using the solid `tertiary` color.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical white space. Let a heading breathe with more space above it than below it.
*   **Do** use `display-lg` typography for single-word health metrics (e.g., "98 bpm") to create visual impact.
*   **Do** use `tertiary` (Mint) tones for all positive health outcomes to reinforce the "Wellness" aspect.

### Don't
*   **Don't** use 1px dividers to separate content. Use `spacing-4` (1.4rem) or color blocks instead.
*   **Don't** use sharp corners. Every container must use at least `lg` (1rem) or `xl` (1.5rem) rounding to maintain the "Soft Minimalism" feel.
*   **Don't** use high-saturation orange for anything other than critical alerts. Use `warning-orange` sparingly to maintain the "Calm Grey" atmosphere.

### Accessibility Note
While we prioritize aesthetics, contrast must be maintained. Always ensure `on-surface` text on `surface-container` backgrounds meets a 4.5:1 ratio. If a "Ghost Border" is used for an input, ensure the label is highly visible in `on-surface-variant`.