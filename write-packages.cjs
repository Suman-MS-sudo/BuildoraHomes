const fs = require('fs');
const path = require('path');

let src = fs.readFileSync(path.join('src', 'App.tsx'), 'utf8');

// ── 1. PACKAGES constant ─────────────────────────────────────────────────────
const PACKAGES_CODE = `
const PACKAGES = [
  {
    id: "starter", tag: "Package 1", name: "Starter", price: "₹1,799",
    iot: false, popular: false, badge: null as string | null,
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80",
    desc: "Solid entry-level build with load-bearing structure and ISI-certified materials — ideal for budget-conscious first builds.",
    specs: [
      { cat: "Structure & Civil", items: [["Structure","Load Bearing"],["Brick","Solid Block"],["Concrete","M20 Grade"],["Cement","Priya / Maha or Equal Brand"],["Steel","Pulkit or Equal"],["Sand","M-Sand / P-Sand"],["Basement Height","3 ft"]] },
      { cat: "Plastering", items: [["Interior","Full wall area"],["Exterior","Full wall area"]] },
      { cat: "Electrical & Plumbing", items: [["Wiring","Polycab / Hosper ISI"],["Switches","Anchor / Hosper"],["Plumbing","ISI / ISO Certified"]] },
      { cat: "Water & Door Frames", items: [["Water Tank","1,000 L — Aqua-Tech / Sintex"],["Window & Door Frames","Malaysian Teak Wood"]] },
      { cat: "Flooring & Tiles", items: [["Main Flooring","Ceramic up to ₹50/sqft"],["Kitchen Wall Tiles (3 ft ht)","Up to ₹35/sqft"],["Bathroom Wall Tiles (7 ft ht)","Up to ₹35/sqft"],["Bathroom Flooring","Up to ₹35/sqft"]] },
      { cat: "Bathroom", items: [["Bathroom Door","Up to ₹2,500"],["Fixtures per Unit","Up to ₹5,000"]] },
      { cat: "Finishes", items: [["Handrails","MS Handrails & Parapet Walls"],["Wall Putty","Single coat — JK / Birla"],["Painting","Single coat Asian Paints — Int. & Ext."],["False Ceiling","Not included"]] },
      { cat: "Kitchen & Loft", items: [["Modular Kitchen / Loft","Open Cuddapah Slabs"]] },
    ],
  },
  {
    id: "classic", tag: "Package 2", name: "Classic", price: "₹1,999",
    iot: false, popular: false, badge: null as string | null,
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
    desc: "AAC block framed structure with ARS Fe550D steel, double-coat finishes, and Malaysian teak frames — a quality step up.",
    specs: [
      { cat: "Structure & Civil", items: [["Structure","Framed Structure"],["Brick","AAC Block"],["Concrete","M20 Grade"],["Cement","Chettinad / Coromental or Equal"],["Steel","ARS Fe550D"],["Sand","M-Sand / P-Sand"],["Basement Height","3 ft"]] },
      { cat: "Plastering", items: [["Interior","Full wall area"],["Exterior","Full wall area"]] },
      { cat: "Electrical & Plumbing", items: [["Wiring","Polycab / Hosper ISI"],["Switches","Anchor / Hosper"],["Plumbing","ISI / ISO Certified"]] },
      { cat: "Water & Door Frames", items: [["Water Tank","1,000 L — Aqua-Tech / Sintex"],["Window & Door Frames","Malaysian Teak Wood"]] },
      { cat: "Flooring & Tiles", items: [["Main Flooring","Ceramic up to ₹60/sqft"],["Kitchen Wall Tiles (3 ft ht)","Up to ₹45/sqft"],["Bathroom Wall Tiles (7 ft ht)","Up to ₹35/sqft"],["Bathroom Flooring","Up to ₹35/sqft"]] },
      { cat: "Bathroom", items: [["Bathroom Door","Up to ₹2,500"],["Fixtures per Unit","Up to ₹8,000"]] },
      { cat: "Finishes", items: [["Handrails","MS Handrails & Parapet Walls"],["Wall Putty","Double coat — JK / Birla"],["Painting","Double coat Asian Paints — Int. & Ext."],["False Ceiling","Not included"]] },
      { cat: "Kitchen & Loft", items: [["Modular Kitchen / Loft","Open Cuddapah Slabs"]] },
    ],
  },
  {
    id: "premium", tag: "Package 3", name: "Premium", price: "₹2,299",
    iot: false, popular: true, badge: "Most Popular",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    desc: "Chamber brick framed structure with JSW Fe550D steel, Dalmia cement, upgraded tiles, teak frames, and RCC double-coat finish.",
    specs: [
      { cat: "Structure & Civil", items: [["Structure","Framed Structure"],["Brick","Chamber Bricks"],["Concrete","M20 Grade"],["Cement","Dalmia or Equal Brand"],["Steel","JSW Fe550D"],["Sand","M-Sand / P-Sand"],["Basement Height","3 ft"]] },
      { cat: "Plastering", items: [["Interior","Full wall area"],["Exterior","Full wall area"]] },
      { cat: "Electrical & Plumbing", items: [["Wiring","Polycab / Hosper ISI"],["Switches","Anchor / Hosper"],["Plumbing","ISI / ISO Certified"]] },
      { cat: "Water & Door Frames", items: [["Water Tank","1,000 L — Aqua-Tech / Sintex"],["Window & Door Frames","Teak Wood"]] },
      { cat: "Flooring & Tiles", items: [["Main Flooring","Ceramic up to ₹70/sqft"],["Kitchen Wall Tiles (3 ft ht)","Up to ₹45/sqft"],["Bathroom Wall Tiles (7 ft ht)","Up to ₹45/sqft"],["Bathroom Flooring","Up to ₹45/sqft"]] },
      { cat: "Bathroom", items: [["Bathroom Door","Up to ₹3,500"],["Fixtures per Unit","Up to ₹8,000"]] },
      { cat: "Finishes", items: [["Handrails","MS Handrails & Parapet Walls"],["Wall Putty","Double coat — JK / Birla (RCC)"],["Painting","Double coat Asian Paints (RCC)"],["False Ceiling","Not included"]] },
      { cat: "Kitchen & Loft", items: [["Modular Kitchen / Loft","Open Cuddapah Slabs"]] },
    ],
  },
  {
    id: "smarthome", tag: "Package 4", name: "Smart Home", price: "₹2,499",
    iot: true, popular: false, badge: null as string | null,
    img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop&q=80",
    desc: "Wire-cut brick with TATA steel, Ultratech cement, granite flooring, SS glass railings, false ceiling, PVC modular kitchen, and IoT smart home pre-wiring.",
    specs: [
      { cat: "Structure & Civil", items: [["Structure","Framed Structure"],["Brick","Wire Cut Bricks"],["Concrete","M20 Grade"],["Cement","Ultratech"],["Steel","TATA Fe550D"],["Sand","M-Sand / P-Sand"],["Basement Height","3 ft"]] },
      { cat: "Plastering", items: [["Interior","Full wall area"],["Exterior","Full wall area"]] },
      { cat: "Electrical & Plumbing", items: [["Wiring","Polycab / Hosper ISI"],["Switches","Anchor / Hosper"],["Plumbing","ISI / ISO Certified"]] },
      { cat: "Water & Door Frames", items: [["Water Tank","2,000 L — Aqua-Tech / Sintex"],["Window & Door Frames","Teak Wood"]] },
      { cat: "Flooring & Tiles", items: [["Main Flooring","Granite up to ₹95/sqft (factory)"],["Kitchen Wall Tiles (3 ft ht)","Up to ₹55/sqft"],["Bathroom Wall Tiles (7 ft ht)","Up to ₹55/sqft"],["Bathroom Flooring","Up to ₹55/sqft"]] },
      { cat: "Bathroom", items: [["Bathroom Door","Up to ₹4,500"],["Fixtures per Unit","Up to ₹15,000"]] },
      { cat: "Finishes", items: [["Handrails","SS Glass Handrails & Parapet Walls"],["Wall Putty","Double coat — JK / Birla"],["Painting","Double coat Asian Paints — Int. & Ext."],["False Ceiling","Hall — up to ₹75/sqft"]] },
      { cat: "Kitchen & Loft", items: [["Modular Kitchen","Open Cuddapah + PVC Modular Unit"],["Shutters / Loft","PVC Waterproof Shutters"]] },
      { cat: "Smart Home (IoT)", items: [["Smart Lighting","App & voice control — pre-wired"],["Climate Control","Smart AC integration ready"],["Security","Smart doorbell & camera ready"],["Control Hub","Mobile app home management"]] },
    ],
  },
  {
    id: "eliteiot", tag: "Package 5", name: "Elite IoT", price: "₹2,999",
    iot: true, popular: false, badge: "Premium Pick",
    img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop&q=80",
    desc: "The pinnacle — TATA steel, Ultratech cement, river sand, granite throughout, full false ceiling, WP plywood kitchen, and complete IoT home automation.",
    specs: [
      { cat: "Structure & Civil", items: [["Structure","Framed Structure"],["Brick","Wire Cut Bricks"],["Concrete","M20 Grade"],["Cement","Ultratech"],["Steel","TATA Fe550D"],["Sand","River Sand (premium grade)"],["Basement Height","3 ft"]] },
      { cat: "Plastering", items: [["Interior","Full wall area"],["Exterior","Full wall area"]] },
      { cat: "Electrical & Plumbing", items: [["Wiring","Polycab / Hosper ISI"],["Switches","Anchor / Hosper"],["Plumbing","ISI / ISO Certified"]] },
      { cat: "Water & Door Frames", items: [["Water Tank","2,000 L — RCC / Brick overhead"],["Window & Door Frames","Teak Wood"]] },
      { cat: "Flooring & Tiles", items: [["Main Flooring","Granite up to ₹110/sqft (factory)"],["Kitchen Wall Tiles (3 ft ht)","Up to ₹60/sqft"],["Bathroom Wall Tiles (7 ft ht)","Up to ₹60/sqft"],["Bathroom Flooring","Up to ₹60/sqft"]] },
      { cat: "Bathroom", items: [["Bathroom Door","Up to ₹6,000"],["Fixtures per Unit","Up to ₹20,000"]] },
      { cat: "Finishes", items: [["Handrails","SS Glass Handrails & Parapet Walls"],["Wall Putty","Double coat — JK / Birla"],["Painting","Double coat Asian Paints — Int. & Ext."],["False Ceiling","Hall + All Bedrooms — up to ₹95/sqft"]] },
      { cat: "Kitchen & Loft", items: [["Modular Kitchen","Open Cuddapah + WP Plywood Modular"],["Shutters / Loft","Waterproof Plywood Shutters"],["Countertop","Premium granite finish"]] },
      { cat: "Smart Home (IoT)", items: [["Full Automation","Lights, AC, locks & appliances"],["Security System","CCTV + smart doorbell + motion sensors"],["Smart Panel","Centralised home management hub"],["Premium App","Scheduling, scenes & energy monitor"]] },
    ],
  },
];

`;

