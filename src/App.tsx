import { useEffect, useRef, useState } from "react";
import IntakePage from "./IntakePage";
import PlannerPage from "./PlannerPage";
import "./App.css";

function useCountUp(target: number, duration = 1600) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      let v = 0;
      const step = Math.ceil(target / (duration / 16));
      const t = setInterval(() => { v += step; if (v >= target) { setVal(target); clearInterval(t); } else setVal(v); }, 16);
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return { val, ref };
}

const SERVICES = [
  { icon: "house",    cat: "Structure",  label: "Building Construction",        desc: "Full civil structure from foundation to roof slab",                price: "From ₹1,999/sq ft (Material & Labour)" },
  { icon: "layers",   cat: "Planning",   label: "Building Planning (2D)",       desc: "Detailed 2D architectural floor & site plans",                    price: "Approx. ₹3/sq ft" },
  { icon: "draft",    cat: "Planning",   label: "Structural Detailed Drawing",  desc: "Complete structural engineering drawings",                        price: "₹8/sq ft" },
  { icon: "elev",     cat: "Planning",   label: "Elevation Design",             desc: "Contemporary facade concepts & 3D renders (G+1)",                 price: "₹3,000 (G+1)" },
  { icon: "civil",    cat: "Structure",  label: "Civil Works",                  desc: "Foundation, columns & structural civil work",                     price: "From ₹600/sq ft (Labour)" },
  { icon: "labour",   cat: "Structure",  label: "Building Labour Works",        desc: "Civil, painting, electrical, plumbing, tiles laying & grill fittings", price: "₹950/sq ft" },
  { icon: "sump",     cat: "Structure",  label: "Sump Construction",            desc: "Underground water sump – 5,000 to 15,000 litres (including tiles)", price: "₹21/sq ft (Material & Labour)" },
  { icon: "septic",   cat: "Structure",  label: "Septic Tank",                  desc: "Septic tank construction – 5,000 to 15,000 litres",               price: "From ₹15/sq ft (Material & Labour)" },
  { icon: "cwall",    cat: "Structure",  label: "Compound Wall",                desc: "6-inch compound wall – strong perimeter security",                price: "₹1,600/running ft (Material & Labour)" },
  { icon: "zap",      cat: "MEP",        label: "Electrical Wiring",            desc: "Polycab ISI-standard electrical wiring – labour only",            price: "₹35/sq ft (Labour)" },
  { icon: "droplet",  cat: "MEP",        label: "Plumbing Work",                desc: "Complete plumbing with ISI-certified fittings – labour only",     price: "₹35/sq ft (Labour)" },
  { icon: "tile",     cat: "Finishes",   label: "Tiles Laying",                 desc: "Floor & wall tile laying with grout finish – labour only",       price: "₹25–₹50/sq ft (Labour)" },
  { icon: "brush",    cat: "Finishes",   label: "Painting",                     desc: "Interior emulsion & exterior weather-coat – labour only",         price: "₹6–₹10/sq ft (Labour)" },
  { icon: "upvc",     cat: "Finishes",   label: "UPVC Windows",                 desc: "Premium UPVC frame windows with glass glazing",                   price: "₹350/sq ft" },
  { icon: "cabinet",  cat: "Finishes",   label: "PVC Cupboard Works",           desc: "Modular PVC cupboards for kitchen, bedroom & storage",            price: "₹200/sq ft" },
  { icon: "consult",  cat: "Planning",   label: "Free Consultation",            desc: "Free site visit & consultation – within Chennai metro limits",    price: "Free" },
];

const TESTIMONIALS = [
  { name: "Rajesh Kumar",  place: "Ambattur, Chennai", stars: 5, text: "Buildora Homes built our 2BHK in just 9 months. Transparent costing, zero surprises, and the quality is outstanding. Highly recommend to anyone planning to build." },
  { name: "Priya Sundar",  place: "Anna Nagar, Chennai", stars: 5, text: "We chose the Smart Home plan and the IoT automation and premium finish exceeded every expectation. Worth every rupee. The team is professional and punctual." },
  { name: "Murugan S.",    place: "Padi, Chennai",      stars: 5, text: "Professional team, clean site management, on-time handover. Our G+1 house turned out exactly as we dreamed. Cannot thank Buildora Homes enough." },
];


