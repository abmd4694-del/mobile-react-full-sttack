import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { MOCK_PROVIDERS, TIME_SLOTS } from '../../src/constants/mockData';
import { theme } from '../../src/constants/theme';
import { Button } from '../../src/components/Button';
import { storageService } from '../../src/services/storageService';
import { useAuth } from '../../src/context/AuthContext';

export default function ProviderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isBooking, setIsBooking] = useState(false);

  const provider = MOCK_PROVIDERS.find(p => p.id === id);

  if (!provider) {
    return (
      <View style={styles.centered}>
        <Text>Provider not found</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  const today = new Date().toISOString().split('T')[0];

  const handleBook = async () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Selection Required', 'Please select a date and time.');
      return;
    }

    if (!user) {
      router.push('/login');
      return;
    }

    setIsBooking(true);
    try {
      await storageService.bookAppointment({
        providerId: provider.id,
        userId: user.id,
        date: selectedDate,
        time: selectedTime,
      });

      Alert.alert(
        'Booking Confirmed!',
        `Your appointment with ${provider.name} on ${selectedDate} at ${selectedTime} is confirmed.`,
        [{ text: 'OK', onPress: () => router.push('/(tabs)/appointments') }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to book appointment. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header Content */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <Image 
            source={{ uri: provider.profileImage }} 
            style={styles.image}
            contentFit="cover"
          />
          <Text style={styles.name}>{provider.name}</Text>
          <Text style={styles.category}>{provider.category}</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="star" size={18} color={theme.colors.warning} />
              <Text style={styles.statValue}>{provider.rating}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="time" size={18} color={theme.colors.primary} />
              <Text style={styles.statValue}>{provider.experience}</Text>
              <Text style={styles.statLabel}>Experience</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="cash" size={18} color={theme.colors.success} />
              <Text style={styles.statValue}>{provider.price.split('/')[0]}</Text>
              <Text style={styles.statLabel}>/ hour</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bio}>{provider.bio}</Text>
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <View style={styles.calendarContainer}>
            <Calendar
              minDate={today}
              onDayPress={(day: any) => {
                setSelectedDate(day.dateString);
                setSelectedTime('');
              }}
              markedDates={{
                [selectedDate]: { selected: true, selectedColor: theme.colors.primary }
              }}
              theme={{
                todayTextColor: theme.colors.primary,
                selectedDayBackgroundColor: theme.colors.primary,
                arrowColor: theme.colors.primary,
                textDayFontFamily: 'Inter_400Regular',
                textMonthFontFamily: 'Inter_600SemiBold',
                textDayHeaderFontFamily: 'Inter_500Medium',
              }}
            />
          </View>
        </View>

        {/* Time Selection */}
        {selectedDate ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Time</Text>
            <View style={styles.timeGrid}>
              {TIME_SLOTS.map((time) => {
                // Mock: disable some slots randomly based on date+time combination
                const hash = selectedDate.charCodeAt(selectedDate.length - 1) + time.charCodeAt(0);
                const isAvailable = hash % 3 !== 0;
                
                const isSelected = selectedTime === time;

                return (
                  <TouchableOpacity
                    key={time}
                    disabled={!isAvailable}
                    style={[
                      styles.timeSlot,
                      isSelected && styles.timeSlotSelected,
                      !isAvailable && styles.timeSlotDisabled
                    ]}
                    onPress={() => setSelectedTime(time)}
                  >
                    <Text style={[
                      styles.timeText,
                      isSelected && styles.timeTextSelected,
                      !isAvailable && styles.timeTextDisabled
                    ]}>
                      {time}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ) : null}

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Footer booking section */}
      <View style={styles.footer}>
        <View style={styles.footerInfo}>
          <Text style={styles.totalLabel}>Total Price</Text>
          <Text style={styles.totalPrice}>{provider.price}</Text>
        </View>
        <Button 
          title="Book Appointment" 
          onPress={handleBook}
          disabled={!selectedDate || !selectedTime}
          isLoading={isBooking}
          style={styles.bookBtn}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  header: {
    paddingHorizontal: theme.spacing.m,
    paddingTop: Platform.OS === 'ios' ? 0 : theme.spacing.xl,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: theme.spacing.m,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  category: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: theme.colors.primary,
    marginBottom: theme.spacing.l,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.l,
    padding: theme.spacing.m,
    width: '100%',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: theme.colors.border,
  },
  statValue: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: theme.colors.text,
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: theme.colors.textSecondary,
  },
  section: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  bio: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
  calendarContainer: {
    borderRadius: theme.borderRadius.m,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  timeSlot: {
    width: '31%',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.m,
    alignItems: 'center',
  },
  timeSlotSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  timeSlotDisabled: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.surface,
    opacity: 0.5,
  },
  timeText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: theme.colors.text,
  },
  timeTextSelected: {
    color: theme.colors.white,
  },
  timeTextDisabled: {
    color: theme.colors.textSecondary,
  },
  bottomPadding: {
    height: 100, // Padding for footer
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.m,
    paddingBottom: Platform.OS === 'ios' ? 34 : theme.spacing.l,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    ...theme.shadows.medium,
  },
  footerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  totalLabel: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: theme.colors.textSecondary,
  },
  totalPrice: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: theme.colors.text,
  },
  bookBtn: {
    width: '60%',
  },
});
