const fs = require('fs');
const dest = 'e:/HM Constructions/hm-site/src/PlannerPage.tsx';

// All Unsplash URLs use auto=format&fit=crop for reliable delivery
const u = (id, w) => `https://images.unsplash.com/photo-${id}?w=${w || 500}&q=80&auto=format&fit=crop`;

const rooms = [
  {
    id: 'living', label: 'Living Room', emoji: '\u{1F6CB}\uFE0F',
    cover: u('1555041469-a586c61ea9bc', 700),
    pins: [
      u('1586023492125-27b2c045efd7'), u('1567225557594-88d73e55f2cb'),
      u('1554995207-c18c203602cb'),    u('1513694203030-d0ca3ab08f17'),
      u('1600585154526-990dced4db0d'), u('1618219944342-824e40a13285'),
      u('1600121848594-d8644e57abab'), u('1616046229478-9901c5536a45'),
      u('1493809842364-78817add7ffb'),
    ],
    tip: 'Indian living rooms often feature rich textures \u2014 brass accents, jali screens, and warm earthy tones.',
  },
  {
    id: 'bedroom', label: 'Bedroom', emoji: '\u{1F6CF}\uFE0F',
    cover: u('1616594039964-ae9021a400a0', 700),
    pins: [
      u('1540518614846-7eded433c457'), u('1505693416388-ac5ce068fe85'),
      u('1560185127-6ed189bf02f4'),    u('1609766418204-94b375e33767'),
      u('1578683010236-d716f9a3f461'), u('1631049307264-da0ec9d70304'),
      u('1598928636135-d146006ff4be'), u('1615874959474-d609969a20ed'),
      u('1560185008-b033106af5c3'),
    ],
    tip: 'Warm lighting, wooden headboards, and handloom throws are signature elements of Indian bedroom design.',
  },
  {
    id: 'kitchen', label: 'Kitchen', emoji: '\u{1F373}',
    cover: u('1556909114-f6e7ad7d3136', 700),
    pins: [
      u('1556909172-54557c7e4fb7'), u('1484154218962-a197022b5858'),
      u('1565538810643-b5bdb714032a'), u('1600489000022-c2086d79f9d4'),
      u('1505691723518-36a5ac3be353'), u('1571175443880-49e1d25b2bc5'),
      u('1604709177225-055f99402ea3'), u('1556909211-36987daf7b4d'),
      u('1588854337221-4cf9fa96059c'),
    ],
    tip: 'Modular kitchens with granite counters and tall storage units are the most popular choice in Indian homes.',
  },
  {
    id: 'bathroom', label: 'Bathroom', emoji: '\u{1F6BF}',
    cover: u('1552321554-5fefe8c9ef14', 700),
    pins: [
      u('1600566752355-35792bedcfea'), u('1507089947368-19c1da9775ae'),
      u('1584622650111-993a426fbf0a'), u('1565182999561-18d7dc61c393'),
      u('1570069090972-bc78f35aefbb'), u('1556228453-efd6c1ff04f6'),
      u('1531835551805-16d864c8d311'), u('1595658658025-6e08c5f6f0a4'),
      u('1560448204-603b3fc33ddc'),
    ],
    tip: 'Anti-skid tiles, concealed fittings, and a separate shower area make Indian bathrooms practical and elegant.',
  },
  {
    id: 'dining', label: 'Dining Room', emoji: '\u{1F37D}\uFE0F',
    cover: u('1617104678098-de229db51175', 700),
    pins: [
      u('1556742049-0cfed4f6a45d'), u('1583847268964-b28dc8f51f92'),
      u('1595526114035-0d45ed16cfbf'), u('1549187774-b4e9b0445b41'),
      u('1600585154340-be6161a56a0c'), u('1512917774080-9991f1c4c750'),
      u('1501183638710-841dd1904471'), u('1615874969816-f9c1eebbd2e2'),
      u('1577140917170-285929fb55b7'),
    ],
    tip: 'A 6-seater wooden dining set with a pendant light above is the most-loved Indian family dining setup.',
  },
  {
    id: 'kids', label: 'Kids Room', emoji: '\u{1F9F8}',
    cover: u('1555854877-bab0e564b8d5', 700),
    pins: [
      u('1519985176271-adb1088fa94c'), u('1574629810360-7efbbe195018'),
      u('1568605114967-8130f3a36994'), u('1576505461634-9ee04dd25e7d'),
      u('1594968973184-9040a5a79963'), u('1544030100-abe1f7bf7bfc'),
      u('1545239705-1564e58b9e4e'),    u('1531685250784-7569952593d2'),
      u('1575783970733-1aaedde1db74'),
    ],
    tip: 'Bunk beds with a study table below, pastel walls, and lots of storage \u2014 a classic Indian kids room.',
  },
  {
    id: 'pooja', label: 'Pooja Room', emoji: '\u{1FA94}',
    cover: u('1545240994-3877e4b9f2ce', 700),
    pins: [
      u('1572635196237-14b3f281503f'), u('1543946207-39bd91e70ca7'),
      u('1473177104440-6e4c98e073e8'), u('1510812431401-41d2bd2722f3'),
      u('1585771724684-38269d6639fd'), u('1543353071-873256784f7e'),
      u('1605289355680-75fb41239154'), u('1567225557594-88d73e55f2cb'),
      u('1518455027359-f3f8164ba6bd'),
    ],
    tip: 'Marble or wood mandir units with backlit jaali panels and brass diyas are the heart of every Indian home.',
  },
  {
    id: 'study', label: 'Study / Home Office', emoji: '\u{1F4DA}',
    cover: u('1593642632559-0c6d3fc62b89', 700),
    pins: [
      u('1524758631624-e2822e304c36'), u('1497366216548-37526070297c'),
      u('1588776814546-1ffedda8b09d'), u('1542621334-a254cf47733d'),
      u('1562564055-71e051d33c19'),    u('1498243691581-b145c3f54a5a'),
      u('1485988412941-77a35537dae4'), u('1507003211169-0a1dd7228f2d'),
      u('1518455027359-f3f8164ba6bd'),
    ],
    tip: 'A built-in bookshelf wall, warm desk lamp, and ergonomic chair \u2014 the ideal Indian home study setup.',
  },
  {
    id: 'balcony', label: 'Balcony', emoji: '\u{1F33F}',
    cover: u('1598300042247-d088f8ab3a91', 700),
    pins: [
      u('1558618047-3c8c76ca7d13'), u('1416879595882-3373a0480b5b'),
      u('1465146344425-f00d5f5c8f07'), u('1444492417251-9c84a5fa18e0'),
      u('1506439773649-6e0eb8cfb237'), u('1519710165935-8a6b6da28c1e'),
      u('1572120360610-d971b9d7767c'), u('1521747116042-5a810fda9664'),
      u('1556710808-f2a4c3be5db5'),
    ],
    tip: 'Vertical gardens, terracotta pots, and a cane seating set transform any Indian balcony into a retreat.',
  },
  {
    id: 'exterior', label: 'Home Exterior', emoji: '\u{1F3E0}',
    cover: u('1570129477492-45c003edd2be', 700),
    pins: [
      u('1564013799919-ab600027ffc6'), u('1512917774080-9991f1c4c750'),
      u('1600596542815-ffad4c1539a9'), u('1600047509807-ba8f99d2cdde'),
      u('1560518883-ce09059eeffa'),    u('1523217582562-09d0def993a6'),
      u('1625602812206-5ec545ca1231'), u('1487958449943-2429e8be8625'),
      u('1558036117-15d82a90b9b1'),
    ],
    tip: 'Stone cladding, double-height entrance foyers, and a covered porch are hallmarks of South Indian homes.',
  },
];

