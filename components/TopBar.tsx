import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import React from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Defs, Stop, LinearGradient as SvgGradient, Text as SvgText } from 'react-native-svg';

type TopBarProps = {
  title?: string;
  showBack?: boolean;
  showNotification?: boolean;
  rightIcon?: string;
  rightElement?: React.ReactNode;
  userImageSource?: any;
  scrollY?: Animated.Value;
  onBackPress?: () => void;
};

export default function TopBar({
  title = "CareOn",
  showBack = false,
  showNotification = true,
  rightIcon,
  rightElement,
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

    const gradId = React.useId ? React.useId() : `textGrad-${Math.random().toString(36).substr(2, 9)}`;

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
      <View style={[StyleSheet.absoluteFill, { alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', paddingTop: insets.top }]}>
        {title === "CareOn" ? (
          <View className="flex-row items-center justify-center gap-2" style={{ transform: [{ translateX: 40 }] }}>
            <Image
              source={require('../assets/images/logo.png')}
              style={{ height: 30, width: 45 }}
              resizeMode="contain"
            />
            <Svg height="40" width="130" style={{ transform: [{ translateY: 2 }] }}>
              <Defs>
                <SvgGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
                  <Stop offset="0" stopColor="#0ea5e9" stopOpacity="1" />
                  <Stop offset="1" stopColor="#10b981" stopOpacity="1" />
                </SvgGradient>
              </Defs>
              <SvgText
                fill={`url(#${gradId})`}
                fontSize="36"
                fontFamily="Pretendard-ExtraBold"
                x="0"
                y="24"
                letterSpacing="-0.5"
              >
                CareOn
              </SvgText>
            </Svg>
          </View>
        ) : (
          <Text className="font-bold text-[17px] text-slate-800 tracking-tight">
            {title}
          </Text>
        )}
      </View>

      {/* 3. 우측 영역 (알림 또는 커스텀 컴포넌트/아이콘) */}
      <View className="w-auto min-w-[40px] items-end justify-center z-10">
        {rightElement ? (
          rightElement
        ) : rightIcon ? (
          <TouchableOpacity className="p-1 -mr-1 rounded-full" activeOpacity={0.7}>
            <MaterialIcons name={rightIcon as any} size={26} color="#475569" />
          </TouchableOpacity>
        ) : showNotification ? (
          <TouchableOpacity className="p-1 -mr-1 rounded-full" activeOpacity={0.7}>
            <MaterialIcons name="notifications" size={26} color="#475569" />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}