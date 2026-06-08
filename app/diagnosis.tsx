import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Defs, Path, Stop, LinearGradient as SvgLinearGradient } from 'react-native-svg';
import TopBar from '../components/TopBar';

import React, { useEffect, useRef, useState } from 'react';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function Diagnosis() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;
  const [score, setScore] = useState(0);

  useEffect(() => {
    progress.setValue(0);
    setScore(0);

    let i = 0;
    const t = setInterval(() => {
      i++;
      setScore(i);
      if (i >= 85) clearInterval(t);
    }, 12);

    Animated.timing(progress, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: false
    }).start();

    return () => clearInterval(t);
  }, []);

  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [439.8, 65.9]
  });

  return (
    <View className="flex-1 bg-slate-50 overflow-hidden">
      <TopBar title="CareOn" showBack={true} showNotification={false} scrollY={scrollY} onBackPress={() => router.navigate('/')} />

      {/* 🔥 Background Glow */}
      <View className="absolute -top-20 -right-10 w-72 h-72 bg-orange-200 opacity-20 rounded-full blur-3xl" />
      <View className="absolute top-60 -left-10 w-72 h-72 bg-blue-200 opacity-20 rounded-full blur-3xl" />

      <Animated.ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: insets.top + 70,
          paddingBottom: insets.bottom + 100,
          paddingHorizontal: 20
        }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
      >
        {/* Hero Section: AI Diagnosis Result */}
        <View className="bg-white rounded-[32px] p-8 shadow-md border border-slate-50 mb-8 relative overflow-hidden"
          style={{ shadowColor: '#f97316', shadowOpacity: 0.1, shadowRadius: 25 }}>
          <View className="absolute top-0 right-0 w-48 h-48 bg-orange-100/50 rounded-full -mr-24 -mt-24" />

          <View className="items-center mb-8 z-10">
            <View className="bg-slate-100 px-3 py-1 rounded-full mb-3">
              <Text className="text-slate-500 font-bold text-[10px] uppercase tracking-wider">AI Comprehensive Analysis</Text>
            </View>
            <Text className="text-3xl font-extrabold tracking-tight text-slate-900 mb-3">역류성 식도염 의심</Text>
            <Text className="text-slate-500 text-sm font-medium px-4 text-center leading-snug">위산이 식도로 역류하여 염증을 유발하는 상태가 감지되었습니다.</Text>
          </View>

          {/* Score Gauge */}
          <View className="items-center justify-center relative">
            <View className="relative w-56 h-56 items-center justify-center z-10">
              <Svg width="100%" height="100%" viewBox="0 0 160 160" style={{ width: '100%', height: '100%', transform: [{ rotate: '-90deg' }] }}>
                <Circle cx="80" cy="80" r="70" fill="transparent" stroke="#f1f5f9" strokeWidth="20" />
                <AnimatedCircle cx="80" cy="80" r="70" fill="transparent" stroke="#f97316" strokeWidth="20"
                  strokeDasharray="439.8" strokeDashoffset={strokeDashoffset} strokeLinecap="round" />
              </Svg>
              <View className="absolute inset-0 items-center justify-center">
                <View className="flex-row items-baseline mb-1">
                  <Text className="text-6xl font-extrabold text-slate-900 tracking-tighter">{score}</Text>
                  <Text className="text-2xl font-bold ml-1 text-slate-500">%</Text>
                </View>
                <Text className="text-orange-500 font-bold text-sm tracking-wide">높은 가능성</Text>
              </View>
            </View>
            <View className="w-64 mt-6 flex-row justify-between items-center px-4">
              <View className="items-center flex-col gap-1.5">
                <View className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                <Text className="text-[10px] font-bold text-slate-400">낮음</Text>
              </View>
              <View className="items-center flex-col gap-1.5">
                <View className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <Text className="text-[10px] font-bold text-orange-500">높음</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Diet-Symptom Correlation */}
        <View className="bg-white rounded-[32px] p-6 shadow-md border border-slate-50 mb-8">
          <Text className="text-lg font-bold text-slate-900 mb-6 tracking-tight">식단 및 증상 상관관계</Text>
          <View className="bg-red-50 p-4 rounded-2xl border border-red-100 flex-row gap-3 mb-4">
            <MaterialIcons name="warning" size={20} color="#dc2626" />
            <Text className="text-[13px] font-semibold text-red-600 leading-snug flex-1 flex-wrap">
              오후 8시에 섭취한 <Text className="underline font-bold">매운 라면</Text>이 증상 악화의 핵심 원인으로 추정됩니다.
            </Text>
          </View>

          <View className="relative h-44 mt-4 w-full">
            <View className="absolute inset-0 top-0 bottom-8 flex-row justify-between w-full px-2">
              <View className="w-px h-full bg-slate-100" />
              <View className="w-px h-full bg-slate-100" />
              <View className="w-px h-full bg-blue-100" />
              <View className="w-px h-full bg-blue-100" />
              <View className="w-px h-full bg-blue-100" />
            </View>

            <View className="absolute inset-0 px-2 h-36">
              <Svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                <Defs>
                  <SvgLinearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <Stop offset="0%" stopColor="#cbd5e1" />
                    <Stop offset="50%" stopColor="#3b82f6" />
                    <Stop offset="100%" stopColor="#1d4ed8" />
                  </SvgLinearGradient>
                </Defs>
                <Path d="M 0,85 C 15,85 25,80 30,75 C 40,65 50,55 55,45 C 65,30 75,10 80,5 C 90,-2 95,12 100,18"
                  fill="none" stroke="url(#lineGrad)" strokeWidth="4" strokeLinecap="round" />
              </Svg>
            </View>

            <View className="absolute left-1/2 ml-2 top-4 items-center z-10">
              <View className="bg-white rounded-full w-9 h-9 items-center justify-center border border-slate-100 mb-1 shadow-sm">
                <Text className="text-xl">🍜</Text>
              </View>
              <View className="w-px h-24 border-l border-dashed border-blue-300" />
            </View>

            <View className="absolute bottom-0 w-full flex-row justify-between items-center px-1">
              <Text className="text-[10px] font-bold text-slate-400">18:00</Text>
              <Text className="text-[10px] font-bold text-slate-400">19:00</Text>
              <View className="bg-blue-50 px-2 py-0.5 rounded-full">
                <Text className="text-[10px] font-bold text-blue-600">20:00</Text>
              </View>
              <View className="bg-blue-50 px-2 py-0.5 rounded-full">
                <Text className="text-[10px] font-bold text-blue-600">21:00</Text>
              </View>
              <View className="bg-blue-50 px-2 py-0.5 rounded-full">
                <Text className="text-[10px] font-bold text-blue-600">22:00</Text>
              </View>
            </View>
          </View>
          <Text className="text-[11px] text-center text-slate-400 font-medium mt-2">식사 1시간 경과 시점부터 통증 수치가 급격히 상승함</Text>
        </View>

        {/* Why Section */}
        <View className="flex-col gap-4 mb-8">
          <Text className="text-lg font-bold px-1 text-slate-900 tracking-tight">분석 근거 (Why?)</Text>
          <View className="flex-col gap-3">
            <View className="bg-slate-50 rounded-[32px] p-6 border border-slate-100 flex-col gap-4">
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="check-circle" size={18} color="#10b981" />
                <Text className="text-[13px] font-bold text-slate-500">증상 일치 항목</Text>
              </View>
              <View className="flex-col gap-2">
                <View className="flex-row items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <Text className="text-sm font-semibold text-slate-700">가슴 쓰림 및 타는 듯한 통증</Text>
                  <MaterialIcons name="check" size={16} color="#10b981" />
                </View>
                <View className="flex-row items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <Text className="text-sm font-semibold text-slate-700">목에 무언가 걸린 듯한 이물감</Text>
                  <MaterialIcons name="check" size={16} color="#10b981" />
                </View>
              </View>
            </View>

            <View className="bg-slate-50 rounded-[32px] border border-slate-100 overflow-hidden">
              <TouchableOpacity className="flex-row items-center justify-between p-6">
                <View className="flex-row items-center gap-2">
                  <MaterialIcons name="cancel" size={18} color="#94a3b8" />
                  <Text className="text-[13px] font-bold text-slate-400">일치하지 않는 항목</Text>
                </View>
                <MaterialIcons name="expand-more" size={20} color="#94a3b8" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Care Tips */}
        <View className="bg-blue-600 rounded-[32px] p-6 shadow-md mb-8 flex-col gap-5">
          <View className="flex-row items-center gap-2">
            <MaterialIcons name="lightbulb" size={20} color="white" />
            <Text className="text-lg font-bold text-white tracking-tight">오늘의 관리 솔루션</Text>
          </View>
          <View className="flex-row gap-3">
            <View className="bg-white/10 p-4 rounded-2xl flex-col gap-2 border border-white/20 flex-1">
              <Text className="text-2xl mb-1">🌙</Text>
              <Text className="text-sm font-bold text-white">야식 피하기</Text>
              <Text className="text-[11px] text-blue-100 leading-snug font-medium pr-2">취침 3시간 전 공복 유지가 가장 중요합니다.</Text>
            </View>
            <View className="bg-white/10 p-4 rounded-2xl flex-col gap-2 border border-white/20 flex-1">
              <Text className="text-2xl mb-1">👕</Text>
              <Text className="text-sm font-bold text-white">복압 낮추기</Text>
              <Text className="text-[11px] text-blue-100 leading-snug font-medium pr-2">허리를 조이는 옷은 역류를 유발합니다.</Text>
            </View>
          </View>
        </View>

        {/* Smart Medication Safety Check Section */}
        <View className="flex-col gap-4 mb-4">
          <View className="flex-row items-center justify-between px-1">
            <Text className="text-lg font-bold text-slate-900 tracking-tight">스마트 복약 안전 체크</Text>
            <View className="bg-blue-100 px-2 py-0.5 rounded-full">
              <Text className="text-[10px] text-blue-600 font-bold">LIVE CHECK</Text>
            </View>
          </View>

          <View className="flex-col gap-4">
            {/* Recommended Ingredient */}
            <View className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm">
              <View className="flex-row justify-between items-start mb-4">
                <View className="flex-col gap-1">
                  <Text className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">추천 성분 및 의약품</Text>
                  <Text className="text-xl font-extrabold text-slate-900 leading-tight mt-1 tracking-tight">알긴산나트륨{'\n'}<Text className="text-slate-400 font-medium text-sm">(Sodium Alginate)</Text></Text>
                </View>
                <View className="w-16 h-16 bg-blue-50 rounded-2xl items-center justify-center border border-blue-100">
                  <Text className="text-3xl">💧</Text>
                </View>
              </View>
              <View className="flex-row flex-wrap gap-2">
                <View className="bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                  <Text className="text-slate-600 text-[11px] font-bold">위산 역류 억제</Text>
                </View>
                <View className="bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                  <Text className="text-slate-600 text-[11px] font-bold">위 점막 보호</Text>
                </View>
                <View className="bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                  <Text className="text-slate-600 text-[11px] font-bold">빠른 완화</Text>
                </View>
              </View>
            </View>

            {/* Interaction Warning */}
            <View className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm">
              <View className="p-5 border-b border-slate-100">
                <View className="flex-row items-center justify-between mb-4">
                  <Text className="text-[13px] font-bold text-slate-500">나의 복약 상호작용</Text>
                  <View className="bg-red-500 px-3 py-1 rounded-full flex-row items-center gap-1">
                    <Text className="text-white text-[11px] font-black">복용 금지 🚫</Text>
                  </View>
                </View>

                <View className="flex-row items-center gap-4 mb-2">
                  <View className="flex-1 flex-row items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 relative pr-6">
                    <View className="w-10 h-10 rounded-xl bg-white items-center justify-center shadow-sm">
                      <Text className="text-xl">💊</Text>
                    </View>
                    <View>
                      <Text className="text-[10px] text-slate-400 font-bold mb-1">현재 복용 중인 약</Text>
                      <Text className="text-sm font-bold text-slate-800">테네리아정 <Text className="text-slate-500 font-medium">(당뇨약)</Text></Text>
                    </View>

                    <View className="absolute right-[-14px] w-12 h-8 flex-row items-center justify-between z-10">
                      <View className="w-7 h-7 rounded-full bg-red-500 border-2 border-white items-center justify-center absolute left-0 z-20">
                        <MaterialIcons name="close" size={14} color="white" />
                      </View>
                      <View className="w-7 h-7 rounded-full bg-blue-600 border-2 border-white items-center justify-center absolute right-0 z-10">
                        <MaterialIcons name="bolt" size={14} color="white" />
                      </View>
                    </View>
                  </View>
                  <View className="w-12 h-12 rounded-2xl bg-blue-50 items-center justify-center border border-blue-100 ml-2">
                    <Text className="text-2xl">💧</Text>
                  </View>
                </View>
              </View>

              <View className="bg-red-50 p-5">
                <View className="flex-row gap-3 mb-4">
                  <MaterialIcons name="report-problem" size={20} color="#dc2626" />
                  <View className="flex-1">
                    <Text className="text-[13px] font-bold text-red-600 mb-1">성분 중복 및 부작용 위험</Text>
                    <Text className="text-xs text-red-600 opacity-80 font-semibold leading-relaxed">
                      현재 복용 중인 테네리아정의 주성분인 테네리글립틴과 알긴산나트륨 병용 시 약물 흡수율이 떨어질 수 있습니다. 반드시 주치의와 상담 후 복용을 결정하세요.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Other Possibilities */}
        <View className="flex-col gap-4 pt-4 mb-4">
          <Text className="text-[12px] font-bold text-slate-400 px-1 uppercase tracking-widest">기타 가능성 질환</Text>
          <View className="flex-col gap-3">
            <TouchableOpacity className="flex-row items-center justify-between p-5 bg-white rounded-[32px] border border-slate-100 shadow-sm" activeOpacity={0.8}>
              <View className="flex-row items-center gap-4">
                <View className="w-10 h-10 rounded-xl bg-slate-100 items-center justify-center border border-slate-200">
                  <MaterialIcons name="medical-services" size={20} color="#2563eb" />
                </View>
                <View>
                  <Text className="font-bold text-slate-900 mb-0.5">급성 위염</Text>
                  <Text className="text-[11px] text-slate-400">위 점막의 일시적 염증</Text>
                </View>
              </View>
              <Text className="text-lg font-extrabold text-slate-600">65%</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between p-5 bg-white rounded-[32px] border border-slate-100 shadow-sm" activeOpacity={0.8}>
              <View className="flex-row items-center gap-4">
                <View className="w-10 h-10 rounded-xl bg-slate-100 items-center justify-center border border-slate-200">
                  <MaterialIcons name="health-and-safety" size={20} color="#2563eb" />
                </View>
                <View>
                  <Text className="font-bold text-slate-900 mb-0.5">기능성 소화불량</Text>
                  <Text className="text-[11px] text-slate-400">상복부 거북함 및 팽만감</Text>
                </View>
              </View>
              <Text className="text-lg font-extrabold text-slate-600">42%</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-col gap-3 pt-4 mb-8">
          <TouchableOpacity className="bg-red-500 py-4 px-6 rounded-2xl flex-row items-center justify-center gap-2 shadow-md" activeOpacity={0.8}>
            <MaterialIcons name="emergency" size={24} color="white" />
            <Text className="text-white font-extrabold text-lg">응급 SOS / 119 연결</Text>
          </TouchableOpacity>
          <View className="flex-row gap-3">
            <TouchableOpacity className="flex-1 bg-white border border-slate-200 py-4 rounded-2xl flex-col items-center gap-1.5 shadow-sm" activeOpacity={0.8}>
              <MaterialIcons name="local-hospital" size={24} color="#2563eb" />
              <Text className="text-slate-800 font-bold text-[13px]">주변 병원</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-white border border-slate-200 py-4 rounded-2xl flex-col items-center gap-1.5 shadow-sm" activeOpacity={0.8}>
              <MaterialIcons name="local-pharmacy" size={24} color="#2563eb" />
              <Text className="text-slate-800 font-bold text-[13px]">주변 약국</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View className="pb-8 pt-4 px-2">
          <View className="px-4 py-4 bg-rose-50 rounded-2xl border border-rose-100 flex-row items-start gap-3">
            <MaterialIcons name="error-outline" size={18} color="#e11d48" style={{ marginTop: 2 }} />
            <View className="flex-1">
              <Text className="text-xs leading-relaxed text-rose-800">
                본 서비스는 증상에 대한 <Text className="font-bold text-rose-900">참고용 정보</Text>를 제공하며, 실제 의사의 진단을 대신할 수 없습니다. 위급 상황 발생 시 즉시 <Text className="font-bold text-rose-900">119</Text> 또는 가까운 <Text className="font-bold text-rose-900">응급실</Text>을 방문하시기 바랍니다.
              </Text>
            </View>
          </View>
          <Text className="text-[10px] text-slate-400 font-medium mt-4 text-center">식품의약품안전처(KFDA) DUR 데이터를 기반으로 분석되었습니다</Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
}