// ── Render ROOMS array as TS source ─────────────────────────────────────────
const roomsSrc = rooms.map(r => {
  const pinLines = r.pins.map(p => `      "${p}",`).join('\n');
  return `  {\n    id: "${r.id}",\n    label: "${r.label}",\n    emoji: "${r.emoji}",\n    cover: "${r.cover}",\n    pins: [\n${pinLines}\n    ],\n    tip: "${r.tip}",\n  }`;
}).join(',\n');

// ── Full file content ────────────────────────────────────────────────────────
const file = `import { useState } from "react";

type Room = {
  id: string;
  label: string;
  emoji: string;
  cover: string;
  pins: string[];
  tip: string;
};

const ROOMS: Room[] = [
${roomsSrc},
];

export default function PlannerPage() {
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section className="planner-hero-section">
        <div className="planner-hero-inner">
          <p className="section-tag-light">HOME DESIGN INSPIRATION</p>
          <h1 className="planner-h1">
            Plan Every Room of<br />
            <span className="planner-gold">Your Dream Home.</span>
          </h1>
          <p className="planner-hero-sub">
            Browse Indian home design ideas room-by-room, then sketch your own
            floor plan in the free 2D&amp;3D planner.
          </p>
          <a
            href="https://planner5d.com/editor/"
            target="_blank"
            rel="noreferrer"
            className="planner-hero-cta"
          >
            Open 2D / 3D Home Planner \u2197
          </a>
          <p className="planner-hero-note">
            Opens in a new tab &mdash; free, no account needed
          </p>
        </div>
      </section>

      {/* ── ROOM GALLERY ───────────────────────────────────────────── */}
      <section className="room-gallery-section">
        <div className="section-head">
          <p className="section-tag">DESIGN INSPIRATION</p>
          <h2 className="section-h2">Browse room-by-room ideas.</h2>
          <p className="section-sub">
            Click any room to see Indian home design inspiration images.
          </p>
        </div>
        <div className="room-grid">
          {ROOMS.map((room) => (
            <button
              key={room.id}
              className="room-card"
              onClick={() => setActiveRoom(room)}
            >
              <div className="room-card-img-wrap">
                <img
                  src={room.cover}
                  alt={room.label}
                  className="room-card-img"
                  loading="lazy"
                />
                <div className="room-card-overlay">
                  <span className="room-card-view">View Inspiration \u2192</span>
                </div>
              </div>
              <div className="room-card-body">
                <span className="room-card-emoji">{room.emoji}</span>
                <span className="room-card-label">{room.label}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ─────────────────────────────────────────────── */}
      <section className="planner-cta-section">
        <div className="planner-cta-inner">
          <h2 className="planner-cta-h2">Got your ideas? Start designing.</h2>
          <p className="planner-cta-sub">
            Draw your floor plan in the free planner, then share it with us for
            a detailed construction quote within 24&nbsp;hours.
          </p>
          <div className="planner-cta-btns">
            <a
              href="https://planner5d.com/editor/"
              target="_blank"
              rel="noreferrer"
              className="btn-gold"
            >
              Open Home Planner \u2197
            </a>
            <a
              href="https://wa.me/919962580581?text=Hi%2C%20I%20have%20been%20browsing%20home%20design%20ideas%20on%20your%20website%20and%20want%20a%20construction%20quote."
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* ── ROOM MODAL ─────────────────────────────────────────────── */}
      {activeRoom && (
        <div
          className="room-modal-overlay"
          onClick={() => setActiveRoom(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="room-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="room-modal-header">
              <div className="room-modal-title-row">
                <span className="room-modal-emoji">{activeRoom.emoji}</span>
                <h3 className="room-modal-title">
                  {activeRoom.label} \u2014 Design Ideas
                </h3>
              </div>
              <button
                className="room-modal-close"
                onClick={() => setActiveRoom(null)}
                aria-label="Close"
              >
                \u2715
              </button>
            </div>

            <p className="room-modal-tip">\u{1F4A1} {activeRoom.tip}</p>

            <div className="room-modal-pins">
              {activeRoom.pins.map((src, i) => (
                <button
                  key={i}
                  className="room-pin"
                  onClick={() => setLightboxImg(src)}
                  aria-label={"View design " + (i + 1)}
                >
                  <img
                    src={src}
                    alt={activeRoom.label + " design " + (i + 1)}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>

            <div className="room-modal-footer">
              <a
                href="https://planner5d.com/editor/"
                target="_blank"
                rel="noreferrer"
                className="room-modal-plan-btn"
              >
                Design This Room in Planner \u2197
              </a>
              <a
                href="https://wa.me/919962580581?text=Hi%2C%20I%20like%20these%20room%20designs%20from%20Buildora%20Homes.%20Can%20I%20get%20a%20quote%3F"
                target="_blank"
                rel="noreferrer"
                className="room-modal-wa-btn"
              >
                Ask Us for This Look
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── LIGHTBOX ───────────────────────────────────────────────── */}
      {lightboxImg && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightboxImg(null)}
        >
          <button
            className="lightbox-close"
            onClick={() => setLightboxImg(null)}
            aria-label="Close"
          >
            \u2715
          </button>
          <img
            src={lightboxImg.replace("w=500", "w=1200")}
            alt="Design inspiration"
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
`;

fs.writeFileSync(dest, file, 'utf8');
const lines = file.split('\n').length;
console.log('Written', lines, 'lines to PlannerPage.tsx');

// Quick verification
const back = fs.readFileSync(dest, 'utf8');
const emojiLine = back.split('\n').find(l => l.includes('emoji: "') && l.includes('Living'));
console.log('Emoji check:', emojiLine ? emojiLine.trim() : 'NOT FOUND');
