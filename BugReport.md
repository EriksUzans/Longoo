# Bug Reports

| **Bug ID** | `BUG-001` |
| **Title** | Inconsistent `href` URI structure across localized Header Switcher elements |
| **Preconditions** | User has cleared cookies/session storage and is navigating the site directly without pre-saved language preferences. |

| **Steps to Reproduce** | 1. Navigate to `https://stage.longo.lv/automasinu-katalogs`.<br>2. Inspect the Header Locale Switcher element for English (`EN`) and record the `href` attribute value.<br>3. Click on the English (`EN`) language switcher link.<br>4. Inspect the Header Locale Switcher element for Latvian (`LV`) from the active English page (`https://stage.longo.lv/en/automasinu-katalogs`).<br>5. Compare the target link structure for Latvian (`LV`) against the primary route. |

| **Expected Result** | The locale switcher links should follow a standardized, predictable route schema across all languages (e.g., `/lv/automasinu-katalogs`, `/en/automasinu-katalogs`, `/ru/automasinu-katalogs`) to support deterministic UI routing and automated assertion. |
| **Actual Result** | Route structures are inconsistent depending on the active locale. English routes append `/en/automasinu-katalogs`, whereas switching back to Latvian strips the locale identifier completely or points directly to secondary feature landing pages like `/automasinu-finansejums`. |
| **Severity** | **Medium** |

| **Severity Justification** | Disrupts strict link validation, causes routing edge cases for automated suites, and leads to inconsistent canonical path handling across multi-language SEO routes. |
| **Priority** | **Medium** |
| **Priority Justification** | While users can still switch languages visually, the non-standardized URL patterns break link predictability and can impact search engine indexing across localized pages. |
| **Environment** | Chrome  / Windows 10 / Desktop Viewport (1920x1080) |
| **URL Observed** | `https://stage.longo.lv/automasinu-katalogs` and `https://stage.longo.lv/en/automasinu-katalogs` |
| **Timestamp** | August 29, 2026 at 21:54:49 
| **Evidence** | *Execution trace failure log:* `AssertionError: Timed out retrying after 10000ms: Expected to find element: a.locale-switcher__link[href="/automasinu-finansejums"], but never found it.` |