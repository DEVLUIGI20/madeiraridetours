import { LanguageProvider } from './context/LanguageProvider';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <LanguageProvider>
      <AppRouter />
    </LanguageProvider>
  );
}

export default App;
