import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import React from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type TopBarProps = {
  title?: string;
  showBack?: boolean;
  showNotification?: boolean;
  rightIcon?: string;
  userImageSource?: any;
  scrollY?: Animated.Value;
  onBackPress?: () => void;
};

export default function TopBar({
  title = "CareOn",
  showBack = false,
  showNotification = true,
  rightIcon,
  userImageSource = require('../assets/images/puang.png'),
  scrollY,
  onBackPress
}: TopBarProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const bgOpacity = scrollY ? scrollY.interpolate({
    inputRange: [0, 40],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  }) : 0;

  return (
    <View
      className="absolute top-0 left-0 w-full z-50 px-5 flex-row justify-between items-center"
      style={{ paddingTop: insets.top + 12, paddingBottom: 12 }}
    >
      {/* 부드럽게 나타나는 배경 Layer */}
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: bgOpacity }]}>
        <BlurView
          intensity={100}
          tint="light"
          style={StyleSheet.absoluteFill}
          className="bg-white/70 border-b border-slate-100/50"
        />
      </Animated.View>
      {/* 1. 좌측 영역 (뒤로가기 버튼 또는 프로필 이미지) */}
      <View className="w-10 items-start justify-center z-10">
        {showBack ? (
          <TouchableOpacity onPress={() => onBackPress ? onBackPress() : (router.canGoBack() ? router.back() : router.replace('/'))} className="p-1 -ml-1 rounded-full" activeOpacity={0.7}>
            <MaterialIcons name="arrow-back" size={26} color="#334155" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/profile')}>
            <Image
              source={userImageSource}
              style={{ width: 36, height: 36, borderRadius: 18 }}
              className="bg-slate-200 border border-slate-200"
            />
          </TouchableOpacity>
        )}
      </View>

      {/* 2. 중앙 영역 (로고) - absolute로 양옆 아이콘 크기에 상관없이 항상 정중앙 고정 */}
      <View className="absolute left-0 right-0 items-center justify-center pointer-events-none" style={{ top: insets.top + 12, bottom: 12 }}>
        {title === "CareOn" ? (
          <Text className="font-headline font-extrabold text-[22px] tracking-tight" style={{ color: '#2563eb' }}>
            {title}
          </Text>
        ) : (
          <Text className="font-bold text-[17px] text-slate-800 tracking-tight">
            {title}
          </Text>
        )}
      </View>

      {/* 3. 우측 영역 (알림 또는 커스텀 아이콘) */}
      <View className="w-10 items-end justify-center z-10">
        {rightIcon ? (
          <TouchableOpacity className="p-1 -mr-1 rounded-full" activeOpacity={0.7}>
            <MaterialIcons name={rightIcon as any} size={26} color="#475569" />
          </TouchableOpacity>
        ) : showNotification ? (
          <TouchableOpacity className="p-1 -mr-1 rounded-full" activeOpacity={0.7}>
            {/* 시안처럼 꽉 찬 종 모양(notifications)으로 변경, 빨간 점 제거 */}
            <MaterialIcons name="notifications" size={26} color="#475569" />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}