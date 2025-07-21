// Sample data for testing the Landslide Susceptibility Prediction System

const SAMPLE_DATA = {
    // Sample locations with known coordinates
    locations: [
        {
            name: "Mumbai, Maharashtra",
            lat: 19.0760,
            lng: 72.8777,
            description: "Coastal city with moderate landslide risk in hilly areas"
        },
        {
            name: "Darjeeling, West Bengal",
            lat: 27.0360,
            lng: 88.2627,
            description: "Himalayan hill station with high landslide susceptibility"
        },
        {
            name: "Munnar, Kerala",
            lat: 10.0889,
            lng: 77.0595,
            description: "Western Ghats hill station with monsoon-related risks"
        },
        {
            name: "Shimla, Himachal Pradesh",
            lat: 31.1048,
            lng: 77.1734,
            description: "Himalayan region with steep slopes and seismic activity"
        },
        {
            name: "Ooty, Tamil Nadu",
            lat: 11.4064,
            lng: 76.6932,
            description: "Nilgiri hills with moderate risk during monsoons"
        },
        {
            name: "Dehradun, Uttarakhand",
            lat: 30.3165,
            lng: 78.0322,
            description: "Foothills of Himalayas with variable risk zones"
        }
    ],

    // Sample environmental scenarios
    scenarios: [
        {
            name: "High Risk Scenario",
            location: "Steep mountainous terrain",
            data: {
                rainfall: 2500,
                precipitation: 250,
                slope: 50,
                elevation: 1800,
                soilType: "Clay soil - High water retention"
            },
            expectedRisk: "Very High"
        },
        {
            name: "Moderate Risk Scenario",
            location: "Hilly region with good drainage",
            data: {
                rainfall: 1200,
                precipitation: 120,
                slope: 25,
                elevation: 800,
                soilType: "Loamy soil - Balanced composition"
            },
            expectedRisk: "Moderate"
        },
        {
            name: "Low Risk Scenario",
            location: "Gentle slopes with stable soil",
            data: {
                rainfall: 800,
                precipitation: 50,
                slope: 15,
                elevation: 300,
                soilType: "Sandy soil - Good drainage"
            },
            expectedRisk: "Low"
        },
        {
            name: "Monsoon Emergency Scenario",
            location: "Clay-rich slopes during heavy rains",
            data: {
                rainfall: 3000,
                precipitation: 300,
                slope: 40,
                elevation: 1200,
                soilType: "Clay soil - High water retention"
            },
            expectedRisk: "Very High"
        }
    ],

    // Mock weather data for different conditions
    weatherConditions: [
        {
            condition: "Heavy Monsoon",
            rainfall24h: 150,
            humidity: 90,
            windSpeed: 25,
            temperature: 24,
            pressure: 1005
        },
        {
            condition: "Light Rain",
            rainfall24h: 20,
            humidity: 70,
            windSpeed: 10,
            temperature: 22,
            pressure: 1012
        },
        {
            condition: "Dry Season",
            rainfall24h: 0,
            humidity: 45,
            windSpeed: 8,
            temperature: 28,
            pressure: 1018
        },
        {
            condition: "Severe Storm",
            rainfall24h: 200,
            humidity: 95,
            windSpeed: 40,
            temperature: 20,
            pressure: 998
        }
    ],

    // Sample soil analysis results
    soilAnalysis: [
        {
            type: "Clay",
            characteristics: "High water retention, expands when wet, prone to instability",
            riskLevel: "High",
            color: "#8B4513",
            recommendations: [
                "Install proper drainage systems",
                "Monitor soil moisture levels",
                "Avoid construction during wet seasons",
                "Consider soil stabilization techniques"
            ]
        },
        {
            type: "Silt",
            characteristics: "Fine particles, moderate drainage, becomes slippery when wet",
            riskLevel: "Moderate",
            color: "#D2691E",
            recommendations: [
                "Regular slope monitoring",
                "Maintain vegetation cover",
                "Improve surface drainage",
                "Monitor during heavy rainfall"
            ]
        },
        {
            type: "Sand",
            characteristics: "Good drainage, loose when dry, generally stable",
            riskLevel: "Low",
            color: "#F4A460",
            recommendations: [
                "Prevent erosion with vegetation",
                "Standard monitoring protocols",
                "Maintain slope angles within safe limits"
            ]
        },
        {
            type: "Loam",
            characteristics: "Balanced mix, good structure, generally stable",
            riskLevel: "Low",
            color: "#8B4513",
            recommendations: [
                "Maintain natural vegetation",
                "Regular inspection during extreme weather",
                "Standard safety protocols"
            ]
        },
        {
            type: "Rock",
            characteristics: "High stability, excellent drainage, minimal soil cover",
            riskLevel: "Very Low",
            color: "#696969",
            recommendations: [
                "Check for rock fall potential",
                "Monitor joints and fractures",
                "Minimal intervention required"
            ]
        }
    ],

    // Historical landslide incidents (mock data)
    historicalIncidents: [
        {
            date: "2020-08-10",
            location: "Munnar, Kerala",
            severity: "High",
            casualties: 15,
            cause: "Heavy monsoon rainfall",
            areaAffected: "2.5 sq km"
        },
        {
            date: "2018-07-15",
            location: "Darjeeling, West Bengal",
            severity: "Very High",
            casualties: 8,
            cause: "Prolonged rainfall and deforestation",
            areaAffected: "1.8 sq km"
        },
        {
            date: "2019-09-22",
            location: "Shimla, Himachal Pradesh",
            severity: "Moderate",
            casualties: 3,
            cause: "Cloudbursts and steep slopes",
            areaAffected: "0.8 sq km"
        }
    ],

    // Recommendation templates based on risk levels
    recommendationTemplates: {
        veryHigh: [
            "Immediate evacuation of vulnerable areas",
            "Activate emergency response protocols",
            "Install real-time monitoring systems",
            "Restrict all construction activities",
            "Establish emergency communication systems",
            "Deploy early warning systems",
            "Coordinate with local emergency services"
        ],
        high: [
            "Enhanced monitoring of slope conditions",
            "Prepare evacuation plans",
            "Install drainage improvement systems",
            "Conduct regular geological assessments",
            "Implement community warning systems",
            "Restrict heavy construction work",
            "Increase frequency of safety inspections"
        ],
        moderate: [
            "Routine monitoring of environmental conditions",
            "Maintain proper drainage systems",
            "Conduct regular slope stability assessments",
            "Implement community awareness programs",
            "Monitor weather conditions closely",
            "Prepare basic emergency response plans"
        ],
        low: [
            "Standard monitoring protocols",
            "Maintain awareness of weather patterns",
            "Regular inspection of slopes and drainage",
            "Basic community preparedness",
            "Seasonal safety assessments"
        ]
    }
};

