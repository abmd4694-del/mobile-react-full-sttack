import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { theme } from '../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  isLoading?: boolean;
  disabled?: boolean;
  style?: object;
}

export const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  isLoading = false, 
  disabled = false,
  style
}: ButtonProps) => {
  if (variant === 'primary') {
    return (
      <TouchableOpacity 
        onPress={onPress} 
        disabled={disabled || isLoading}
        style={[styles.base, disabled && styles.disabled, style]}
      >
        <LinearGradient
          colors={[theme.colors.primaryLight, theme.colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {isLoading ? (
            <ActivityIndicator color={theme.colors.white} />
          ) : (
            <Text style={[styles.text, styles.textPrimary]}>{title}</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary': return [styles.secondary, disabled && styles.disabled];
      case 'outline': return [styles.outline, disabled && styles.disabled];
      case 'danger': return [styles.danger, disabled && styles.disabled];
      default: return [];
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case 'secondary': return styles.textSecondary;
      case 'outline': return styles.textOutline;
      case 'danger': return styles.textDanger;
      default: return styles.textPrimary;
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.base, ...getVariantStyles(), style]} 
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.7}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'outline' ? theme.colors.primary : theme.colors.white} />
      ) : (
        <Text style={[styles.text, getTextStyles()]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.borderRadius.l,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    width: '100%',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondary: {
    backgroundColor: theme.colors.surface,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  danger: {
    backgroundColor: theme.colors.error,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
  textPrimary: {
    color: theme.colors.white,
  },
  textSecondary: {
    color: theme.colors.text,
  },
  textOutline: {
    color: theme.colors.primary,
  },
  textDanger: {
    color: theme.colors.white,
  },
});
