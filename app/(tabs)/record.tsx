// 🔥 CareOn Record (Advanced UI + Micro Interactions + Visual Upgrade)
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useRouter } from 'expo-router'; // 🔥 useFocusEffect 추가
import React, { useCallback, useRef } from 'react'; // 🔥 useCallback 추가
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TopBar from '../../components/TopBar';

// ==========================================
// 🧩 분리된 하위 컴포넌트 (Hook 에러 방지 & 렌더링 최적화)
// ==========================================

type InsightItem = {
  label: string;
  value: number;
  color: string;
};

const InsightBar = ({ item }: { item: InsightItem }) => {
  const widthAnim = useRef(new Animated.Value(0)).current;

  // 🔥 화면에 포커스 될 때마다 애니메이션을 0부터 다시 시작
  useFocusEffect(
    useCallback(() => {
      widthAnim.setValue(0);

      Animated.timing(widthAnim, {
        toValue: item.value,
        duration: 800,
        useNativeDriver: false
      }).start();
    }, [item.value, widthAnim])
  );

  const animatedWidth = widthAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%']
  });

  return (
    <View className="mb-4">
      <View className="flex-row justify-between mb-1">
        <Text className="text-xs font-bold text-slate-600">
          {item.label}
        </Text>
        <Text className="text-xs font-bold text-slate-800">
          {item.value}%
        </Text>
      </View>

      {/* 🔥 바탕 막대 */}
      <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
        {/* 🔥 색상 차오르는 막대 */}
        <Animated.View
          style={{
            height: '100%',
            backgroundColor: item.color,
            width: animatedWidth,
            borderRadius: 999 // 🔥 여기에 둥근 모서리 속성 추가!
          }}
        />
      </View>
    </View>
  );
};

// ==========================================
// 📝 기록 화면 메인 컴포넌트
// ==========================================