const PACKAGES = [
  {
    id: "starter", tag: "Package 1", name: "Starter", price: "₹1,799",
    iot: false, popular: false, badge: null as string | null,
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80",
    desc: "Solid entry-level build with load-bearing structure and ISI-certified materials – ideal for budget-conscious first builds.",
    specs: [
      { cat: "Structure & Civil", items: [["Structure","Load Bearing"],["Brick","Solid Block"],["Concrete","M20 Grade"],["Cement","Priya / Maha or Equal Brand"],["Steel","Pulkit or Equal"],["Sand","M-Sand / P-Sand"],["Basement Height","3 ft"]] },
      { cat: "Plastering", items: [["Interior","Full wall area"],["Exterior","Full wall area"]] },
      { cat: "Electrical & Plumbing", items: [["Wiring","Polycab / Hosper ISI"],["Switches","Anchor / Hosper"],["Plumbing","ISI / ISO Certified"]] },
      { cat: "Water & Door Frames", items: [["Water Tank","1,000 L – Aqua-Tech / Sintex"],["Window & Door Frames","Malaysian Teak Wood"]] },
      { cat: "Flooring & Tiles", items: [["Main Flooring","Ceramic up to ₹50/sqft"],["Kitchen Wall Tiles (3 ft ht)","Up to ₹35/sqft"],["Bathroom Wall Tiles (7 ft ht)","Up to ₹35/sqft"],["Bathroom Flooring","Up to ₹35/sqft"]] },
      { cat: "Bathroom", items: [["Bathroom Door","Up to ₹2,500"],["Fixtures per Unit","Up to ₹5,000"]] },
      { cat: "Finishes", items: [["Handrails","MS Handrails & Parapet Walls"],["Wall Putty","Single coat – JK / Birla"],["Painting","Single coat Asian Paints – Int. & Ext."],["False Ceiling","Not included"]] },
      { cat: "Kitchen & Loft", items: [["Modular Kitchen / Loft","Open Cuddapah Slabs"]] },
    ],
  },
  {
    id: "classic", tag: "Package 2", name: "Classic", price: "₹1,999",
    iot: false, popular: false, badge: null as string | null,
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
    desc: "AAC block framed structure with MCR / GBR Fe550D steel, double-coat finishes, and Malaysian teak frames – a quality step up.",
    specs: [
      { cat: "Structure & Civil", items: [["Structure","Framed Structure"],["Brick","AAC Block"],["Concrete","M20 Grade"],["Cement","Chettinad / Coromental or Equal"],["Steel","MCR / GBR Fe550D"],["Sand","M-Sand / P-Sand"],["Basement Height","3 ft"]] },
      { cat: "Plastering", items: [["Interior","Full wall area"],["Exterior","Full wall area"]] },
      { cat: "Electrical & Plumbing", items: [["Wiring","Polycab / Hosper ISI"],["Switches","Anchor / Hosper"],["Plumbing","ISI / ISO Certified"]] },
      { cat: "Water & Door Frames", items: [["Water Tank","1,000 L – Aqua-Tech / Sintex"],["Window & Door Frames","Malaysian Teak Wood"]] },
      { cat: "Flooring & Tiles", items: [["Main Flooring","Ceramic up to ₹60/sqft"],["Kitchen Wall Tiles (3 ft ht)","Up to ₹45/sqft"],["Bathroom Wall Tiles (7 ft ht)","Up to ₹35/sqft"],["Bathroom Flooring","Up to ₹35/sqft"]] },
      { cat: "Bathroom", items: [["Bathroom Door","Up to ₹2,500"],["Fixtures per Unit","Up to ₹8,000"]] },
      { cat: "Finishes", items: [["Handrails","MS Handrails & Parapet Walls"],["Wall Putty","Double coat – JK / Birla"],["Painting","Double coat Asian Paints – Int. & Ext."],["False Ceiling","Not included"]] },
      { cat: "Kitchen & Loft", items: [["Modular Kitchen / Loft","Open Cuddapah Slabs"]] },
    ],
  },
  {
    id: "premium", tag: "Package 3", name: "Premium", price: "₹2,299",
    iot: false, popular: true, badge: "Most Popular",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    desc: "Chamber brick framed structure with ARS Fe550D steel, Dalmia cement, upgraded tiles, teak frames, and RCC double-coat finish.",
    specs: [
      { cat: "Structure & Civil", items: [["Structure","Framed Structure"],["Brick","Chamber Bricks"],["Concrete","M20 Grade"],["Cement","Dalmia or Equal Brand"],["Steel","ARS Fe550D"],["Sand","M-Sand / P-Sand"],["Basement Height","3 ft"]] },
      { cat: "Plastering", items: [["Interior","Full wall area"],["Exterior","Full wall area"]] },
      { cat: "Electrical & Plumbing", items: [["Wiring","Polycab / Hosper ISI"],["Switches","Anchor / Hosper"],["Plumbing","ISI / ISO Certified"]] },
      { cat: "Water & Door Frames", items: [["Water Tank","1,000 L – Aqua-Tech / Sintex"],["Window & Door Frames","Teak Wood"]] },
      { cat: "Flooring & Tiles", items: [["Main Flooring","Ceramic up to ₹70/sqft"],["Kitchen Wall Tiles (3 ft ht)","Up to ₹45/sqft"],["Bathroom Wall Tiles (7 ft ht)","Up to ₹45/sqft"],["Bathroom Flooring","Up to ₹45/sqft"]] },
      { cat: "Bathroom", items: [["Bathroom Door","Up to ₹3,500"],["Fixtures per Unit","Up to ₹8,000"]] },
      { cat: "Finishes", items: [["Handrails","MS Handrails & Parapet Walls"],["Wall Putty","Double coat – JK / Birla (RCC)"],["Painting","Double coat Asian Paints (RCC)"],["False Ceiling","Not included"]] },
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
      { cat: "Water & Door Frames", items: [["Water Tank","2,000 L – Aqua-Tech / Sintex"],["Window & Door Frames","Teak Wood"]] },
      { cat: "Flooring & Tiles", items: [["Main Flooring","Granite up to ₹95/sqft (factory)"],["Kitchen Wall Tiles (up to ceiling)","Up to ₹55/sqft"],["Bathroom Wall Tiles (up to ceiling)","Up to ₹55/sqft"],["Bathroom Flooring","Up to ₹55/sqft"]] },
      { cat: "Bathroom", items: [["Bathroom Door","Up to ₹4,500"],["Fixtures per Unit","Up to ₹15,000"]] },
      { cat: "Finishes", items: [["Handrails","SS Glass Handrails & Parapet Walls"],["Wall Putty","Double coat – JK / Birla"],["Painting","Double coat Asian Paints – Int. & Ext."],["False Ceiling","Hall – up to ₹75/sqft"]] },
      { cat: "Kitchen & Loft", items: [["Modular Kitchen","Open Cuddapah + PVC Modular Unit"],["Shutters / Loft","PVC Waterproof Shutters"]] },
      { cat: "Smart Home (IoT)", items: [["Smart Lighting","App & voice control – pre-wired"],["Climate Control","Smart AC integration ready"],["Security","Smart doorbell & camera ready"],["Control Hub","Mobile app home management"]] },
    ],
  },
  {
    id: "eliteiot", tag: "Package 5", name: "Elite IoT", price: "₹2,999",
    iot: true, popular: false, badge: "Premium Pick",
    img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop&q=80",
    desc: "The pinnacle – TATA steel, Ultratech cement, river sand, granite throughout, full false ceiling, WP plywood kitchen, and complete IoT home automation.",
    specs: [
      { cat: "Structure & Civil", items: [["Structure","Framed Structure"],["Brick","Wire Cut Bricks"],["Concrete","M20 Grade"],["Cement","Ultratech"],["Steel","TATA Fe550D"],["Sand","River Sand (premium grade)"],["Basement Height","3 ft"]] },
      { cat: "Plastering", items: [["Interior","Full wall area"],["Exterior","Full wall area"]] },
      { cat: "Electrical & Plumbing", items: [["Wiring","Polycab / Hosper ISI"],["Switches","Anchor / Hosper"],["Plumbing","ISI / ISO Certified"]] },
      { cat: "Water & Door Frames", items: [["Water Tank","2,000 L – RCC / Brick overhead"],["Window & Door Frames","Teak Wood"]] },
      { cat: "Flooring & Tiles", items: [["Main Flooring","Granite up to ₹110/sqft (factory)"],["Kitchen Wall Tiles (up to ceiling)","Up to ₹60/sqft"],["Bathroom Wall Tiles (up to ceiling)","Up to ₹60/sqft"],["Bathroom Flooring","Up to ₹60/sqft"]] },
      { cat: "Bathroom", items: [["Bathroom Door","Up to ₹6,000"],["Fixtures per Unit","Up to ₹20,000"]] },
      { cat: "Finishes", items: [["Handrails","SS Glass Handrails & Parapet Walls"],["Wall Putty","Double coat – JK / Birla"],["Painting","Double coat Asian Paints – Int. & Ext."],["False Ceiling","Hall + All Bedrooms – up to ₹95/sqft"]] },
      { cat: "Kitchen & Loft", items: [["Modular Kitchen","Open Cuddapah + WP Plywood Modular"],["Shutters / Loft","Waterproof Plywood Shutters"],["Countertop","Premium granite finish"]] },
      { cat: "Smart Home (IoT)", items: [["Full Automation","Lights, AC, locks & appliances"],["Security System","CCTV + smart doorbell + motion sensors"],["Smart Panel","Centralised home management hub"],["Premium App","Scheduling, scenes & energy monitor"]] },
    ],
  },
];