// Utility functions for working with sample data
const SampleDataUtils = {
    // Get random sample location
    getRandomLocation() {
        const locations = SAMPLE_DATA.locations;
        return locations[Math.floor(Math.random() * locations.length)];
    },

    // Get sample scenario by name
    getScenario(name) {
        return SAMPLE_DATA.scenarios.find(scenario => 
            scenario.name.toLowerCase().includes(name.toLowerCase())
        );
    },

    // Get weather condition by type
    getWeatherCondition(condition) {
        return SAMPLE_DATA.weatherConditions.find(weather => 
            weather.condition.toLowerCase().includes(condition.toLowerCase())
        );
    },

    // Get soil analysis by type
    getSoilAnalysis(type) {
        return SAMPLE_DATA.soilAnalysis.find(soil => 
            soil.type.toLowerCase() === type.toLowerCase()
        );
    },

    // Get recommendations by risk level
    getRecommendations(riskLevel) {
        const level = riskLevel.toLowerCase().replace(/\s+/g, '');
        return SAMPLE_DATA.recommendationTemplates[level] || 
               SAMPLE_DATA.recommendationTemplates.moderate;
    },

    // Generate random environmental data within realistic ranges
    generateRandomData() {
        return {
            rainfall: Math.round(500 + Math.random() * 2500),
            precipitation: Math.round(10 + Math.random() * 240),
            slope: Math.round(5 + Math.random() * 55),
            elevation: Math.round(100 + Math.random() * 2900)
        };
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SAMPLE_DATA, SampleDataUtils };
}
