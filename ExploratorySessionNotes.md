# Exploratory Testing Session Notes

## Session Metadata

* **Target Application:** `https://stage.longo.lv`
* **Tester:** Eriks Uzans
* **Date / Time:** 2026-08-30
* **Viewport:** Mobile (390x844 / iPhone 12/13/14 viewport simulation)
* **Session Duration:** 40 minutes (Timeboxed)

---

## Charter
> **Goal:** Explore the financing / monthly payment calculator interactions and car filtering workflow on a mobile viewport to assess usability, layout responsiveness, and input behavior.

---

## What Was Covered

* **Mobile Filter Workflow:**
  * Opening, scrolling, and expanding filter accordion drawers on a narrow screen.
  * Applying single and combined filter criteria (Make, Model, Body Type, Price Range).
  * Toggling, clearing, and resetting applied filter tags from the mobile overlay view.
* **Mobile Financing / Monthly Payment Calculator:**
  * Direct interaction with financing sliders (Vehicle Price, Down Payment, Loan Term).
  * Manual text entry field behavior and numeric keypad toggling on mobile.
  * Dynamic re-calculation and layout re-flow of estimated monthly payment outputs when parameters change.
  * Visibility and responsiveness of the "Apply for Financing" CTA button across screen orientation changes.

---

## What Was Consciously Not Covered

* **Desktop / Tablet Viewports:** Explicitly ignored viewports above 768px width.
* **Backend API Validation:** Focused purely on client-side UI behavior and visual responsiveness, not validating API payload structures.
* **Full Application Submission:** Stopped short of submitting actual personal data through the final loan application form to prevent generating clutter on stage databases.
* **Desktop Browser Specifics:** Did not test on Safari iOS native browser; relied on Chromium-based mobile emulation for this timebox.

---

## Key Observations & Insights

* **Calculator Touch Target Usability:** The loan term slider handles are tight on small viewports, making precise single-month adjustments via touch dragging challenging compared to using direct text input.
* **Viewport Real Estate & Sticky CTAs:** When the mobile keyboard is triggered to enter custom down payment amounts, it pushes the primary payment recalculation output off-screen, requiring manual keyboard dismissal to view the updated monthly estimate.
* **Filter Overlay Navigation:** Applying filters within the mobile modal cleanly retains state when returning to the main car listing grid, and the dynamic vehicle counter updates smoothly without requiring manual refreshes.