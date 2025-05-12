import { fetchWalkingIntensityChartData } from '@/api/mainService';
import { WalkingIntensityChartData } from '@/api/mainService';
import { useAppTheme } from '@/context/ThemeContext';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ActivityIndicator, Platform, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { BarChart, yAxisSides } from 'react-native-gifted-charts';

// Activity level color thresholds
const ACTIVITY_COLORS = {
  LOW: '#B0D8FF',
  MEDIUM: '#5CA8FF',
  HIGH: '#1A56CC'
};

export function WalkingIntensityGraph() {
  const { theme } = useAppTheme();
  const { width: screenWidth } = useWindowDimensions();

  const {
    data: chartDataResponse,
    isLoading,
    error,
  } = useQuery<WalkingIntensityChartData, Error>({
    queryKey: ['walkingIntensityChart'],
    queryFn: fetchWalkingIntensityChartData,
  });

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centeredStatus, { backgroundColor: theme.secondaryBackground }]}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={{ marginTop: 10, color: theme.text }}>Загрузка графика...</Text>
      </View>
    );
  }

  if (error || !chartDataResponse) {
    return (
      <View style={[styles.container, styles.centeredStatus, { backgroundColor: theme.secondaryBackground }]}>
        <Text style={{ color: theme.error }}>{error?.message || 'Данные для графика отсутствуют.'}</Text>
      </View>
    );
  }
  
  const chartDisplayData = chartDataResponse; // Use a different variable name to avoid conflict with gifted-charts own 'data' prop context

  const isWeb = Platform.OS === 'web';
  const containerWidth = Math.min(isWeb ? Math.min(screenWidth * 0.85, 950) : screenWidth * 0.85, 950);
  const chartHeight = isWeb ? 230 : 200;
  // The chart width will be mostly managed by the BarChart component based on its content and parent container
  // We ensure the parent container (styles.container) has the correct overall width and maxWidth.

  const getColumnColor = (value: number) => {
    if (value <= 25) return ACTIVITY_COLORS.LOW;
    if (value <= 50) return ACTIVITY_COLORS.MEDIUM;
    return ACTIVITY_COLORS.HIGH;
  };

  const barData = chartDisplayData.dataPoints.map(dp => ({
    value: dp.value,
    label: dp.time,
    frontColor: getColumnColor(dp.value),
    capRadius: 5,
    labelTextStyle: { color: theme.secondaryText, fontSize: isWeb ? 14 : 12 },
  }));

  const yAxisMax = 75; // Explicit max value for Y axis for consistent scaling
  const yAxisLabels = ["Низк.", "Сред.", "Выс."]; // Desired labels

  return (
    <View style={[styles.container, { 
      backgroundColor: theme.secondaryBackground, 
      borderColor: theme.primary, 
      width: containerWidth 
    }]}>
      <Text style={[styles.mainTitle, { color: theme.text }]}>{chartDisplayData.title}</Text>
      
      <View style={styles.chartContentWrapper}> 
        <BarChart
          data={barData}
          width={containerWidth * 0.9} // Chart takes a percentage of the container width
          height={chartHeight}
          maxValue={yAxisMax}
          noOfSections={3} // Creates 3 segments, leading to 4 lines (0, 25, 50, 75)
          xAxisThickness={1}
          xAxisColor={theme.placeholderText}
          yAxisThickness={0} // Hide Y axis line, rely on rules
          yAxisLabelTexts={['0', yAxisLabels[0], yAxisLabels[1], yAxisLabels[2]]} // Custom labels at tick positions
          yAxisTextStyle={{ color: theme.secondaryText, fontSize: isWeb ? 14 : 12, textAlign: 'right' }}
          yAxisSide={yAxisSides.LEFT}
          yAxisLabelWidth={isWeb ? 45: 40}
          
          rulesType="solid" // Solid lines for segments
          rulesColor={theme.placeholderText}
          dashWidth={0} // Solid lines, so dashWidth is 0

          barWidth={Platform.select({web: 20, default: 18})} // Adjust bar width for compactness
          spacing={Platform.select({web: 15, default: 10})} // Adjust spacing for compactness
          barBorderRadius={5} // For rounded tops, if capRadius is not sufficient or for full radius

          isAnimated
          backgroundColor={theme.secondaryBackground} // Ensure chart bg matches container
        />
      </View>
      <Text style={[styles.xAxisLabelStyle, { color: theme.secondaryText }]}>{chartDisplayData.xAxisLabel}</Text>
      
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: ACTIVITY_COLORS.LOW }]} />
          <Text style={[styles.legendText, { color: theme.secondaryText }]}>Низкий</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: ACTIVITY_COLORS.MEDIUM }]} />
          <Text style={[styles.legendText, { color: theme.secondaryText }]}>Средний</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: ACTIVITY_COLORS.HIGH }]} />
          <Text style={[styles.legendText, { color: theme.secondaryText }]}>Высокий</Text>
        </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '100%', // Fallback, actual width set by containerWidth
    maxWidth: 1024, // Max width for the entire component
    padding: 10,
    borderRadius: 15,
    borderWidth: 3,
    alignItems: 'center',
    marginBottom: 20,
  },
  centeredStatus: {
    justifyContent: 'center',
    minHeight: 200,
  },
  mainTitle: {
    fontSize: Platform.select({ web: 20, default: 18 }),
    fontWeight: 'bold',
    marginBottom: 15,
  },
  chartContentWrapper: { // New wrapper for centering chart if it's narrower than container
    width: '100%',
    alignItems: 'center', // Center the BarChart component itself
    marginBottom: 10,
    overflow: "hidden"
  },
  xAxisLabelStyle: {
    marginTop: 10,
    fontSize: Platform.select({ web: 14, default: 12 }),
    fontWeight: '500',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 5,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  legendText: {
    fontSize: Platform.OS === 'web' ? 12 : 10,
  },
}); 