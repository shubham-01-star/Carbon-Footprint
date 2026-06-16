# [Challenge 3] Carbon Footprint Awareness Platform

## 🌍 Chosen Vertical
**Environment & Sustainability** (Carbon Footprint Awareness Platform)
This platform addresses the urgent need for environmental consciousness by allowing users to understand, track, and ultimately reduce their personal carbon emissions.

## 🏗️ Approach and Logic
The architectural approach bridges deterministic mathematical modeling with dynamic, AI-generated personalization:
1.  **Deterministic Calculation Engine:** We isolated the raw accounting math into a strictly typed utility module (`utils/calculations.ts`). It transforms distinct user variables (weekly miles driven, flight counts, monthly utility spending, dietary habits) into a common normalized unit—annualized kilograms of Carbon Dioxide Equivalent (kg CO2e).
2.  **Modular State Management:** The frontend is orchestrated through a parent controller (`FootprintApp.tsx`), which conditionally swaps the view layer from data collection (`FootprintForm.tsx`) to data visualization (`ResultsDashboard.tsx`) based on state presence, utilizing `Framer Motion` for fluid layout transitions.
3.  **Generative Insights Layer:** Rather than statically mapping text recommendations, we pass the distinct emission category weights to a secure, server-side Next.js route. The Google Gemini model acts as an environmental consultant to synthesize 3 contextually aware, high-impact strategies tailored specifically to the user's largest emission sources.

## ⚙️ How the Solution Works
1.  **Data Intake:** Users provide their behavioral data across three critical categories: Transportation, Home Energy Activity, and Dietary preferences.
2.  **Processing & Validation:** The data is transformed by the calculation utility into annualized values.
3.  **Visualization:** The results are dynamically lazy-loaded into a `Recharts` graphical pie-chart, visually revealing proportioned impacts.
4.  **AI Analysis:** The raw payload safely hits our backend `/api/insights` endpoint where Gemini reviews the exact distribution and returns a JSON array of specific recommendations.
5.  **Graceful Fallbacks:** If API quotas are exceeded or network connectivity fails, the app intercepts the exception and serves standard local recommendations, preventing UI breakage.

## 🤔 Assumptions Made
To ensure the calculator remains accessible and doesn't overwhelm the user with overly-complex tracking logs, we base our baseline calculations on standardized environmental estimates:
- **Transportation:** The average passenger vehicle emits approximately **0.4 kg CO2e per mile**. A typical short/medium-haul flight equates to a static estimate of **1000 kg CO2e**. Year calculations assume 52 weeks of driving behavior.
- **Home Energy:** We proxy energy consumption via financial cost as an accessible UX choice, assuming an approximate **5 kg CO2e per $1** spent on standard grid power monthly (varies heavily by state/country grid, but functions as a stable baseline).
- **Dietary Lifestyle:** Segmented into baseline annualized tiers (Vegan: 800 kg CO2e, Vegetarian: 1200 kg CO2e, Average: 2000 kg CO2e, Meat-Heavy: 3000 kg CO2e).

## 📊 Evaluation Focus Areas

### 1. Code Quality 
- **Type Safety & Structure:** Explicit TypeScript interfaces (`FootprintData`, `CarbonBreakdown`) establish strict boundaries across the stack.
- **Maintainability:** Abstracted logic—calculations live purely in `utils/calculations.ts` and API routes in `app/api`, minimizing cluttered React components. All major components and interfaces are encapsulated.
- **Readability:** Clean destructuring, centralized configuration blocks (e.g. `EMISSION_FACTORS` object map), explicit functions, and consistent styling across the codebase.

### 2. Security 
- **Server-Side Secrets:** Gemini API keys are *strictly* processed server-side via Next.js Route Handlers (`app/api/...`), completely opaque to client payload inspection. 
- **Input Hardening:** The API performs structural layout checks and numeric data validation before hitting model constraints to prevent query injection and payload inflation (`/app/api/insights/route.ts`).

### 3. Efficiency 
- **Lazy Hydration:** Usage of Next.js `dynamic()` lazy-loading logic ensures the heavy `Recharts` SVG charting library is chunked and only fetched *after* the user submits the form.
- **React Optimization:** Minimized re-render cycles by utilizing `React.useMemo` for charting data manipulation, `React.useCallback` for event handlers, and `AbortController` pattern on fetch handlers to quickly discard stale queries or prevent network race conditions.

### 4. Testing 
- **Functional Validation:** Developed integration and unit tests (`FootprintForm.test.tsx` and `calculations.test.ts`) that programmatically validate state flows.
- **Endpoint Guardrails:** Created isolated API unit tests (`route.test.ts`) to confirm structural HTTP 400 rejection behaviors against malicious/malformed incoming request objects before processing payload.

### 5. Accessibility 
- **Inclusive Design:** Adherence to Semantic HTML (`<main>`, `<header>`, `<section>`, `<label>`). Label elements are natively linked to input IDs ensuring screen readers read inputs directly.
- **Visual Clarity:** Strict adherence to color contrast recommendations utilizing accessible Slate and Emerald Tailwind color palettes with clearly demarcated separation, typography rhythm, and interaction rings (`focus:ring-emerald-500`).
