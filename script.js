// Global variables
let currentLat = null;
let currentLng = null;
let uploadedImage = null;

// DOM Elements
const form = document.getElementById('predictionForm');
const locationInput = document.getElementById('location');
const getLocationBtn = document.getElementById('getLocationBtn');
const latValue = document.getElementById('latValue');
const lngValue = document.getElementById('lngValue');
const uploadArea = document.getElementById('uploadArea');
const soilImage = document.getElementById('soilImage');
const imagePreview = document.getElementById('imagePreview');
const soilTypeResult = document.getElementById('soilTypeResult');
const resultsSection = document.getElementById('resultsSection');
const loadingOverlay = document.getElementById('loadingOverlay');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    initializeGeocoding();
});

// Event Listeners
function initializeEventListeners() {
    // Form submission
    form.addEventListener('submit', handleFormSubmit);
    
    // Location services
    getLocationBtn.addEventListener('click', getCurrentLocation);
    locationInput.addEventListener('input', debounce(geocodeLocation, 500));
    
    // File upload
    uploadArea.addEventListener('click', () => soilImage.click());
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    soilImage.addEventListener('change', handleImageUpload);
}

// Geocoding and Location Services
function initializeGeocoding() {
    // Note: In a production environment, you would use a proper geocoding service
    // like Google Maps API, Mapbox, or OpenStreetMap Nominatim
    console.log('Geocoding service initialized');
}

async function geocodeLocation() {
    const location = locationInput.value.trim();
    if (!location) return;
    
    try {
        // Mock geocoding - replace with actual service
        const coords = await mockGeocode(location);
        updateCoordinates(coords.lat, coords.lng);
    } catch (error) {
        console.error('Geocoding error:', error);
    }
}

async function mockGeocode(location) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock coordinates for demonstration
    const mockLocations = {
        'mumbai': { lat: 19.0760, lng: 72.8777 },
        'delhi': { lat: 28.7041, lng: 77.1025 },
        'bangalore': { lat: 12.9716, lng: 77.5946 },
        'kerala': { lat: 10.8505, lng: 76.2711 },
        'himachal pradesh': { lat: 31.1048, lng: 77.1734 },
        'uttarakhand': { lat: 30.0668, lng: 79.0193 },
        'darjeeling': { lat: 27.0360, lng: 88.2627 }
    };
    
    const key = location.toLowerCase();
    for (const [place, coords] of Object.entries(mockLocations)) {
        if (key.includes(place)) {
            return coords;
        }
    }
    
    // Default coordinates if location not found
    return { lat: 20.5937 + Math.random() * 10, lng: 78.9629 + Math.random() * 10 };
}

function getCurrentLocation() {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by this browser.');
        return;
    }
    
    getLocationBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Getting Location...';
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            updateCoordinates(lat, lng);
            reverseGeocode(lat, lng);
            getLocationBtn.innerHTML = '<i class="fas fa-crosshairs"></i> Use Current Location';
        },
        (error) => {
            console.error('Geolocation error:', error);
            alert('Unable to get your location. Please enter manually.');
            getLocationBtn.innerHTML = '<i class="fas fa-crosshairs"></i> Use Current Location';
        }
    );
}

