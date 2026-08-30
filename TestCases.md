# Test Cases

**Feature:** Vehicle Catalog Search & Filter Matrix

---

### Test Case 1: Filter Catalog by Valid Make and Body Type (Positive Case)
* **Objective:** Verify that selecting a specific make and body type updates the catalog to display relevant vehicle results.
* **Preconditions:** User is on the catalog page (`/automasinu-katalogs`).
* **Steps:**
  1. Open the **Marka** (Make) filter and select **BMW**.
  2. Open the **Virsbūves tips** (Body Type) filter section and select **Sedan**.
 
* **Expected Result:**
  * The vehicle grid updates and displays matching cards.
  * Every displayed vehicle card contains "BMW" in the title and matches the sedan body specification.
  * The browser URL updates to reflect query parameters (e.g., `?makes=BMW&bodyTypes=Sedan`).

---

### Test Case 2: Apply Invalid/Unmatched Filter Combination (Negative Case)
* **Objective:** Verify system behavior when a combination of filters yields zero matching vehicles in inventory.
* **Preconditions:** User is on the catalog page.
* **Steps:**
  1. Select a high-end luxury brand (e.g., **Porsche**).
  2. Apply a conflicting filter like a low max budget (e.g., Max Price: **€2,000**).
  3. Click **Rādīt** (Show Results).
* **Expected Result:**
  * No vehicle cards are displayed in the grid.
  * The page does not crash, freeze, or throw uncaught JavaScript console errors.

---

### Test Case 3: Direct Navigation via Malformed URL Parameters (Negative Case)
* **Objective:** Verify that the catalog handles corrupted or invalid URL query parameters gracefully.
* **Preconditions:** None.
* **Steps:**
  1. Navigate directly to a URL with invalid parameter values:  
     `https://stage.longo.lv/automasinu-katalogs?makes=INVALID_BRAND_123&priceTo=-500`
  2. Observe page loading and filter panel state.
* **Expected Result:**
  * The application sanitizes or ignores the invalid parameters.
  * The user is shown the default catalog or an informative "No results" message.

---

### Test Case 4: Mileage Filter at Maximum Boundary Value (Boundary Case)
* **Objective:** Verify catalog filtering behavior when setting the mileage filter to the maximum allowable boundary limit.
* **Preconditions:** User is on the catalog page.
* **Steps:**
  1. Open the mileage filter options.
  2. Select/enter the upper boundary limit (e.g., **Max Mileage: 300,000 km**).
  3. Apply the filter.
* **Expected Result:**
  * The catalog includes vehicles with odometer readings up to and exactly equal to 300,000 km.
  * Vehicles exceeding 300,000 km are excluded from the grid.
  * Numeric formatting remains consistent (e.g., spaces/commas properly formatted as `300 000 km`).

---

### Test Case 5: Reset Active Filters (Positive Case)
* **Objective:** Verify that clearing applied filters resets the catalog grid back to the default inventory state.
* **Preconditions:** Active filters are applied (e.g., Make: **Audi**, Year: **2020+**).
* **Steps:**
  1. Confirm that filtered results are displayed.
  2. Unclick the filter to select the default filter
* **Expected Result:**
  * All selected checkbox/dropdown UI indicators return to their default unselected states.
  * The URL query parameters are cleared back to `/automasinu-katalogs`.
  * The catalog reloads and displays the full default listing of vehicles.