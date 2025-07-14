import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { NotificationBanner } from '../ui/notification-banner';
import { useUser } from '../../contexts/UserContext';
import { mockPlugins } from '../../data/mockPlugins';
import {
  Download,
  Star,
  Calendar,
  User,
  HardDrive,
  CheckCircle,
  ArrowLeft,
  ExternalLink,
  Play,
  Image as ImageIcon,
  FileText,
  Heart,
  Share2,
  X,
  Shield,
  Lock,
  Eye,
  Database,
  Globe,
  AlertTriangle,
} from 'lucide-react';

// Mock Visualizer projects styled like the image
const visualizerProjects = [
  {
    id: '1',
    name: 'Test02',
    image:
      'https://via.placeholder.com/400x300/2a2a2a/e74c3c?text=Re:Earth+Logo',
    description: 'Main project workspace',
    url: 'https://visualizer.dev.reearth.io/scene/01jzq2av70sa60zm4ftcyahx9g/map',
  },
  {
    id: '2',
    name: 'Test',
    image:
      'https://via.placeholder.com/400x300/2a2a2a/e74c3c?text=Re:Earth+Logo',
    description: 'Development environment',
    url: 'https://visualizer.dev.reearth.io/scene/01jzq2av70sa60zm4ftcyahx9g/map',
  },
];

