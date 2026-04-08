import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../src/context/AuthContext';
import { theme } from '../../src/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../src/components/Button';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Sign Out", 
          style: "destructive",
          onPress: logout
        }
      ]
    );
  };

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Text style={styles.initials}>{getInitials(user?.name)}</Text>
        </View>
        <Text style={styles.name}>{user?.name || 'User'}</Text>
        <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="notifications-outline" size={22} color={theme.colors.text} style={styles.menuIcon} />
            <Text style={styles.menuText}>Notifications</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.border} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="shield-checkmark-outline" size={22} color={theme.colors.text} style={styles.menuIcon} />
            <Text style={styles.menuText}>Privacy & Security</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.border} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="help-circle-outline" size={22} color={theme.colors.text} style={styles.menuIcon} />
            <Text style={styles.menuText}>Help & Support</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.border} />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Button 
          title="Sign Out" 
          variant="outline" 
          onPress={handleLogout} 
          style={styles.logoutBtn}
        />
        <Text style={styles.version}>App Version 1.0.0</Text>
      </View>
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
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: theme.colors.text,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
    ...theme.shadows.medium,
  },
  initials: {
    fontSize: 36,
    fontFamily: 'Inter_700Bold',
    color: theme.colors.white,
  },
  name: {
    fontSize: 22,
    fontFamily: 'Inter_600SemiBold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: theme.colors.textSecondary,
  },
  menuSection: {
    paddingHorizontal: theme.spacing.xl,
    marginTop: theme.spacing.l,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: theme.spacing.m,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 30,
  },
  menuText: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: theme.colors.text,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },
  logoutBtn: {
    marginBottom: theme.spacing.m,
  },
  version: {
    textAlign: 'center',
    color: theme.colors.textSecondary,
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
  },
});
