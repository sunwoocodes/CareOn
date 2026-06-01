import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { usePathname, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Modal, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type BottomNavProps = {
  activeTab?: string;
  hide?: boolean;
};

export default function BottomNav({ activeTab, hide }: BottomNavProps) {
  const router = useRouter();
  const path = usePathname();
  const insets = useSafeAreaInsets();

  const [fabOpen, setFabOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: fabOpen ? 1 : 0,
      friction: 6,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, [fabOpen]);

  const showFab = path === '/' || path === '/community';

  if (hide) return null;

  const items = [
    { to: '/', name: 'index', icon: 'home', label: '홈' },
    { to: '/record', name: 'record', icon: 'edit-note', label: '기록' },
    { to: '/map', name: 'map', icon: 'map', label: '지도' },
    { to: '/community', name: 'community', icon: 'groups', label: '커뮤니티' },
    { to: '/profile', name: 'profile', icon: 'person', label: '내 정보' },
  ];

  return (
    <>
      <View
        className="absolute bottom-0 left-0 w-full z-40 rounded-t-3xl border-t border-slate-100"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 20, // High elevation creates a wider blur on Android, showing above the bar
          backgroundColor: 'transparent'
        }}
      >
        <BlurView
          intensity={80}
          tint="light"
          className="flex-row justify-around items-center px-2 pt-4 bg-white/80 overflow-hidden rounded-t-3xl"
          style={{ paddingBottom: insets.bottom + 12 }}
        >
          {items.map((item) => {
            const isActive = activeTab ? activeTab === item.to : path === item.to;
            return (
              <TouchableOpacity
                key={item.to}
                onPress={() => router.replace(item.to as any)}
                className="items-center px-3 py-1"
                activeOpacity={0.7}
              >
                <MaterialIcons
                  name={item.icon as any}
                  size={24}
                  color={isActive ? '#004ac6' : '#94a3b8'}
                />
                <Text className={`font-body text-[10px] font-bold mt-1 ${isActive ? 'text-primary' : 'text-slate-400'}`}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </BlurView>
      </View>

      {/* FAB Button - Only visible on Home and Community */}
      {showFab && (
        <TouchableOpacity
          className="absolute z-50 right-5 items-center justify-center"
          style={{
            bottom: insets.bottom + 100,
            width: 56,
            height: 56,
            borderRadius: 28,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 10,
            elevation: 6
          }}
          activeOpacity={0.9}
          onPress={() => setFabOpen(true)}
        >
          <LinearGradient
            colors={['#60a5fa', '#2563eb']}
            style={{ width: '100%', height: '100%', borderRadius: 28, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(147,197,253,0.6)' }}
          >
            <MaterialIcons name="add" size={32} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      )}

      {/* FAB Menu Overlay */}
      {showFab && (
        <Modal visible={fabOpen} transparent animationType="fade">
          <View className="flex-1 bg-slate-900/40 justify-end">
            <TouchableOpacity className="absolute inset-0" activeOpacity={1} onPress={() => setFabOpen(false)} />

            {/* Menu Items */}
            <View className="absolute right-6 items-end" style={{ bottom: insets.bottom + 175 }}>
              <Animated.View style={{ opacity: slideAnim, transform: [{ translateY: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }], marginBottom: 16 }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  className="flex-row items-center gap-3"
                  onPress={() => { setFabOpen(false); setTimeout(() => router.push('/diagnosis-analysis'), 100); }}
                >
                  <Text className="text-white font-bold bg-slate-800/80 px-3 py-1.5 rounded-xl overflow-hidden">증상 체크하기</Text>
                  <View
                    className="w-12 h-12 bg-white rounded-full items-center justify-center"
                    style={{
                      shadowColor: '#000',
                      shadowOpacity: 0.2,
                      shadowOffset: { width: 0, height: 4 },
                      shadowRadius: 8,
                      elevation: 5
                    }}
                  >
                    <MaterialIcons name="monitor-heart" size={22} color="#2563eb" />
                  </View>
                </TouchableOpacity>
              </Animated.View>

              <Animated.View style={{ opacity: slideAnim, transform: [{ translateY: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) }] }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  className="flex-row items-center gap-3"
                  onPress={() => { setFabOpen(false); setTimeout(() => router.push('/diet'), 100); }}
                >
                  <Text className="text-white font-bold bg-slate-800/80 px-3 py-1.5 rounded-xl overflow-hidden">식단 기록하기</Text>
                  <View
                    className="w-12 h-12 bg-white rounded-full items-center justify-center"
                    style={{
                      shadowColor: '#000',
                      shadowOpacity: 0.2,
                      shadowOffset: { width: 0, height: 4 },
                      shadowRadius: 8,
                      elevation: 5
                    }}
                  >
                    <MaterialIcons name="restaurant" size={22} color="#f59e0b" />
                  </View>
                </TouchableOpacity>
              </Animated.View>
            </View>

            {/* Close FAB */}
            <TouchableOpacity
              className="absolute z-50 right-5 items-center justify-center"
              style={{
                bottom: insets.bottom + 100,
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: '#ffffff',
                shadowColor: '#000',
                shadowOpacity: 0.15,
                shadowOffset: { width: 0, height: 6 },
                shadowRadius: 15,
                elevation: 8
              }}
              activeOpacity={0.9}
              onPress={() => setFabOpen(false)}
            >
              <Animated.View style={{ transform: [{ rotate: slideAnim.interpolate({ inputRange: [0, 1], outputRange: ['-90deg', '0deg'] }) }] }}>
                <MaterialIcons name="close" size={28} color="#64748b" />
              </Animated.View>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </>
  );
}