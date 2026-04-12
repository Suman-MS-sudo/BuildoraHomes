const fs = require('fs');
const path = require('path');

const P = 'https://i.pinimg.com/736x/';

const content = `import { useState } from "react";

type Room = {
  id: string;
  label: string;
  emoji: string;
  cover: string;
  pins: string[];
  tip: string;
};

const ROOMS: Room[] = [
  {
    id: "living",
    label: "Living Room",
    emoji: "\u{1F6CB}\uFE0F",
    cover: "${P}71/df/5c/71df5cf8d237fa43689e0e18f3fe139a.jpg",
    pins: [
      "${P}14/a3/d9/14a3d99bc9866bdaff29f9c746772811.jpg",
      "${P}50/31/d4/5031d477e9f4bb194bb06b8baa08a261.jpg",
      "${P}df/8b/3e/df8b3e1575f9a0fc01b6d233ab3789b3.jpg",
      "${P}66/f6/ba/66f6bad71c3e5c2bcd4efacb48dcdd67.jpg",
      "${P}fb/02/49/fb0249ad53ff08c86c5760bd6c21fe01.jpg",
    ],
    tip: "Indian living rooms often feature rich textures \u2014 brass accents, jali screens, and warm earthy tones.",
  },
  {
    id: "bedroom",
    label: "Bedroom",
    emoji: "\u{1F6CF}\uFE0F",
    cover: "${P}62/60/93/626093dd648746b767d5f175585a7223.jpg",
    pins: [
      "${P}91/38/53/91385371f5ea1b95c9da76b6449b2113.jpg",
      "${P}31/12/69/3112698091e5641eaeba91a6c8ed5e19.jpg",
      "${P}78/c4/24/78c424a14f9947cab20b313ffab30be9.jpg",
      "${P}9e/85/37/9e85372be227611e3dc1b96926febd13.jpg",
      "${P}b1/ee/6c/b1ee6c57ae5cbb975f9b329865505b37.jpg",
    ],
    tip: "Warm lighting, wooden headboards, and handloom throws are signature elements of Indian bedroom design.",
  },
  {
    id: "kitchen",
    label: "Kitchen",
    emoji: "\u{1F373}",
    cover: "${P}30/21/6e/30216e4c8823491138a8d9462e1e8b0a.jpg",
    pins: [
      "${P}47/e0/93/47e093a147bd6c6c34813c934d2512d5.jpg",
      "${P}c3/2f/28/c32f2836dd60137921200928fa2b1075.jpg",
      "${P}30/21/6e/30216e4c8823491138a8d9462e1e8b0a.jpg",
    ],
    tip: "Modular kitchens with granite counters and tall storage units are the most popular choice in Indian homes.",
  },
  {
    id: "bathroom",
    label: "Bathroom",
    emoji: "\u{1F6BF}",
    cover: "${P}89/a2/43/89a2433e8fefe6af5481af6de729c16f.jpg",
    pins: [
      "${P}d3/2b/5a/d32b5a3ff507998a58605622aad9602e.jpg",
      "${P}89/a2/43/89a2433e8fefe6af5481af6de729c16f.jpg",
    ],
    tip: "Anti-skid tiles, concealed fittings, and a separate shower area make Indian bathrooms practical and elegant.",
  },
  {
    id: "dining",
    label: "Dining Room",
    emoji: "\u{1F37D}\uFE0F",
    cover: "${P}80/4f/27/804f2762422c1dfcf7b208b96dd43420.jpg",
    pins: [
      "${P}77/01/d6/7701d6397d92025f75b307c1e7136e4a.jpg",
      "${P}6a/0d/c7/6a0dc7b99af036f46b68c1a26fcde402.jpg",
      "${P}1e/ea/43/1eea4337cb510f193cf0903995e3454f.jpg",
      "${P}c1/91/05/c1910559f7731f1b2f9635694e8026bc.jpg",
      "${P}1a/22/a5/1a22a549a68df2db0eff5f9dfe5a5b7f.jpg",
    ],
    tip: "A 6-seater wooden dining set with a pendant light above is the most-loved Indian family dining setup.",
  },
  {
    id: "kids",
    label: "Kids Room",
    emoji: "\u{1F9F8}",
    cover: "${P}0c/9d/47/0c9d47b2a4f375fd1b634c617d7d82f9.jpg",
    pins: [
      "${P}bf/c5/93/bfc59331f5f71f63d5b4cccf8704fa65.jpg",
      "${P}ea/45/04/ea45043d25a1fc3a416af0faed7394a7.jpg",
      "${P}ba/58/02/ba58028d1961e5249ebfc2ae1cd1f586.jpg",
      "${P}a3/68/6a/a3686a5999eab0891c67874a7cea4624.jpg",
    ],
    tip: "Bunk beds with a study table below, pastel walls, and lots of storage \u2014 a classic Indian kids room.",
  },
  {
    id: "pooja",
    label: "Pooja Room",
    emoji: "\u{1FA94}",
    cover: "${P}f7/f8/9f/f7f89f82033180e237d951cfdc630dd9.jpg",
    pins: [
      "${P}b1/33/5a/b1335a138e08373b4d2e1ba866df55a1.jpg",
      "${P}bf/c7/a7/bfc7a7784195af1ac5d9adbdce0f9d75.jpg",
      "${P}15/9c/e4/159ce4f8691c362c810ee80b08b2d181.jpg",
    ],
    tip: "Marble or wood mandir units with backlit jaali panels and brass diyas are the heart of every Indian home.",
  },
  {
    id: "study",
    label: "Study / Home Office",
    emoji: "\u{1F4DA}",
    cover: "${P}8b/da/06/8bda060c8fac2afeb95c76ef076d0587.jpg",
    pins: [
      "${P}43/ad/db/43addb02863dd9ba97a53d67008237ae.jpg",
      "${P}49/0d/ee/490dee5316647444ec7835f60a67bd26.jpg",
      "${P}8b/da/06/8bda060c8fac2afeb95c76ef076d0587.jpg",
    ],
    tip: "A built-in bookshelf wall, warm desk lamp, and ergonomic chair \u2014 the ideal Indian home study setup.",
  },
  {
    id: "balcony",
    label: "Balcony",
    emoji: "\u{1F33F}",
    cover: "${P}4a/b2/57/4ab257a1c2f2fb1e12818493198ad941.jpg",
    pins: [
      "${P}18/fe/6c/18fe6c0f31caa1af7cd3678a60e20985.jpg",
      "${P}2b/ce/b6/2bceb6be0869a06d48851beae7fda5da.jpg",
      "${P}4a/b2/57/4ab257a1c2f2fb1e12818493198ad941.jpg",
    ],
    tip: "Vertical gardens, terracotta pots, and a cane seating set transform any Indian balcony into a retreat.",
  },
  {
    id: "exterior",
    label: "Home Exterior",
    emoji: "\u{1F3E0}",
    cover: "${P}44/35/ce/4435ce2c5ba3ea43964932a4dae39c06.jpg",
    pins: [
      "${P}d6/44/87/d64487145fe58ec916aa9998eb80fbcb.jpg",
      "${P}58/47/81/584781e4de52b990a8345b2936293df8.jpg",
      "${P}65/85/d7/6585d73b7de715ae9b44f09ef79312c8.jpg",
      "${P}6d/60/a2/6d60a267d5fb546f025c0fb5f7a5baae.jpg",
      "${P}e7/8f/61/e78f61b61b3e75c05f866339aa6ce4b8.jpg",
    ],
    tip: "Stone cladding, double-height entrance foyers, and a covered porch are hallmarks of South Indian homes.",
  },
];

export default function PlannerPage() {
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  return (
    <>
      {/* \u2500\u2500 HERO \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */}
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
            Opens in a new tab \u2014 free, no account needed
          </p>
        </div>
      </section>

      {/* \u2500\u2500 ROOM GALLERY \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */}
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

      {/* \u2500\u2500 BOTTOM CTA \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */}
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

      {/* \u2500\u2500 ROOM MODAL \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */}
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

      {/* \u2500\u2500 LIGHTBOX \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */}
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
            src={lightboxImg}
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

const outPath = path.join(__dirname, 'src', 'PlannerPage.tsx');
fs.writeFileSync(outPath, content, 'utf8');
console.log('PlannerPage.tsx written successfully with Pinterest images.');
