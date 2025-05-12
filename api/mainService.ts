import axios from 'axios';

// Define the base URL for your API server
// This can be configured based on environment (dev, staging, prod)
const API_URL = process.env.EXPO_PUBLIC_API_URL;

// Define types for our data models
export interface WalkingIntensityDataPoint {
  time: string;
  value: number;
  isPeak?: boolean;
}

export interface WalkingIntensityChartYAxisConfig {
  labels: string[];
  segments: number;
}

export interface WalkingIntensityChartData {
  title: string;
  xAxisLabel: string;
  yAxisConfig: WalkingIntensityChartYAxisConfig;
  dataPoints: WalkingIntensityDataPoint[];
}

export interface PressureZone {
  id: string;
  zoneName: string;
  pressureLevel: number;
}

export interface FootPressureData {
  leftFoot: PressureZone[];
  rightFoot: PressureZone[];
}

// API functions

/**
 * Fetches the walking intensity chart data from the server.
 */
export async function fetchWalkingIntensityChartData(): Promise<WalkingIntensityChartData> {
  try {
    const response = await axios.get<WalkingIntensityChartData>(`${API_URL}/walkingIntensityChart`, {

    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch walking intensity chart data:', error);
    throw error;
  }
}

/**
 * Fetches the foot pressure data from the server.
 */
export async function fetchFootPressureData(): Promise<FootPressureData> {
  try {
    const response = await axios.get<FootPressureData>(`${API_URL}/footPressureData`, {

    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch foot pressure data:', error);
    throw error;
  }
}

/**
 * Checks if the API server is up and running.
 */
export async function checkApiHealth(): Promise<{ status: string; timestamp: Date }> {
  try {
    const response = await axios.get(`${API_URL}/health`, {

    });
    return response.data;
  } catch (error) {
    console.error('API health check failed:', error);
    throw error;
  }
}

// Export a default object with all API functions
export default {
  fetchWalkingIntensityChartData,
  fetchFootPressureData,
  checkApiHealth,
}; 