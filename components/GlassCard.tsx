// 공통 GlassCard 컴포넌트
import { BlurView } from 'expo-blur';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: object;
  intensity?: number;
  borderRadius?: number;
};

export default function GlassCard({ children, style, intensity = 50, borderRadius = 24 }: Props) {
  if (Platform.OS === 'android') {
    return (
      <View style={[styles.base, { borderRadius, backgroundColor: 'rgba(255,255,255,0.60)' }, style]}>
        {children}
      </View>
    );
  }
  return (
    <BlurView intensity={intensity} tint="light" style={[styles.base, { borderRadius }, style]}>
      {children}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.45)',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 4,
  }
});
