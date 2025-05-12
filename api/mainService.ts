import axios from 'axios';
import { getApiUrl } from './authService';
// Define the base URL for your json-server
// Ensure this matches how you run your json-server (e.g., port)
const API_URL = getApiUrl();

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

/**
 * Fetches the walking intensity chart data from the server.
 */
export async function fetchWalkingIntensityChartData(): Promise<WalkingIntensityChartData> {
  try {
    const response = await axios.get<WalkingIntensityChartData>(`${API_URL}/walkingIntensityChart`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch walking intensity chart data:', error);
    // In a real app, you might throw a more specific error or handle it
    // For now, rethrow or return a default/empty state
    throw error; 
  }
} 