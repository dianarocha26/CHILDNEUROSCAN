import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { VideoSection } from './components/VideoSection';
import { LanguageSelector } from './components/LanguageSelector';
import './styles/index.css';

function App() {
  return (
    <div className="min-h-screen p-6">
      <LanguageSelector />
      <div className="max-w-6xl mx-auto py-12">
        <Hero />
        <Features />
        <VideoSection />
      </div>
    </div>
  );
}

export default App;
