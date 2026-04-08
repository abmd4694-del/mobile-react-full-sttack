import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../src/context/AuthContext';
import { storageService, Booking } from '../../src/services/storageService';
import { AppointmentCard } from '../../src/components/AppointmentCard';
import { theme } from '../../src/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';

export default function AppointmentsScreen() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [appointments, setAppointments] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAppointments = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const data = await storageService.getBookings(user.id);
      setAppointments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAppointments();
    }, [user])
  );

  const handleCancelBooking = async (id: string) => {
    try {
      await storageService.cancelBooking(id);
      fetchAppointments();
    } catch (error) {
      console.error(error);
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredAppointments = appointments.filter(app => {
    const appDate = new Date(app.date);
    const isPastDate = appDate < today;
    
    if (activeTab === 'upcoming') {
      return !isPastDate && app.status !== 'completed';
    } else {
      return isPastDate || app.status === 'completed' || app.status === 'cancelled';
    }
  }).sort((a, b) => {
    // Sort upcoming ascending (nearest first), past descending (most recent first)
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return activeTab === 'upcoming' ? dateA - dateB : dateB - dateA;
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>My Appointments</Text>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>Past</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredAppointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AppointmentCard booking={item} onCancel={handleCancelBooking} />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchAppointments} tintColor={theme.colors.primary} />
        }
        ListEmptyComponent={() => (
          !isLoading && (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconContainer}>
                <Ionicons name="calendar-clear-outline" size={48} color={theme.colors.primaryLight} />
              </View>
              <Text style={styles.emptyTitle}>No appointments found</Text>
              <Text style={styles.emptySubtitle}>
                {activeTab === 'upcoming' 
                  ? "You don't have any upcoming appointments at the moment."
                  : "You don't have any past appointments yet."}
              </Text>
            </View>
          )
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  header: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.m,
    marginBottom: theme.spacing.m,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: theme.colors.text,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: theme.spacing.xl,
    backgroundColor: theme.colors.border,
    padding: 4,
    borderRadius: theme.borderRadius.l,
    marginBottom: theme.spacing.l,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: theme.borderRadius.m,
  },
  activeTab: {
    backgroundColor: theme.colors.white,
    ...theme.shadows.small,
  },
  tabText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 15,
    color: theme.colors.textSecondary,
  },
  activeTabText: {
    color: theme.colors.text,
    fontFamily: 'Inter_600SemiBold',
  },
  listContainer: {
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  emptySubtitle: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    color: theme.colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});
