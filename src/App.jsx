import { LanguageProvider } from './context/LanguageProvider';
import { BookingProvider } from './context/BookingContext';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <LanguageProvider>
      <BookingProvider>
        <AppRouter />
      </BookingProvider>
    </LanguageProvider>
  );
}

export default App;
