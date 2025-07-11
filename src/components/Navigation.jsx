import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useUser } from '../contexts/UserContext';
import { userRoles } from '../data/mockPlugins';
import { Home, Package, Folder, Code, User, LogIn, LogOut } from 'lucide-react';

const Navigation = ({ currentPage, setCurrentPage }) => {
  const { currentUser, login, logout } = useUser();

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'marketplace', label: 'Plugin Marketplace', icon: Package },
    { id: 'visualizer-plugins', label: 'Visualizer Plugins', icon: Package },
    { id: 'my-plugins', label: 'My Plugins', icon: Folder, requiresAuth: true },
    {
      id: 'developer-center',
      label: 'Developer Center',
      icon: Code,
      requiresAuth: true,
    },
    { id: 'account', label: 'Account', icon: User, requiresAuth: true },
  ];

  const handleQuickLogin = () => {
    if (!currentUser.isLoggedIn) {
      login('demo-user', userRoles.USER);
    } else {
      logout();
    }
  };

  const filteredItems = navigationItems.filter(
    (item) => !item.requiresAuth || currentUser.isLoggedIn
  );

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Re:Earth Marketplace</span>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-1">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentPage(item.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </div>

          {/* User Status & Quick Actions */}
          <div className="flex items-center space-x-3">
            {currentUser.isLoggedIn ? (
              <>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{currentUser.username}</Badge>
                  <Badge
                    variant={
                      currentUser.role === userRoles.DEVELOPER
                        ? 'default'
                        : 'outline'
                    }
                  >
                    {currentUser.role}
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleQuickLogin}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={handleQuickLogin}
                className="flex items-center space-x-2"
              >
                <LogIn className="h-4 w-4" />
                <span>Quick Login</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
