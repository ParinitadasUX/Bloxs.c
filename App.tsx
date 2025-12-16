import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DemoShowcase } from './components/DemoShowcase';
import { WorkflowCards } from './components/WorkflowCards';
import { FeatureGrid } from './components/FeatureGrid';
import { IntegrationLogos } from './components/IntegrationLogos';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-purple selection:text-white font-sans">
      <Header />
      <main>
        <Hero />
        <DemoShowcase />
        <WorkflowCards />
        <FeatureGrid />
        <IntegrationLogos />
      </main>
      <Footer />
    </div>
  );
}

export default App;