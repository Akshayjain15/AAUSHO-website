# Ayushi Akshay Urja Shop - Solar & Renewable Business Website

A high-converting, professional, and responsive website designed specifically for solar panel installers, commercial clean energy contractors, and renewable energy businesses.

---

## 🌟 Key Features Included

1. **Brand Story & Company Profile**:
   - **About Section**: Comprehensive company story since 2005, 21+ Years of Experience, Our Mission, Our Vision, Milestones & Achievements, and Why Choose Us.
   - **Customer Social Proof**: Verified homeowner and commercial client reviews with star ratings and bill reduction stats.

2. **Lead Generation & High-Conversion Tools**:
   - **Interactive Solar Savings & ROI Calculator**:
     - Live electricity bill slider with multi-currency support (`₹`, `$`, `€`, `£`, `A$`), defaulting to Indian Rupee (`₹`).
     - Real-time estimates for recommended system size (kW), required roof area, 1st-year savings, 25-year cumulative return, and environmental CO2 offset.
     - One-click **"Lock In This Solar Estimate"** button that automatically pre-populates the consultation inquiry form.
   - **Lead Capture Form**:
     - Captures Full Name, Phone, Email, City/Zip, Property Type, Monthly Bill, and custom notes.
     - Client-side storage (`localStorage`) so no leads are lost even before database integration, with ready-to-use mail notification.

3. **Direct Contact & Conversion Channels**:
   - Clickable direct phone link (`tel:+917985980020`).
   - Clickable email link (`mailto:solargreenpower.ij@gmail.com`).
   - Direct WhatsApp quick chat links (`https://wa.me/917985980020`) with pre-filled message.
   - Floating call & WhatsApp pills for high mobile conversion rates.
   - Comprehensive interactive **FAQ accordion**.

---

## 🚀 How to Run Locally

### Option 1: Instant Browser Preview (Zero Dependencies)
Simply open the `index.html` file in any modern web browser (Google Chrome, Microsoft Edge, Firefox, Safari):
- In Windows Explorer, navigate to:  
  `C:\Users\mailt\.gemini\antigravity\scratch\solar-energy-website`
- Double-click `index.html`.

### Option 2: Run Local Python Web Server
You can serve the website over HTTP with Python:
```powershell
cd C:\Users\mailt\.gemini\antigravity\scratch\solar-energy-website
python -m http.server 3000
```
Then open your browser and visit:  
**`http://localhost:3000`**

---

## 🛠️ Business Profile Details Configured

| Detail | Configured Value |
| :--- | :--- |
| **Business Name** | `Ayushi Akshay Urja Shop` |
| **Phone Number** | `+91 7985980020` (`tel:+917985980020`) |
| **Business Email** | `solargreenpower.ij@gmail.com` |
| **WhatsApp Number**| `917985980020` (`https://wa.me/917985980020`) |

---

## 🌐 How to Deploy for Free

### 1. GitHub Pages (100% Free)
1. Initialize git in this directory:
   ```powershell
   git init
   git add .
   git commit -m "Initial commit for Solar website"
   ```
2. Create a new repository on [GitHub](https://github.com/new).
3. Push your code:
   ```powershell
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
4. On GitHub, go to **Settings > Pages > Branch: `main` > Save**. Your site will be live at `https://<your-username>.github.io/<your-repo-name>`.

### 2. Netlify (Drag & Drop or CLI)
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag and drop the `solar-energy-website` folder onto the page.
3. Your website is instantly live with a free SSL certificate!

### 3. Vercel
1. Install Vercel CLI or connect your GitHub repository at [vercel.com](https://vercel.com).
2. Select the repository and deploy with standard static defaults.
