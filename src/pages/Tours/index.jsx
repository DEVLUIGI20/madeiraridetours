import { useState, useMemo, useEffect } from 'react';
import { TOURS_DATA, TOUR_CATEGORIES } from '../../constants/toursCatalog';
import { getTours } from '../../services/catalogService';
import { useLanguage } from '../../hooks/useLanguage';
import TourCard from '../../components/common/TourCard';
import ImagePlaceholder from '../../components/common/ImagePlaceholder';
import usePageTitle from '../../hooks/usePageTitle';
import './Tours.css';

export default function Tours() {
  const { currentLang } = useLanguage();

  usePageTitle(
    currentLang === 'pt'
      ? 'Passeios Privados na Madeira — Experiências e Excursões'
      : currentLang === 'de'
      ? 'Private Touren auf Madeira — Erlebnisse & Ausflüge'
      : currentLang === 'fr'
      ? 'Circuits Privés à Madère — Expériences & Excursions'
      : currentLang === 'es'
      ? 'Tours Privados en Madeira — Experiencias y Excursiones'
      : 'Private Tours in Madeira — Experiences & Excursions',
    currentLang === 'pt'
      ? 'Conheça as melhores excursões privadas na Madeira: Tour Oeste, Tour Este, Fanal e levadas guiadas.'
      : 'Discover the best private tours in Madeira: West Tour, East Tour, Fanal and guided levada walks.'
  );

  const [toursList, setToursList] = useState(TOURS_DATA);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  // Live Sync from Supabase 'tours' table
  useEffect(() => {
    let isMounted = true;
    getTours({ forceRefresh: true }).then((data) => {
      if (isMounted && data && data.length > 0) {
        setToursList(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const getCategoryLabel = (cat) => {
    if (cat.id === 'all') {
      return currentLang === 'pt' ? 'Todos os Passeios' : currentLang === 'de' ? 'Alle Touren' : currentLang === 'fr' ? 'Tous les Circuits' : currentLang === 'es' ? 'Todos los Tours' : 'All Tours';
    }
    if (cat.id === 'full-day') {
      return currentLang === 'pt' ? 'Dia Inteiro' : currentLang === 'de' ? 'Ganztägig' : currentLang === 'fr' ? 'Journée Complète' : currentLang === 'es' ? 'Día Completo' : 'Full Day';
    }
    if (cat.id === 'half-day') {
      return currentLang === 'pt' ? 'Meio Dia' : currentLang === 'de' ? 'Halbtags' : currentLang === 'fr' ? 'Demi-journée' : currentLang === 'es' ? 'Medio Día' : 'Half Day';
    }
    if (cat.id === 'sunrise-sunset') {
      return currentLang === 'pt' ? 'Nascer & Pôr do Sol' : currentLang === 'de' ? 'Sonnenaufgang & Sonnenuntergang' : currentLang === 'fr' ? 'Lever & Coucher de Soleil' : currentLang === 'es' ? 'Amanecer y Atardecer' : 'Sunrise & Sunset';
    }
    if (cat.id === 'nature-levadas') {
      return currentLang === 'pt' ? 'Natureza & Levadas' : currentLang === 'de' ? 'Natur & Levadas' : currentLang === 'fr' ? 'Nature & Levadas' : currentLang === 'es' ? 'Naturaleza y Levadas' : 'Nature & Levadas';
    }
    return cat.label;
  };

  const filteredTours = useMemo(() => {
    let list = toursList.filter((tour) => {
      if (selectedCategory === 'all') return true;
      return tour.category === selectedCategory;
    });

    if (sortBy === 'price-low') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else {
      list = [...list].sort((a, b) => (b.rating || 5) - (a.rating || 5));
    }

    return list;
  }, [toursList, selectedCategory, sortBy]);

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
          <h1 className="tours-hero-title">
            {currentLang === 'pt' ? 'Os Nossos Passeios' : currentLang === 'de' ? 'Unsere Touren' : currentLang === 'fr' ? 'Nos Circuits' : currentLang === 'es' ? 'Nuestros Tours' : 'Our Tours'}
          </h1>
          <p className="tours-hero-subtitle">
            {currentLang === 'pt'
              ? 'Descubra as paisagens deslumbrantes da Madeira com motoristas locais certificados.'
              : currentLang === 'de'
              ? 'Entdecken Sie atemberaubende Landschaften Madeiras mit zertifizierten lokalen Fahrern.'
              : currentLang === 'fr'
              ? 'Découvrez les paysages spectaculaires de Madère avec des chauffeurs locaux certifiés.'
              : currentLang === 'es'
              ? 'Descubra los impresionantes paisajes de Madeira con conductores locales certificados.'
              : 'Discover Madeira breathtaking landscapes with certified local drivers.'}
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
              {getCategoryLabel(cat)}
            </button>
          ))}
        </div>

        <div className="tours-sort-box">
          <label htmlFor="tours-sort" className="sort-label">
            {currentLang === 'pt' ? 'Ordenar por:' : currentLang === 'de' ? 'Sortieren nach:' : currentLang === 'fr' ? 'Trier par:' : currentLang === 'es' ? 'Ordenar por:' : 'Sort by:'}
          </label>
          <select
            id="tours-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="popular">
              {currentLang === 'pt' ? 'Mais Populares' : currentLang === 'de' ? 'Beliebtheit' : currentLang === 'fr' ? 'Populaires' : currentLang === 'es' ? 'Más Populares' : 'Popular'}
            </option>
            <option value="price-low">
              {currentLang === 'pt' ? 'Preço: Menor para Maior' : currentLang === 'de' ? 'Preis: Niedrig bis Hoch' : currentLang === 'fr' ? 'Prix: Croissant' : currentLang === 'es' ? 'Precio: Menor a Mayor' : 'Price: Low to High'}
            </option>
            <option value="price-high">
              {currentLang === 'pt' ? 'Preço: Maior para Menor' : currentLang === 'de' ? 'Preis: Hoch bis Niedrig' : currentLang === 'fr' ? 'Prix: Décroissant' : currentLang === 'es' ? 'Precio: Mayor a Menor' : 'Price: High to Low'}
            </option>
          </select>
        </div>
      </section>

      {/* ── Tours Grid ── */}
      <section className="tours-list-section container-constrained">
        {filteredTours.length === 0 ? (
          <div className="tours-empty-state">
            <p>
              {currentLang === 'pt' ? 'Nenhum passeio encontrado nesta categoria.' : 'No tours found in this category.'}
            </p>
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
