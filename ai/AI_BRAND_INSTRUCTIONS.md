# AI Brand Instructions — NEXGEGL

**Status:** Draft agent-operating policy for review. This file grants no authority to publish, approve, change SSOT, or issue decisions.

## Read order
1. `docs/NEXGEGL_BRAND_STANDARD.md` and original `logos/` assets.
2. `colors/nexgegl-design-tokens.json`.
3. Locked Notion **NEXGEGL — Visual Governance System (SSOT LOCKED)** for visual governance.
4. `typography/typography.json`, `docs/BRAND_DNA.md`, and `docs/BRAND_VOICE.md`, always respecting field-level approval status.
5. Relevant approved product-specific standard and evidence register.

If sources disagree, **BLOCK**, report both locations and request an authorized reconciliation; do not choose a convenient version.

## Agent permissions
ALLOW: draft, compare, lint, report violations, request approvals, propose PRs.  
DENY: auto-publication, merging protected standards, altering locked brand rules, introducing colors/fonts as approved, signing compliance claims, creating formal KFSA verdicts, moving financial numbers into claims without evidence.

## Output contract
For every generated deliverable supply:
- Brand + intended audience + language + product scope.
- Exact approved logo asset path where a logo appears.
- Source references for factual and financial assertions; unverified items **PENDING_APPROVAL**.
- Status **DRAFT / REVIEW_REQUIRED / APPROVED_FOR_PUBLICATION** (only assigned by authorized human workflow).
- Explicit statement of whether colors refer to an actual KFSA state.

## Visual enforcement
- Use canonical color tokens, not raw HEX in components, inline color declarations, or Tailwind state colors.
- KFSA colors for a genuine state only; no decorative decision colors or full-card state backgrounds.
- For product interfaces, require KFSAStatus / KFSACard / KFSAIndicator where applicable.
- No fabricated or regenerated logos; no unapproved font assumptions.
- Check RTL/LTR and direction isolation for mixed text.

## Governance boundaries
- **Task ≠ Signal ≠ Decision.** A rendered label is not a decision.
- A formal KFSA verdict originates only from the authorized runtime/engine pathway. **ALERT** is a gate, not an inferred decorative label.
- Do not use 'OS' or 'Operating System' as brand/product positioning.
- PENDING_APPROVAL is a blocking status for release of dependent claims, not permission to silently fill gaps.

## Pre-delivery checklist
1. Source hierarchy reconciled and approvals visible.
2. All logo files match approved repository assets.
3. No banned positioning or unsupported evidence claim.
4. No cross-brand assets or claims.
5. Color and state mapping consistent with SSOT.
6. Typography fields either approved or clearly unresolved.
7. Responsible human reviewer named; external publication blocked until approval.

## CI integration
Use `tests/brand-compliance-cases.json` as a contract for a subsequent executable checker. Existence of test vectors is **not** evidence of CI execution or a passing enforcement gate.

## CI is not publication approval
A passing GitHub Actions check confirms only that the specific automated fixture and token assertions executed successfully. It **does not** approve typography, factual claims, visual assets, Brand DNA/Voice, or production publication. Approval must be documented by an authorized human reviewer through the established workflow; Draft PRs remain non-release artifacts. Do not infer readiness, change status to APPROVED, or publish automatically from green checks.
