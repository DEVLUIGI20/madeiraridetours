import InteractiveMapSection from '../../components/common/InteractiveMapSection';
import './Tours.css';

/**
 * Tours Page
 * Currently displays the interactive map of Madeira island.
 */
export default function Tours() {
  return (
    <div className="tours-page">
      <InteractiveMapSection />
    </div>
  );
}
