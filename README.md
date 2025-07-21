# Landslide Susceptibility Prediction System

A modern web application for predicting landslide susceptibility using location data, environmental factors, and soil analysis through image upload.

## Features

### 🌍 Location Services
- **Automatic Geolocation**: Get current GPS coordinates
- **Address Geocoding**: Convert addresses to latitude/longitude
- **Interactive Coordinate Display**: Real-time lat/lng updates

### 🌧️ Environmental Analysis
- **Rainfall Data Input**: Annual and recent precipitation
- **Topographic Factors**: Slope angle and elevation
- **Weather Integration**: Ready for real-time weather API integration

### 🖼️ Soil Type Analysis
- **Image Upload**: Drag & drop or click to upload soil/terrain images
- **Visual Preview**: Instant image preview with analysis
- **Soil Classification**: Automated soil type detection simulation

### 🧠 AI-Powered Prediction
- **Risk Assessment**: Comprehensive landslide susceptibility scoring
- **Factor Analysis**: Individual risk factor evaluation
- **Smart Recommendations**: Contextual safety recommendations

### 📊 Modern UI/UX
- **Responsive Design**: Mobile-first, works on all devices
- **Glass Morphism**: Modern translucent design elements
- **Smooth Animations**: Elegant transitions and loading states
- **Intuitive Interface**: User-friendly form and results display

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for fonts and icons
- HTTPS (required for geolocation features)

### Installation

1. **Clone or Download**
   ```bash
   git clone <repository-url>
   cd landslide-susceptibility-prediction
   ```

2. **Open in Browser**
   - Simply open `index.html` in your web browser
   - For best results, serve through a local web server:
   
   **Using Python:**
   ```bash
   python -m http.server 8000
   ```
   Then visit: `http://localhost:8000`
   
   **Using Node.js:**
   ```bash
   npx serve .
   ```

3. **Enable Location Services**
   - Allow location access when prompted for GPS features
   - Ensure you're serving over HTTPS for production

## Usage Guide

### 1. Location Input
- **Manual Entry**: Type city name, address, or coordinates
- **GPS Location**: Click "Use Current Location" button
- **Coordinate Display**: View automatically detected lat/lng

### 2. Environmental Data
- **Annual Rainfall**: Enter in millimeters (e.g., 1200)
- **Recent Precipitation**: Last 24-48 hours in mm
- **Slope Angle**: Terrain slope in degrees (0-90)
- **Elevation**: Height above sea level in meters

### 3. Soil Analysis
- **Upload Image**: Drag & drop or click to select soil/terrain photo
- **Supported Formats**: JPG, PNG, GIF, WebP
- **Auto Analysis**: Soil type detection and classification

### 4. Risk Assessment
- **Submit Analysis**: Click "Analyze Landslide Risk"
- **View Results**: Comprehensive risk percentage and category
- **Factor Breakdown**: Individual risk factor analysis
- **Recommendations**: Actionable safety guidelines

## Risk Categories

### 🟢 Low Risk (0-29%)
- Standard monitoring protocols
- Regular weather awareness
- Basic slope inspections

### 🟡 Moderate Risk (30-49%)
- Routine monitoring advised
- Maintain drainage systems
- Regular geological surveys

### 🟠 High Risk (50-69%)
- Enhanced monitoring required
- Consider drainage improvements
- Community awareness programs

### 🔴 Very High Risk (70-100%)
- Immediate evacuation planning
- Install early warning systems
- Restrict construction activities

## Technical Implementation

### Frontend Technologies
- **HTML5**: Semantic structure and forms
- **CSS3**: Modern styling with glass morphism
- **Vanilla JavaScript**: No framework dependencies
- **Font Awesome**: Icon library
- **Google Fonts**: Inter font family

### Key JavaScript Features
- **Geolocation API**: GPS coordinate detection
- **File API**: Image upload and preview
- **Async/Await**: Modern promise handling
- **Local Storage**: Future data persistence
- **Responsive Events**: Mobile-optimized interactions

### CSS Highlights
- **CSS Grid & Flexbox**: Modern layout systems
- **CSS Variables**: Dynamic theming support
- **Backdrop Filter**: Glass morphism effects
- **Media Queries**: Responsive breakpoints
- **Animations**: Smooth micro-interactions

## Customization

### Styling
- Modify `styles.css` for visual customization
- Update CSS variables for theme changes
- Adjust responsive breakpoints as needed

### Prediction Model
- Replace mock prediction logic in `script.js`
- Integrate with actual ML models or APIs
- Customize risk calculation parameters

### API Integration
- **Geocoding**: Replace mock geocoding with Google Maps, Mapbox, or Nominatim
- **Weather Data**: Integrate OpenWeatherMap, WeatherAPI, or similar
- **Soil Analysis**: Connect to image recognition APIs
- **Historical Data**: Link to geological survey databases

## Future Enhancements

### 🎯 Planned Features
- **Real-time Weather Integration**: Live weather data
- **Satellite Imagery Analysis**: Computer vision for terrain
- **Historical Data**: Past landslide incident mapping
- **PDF Report Generation**: Downloadable assessments
- **Multi-language Support**: Internationalization
- **Offline Functionality**: Progressive Web App features

### 🔧 Technical Improvements
- **Machine Learning Model**: Real AI prediction algorithms
- **Database Integration**: User data persistence
- **API Rate Limiting**: Production-ready API handling
- **User Authentication**: Personal dashboards
- **Real-time Monitoring**: WebSocket connections

## Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

**Important**: This is a demonstration application with simulated prediction models. For real-world landslide risk assessment, consult with qualified geologists, environmental engineers, and use validated scientific models. Always follow local emergency management guidelines and professional geological surveys.

## Contact

For questions, suggestions, or collaboration opportunities, please reach out through the repository issues or contact the development team.

---

**Built with ❤️ for safer communities**
