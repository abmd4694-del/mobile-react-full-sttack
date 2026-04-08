import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from '../constants/mockData';
import { theme } from '../constants/theme';
import { useRouter } from 'expo-router';

interface ProviderCardProps {
  provider: Provider;
}

export const ProviderCard = ({ provider }: ProviderCardProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity 
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => router.push(`/provider/${provider.id}`)}
    >
      <View style={styles.header}>
        <Image 
          source={{ uri: provider.profileImage }} 
          style={styles.image}
          contentFit="cover"
        />
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>{provider.name}</Text>
          <View style={styles.metaRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{provider.category}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={14} color={theme.colors.warning} />
              <Text style={styles.rating}>{provider.rating}</Text>
            </View>
          </View>
          <Text style={styles.experience}>{provider.experience} experience</Text>
        </View>
      </View>
      
      <Text style={styles.bio} numberOfLines={2}>{provider.bio}</Text>
      
      <View style={styles.footer}>
        <Text style={styles.price}>{provider.price}</Text>
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => router.push(`/provider/${provider.id}`)}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.l,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    ...theme.shadows.medium,
  },
  header: {
    flexDirection: 'row',
    marginBottom: theme.spacing.m,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: theme.spacing.m,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  categoryBadge: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.s,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: theme.colors.primary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: theme.colors.textSecondary,
    marginLeft: 4,
  },
  experience: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: theme.colors.textSecondary,
  },
  bio: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: theme.spacing.m,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.m,
  },
  price: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: theme.colors.text,
  },
  bookButton: {
    backgroundColor: theme.colors.primaryLight + '20',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.round,
  },
  bookButtonText: {
    color: theme.colors.primary,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
  },
});
