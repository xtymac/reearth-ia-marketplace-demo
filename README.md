# reearth-ia-marketplace-demo

# Re:Earth Marketplace Prototype

A comprehensive React-based prototype for a Plugin Marketplace supporting three GIS platforms: Visualizer, CMS, and Flow. This application allows users to browse, install, and manage plugins with different user roles and comprehensive filtering options.

## Features

### 🏠 Home Page

- Welcome interface with platform overview
- Featured plugins showcase
- Marketplace statistics
- Quick access to main features

### 🛒 Plugin Marketplace

- Browse plugins with comprehensive filtering
- Filter by platform (Visualizer, CMS, Flow)
- Filter by function (Visualization, Geoprocessing, API Integration, UI Enhancements, AI)
- Search functionality
- Plugin cards with detailed information
- Install/Download functionality based on user role

### 📦 My Plugins

- View installed plugins
- Update status tracking
- Plugin management (update/uninstall)
- Bulk operations
- Installation statistics

### 👨‍💻 Developer Center

- Plugin upload interface
- Submission status tracking
- Review feedback system
- Developer resources
- Upload form with validation

### ⚙️ Account Management

- Profile information management
- Role switching (User/Developer)
- Preferences and notifications
- Security settings
- Account actions

## User Roles

### Anonymous User

- Browse plugins
- View plugin details
- Download ZIP files
- Access to public information

### Logged-in User

- All anonymous features
- Install plugins
- Manage installed plugins
- Access My Plugins page
- Account management

### Developer

- All user features
- Upload new plugins
- Manage submitted plugins
- View submission status
- Access Developer Center

## Technology Stack

- **React 18** - Frontend framework
- **Tailwind CSS** - Styling framework
- **shadcn/ui** - UI component library
- **Lucide React** - Icon library
- **Context API** - State management

## Project Structure

```
src/
├── components/
│   ├── ui/           # shadcn/ui components
│   ├── pages/        # Page components
│   └── Navigation.jsx
├── contexts/         # React contexts
├── data/            # Mock data
├── lib/             # Utility functions
├── App.js           # Main app component
└── index.js         # React entry point
```

## Installation & Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the development server**

   ```bash
   npm start
   ```

3. **Open your browser**
   Navigate to `http://localhost:3000`

## Usage Guide

### Getting Started

1. Visit the home page to see the marketplace overview
2. Click "Quick Login" in the top navigation to simulate user login
3. Browse the Plugin Marketplace to see available plugins
4. Use filters to find specific plugins

### Role Simulation

- **Anonymous**: Default state - can browse and download
- **User**: Click "Quick Login" - can install plugins
- **Developer**: Switch role in Account page - can upload plugins

### Plugin Management

1. **Installing Plugins**:

   - Must be logged in
   - Click "Install" on any plugin card
   - View installed plugins in "My Plugins"

2. **Uploading Plugins** (Developer role):

   - Go to Developer Center
   - Click "New Plugin"
   - Fill out the form and submit

3. **Managing Plugins**:
   - View installations in "My Plugins"
   - Update or uninstall as needed

## Mock Data

The application includes comprehensive mock data:

- 10 sample plugins across all platforms
- Various plugin functions and categories
- Mock user data and preferences
- Simulated installation states
- Developer submission examples

## Key Features Demonstrated

### Responsive Design

- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interface

### User Experience

- Intuitive navigation
- Clear visual hierarchy
- Interactive feedback
- Role-based access control

### Information Architecture

- Logical content organization
- Consistent navigation patterns
- Clear user flows
- Comprehensive filtering

### Component Architecture

- Modular design
- Reusable UI components
- Clean separation of concerns
- Context-based state management

## Development Notes

This is a prototype with mock functionality:

- All API calls are simulated with alerts
- Data persistence is not implemented
- Authentication is simplified for demo purposes
- File uploads are mocked

For production implementation, you would need to:

- Integrate with a real backend API
- Implement proper authentication
- Add real file upload functionality
- Include proper error handling
- Add comprehensive testing

## Browser Support

- Modern browsers with ES6+ support
- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## License

This is a prototype for demonstration purposes.
