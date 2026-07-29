# Peace and Unity Concert Website — Digital Ticket Edition

This version includes:
- Mobile concert webpage
- Countdown
- Event details
- Directions
- Sharing
- Add-to-calendar
- A downloadable digital ticket with a ticket number

## Important limitation

This GitHub Pages version generates the ticket directly on each visitor's phone. It does **not** maintain a secure central list of claimed tickets or prevent someone from creating another ticket on another device.

Bitly will still count visits/scans to the page.

To centrally count ticket claims and validate tickets at the entrance, the next upgrade requires a small online database/backend such as Supabase or Cloudflare D1.

## Upload to GitHub

Upload all of these files to the repository root:
- index.html
- styles.css
- script.js
- concert-poster.png

Then enable GitHub Pages:
Settings → Pages → Deploy from a branch → main → /(root)
