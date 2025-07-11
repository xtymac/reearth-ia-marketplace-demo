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
import { mockPlugins, functions, userRoles } from '../../data/mockPlugins';
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
  Heart,
} from 'lucide-react';

const VisualizerPluginsPage = () => {
  const { currentUser, installedPlugins, installPlugin } = useUser();
  const [functionFilter, setFunctionFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [likedPlugins, setLikedPlugins] = useState([]);

  // Filter to show only Visualizer plugins
  const visualizerPlugins = useMemo(() => {
    return mockPlugins.filter((plugin) => {
      const isVisualizer = plugin.platform === 'Visualizer';
      const matchesFunction =
        functionFilter === 'All' || plugin.function === functionFilter;
      const matchesSearch =
        plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plugin.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plugin.author.toLowerCase().includes(searchTerm.toLowerCase());

      return isVisualizer && matchesFunction && matchesSearch;
    });
  }, [functionFilter, searchTerm]);

  const handleInstall = (pluginId) => {
    if (currentUser.isLoggedIn) {
      installPlugin(pluginId);
      alert(`Plugin installed successfully! (This is a mock action)`);
    }
  };

  const handleDownload = (plugin) => {
    alert(`Downloading ${plugin.name} v${plugin.version} (${plugin.size})`);
  };

  const handleLike = (pluginId) => {
    setLikedPlugins((prev) =>
      prev.includes(pluginId)
        ? prev.filter((id) => id !== pluginId)
        : [...prev, pluginId]
    );
  };

  const isPluginInstalled = (pluginId) => {
    return (
      installedPlugins.includes(pluginId) ||
      mockPlugins.find((p) => p.id === pluginId)?.installed
    );
  };

  const isPluginLiked = (pluginId) => {
    return likedPlugins.includes(pluginId);
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: '#161616', color: 'white' }}
    >
      {/* Header */}
      <div
        className="bg-gray-800 border-b border-gray-700 px-6 py-4"
        style={{ background: '#262626', borderColor: '#222' }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Plugin Marketplace</h1>
            <div className="flex items-center space-x-4 mt-2">
              <button className="text-blue-400 border-b-2 border-blue-400 pb-1">
                Public Installed
              </button>
              <button className="text-gray-400 hover:text-white">
                Personal Installed
              </button>
            </div>
          </div>
          <div />
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Filters */}
        <Card
          className=""
          style={{ background: '#262626', borderColor: '#222' }}
        >
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg text-white">
              <Filter className="h-5 w-5" />
              <span>Filters - VISUALIZER Plugins Only</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search Bar */}
              <div className="space-y-2 md:col-span-1">
                <label className="text-sm font-medium text-gray-300">
                  Search
                </label>
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search text"
                    className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              {/* Function Filter */}
              <div className="space-y-2 md:col-span-1">
                <label className="text-sm font-medium text-gray-300">
                  Function
                </label>
                <Select
                  value={functionFilter}
                  onChange={(e) => setFunctionFilter(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                >
                  {functions.map((func) => (
                    <option key={func} value={func}>
                      {func}
                    </option>
                  ))}
                </Select>
              </div>
              {/* Stats */}
              <div className="flex items-center justify-end space-x-4 text-sm text-gray-400 md:col-span-1">
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4" />
                  <span>{visualizerPlugins.length} plugins available</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plugin Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visualizerPlugins.map((plugin) => (
            <Card
              key={plugin.id}
              className="flex flex-col hover:bg-gray-750 transition-colors"
              style={{ background: '#262626', borderColor: '#222' }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center space-x-2 text-white">
                      <span>{plugin.name}</span>
                      {isPluginInstalled(plugin.id) && (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      )}
                    </CardTitle>
                    <CardDescription className="mt-1 flex items-center space-x-1 text-gray-400">
                      <User className="h-3 w-3" />
                      <span>{plugin.author}</span>
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    {plugin.pluginTypes &&
                      plugin.pluginTypes.map((type) => (
                        <Badge
                          key={type}
                          variant={type.toLowerCase()}
                          className="mb-1"
                        >
                          {type.charAt(0).toUpperCase() +
                            type.slice(1).toLowerCase()}
                        </Badge>
                      ))}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1">
                <p className="text-sm text-gray-300 mb-4">
                  {plugin.description}
                </p>

                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-4 text-xs text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-current text-yellow-400" />
                      <span>{plugin.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Download className="h-3 w-3" />
                      <span>{plugin.downloads.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <HardDrive className="h-3 w-3" />
                      <span>{plugin.size}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>v{plugin.version}</span>
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
                      style={{
                        background: '#3e41ca',
                        color: 'white',
                        borderColor: '#3e41ca',
                      }}
                    >
                      Install
                    </Button>
                  ) : isPluginInstalled(plugin.id) ? (
                    <Button
                      variant="outline"
                      className="flex-1 bg-gray-700 border-gray-600 text-gray-300"
                      disabled
                    >
                      Installed
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleDownload(plugin)}
                      className="flex-1"
                      style={{
                        background: '#3e41ca',
                        color: 'white',
                        borderColor: '#3e41ca',
                      }}
                    >
                      Install
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(plugin)}
                    className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                  >
                    <Download className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(plugin.id)}
                    className="text-gray-300 hover:text-white hover:bg-gray-700"
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        isPluginLiked(plugin.id)
                          ? 'fill-red-500 text-red-500'
                          : ''
                      }`}
                    />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      window.dispatchEvent(
                        new CustomEvent('showPluginDetail', {
                          detail: plugin.id,
                        })
                      );
                    }}
                    className="text-gray-300 hover:text-white hover:bg-gray-700"
                  >
                    Details
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* No plugins found */}
        {visualizerPlugins.length === 0 && (
          <Card
            className="text-center py-12"
            style={{ background: '#262626', borderColor: '#222' }}
          >
            <CardContent>
              <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-white">
                No VISUALIZER plugins found
              </h3>
              <p className="text-gray-400">
                Try adjusting your filters or search terms to find more plugins.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
          >
            ‹
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            1
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
          >
            ›
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VisualizerPluginsPage;
