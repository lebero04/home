# Owen Home — interactive room UI

A no-build, GitHub Pages-ready personal home dashboard. The illustrated room is the navigation surface; the kitchen table currently opens **Dinner Schedule** and **Shopping List**.

## Preview locally

Open `preview.html` directly in a browser, or serve this folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy with GitHub Pages

1. Create a GitHub repository and copy the contents of this folder into it.
2. In GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch** and select `main` / root.
4. After GitHub gives you the Pages URL, add your custom domain under **Custom domain**.
5. Point the DNS for `owenleber.com` (or a subdomain such as `home.owenleber.com`) to GitHub Pages following GitHub's current custom-domain instructions.

> Tip: use a subdomain first if `owenleber.com` already hosts something else.

## Files

- `index.html` — room scene + panel markup
- `styles.css` — responsive placement and UI styling
- `app.js` — interactions, editing, local persistence
- `data.js` — September 2026 meal/shopping data from the supplied planner
- `assets/room.png` — room illustration
- `preview.html` — self-contained preview you can open directly
- `.nojekyll` — tells GitHub Pages to serve files as-is

## Data behavior

The supplied meal plan is the default. Dinner edits, checked shopping items, and personal additions are stored in `localStorage`, so no backend is required for V1.

For cross-device sync later, replace the localStorage helpers in `app.js` with Supabase/Firebase/API calls. The visual UI does not need to change.

## Move the kitchen-table hotspot

In `styles.css`, adjust:

```css
.table-hotspot {
  left: 5.7%;
  top: 67%;
  width: 24%;
  height: 16%;
}
```

These are percentages of the image viewport so the control stays attached as the page resizes.

## Suggested next objects

- TV → calendar / upcoming events
- Media console → subscriptions / bills
- Plants → house tasks
- Balcony → weather
- Couch → watch list / entertainment
