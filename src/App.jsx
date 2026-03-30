import { useState, useEffect, useRef } from "react";
import {
    ShoppingBag, X, Plus, Minus, ArrowRight, Zap, Shield,
    RefreshCw, ChevronRight, Star, Sparkles, Check, Lock,
    CreditCard, MapPin, User, Mail, ArrowLeft, CheckCircle
} from "lucide-react";

// ── Data ────────────────────────────────────────────────────────────────────

const PRODUCTS = [
    {
        id: 1, name: "Aura Pro X", category: "Audio", price: 349,
        tag: "Best-seller", accent: "#3b82f6",
        desc: "Son spatial 3D, ANC adaptatif, 40h d'autonomie.",
        emoji: "🎧", size: "large",
    },
    {
        id: 2, name: "Lumen Watch", category: "Wearable", price: 599,
        tag: "Nouveau", accent: "#10b981",
        desc: "Titane brossé, écran AMOLED always-on.",
        emoji: "⌚", size: "medium",
    },
    {
        id: 3, name: "Folio Slim", category: "Accessoire", price: 129,
        tag: "Édition limitée", accent: "#f59e0b",
        desc: "Cuir végétal, compatible MagSafe.",
        emoji: "📱", size: "small",
    },
    {
        id: 4, name: "Node Hub", category: "Connectivité", price: 219,
        tag: "Populaire", accent: "#8b5cf6",
        desc: "7 ports USB-C, charge 140W, design aluminium.",
        emoji: "🔌", size: "small",
    },
    {
        id: 5, name: "Canvas 4K", category: "Moniteur", price: 899,
        tag: "Pro", accent: "#ef4444",
        desc: "27″ IPS 4K, 144Hz, Delta-E < 2.",
        emoji: "🖥️", size: "medium",
    },
    {
        id: 6, name: "KeyForge", category: "Clavier", price: 189,
        tag: "Silencieux", accent: "#06b6d4",
        desc: "Switches optiques, hotswap, RGB per-key.",
        emoji: "⌨️", size: "large",
    },
];

const PARTNERS = [
    "ARCANA", "VAULTED", "MERIDIAN", "PHANTOM", "STRATA", "COVALENT",
    "ORBIS", "PRISM", "NEXIO", "VELA",
];

const WHY_US = [
    {
        icon: <Zap size={20} />, title: "Livraison Express",
        desc: "Expédié sous 24h. Suivi en temps réel.",
    },
    {
        icon: <Shield size={20} />, title: "Garantie 3 ans",
        desc: "Couverture totale, sans conditions.",
    },
    {
        icon: <RefreshCw size={20} />, title: "Retour Gratuit",
        desc: "60 jours pour changer d'avis. Zéro friction.",
    },
];

// ── Utilities ────────────────────────────────────────────────────────────────

function useScrollY() {
    const [y, setY] = useState(0);
    useEffect(() => {
        const h = () => setY(window.scrollY);
        window.addEventListener("scroll", h, { passive: true });
        return () => window.removeEventListener("scroll", h);
    }, []);
    return y;
}

function useInView(ref, threshold = 0.15) {
    const [inView, setInView] = useState(false);
    useEffect(() => {
        if (!ref.current) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setInView(true); },
            { threshold }
        );
        obs.observe(ref.current);
        return () => obs.disconnect();
    }, [ref, threshold]);
    return inView;
}

// ── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({ cartCount, onCartOpen }) {
    const scrollY = useScrollY();
    const blurred = scrollY > 20;

    return (
        <nav
            style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
                transition: "background 0.4s, backdrop-filter 0.4s, border-color 0.4s",
                background: blurred ? "rgba(3,3,3,0.75)" : "transparent",
                backdropFilter: blurred ? "blur(20px) saturate(180%)" : "none",
                borderBottom: blurred ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
            }}
        >
            <div style={{
                maxWidth: 1200, margin: "0 auto",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "0 24px", height: 60,
            }}>
                {/* Logo */}
                <span style={{
                    fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
                    fontWeight: 700, fontSize: 18, letterSpacing: "-0.03em",
                    background: "linear-gradient(135deg, #fff 40%, #a1a1aa)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>
                    LUXŌ
                </span>

                {/* Links */}
                <div style={{ display: "flex", gap: 32, alignItems: "center" }}
                    className="nav-links">
                    {["Produits", "Studio", "À propos"].map(l => (
                        <a key={l} href="#" style={{
                            color: "#a1a1aa", fontSize: 13, fontWeight: 500,
                            letterSpacing: "0.02em", textDecoration: "none",
                            transition: "color 0.2s",
                        }}
                            onMouseEnter={e => e.target.style.color = "#fff"}
                            onMouseLeave={e => e.target.style.color = "#a1a1aa"}
                        >{l}</a>
                    ))}
                </div>

                {/* Cart */}
                <button
                    onClick={onCartOpen}
                    style={{
                        position: "relative", background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10,
                        padding: "8px 14px", cursor: "pointer", display: "flex",
                        alignItems: "center", gap: 8, color: "#fff",
                        transition: "background 0.2s, border-color 0.2s",
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    }}
                >
                    <ShoppingBag size={16} />
                    <span style={{ fontSize: 13, fontWeight: 500 }}>Panier</span>
                    {cartCount > 0 && (
                        <span style={{
                            background: "#3b82f6", color: "#fff", fontSize: 10,
                            fontWeight: 700, borderRadius: 999, minWidth: 18, height: 18,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            padding: "0 4px",
                        }}>{cartCount}</span>
                    )}
                </button>
            </div>

            <style>{`
        @media (max-width: 640px) { .nav-links { display: none !important; } }
      `}</style>
        </nav>
    );
}

