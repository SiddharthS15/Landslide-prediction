// Configuration file for the Landslide Susceptibility Prediction System

const CONFIG = {
    // API Configuration
    apis: {
        geocoding: {
            provider: 'mock', // 'google', 'mapbox', 'nominatim', 'mock'
            apiKey: '', // Add your API key here
            baseUrl: 'https://maps.googleapis.com/maps/api/geocode/json'
        },
        weather: {
            provider: 'mock', // 'openweather', 'weatherapi', 'mock'
            apiKey: '', // Add your API key here
            baseUrl: 'https://api.openweathermap.org/data/2.5'
        },
        imagery: {
            provider: 'mock', // 'google', 'mapbox', 'bing', 'mock'
            apiKey: '', // Add your API key here
            baseUrl: 'https://maps.googleapis.com/maps/api/staticmap'
        }
    },

    // Prediction Model Parameters
    model: {
        // Weight factors for risk calculation (total should equal 100)
        weights: {
            rainfall: 30,        // Annual rainfall impact
            precipitation: 25,   // Recent precipitation impact
            slope: 25,          // Slope angle impact
            elevation: 10,      // Elevation impact
            soilType: 10        // Soil type impact
        },

        // Risk thresholds (percentages)
        riskThresholds: {
            low: 29,
            moderate: 49,
            high: 69,
            veryHigh: 100
        },

        // Environmental factor classifications
        classifications: {
            rainfall: {
                veryHigh: 2000,
                high: 1500,
                moderate: 1000,
                low: 500
            },
            precipitation: {
                veryHigh: 200,
                high: 150,
                moderate: 100,
                low: 50
            },
            slope: {
                veryHigh: 45,
                high: 30,
                moderate: 20,
                low: 10
            },
            elevation: {
                veryHigh: 2000,
                high: 1000,
                moderate: 500,
                low: 100
            }
        }
    },

    // UI Configuration
    ui: {
        // Animation settings
        animations: {
            duration: 300,
            easing: 'ease-out'
        },

        // File upload settings
        upload: {
            maxFileSize: 10 * 1024 * 1024, // 10MB
            acceptedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
        },

        // Map settings
        map: {
            defaultZoom: 10,
            defaultCenter: { lat: 20.5937, lng: 78.9629 } // India center
        }
    },

    // Regional Risk Zones (for location-based risk assessment)
    riskZones: {
        himalayas: {
            bounds: { 
                north: 35, south: 25, 
                east: 90, west: 70 
            },
            baseRisk: 'high',
            description: 'Himalayan region - High seismic activity and steep slopes'
        },
        westernGhats: {
            bounds: { 
                north: 20, south: 8, 
                east: 78, west: 72 
            },
            baseRisk: 'moderate',
            description: 'Western Ghats - Monsoon-prone mountainous region'
        },
        northeastIndia: {
            bounds: { 
                north: 30, south: 22, 
                east: 98, west: 88 
            },
            baseRisk: 'high',
            description: 'Northeast India - High rainfall and unstable geology'
        },
        deccanPlateau: {
            bounds: { 
                north: 22, south: 10, 
                east: 88, west: 72 
            },
            baseRisk: 'low',
            description: 'Deccan Plateau - Generally stable with isolated risk areas'
        }
    },

    // Soil Type Classifications
    soilTypes: {
        clay: {
            risk: 'high',
            description: 'High water retention, prone to instability when saturated',
            recommendations: ['Monitor soil moisture', 'Improve drainage', 'Avoid construction during monsoon']
        },
        silt: {
            risk: 'moderate',
            description: 'Moderate stability, requires monitoring during heavy rainfall',
            recommendations: ['Regular monitoring', 'Maintain drainage', 'Monitor during heavy rains']
        },
        sand: {
            risk: 'low',
            description: 'Good drainage, generally stable',
            recommendations: ['Standard monitoring', 'Prevent erosion', 'Maintain vegetation']
        },
        loam: {
            risk: 'low',
            description: 'Balanced composition, generally stable',
            recommendations: ['Routine checks', 'Maintain vegetation', 'Monitor during extreme weather']
        },
        rock: {
            risk: 'veryLow',
            description: 'High stability, excellent drainage',
            recommendations: ['Minimal monitoring required', 'Check for rock fall', 'Standard safety measures']
        }
    },

    // Development and Debug Settings
    debug: {
        enabled: true,
        logLevel: 'info', // 'debug', 'info', 'warn', 'error'
        mockData: true,
        simulateNetworkDelay: true
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
