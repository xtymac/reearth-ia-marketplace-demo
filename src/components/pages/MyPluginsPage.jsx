import React, { useMemo } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { useUser } from '../../contexts/UserContext';
import { mockPlugins } from '../../data/mockPlugins';
import { 
  Folder, 
  Trash2, 
  RefreshCw, 
  Calendar, 
  HardDrive, 
  User,
  CheckCircle,
  AlertTriangle,
  Package
} from 'lucide-react';

const MyPluginsPage = () => {
  const { currentUser, installedPlugins, uninstallPlugin } = useUser();

  const myPlugins = useMemo(() => {
    // Get plugins that are installed (either from mock data or from user actions)
    const installedIds = [...installedPlugins];
    const preInstalledPlugins = mockPlugins.filter(p => p.installed);
    
    // Combine both sources and remove duplicates
    const allInstalledIds = [...new Set([...installedIds, ...preInstalledPlugins.map(p => p.id)])];
    
    return mockPlugins.filter(plugin => allInstalledIds.includes(plugin.id));
  }, [installedPlugins]);

  const handleUninstall = (pluginId, pluginName) => {
    if (window.confirm(`Are you sure you want to uninstall "${pluginName}"?`)) {
      uninstallPlugin(pluginId);
      alert(`${pluginName} has been uninstalled. (This is a mock action)`);
    }
  };

  const handleUpdate = (plugin) => {
    alert(`Updating ${plugin.name} to latest version... (This is a mock action)`);
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'Visualizer': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'CMS': return 'bg-green-100 text-green-800 border-green-200';
      case 'Flow': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUpdateStatus = (plugin) => {
    // Mock update status logic
    const daysSinceUpdate = Math.floor(Math.random() * 30);
    if (daysSinceUpdate < 7) return 'up-to-date';
    if (daysSinceUpdate < 14) return 'minor-update';
    return 'major-update';
  };

  const getUpdateStatusBadge = (status) => {
    switch (status) {
      case 'up-to-date':
        return <Badge variant="secondary" className="text-green-700 bg-green-50 border-green-200">Up to date</Badge>;
      case 'minor-update':
        return <Badge variant="outline" className="text-blue-700 bg-blue-50 border-blue-200">Minor update</Badge>;
      case 'major-update':
        return <Badge variant="destructive" className="text-orange-700 bg-orange-50 border-orange-200">Update available</Badge>;
      default:
        return null;
    }
  };

  if (!currentUser.isLoggedIn) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <Folder className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Login Required</h3>
          <p className="text-muted-foreground">
            Please log in to view and manage your installed plugins.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Plugins</h1>
          <p className="text-muted-foreground mt-1">
            Manage your installed plugins and check for updates
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Package className="h-4 w-4" />
          <span>{myPlugins.length} plugins installed</span>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-center">{myPlugins.length}</div>
            <div className="text-xs text-muted-foreground text-center">Total Installed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-center text-green-600">
              {myPlugins.filter(p => getUpdateStatus(p) === 'up-to-date').length}
            </div>
            <div className="text-xs text-muted-foreground text-center">Up to Date</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-center text-blue-600">
              {myPlugins.filter(p => getUpdateStatus(p) === 'minor-update').length}
            </div>
            <div className="text-xs text-muted-foreground text-center">Minor Updates</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-center text-orange-600">
              {myPlugins.filter(p => getUpdateStatus(p) === 'major-update').length}
            </div>
            <div className="text-xs text-muted-foreground text-center">Major Updates</div>
          </CardContent>
        </Card>
      </div>

      {/* Plugins List */}
      {myPlugins.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myPlugins.map((plugin) => {
            const updateStatus = getUpdateStatus(plugin);
            return (
              <Card key={plugin.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <span>{plugin.name}</span>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </CardTitle>
                      <CardDescription className="mt-1 flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{plugin.author}</span>
                      </CardDescription>
                    </div>
                    <Badge className={getPlatformColor(plugin.platform)}>
                      {plugin.platform}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground mb-4">
                    {plugin.description}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Status</span>
                      {getUpdateStatusBadge(updateStatus)}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>v{plugin.version}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <HardDrive className="h-3 w-3" />
                        <span>{plugin.size}</span>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Last updated: {plugin.lastUpdated}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-4">
                  <div className="flex space-x-2 w-full">
                    {updateStatus !== 'up-to-date' && (
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => handleUpdate(plugin)}
                        className="flex items-center space-x-1"
                      >
                        <RefreshCw className="h-3 w-3" />
                        <span>Update</span>
                      </Button>
                    )}
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => handleUninstall(plugin.id, plugin.name)}
                      className="flex items-center space-x-1 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span>Uninstall</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No plugins installed</h3>
            <p className="text-muted-foreground mb-4">
              You haven't installed any plugins yet. Visit the marketplace to discover and install plugins.
            </p>
            <Button>Browse Marketplace</Button>
          </CardContent>
        </Card>
      )}

      {/* Bulk Actions */}
      {myPlugins.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bulk Actions</CardTitle>
            <CardDescription>
              Perform actions on multiple plugins at once
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Button 
                variant="outline"
                onClick={() => alert('Checking for updates... (This is a mock action)')}
                className="flex items-center space-x-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Check All for Updates</span>
              </Button>
              <Button 
                variant="outline"
                onClick={() => alert('Updating all plugins... (This is a mock action)')}
                className="flex items-center space-x-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Update All</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MyPluginsPage; 