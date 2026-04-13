import { useState } from "react";

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
    emoji: "🛋️",
    cover: "https://i.pinimg.com/736x/71/df/5c/71df5cf8d237fa43689e0e18f3fe139a.jpg",
    pins: [
      "https://i.pinimg.com/736x/14/a3/d9/14a3d99bc9866bdaff29f9c746772811.jpg",
      "https://i.pinimg.com/736x/50/31/d4/5031d477e9f4bb194bb06b8baa08a261.jpg",
      "https://i.pinimg.com/736x/df/8b/3e/df8b3e1575f9a0fc01b6d233ab3789b3.jpg",
      "https://i.pinimg.com/736x/66/f6/ba/66f6bad71c3e5c2bcd4efacb48dcdd67.jpg",
      "https://i.pinimg.com/736x/fb/02/49/fb0249ad53ff08c86c5760bd6c21fe01.jpg",
      "https://i.pinimg.com/736x/58/25/e7/5825e75e1b8eba098ab8c5be76445055.jpg",
      "https://i.pinimg.com/736x/e2/28/ea/e228ea6320ed386ced226c6a05d72909.jpg",
      "https://i.pinimg.com/736x/8c/b2/24/8cb22463981836cb125afe6d27cb54bd.jpg",
      "https://i.pinimg.com/736x/a2/7c/a5/a27ca54778a095371fea8986fcf7a065.jpg",
    ],
    tip: "Indian living rooms often feature rich textures — brass accents, jali screens, and warm earthy tones.",
  },
  {
    id: "bedroom",
    label: "Bedroom",
    emoji: "🛏️",
    cover: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&auto=format&fit=crop&q=80",
    pins: [
      "https://i.pinimg.com/736x/91/38/53/91385371f5ea1b95c9da76b6449b2113.jpg",
      "https://i.pinimg.com/736x/31/12/69/3112698091e5641eaeba91a6c8ed5e19.jpg",
      "https://i.pinimg.com/736x/78/c4/24/78c424a14f9947cab20b313ffab30be9.jpg",
      "https://i.pinimg.com/736x/9e/85/37/9e85372be227611e3dc1b96926febd13.jpg",
      "https://i.pinimg.com/736x/b1/ee/6c/b1ee6c57ae5cbb975f9b329865505b37.jpg",
      "https://i.pinimg.com/736x/04/92/b9/0492b91f7fd161b6649a90e64bedbb7d.jpg",
      "https://i.pinimg.com/736x/f3/3d/8a/f33d8a4e6bb35f65a951dffd2106c871.jpg",
      "https://i.pinimg.com/736x/00/33/93/0033939ca7b3e2fc87518164008e5c99.jpg",
      "https://i.pinimg.com/736x/4b/e3/a2/4be3a212859cef4ca1feb310776c3d2c.jpg",
    ],
    tip: "Warm lighting, wooden headboards, and handloom throws are signature elements of Indian bedroom design.",
  },
  {
    id: "kitchen",
    label: "Kitchen",
    emoji: "🍳",
    cover: "https://i.pinimg.com/736x/30/21/6e/30216e4c8823491138a8d9462e1e8b0a.jpg",
    pins: [
      "https://i.pinimg.com/736x/47/e0/93/47e093a147bd6c6c34813c934d2512d5.jpg",
      "https://i.pinimg.com/736x/c3/2f/28/c32f2836dd60137921200928fa2b1075.jpg",
      "https://i.pinimg.com/736x/ad/c1/80/adc1806efa0f10fb1a153d49ab1a70b8.jpg",
      "https://i.pinimg.com/736x/d6/24/b2/d624b2fc0dbc58dadf9ae43fdafb3831.jpg",
      "https://i.pinimg.com/736x/da/a0/74/daa0743ac24d50d4b8e9311df50108c2.jpg",
      "https://i.pinimg.com/736x/54/bb/05/54bb05e99bd91f68b938fbc9027df5d9.jpg",
      "https://i.pinimg.com/736x/d9/45/71/d94571acc49c0a1637f69b2082282a8f.jpg",
      "https://i.pinimg.com/736x/05/af/46/05af46763e3c53d7fb8d5bcbf94e1a09.jpg",
    ],
    tip: "Modular kitchens with granite counters and tall storage units are the most popular choice in Indian homes.",
  },
  {
    id: "bathroom",
    label: "Bathroom",
    emoji: "🚿",
    cover: "https://i.pinimg.com/736x/89/a2/43/89a2433e8fefe6af5481af6de729c16f.jpg",
    pins: [
      "https://i.pinimg.com/736x/d3/2b/5a/d32b5a3ff507998a58605622aad9602e.jpg",
      "https://i.pinimg.com/736x/61/4d/03/614d03ad8da01be597f2c0bc1095cc00.jpg",
      "https://i.pinimg.com/736x/05/5a/90/055a90f5a327ec3451f928516ad6a570.jpg",
      "https://i.pinimg.com/736x/73/47/57/7347576e57740cefc61988b8d33c28a8.jpg",
      "https://i.pinimg.com/736x/9e/eb/86/9eeb8693006710b162d6a5521c2bff05.jpg",
      "https://i.pinimg.com/736x/a8/3f/b3/a83fb3efd0531cc9d254c6ce3970a43b.jpg",
      "https://i.pinimg.com/736x/ae/d6/52/aed6522308047b2e5dca816671960863.jpg",
    ],
    tip: "Anti-skid tiles, concealed fittings, and a separate shower area make Indian bathrooms practical and elegant.",
  },
  {
    id: "dining",
    label: "Dining Room",
    emoji: "🍽️",
    cover: "https://i.pinimg.com/736x/80/4f/27/804f2762422c1dfcf7b208b96dd43420.jpg",
    pins: [
      "https://i.pinimg.com/736x/77/01/d6/7701d6397d92025f75b307c1e7136e4a.jpg",
      "https://i.pinimg.com/736x/6a/0d/c7/6a0dc7b99af036f46b68c1a26fcde402.jpg",
      "https://i.pinimg.com/736x/1e/ea/43/1eea4337cb510f193cf0903995e3454f.jpg",
      "https://i.pinimg.com/736x/c1/91/05/c1910559f7731f1b2f9635694e8026bc.jpg",
      "https://i.pinimg.com/736x/1a/22/a5/1a22a549a68df2db0eff5f9dfe5a5b7f.jpg",
      "https://i.pinimg.com/736x/fc/6b/20/fc6b20510b56b1b2ed9b129f6be869f0.jpg",
      "https://i.pinimg.com/736x/a5/29/69/a52969bae50a2e7d711662e29ad44b88.jpg",
      "https://i.pinimg.com/736x/d7/5f/5f/d75f5f7da2cc5dee04520e3f3fb76b0d.jpg",
    ],
    tip: "A 6-seater wooden dining set with a pendant light above is the most-loved Indian family dining setup.",
  },
  {
    id: "kids",
    label: "Kids Room",
    emoji: "🧸",
    cover: "https://i.pinimg.com/736x/0c/9d/47/0c9d47b2a4f375fd1b634c617d7d82f9.jpg",
    pins: [
      "https://i.pinimg.com/736x/bf/c5/93/bfc59331f5f71f63d5b4cccf8704fa65.jpg",
      "https://i.pinimg.com/736x/ea/45/04/ea45043d25a1fc3a416af0faed7394a7.jpg",
      "https://i.pinimg.com/736x/ba/58/02/ba58028d1961e5249ebfc2ae1cd1f586.jpg",
      "https://i.pinimg.com/736x/a3/68/6a/a3686a5999eab0891c67874a7cea4624.jpg",
      "https://i.pinimg.com/736x/26/89/86/268986605f5ad4b169438b67b5a8fde4.jpg",
      "https://i.pinimg.com/736x/d0/b2/f4/d0b2f464e80b7b91a5f7c893f9d0f880.jpg",
      "https://i.pinimg.com/736x/8a/0e/94/8a0e94d7683d3dcc461194adcee12b50.jpg",
      "https://i.pinimg.com/736x/4b/4a/60/4b4a60af1744b2ec02acf041a30b169a.jpg",
    ],
    tip: "Bunk beds with a study table below, pastel walls, and lots of storage — a classic Indian kids room.",
  },
  {
    id: "pooja",
    label: "Prayer Room",
    emoji: "🙏",
    cover: "https://i.pinimg.com/736x/f7/f8/9f/f7f89f82033180e237d951cfdc630dd9.jpg",
    pins: [
      "https://i.pinimg.com/736x/b1/33/5a/b1335a138e08373b4d2e1ba866df55a1.jpg",
      "https://i.pinimg.com/736x/bf/c7/a7/bfc7a7784195af1ac5d9adbdce0f9d75.jpg",
      "https://i.pinimg.com/736x/15/9c/e4/159ce4f8691c362c810ee80b08b2d181.jpg",
      "https://i.pinimg.com/736x/dc/e5/02/dce502acc895f6fd7b6acfc4723a4183.jpg",
      "https://i.pinimg.com/736x/04/4c/6c/044c6ce94a74333437d1d3f3d73caebb.jpg",
      "https://i.pinimg.com/736x/f1/ab/4d/f1ab4d689bd3de99238b6f6d5ee4c55d.jpg",
      "https://i.pinimg.com/736x/4f/ee/a8/4feea8d963c79c758b32090e51ab2cac.jpg",
      "https://i.pinimg.com/736x/25/71/ac/2571ac78c99bb05023965ef6a31264b6.jpg",
      "https://i.pinimg.com/736x/1c/a8/22/1ca822a7bd0e4b4cd698bbe9b4d113b9.jpg",
      "https://i.pinimg.com/736x/ba/f1/27/baf1272cbbd9ce86888a833378a9a767.jpg",
      "https://i.pinimg.com/736x/fd/83/d1/fd83d14801c43b7328bf4067c0e5c61f.jpg",
      "https://i.pinimg.com/736x/9f/ad/99/9fad99846668a61c8c9bb36590704115.jpg",
    ],
    tip: "Whether a Hindu mandir with brass diyas, a Christian prayer corner with a crucifix, or a Muslim namaaz room with prayer rugs — every Indian home deserves a sacred space.",
  },
  {
    id: "study",
    label: "Study / Home Office",
    emoji: "📚",
    cover: "https://i.pinimg.com/736x/8b/da/06/8bda060c8fac2afeb95c76ef076d0587.jpg",
    pins: [
      "https://i.pinimg.com/736x/43/ad/db/43addb02863dd9ba97a53d67008237ae.jpg",
      "https://i.pinimg.com/736x/49/0d/ee/490dee5316647444ec7835f60a67bd26.jpg",
      "https://i.pinimg.com/736x/75/e2/ec/75e2ecac8c4b18ff92cec78c5a796f0b.jpg",
      "https://i.pinimg.com/736x/f9/6f/bc/f96fbc0451b48d29cd860069ffa6e6c4.jpg",
      "https://i.pinimg.com/736x/9f/4d/09/9f4d095e86fb4af6ed6feb6b364bfe7b.jpg",
      "https://i.pinimg.com/736x/5d/c0/8b/5dc08b90d1a327436a5e926549594525.jpg",
      "https://i.pinimg.com/736x/af/1d/12/af1d122869c075e90896f05ca94d6df6.jpg",
      "https://i.pinimg.com/736x/83/72/17/83721711029d67cc3e66a8b8e025742a.jpg",
    ],
    tip: "A built-in bookshelf wall, warm desk lamp, and ergonomic chair — the ideal Indian home study setup.",
  },
  {
    id: "balcony",
    label: "Balcony",
    emoji: "🌿",
    cover: "https://i.pinimg.com/736x/4a/b2/57/4ab257a1c2f2fb1e12818493198ad941.jpg",
    pins: [
      "https://i.pinimg.com/736x/18/fe/6c/18fe6c0f31caa1af7cd3678a60e20985.jpg",
      "https://i.pinimg.com/736x/2b/ce/b6/2bceb6be0869a06d48851beae7fda5da.jpg",
      "https://i.pinimg.com/736x/b2/19/bb/b219bb94a118734335f5ceae12e686ed.jpg",
      "https://i.pinimg.com/736x/20/0d/2d/200d2d36d88dc27d4a0be573a9cca170.jpg",
      "https://i.pinimg.com/736x/eb/85/ae/eb85ae95c6c7257468f0c8a253efe959.jpg",
      "https://i.pinimg.com/736x/32/75/1e/32751e511b073258f0a8798f01fd4044.jpg",
      "https://i.pinimg.com/736x/1d/a8/89/1da8894941223696dc2a54f84751d8a1.jpg",
    ],
    tip: "Vertical gardens, terracotta pots, and a cane seating set transform any Indian balcony into a retreat.",
  },
  {
    id: "exterior",
    label: "Home Exterior",
    emoji: "🏠",
    cover: "https://i.pinimg.com/736x/44/35/ce/4435ce2c5ba3ea43964932a4dae39c06.jpg",
    pins: [
      "https://i.pinimg.com/736x/d6/44/87/d64487145fe58ec916aa9998eb80fbcb.jpg",
      "https://i.pinimg.com/736x/58/47/81/584781e4de52b990a8345b2936293df8.jpg",
      "https://i.pinimg.com/736x/65/85/d7/6585d73b7de715ae9b44f09ef79312c8.jpg",
      "https://i.pinimg.com/736x/6d/60/a2/6d60a267d5fb546f025c0fb5f7a5baae.jpg",
      "https://i.pinimg.com/736x/e7/8f/61/e78f61b61b3e75c05f866339aa6ce4b8.jpg",
      "https://i.pinimg.com/736x/10/a1/04/10a1042a934d8f598d3e5aa924b4e541.jpg",
      "https://i.pinimg.com/736x/d2/f5/e1/d2f5e1c89b91cfcea355edcfebd4e75a.jpg",
      "https://i.pinimg.com/736x/d5/33/a2/d533a2f246764c0e1fe637b38f833f52.jpg",
      "https://i.pinimg.com/736x/bb/3e/f1/bb3ef184b5346cc811e5e7600d0186b2.jpg",
    ],
    tip: "Stone cladding, double-height entrance foyers, and a covered porch are hallmarks of South Indian homes.",
  },
];

export default function PlannerPage() {
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  return (
    <>
      {/* ── ROOM GALLERY ────────────────────────────────────────────── */}
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
                  <span className="room-card-view">View Inspiration →</span>
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

      {/* ── BOTTOM CTA ─────────────────────────────────────────────────── */}
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
              Open Home Planner ↗
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

      {/* ── ROOM MODAL ───────────────────────────────────────────────────── */}
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
                  {activeRoom.label} — Design Ideas
                </h3>
              </div>
              <button
                className="room-modal-close"
                onClick={() => setActiveRoom(null)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <p className="room-modal-tip">💡 {activeRoom.tip}</p>

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
                Design This Room in Planner ↗
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

      {/* ── LIGHTBOX ─────────────────────────────────────────────────────── */}
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
            ✕
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
