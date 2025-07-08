import React from 'react';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Badge } from '../ui/badge';
import { useUser } from '../../contexts/UserContext';
import { mockPlugins } from '../../data/mockPlugins';
import { Package, Star, Download, TrendingUp } from 'lucide-react';

const HomePage = () => {
  const { currentUser } = useUser();
  const featuredPlugins = mockPlugins
    .filter((plugin) => plugin.featured)
    .slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to Re:Earth Marketplace
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover, install, and manage plugins for Visualizer, CMS, and Flow
          platforms. Enhance your GIS workflows with powerful extensions from
          our community.
        </p>
        {!currentUser.isLoggedIn && (
          <div className="pt-4">
            <Button size="lg" className="mr-4">
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              Browse Plugins
            </Button>
          </div>
        )}
      </div>

      {/* Platform Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-blue-500" />
              <span>Visualizer</span>
            </CardTitle>
            <CardDescription>
              Advanced visualization and rendering plugins for spatial data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPlugins.filter((p) => p.platform === 'Visualizer').length}{' '}
              plugins
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-green-500" />
              <span>CMS</span>
            </CardTitle>
            <CardDescription>
              Content management and data organization extensions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPlugins.filter((p) => p.platform === 'CMS').length} plugins
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-purple-500" />
              <span>Flow</span>
            </CardTitle>
            <CardDescription>
              Workflow automation and process management tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPlugins.filter((p) => p.platform === 'Flow').length} plugins
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Plugins */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Star className="h-6 w-6 text-yellow-500" />
          <h2 className="text-2xl font-bold">Featured Plugins</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredPlugins.map((plugin) => (
            <Card key={plugin.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{plugin.name}</CardTitle>
                    <CardDescription className="mt-1">
                      by {plugin.author}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">{plugin.platform}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {plugin.description}
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    <span>{plugin.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Download className="h-4 w-4" />
                    <span>{plugin.downloads.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Marketplace Statistics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{mockPlugins.length}</div>
              <div className="text-sm text-muted-foreground">Total Plugins</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {mockPlugins
                  .reduce((sum, p) => sum + p.downloads, 0)
                  .toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Downloads
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {new Set(mockPlugins.map((p) => p.author)).size}
              </div>
              <div className="text-sm text-muted-foreground">Developers</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {(
                  mockPlugins.reduce((sum, p) => sum + p.rating, 0) /
                  mockPlugins.length
                ).toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">Avg. Rating</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
