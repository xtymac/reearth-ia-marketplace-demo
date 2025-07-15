import React, { useState } from 'react';
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
import { userRoles, platforms, functions } from '../../data/mockPlugins';
import {
  Code,
  Upload,
  FileText,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  Plus,
} from 'lucide-react';

const DeveloperCenterPage = () => {
  const { currentUser } = useUser();
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    name: '',
    platform: '',
    function: '',
    description: '',
    version: '1.0.0',
    file: null,
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Mock submitted plugins for the developer
  const mockSubmittedPlugins = [
    {
      id: 'dev-1',
      name: 'My Custom Analyzer',
      platform: 'Visualizer',
      function: 'Geoprocessing',
      version: '1.2.1',
      status: 'approved',
      submittedDate: '2024-01-10',
      reviewDate: '2024-01-15',
      downloads: 1247,
      feedback: 'Great plugin! Well documented and performs efficiently.',
    },
    {
      id: 'dev-2',
      name: 'Advanced Data Viewer',
      platform: 'CMS',
      function: 'UI Enhancements',
      version: '2.0.0',
      status: 'pending',
      submittedDate: '2024-01-18',
      reviewDate: null,
      downloads: 0,
      feedback: null,
    },
    {
      id: 'dev-3',
      name: 'AI Classification Tool',
      platform: 'Flow',
      function: 'AI',
      version: '1.0.0',
      status: 'rejected',
      submittedDate: '2024-01-05',
      reviewDate: '2024-01-12',
      downloads: 0,
      feedback:
        'Please improve error handling and add more comprehensive documentation.',
    },
  ];

  const handleUploadFormChange = (field, value) => {
    setUploadForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e) => {
    setUploadForm((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  const handleSubmitPlugin = () => {
    if (
      !uploadForm.name ||
      !uploadForm.platform ||
      !uploadForm.function ||
      !uploadForm.description
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    if (!agreedToTerms) {
      alert(
        'Please agree to the Terms of Service and Privacy Policy before submitting your plugin.'
      );
      return;
    }

    alert(
      `Plugin "${uploadForm.name}" submitted for review! (This is a mock action)`
    );
    setUploadForm({
      name: '',
      platform: '',
      function: '',
      description: '',
      version: '1.0.0',
      file: null,
    });
    setAgreedToTerms(false);
    setShowUploadForm(false);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending Review
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return null;
    }
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

  if (!currentUser.isLoggedIn) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <Code className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Login Required</h3>
          <p className="text-muted-foreground">
            Please log in to access the Developer Center.
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
          <h1 className="text-3xl font-bold">Developer Center</h1>
          <p className="text-muted-foreground mt-1">
            Upload and manage your plugins for the GIS marketplace
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge
            variant={
              currentUser.role === userRoles.DEVELOPER ? 'default' : 'outline'
            }
          >
            {currentUser.role}
          </Badge>
          {currentUser.role !== userRoles.DEVELOPER && (
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                alert('Role switching functionality would be implemented here')
              }
            >
              Become Developer
            </Button>
          )}
        </div>
      </div>

      {/* Developer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-center">
              {mockSubmittedPlugins.length}
            </div>
            <div className="text-xs text-muted-foreground text-center">
              Submitted Plugins
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-center text-green-600">
              {
                mockSubmittedPlugins.filter((p) => p.status === 'approved')
                  .length
              }
            </div>
            <div className="text-xs text-muted-foreground text-center">
              Approved
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-center text-yellow-600">
              {
                mockSubmittedPlugins.filter((p) => p.status === 'pending')
                  .length
              }
            </div>
            <div className="text-xs text-muted-foreground text-center">
              Pending
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-center">
              {mockSubmittedPlugins.reduce((sum, p) => sum + p.downloads, 0)}
            </div>
            <div className="text-xs text-muted-foreground text-center">
              Total Downloads
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Plugin Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Upload New Plugin</span>
              </CardTitle>
              <CardDescription>
                Submit a new plugin for review and publication
              </CardDescription>
            </div>
            <Button
              onClick={() => {
                setAgreedToTerms(false);
                setShowUploadForm(!showUploadForm);
              }}
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>{showUploadForm ? 'Cancel' : 'New Plugin'}</span>
            </Button>
          </div>
        </CardHeader>

        {showUploadForm && (
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Plugin Name *</label>
                <input
                  type="text"
                  placeholder="Enter plugin name"
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={uploadForm.name}
                  onChange={(e) =>
                    handleUploadFormChange('name', e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Platform *</label>
                <Select
                  value={uploadForm.platform}
                  onChange={(e) =>
                    handleUploadFormChange('platform', e.target.value)
                  }
                >
                  <option value="">Select platform</option>
                  {platforms
                    .filter((p) => p !== 'All')
                    .map((platform) => (
                      <option key={platform} value={platform}>
                        {platform}
                      </option>
                    ))}
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category *</label>
                <Select
                  value={uploadForm.function}
                  onChange={(e) =>
                    handleUploadFormChange('function', e.target.value)
                  }
                >
                  <option value="">Select function</option>
                  {functions
                    .filter((f) => f !== 'All')
                    .map((func) => (
                      <option key={func} value={func}>
                        {func}
                      </option>
                    ))}
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Version</label>
                <input
                  type="text"
                  placeholder="1.0.0"
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={uploadForm.version}
                  onChange={(e) =>
                    handleUploadFormChange('version', e.target.value)
                  }
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Description *</label>
                <textarea
                  placeholder="Describe your plugin's functionality and features"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[80px]"
                  value={uploadForm.description}
                  onChange={(e) =>
                    handleUploadFormChange('description', e.target.value)
                  }
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">
                  Plugin File (.zip)
                </label>
                <input
                  type="file"
                  accept=".zip"
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* Terms & Privacy Checkbox */}
            <div className="mt-6 flex items-start space-x-3">
              <input
                type="checkbox"
                id="dev-terms-checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-blue-600 bg-background border-input rounded focus:ring-blue-500 focus:ring-2"
              />
              <label
                htmlFor="dev-terms-checkbox"
                className="text-sm text-muted-foreground"
              >
                I agree to the{' '}
                <a
                  href="https://dev.reearth.io/terms-of-service"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-500 underline"
                >
                  Terms of Service
                </a>{' '}
                and{' '}
                <a
                  href="https://dev.reearth.io/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-500 underline"
                >
                  Privacy Policy
                </a>
              </label>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setAgreedToTerms(false);
                  setShowUploadForm(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitPlugin}
                disabled={!agreedToTerms}
                className={
                  !agreedToTerms ? 'opacity-50 cursor-not-allowed' : ''
                }
              >
                Submit for Review
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Submitted Plugins */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">My Submitted Plugins</h2>

        {mockSubmittedPlugins.length > 0 ? (
          <div className="space-y-4">
            {mockSubmittedPlugins.map((plugin) => (
              <Card key={plugin.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{plugin.name}</CardTitle>
                      <CardDescription className="mt-1">
                        Version {plugin.version} • Submitted{' '}
                        {plugin.submittedDate}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getPlatformColor(plugin.platform)}>
                        {plugin.platform}
                      </Badge>
                      {getStatusBadge(plugin.status)}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">
                        Function
                      </div>
                      <div>{plugin.function}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">
                        Downloads
                      </div>
                      <div>{plugin.downloads.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">
                        Review Status
                      </div>
                      <div>
                        {plugin.reviewDate
                          ? `Reviewed ${plugin.reviewDate}`
                          : 'Awaiting review'}
                      </div>
                    </div>
                  </div>

                  {plugin.feedback && (
                    <div className="mt-4 p-3 bg-muted/50 rounded-md">
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Reviewer Feedback
                      </div>
                      <p className="text-sm">{plugin.feedback}</p>
                    </div>
                  )}
                </CardContent>

                <CardFooter>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-1"
                    >
                      <Eye className="h-3 w-3" />
                      <span>View Details</span>
                    </Button>
                    {plugin.status !== 'approved' && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-1"
                      >
                        <Edit className="h-3 w-3" />
                        <span>Edit</span>
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-1 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span>Delete</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No plugins submitted yet
              </h3>
              <p className="text-muted-foreground mb-4">
                Start building and sharing your plugins with the GIS community.
              </p>
              <Button onClick={() => setShowUploadForm(true)}>
                Upload Your First Plugin
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Developer Resources</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Documentation</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Plugin Development Guide</li>
                <li>• API Reference</li>
                <li>• Best Practices</li>
                <li>• Testing Guidelines</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Support</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Developer Forum</li>
                <li>• Sample Code Repository</li>
                <li>• Video Tutorials</li>
                <li>• Technical Support</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeveloperCenterPage;