const STEPS = [
  { n: "01", t: "Free Consultation",  d: "Site visit and requirement mapping with no obligations." },
  { n: "02", t: "Design & Estimate",  d: "Blueprint and transparent line-item cost breakdown." },
  { n: "03", t: "Construction",       d: "Quality-controlled build by in-house specialist teams." },
  { n: "04", t: "Handover",           d: "Snag-free inspection and keys to your dream home." },
];

const PhoneIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.24 1.01L6.6 10.8z"/></svg>
);

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
);
const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
);

export default function App() {
  const yr   = useCountUp(10);
  const proj = useCountUp(150);
  const cli  = useCountUp(200);
  const [menuOpen, setMenuOpen] = useState(false);
  const [svcCat, setSvcCat] = useState("All");
  const [specModal, setSpecModal] = useState<string | null>(null);
  const activePkg = PACKAGES.find(p => p.id === specModal) ?? null;
  const [page, setPage] = useState<'home' | 'intake' | 'planner'>(() => {
    if (typeof window === 'undefined') return 'home';
    const h = window.location.hash;
    return h === '#client-intake' ? 'intake' : h === '#home-planner' ? 'planner' : 'home';
  });
  const close = () => setMenuOpen(false);

  useEffect(() => {
    const onHashChange = () => {
      const h = window.location.hash;
      setPage(h === '#client-intake' ? 'intake' : h === '#home-planner' ? 'planner' : 'home');
      if (h === '#home-planner' || h === '#client-intake') window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <>
      {/* TOP BAR */}
      <div className="topbar">
        <div className="topbar-inner">
          <div className="topbar-left">
            <a href="tel:+919361949901" className="topbar-item topbar-link">
              <PhoneIcon /> +91 93619 49901
            </a>
            <span className="topbar-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              admin@buildorahomes.co.in
            </span>
            <span className="topbar-item topbar-hide-sm">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>
              Mon–Sat: 9AM – 6PM
            </span>
          </div>
          <div className="topbar-right">
            <a href="#" aria-label="Facebook"  className="topbar-social"><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
            <a href="#" aria-label="Instagram" className="topbar-social"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
            <a href="#" aria-label="LinkedIn"  className="topbar-social"><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg></a>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <header className="navbar" id="top">
        <div className="nav-inner">
          <a href="#top" className="nav-logo">
            <img src="/logo Buildora Homes.jpg" alt="Buildora Homes" className="logo-img" />
            <div className="logo-text-group">
              <span className="logo-name">Buildora Homes</span>
              <span className="logo-tagline">Your Dream, Our Commitment</span>
            </div>
          </a>
          <nav className={`nav-links${menuOpen ? " nav-open" : ""}`}>
            <a href="#top"      onClick={close}>Home</a>
            <a href="#about"    onClick={close}>About</a>
            <a href="#pricing"  onClick={close}>Packages</a>
            <a href="#services" onClick={close}>Services</a>
            <a href="#home-planner" onClick={close}>Home Planner</a>
            <a href="#client-intake" onClick={close}>Client Intake</a>
            <a href="#contact"  onClick={close}>Contact</a>
          </nav>
          <a href="tel:+919361949901" className="nav-cta">
            <PhoneIcon /> Get a Quote
          </a>
          <button className="hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>
      </header>

      {page === 'home' ? (
        <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=80')" }} />
        <div className="hero-overlay" />
        <div className="hero-grid-lines" />
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="hero-eyebrow"><span className="eyebrow-line" />Est. 2015 – Cholapuram, Ambattur, Chennai</div>
            <h1 className="hero-h1">Your Dream,<br /><span className="hero-gold">Our Commitment.</span></h1>
            <p className="hero-desc">Your dream home deserves the best – and Buildora Homes delivers it at prices that make sense. From foundation to smart home finish, serving Chennai families for over a decade, on time and on budget.</p>
            <div className="hero-btns">
              <a href="#pricing" className="btn-gold">View Our Packages</a>
              <a href="#client-intake" className="btn-gold">Fill Your Details</a>
              <a href="#contact"  className="btn-ghost">Book Free Consultation</a>
            </div>
            <div className="hero-trust">
              <div className="trust-item"><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /><span>4.9 – 200+ families</span></div>
              <span className="trust-sep" />
              <div className="trust-item"><CheckIcon /><span>ISO Quality Assured</span></div>
            </div>
          </div>
        </div>
        <div className="hero-scroll-cue">
          <span>Scroll</span>
          <span className="scroll-line" />
        </div>
      </section>

      {/* STATS */}
      <section className="stats-bar">
        <div className="stats-inner">
          <div className="stat" ref={yr.ref}><strong>{yr.val}+</strong><span>Years of Excellence</span></div>
          <div className="stat-div" />
          <div className="stat" ref={proj.ref}><strong>{proj.val}+</strong><span>Homes Delivered</span></div>
          <div className="stat-div" />
          <div className="stat" ref={cli.ref}><strong>{cli.val}+</strong><span>Happy Families</span></div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-section" id="about">
        <div className="about-inner">
          <div className="about-img-col">
            <div className="about-img-wrap">
              <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format&fit=crop&q=80" alt="Buildora Homes team" className="about-img" />
              <div className="about-img-2">
                <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&auto=format&fit=crop&q=80" alt="Construction site" />
              </div>
              <div className="about-badge"><strong>10+</strong><span>Years of<br />Excellence</span></div>
            </div>
          </div>
          <div className="about-copy">
            <p className="section-tag">ABOUT BUILDORA HOMES</p>
            <h2 className="section-h2">Your dream home, built with integrity and commitment.</h2>
            <p className="about-text">Buildora Homes is a Chennai-based end-to-end residential construction company with 10+ years of turning client dreams into reality. From foundation to smart home integration – we manage every detail in-house, with zero compromise on quality and full cost transparency.</p>
            <ul className="about-points">
              <li><span className="apoint-icon"><CheckIcon /></span>Transparent pricing – exact cost per sq ft, zero hidden charges</li>
              <li><span className="apoint-icon"><CheckIcon /></span>Dedicated in-house teams for civil, electrical and plumbing</li>
              <li><span className="apoint-icon"><CheckIcon /></span>Smart home and IoT-ready construction packages available</li>
              <li><span className="apoint-icon"><CheckIcon /></span>On-time delivery with quality-controlled snag-free handover</li>
            </ul>
            <div className="about-actions">
              <a href="#contact" className="btn-gold">Start Your Project</a>
              <a href="#pricing" className="btn-text-link">See Packages &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO SECTION */}
      <section className="video-section">
        <div className="vid-slides">
          <div className="vid-slide" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&auto=format&fit=crop&q=75')" }} />
          <div className="vid-slide" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&auto=format&fit=crop&q=75')", animationDelay: '8s' }} />
          <div className="vid-slide" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1590725121839-892b458a74fe?w=1600&auto=format&fit=crop&q=75')", animationDelay: '16s' }} />
        </div>
        <div className="video-overlay" />
        <div className="video-content">
          <p className="section-tag-light">CONSTRUCTION IN ACTION</p>
          <h2 className="video-h2">Your dream, built brick by brick.<br />Our commitment, from day one to handover.</h2>
          <p className="video-sub">Our in-house civil, electrical and plumbing teams work in perfect sync – from foundation to final handover – with no subcontracting and zero quality compromise.</p>
          <a href="#contact" className="btn-gold">Start Your Project</a>
        </div>
      </section>

      {/* PRICING / TARIFFS */}
      <section className="pricing-section" id="pricing">
        <div className="section-head">
          <p className="section-tag">OUR PACKAGES</p>
          <h2 className="section-h2">Transparent pricing,<br />no hidden costs.</h2>
          <p className="section-sub">Five clearly defined packages – from entry-level to full smart home – each listing exact materials, brands and IoT features with complete spec transparency.</p>
        </div>
        <div className="pricing-grid">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={"pricing-card" + (pkg.popular ? " pricing-popular" : "")}
            >
              {pkg.badge && <div className="pricing-badge">{pkg.badge}</div>}
              <div className="pricing-card-img-wrap">
                <img
                  src={pkg.img}
                  alt={pkg.name + " – Buildora Homes"}
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
              <button className="btn-view-specs" onClick={() => setSpecModal(pkg.id)}>
                View Full Specs
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <a href="#client-intake" className="btn-pricing">Get Quote</a>
            </div>
          ))}
        </div>

        {/* -- SPECS MODAL --------------------------------------- */}
        {activePkg && (
          <div className="pkg-modal-overlay" onClick={() => setSpecModal(null)}>
            <div className="pkg-modal" onClick={e => e.stopPropagation()}>
              <button className="pkg-modal-close" onClick={() => setSpecModal(null)} aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
              <div className="pkg-modal-header">
                {activePkg.iot && (
                  <div className="pricing-iot-badge" style={{ marginBottom: '0.5rem' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><line x1="12" y1="20" x2="12" y2="20.01"/></svg>
                    IoT Smart Home
                  </div>
                )}
                <div className="pkg-modal-tag">{activePkg.tag}</div>
                <h3 className="pkg-modal-name">{activePkg.name}</h3>
                <div className="pricing-price">
                  <span className="price-amount">{activePkg.price}</span>
                  <span className="price-unit">/sq ft</span>
                </div>
              </div>
              <div className="pkg-modal-body">
                {activePkg.specs.map((section) => (
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
              <div className="pkg-modal-footer">
                <a href="#client-intake" className="btn-pricing" onClick={() => setSpecModal(null)}>Get Quote for {activePkg.name}</a>
              </div>
            </div>
          </div>
        )}
        <div className="pricing-note">
          <p>*Prices are inclusive of all materials and labour. GST extra. Site conditions may affect final pricing.</p>
          <p>*All packages include civil, electrical, plumbing, painting, and finishing work.</p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-section" id="services">
        <div className="section-head">
          <p className="section-tag">OUR SERVICES</p>
          <h2 className="section-h2">Every stage of your build,<br />handled by specialists.</h2>
        </div>

        {/* Category filter tabs */}
        <div className="svc-tabs-wrap">
          <div className="svc-tabs">
            {[
              { key: "All",       label: "All Services"           },
              { key: "Planning",  label: "Planning & Design"      },
              { key: "Structure", label: "Structure & Civil"      },
              { key: "MEP",       label: "Electrical & Plumbing"  },
              { key: "Finishes",  label: "Finishes"               },
            ].map(tab => (
              <button
                key={tab.key}
                className={`svc-tab${svcCat === tab.key ? " svc-tab-active" : ""}`}
                onClick={() => setSvcCat(tab.key)}
              >
                {tab.label}
                <span className="svc-tab-count">
                  {tab.key === "All" ? SERVICES.length : SERVICES.filter(s => s.cat === tab.key).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="svc-grid">
          {(svcCat === "All" ? SERVICES : SERVICES.filter(s => s.cat === svcCat)).map((s) => (
            <div className="svc-card" key={s.label}>
              <div className="svc-icon-wrap">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {s.icon === "house"   && <g><path d="M3 21h18"/><path d="M5 21V8l7-5 7 5v13"/><path d="M9 21v-6h6v6"/><path d="M5 12h14"/><path d="M5 16h14"/></g>}
                  {s.icon === "layers"  && <g><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18"/><path d="M3 15h9"/><path d="M9 9v12"/><path d="M15 9v6"/><path d="M15 15h6"/></g>}
                  {s.icon === "draft"   && <g><circle cx="12" cy="6" r="2"/><path d="M12 8v4"/><path d="M9 18l3-6 3 6"/><path d="M10.5 15.5h3"/></g>}
                  {s.icon === "elev"    && <g><rect x="2" y="6" width="20" height="15" rx="1"/><path d="M2 12h20"/><rect x="5" y="14" width="3" height="4"/><rect x="10.5" y="8" width="3" height="4"/><rect x="16" y="14" width="3" height="4"/></g>}
                  {s.icon === "civil"   && <g><path d="M4 15h16v2H4z"/><path d="M4 15a8 8 0 0116 0"/><path d="M12 7v8"/><path d="M9 10l3-3 3 3"/></g>}
                  {s.icon === "labour"  && <g><path d="M15 5l4 4-8.5 8.5-4-4L15 5z"/><path d="M14 6l2 2"/><path d="M3 21l4.5-4.5"/><path d="M8 3l2.5 2.5-3 3L5 6z"/></g>}
                  {s.icon === "sump"    && <g><ellipse cx="12" cy="8" rx="8" ry="3"/><path d="M4 8v8c0 1.66 3.58 3 8 3s8-1.34 8-3V8"/><path d="M4 13c0 1.66 3.58 2.5 8 2.5s8-1.34 8-2.5"/><path d="M12 19v2"/><path d="M9 21h6"/></g>}
                  {s.icon === "septic"  && <g><rect x="4" y="9" width="16" height="10" rx="2"/><path d="M12 5v4"/><path d="M4 14h16"/><path d="M8 19v2"/><path d="M16 19v2"/></g>}
                  {s.icon === "cwall"   && <g><path d="M2 20V8h3v12"/><path d="M19 8h3v12"/><path d="M5 20V10h3v10"/><path d="M16 10h3v10"/><path d="M8 15h8"/><path d="M8 18h8"/></g>}
                  {s.icon === "zap"     && <g><rect x="5" y="9" width="14" height="11" rx="2"/><path d="M9 9V6"/><path d="M15 9V6"/><circle cx="12" cy="15" r="1.5"/></g>}
                  {s.icon === "droplet" && <g><rect x="2" y="9" width="20" height="6" rx="3"/><circle cx="12" cy="12" r="2"/><path d="M2 12H0"/><path d="M24 12h-2"/></g>}
                  {s.icon === "faucet"  && <g><path d="M6 21v-5a6 6 0 0112 0v5"/><path d="M6 16h12"/><path d="M12 10V8"/><rect x="9" y="4" width="6" height="4" rx="1"/></g>}
                  {s.icon === "toilet"  && <g><rect x="8" y="2" width="8" height="5" rx="1"/><path d="M6 7h12a6 6 0 010 12H6A6 6 0 016 7z"/><path d="M11 14v2"/><path d="M13 14v2"/></g>}
                  {s.icon === "tile"    && <g><path d="M12 2l5 5-5 5-5-5 5-5z"/><path d="M2 12l5-5 5 5-5 5-5-5z"/><path d="M12 12l5 5-5 5-5-5 5-5z"/><path d="M22 12l-5-5-5 5 5 5 5-5z"/></g>}
                  {s.icon === "brush"   && <g><rect x="2" y="5" width="13" height="7" rx="1"/><path d="M14 8h2a2 2 0 012 2v2"/><path d="M16 12v7"/><rect x="14" y="19" width="4" height="2" rx="1"/></g>}
                  {s.icon === "upvc"    && <g><rect x="2" y="3" width="20" height="18" rx="1.5"/><path d="M12 3v18"/><path d="M2 12h20"/><circle cx="8.5" cy="7.5" r="0.8" fill="currentColor"/><circle cx="15.5" cy="16.5" r="0.8" fill="currentColor"/></g>}
                  {s.icon === "cabinet" && <g><rect x="3" y="2" width="18" height="20" rx="1.5"/><path d="M3 9h18"/><path d="M12 9v13"/><circle cx="8.5" cy="15.5" r="1" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1" fill="currentColor"/></g>}
                  {s.icon === "consult" && <g><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7 8a16 16 0 006.73 6.73l1.49-1.49a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></g>}
                </svg>
              </div>
              <div className="svc-body">
                <div className="svc-body-top">
                  <h3 className="svc-name">{s.label}</h3>
                  <span className="svc-price">{s.price}</span>
                </div>
                <p className="svc-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testi-section">
        <div className="section-head">
          <p className="section-tag">TESTIMONIALS</p>
          <h2 className="section-h2">What our clients say.</h2>
        </div>
        <div className="testi-grid">
          {TESTIMONIALS.map((t) => (
            <div className="testi-card" key={t.name}>
              <div className="testi-stars">
                {Array.from({ length: t.stars }).map((_, i) => <span key={i} className="tstar"><StarIcon /></span>)}
              </div>
              <p className="testi-text">&ldquo;{t.text}&rdquo;</p>
              <div className="testi-footer">
                <div className="testi-avatar">{t.name.charAt(0)}</div>
                <div>
                  <p className="testi-name">{t.name}</p>
                  <p className="testi-place">{t.place}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="process-section" id="process">
        <div className="section-head-dark">
          <p className="section-tag-light">HOW WE WORK</p>
          <h2 className="section-h2-light">From consultation to keys –<br />we handle it all.</h2>
        </div>
        <div className="process-row">
          {STEPS.map((step, i) => (
            <div className="process-card" key={i}>
              <div className="process-num-badge">{step.n}</div>
              <h3 className="process-title">{step.t}</h3>
              <p className="process-desc">{step.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
        </>
      ) : page === 'planner' ? (
        <PlannerPage />
      ) : (
        <IntakePage />
      )}

      <footer className="footer" id="contact">
        <div className="footer-cta-band">
          <div className="footer-cta-inner">
            <div>
              <p className="footer-cta-eyebrow">YOUR DREAM, OUR COMMITMENT</p>
              <h2 className="footer-cta-h2">Let's build your dream home together.</h2>
              <p className="footer-cta-sub">Free consultation. Transparent pricing. No surprises.</p>
            </div>
            <div className="footer-cta-btns">
              <a href="tel:+919361949901" className="btn-cta-dark"><PhoneIcon />Call Now</a>
              <a href="https://wa.me/919361949901" target="_blank" rel="noreferrer" className="btn-wa">WhatsApp</a>
            </div>
          </div>
        </div>
        <div className="footer-main">
          <div className="footer-grid">
            <div className="footer-col footer-brand-col">
              <a href="#top" className="footer-logo-wrap">
                <img src="/logo Buildora Homes.jpg" alt="Buildora Homes" className="logo-img logo-img-footer" />
                <span className="footer-logo-name">Buildora Homes</span>
              </a>
              <p className="footer-about">Your Dream, Our Commitment – building premium homes for Chennai families since 2015. Quality, transparency, and your dream are our mission.</p>
              <div className="footer-socials">
                <a href="#" className="fsoc" aria-label="Facebook"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
                <a href="#" className="fsoc" aria-label="Instagram"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/></svg></a>
                <a href="#" className="fsoc" aria-label="LinkedIn"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg></a>
              </div>
            </div>
            <div className="footer-col">
              <p className="footer-col-title">Quick Links</p>
              <a href="#about">About Us</a>
              <a href="#pricing">Packages &amp; Pricing</a>
              <a href="#services">Services</a>
              <a href="#pricing">Pricing</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer-col">
              <p className="footer-col-title">Services</p>
              <a href="#services">Building Construction</a>
              <a href="#services">Elevation Design</a>
              <a href="#services">Smart Home (IoT)</a>
              <a href="#services">Plastering and Tiles</a>
              <a href="#services">Painting Work</a>
            </div>
            <div className="footer-col">
              <p className="footer-col-title">Get in Touch</p>
              <p>Cholapuram, Ambattur<br />Chennai 600053</p>
              <a href="tel:+919361949901">+91 93619 49901</a>
              <a href="tel:+917538839958">+91 75388 39958</a>
              <a href="mailto:admin@buildorahomes.co.in">admin@buildorahomes.co.in</a>
              <p>Mon–Sat: 9AM – 6PM</p>
            </div>
          </div>
        </div>
        <div className="footer-bar">
          <div className="footer-bar-inner">
            <span>&copy; 2025 Buildora Homes. All rights reserved.</span>
            <button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top ?</button>
          </div>
        </div>
      </footer>

      {/* FLOATING WA – desktop only (hidden on mobile via CSS) */}
      <a href="https://wa.me/919361949901" target="_blank" rel="noreferrer" className="wa-fab" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 32 32" width="26" height="26" fill="currentColor"><path d="M16 2C8.27 2 2 8.27 2 16c0 2.49.65 4.83 1.79 6.86L2 30l7.35-1.76A13.94 13.94 0 0016 30c7.73 0 14-6.27 14-14S23.73 2 16 2zm7.23 19.42c-.3.85-1.77 1.63-2.43 1.73-.65.1-1.48.14-2.38-.15-.55-.17-1.26-.4-2.17-.78-3.82-1.65-6.31-5.5-6.5-5.75-.18-.25-1.5-2-1.5-3.82 0-1.82.95-2.72 1.3-3.1.34-.37.74-.46.99-.46l.7.01c.23 0 .54-.09.84.64.3.74 1.03 2.56 1.12 2.74.09.18.15.39.03.63-.12.24-.18.39-.36.6-.18.22-.38.49-.54.65-.18.18-.37.37-.16.73.22.36.97 1.6 2.08 2.59 1.43 1.27 2.63 1.66 3 1.85.36.18.57.15.78-.09.22-.24.93-1.09 1.18-1.46.25-.37.5-.31.84-.19.34.12 2.15 1.01 2.51 1.2.36.18.6.27.69.42.09.15.09.87-.21 1.72z"/></svg>
      </a>

      {/* MOBILE BOTTOM CONTACT BAR */}
      <div className="mob-bar">
        <a href="tel:+919361949901" className="mob-btn mob-call">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.24 1.01L6.6 10.8z"/></svg>
          Call Now
        </a>
        <a href="https://wa.me/919361949901" target="_blank" rel="noreferrer" className="mob-btn mob-wa">
          <svg viewBox="0 0 32 32" width="18" height="18" fill="currentColor"><path d="M16 2C8.27 2 2 8.27 2 16c0 2.49.65 4.83 1.79 6.86L2 30l7.35-1.76A13.94 13.94 0 0016 30c7.73 0 14-6.27 14-14S23.73 2 16 2zm7.23 19.42c-.3.85-1.77 1.63-2.43 1.73-.65.1-1.48.14-2.38-.15-.55-.17-1.26-.4-2.17-.78-3.82-1.65-6.31-5.5-6.5-5.75-.18-.25-1.5-2-1.5-3.82 0-1.82.95-2.72 1.3-3.1.34-.37.74-.46.99-.46l.7.01c.23 0 .54-.09.84.64.3.74 1.03 2.56 1.12 2.74.09.18.15.39.03.63-.12.24-.18.39-.36.6-.18.22-.38.49-.54.65-.18.18-.37.37-.16.73.22.36.97 1.6 2.08 2.59 1.43 1.27 2.63 1.66 3 1.85.36.18.57.15.78-.09.22-.24.93-1.09 1.18-1.46.25-.37.5-.31.84-.19.34.12 2.15 1.01 2.51 1.2.36.18.6.27.69.42.09.15.09.87-.21 1.72z"/></svg>
          WhatsApp
        </a>
      </div>

    </>
  );
}