async function reverseGeocode(lat, lng) {
    // Mock reverse geocoding
    locationInput.value = `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
}

function updateCoordinates(lat, lng) {
    currentLat = lat;
    currentLng = lng;
    latValue.textContent = lat.toFixed(6);
    lngValue.textContent = lng.toFixed(6);
}

// File Upload Handlers
function handleDragOver(e) {
    e.preventDefault();
    uploadArea.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleImageFile(files[0]);
    }
}

function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
        handleImageFile(file);
    }
}

function handleImageFile(file) {
    if (!file.type.startsWith('image/')) {
        alert('Please upload an image file.');
        return;
    }
    
    uploadedImage = file;
    
    // Display image preview
    const reader = new FileReader();
    reader.onload = function(e) {
        imagePreview.innerHTML = `<img src="${e.target.result}" alt="Soil sample">`;
        analyzeSoilType(file);
    };
    reader.readAsDataURL(file);
}

async function analyzeSoilType(imageFile) {
    // Mock soil type analysis
    const soilTypes = [
        'Clay soil - High water retention, prone to instability when saturated',
        'Sandy soil - Good drainage, moderate stability',
        'Loamy soil - Balanced composition, generally stable',
        'Rocky soil - High stability, good drainage',
        'Silt soil - Moderate stability, requires monitoring during heavy rainfall'
    ];
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const randomSoilType = soilTypes[Math.floor(Math.random() * soilTypes.length)];
    soilTypeResult.textContent = `Detected: ${randomSoilType}`;
    soilTypeResult.style.display = 'block';
    soilTypeResult.classList.add('fade-in');
}

// Form Submission and Prediction
async function handleFormSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    showLoading();
    
    try {
        const formData = collectFormData();
        const prediction = await performPrediction(formData);
        displayResults(prediction);
    } catch (error) {
        console.error('Prediction error:', error);
        alert('An error occurred during prediction. Please try again.');
    } finally {
        hideLoading();
    }
}

function validateForm() {
    if (!currentLat || !currentLng) {
        alert('Please provide a valid location.');
        return false;
    }
    
    const requiredFields = ['rainfall', 'precipitation', 'slope', 'elevation'];
    for (const field of requiredFields) {
        const value = document.getElementById(field).value;
        if (!value || isNaN(value) || value < 0) {
            alert(`Please provide a valid ${field} value.`);
            return false;
        }
    }
    
    return true;
}

function collectFormData() {
    return {
        latitude: currentLat,
        longitude: currentLng,
        rainfall: parseFloat(document.getElementById('rainfall').value),
        precipitation: parseFloat(document.getElementById('precipitation').value),
        slope: parseFloat(document.getElementById('slope').value),
        elevation: parseFloat(document.getElementById('elevation').value),
        soilImage: uploadedImage,
        soilType: soilTypeResult.textContent
    };
}

async function performPrediction(data) {
    // Simulate ML model prediction
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Calculate risk based on input parameters
    let riskScore = 0;
    
    // Rainfall factor (0-30 points)
    if (data.rainfall > 2000) riskScore += 25;
    else if (data.rainfall > 1500) riskScore += 20;
    else if (data.rainfall > 1000) riskScore += 15;
    else if (data.rainfall > 500) riskScore += 10;
    else riskScore += 5;
    
    // Recent precipitation factor (0-25 points)
    if (data.precipitation > 200) riskScore += 25;
    else if (data.precipitation > 150) riskScore += 20;
    else if (data.precipitation > 100) riskScore += 15;
    else if (data.precipitation > 50) riskScore += 10;
    else riskScore += 5;
    
    // Slope factor (0-25 points)
    if (data.slope > 45) riskScore += 25;
    else if (data.slope > 30) riskScore += 20;
    else if (data.slope > 20) riskScore += 15;
    else if (data.slope > 10) riskScore += 10;
    else riskScore += 5;
    
    // Elevation factor (0-10 points)
    if (data.elevation > 2000) riskScore += 10;
    else if (data.elevation > 1000) riskScore += 8;
    else if (data.elevation > 500) riskScore += 6;
    else riskScore += 3;
    
    // Soil type factor (0-10 points)
    if (data.soilType && data.soilType.includes('Clay')) riskScore += 10;
    else if (data.soilType && data.soilType.includes('Silt')) riskScore += 7;
    else if (data.soilType && data.soilType.includes('Loamy')) riskScore += 5;
    else if (data.soilType && data.soilType.includes('Sandy')) riskScore += 3;
    else riskScore += 1;
    
    // Add some randomness to simulate real-world variability
    riskScore += Math.random() * 10 - 5;
    
    // Normalize to percentage
    const riskPercentage = Math.min(Math.max(riskScore, 0), 100);
    
    return {
        riskPercentage: Math.round(riskPercentage),
        factors: {
            rainfall: calculateFactorImpact(data.rainfall, 'rainfall'),
            topography: calculateFactorImpact(data.slope, 'slope'),
            soil: calculateSoilImpact(data.soilType),
            location: calculateLocationImpact(data.latitude, data.longitude)
        },
        recommendations: generateRecommendations(riskPercentage, data)
    };
}

function calculateFactorImpact(value, type) {
    if (type === 'rainfall') {
        if (value > 2000) return 'Very High';
        if (value > 1500) return 'High';
        if (value > 1000) return 'Moderate';
        return 'Low';
    } else if (type === 'slope') {
        if (value > 45) return 'Very High';
        if (value > 30) return 'High';
        if (value > 20) return 'Moderate';
        return 'Low';
    }
    return 'Moderate';
}

function calculateSoilImpact(soilType) {
    if (!soilType) return 'Unknown';
    if (soilType.includes('Clay')) return 'High';
    if (soilType.includes('Silt')) return 'Moderate';
    if (soilType.includes('Sandy')) return 'Low';
    if (soilType.includes('Rocky')) return 'Very Low';
    return 'Moderate';
}

function calculateLocationImpact(lat, lng) {
    // Mock location-based risk assessment
    // In reality, this would use historical landslide data, geological surveys, etc.
    const himalayanRegion = lat > 25 && lat < 35 && lng > 70 && lng < 90;
    const westernGhats = lat > 8 && lat < 20 && lng > 72 && lng < 78;
    const northeastIndia = lat > 22 && lat < 30 && lng > 88 && lng < 98;
    
    if (himalayanRegion || northeastIndia) return 'Very High';
    if (westernGhats) return 'High';
    return 'Moderate';
}

function generateRecommendations(riskPercentage, data) {
    const recommendations = [];
    
    if (riskPercentage > 70) {
        recommendations.push('Immediate evacuation planning recommended');
        recommendations.push('Install early warning systems');
        recommendations.push('Restrict construction activities');
        recommendations.push('Implement emergency response protocols');
    } else if (riskPercentage > 40) {
        recommendations.push('Enhanced monitoring required');
        recommendations.push('Consider drainage improvements');
        recommendations.push('Regular slope stability assessments');
        recommendations.push('Community awareness programs');
    } else if (riskPercentage > 20) {
        recommendations.push('Routine monitoring advised');
        recommendations.push('Maintain proper drainage systems');
        recommendations.push('Regular geological surveys');
    } else {
        recommendations.push('Standard monitoring protocols');
        recommendations.push('Maintain awareness of weather conditions');
        recommendations.push('Regular inspection of slopes');
    }
    
    // Add specific recommendations based on factors
    if (data.rainfall > 2000) {
        recommendations.push('Extra caution during monsoon season');
    }
    
    if (data.slope > 30) {
        recommendations.push('Consider slope stabilization measures');
    }
    
    if (data.soilType && data.soilType.includes('Clay')) {
        recommendations.push('Monitor soil moisture levels closely');
    }
    
    return recommendations;
}

function displayResults(prediction) {
    // Update risk percentage and category
    const riskPercentage = prediction.riskPercentage;
    document.getElementById('riskPercentage').textContent = `${riskPercentage}%`;
    
    // Determine risk category and color
    let category, description, colorClass;
    if (riskPercentage >= 70) {
        category = 'Very High Risk';
        description = 'Immediate action required. High probability of landslide occurrence.';
        colorClass = 'risk-very-high';
    } else if (riskPercentage >= 50) {
        category = 'High Risk';
        description = 'Significant landslide risk. Enhanced monitoring and precautions needed.';
        colorClass = 'risk-high';
    } else if (riskPercentage >= 30) {
        category = 'Moderate Risk';
        description = 'Moderate landslide susceptibility. Regular monitoring advised.';
        colorClass = 'risk-moderate';
    } else {
        category = 'Low Risk';
        description = 'Low landslide probability. Standard precautions sufficient.';
        colorClass = 'risk-low';
    }
    
    document.getElementById('riskCategory').textContent = category;
    document.getElementById('riskDescription').textContent = description;
    document.getElementById('riskCircle').className = `risk-circle ${colorClass}`;
    
    // Update factor impacts
    document.getElementById('rainfallImpact').textContent = prediction.factors.rainfall;
    document.getElementById('topographyImpact').textContent = prediction.factors.topography;
    document.getElementById('soilImpact').textContent = prediction.factors.soil;
    document.getElementById('locationImpact').textContent = prediction.factors.location;
    
    // Update recommendations
    const recommendationsList = document.getElementById('recommendationsList');
    recommendationsList.innerHTML = '';
    prediction.recommendations.forEach(rec => {
        const li = document.createElement('li');
        li.textContent = rec;
        recommendationsList.appendChild(li);
    });
    
    // Show results section with animation
    resultsSection.style.display = 'block';
    resultsSection.classList.add('fade-in');
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Utility Functions
function showLoading() {
    loadingOverlay.style.display = 'flex';
}

function hideLoading() {
    loadingOverlay.style.display = 'none';
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Additional Features

// Weather API Integration (mock)
async function fetchWeatherData(lat, lng) {
    // In production, integrate with a weather API like OpenWeatherMap
    return {
        temperature: Math.round(15 + Math.random() * 20),
        humidity: Math.round(60 + Math.random() * 30),
        windSpeed: Math.round(5 + Math.random() * 15),
        visibility: Math.round(5 + Math.random() * 15)
    };
}

// Satellite Image Analysis (mock)
async function analyzeSatelliteImagery(lat, lng) {
    // In production, this would integrate with satellite imagery APIs
    // and use computer vision to analyze terrain features
    return {
        vegetationCover: Math.round(30 + Math.random() * 50),
        slopeStability: Math.random() > 0.5 ? 'Stable' : 'Unstable',
        recentChanges: Math.random() > 0.7 ? 'Detected' : 'None'
    };
}

// Historical Data Integration (mock)
async function getHistoricalLandslideData(lat, lng) {
    // In production, this would query historical landslide databases
    const incidents = Math.floor(Math.random() * 5);
    return {
        incidentCount: incidents,
        lastIncident: incidents > 0 ? '2019-07-15' : null,
        severity: incidents > 2 ? 'High' : incidents > 0 ? 'Medium' : 'Low'
    };
}

// Export functionality for reports
function exportReport() {
    // Generate and download a PDF report
    const reportData = {
        timestamp: new Date().toISOString(),
        location: locationInput.value,
        coordinates: { lat: currentLat, lng: currentLng },
        riskAssessment: document.getElementById('riskCategory').textContent,
        recommendations: Array.from(document.getElementById('recommendationsList').children)
            .map(li => li.textContent)
    };
    
    console.log('Report data:', reportData);
    alert('Report export functionality would be implemented here');
}

// Real-time monitoring setup
function setupRealTimeMonitoring() {
    // In production, this would establish WebSocket connections
    // for real-time weather and seismic data
    console.log('Real-time monitoring would be set up here');
}

console.log('Landslide Susceptibility Prediction System loaded successfully');