const PluginDetailPage = ({ pluginId, onBack }) => {
  const { currentUser, installedPlugins, installPlugin } = useUser();
  const [activeTab, setActiveTab] = useState('overview');
  const [likedPlugins, setLikedPlugins] = useState([]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [installingProject, setInstallingProject] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({});
  const [projectSearchTerm, setProjectSearchTerm] = useState('');

  // Find the plugin by ID
  const plugin = mockPlugins.find((p) => p.id === pluginId);

  if (!plugin) {
    return (
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-4xl mx-auto">
          <Button onClick={onBack} variant="outline" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Card className="text-center py-12">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Plugin Not Found</h3>
              <p className="text-muted-foreground">
                The requested plugin could not be found.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Enhanced plugin info for the detail page
  const pluginInfo = {
    ...plugin,
    longDescription: `${
      plugin.description
    }\n\nThis plugin provides comprehensive functionality for ${
      plugin.platform
    } platform users. It includes advanced features for ${plugin.function.toLowerCase()} and integrates seamlessly with your existing workflow.\n\nKey features include:\n• Advanced configuration options\n• Real-time data processing\n• Customizable user interface\n• API integration capabilities\n• Performance optimization\n• Cross-platform compatibility\n\nThe plugin has been thoroughly tested and optimized for production use. It supports multiple data formats and provides extensive customization options to meet your specific needs.`,
    screenshots: [
      'https://via.placeholder.com/800x600/4A90E2/FFFFFF?text=Screenshot+1+-+Main+Interface',
      'https://via.placeholder.com/800x600/7ED321/FFFFFF?text=Screenshot+2+-+Configuration',
      'https://via.placeholder.com/800x600/F5A623/FFFFFF?text=Screenshot+3+-+Analytics',
      'https://via.placeholder.com/800x600/BD10E0/FFFFFF?text=Screenshot+4+-+Export',
    ],
    videoUrl:
      'https://via.placeholder.com/800x450/BD10E0/FFFFFF?text=Demo+Video+-+Click+to+Play',
    requirements: [
      `${plugin.platform} v2.0 or higher`,
      'Minimum 4GB RAM',
      '100MB available storage',
      'Internet connection required',
      'WebGL support (for 3D features)',
    ],
    permissions: {
      dataAccess: [
        'Read access to spatial layers and datasets',
        'Write access to user-created content',
        'Access to project configuration settings',
        'Read metadata from imported files'
      ],
      networkAccess: [
        'Connect to external mapping services (OpenStreetMap, satellite imagery)',
        'Download elevation data from government databases',
        'Access real-time weather data APIs',
        'Sync data with cloud storage services'
      ],
      systemAccess: [
        'Access to local file system for import/export',
        'Use system clipboard for data transfer',
        'Access to graphics hardware (GPU) for 3D rendering',
        'Temporary storage for processing large datasets'
      ],
      dataHandling: {
        collection: 'This plugin collects usage analytics to improve performance and user experience. No personal data is collected.',
        storage: 'Spatial data is processed locally and temporarily cached. User preferences are stored locally in browser storage.',
        sharing: 'No data is shared with third parties without explicit user consent. Analytics data is anonymized.',
        retention: 'Cached data is automatically cleared after 24 hours. User settings persist until manually cleared.',
        encryption: 'All network communications use HTTPS encryption. Local data storage uses browser security standards.'
      },
      compliance: [
        'GDPR compliant data handling',
        'SOC 2 Type II security standards',
        'ISO 27001 information security management',
        'Regular security audits and vulnerability assessments'
      ]
    },
    changelog: [
      {
        version: plugin.version,
        date: plugin.lastUpdated,
        changes: [
          'Fixed compatibility issues with latest platform version',
          'Improved performance by 25%',
          'Added new configuration options',
          'Enhanced user interface',
          'Bug fixes and stability improvements',
        ],
      },
      {
        version: '2.0.0',
        date: '2024-01-01',
        changes: [
          'Major UI redesign with modern interface',
          'New API endpoints for better integration',
          'Enhanced security features',
          'Performance optimizations',
          'Added dark mode support',
        ],
      },
    ],
  };

  // Filter projects based on search term
  const filteredProjects = visualizerProjects.filter(
    (project) =>
      project.name.toLowerCase().includes(projectSearchTerm.toLowerCase()) ||
      project.description
        .toLowerCase()
        .includes(projectSearchTerm.toLowerCase())
  );

  const handleInstall = () => {
    setProjectSearchTerm(''); // Clear search when opening modal
    setShowProjectModal(true);
  };

  const handleProjectInstall = (project) => {
    setInstallingProject(project.id);
    setTimeout(() => {
      setShowProjectModal(false);
      setInstallingProject(null);
      installPlugin(pluginId);

      // Show notification banner instead of alert
      setNotificationData({
        pluginName: plugin.name,
        projectName: project.name,
        projectUrl: project.url,
      });
      setShowNotification(true);

      // Auto-hide notification after 10 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 10000);
    }, 1200);
  };

  const handleDownload = () => {
    alert(`Downloading ${plugin.name} v${plugin.version} (${plugin.size})`);
  };

  const handleLike = () => {
    setLikedPlugins((prev) =>
      prev.includes(pluginId)
        ? prev.filter((id) => id !== pluginId)
        : [...prev, pluginId]
    );
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const isPluginInstalled = () => {
    return installedPlugins.includes(pluginId) || plugin.installed;
  };

  const isPluginLiked = () => {
    return likedPlugins.includes(pluginId);
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'Visualizer':
        return 'platform-visualizer';
      case 'CMS':
        return 'platform-cms';
      case 'Flow':
        return 'platform-flow';
      default:
        return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Project selection modal */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="bg-[#1a1a1a] rounded-2xl p-8 max-w-4xl w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-medium text-gray-300">
                All projects
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setProjectSearchTerm('');
                  setShowProjectModal(false);
                }}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={projectSearchTerm}
                onChange={(e) => setProjectSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className={`relative rounded-2xl bg-[#2a2a2a] overflow-hidden cursor-pointer transition-all duration-300 ${
                    installingProject === project.id
                      ? 'ring-2 ring-green-500 bg-green-900/20'
                      : 'hover:bg-[#333] hover:scale-105'
                  }`}
                  onClick={() => handleProjectInstall(project)}
                >
                  {/* Project Image */}
                  <div className="aspect-video bg-[#333] flex items-center justify-center">
                    <div className="w-16 h-16 opacity-60">
                      <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full text-red-400"
                      >
                        <path
                          d="M20 30 Q30 20 40 30 Q50 20 60 30 Q70 20 80 30 Q70 40 60 30 Q50 40 40 30 Q30 40 20 30 Z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                        <path
                          d="M20 50 Q30 40 40 50 Q50 40 60 50 Q70 40 80 50 Q70 60 60 50 Q50 60 40 50 Q30 60 20 50 Z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                        <path
                          d="M20 70 Q30 60 40 70 Q50 60 60 70 Q70 60 80 70 Q70 80 60 70 Q50 80 40 70 Q30 80 20 70 Z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium text-lg">
                        {project.name}
                      </h3>
                      {installingProject === project.id && (
                        <div className="text-green-400 text-sm font-medium animate-pulse mt-1">
                          Installing...
                        </div>
                      )}
                    </div>
                    <div className="text-gray-400">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}

              {/* Create Project Button */}
              <div
                className="relative rounded-2xl bg-[#2a2a2a] overflow-hidden cursor-pointer transition-all duration-300 hover:bg-[#333] hover:scale-105 border-2 border-dashed border-gray-500"
                onClick={() =>
                  window.open(
                    'https://visualizer.dev.reearth.io/dashboard/01jz7fqyph3wh2gkas313ymm3j',
                    '_blank'
                  )
                }
              >
                {/* Create Project Content */}
                <div className="aspect-video bg-[#333] flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <Plus className="w-12 h-12 mb-2" />
                    <span className="text-sm font-medium">New Project</span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-4 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-gray-300 font-medium text-lg">
                      Create Project
                    </h3>
                  </div>
                </div>
              </div>

              {/* No results message */}
              {filteredProjects.length === 0 && projectSearchTerm && (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-400 text-lg">
                    No projects found matching "{projectSearchTerm}"
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Try adjusting your search terms or create a new project
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() =>
                  window.open(
                    'https://visualizer.dev.reearth.io/dashboard/01jz7fqyph3wh2gkas313ymm3j',
                    '_blank'
                  )
                }
                className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Project
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setProjectSearchTerm('');
                  setShowProjectModal(false);
                }}
                className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button onClick={onBack} variant="outline" size="lg">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Plugins
          </Button>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={handleLike}>
              <Heart
                className={`h-4 w-4 mr-2 ${
                  isPluginLiked() ? 'fill-red-500 text-red-500' : ''
                }`}
              />
              {isPluginLiked() ? 'Liked' : 'Like'}
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Plugin Header */}
        <Card className="border-2">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-3">
                  <CardTitle className="text-3xl font-bold">
                    {plugin.name}
                  </CardTitle>
                  {isPluginInstalled() && (
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  )}
                </div>
                <div className="flex items-center space-x-6 text-muted-foreground mb-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span className="text-lg">{plugin.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Updated {plugin.lastUpdated}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <HardDrive className="h-5 w-5" />
                    <span>{plugin.size}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-6 mb-6">
                  <div className="flex items-center space-x-2">
                    <Star className="h-6 w-6 fill-current text-yellow-500" />
                    <span className="font-bold text-xl">{plugin.rating}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Download className="h-6 w-6 text-blue-500" />
                    <span className="font-semibold text-lg">
                      {plugin.downloads.toLocaleString()} downloads
                    </span>
                  </div>
                  <Badge variant="outline" className="text-lg px-3 py-1">
                    v{plugin.version}
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-3">
                {/* Platform Badge */}
                <Badge
                  variant={getPlatformColor(plugin.platform)}
                  className="text-lg px-4 py-2"
                >
                  {plugin.platform.toUpperCase()}
                </Badge>
                {/* Sub Tags */}
                {plugin.pluginTypes &&
                  plugin.pluginTypes.map((type) => (
                    <Badge
                      key={type}
                      variant={type.toLowerCase()}
                      className="text-sm px-3 py-1"
                    >
                      {type.charAt(0).toUpperCase() +
                        type.slice(1).toLowerCase()}
                    </Badge>
                  ))}
                {plugin.pluginType && (
                  <Badge
                    variant={plugin.pluginType.toLowerCase()}
                    className="text-sm px-3 py-1"
                  >
                    {plugin.pluginType.charAt(0).toUpperCase() +
                      plugin.pluginType.slice(1).toLowerCase()}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {plugin.description}
            </p>
            <div className="flex space-x-4">
              {isPluginInstalled() ? (
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 max-w-sm text-lg py-6"
                  disabled
                >
                  ✓ Installed
                </Button>
              ) : (
                <Button
                  onClick={handleInstall}
                  size="lg"
                  className="flex-1 max-w-sm text-lg py-6"
                  style={{
                    background: '#3e41ca',
                    color: 'white',
                    borderColor: '#3e41ca',
                  }}
                >
                  Install Plugin
                </Button>
              )}
              <Button
                variant="outline"
                size="lg"
                onClick={handleDownload}
                className="text-lg py-6"
              >
                <Download className="h-5 w-5 mr-2" />
                Download ZIP
              </Button>
              <Button variant="outline" size="lg" className="text-lg py-6">
                <ExternalLink className="h-5 w-5 mr-2" />
                View Source
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="border-b-2">
          <nav className="flex space-x-12">
            {['overview', 'screenshots', 'changelog', 'requirements', 'permissions'].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 border-b-2 font-semibold text-lg transition-colors ${
                    activeTab === tab
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              )
            )}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-2xl">
                  <FileText className="h-6 w-6" />
                  <span>Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <div className="whitespace-pre-line text-foreground text-lg leading-relaxed">
                    {pluginInfo.longDescription}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'screenshots' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-2xl">
                  <ImageIcon className="h-6 w-6" />
                  <span>Screenshots & Media</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-10">
                  {/* Demo Video */}
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Demo Video</h3>
                    <div className="relative bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
                      <img
                        src={pluginInfo.videoUrl}
                        alt="Demo Video"
                        className="w-full h-96 object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                        <Button
                          size="lg"
                          className="rounded-full text-xl py-6 px-8"
                        >
                          <Play className="h-8 w-8 mr-3" />
                          Play Demo
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Screenshots */}
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Screenshots</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {pluginInfo.screenshots.map((screenshot, index) => (
                        <img
                          key={index}
                          src={screenshot}
                          alt={`Screenshot ${index + 1}`}
                          className="w-full h-64 object-cover rounded-xl border-2 hover:shadow-xl transition-shadow cursor-pointer"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'changelog' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Version History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {pluginInfo.changelog.map((version, index) => (
                    <div key={index} className="border-l-4 border-primary pl-6">
                      <div className="flex items-center space-x-4 mb-3">
                        <h3 className="font-bold text-xl">
                          v{version.version}
                        </h3>
                        <span className="text-muted-foreground">
                          {version.date}
                        </span>
                      </div>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        {version.changes.map((change, changeIndex) => (
                          <li key={changeIndex} className="text-lg">
                            {change}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'requirements' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">System Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="font-bold text-xl mb-4">
                      Minimum Requirements
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {pluginInfo.requirements.map((req, index) => (
                        <li key={index} className="text-lg">
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-4">Compatibility</h3>
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline" className="text-lg px-4 py-2">
                        {plugin.platform}
                      </Badge>
                      <Badge variant="outline" className="text-lg px-4 py-2">
                        {plugin.function}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'permissions' && (
            <div className="space-y-6">
              {/* Permissions Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Shield className="h-6 w-6 text-blue-500" />
                    <span>Permissions & Privacy</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground mb-6">
                    This plugin requires the following permissions to function properly. 
                    All data handling follows industry security standards and privacy best practices.
                  </p>
                  
                  {/* Data Access Permissions */}
                  <div className="mb-8">
                    <h3 className="flex items-center space-x-2 text-xl font-bold mb-4">
                      <Database className="h-5 w-5 text-green-500" />
                      <span>Data Access</span>
                    </h3>
                    <ul className="space-y-2">
                      {pluginInfo.permissions.dataAccess.map((permission, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-lg">{permission}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Network Access */}
                  <div className="mb-8">
                    <h3 className="flex items-center space-x-2 text-xl font-bold mb-4">
                      <Globe className="h-5 w-5 text-blue-500" />
                      <span>Network Access</span>
                    </h3>
                    <ul className="space-y-2">
                      {pluginInfo.permissions.networkAccess.map((permission, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-lg">{permission}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* System Access */}
                  <div className="mb-8">
                    <h3 className="flex items-center space-x-2 text-xl font-bold mb-4">
                      <HardDrive className="h-5 w-5 text-purple-500" />
                      <span>System Access</span>
                    </h3>
                    <ul className="space-y-2">
                      {pluginInfo.permissions.systemAccess.map((permission, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                          <span className="text-lg">{permission}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Data Handling & Privacy */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Lock className="h-6 w-6 text-amber-500" />
                    <span>Data Handling & Privacy</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="flex items-center space-x-2 font-bold text-lg mb-2">
                      <Eye className="h-5 w-5 text-amber-500" />
                      <span>Data Collection</span>
                    </h4>
                    <p className="text-lg text-muted-foreground">
                      {pluginInfo.permissions.dataHandling.collection}
                    </p>
                  </div>

                  <div>
                    <h4 className="flex items-center space-x-2 font-bold text-lg mb-2">
                      <Database className="h-5 w-5 text-amber-500" />
                      <span>Data Storage</span>
                    </h4>
                    <p className="text-lg text-muted-foreground">
                      {pluginInfo.permissions.dataHandling.storage}
                    </p>
                  </div>

                  <div>
                    <h4 className="flex items-center space-x-2 font-bold text-lg mb-2">
                      <Share2 className="h-5 w-5 text-amber-500" />
                      <span>Data Sharing</span>
                    </h4>
                    <p className="text-lg text-muted-foreground">
                      {pluginInfo.permissions.dataHandling.sharing}
                    </p>
                  </div>

                  <div>
                    <h4 className="flex items-center space-x-2 font-bold text-lg mb-2">
                      <Calendar className="h-5 w-5 text-amber-500" />
                      <span>Data Retention</span>
                    </h4>
                    <p className="text-lg text-muted-foreground">
                      {pluginInfo.permissions.dataHandling.retention}
                    </p>
                  </div>

                  <div>
                    <h4 className="flex items-center space-x-2 font-bold text-lg mb-2">
                      <Shield className="h-5 w-5 text-amber-500" />
                      <span>Data Encryption</span>
                    </h4>
                    <p className="text-lg text-muted-foreground">
                      {pluginInfo.permissions.dataHandling.encryption}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Security & Compliance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <AlertTriangle className="h-6 w-6 text-red-500" />
                    <span>Security & Compliance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground mb-4">
                    This plugin adheres to the following security standards and compliance requirements:
                  </p>
                  <ul className="space-y-2">
                    {pluginInfo.permissions.compliance.map((standard, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-lg">{standard}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="font-bold text-lg mb-2 text-blue-800 dark:text-blue-200">
                      Need Help?
                    </h4>
                    <p className="text-blue-700 dark:text-blue-300">
                      If you have questions about data handling or security practices, 
                      please contact the plugin developer or review our privacy policy.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Notification Banner */}
      {showNotification && (
        <NotificationBanner
          onClose={handleCloseNotification}
          pluginName={notificationData.pluginName}
          projectName={notificationData.projectName}
          projectUrl={notificationData.projectUrl}
        />
      )}
    </div>
  );
};

export default PluginDetailPage;
