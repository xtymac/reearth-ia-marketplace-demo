import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select } from '../ui/select';
import { useUser } from '../../contexts/UserContext';
import { userRoles } from '../../data/mockPlugins';
import { 
  User, 
  Settings, 
  Shield, 
  Key, 
  Mail, 
  Bell, 
  Globe,
  LogOut,
  UserPlus,
  Briefcase
} from 'lucide-react';

const AccountPage = () => {
  const { currentUser, logout, switchRole } = useUser();
  const [profileForm, setProfileForm] = useState({
    username: currentUser.username || 'demo-user',
    email: 'demo@example.com',
    fullName: 'Demo User',
    organization: 'GIS Solutions Inc.',
    location: 'San Francisco, CA'
  });
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    marketingEmails: false,
    autoUpdates: true,
    language: 'en'
  });

  const handleProfileChange = (field, value) => {
    setProfileForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreferenceChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    alert('Profile updated successfully! (This is a mock action)');
  };

  const handleRoleSwitch = (newRole) => {
    switchRole(newRole);
    alert(`Role switched to ${newRole}! (This is a mock action)`);
  };

  const handleLogout = () => {
    logout();
    alert('Logged out successfully!');
  };

  if (!currentUser.isLoggedIn) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Login Required</h3>
          <p className="text-muted-foreground">
            Please log in to access your account settings.
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
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your profile, preferences, and account security
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={currentUser.role === userRoles.DEVELOPER ? "default" : "outline"}>
            {currentUser.role}
          </Badge>
          <Button variant="outline" onClick={handleLogout} className="flex items-center space-x-2">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Profile Information</span>
          </CardTitle>
          <CardDescription>
            Update your personal information and profile details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <input
                type="text"
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={profileForm.username}
                onChange={(e) => handleProfileChange('username', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={profileForm.email}
                onChange={(e) => handleProfileChange('email', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <input
                type="text"
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={profileForm.fullName}
                onChange={(e) => handleProfileChange('fullName', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Organization</label>
              <input
                type="text"
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={profileForm.organization}
                onChange={(e) => handleProfileChange('organization', e.target.value)}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Location</label>
              <input
                type="text"
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={profileForm.location}
                onChange={(e) => handleProfileChange('location', e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button onClick={handleSaveProfile}>
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Role Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Role Management</span>
          </CardTitle>
          <CardDescription>
            Switch between user roles to access different features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <User className="h-8 w-8 text-blue-500" />
                <div>
                  <h4 className="font-medium">Standard User</h4>
                  <p className="text-sm text-muted-foreground">Browse and install plugins</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {currentUser.role === userRoles.USER && (
                  <Badge>Current</Badge>
                )}
                <Button 
                  variant={currentUser.role === userRoles.USER ? "outline" : "default"}
                  size="sm"
                  onClick={() => handleRoleSwitch(userRoles.USER)}
                  disabled={currentUser.role === userRoles.USER}
                >
                  {currentUser.role === userRoles.USER ? "Active" : "Switch"}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Briefcase className="h-8 w-8 text-green-500" />
                <div>
                  <h4 className="font-medium">Developer</h4>
                  <p className="text-sm text-muted-foreground">Upload and manage plugins</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {currentUser.role === userRoles.DEVELOPER && (
                  <Badge>Current</Badge>
                )}
                <Button 
                  variant={currentUser.role === userRoles.DEVELOPER ? "outline" : "default"}
                  size="sm"
                  onClick={() => handleRoleSwitch(userRoles.DEVELOPER)}
                  disabled={currentUser.role === userRoles.DEVELOPER}
                >
                  {currentUser.role === userRoles.DEVELOPER ? "Active" : "Switch"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Preferences</span>
          </CardTitle>
          <CardDescription>
            Configure your application preferences and notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Notifications */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center space-x-2">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Receive updates about your plugins and account
                    </div>
                  </div>
                  <Button
                    variant={preferences.emailNotifications ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePreferenceChange('emailNotifications', !preferences.emailNotifications)}
                  >
                    {preferences.emailNotifications ? "Enabled" : "Disabled"}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Marketing Emails</div>
                    <div className="text-sm text-muted-foreground">
                      Receive news and product updates
                    </div>
                  </div>
                  <Button
                    variant={preferences.marketingEmails ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePreferenceChange('marketingEmails', !preferences.marketingEmails)}
                  >
                    {preferences.marketingEmails ? "Enabled" : "Disabled"}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Auto-Updates</div>
                    <div className="text-sm text-muted-foreground">
                      Automatically update installed plugins
                    </div>
                  </div>
                  <Button
                    variant={preferences.autoUpdates ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePreferenceChange('autoUpdates', !preferences.autoUpdates)}
                  >
                    {preferences.autoUpdates ? "Enabled" : "Disabled"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Language */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span>Language & Region</span>
              </h4>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Language</label>
                <Select
                  value={preferences.language}
                  onChange={(e) => handlePreferenceChange('language', e.target.value)}
                  className="w-full md:w-64"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="zh">中文</option>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Key className="h-5 w-5" />
            <span>Security</span>
          </CardTitle>
          <CardDescription>
            Manage your account security settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Change Password</div>
                <div className="text-sm text-muted-foreground">
                  Update your account password
                </div>
              </div>
              <Button variant="outline" onClick={() => alert('Password change would be implemented here')}>
                Change Password
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Two-Factor Authentication</div>
                <div className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </div>
              </div>
              <Button variant="outline" onClick={() => alert('2FA setup would be implemented here')}>
                Setup 2FA
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">API Keys</div>
                <div className="text-sm text-muted-foreground">
                  Manage API keys for developer access
                </div>
              </div>
              <Button variant="outline" onClick={() => alert('API key management would be implemented here')}>
                Manage Keys
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            Irreversible account actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Export Account Data</div>
                <div className="text-sm text-muted-foreground">
                  Download your account data and plugin information
                </div>
              </div>
              <Button variant="outline" onClick={() => alert('Data export would be implemented here')}>
                Export Data
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-destructive">Delete Account</div>
                <div className="text-sm text-muted-foreground">
                  Permanently delete your account and all associated data
                </div>
              </div>
              <Button 
                variant="destructive" 
                onClick={() => alert('Account deletion would require additional confirmation steps')}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountPage; 