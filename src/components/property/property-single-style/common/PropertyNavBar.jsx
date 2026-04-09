"use client";

import { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "Overview", id: "overview" },
  { label: "Description", id: "description" },
  { label: "Address", id: "address" },
  { label: "Amenities", id: "amenities" },
  { label: "Floor Plans", id: "floor-plans" },
  { label: "Nearby", id: "nearby" },
  { label: "Reviews", id: "reviews" },
];

const PropertyNavBar = () => {
  const [activeId, setActiveId] = useState("overview");
  const [hasOverflow, setHasOverflow] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [barHeight, setBarHeight] = useState(0);

  const navRef = useRef(null);
  const barRef = useRef(null);
  const stickyStartRef = useRef(0);

  const checkOverflow = () => {
    const el = navRef.current;
    if (!el) return;

    setHasOverflow(el.scrollWidth > el.clientWidth);
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    const setupStickyAnchor = () => {
      const barEl = barRef.current;
      if (!barEl) return;

      const rect = barEl.getBoundingClientRect();
      stickyStartRef.current = window.scrollY + rect.top;
      setBarHeight(barEl.offsetHeight || 0);
      checkOverflow();
    };

    setupStickyAnchor();
    window.addEventListener("resize", setupStickyAnchor);

    return () => {
      window.removeEventListener("resize", setupStickyAnchor);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsPinned(window.scrollY >= stickyStartRef.current);

      let current = "overview";
      navItems.forEach((item) => {
        const sectionEl = document.getElementById(item.id);
        if (sectionEl && window.scrollY >= sectionEl.offsetTop - 90) {
          current = item.id;
        }
      });
      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const sectionEl = document.getElementById(id);
    if (!sectionEl) return;

    window.scrollTo({
      top: sectionEl.offsetTop - 70,
      behavior: "smooth",
    });
    setActiveId(id);
  };

  const scrollLeft = () => {
    navRef.current?.scrollBy({ left: -200, behavior: "smooth" });
    setTimeout(checkOverflow, 250);
  };

  const scrollRight = () => {
    navRef.current?.scrollBy({ left: 200, behavior: "smooth" });
    setTimeout(checkOverflow, 250);
  };

  return (
    <>
      <style>{`
        .prop-nav-scroll-btn {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1.5px solid #eb6753;
          background: #fff;
          color: #eb6753;
          font-size: 14px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .prop-nav-scroll-btn:hover {
          background: #eb6753;
          color: #fff;
          transform: scale(1.08);
          box-shadow: 0 4px 12px rgba(235, 103, 83, 0.3);
        }
        .prop-nav-item {
          padding: 16px 18px;
          border: none;
          background: none;
          cursor: pointer;
          font-size: 14px;
          white-space: nowrap;
          transition: all 0.2s;
          border-bottom: 2px solid transparent;
          color: #555;
          font-weight: 400;
        }
        .prop-nav-item.active {
          color: #eb6753;
          font-weight: 600;
          border-bottom: 2px solid #eb6753;
        }
        .prop-nav-item:hover {
          color: #eb6753;
        }
        .prop-nav-scroll::-webkit-scrollbar {
          display: none;
        }
        .prop-nav-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>

      <div style={{ height: isPinned ? `${barHeight}px` : 0 }} aria-hidden={true} />

      <div
        ref={barRef}
        className="property-nav-bar bgc-white bdrb1"
        style={{
          position: isPinned ? "fixed" : "relative",
          top: isPinned ? "0" : "auto",
          left: isPinned ? 0 : "auto",
          right: isPinned ? 0 : "auto",
          zIndex: 999,
          width: "100%",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <div className="container d-flex align-items-center gap-2">
          {hasOverflow && canScrollLeft && (
            <button onClick={scrollLeft} className="prop-nav-scroll-btn" aria-label="Scroll left">
              <span>‹</span>
            </button>
          )}

          <div
            ref={navRef}
            className="prop-nav-scroll"
            onScroll={checkOverflow}
            style={{ overflowX: "auto", whiteSpace: "nowrap", flex: 1 }}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`prop-nav-item ${activeId === item.id ? "active" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {hasOverflow && canScrollRight && (
            <button onClick={scrollRight} className="prop-nav-scroll-btn" aria-label="Scroll right">
              ›
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default PropertyNavBar;