// ── 2. New pricing grid JSX ──────────────────────────────────────────────────
const NEW_PRICING_GRID =
`        <div className="pricing-grid">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={"pricing-card" + (pkg.popular ? " pricing-popular" : "")}
            >
              {pkg.badge && <div className="pricing-badge">{pkg.badge}</div>}
              <div className="pricing-card-img-wrap">
                <img
                  src={pkg.img}
                  alt={pkg.name + " — Buildora Homes"}
                  className="pricing-card-img"
                  loading="lazy"
                />
                <div className="pricing-card-img-overlay">
                  <span className={"pricing-card-tier-tag" + (pkg.popular ? " popular" : "")}>{pkg.tag}</span>
                </div>
              </div>
              <div className="pricing-header">
                <div className="pricing-tier-icon">
                  {pkg.id === "starter"   && <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>}
                  {pkg.id === "classic"   && <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/><line x1="3" y1="9" x2="21" y2="9"/></svg>}
                  {pkg.id === "premium"   && <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>}
                  {pkg.id === "smarthome" && <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 14s.5-2 3-2 3 2 3 2"/><line x1="12" y1="17" x2="12" y2="17.01"/></svg>}
                  {pkg.id === "eliteiot"  && <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>}
                </div>
                {pkg.iot && (
                  <div className="pricing-iot-badge">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><line x1="12" y1="20" x2="12" y2="20.01"/></svg>
                    IoT Smart Home
                  </div>
                )}
                <h3 className="pricing-title">{pkg.name}</h3>
                <div className="pricing-price">
                  <span className="price-amount">{pkg.price}</span>
                  <span className="price-unit">/sq ft</span>
                </div>
                <p className="pricing-desc">{pkg.desc}</p>
              </div>
              <div className="pricing-specs">
                {pkg.specs.map((section) => (
                  <div key={section.cat} className="spec-section">
                    <p className="spec-cat">{section.cat}</p>
                    <ul className="spec-items">
                      {section.items.map((item, idx) => (
                        <li key={idx}>
                          <span className="spec-key">{item[0]}</span>
                          <span className="spec-val">{item[1]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <a href="#client-intake" className="btn-pricing">Get Quote</a>
            </div>
          ))}
        </div>`;

// ── 3. Apply changes ─────────────────────────────────────────────────────────
let result = src;

// Insert PACKAGES before STEPS
result = result.replace('const STEPS = [', PACKAGES_CODE + 'const STEPS = [');

// Replace the entire pricing-grid div
const gridOpen = '        <div className="pricing-grid">';
const gridEndBefore = '\n        <div className="pricing-note">';
const gStart = result.indexOf(gridOpen);
const gEnd   = result.indexOf(gridEndBefore, gStart);
if (gStart === -1 || gEnd === -1) { console.error('Could not find pricing-grid boundaries'); process.exit(1); }
result = result.substring(0, gStart) + NEW_PRICING_GRID + result.substring(gEnd);

// Update section subtitle
result = result.replace(
  'Three clearly defined construction packages — each listing the exact materials and brands used, so you know precisely what you are getting.',
  'Five clearly defined packages — from entry-level to full smart home — each listing exact materials, brands and IoT features with complete spec transparency.'
);

fs.writeFileSync(path.join('src', 'App.tsx'), result, 'utf8');
console.log('App.tsx updated successfully.');
