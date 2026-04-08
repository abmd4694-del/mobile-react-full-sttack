import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Booking {
  id: string;
  providerId: string;
  userId: string;
  date: string; // ISO string
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

const STORAGE_KEYS = {
  USERS: '@bookmyslot_users',
  BOOKINGS: '@bookmyslot_bookings',
  CURRENT_USER: '@bookmyslot_current_user',
};

class StorageService {
  // === Bookings ===
  async getBookings(userId: string): Promise<Booking[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.BOOKINGS);
      const bookings: Booking[] = data ? JSON.parse(data) : [];
      return bookings.filter(b => b.userId === userId).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } catch (error) {
      console.error('Error fetching bookings', error);
      return [];
    }
  }

  async bookAppointment(booking: Omit<Booking, 'id' | 'createdAt' | 'status'>): Promise<Booking> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.BOOKINGS);
      const bookings: Booking[] = data ? JSON.parse(data) : [];
      
      const newBooking: Booking = {
        ...booking,
        id: Math.random().toString(36).substr(2, 9),
        status: 'upcoming',
        createdAt: new Date().toISOString(),
      };
      
      bookings.push(newBooking);
      await AsyncStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
      return newBooking;
    } catch (error) {
      console.error('Error creating booking', error);
      throw error;
    }
  }

  async cancelBooking(bookingId: string): Promise<void> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.BOOKINGS);
      if (!data) return;
      
      const bookings: Booking[] = JSON.parse(data);
      const updatedBookings = bookings.map(b => 
        b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
      );
      
      await AsyncStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updatedBookings));
    } catch (error) {
      console.error('Error canceling booking', error);
      throw error;
    }
  }

  // === Mock DB Helper ===
  async initializeMockData() {
    // Optionally seed initial data here if needed
  }
}

export const storageService = new StorageService();
