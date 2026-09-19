# NEXGEGL Brand Standard

**Status:** Canonical / Locked  
**Repository:** `Nexgegl/brand-assets`

This document is the machine-readable companion to the NEXGEGL Brand Kit and the locked Visual Governance System in Notion.

## 1. Source of Truth

For current brand implementation, use the following hierarchy:

1. This repository and its approved Brand Kit assets.
2. The locked Notion page: **NEXGEGL — Visual Governance System (SSOT LOCKED)**.
3. Approved production templates that conform to the sources above.

Old screenshots, legacy presentations, chat history, or designer interpretation do not override this standard.

## 2. Official Logo Assets

Use the original files in `/logos`. Do not redraw the mark or wordmark.

- `nexgegl-logo-dark-bg.png`
- `nexgegl-logo-light-bg.png`
- `nexgegl-logo-transparent-dark.png`
- `nexgegl-logo-transparent-light.png`

Select the variant appropriate to the background and preserve the logo proportions.

## 3. NEXGEGL Brand Colors

| Token | Name | HEX | Usage |
|---|---|---:|---|
| `--nxg-primary` | Navy | `#2E3158` | Primary brand color and principal background |
| `--nxg-accent` | Gold | `#B79A56` | Brand accent and emphasis |
| `--nxg-surface` | Surface | `#363969` | Secondary surfaces and cards |
| `--nxg-deep` | Deep | `#232545` | Depth and dark background treatment |
| `--nxg-text` | Text | `#FFFFFF` | Primary text on dark brand surfaces |

These values supersede legacy NEXGEGL color values not present in the current approved Brand Kit.

## 4. KFSA Decision Colors

KFSA colors are **decision-state signals**, not decorative brand colors.

| State | Meaning | Strong | Soft |
|---|---|---:|---|
| KILL | إيقاف / خطر حاد | `#DC2626` | `rgba(220,38,38,0.12)` |
| ALERT | تنبيه / تصعيد | `#F59E0B` | `rgba(245,158,11,0.12)` |
| FIX | يحتاج إصلاح | `#2563EB` | `rgba(37,99,235,0.12)` |
| SCALE | أداء صحي | `#16A34A` | `rgba(22,163,74,0.12)` |

### KFSA Usage Rules

- Use KFSA colors only when a real KFSA state is being communicated.
- Do not use KFSA colors as full-page or full-card backgrounds.
- Preferred use: indicator, border accent, icon, state badge, or state-specific chart element.
- Soft tokens are for restrained state backgrounds.
- Do not use state colors decoratively.
- Do not introduce alternate shades for the same KFSA state without a formal SSOT update.
- Charts use KFSA colors only for state meaning; otherwise use the NEXGEGL brand palette or neutral treatment.

## 5. Visual Governance Principle

> Color is not decoration. Color is a decision signal.

NEXGEGL defines the visual environment. KFSA communicates decision state.

The interface or document must remain calm, legible, and institutionally credible. Clarity overrides visual novelty.

## 6. Company Profile Application

For the NEXGEGL Company Profile:

- Backgrounds and surfaces: NEXGEGL brand palette only.
- Gold: controlled brand emphasis.
- KFSA red / amber / blue / green: only where KILL / ALERT / FIX / SCALE is explicitly represented.
- Do not use KFSA colors to create generic visual variety.
- Use original repository logo assets only.
- Do not fabricate performance claims, market figures, compliance claims, client outcomes, or proof points.

## 7. Typography

Typography is **not yet locked in this repository as a machine-readable canonical specification**.

Do not infer a new canonical typeface from legacy files or prior drafts. Typography should be added here only after explicit approval and synchronization with the Brand Kit.

## 8. Governance

Any new brand token, status color, typography rule, or logo rule must be updated in both:

- this repository; and
- the locked Notion Visual Governance System

before being treated as canonical.

The canonical color tokens are also available in:

`colors/nexgegl-design-tokens.json`
