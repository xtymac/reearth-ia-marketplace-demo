import React, { useState, useEffect } from 'react';
import { UserProvider, useUser } from './contexts/UserContext';
import Navigation from './components/Navigation';
import HomePage from './components/pages/HomePage';
import MarketplacePage from './components/pages/MarketplacePage';
import VisualizerPluginsPage from './components/pages/VisualizerPluginsPage';
import MyPluginsPage from './components/pages/MyPluginsPage';
import DeveloperCenterPage from './components/pages/DeveloperCenterPage';
import AccountPage from './components/pages/AccountPage';
import PluginDetailPage from './components/pages/PluginDetailPage';

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPluginId, setSelectedPluginId] = useState(null);
  const { currentUser } = useUser();

  useEffect(() => {
    const handleShowPluginDetail = (event) => {
      setSelectedPluginId(event.detail);
      setCurrentPage('plugin-detail');
    };

    window.addEventListener('showPluginDetail', handleShowPluginDetail);
    return () => {
      window.removeEventListener('showPluginDetail', handleShowPluginDetail);
    };
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'marketplace':
        return <MarketplacePage />;
      case 'visualizer-plugins':
        return <VisualizerPluginsPage />;
      case 'my-plugins':
        return <MyPluginsPage />;
      case 'developer-center':
        return <DeveloperCenterPage />;
      case 'account':
        return <AccountPage />;
      case 'plugin-detail':
        return (
          <PluginDetailPage
            pluginId={selectedPluginId}
            onBack={() => setCurrentPage('marketplace')}
          />
        );
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="container mx-auto px-4 py-8">{renderPage()}</main>
    </div>
  );
};

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