export default function Record() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // 🔥 스크롤 뷰를 제어하기 위한 ref 추가
  const scrollViewRef = useRef<ScrollView>(null);
  const scale1 = useRef(new Animated.Value(1)).current;
  const scale2 = useRef(new Animated.Value(1)).current;

  // 🔥 화면 진입 시 맨 위로 스크롤 초기화
  useFocusEffect(
    useCallback(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }, [])
  );

  const pressIn = (scale: Animated.Value) => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true
    }).start();
  };

  const pressOut = (scale: Animated.Value) => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true
    }).start();
  };

  return (
    <View className="flex-1 bg-slate-50">

      {/* 🔥 TopBar 추가 */}
      <TopBar />

      {/* Background Glow */}
      <View className="absolute -top-20 -left-10 w-72 h-72 bg-blue-200 opacity-20 rounded-full blur-3xl" />
      <View className="absolute top-60 -right-10 w-72 h-72 bg-emerald-200 opacity-20 rounded-full blur-3xl" />

      <ScrollView
        ref={scrollViewRef} // 🔥 ScrollView에 ref 연결
        contentContainerClassName="px-6 mx-auto w-full max-w-md"
        contentContainerStyle={{
          paddingTop: insets.top + 70,
          paddingBottom: insets.bottom + 100
        }}
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {/* HERO TITLE */}
        <View className="mb-6">
          <Text className="text-2xl font-extrabold text-slate-900 mb-1">
            오늘의 기록
          </Text>
          <Text className="text-slate-500">
            건강 데이터를 꾸준히 기록해보세요
          </Text>
        </View>

        {/* QUICK CARDS */}
        <View className="flex-col gap-4 mb-8">
          {/* Diet Card */}
          <Animated.View style={{ transform: [{ scale: scale1 }] }}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => router.push('/diet')}
              onPressIn={() => pressIn(scale1)}
              onPressOut={() => pressOut(scale1)}
            >
              <LinearGradient
                colors={['#2563eb', '#1d4ed8']}
                className="relative overflow-hidden p-6 rounded-3xl"
                style={{
                  shadowColor: '#2563eb',
                  shadowOpacity: 0.2,
                  shadowRadius: 20
                }}
              >
                <View className="flex-row justify-between items-start mb-8">
                  <View>
                    <Text className="text-white text-xl font-bold mb-1">
                      식단 기록
                    </Text>
                    <Text className="text-blue-100 text-sm">
                      영양 밸런스를 관리하세요
                    </Text>
                  </View>

                  <View className="bg-white/20 p-3 rounded-2xl">
                    <MaterialIcons name="restaurant" size={24} color="white" />
                  </View>
                </View>

                <View className="bg-white px-5 py-3 rounded-xl self-start">
                  <Text className="text-blue-700 font-bold">
                    기록 시작하기 →
                  </Text>
                </View>

                <View className="absolute -right-6 -bottom-6 opacity-10">
                  <MaterialIcons name="restaurant" size={140} color="white" />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {/* Symptom Card */}
          <Animated.View style={{ transform: [{ scale: scale2 }] }}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => router.push('/diagnosis-log')}
              onPressIn={() => pressIn(scale2)}
              onPressOut={() => pressOut(scale2)}
            >
              <LinearGradient
                colors={['#10b981', '#059669']}
                className="relative overflow-hidden p-6 rounded-3xl"
                style={{
                  shadowColor: '#10b981',
                  shadowOpacity: 0.2,
                  shadowRadius: 20
                }}
              >
                <View className="flex-row justify-between items-start mb-8">
                  <View>
                    <Text className="text-white text-xl font-bold mb-1">
                      증상 기록
                    </Text>
                    <Text className="text-emerald-100 text-sm">
                      몸 상태를 체크하세요
                    </Text>
                  </View>

                  <View className="bg-white/20 p-3 rounded-2xl">
                    <MaterialIcons name="favorite" size={24} color="white" />
                  </View>
                </View>

                <View className="bg-white px-5 py-3 rounded-xl self-start">
                  <Text className="text-emerald-700 font-bold">
                    기록 시작하기 →
                  </Text>
                </View>

                <View className="absolute -right-6 -bottom-6 opacity-10">
                  <MaterialIcons name="favorite" size={140} color="white" />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* INSIGHT */}
        <View
          className="bg-white p-6 rounded-3xl mb-7"
          style={{
            shadowColor: '#2563eb',
            shadowOpacity: 0.1,
            shadowRadius: 20
          }}
        >
          <View className="flex-row items-center gap-2 mb-4">
            <MaterialIcons name="auto-awesome" size={20} color="#2563eb" />
            <Text className="text-lg font-bold text-slate-900">
              Wellness Insight
            </Text>
          </View>

          {[
            { label: '탄수화물', value: 54, color: '#fbbf24' },
            { label: '단백질', value: 56, color: '#3b82f6' },
            { label: '지방', value: 44, color: '#f43f5e' }
          ].map((item, idx) => (
            <InsightBar key={idx} item={item} />
          ))}
        </View>

        {/* MISSION */}
        <Text className="text-xl font-extrabold text-slate-900 mb-4">
          오늘의 기록 미션
        </Text>

        {[
          {
            title: '수면 기록하기',
            icon: 'bedtime' as const,
            color: '#6366f1'
          },
          {
            title: '운동 기록하기',
            icon: 'fitness-center' as const,
            color: '#10b981'
          }
        ].map((item, idx) => (
          <TouchableOpacity
            key={idx}
            activeOpacity={0.8}
            className="flex-row items-center justify-between p-5 bg-white rounded-3xl mb-3"
            style={{
              shadowColor: '#000',
              shadowOpacity: 0.04,
              shadowRadius: 10
            }}
          >
            <View className="flex-row items-center gap-4">
              <View
                className="w-12 h-12 rounded-2xl items-center justify-center"
                style={{ backgroundColor: item.color + '15' }}
              >
                <MaterialIcons name={item.icon} size={24} color={item.color} />
              </View>

              <View>
                <Text className="font-bold text-slate-900">{item.title}</Text>
                <Text className="text-xs text-blue-500 mt-1">+50P 적립</Text>
              </View>
            </View>

            <View className="bg-blue-500 px-4 py-2 rounded-xl">
              <Text className="text-white font-bold">기록</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}