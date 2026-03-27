// 🔥 CareOn Home (Refined UI + Micro-interactions + Color Upgrade)

import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import TopBar from '../../components/TopBar';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // 🌟 1. ScrollView를 조종할 리모컨 생성
  const scrollViewRef = useRef<ScrollView>(null);

  // 🔥 Animation 상태 및 Ref
  const [score, setScore] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;

  // 🌟 2. 화면에 돌아올 때마다 실행되는 센서
  useFocusEffect(
    useCallback(() => {
      // 1) 스크롤을 맨 위로 즉시 올립니다.
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });

      // 2) 애니메이션 상태 초기화 (0으로 리셋)
      setScore(0);
      progress.setValue(0);

      // 3) 점수 카운팅 애니메이션 시작
      let i = 0;
      const interval = setInterval(() => {
        i += 1;
        setScore(i);
        if (i >= 85) clearInterval(interval);
      }, 12);

      // 4) 원형 프로그래스 바 애니메이션 시작
      Animated.timing(progress, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: false
      }).start();

      return () => {
        clearInterval(interval);
      };
    }, [])
  );

  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [552.92, 82.94]
  });

  // 🔥 Press animation (타입스크립트 에러 해결을 위한 명찰 추가!)
  type PressableCardProps = {
    children: React.ReactNode;
    onPress: () => void;
  };

  const PressableCard = ({ children, onPress }: PressableCardProps) => {
    const scale = useRef(new Animated.Value(1)).current;

    return (
      <Animated.View style={{ transform: [{ scale }], flex: 1 }}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onPress}
          onPressIn={() =>
            Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start()
          }
          onPressOut={() =>
            Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start()
          }
          style={{ flex: 1 }}
        >
          {children}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View className="flex-1 bg-[#f8fafc]">
      <TopBar title="CareOn" />

      <ScrollView
        ref={scrollViewRef} // 🌟 3. 여기에 리모컨 장착!
        contentContainerStyle={{
          paddingTop: insets.top + 70,
          paddingBottom: insets.bottom + 100,
          paddingHorizontal: 20
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* 🔥 HERO */}
        <LinearGradient
          colors={['#ffffff', '#ecfdf5']}
          className="rounded-[32px] p-8 items-center mb-7"
          style={{
            shadowColor: '#10b981',
            shadowOpacity: 0.08,
            shadowRadius: 20
          }}
        >
          <Text className="text-slate-600 mb-1">안녕하세요, 선우님</Text>
          <Text className="text-2xl font-extrabold text-slate-900 mb-6">
            컨디션이 아주 좋아요 🔥
          </Text>

          <View className="relative w-48 h-48 items-center justify-center mb-6">
            <Svg className="w-full h-full -rotate-90" viewBox="0 0 192 192">
              <Circle cx="96" cy="96" r="88" stroke="#e5e7eb" strokeWidth="12" fill="none" />
              <AnimatedCircle
                cx="96"
                cy="96"
                r="88"
                stroke="#10b981"
                strokeWidth="12"
                fill="none"
                strokeDasharray="552.92"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </Svg>

            <View className="absolute items-center">
              <Text className="text-5xl font-extrabold text-slate-900">
                {score}
              </Text>
              <Text className="text-xs font-bold text-emerald-600 mt-1">
                GREAT
              </Text>
            </View>
          </View>

          <View className="px-4 py-2 bg-white rounded-full shadow-sm border border-emerald-100">
            <Text className="text-sm font-bold text-emerald-700">
              어제보다 +3 상승
            </Text>
          </View>
        </LinearGradient>

        {/* 🔥 QUICK ACTIONS */}
        <View className="flex-row gap-4 mb-7">
          <PressableCard onPress={() => router.push('/diet')}>
            <View className="flex-1 bg-white rounded-[28px] p-5 shadow-sm">
              <View className="w-12 h-12 rounded-2xl bg-orange-50 items-center justify-center">
                <MaterialIcons name="restaurant" size={24} color="#f97316" />
              </View>
              <Text className="mt-3 font-bold text-lg text-slate-900">식단 기록</Text>
              <Text className="text-xs text-orange-600 mt-1">기록하기 →</Text>
            </View>
          </PressableCard>

          <PressableCard onPress={() => router.push('/diagnosis-analysis')}>
            <View className="flex-1 bg-white rounded-[28px] p-5 shadow-sm border border-blue-100">
              <View className="w-12 h-12 rounded-2xl bg-blue-50 items-center justify-center">
                <MaterialIcons name="medical-services" size={24} color="#3b82f6" />
              </View>
              <Text className="mt-3 font-bold text-lg text-slate-900">증상 체크</Text>
              <Text className="text-xs text-slate-400 mt-1">최근 2일 전</Text>
            </View>
          </PressableCard>
        </View>

        {/* 🔥 INSIGHT */}
        <View
          className="bg-white rounded-[32px] p-6 mb-7"
          style={{
            shadowColor: '#3b82f6',
            shadowOpacity: 0.08,
            shadowRadius: 20
          }}
        >
          <Text className="text-blue-500 font-bold mb-2">Wellness Insight ✨</Text>
          <Text className="text-xl font-extrabold text-slate-900 mb-4">
            영양 균형이 매우 안정적입니다
          </Text>

          {[
            { label: '탄수화물', value: 45, color: 'bg-amber-400' },
            { label: '단백질', value: 35, color: 'bg-blue-500' },
            { label: '지방', value: 20, color: 'bg-rose-400' }
          ].map((item, idx) => (
            <View key={idx} className="mb-3">
              <View className="flex-row justify-between">
                <Text className="text-xs font-bold text-slate-600">{item.label}</Text>
                <Text className="text-xs font-bold text-slate-800">{item.value}%</Text>
              </View>
              <View className="h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                <View className={`h-full ${item.color}`} style={{ width: `${item.value}%` }} />
              </View>
            </View>
          ))}

          <View className="bg-slate-50 p-3 rounded-xl mt-3">
            <Text className="text-xs text-slate-600">
              단백질 섭취량이 목표 대비 12% 높습니다.
            </Text>
          </View>
        </View>

        {/* 🔥 TIMELINE */}
        <Text className="text-xl font-extrabold text-slate-900 mb-4">오늘의 활동</Text>

        {[1, 2, 3].map((_, i) => (
          <View key={i} className="flex-row gap-4 mb-4">
            <View className="w-11 h-11 rounded-full bg-blue-50 items-center justify-center">
              <MaterialIcons name="directions-walk" size={20} color="#2563eb" />
            </View>
            <View className="flex-1 bg-white p-5 rounded-3xl shadow-sm">
              <Text className="font-bold text-slate-900">활동 {i + 1}</Text>
              <Text className="text-sm text-slate-500 mt-1">활동 설명</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* 🔥 FAB */}
      <View style={{ bottom: insets.bottom + 90 }} className="absolute right-6">
        <TouchableOpacity activeOpacity={0.85}>
          <LinearGradient
            colors={['#2563eb', '#1d4ed8']}
            className="w-12 h-12 rounded-full items-center justify-center"
            style={{
              shadowColor: '#2563eb',
              shadowOpacity: 0.4,
              shadowRadius: 8
            }}
          >
            <MaterialIcons name="add" size={30} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}