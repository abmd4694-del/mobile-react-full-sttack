import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Image } from 'expo-image';
import { Booking } from '../services/storageService';
import { MOCK_PROVIDERS } from '../constants/mockData';
import { theme } from '../constants/theme';

interface AppointmentCardProps {
  booking: Booking;
  onCancel?: (id: string) => void;
}

export const AppointmentCard = ({ booking, onCancel }: AppointmentCardProps) => {
  const provider = MOCK_PROVIDERS.find(p => p.id === booking.providerId);
  const isUpcoming = booking.status === 'upcoming';
  const isCancelled = booking.status === 'cancelled';

  if (!provider) return null;

  const handleCancel = () => {
    Alert.alert(
      "Cancel Appointment",
      "Are you sure you want to cancel this appointment?",
      [
        { text: "No", style: "cancel" },
        { 
          text: "Yes, Cancel", 
          style: "destructive",
          onPress: () => onCancel && onCancel(booking.id)
        }
      ]
    );
  };

  const formattedDate = new Date(booking.date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <View style={[styles.card, isCancelled && styles.cardCancelled]}>
      <View style={styles.header}>
        <View style={styles.providerInfo}>
          <Image 
            source={{ uri: provider.profileImage }} 
            style={[styles.image, isCancelled && styles.imageCancelled]}
            contentFit="cover"
          />
          <View>
            <Text style={[styles.name, isCancelled && styles.textCancelled]}>{provider.name}</Text>
            <Text style={[styles.category, isCancelled && styles.textCancelled]}>{provider.category}</Text>
          </View>
        </View>
        <View style={[
          styles.badge, 
          isUpcoming ? styles.badgeUpcoming : 
          isCancelled ? styles.badgeCancelled : styles.badgeCompleted
        ]}>
          <Text style={[
            styles.badgeText,
            isUpcoming ? styles.badgeTextUpcoming : 
            isCancelled ? styles.badgeTextCancelled : styles.badgeTextCompleted
          ]}>
            {booking.status.toUpperCase()}
          </Text>
        </View>
      </View>
      
      <View style={styles.dateTimeContainer}>
        <View style={styles.dateTimeBox}>
          <Text style={styles.dateTimeLabel}>Date</Text>
          <Text style={[styles.dateTimeValue, isCancelled && styles.textCancelled]}>{formattedDate}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.dateTimeBox}>
          <Text style={styles.dateTimeLabel}>Time</Text>
          <Text style={[styles.dateTimeValue, isCancelled && styles.textCancelled]}>{booking.time}</Text>
        </View>
      </View>

      {isUpcoming && onCancel && (
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel Appointment</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.l,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    ...theme.shadows.small,
  },
  cardCancelled: {
    backgroundColor: theme.colors.surface,
    opacity: 0.8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.m,
  },
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: theme.spacing.s,
  },
  imageCancelled: {
    opacity: 0.5,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: theme.colors.text,
  },
  category: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  textCancelled: {
    color: theme.colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.round,
  },
  badgeUpcoming: {
    backgroundColor: theme.colors.primaryLight + '20',
  },
  badgeCompleted: {
    backgroundColor: theme.colors.success + '20',
  },
  badgeCancelled: {
    backgroundColor: theme.colors.error + '20',
  },
  badgeText: {
    fontSize: 10,
    fontFamily: 'Inter_700Bold',
  },
  badgeTextUpcoming: {
    color: theme.colors.primary,
  },
  badgeTextCompleted: {
    color: theme.colors.success,
  },
  badgeTextCancelled: {
    color: theme.colors.error,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.s,
  },
  dateTimeBox: {
    flex: 1,
  },
  divider: {
    width: 1,
    backgroundColor: theme.colors.border,
    marginHorizontal: theme.spacing.m,
  },
  dateTimeLabel: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  dateTimeValue: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    color: theme.colors.text,
  },
  cancelButton: {
    marginTop: theme.spacing.s,
    paddingVertical: theme.spacing.s,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.error,
    borderRadius: theme.borderRadius.m,
  },
  cancelButtonText: {
    color: theme.colors.error,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
  },
});
