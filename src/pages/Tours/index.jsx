import { useState, useMemo } from 'react';
import { TOURS_DATA, TOUR_CATEGORIES } from '../../constants/toursCatalog';
import TourCard from '../../components/common/TourCard';
import ImagePlaceholder from '../../components/common/ImagePlaceholder';
import usePageTitle from '../../hooks/usePageTitle';
import './Tours.css';

export default function Tours() {
  usePageTitle(
    'Tours Privados na Madeira — Experiências e Excursões',
    'Conheça as melhores excursões privadas na Madeira: Tour Oeste (Porto Moniz), Tour Este (Santana), Fanal Místico e levadas guiadas.'
  );

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const filteredTours = useMemo(() => {
    let list = TOURS_DATA.filter((tour) => {
      if (selectedCategory === 'all') return true;
      return tour.category === selectedCategory;
    });

    if (sortBy === 'price-low') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, sortBy]);

  return (
    <div className="tours-page-mockup">
      {/* ── Sub-Hero Banner ── */}
      <section className="tours-hero-banner">
        <div className="tours-hero-bg">
          <ImagePlaceholder
            alt="Scenic Madeira Coast"
            height="100%"
          />
          <div className="tours-hero-overlay" />
        </div>
        <div className="tours-hero-content container-constrained">
          <h1 className="tours-hero-title">Our Tours</h1>
          <p className="tours-hero-subtitle">
            Discover Madeira breathtaking landscapes with certified local drivers.
          </p>
        </div>
      </section>

      {/* ── Category Filters & Sort Bar ── */}
      <section className="tours-controls-section container-constrained">
        <div className="tours-categories-pills">
          {TOUR_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`category-pill ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="tours-sort-box">
          <label htmlFor="tours-sort" className="sort-label">Sort by:</label>
          <select
            id="tours-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="popular">Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </section>

      {/* ── Tours Grid ── */}
      <section className="tours-list-section container-constrained">
        {filteredTours.length === 0 ? (
          <div className="tours-empty-state">
            <p>No tours found in this category.</p>
          </div>
        ) : (
          <div className="tours-grid-mockup">
            {filteredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
