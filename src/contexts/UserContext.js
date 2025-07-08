import React, { createContext, useContext, useState } from 'react';
import { userRoles } from '../data/mockPlugins';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    isLoggedIn: false,
    role: userRoles.ANONYMOUS,
    username: null
  });

  const [installedPlugins, setInstalledPlugins] = useState([]);

  const login = (username, role = userRoles.USER) => {
    setCurrentUser({
      isLoggedIn: true,
      role,
      username
    });
  };

  const logout = () => {
    setCurrentUser({
      isLoggedIn: false,
      role: userRoles.ANONYMOUS,
      username: null
    });
  };

  const switchRole = (newRole) => {
    if (currentUser.isLoggedIn) {
      setCurrentUser(prev => ({
        ...prev,
        role: newRole
      }));
    }
  };

  const installPlugin = (pluginId) => {
    if (currentUser.isLoggedIn) {
      setInstalledPlugins(prev => [...prev, pluginId]);
    }
  };

  const uninstallPlugin = (pluginId) => {
    setInstalledPlugins(prev => prev.filter(id => id !== pluginId));
  };

  const value = {
    currentUser,
    installedPlugins,
    login,
    logout,
    switchRole,
    installPlugin,
    uninstallPlugin
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}; 