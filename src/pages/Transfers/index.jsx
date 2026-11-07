import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AIRPORT_TRANSFER_LOCATIONS, TRANSFER_VEHICLE_TYPES } from '../../constants/transfersCatalog';
import ImagePlaceholder from '../../components/common/ImagePlaceholder';
import './Transfers.css';

export default function Transfers() {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState('FNC Madeira Airport');
  const [dropoff, setDropoff] = useState('Funchal');
  const [passengers, setPassengers] = useState(2);
  const [transferType, setTransferType] = useState('airport'); // 'airport' | 'private' | 'group'

  const selectedLoc = AIRPORT_TRANSFER_LOCATIONS.find((l) => l.name === dropoff) || AIRPORT_TRANSFER_LOCATIONS[0];
  const price = selectedLoc ? selectedLoc.price : 30;

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/booking?service=airport-transfer&pickup=${encodeURIComponent(pickup)}&dropoff=${encodeURIComponent(dropoff)}&pax=${passengers}`);
  };

  return (
    <div className="transfers-mockup-page">
      {/* ── Sub-Hero Banner ── */}
      <section className="transfers-hero">
        <div className="transfers-hero-bg">
          <ImagePlaceholder alt="Madeira Roads & Transfers" height="100%" />
          <div className="transfers-hero-overlay" />
        </div>
        <div className="transfers-hero-content container-constrained">
          <h1 className="transfers-hero-title">Transfers</h1>
          <p className="transfers-hero-subtitle">
            Comfortable and reliable transfers across Madeira Island.
          </p>
        </div>
      </section>

      {/* ── Transfer Booking Card + Vehicle Showcase Grid ── */}
      <section className="transfers-main-section container-constrained">
        <div className="transfers-layout">
          {/* Left Form: Book Your Transfer */}
          <div className="transfer-booking-card">
            <h2>Book Your Transfer</h2>

            <form onSubmit={handleSearch} className="transfer-form">
              <label className="transfer-form-group">
                <span className="transfer-form-label">From</span>
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="transfer-input"
                  placeholder="e.g. Funchal Airport"
                />
              </label>

              <label className="transfer-form-group">
                <span className="transfer-form-label">To</span>
                <select
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  className="transfer-input"
                >
                  {AIRPORT_TRANSFER_LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.name}>
                      {loc.name} (~{loc.duration}) — €{loc.price}
                    </option>
                  ))}
                </select>
              </label>

              <label className="transfer-form-group">
                <span className="transfer-form-label">Passengers</span>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="transfer-input"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'person' : 'people'}
                    </option>
                  ))}
                </select>
              </label>

              <div className="transfer-estimate-row">
                <span>Estimated Price:</span>
                <strong>€{price}</strong>
              </div>

              <button type="submit" className="transfer-submit-btn">
                Find Transfer →
              </button>
            </form>
          </div>

          {/* Right: Service Highlights & Vehicles */}
          <div className="transfer-options-right">
            <div className="transfer-service-cards">
              <div
                className={`service-option-card ${transferType === 'airport' ? 'selected' : ''}`}
                onClick={() => setTransferType('airport')}
              >
                <div className="option-icon">✈️</div>
                <div>
                  <h4>Airport Transfers</h4>
                  <p>Fast and reliable transfers from/to the airport.</p>
                </div>
              </div>

              <div
                className={`service-option-card ${transferType === 'private' ? 'selected' : ''}`}
                onClick={() => setTransferType('private')}
              >
                <div className="option-icon">🚐</div>
                <div>
                  <h4>Private Transfers</h4>
                  <p>Travel in comfort with our private executive vans.</p>
                </div>
              </div>

              <div
                className={`service-option-card ${transferType === 'group' ? 'selected' : ''}`}
                onClick={() => setTransferType('group')}
              >
                <div className="option-icon">👥</div>
                <div>
                  <h4>Group Transfers</h4>
                  <p>Perfect for families, corporate teams and hiking groups.</p>
                </div>
              </div>
            </div>

            {/* Vehicle Slot Placeholders */}
            <div className="vehicles-showcase-grid">
              {TRANSFER_VEHICLE_TYPES.map((v) => (
                <div key={v.id} className="vehicle-card">
                  <ImagePlaceholder
                    alt={v.name}
                    aspectRatio="16/10"
                    label={v.badge}
                  />
                  <div className="vehicle-card-info">
                    <h4>{v.name}</h4>
                    <p>{v.capacity} • {v.luggage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
