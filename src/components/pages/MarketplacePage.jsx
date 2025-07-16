import React, { useState, useMemo } from 'react';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '../ui/card';
import { Badge } from '../ui/badge';
import { Select } from '../ui/select';
import { useUser } from '../../contexts/UserContext';
import {
  mockPlugins,
  platforms,
  functions,
  userRoles,
} from '../../data/mockPlugins';
import {
  Download,
  Star,
  Calendar,
  User,
  HardDrive,
  Search,
  Filter,
  CheckCircle,
  Package,
} from 'lucide-react';

const MarketplacePage = () => {
  const { currentUser, installedPlugins, installPlugin } = useUser();
  const [platformFilter, setPlatformFilter] = useState('All');
  const [functionFilter, setFunctionFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlugins = useMemo(() => {
    return mockPlugins.filter((plugin) => {
      const matchesPlatform =
        platformFilter === 'All' || plugin.platform === platformFilter;
      const matchesFunction =
        functionFilter === 'All' || plugin.function === functionFilter;
      const matchesSearch =
        plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plugin.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plugin.author.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesPlatform && matchesFunction && matchesSearch;
    });
  }, [platformFilter, functionFilter, searchTerm]);

  const handleInstall = (pluginId) => {
    if (currentUser.isLoggedIn) {
      installPlugin(pluginId);
      // Mock installation feedback
      alert(`Plugin installed successfully! (This is a mock action)`);
    }
  };

  const handleDownload = (plugin) => {
    // Mock download functionality
    alert(`Downloading ${plugin.name} v${plugin.version} (${plugin.size})`);
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'Visualizer':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'CMS':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Flow':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const isPluginInstalled = (pluginId) => {
    return (
      installedPlugins.includes(pluginId) ||
      mockPlugins.find((p) => p.id === pluginId)?.installed
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Plugin Marketplace</h1>
          <p className="text-muted-foreground mt-1">
            Discover and install plugins for your GIS platforms
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Package className="h-4 w-4" />
          <span>{filteredPlugins.length} plugins available</span>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search plugins..."
                  className="pl-10 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Platform Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Platform</label>
              <Select
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value)}
              >
                {platforms.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </Select>
            </div>

            {/* Function Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Function</label>
              <Select
                value={functionFilter}
                onChange={(e) => setFunctionFilter(e.target.value)}
              >
                {functions.map((func) => (
                  <option key={func} value={func}>
                    {func}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plugin Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlugins.map((plugin) => (
          <Card
            key={plugin.id}
            className="flex flex-col hover:shadow-lg transition-shadow relative"
          >
            {/* Platform Badge Top Right */}
            <Badge
              variant={`platform-${plugin.platform.toLowerCase()}`}
              className="absolute top-4 right-4 z-10 shadow-md"
            >
              {plugin.platform.toUpperCase()}
            </Badge>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <span>{plugin.name}</span>
                    {isPluginInstalled(plugin.id) && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </CardTitle>
                  <CardDescription className="mt-1 flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>{plugin.author}</span>
                  </CardDescription>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  {plugin.pluginType && (
                    <Badge className="bg-black text-white border-transparent">
                      {plugin.pluginType.charAt(0).toUpperCase() +
                        plugin.pluginType.slice(1).toLowerCase()}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground mb-4">
                {plugin.description}
              </p>

              <div className="space-y-2">
                {/* Remove platform badge from here */}
                {/* <Badge
                  variant={`platform-${plugin.platform.toLowerCase()}`}
                  className="mr-2"
                >
                  {plugin.platform.toUpperCase()}
                </Badge> */}

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-current text-yellow-500" />
                      <span>{plugin.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Download className="h-3 w-3" />
                      <span>{plugin.downloads.toLocaleString()}</span>
                    </div>
                  </div>
                  <div>
                    <Badge variant="outline" className="text-xs">
                      {plugin.function}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="pt-4">
              <div className="flex space-x-2 w-full">
                {currentUser.isLoggedIn && !isPluginInstalled(plugin.id) ? (
                  <Button
                    onClick={() => handleInstall(plugin.id)}
                    className="flex-1"
                  >
                    Install
                  </Button>
                ) : isPluginInstalled(plugin.id) ? (
                  <Button variant="outline" className="flex-1" disabled>
                    Installed
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleDownload(plugin)}
                    className="flex-1"
                  >
                    Install
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(plugin)}
                  className="flex items-center justify-center"
                >
                  <Download className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    window.dispatchEvent(
                      new CustomEvent('showPluginDetail', { detail: plugin.id })
                    );
                  }}
                >
                  Details
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredPlugins.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No plugins found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search terms to find more plugins.
            </p>
          </CardContent>
        </Card>
      )}

      {/* User Role Notice */}
      {!currentUser.isLoggedIn && (
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              <strong>Note:</strong> You need to be logged in to install
              plugins. Anonymous users can browse and download ZIP files.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MarketplacePage;
