import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useRef } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TopBar from '../../components/TopBar';

export default function Profile() {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);

  useFocusEffect(
    useCallback(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }, [])
  );

  return (
    <View className="flex-1 bg-slate-50">
      <TopBar rightIcon="settings" />

      {/* 🔥 Background Glow */}
      <View className="absolute -top-10 -right-10 w-72 h-72 bg-blue-200 opacity-20 rounded-full blur-3xl" />
      <View className="absolute top-60 -left-10 w-72 h-72 bg-emerald-200 opacity-20 rounded-full blur-3xl" />

      <ScrollView
        ref={scrollViewRef}
        contentContainerClassName="px-6 mx-auto w-full max-w-md"
        contentContainerStyle={{
          paddingTop: insets.top + 70,
          paddingBottom: insets.bottom + 100
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Message */}
        <View className="mt-4 mb-8 flex-row justify-between items-end">
          <Text className="text-2xl font-extrabold tracking-tight text-slate-900 leading-snug">
            선우님,{'\n'}오늘도 건강한 하루를{'\n'}응원합니다.
          </Text>
          <View className="w-16 h-16 rounded-full bg-slate-200 overflow-hidden shadow-sm border-2 border-white mb-2">
            <Image source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBV2tFwQbfvb8VZJd-Z-X8l-ohCO8-s2-MOEcBRXLHIzAZ_u2wPScfRWRtQxtYektYUe4enP1YgYrO84tizKLbedzeOeFpf91hRCHoNsWBIE7SDKyoooSwro4xkB6-6qLsZOMy-VfH6cmyt_odctvORtzcQ5d0tX5T0eWE39mPAuRQdW0zJw6wl3LNj8cWC_s2G6pP8ue7CqBtox6XouRiB9p_MFOGdFiDtebA3N9BHDhGrk8wbjNyDvzRNxLQhzVffgpuSbFbc2JB" }} className="w-full h-full" resizeMode="cover" />
          </View>
        </View>

        {/* Top Profile & Reward Dashboard */}
        <View className="flex-col md:flex-row gap-5 mb-8">
          {/* Points Card */}
          <LinearGradient
            colors={['#2563eb', '#1d4ed8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="relative overflow-hidden rounded-[32px] p-6 shadow-md min-h-[160px] flex-col justify-between"
            style={{ shadowColor: '#2563eb', shadowOpacity: 0.2, shadowRadius: 20 }}
          >
            <View className="z-10">
              <Text className="text-sm font-medium text-white/70 mb-1">나의 리워드 포인트</Text>
              <Text className="text-4xl font-extrabold tracking-tight text-white">24,500 P</Text>
            </View>
            <View className="z-10 flex-row justify-between items-end mt-4">
              <TouchableOpacity className="px-5 py-2.5 rounded-full border border-white/20 bg-white/20" activeOpacity={0.8}>
                <Text className="text-sm font-semibold text-white">상세보기</Text>
              </TouchableOpacity>
              <View className="w-12 h-12 items-center justify-center rounded-2xl bg-white/10 border border-white/20">
                <MaterialIcons name="account-balance-wallet" size={24} color="rgba(255,255,255,0.6)" />
              </View>
            </View>
            {/* Background Blurs (Approximations) */}
            <View className="absolute -top-12 -right-12 w-48 h-48 bg-white/20 rounded-full opacity-30" />
            <View className="absolute top-1/2 left-0 w-32 h-32 bg-blue-400/20 rounded-full -translate-y-8 opacity-40" />
          </LinearGradient>

          {/* Health Badges Column */}
          <View className="bg-white rounded-[32px] p-6 shadow-md border border-slate-50 flex-col gap-4 mt-5">
            <Text className="text-xs font-extrabold text-slate-400 px-1 uppercase tracking-wider">획득한 헬스 뱃지</Text>
            <View className="flex-row justify-around items-center">
              {/* Badge 1 */}
              <TouchableOpacity className="items-center gap-2" activeOpacity={0.8}>
                <View className="w-14 h-14 rounded-2xl bg-emerald-50 items-center justify-center border border-emerald-100">
                  <MaterialIcons name="military-tech" size={28} color="#10b981" />
                </View>
                <Text className="text-[10px] font-bold text-slate-600">Top Recorder</Text>
              </TouchableOpacity>
              {/* Badge 2 */}
              <TouchableOpacity className="items-center gap-2" activeOpacity={0.8}>
                <View className="w-14 h-14 rounded-2xl bg-blue-50 items-center justify-center border border-blue-100">
                  <MaterialIcons name="restaurant" size={24} color="#2563eb" />
                </View>
                <Text className="text-[10px] font-bold text-slate-600">Healthy Eater</Text>
              </TouchableOpacity>
              {/* Badge 3 (Inactive) */}
              <TouchableOpacity className="items-center gap-2 opacity-40" activeOpacity={1}>
                <View className="w-14 h-14 rounded-2xl bg-slate-100 items-center justify-center border border-slate-200">
                  <MaterialIcons name="bolt" size={24} color="#94a3b8" />
                </View>
                <Text className="text-[10px] font-bold text-slate-400">Consistency King</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Weekly Health Insight */}
        <View className="bg-white rounded-[32px] p-7 shadow-md border border-slate-50 mb-8"
          style={{ shadowColor: '#10b981', shadowOpacity: 0.1, shadowRadius: 25 }}>
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-bold tracking-tight text-slate-900">주간 레포트 프리뷰</Text>
            <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Text className="text-sm text-blue-600 font-bold">전체 보기</Text>
            </TouchableOpacity>
          </View>

          {/* Chart with Tooltip */}
          <View className="flex-row items-end justify-between h-36 px-2 relative mb-6">
            <View className="items-center gap-2 flex-col">
              <View className="w-3 bg-slate-200 rounded-full h-16" />
              <Text className="text-[10px] font-medium text-slate-500">월</Text>
            </View>
            <View className="items-center flex-col gap-2">
              <View className="w-3 bg-slate-200 rounded-full h-20" />
              <Text className="text-[10px] font-medium text-slate-500">화</Text>
            </View>
            <View className="items-center flex-col gap-2">
              <View className="w-3 bg-slate-200 rounded-full h-14" />
              <Text className="text-[10px] font-medium text-slate-500">수</Text>
            </View>

            {/* Thursday Active */}
            <View className="items-center flex-col gap-2 relative">
              <View className="absolute -top-10 items-center -ml-2">
                <View className="bg-slate-900 px-2 py-1 rounded-lg">
                  <Text className="text-white text-[10px] font-bold whitespace-nowrap">88점</Text>
                </View>
                <View className="w-2 h-2 bg-slate-900 rotate-45 -mt-1" />
              </View>
              <View className="w-3 bg-emerald-500 rounded-full h-28 shadow-sm" />
              <Text className="text-[10px] font-bold text-emerald-600">목</Text>
            </View>

            <View className="items-center flex-col gap-2">
              <View className="w-3 bg-slate-200 rounded-full h-24" />
              <Text className="text-[10px] font-medium text-slate-500">금</Text>
            </View>
            <View className="items-center flex-col gap-2">
              <View className="w-3 bg-slate-200 rounded-full h-18" />
              <Text className="text-[10px] font-medium text-slate-500">토</Text>
            </View>
            <View className="items-center flex-col gap-2">
              <View className="w-3 bg-slate-200 rounded-full h-12" />
              <Text className="text-[10px] font-medium text-slate-500">일</Text>
            </View>
          </View>

          {/* Insight Box */}
          <View className="bg-emerald-50 p-5 rounded-2xl flex-row items-start gap-4 border border-emerald-100">
            <View className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 border border-emerald-100">
              <MaterialIcons name="auto-awesome" size={20} color="#10b981" />
            </View>
            <View className="flex-1">
              <Text className="text-slate-800 text-sm font-bold leading-relaxed pr-2">
                이번 주 수면의 질이 지난주보다 15% 향상되었어요!
              </Text>
              <TouchableOpacity className="mt-1" hitSlop={{ top: 5, bottom: 5, right: 5 }}>
                <Text className="text-emerald-600 font-bold text-xs">AI 코치의 조언 더보기</Text>
              </TouchableOpacity>
              <Text className="text-emerald-700 text-xs mt-2 opacity-80 font-medium">규칙적인 취침 시간이 큰 도움이 된 것 같아요.</Text>
            </View>
          </View>
        </View>

        {/* Activity Statistics */}
        <View className="flex-col gap-4 mb-8">
          <Text className="text-lg font-bold tracking-tight px-1 text-slate-900">활동 통계</Text>
          <View className="flex-col md:flex-row gap-4">
            {/* Record Counts */}
            <View className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-50 flex-1">
              <View className="flex-row justify-between items-start mb-4">
                <MaterialIcons name="edit-calendar" size={28} color="#2563eb" />
                <Text className="text-2xl font-black text-blue-600">156회</Text>
              </View>
              <Text className="text-sm font-bold text-slate-900 mb-3">누적 기록 횟수</Text>
              <View className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden flex-row">
                <View className="h-full bg-blue-500" style={{ width: '78%' }} />
              </View>
              <Text className="text-[10px] text-slate-500 mt-2 font-medium">목표 200회까지 44회 남음</Text>
            </View>
            {/* Consecutive Days */}
            <View className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-50 flex-1 mt-4">
              <View className="flex-row justify-between items-start mb-4">
                <MaterialIcons name="local-fire-department" size={28} color="#ef4444" />
                <Text className="text-2xl font-black text-red-500">12일</Text>
              </View>
              <Text className="text-sm font-bold text-slate-900 mb-3">연속 기록 일수</Text>
              <View className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden flex-row">
                <View className="h-full bg-red-500" style={{ width: '60%' }} />
              </View>
              <Text className="text-[10px] text-slate-500 mt-2 font-medium">최고 기록: 21일</Text>
            </View>
          </View>
        </View>

        {/* Settings List */}
        <View className="flex-col gap-2 mb-8">
          <Text className="text-xs font-extrabold text-slate-400 px-2 pt-4 uppercase tracking-widest">환경설정</Text>
          <View className="bg-white rounded-[32px] overflow-hidden border border-slate-50 shadow-md">
            <TouchableOpacity className="flex-row justify-between items-center px-6 py-5 border-b border-slate-100" activeOpacity={0.7}>
              <View className="flex-row items-center gap-4">
                <MaterialIcons name="person-outline" size={20} color="#94a3b8" />
                <Text className="text-base font-semibold text-slate-800">계정 정보</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color="#cbd5e1" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row justify-between items-center px-6 py-5 border-b border-slate-100" activeOpacity={0.7}>
              <View className="flex-row items-center gap-4">
                <MaterialIcons name="notifications-none" size={20} color="#94a3b8" />
                <Text className="text-base font-semibold text-slate-800">알림 설정</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color="#cbd5e1" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row justify-between items-center px-6 py-5 border-b border-slate-100" activeOpacity={0.7}>
              <View className="flex-row items-center gap-4">
                <MaterialIcons name="lock-outline" size={20} color="#94a3b8" />
                <Text className="text-base font-semibold text-slate-800">개인정보 보호</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color="#cbd5e1" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row justify-between items-center px-6 py-5" activeOpacity={0.7}>
              <View className="flex-row items-center gap-4">
                <MaterialIcons name="help-outline" size={20} color="#94a3b8" />
                <Text className="text-base font-semibold text-slate-800">고객센터 / FAQ</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color="#cbd5e1" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout CTA */}
        <View className="items-center pb-8">
          <TouchableOpacity className="px-6 py-3 rounded-full" activeOpacity={0.6}>
            <Text className="text-sm font-bold text-slate-400">로그아웃</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}