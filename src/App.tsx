import { useEffect, useRef, useState } from "react";
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

const PROJECTS = [
  { img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop&q=80", title: "Contemporary Villa", type: "Smart Home Build", area: "2,800 sq ft", year: "2024" },
  { img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80", title: "Modern Duplex", type: "Residential Build", area: "3,200 sq ft", year: "2024" },
  { img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80", title: "Luxury Independent House", type: "Premium Finish", area: "4,100 sq ft", year: "2023" },
  { img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80", title: "Minimalist Family Home", type: "End-to-End Build", area: "2,100 sq ft", year: "2023" },
  { img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80", title: "IoT Smart Bungalow", type: "Smart Home Build", area: "3,500 sq ft", year: "2025" },
  { img: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&auto=format&fit=crop&q=80", title: "Premium G+1 Residence", type: "Residential Build", area: "2,600 sq ft", year: "2025" },
];

const SERVICES = [
  { icon: "B", label: "Building Construction", desc: "Full civil structure from foundation to roof slab", price: "From Rs 1,800/sq ft" },
  { icon: "E", label: "Elevation Design",      desc: "Contemporary facade concepts and 3D renders",     price: "From Rs 2,500" },
  { icon: "M", label: "Painting Work",         desc: "Interior and exterior premium paint finishing",   price: "From Rs 6,500" },
  { icon: "T", label: "Tiles",                 desc: "PGVT, DGVT, vitrified and ceramic tile laying",  price: "From Rs 120/sq ft" },
  { icon: "P", label: "Plastering Work",       desc: "Smooth machine and hand leveling finish",        price: "From Rs 30/sq ft" },
  { icon: "R", label: "Roof Slab Concrete",    desc: "Material-inclusive RCC slab concrete work",      price: "From Rs 800/sq ft" },
  { icon: "S", label: "Sump & Septic Tank",    desc: "Underground water sump and septic construction", price: "From Rs 13/sq ft" },
  { icon: "L", label: "Electrical & Plumbing", desc: "ISI-grade wiring, earthing and full plumbing",   price: "Included in pack" },
];

const TESTIMONIALS = [
  { name: "Rajesh Kumar",  place: "Ambattur, Chennai", stars: 5, text: "Buildora Homes built our 2BHK in just 9 months. Transparent costing, zero surprises, and the quality is outstanding. Highly recommend to anyone planning to build." },
  { name: "Priya Sundar",  place: "Anna Nagar, Chennai", stars: 5, text: "We chose the Smart Home plan and the IoT automation and premium finish exceeded every expectation. Worth every rupee. The team is professional and punctual." },
  { name: "Murugan S.",    place: "Padi, Chennai",      stars: 5, text: "Professional team, clean site management, on-time handover. Our G+1 house turned out exactly as we dreamed. Cannot thank Buildora Homes enough." },
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
  const sf   = useCountUp(8);
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
    <>
      {/* TOP BAR */}
      <div className="topbar">
        <div className="topbar-inner">
          <div className="topbar-left">
            <a href="tel:+919962580581" className="topbar-item topbar-link">
              <PhoneIcon /> +91 99625 80581
            </a>
            <span className="topbar-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              buildorahomes@gmail.com
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
              <span className="logo-tagline">Luxury Living, Made Affordable</span>
            </div>
          </a>
          <nav className={`nav-links${menuOpen ? " nav-open" : ""}`}>
            <a href="#top"      onClick={close}>Home</a>
            <a href="#about"    onClick={close}>About</a>
            <a href="#projects" onClick={close}>Projects</a>
            <a href="#services" onClick={close}>Services</a>
            <a href="#pricing"  onClick={close}>Pricing</a>
            <a href="#contact"  onClick={close}>Contact</a>
          </nav>
          <a href="tel:+919962580581" className="nav-cta">
            <PhoneIcon /> Get a Quote
          </a>
          <button className="hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=80')" }} />
        <div className="hero-overlay" />
        <div className="hero-grid-lines" />
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="hero-eyebrow"><span className="eyebrow-line" />Est. 2015 — Cholapuram, Ambattur, Chennai</div>
            <h1 className="hero-h1">Luxury Living,<br /><span className="hero-gold">Made Affordable</span><br />For You.</h1>
            <p className="hero-desc">Buildora Homes delivers luxury-grade construction at prices that make sense — from foundation to smart home finish. Serving Chennai families for over a decade, on time and on budget.</p>
            <div className="hero-btns">
              <a href="#projects" className="btn-gold">Explore Our Work</a>
              <a href="#contact"  className="btn-ghost">Book Free Consultation</a>
            </div>
            <div className="hero-trust">
              <div className="trust-item"><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /><span>4.9 — 200+ families</span></div>
              <span className="trust-sep" />
              <div className="trust-item"><CheckIcon /><span>ISO Quality Assured</span></div>
            </div>
          </div>
          <div className="hero-cards">
            <div className="hero-main-card">
              <img src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=700&auto=format&fit=crop&q=85" alt="Modern home by Buildora Homes" className="hero-card-img" />
              <div className="hero-price-badge">
                <span className="hpb-label">Starting from</span>
                <span className="hpb-price">Rs 2,000</span>
                <span className="hpb-unit">/ sq ft</span>
              </div>
            </div>
            <div className="hero-info-card">
              <img src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=300&auto=format&fit=crop&q=80" alt="Smart home" className="hero-info-img" />
              <div className="hero-info-body">
                <p className="hib-tag">New Build · 2025</p>
                <p className="hib-title">IoT Smart Villa</p>
                <p className="hib-area">Rs 2,500 / sq ft</p>
              </div>
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
          <div className="stat-div" />
          <div className="stat" ref={sf.ref}><strong>{sf.val}L+</strong><span>Sq Ft Constructed</span></div>
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
            <h2 className="section-h2">Luxury homes built with integrity, at prices that make sense.</h2>
            <p className="about-text">Buildora Homes is a Chennai-based end-to-end residential construction company with 10+ years of delivering luxury homes at affordable prices. From foundation to smart home integration — we manage every detail in-house, with zero compromise on quality and full cost transparency.</p>
            <ul className="about-points">
              <li><span className="apoint-icon"><CheckIcon /></span>Transparent pricing — exact cost per sq ft, zero hidden charges</li>
              <li><span className="apoint-icon"><CheckIcon /></span>Dedicated in-house teams for civil, electrical and plumbing</li>
              <li><span className="apoint-icon"><CheckIcon /></span>Smart home and IoT-ready construction packages available</li>
              <li><span className="apoint-icon"><CheckIcon /></span>On-time delivery with quality-controlled snag-free handover</li>
            </ul>
            <div className="about-actions">
              <a href="#contact" className="btn-gold">Start Your Project</a>
              <a href="#projects" className="btn-text-link">View Our Work &rarr;</a>
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
          <h2 className="video-h2">Every brick laid with care.<br />Every home built to last.</h2>
          <p className="video-sub">Our in-house civil, electrical and plumbing teams work in perfect sync — from foundation to final handover — with no subcontracting and zero quality compromise.</p>
          <a href="#contact" className="btn-gold">Start Your Project</a>
        </div>
      </section>

      {/* PROJECTS GALLERY */}
      <section className="projects-section" id="projects">
        <div className="projects-inner">
          <div className="section-head-dark">
            <p className="section-tag-light">OUR PORTFOLIO</p>
            <h2 className="section-h2-light">Modern homes we have built.</h2>
            <p className="section-sub-light">Every project reflects our commitment to quality craftsmanship, on-time delivery, and design excellence.</p>
          </div>
          <div className="projects-grid">
            {PROJECTS.map((p) => (
              <div className="project-card" key={p.title}>
                <div className="project-img-wrap">
                  <img src={p.img} alt={p.title} className="project-img" loading="lazy" />
                  <div className="project-img-overlay">
                    <span className="project-type-badge">{p.type}</span>
                  </div>
                </div>
                <div className="project-meta">
                  <p className="project-title">{p.title}</p>
                  <div className="project-details">
                    <span className="project-area">{p.area}</span>
                    <span className="project-year">{p.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-section" id="services">
        <div className="section-head">
          <p className="section-tag">OUR SERVICES</p>
          <h2 className="section-h2">Every stage of your build,<br />handled by specialists.</h2>
        </div>
        <div className="svc-grid">
          {SERVICES.map((s) => (
            <div className="svc-card" key={s.label}>
              <div className="svc-icon-wrap">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {s.icon === "B" && <g><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></g>}
                  {s.icon === "E" && <g><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></g>}
                  {s.icon === "M" && <g><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></g>}
                  {s.icon === "T" && <g><rect x="2" y="2" width="9" height="9" rx="1"/><rect x="13" y="2" width="9" height="9" rx="1"/><rect x="2" y="13" width="9" height="9" rx="1"/><rect x="13" y="13" width="9" height="9" rx="1"/></g>}
                  {s.icon === "P" && <g><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></g>}
                  {s.icon === "R" && <g><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><line x1="3" y1="9" x2="21" y2="9"/></g>}
                  {s.icon === "S" && <g><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></g>}
                  {s.icon === "L" && <g><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></g>}
                </svg>
              </div>
              <h3 className="svc-name">{s.label}</h3>
              <p className="svc-desc">{s.desc}</p>
              <p className="svc-price">{s.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing-section" id="pricing">
        <div className="section-head">
          <p className="section-tag">PACKAGES</p>
          <h2 className="section-h2">Simple, transparent pricing.</h2>
          <p className="section-sub">End-to-end project management and quality guarantee included in all packages.</p>
        </div>
        <div className="pricing-row">
          <div className="plan-card">
            <div className="plan-header">
              <p className="plan-eyebrow">STANDARD</p>
              <h3 className="plan-name">Basic Plan</h3>
              <p className="plan-tagline">All essentials, quality finish</p>
            </div>
            <div className="plan-price-row">
              <span className="plan-cur">Rs</span>
              <span className="plan-num">2,000</span>
              <span className="plan-unit">/ sq ft</span>
            </div>
            <ul className="plan-list">
              <li><CheckIcon />Complete civil construction</li>
              <li><CheckIcon />Standard electrical and plumbing</li>
              <li><CheckIcon />Plastering and tiling</li>
              <li><CheckIcon />Quality inspection and handover</li>
              <li><CheckIcon />1-year post-construction support</li>
            </ul>
            <a href="#contact" className="btn-plan-outline">Get Started</a>
          </div>

          <div className="plan-card plan-dark">
            <div className="plan-popular-badge">Most Popular</div>
            <div className="plan-header">
              <p className="plan-eyebrow plan-eyebrow-gold">PREMIUM</p>
              <h3 className="plan-name plan-name-wt">Smart Home Plan</h3>
              <p className="plan-tagline plan-tagline-dim">Future-ready premium living</p>
            </div>
            <div className="plan-price-row">
              <span className="plan-cur plan-cur-gold">Rs</span>
              <span className="plan-num plan-num-gold">2,500</span>
              <span className="plan-unit plan-unit-dim">/ sq ft</span>
            </div>
            <ul className="plan-list plan-list-wt">
              <li><CheckIcon />Everything in Basic Plan</li>
              <li><CheckIcon />IoT-ready smart wiring</li>
              <li><CheckIcon />Automated lighting and security</li>
              <li><CheckIcon />Premium architecture and finish</li>
              <li><CheckIcon />Future-proof home automation</li>
            </ul>
            <a href="#contact" className="btn-plan-gold">Get Started</a>
          </div>
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
          <h2 className="section-h2-light">From consultation to keys —<br />we handle it all.</h2>
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
      <footer className="footer" id="contact">
        <div className="footer-cta-band">
          <div className="footer-cta-inner">
            <div>
              <p className="footer-cta-eyebrow">READY TO BUILD?</p>
              <h2 className="footer-cta-h2">Let us build your dream home.</h2>
              <p className="footer-cta-sub">Free consultation. Transparent pricing. No surprises.</p>
            </div>
            <div className="footer-cta-btns">
              <a href="tel:+919962580581" className="btn-cta-dark"><PhoneIcon />Call Now</a>
              <a href="https://wa.me/919962580581" target="_blank" rel="noreferrer" className="btn-wa">WhatsApp</a>
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
              <p className="footer-about">Luxury Living, Made Affordable — building premium homes for Chennai families since 2015. Quality, transparency, and your dream are our mission.</p>
              <div className="footer-socials">
                <a href="#" className="fsoc" aria-label="Facebook"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
                <a href="#" className="fsoc" aria-label="Instagram"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/></svg></a>
                <a href="#" className="fsoc" aria-label="LinkedIn"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg></a>
              </div>
            </div>
            <div className="footer-col">
              <p className="footer-col-title">Quick Links</p>
              <a href="#about">About Us</a>
              <a href="#projects">Our Projects</a>
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
              <a href="tel:+919962580581">+91 99625 80581</a>
              <a href="mailto:buildorahomes@gmail.com">buildorahomes@gmail.com</a>
              <p>Mon–Sat: 9AM – 6PM</p>
            </div>
          </div>
        </div>
        <div className="footer-bar">
          <div className="footer-bar-inner">
            <span>&copy; 2025 Buildora Homes. All rights reserved.</span>
            <a href="#top" className="back-top">Back to top &uarr;</a>
          </div>
        </div>
      </footer>

      {/* FLOATING WA */}
      <a href="https://wa.me/919962580581" target="_blank" rel="noreferrer" className="wa-fab" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 32 32" width="26" height="26" fill="currentColor"><path d="M16 2C8.27 2 2 8.27 2 16c0 2.49.65 4.83 1.79 6.86L2 30l7.35-1.76A13.94 13.94 0 0016 30c7.73 0 14-6.27 14-14S23.73 2 16 2zm7.23 19.42c-.3.85-1.77 1.63-2.43 1.73-.65.1-1.48.14-2.38-.15-.55-.17-1.26-.4-2.17-.78-3.82-1.65-6.31-5.5-6.5-5.75-.18-.25-1.5-2-1.5-3.82 0-1.82.95-2.72 1.3-3.1.34-.37.74-.46.99-.46l.7.01c.23 0 .54-.09.84.64.3.74 1.03 2.56 1.12 2.74.09.18.15.39.03.63-.12.24-.18.39-.36.6-.18.22-.38.49-.54.65-.18.18-.37.37-.16.73.22.36.97 1.6 2.08 2.59 1.43 1.27 2.63 1.66 3 1.85.36.18.57.15.78-.09.22-.24.93-1.09 1.18-1.46.25-.37.5-.31.84-.19.34.12 2.15 1.01 2.51 1.2.36.18.6.27.69.42.09.15.09.87-.21 1.72z"/></svg>
      </a>
    </>
  );
}
