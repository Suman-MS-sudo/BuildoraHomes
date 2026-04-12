$lines = Get-Content "e:\HM Constructions\hm-site\src\App.css"
$good = $lines[0..1583]  # lines 1-1584 (0-indexed 0..1583)
$responsive = @"

/* ── RESPONSIVE ──────────────────────────────────────────── */

/* Tablet (<=1024px) */
@media (max-width: 1024px) {
  .svc-grid    { grid-template-columns: repeat(2,1fr); }
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
  .process-row { grid-template-columns: repeat(2,1fr); }
  .projects-grid { grid-template-columns: repeat(2,1fr); }
  .room-grid { grid-template-columns: repeat(3, 1fr); }
}

/* Mobile (<=768px) */
@media (max-width: 768px) {
  .topbar-hide-sm { display: none; }
  .hero-inner { grid-template-columns: 1fr; gap: 2.5rem; padding: 4rem 1.5rem; }
  .hero-cards { align-items: stretch; }
  .hero-main-card { max-width: 100%; }
  .hero-info-card { max-width: 100%; }
  .about-inner { grid-template-columns: 1fr; gap: 3rem; }
  .about-img-2 { width: 120px; right: -10px; bottom: -12px; }
  .about-badge { top: -14px; left: -10px; }
  .pricing-row { grid-template-columns: 1fr; max-width: 440px; }
  .testi-grid { grid-template-columns: 1fr; max-width: 480px; margin-left: auto; margin-right: auto; }
  .footer-grid { grid-template-columns: 1fr; gap: 2rem; }
  .footer-cta-inner { flex-direction: column; align-items: flex-start; }
  .stats-inner { gap: 1.5rem; }
  .stat { padding: 0 1.2rem; }
  .stat strong { font-size: 2rem; }
  .nav-links {
    display: none;
    position: fixed;
    top: 106px;
    left: 0; right: 0;
    background: #fff;
    flex-direction: column;
    padding: 1rem;
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
    gap: 0.2rem;
    z-index: 200;
    border-bottom: 2px solid var(--gold);
  }
  .nav-links.nav-open { display: flex; }
  .nav-links a { padding: 0.7rem 1rem; width: 100%; text-align: left; border-radius: 6px; }
  .hamburger { display: flex; }
  .nav-cta { display: none; }
  .hero-scroll-cue { display: none; }
  .process-row { grid-template-columns: 1fr 1fr; }
  /* Planner page */
  .planner-hero-section { padding: 3.5rem 1.2rem 3rem; }
  .planner-h1 { font-size: 2.1rem; }
  .room-grid { grid-template-columns: repeat(2, 1fr); gap: 0.85rem; }
  .room-modal { border-radius: 12px 12px 0 0; max-height: 92vh; }
  .room-modal-overlay { align-items: flex-end; padding: 0; }
  .room-modal-pins { grid-template-columns: repeat(2, 1fr); }
  .room-modal-footer { flex-direction: column; }
  .room-modal-plan-btn, .room-modal-wa-btn { justify-content: center; }
}

/* Small mobile (<=520px) */
@media (max-width: 520px) {
  .projects-grid { grid-template-columns: 1fr; }
  .process-row { grid-template-columns: 1fr; }
  .hero-h1 { font-size: 2.4rem; }
  .hero-btns { flex-direction: column; }
  .hero-btns a { text-align: center; justify-content: center; }
  .svc-grid { grid-template-columns: 1fr; }
  .room-grid { grid-template-columns: repeat(2, 1fr); gap: 0.65rem; }
  .planner-h1 { font-size: 1.75rem; }
  .room-card-label { font-size: 0.8rem; }
  .planner-cta-h2 { font-size: 1.65rem; }
  .planner-cta-btns { flex-direction: column; align-items: center; }
  .room-modal-pins { grid-template-columns: repeat(2, 1fr); gap: 0.4rem; }
}

/* ── MOBILE BOTTOM CONTACT BAR ───────────────────────────── */
@media (max-width: 768px) {
  .mob-bar {
    display: flex;
    position: fixed;
    bottom: 0; left: 0; right: 0;
    z-index: 1000;
    height: 52px;
    border-top: 1px solid rgba(255,255,255,0.1);
    box-shadow: 0 -4px 20px rgba(0,0,0,0.18);
  }
  .mob-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    font-family: 'Barlow', sans-serif;
    font-weight: 700;
    font-size: 0.85rem;
    text-decoration: none;
    letter-spacing: 0.02em;
  }
  .mob-call {
    color: #fff;
    background: var(--gold);
    border-right: 1px solid rgba(255,255,255,0.15);
  }
  .mob-wa {
    color: #fff;
    background: #25D366;
  }
}
"@

$result = ($good -join "`n") + $responsive
[System.IO.File]::WriteAllText("e:\HM Constructions\hm-site\src\App.css", $result, [System.Text.Encoding]::UTF8NoBOM)
$linesAfter = (Get-Content "e:\HM Constructions\hm-site\src\App.css").Count
Write-Host "Done. Lines: $linesAfter"