// ── Hero ─────────────────────────────────────────────────────────────────────

function Hero({ onShop }) {
    const [visible, setVisible] = useState(false);
    useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

    const fade = (delay) => ({
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s ${delay}s ease, transform 0.8s ${delay}s ease`,
    });

    return (
        <section style={{
            minHeight: "100vh", display: "flex", alignItems: "center",
            justifyContent: "center", padding: "120px 24px 80px",
            position: "relative", overflow: "hidden",
        }}>
            {/* Background glow */}
            <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -60%)",
                width: 700, height: 700, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />
            <div style={{
                position: "absolute", top: "40%", right: "10%",
                width: 300, height: 300, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />

            <div style={{ maxWidth: 760, textAlign: "center", position: "relative" }}>
                {/* Badge */}
                <div style={{
                    ...fade(0.1), display: "inline-flex", alignItems: "center", gap: 8,
                    background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.3)",
                    borderRadius: 999, padding: "6px 16px", marginBottom: 32,
                }}>
                    <Sparkles size={12} color="#3b82f6" />
                    <span style={{
                        fontSize: 12, fontWeight: 600, color: "#3b82f6",
                        letterSpacing: "0.08em", textTransform: "uppercase"
                    }}>
                        Nouveauté 2026
                    </span>
                    <span style={{
                        width: 6, height: 6, borderRadius: "50%", background: "#3b82f6",
                        animation: "pulse 2s infinite",
                    }} />
                </div>

                {/* Headline */}
                <h1 style={{
                    ...fade(0.2),
                    fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
                    fontSize: "clamp(42px, 8vw, 88px)",
                    fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.04em",
                    marginBottom: 24,
                }}>
                    <span style={{ color: "#fff" }}>L'excellence</span>
                    <br />
                    <span style={{
                        background: "linear-gradient(135deg, #3b82f6 0%, #10b981 50%, #3b82f6 100%)",
                        backgroundSize: "200% auto",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                        animation: "shimmer 4s linear infinite",
                    }}>redéfinie.</span>
                </h1>

                {/* Subtitle */}
                <p style={{
                    ...fade(0.35),
                    color: "#a1a1aa", fontSize: "clamp(16px, 2.5vw, 20px)",
                    lineHeight: 1.7, marginBottom: 48, maxWidth: 540, margin: "0 auto 48px",
                }}>
                    Technologie de pointe. Design intemporel. Chaque produit est une œuvre
                    conçue pour durer des décennies.
                </p>

                {/* CTAs */}
                <div style={{
                    ...fade(0.5), display: "flex", gap: 12,
                    justifyContent: "center", flexWrap: "wrap"
                }}>
                    <button onClick={onShop} style={{
                        background: "#3b82f6", color: "#fff", border: "none",
                        borderRadius: 12, padding: "14px 32px", fontSize: 14,
                        fontWeight: 600, cursor: "pointer", display: "flex",
                        alignItems: "center", gap: 8, letterSpacing: "0.01em",
                        transition: "transform 0.2s, box-shadow 0.2s",
                        boxShadow: "0 0 32px rgba(59,130,246,0.3)",
                    }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.boxShadow = "0 0 48px rgba(59,130,246,0.5)";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 0 32px rgba(59,130,246,0.3)";
                        }}
                    >
                        Explorer la collection <ArrowRight size={16} />
                    </button>
                    <button style={{
                        background: "transparent", color: "#fff",
                        border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12,
                        padding: "14px 32px", fontSize: 14, fontWeight: 600,
                        cursor: "pointer", letterSpacing: "0.01em",
                        transition: "background 0.2s, border-color 0.2s",
                    }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                        }}
                    >
                        Voir le studio
                    </button>
                </div>

                {/* Stats row */}
                <div style={{
                    ...fade(0.65), display: "flex", gap: 0, marginTop: 72,
                    justifyContent: "center", borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: 40, flexWrap: "wrap"
                }}>
                    {[["50K+", "Clients satisfaits"], ["4.9★", "Note moyenne"], ["3 ans", "Garantie incluse"]].map(([val, lbl], i) => (
                        <div key={i} style={{
                            textAlign: "center", padding: "0 40px",
                            borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                        }}>
                            <div style={{
                                fontSize: 28, fontWeight: 700, color: "#fff",
                                letterSpacing: "-0.03em"
                            }}>{val}</div>
                            <div style={{
                                fontSize: 12, color: "#71717a", marginTop: 4,
                                letterSpacing: "0.02em"
                            }}>{lbl}</div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }
        @keyframes shimmer { 0%{background-position:0% 50%}100%{background-position:200% 50%} }
      `}</style>
        </section>
    );
}

// ── Product Card ──────────────────────────────────────────────────────────────

