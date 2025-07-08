import React, { useState } from 'react';
import { UserProvider, useUser } from './contexts/UserContext';
import Navigation from './components/Navigation';
import HomePage from './components/pages/HomePage';
import MarketplacePage from './components/pages/MarketplacePage';
import MyPluginsPage from './components/pages/MyPluginsPage';
import DeveloperCenterPage from './components/pages/DeveloperCenterPage';
import AccountPage from './components/pages/AccountPage';

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const { currentUser } = useUser();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'marketplace':
        return <MarketplacePage />;
      case 'my-plugins':
        return <MyPluginsPage />;
      case 'developer-center':
        return <DeveloperCenterPage />;
      case 'account':
        return <AccountPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="container mx-auto px-4 py-8">
        {renderPage()}
      </main>
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