function ProductCard({ product, onAdd, style: extStyle = {} }) {
    const [hov, setHov] = useState(false);
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        onAdd(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    return (
        <div
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${hov ? product.accent + "40" : "rgba(255,255,255,0.07)"}`,
                borderRadius: 20, padding: 28, cursor: "pointer",
                transition: "transform 0.35s cubic-bezier(.2,.8,.3,1), box-shadow 0.35s, border-color 0.35s",
                transform: hov ? "translateY(-6px)" : "translateY(0)",
                boxShadow: hov ? `0 20px 60px ${product.accent}20, 0 0 0 1px ${product.accent}20` : "none",
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                ...extStyle,
            }}
        >
            {/* Tag */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                    textTransform: "uppercase", color: product.accent,
                    background: product.accent + "15", border: `1px solid ${product.accent}30`,
                    borderRadius: 6, padding: "3px 10px",
                }}>{product.tag}</span>
                <span style={{ fontSize: 11, color: "#52525b", fontWeight: 500 }}>
                    {product.category}
                </span>
            </div>

            {/* Emoji */}
            <div style={{
                fontSize: 52, textAlign: "center", margin: "24px 0",
                filter: hov ? "drop-shadow(0 0 20px " + product.accent + "60)" : "none",
                transition: "filter 0.35s",
            }}>{product.emoji}</div>

            {/* Info */}
            <div>
                <h3 style={{
                    color: "#fff", fontSize: 18, fontWeight: 700,
                    letterSpacing: "-0.02em", marginBottom: 6
                }}>{product.name}</h3>
                <p style={{
                    color: "#71717a", fontSize: 13, lineHeight: 1.6,
                    marginBottom: 20
                }}>{product.desc}</p>
                <div style={{
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <span style={{
                        color: "#fff", fontSize: 22, fontWeight: 700,
                        letterSpacing: "-0.03em"
                    }}>{product.price} €</span>
                    <button onClick={handleAdd} style={{
                        background: added ? "#10b981" : product.accent,
                        color: "#fff", border: "none", borderRadius: 10,
                        padding: "9px 18px", fontSize: 13, fontWeight: 600,
                        cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                        transition: "background 0.3s, transform 0.2s",
                        transform: hov ? "scale(1.04)" : "scale(1)",
                    }}>
                        {added ? <><Check size={14} /> Ajouté</> : <><Plus size={14} /> Ajouter</>}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── Bento Grid ────────────────────────────────────────────────────────────────

function BentoGrid({ onAdd }) {
    const ref = useRef();
    const inView = useInView(ref);

    // Bento layout: 3 columns, rows mix large/small
    const layouts = [
        { gridColumn: "span 2", gridRow: "span 2", minHeight: 340 }, // id 1 large
        { gridColumn: "span 1", gridRow: "span 1", minHeight: 160 }, // id 2
        { gridColumn: "span 1", gridRow: "span 1", minHeight: 160 }, // id 3
        { gridColumn: "span 1", gridRow: "span 1", minHeight: 160 }, // id 4
        { gridColumn: "span 1", gridRow: "span 2", minHeight: 160 }, // id 5
        { gridColumn: "span 2", gridRow: "span 1", minHeight: 160 }, // id 6
    ];

    return (
        <section ref={ref} style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 120px" }}>
            {/* Section header */}
            <div style={{
                marginBottom: 56, opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(20px)",
                transition: "opacity 0.7s, transform 0.7s",
            }}>
                <span style={{
                    fontSize: 11, color: "#3b82f6", fontWeight: 700,
                    letterSpacing: "0.12em", textTransform: "uppercase"
                }}>
                    Collection 2026
                </span>
                <h2 style={{
                    fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800,
                    color: "#fff", marginTop: 10, letterSpacing: "-0.04em", lineHeight: 1.1
                }}>
                    Chaque détail,<br />
                    <span style={{ color: "#52525b" }}>pensé pour vous.</span>
                </h2>
            </div>

            {/* Grid */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridAutoRows: "auto",
                gap: 16,
            }} className="bento-grid">
                {PRODUCTS.map((p, i) => (
                    <div key={p.id} style={{
                        ...layouts[i],
                        opacity: inView ? 1 : 0,
                        transform: inView ? "none" : "translateY(30px)",
                        transition: `opacity 0.6s ${i * 0.08}s, transform 0.6s ${i * 0.08}s`,
                    }}>
                        <ProductCard product={p} onAdd={onAdd}
                            style={{ height: "100%", boxSizing: "border-box" }} />
                    </div>
                ))}
            </div>

            <style>{`
        @media (max-width: 900px) {
          .bento-grid { grid-template-columns: repeat(2,1fr) !important; }
          .bento-grid > * { grid-column: span 1 !important; grid-row: span 1 !important; }
        }
        @media (max-width: 560px) {
          .bento-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    );
}

// ── Trust Section ─────────────────────────────────────────────────────────────

function TrustSection() {
    const ref = useRef();
    const inView = useInView(ref);
    const trackRef = useRef();

    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;
        let pos = 0;
        const speed = 0.5;
        const animate = () => {
            pos -= speed;
            if (pos <= -el.scrollWidth / 2) pos = 0;
            el.style.transform = `translateX(${pos}px)`;
            requestAnimationFrame(animate);
        };
        const id = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(id);
    }, []);

    return (
        <section ref={ref} style={{ padding: "0 0 120px", overflow: "hidden" }}>
            {/* Partner logos marquee */}
            <div style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                padding: "28px 0", overflow: "hidden",
                background: "rgba(255,255,255,0.01)",
            }}>
                <div ref={trackRef} style={{
                    display: "flex", gap: 64, width: "max-content",
                    alignItems: "center",
                }}>
                    {[...PARTNERS, ...PARTNERS].map((name, i) => (
                        <span key={i} style={{
                            fontSize: 13, fontWeight: 700, letterSpacing: "0.15em",
                            color: "#3f3f46", whiteSpace: "nowrap", textTransform: "uppercase",
                        }}>{name}</span>
                    ))}
                </div>
            </div>

            {/* Why us */}
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px 0" }}>
                <div style={{
                    textAlign: "center", marginBottom: 56,
                    opacity: inView ? 1 : 0,
                    transform: inView ? "none" : "translateY(20px)",
                    transition: "opacity 0.7s 0.2s, transform 0.7s 0.2s",
                }}>
                    <span style={{
                        fontSize: 11, color: "#10b981", fontWeight: 700,
                        letterSpacing: "0.12em", textTransform: "uppercase"
                    }}>
                        Notre engagement
                    </span>
                    <h2 style={{
                        fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800,
                        color: "#fff", marginTop: 10, letterSpacing: "-0.03em"
                    }}>
                        Pourquoi nous choisir ?
                    </h2>
                </div>

                <div style={{
                    display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 20,
                }} className="why-grid">
                    {WHY_US.map((item, i) => (
                        <div key={i} style={{
                            background: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            borderRadius: 18, padding: "36px 32px",
                            opacity: inView ? 1 : 0,
                            transform: inView ? "none" : "translateY(24px)",
                            transition: `opacity 0.6s ${0.3 + i * 0.12}s, transform 0.6s ${0.3 + i * 0.12}s`,
                        }}>
                            <div style={{
                                width: 44, height: 44, borderRadius: 12,
                                background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: "#10b981", marginBottom: 20,
                            }}>{item.icon}</div>
                            <h3 style={{
                                color: "#fff", fontSize: 17, fontWeight: 700,
                                marginBottom: 8, letterSpacing: "-0.02em"
                            }}>{item.title}</h3>
                            <p style={{ color: "#71717a", fontSize: 14, lineHeight: 1.65 }}>
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        @media (max-width: 700px) {
          .why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    );
}

// ── Cart Drawer ───────────────────────────────────────────────────────────────

function CartDrawer({ open, onClose, items, onInc, onDec, onRemove, onCheckout }) {
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

    return (
        <>
            {/* Overlay */}
            <div onClick={onClose} style={{
                position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
                zIndex: 90, opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none",
                transition: "opacity 0.35s", backdropFilter: "blur(4px)",
            }} />

            {/* Drawer */}
            <aside style={{
                position: "fixed", top: 0, right: 0, bottom: 0, width: 400,
                maxWidth: "100vw", zIndex: 100,
                background: "#0a0a0a",
                borderLeft: "1px solid rgba(255,255,255,0.07)",
                transform: open ? "translateX(0)" : "translateX(100%)",
                transition: "transform 0.4s cubic-bezier(.2,.8,.3,1)",
                display: "flex", flexDirection: "column",
            }}>
                {/* Header */}
                <div style={{
                    padding: "24px 24px 20px",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                    <div>
                        <h2 style={{
                            color: "#fff", fontSize: 18, fontWeight: 700,
                            letterSpacing: "-0.02em"
                        }}>Votre panier</h2>
                        <p style={{ color: "#52525b", fontSize: 13, marginTop: 2 }}>
                            {items.length} article{items.length !== 1 ? "s" : ""}
                        </p>
                    </div>
                    <button onClick={onClose} style={{
                        background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 10, width: 36, height: 36, cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#a1a1aa", transition: "background 0.2s",
                    }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                        onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Items */}
                <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
                    {items.length === 0 ? (
                        <div style={{ textAlign: "center", paddingTop: 80 }}>
                            <div style={{ fontSize: 48, marginBottom: 16 }}>🛍️</div>
                            <p style={{ color: "#52525b", fontSize: 14 }}>Votre panier est vide.</p>
                        </div>
                    ) : items.map(item => (
                        <div key={item.id} style={{
                            display: "flex", gap: 16, padding: "18px 0",
                            borderBottom: "1px solid rgba(255,255,255,0.05)",
                            alignItems: "center",
                        }}>
                            <div style={{
                                width: 54, height: 54, borderRadius: 12, flexShrink: 0,
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.07)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 26,
                            }}>{item.emoji}</div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{
                                    color: "#fff", fontSize: 14, fontWeight: 600,
                                    letterSpacing: "-0.01em", marginBottom: 2
                                }}>{item.name}</div>
                                <div style={{ color: "#52525b", fontSize: 12 }}>{item.category}</div>
                                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
                                    <button onClick={() => onDec(item.id)} style={{
                                        width: 26, height: 26, borderRadius: 6, border: "1px solid rgba(255,255,255,0.1)",
                                        background: "transparent", color: "#a1a1aa", cursor: "pointer",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                    }}><Minus size={12} /></button>
                                    <span style={{
                                        color: "#fff", fontSize: 14, fontWeight: 600,
                                        minWidth: 20, textAlign: "center"
                                    }}>{item.qty}</span>
                                    <button onClick={() => onInc(item.id)} style={{
                                        width: 26, height: 26, borderRadius: 6, border: "1px solid rgba(255,255,255,0.1)",
                                        background: "transparent", color: "#a1a1aa", cursor: "pointer",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                    }}><Plus size={12} /></button>
                                </div>
                            </div>
                            <div style={{ textAlign: "right", flexShrink: 0 }}>
                                <div style={{ color: "#fff", fontSize: 15, fontWeight: 700 }}>
                                    {item.price * item.qty} €
                                </div>
                                <button onClick={() => onRemove(item.id)} style={{
                                    marginTop: 8, background: "none", border: "none",
                                    color: "#3f3f46", cursor: "pointer", fontSize: 11, padding: 0,
                                    transition: "color 0.2s",
                                }}
                                    onMouseEnter={e => e.target.style.color = "#ef4444"}
                                    onMouseLeave={e => e.target.style.color = "#3f3f46"}
                                >Retirer</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div style={{
                        padding: 24, borderTop: "1px solid rgba(255,255,255,0.06)",
                    }}>
                        <div style={{
                            display: "flex", justifyContent: "space-between",
                            marginBottom: 6
                        }}>
                            <span style={{ color: "#71717a", fontSize: 14 }}>Sous-total</span>
                            <span style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>
                                {subtotal} €
                            </span>
                        </div>
                        <div style={{
                            display: "flex", justifyContent: "space-between",
                            marginBottom: 20
                        }}>
                            <span style={{ color: "#71717a", fontSize: 14 }}>Livraison</span>
                            <span style={{ color: "#10b981", fontSize: 14, fontWeight: 600 }}>Gratuite</span>
                        </div>
                        <div style={{
                            display: "flex", justifyContent: "space-between",
                            borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16, marginBottom: 20,
                        }}>
                            <span style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>Total</span>
                            <span style={{
                                color: "#fff", fontSize: 20, fontWeight: 800,
                                letterSpacing: "-0.02em"
                            }}>{subtotal} €</span>
                        </div>
                        <button onClick={onCheckout} style={{
                            width: "100%", background: "#3b82f6", color: "#fff",
                            border: "none", borderRadius: 12, padding: "15px",
                            fontSize: 14, fontWeight: 700, cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                            letterSpacing: "0.01em",
                            transition: "background 0.2s",
                            boxShadow: "0 0 24px rgba(59,130,246,0.3)",
                        }}
                            onMouseEnter={e => e.currentTarget.style.background = "#2563eb"}
                            onMouseLeave={e => e.currentTarget.style.background = "#3b82f6"}
                        >
                            Commander maintenant <ChevronRight size={16} />
                        </button>
                        <p style={{
                            textAlign: "center", marginTop: 12, color: "#3f3f46",
                            fontSize: 11, display: "flex", alignItems: "center",
                            justifyContent: "center", gap: 4
                        }}>
                            <Shield size={11} /> Paiement 100% sécurisé — SSL
                        </p>
                    </div>
                )}
            </aside>
        </>
    );
}

// ── Checkout Page (paiement à la livraison) ───────────────────────────────────

function CheckoutPage({ items, onBack, onSuccess }) {
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        firstName: "", lastName: "", email: "",
        phone: "", address: "", city: "", zip: "", notes: "",
    });

    const set = (k, v) => {
        setForm(p => ({ ...p, [k]: v }));
        setErrors(p => ({ ...p, [k]: "" }));
    };

    const validate = () => {
        const e = {};
        if (!form.firstName.trim()) e.firstName = "Requis";
        if (!form.lastName.trim()) e.lastName = "Requis";
        if (!form.email.includes("@")) e.email = "Email invalide";
        if (form.phone.replace(/\D/g, "").length < 8) e.phone = "Numéro invalide";
        if (!form.address.trim()) e.address = "Requis";
        if (!form.city.trim()) e.city = "Requis";
        if (form.zip.length < 4) e.zip = "Invalide";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleConfirm = () => {
        if (!validate()) return;
        setLoading(true);
        setTimeout(() => {
            const orderNum = "LXO-" + Math.random().toString(36).slice(2, 8).toUpperCase();
            const lines = items.map(i => `  • ${i.name} x${i.qty} — ${i.price * i.qty} €`).join("\n");
            const total = items.reduce((s, i) => s + i.price * i.qty, 0);
            const parts = [
                `🛒 *NOUVELLE COMMANDE — ${orderNum}*`,
                "",
                "👤 *Client*",
                `  Nom : ${form.firstName} ${form.lastName}`,
                `  Email : ${form.email}`,
                `  Tél : ${form.phone}`,
                "",
                "📦 *Articles*",
                lines,
                "",
                `💰 *Total : ${total} €* (paiement à la livraison)`,
                "",
                "📍 *Adresse*",
                `  ${form.address}`,
                `  ${form.zip} ${form.city}`,
            ];
            if (form.notes) parts.push("", `📝 *Instructions :* ${form.notes}`);
            const msg = parts.join("\n");
            window.open("https://wa.me/213551885804?text=" + encodeURIComponent(msg), "_blank");
            setLoading(false);
            onSuccess();
        }, 1800);
    };

    const inp = (key) => ({
        width: "100%", background: "rgba(255,255,255,0.04)",
        border: `1px solid ${errors[key] ? "#ef4444" : "rgba(255,255,255,0.1)"}`,
        borderRadius: 10, padding: "12px 14px", color: "#fff",
        fontSize: 14, outline: "none", boxSizing: "border-box",
        transition: "border-color 0.2s", fontFamily: "'DM Sans', sans-serif",
    });

    const lbl = {
        color: "#71717a", fontSize: 12, fontWeight: 600,
        letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 6
    };

    const focus = e => e.target.style.borderColor = "#3b82f6";
    const blur = (key) => e => e.target.style.borderColor = errors[key] ? "#ef4444" : "rgba(255,255,255,0.1)";

    return (
        <div style={{ minHeight: "100vh", background: "#030303", paddingTop: 80, paddingBottom: 60 }}>
            <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px" }}>

                {/* Back */}
                <button onClick={onBack} style={{
                    background: "none", border: "none", color: "#71717a", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 8, fontSize: 13,
                    fontWeight: 500, marginBottom: 40, padding: 0, transition: "color 0.2s",
                }}
                    onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                    onMouseLeave={e => e.currentTarget.style.color = "#71717a"}
                >
                    <ArrowLeft size={15} /> Retour au panier
                </button>

                {/* Header */}
                <div style={{ marginBottom: 40 }}>
                    <span style={{
                        fontSize: 11, color: "#3b82f6", fontWeight: 700,
                        letterSpacing: "0.1em", textTransform: "uppercase"
                    }}>Finaliser</span>
                    <h1 style={{
                        color: "#fff", fontSize: 32, fontWeight: 800,
                        letterSpacing: "-0.03em", marginTop: 6
                    }}>Informations de livraison</h1>
                </div>

                <div style={{
                    display: "grid", gridTemplateColumns: "1fr 380px", gap: 32,
                    alignItems: "start"
                }} className="checkout-grid">

                    {/* ── Form ── */}
                    <div style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: 20, padding: 32,
                    }}>
                        {/* Paiement à la livraison badge */}
                        <div style={{
                            display: "flex", alignItems: "center", gap: 10, marginBottom: 28,
                            background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)",
                            borderRadius: 12, padding: "12px 16px",
                        }}>
                            <div style={{
                                width: 32, height: 32, borderRadius: "50%",
                                background: "rgba(16,185,129,0.15)", display: "flex",
                                alignItems: "center", justifyContent: "center",
                            }}>💵</div>
                            <div>
                                <div style={{ color: "#10b981", fontSize: 13, fontWeight: 700 }}>
                                    Paiement à la livraison
                                </div>
                                <div style={{ color: "#52525b", fontSize: 12, marginTop: 1 }}>
                                    Vous payez en cash lors de la réception de votre colis.
                                </div>
                            </div>
                        </div>

                        {/* Nom / Prénom */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
                            className="form-2col">
                            {[["firstName", "Prénom"], ["lastName", "Nom"]].map(([k, l]) => (
                                <div key={k}>
                                    <label style={lbl}>{l}</label>
                                    <input value={form[k]} onChange={e => set(k, e.target.value)}
                                        placeholder={l} style={inp(k)}
                                        onFocus={focus} onBlur={blur(k)} />
                                    {errors[k] && <p style={{ color: "#ef4444", fontSize: 11, marginTop: 4 }}>{errors[k]}</p>}
                                </div>
                            ))}
                        </div>

                        {/* Email */}
                        <div style={{ marginTop: 16 }}>
                            <label style={lbl}>Email</label>
                            <input value={form.email} onChange={e => set("email", e.target.value)}
                                placeholder="vous@exemple.com" type="email" style={inp("email")}
                                onFocus={focus} onBlur={blur("email")} />
                            {errors.email && <p style={{ color: "#ef4444", fontSize: 11, marginTop: 4 }}>{errors.email}</p>}
                        </div>

                        {/* Téléphone */}
                        <div style={{ marginTop: 16 }}>
                            <label style={lbl}>Téléphone</label>
                            <input value={form.phone} onChange={e => set("phone", e.target.value)}
                                placeholder="+213 555 00 00 00" type="tel" style={inp("phone")}
                                onFocus={focus} onBlur={blur("phone")} />
                            {errors.phone && <p style={{ color: "#ef4444", fontSize: 11, marginTop: 4 }}>{errors.phone}</p>}
                            <p style={{ color: "#3f3f46", fontSize: 11, marginTop: 5 }}>
                                Notre livreur vous contactera sur ce numéro avant la livraison.
                            </p>
                        </div>

                        {/* Adresse */}
                        <div style={{ marginTop: 16 }}>
                            <label style={lbl}>Adresse complète</label>
                            <input value={form.address} onChange={e => set("address", e.target.value)}
                                placeholder="12 rue de la Paix, Appt 3" style={inp("address")}
                                onFocus={focus} onBlur={blur("address")} />
                            {errors.address && <p style={{ color: "#ef4444", fontSize: 11, marginTop: 4 }}>{errors.address}</p>}
                        </div>

                        {/* Ville / Code postal */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 130px", gap: 16, marginTop: 16 }}
                            className="form-2col">
                            {[["city", "Ville"], ["zip", "Code postal"]].map(([k, l]) => (
                                <div key={k}>
                                    <label style={lbl}>{l}</label>
                                    <input value={form[k]} onChange={e => set(k, e.target.value)}
                                        placeholder={l} style={inp(k)}
                                        onFocus={focus} onBlur={blur(k)} />
                                    {errors[k] && <p style={{ color: "#ef4444", fontSize: 11, marginTop: 4 }}>{errors[k]}</p>}
                                </div>
                            ))}
                        </div>

                        {/* Notes */}
                        <div style={{ marginTop: 16 }}>
                            <label style={lbl}>Instructions (optionnel)</label>
                            <textarea value={form.notes} onChange={e => set("notes", e.target.value)}
                                placeholder="Code d'entrée, étage, disponibilités…"
                                rows={3}
                                style={{
                                    ...inp("notes"), resize: "vertical", lineHeight: 1.6,
                                    fontFamily: "'DM Sans', sans-serif",
                                }}
                                onFocus={focus} onBlur={blur("notes")}
                            />
                        </div>

                        {/* Submit */}
                        <button onClick={handleConfirm} disabled={loading} style={{
                            marginTop: 28, width: "100%",
                            background: loading ? "#166534" : "#10b981",
                            color: "#fff", border: "none", borderRadius: 12, padding: "15px",
                            fontSize: 14, fontWeight: 700,
                            cursor: loading ? "not-allowed" : "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                            boxShadow: "0 0 28px rgba(16,185,129,0.3)", transition: "background 0.2s",
                        }}
                            onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "#059669"; }}
                            onMouseLeave={e => { if (!loading) e.currentTarget.style.background = "#10b981"; }}
                        >
                            {loading ? (
                                <>
                                    <div style={{
                                        width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)",
                                        borderTopColor: "#fff", borderRadius: "50%",
                                        animation: "spin 0.7s linear infinite",
                                    }} />
                                    Confirmation en cours…
                                </>
                            ) : (
                                <><Check size={16} /> Confirmer la commande — {subtotal} €</>
                            )}
                        </button>

                        <p style={{
                            textAlign: "center", marginTop: 12, color: "#3f3f46",
                            fontSize: 11, display: "flex", alignItems: "center",
                            justifyContent: "center", gap: 4
                        }}>
                            💵 Aucun paiement requis maintenant — règlement cash à la livraison
                        </p>
                    </div>

                    {/* ── Récapitulatif ── */}
                    <div style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: 20, padding: 28, position: "sticky", top: 80,
                    }}>
                        <h3 style={{
                            color: "#fff", fontSize: 15, fontWeight: 700,
                            marginBottom: 20, letterSpacing: "-0.01em"
                        }}>Récapitulatif</h3>

                        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
                            {items.map(item => (
                                <div key={item.id} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                                    <div style={{
                                        width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                                        background: "rgba(255,255,255,0.04)",
                                        border: "1px solid rgba(255,255,255,0.07)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: 20, position: "relative",
                                    }}>
                                        {item.emoji}
                                        <span style={{
                                            position: "absolute", top: -6, right: -6,
                                            background: "#3b82f6", color: "#fff", fontSize: 9,
                                            fontWeight: 700, borderRadius: 999, minWidth: 16,
                                            height: 16, display: "flex", alignItems: "center",
                                            justifyContent: "center", padding: "0 3px",
                                        }}>{item.qty}</span>
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{
                                            color: "#e4e4e7", fontSize: 13, fontWeight: 600,
                                            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
                                        }}>
                                            {item.name}
                                        </div>
                                        <div style={{ color: "#52525b", fontSize: 11 }}>{item.category}</div>
                                    </div>
                                    <div style={{ color: "#fff", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                                        {item.price * item.qty} €
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16 }}>
                            {[["Sous-total", subtotal + " €"], ["Livraison", "Gratuite"]].map(([k, v]) => (
                                <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                    <span style={{ color: "#71717a", fontSize: 13 }}>{k}</span>
                                    <span style={{
                                        color: k === "Livraison" ? "#10b981" : "#a1a1aa",
                                        fontSize: 13, fontWeight: 500
                                    }}>{v}</span>
                                </div>
                            ))}
                            <div style={{
                                display: "flex", justifyContent: "space-between",
                                borderTop: "1px solid rgba(255,255,255,0.08)",
                                paddingTop: 14, marginTop: 6,
                            }}>
                                <span style={{ color: "#fff", fontSize: 15, fontWeight: 700 }}>Total</span>
                                <span style={{
                                    color: "#fff", fontSize: 18, fontWeight: 800,
                                    letterSpacing: "-0.02em"
                                }}>{subtotal} €</span>
                            </div>
                        </div>

                        {/* Paiement à la livraison info box */}
                        <div style={{
                            marginTop: 20, background: "rgba(16,185,129,0.05)",
                            border: "1px solid rgba(16,185,129,0.15)",
                            borderRadius: 12, padding: "14px 16px",
                        }}>
                            <div style={{ color: "#10b981", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>
                                💵 Paiement à la livraison
                            </div>
                            <p style={{ color: "#52525b", fontSize: 12, lineHeight: 1.6, margin: 0 }}>
                                Préparez le montant exact en cash. Notre livreur vous contactera
                                avant de se déplacer.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 760px) {
          .checkout-grid { grid-template-columns: 1fr !important; }
          .form-2col { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    );
}

// ── Success Page ──────────────────────────────────────────────────────────────

function SuccessPage({ onHome }) {
    const [visible, setVisible] = useState(false);
    useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

    return (
        <div style={{
            minHeight: "100vh", background: "#030303",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 24, position: "relative", overflow: "hidden",
        }}>
            {/* Glow */}
            <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: 600, height: 600, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />

            <div style={{
                textAlign: "center", maxWidth: 480, position: "relative",
                opacity: visible ? 1 : 0, transform: visible ? "none" : "scale(0.95)",
                transition: "opacity 0.6s, transform 0.6s",
            }}>
                {/* Icon */}
                <div style={{
                    width: 80, height: 80, borderRadius: "50%",
                    background: "rgba(16,185,129,0.12)",
                    border: "1px solid rgba(16,185,129,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 28px",
                    boxShadow: "0 0 40px rgba(16,185,129,0.25)",
                }}>
                    <CheckCircle size={36} color="#10b981" />
                </div>

                <h1 style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 40, fontWeight: 800, color: "#fff",
                    letterSpacing: "-0.04em", marginBottom: 14,
                }}>
                    Commande confirmée !
                </h1>

                <p style={{ color: "#71717a", fontSize: 16, lineHeight: 1.7, marginBottom: 36 }}>
                    Merci pour votre achat. Vous recevrez un email de confirmation
                    et votre colis sera expédié sous <strong style={{ color: "#a1a1aa" }}>24h</strong>.
                </p>

                <div style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 14, padding: "16px 24px",
                    marginBottom: 32,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                }}>
                    <span style={{
                        fontSize: 11, color: "#52525b", fontWeight: 600,
                        letterSpacing: "0.08em", textTransform: "uppercase"
                    }}>N° de commande</span>
                    <span style={{
                        color: "#3b82f6", fontWeight: 700, fontSize: 14,
                        letterSpacing: "0.04em"
                    }}>
                        LXO-{Math.random().toString(36).slice(2, 8).toUpperCase()}
                    </span>
                </div>

                <button onClick={onHome} style={{
                    background: "#3b82f6", color: "#fff", border: "none",
                    borderRadius: 12, padding: "14px 36px", fontSize: 14, fontWeight: 700,
                    cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8,
                    boxShadow: "0 0 28px rgba(59,130,246,0.3)", transition: "background 0.2s",
                }}
                    onMouseEnter={e => e.currentTarget.style.background = "#2563eb"}
                    onMouseLeave={e => e.currentTarget.style.background = "#3b82f6"}
                >
                    <ArrowLeft size={15} /> Retour à la boutique
                </button>
            </div>
        </div>
    );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
    return (
        <footer style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "48px 24px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            maxWidth: 1200, margin: "0 auto", flexWrap: "wrap", gap: 16,
        }}>
            <div>
                <span style={{
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 18,
                    letterSpacing: "-0.03em",
                    background: "linear-gradient(135deg, #fff 40%, #52525b)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>LUXŌ</span>
                <p style={{ color: "#3f3f46", fontSize: 12, marginTop: 6 }}>
                    © 2026 Luxō. Tous droits réservés.
                </p>
            </div>
            <div style={{ display: "flex", gap: 24 }}>
                {["Confidentialité", "CGV", "Contact"].map(l => (
                    <a key={l} href="#" style={{
                        color: "#52525b", fontSize: 12, textDecoration: "none",
                        transition: "color 0.2s",
                    }}
                        onMouseEnter={e => e.target.style.color = "#a1a1aa"}
                        onMouseLeave={e => e.target.style.color = "#52525b"}
                    >{l}</a>
                ))}
            </div>
        </footer>
    );
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
    const [cart, setCart] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [page, setPage] = useState("home"); // "home" | "checkout" | "success"
    const productsRef = useRef();

    const addToCart = (product) => {
        setCart(prev => {
            const ex = prev.find(i => i.id === product.id);
            return ex
                ? prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
                : [...prev, { ...product, qty: 1 }];
        });
    };

    const incQty = (id) => setCart(p => p.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i));
    const decQty = (id) => setCart(p =>
        p.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i)
    );
    const removeItem = (id) => setCart(p => p.filter(i => i.id !== id));
    const cartCount = cart.reduce((s, i) => s + i.qty, 0);

    const goCheckout = () => { setDrawerOpen(false); setPage("checkout"); window.scrollTo(0, 0); };
    const goSuccess = () => { setPage("success"); setCart([]); window.scrollTo(0, 0); };
    const goHome = () => { setPage("home"); window.scrollTo(0, 0); };

    const scrollToProducts = () =>
        productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    if (page === "checkout") {
        return (
            <div style={{
                background: "#030303", minHeight: "100vh", color: "#fff",
                fontFamily: "'DM Sans','Helvetica Neue',Arial,sans-serif"
            }}>
                <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
                <Navbar cartCount={0} onCartOpen={() => { }} />
                <CheckoutPage items={cart} onBack={() => { setPage("home"); setDrawerOpen(true); }} onSuccess={goSuccess} />
            </div>
        );
    }

    if (page === "success") {
        return (
            <div style={{
                background: "#030303", minHeight: "100vh", color: "#fff",
                fontFamily: "'DM Sans','Helvetica Neue',Arial,sans-serif"
            }}>
                <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
                <SuccessPage onHome={goHome} />
            </div>
        );
    }

    return (
        <div style={{
            background: "#030303", minHeight: "100vh", color: "#fff",
            fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif",
        }}>
            <link
                href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap"
                rel="stylesheet"
            />
            <Navbar cartCount={cartCount} onCartOpen={() => setDrawerOpen(true)} />
            <Hero onShop={scrollToProducts} />
            <div ref={productsRef} style={{ scrollMarginTop: 80 }}>
                <BentoGrid onAdd={(p) => { addToCart(p); setDrawerOpen(true); }} />
            </div>
            <TrustSection />
            <Footer />
            <CartDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                items={cart}
                onInc={incQty}
                onDec={decQty}
                onRemove={removeItem}
                onCheckout={goCheckout}
            />
        </div>
    );
}
