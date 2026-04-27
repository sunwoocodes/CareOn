import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState, useRef } from 'react';
import { Animated, LayoutAnimation, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, UIManager, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import TopBar from '../components/TopBar';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function DiagnosisAnalysis() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;

  const [selectedParts, setSelectedParts] = useState<string[]>(['chest']);

  const togglePart = (part: string) => {
    LayoutAnimation.configureNext({
      duration: 300,
      create: { type: LayoutAnimation.Types.easeInEaseOut, property: LayoutAnimation.Properties.opacity },
      update: { type: LayoutAnimation.Types.easeInEaseOut },
      delete: { type: LayoutAnimation.Types.easeOut, property: LayoutAnimation.Properties.opacity },
    });
    setSelectedParts(prev =>
      prev.includes(part) ? prev.filter(p => p !== part) : [...prev, part]
    );
  };

  const partNames: Record<string, string> = {
    head: '머리',
    chest: '가슴/심장',
    abdomen: '복부',
    left_upper_arm: '왼쪽 위팔',
    left_elbow: '왼쪽 팔꿈치',
    left_forearm: '왼쪽 아래팔',
    left_hand: '왼손',
    right_upper_arm: '오른쪽 위팔',
    right_elbow: '오른쪽 팔꿈치',
    right_forearm: '오른쪽 아래팔',
    right_hand: '오른손',
    left_thigh: '왼쪽 허벅지',
    right_thigh: '오른쪽 허벅지',
    left_knee: '왼쪽 무릎',
    right_knee: '오른쪽 무릎',
    left_calf: '왼쪽 종아리',
    right_calf: '오른쪽 종아리',
    left_foot: '왼쪽 발',
    right_foot: '오른쪽 발'
  };

  return (
    <View style={{ flex: 1, overflow: 'hidden' }}>
      {/* 배경 그라디언트 */}
      <LinearGradient
        colors={['#fff0f5', '#efe5ff', '#e5f0ff', '#efe5ff']}
        locations={[0, 0.3, 0.7, 1]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill} />
      <TopBar showBack={true} showNotification={false} scrollY={scrollY} />

      <Animated.ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: insets.top + 82,
          paddingBottom: insets.bottom + 160,
          paddingHorizontal: 20
        }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
      >
        {/* Personalized Greeting */}
        <View className="mb-8">
          <Text className="text-3xl font-extrabold tracking-tight text-slate-900 leading-snug mb-4">
            선우님,{'\n'}어디가 불편하세요?
          </Text>
          <View className="relative justify-center">
            <View className="absolute left-4 z-10 flex items-center justify-center">
              <MaterialIcons name="search" size={20} color="#94a3b8" />
            </View>
            <TextInput
              className="w-full bg-white rounded-2xl py-4 pl-12 pr-4 text-slate-800 text-base border border-slate-200"
              placeholder="증상을 검색해보세요 (예: 두통, 속쓰림)"
              placeholderTextColor="#94a3b8"
            />
          </View>
        </View>

        {/* Body Map Visualization */}
        <View style={dStyles.bodyCard}>
          <View className="absolute top-4 right-4 flex-col gap-2 z-10">
            <TouchableOpacity className="bg-slate-100 p-3 rounded-2xl border border-slate-200" activeOpacity={0.8}>
              <MaterialIcons name="zoom-in" size={20} color="#2563eb" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-slate-100 p-3 rounded-2xl border border-slate-200" activeOpacity={0.8}>
              <MaterialIcons name="3d-rotation" size={20} color="#64748b" />
            </TouchableOpacity>
          </View>

          <View className="relative w-full h-[360px] max-w-[300px] flex items-center justify-center">
            <Svg className="w-full h-full" viewBox="0 0 240 540">
              {/* Head */}
              <Circle cx="120" cy="70" r="32" fill={selectedParts.includes('head') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('head')} />

              {/* Chest */}
              <Path d="M 98 125 L 142 125 A 20 20 0 0 1 162 145 L 162 200 L 78 200 L 78 145 A 20 20 0 0 1 98 125 Z" fill={selectedParts.includes('chest') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('chest')} />

              {/* Abdomen */}
              <Rect x="78" y="200" width="84" height="80" rx="10" fill={selectedParts.includes('abdomen') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('abdomen')} />

              {/* === 왼쪽 팔 분할 === */}
              {/* Left Upper Arm */}
              <Rect x="42" y="132" width="24" height="50" rx="12" fill={selectedParts.includes('left_upper_arm') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('left_upper_arm')} />

              {/* Left Elbow */}
              <Rect x="42" y="182" width="24" height="20" rx="8" fill={selectedParts.includes('left_elbow') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('left_elbow')} />

              {/* Left Forearm */}
              <Rect x="42" y="202" width="24" height="45" rx="12" fill={selectedParts.includes('left_forearm') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('left_forearm')} />

              {/* Left Hand */}
              <Rect x="40" y="247" width="28" height="20" rx="6" fill={selectedParts.includes('left_hand') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('left_hand')} />

              {/* === 오른쪽 팔 분할 === */}
              {/* Right Upper Arm */}
              <Rect x="174" y="132" width="24" height="50" rx="12" fill={selectedParts.includes('right_upper_arm') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('right_upper_arm')} />

              {/* Right Elbow */}
              <Rect x="174" y="182" width="24" height="20" rx="8" fill={selectedParts.includes('right_elbow') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('right_elbow')} />

              {/* Right Forearm */}
              <Rect x="174" y="202" width="24" height="45" rx="12" fill={selectedParts.includes('right_forearm') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('right_forearm')} />

              {/* Right Hand */}
              <Rect x="172" y="247" width="28" height="20" rx="6" fill={selectedParts.includes('right_hand') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('right_hand')} />

              {/* === 다리 분할 === */}
              {/* Left Thigh (허벅지) */}
              <Rect x="78" y="280" width="28" height="80" rx="10" fill={selectedParts.includes('left_thigh') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('left_thigh')} />

              {/* Right Thigh */}
              <Rect x="134" y="280" width="28" height="80" rx="10" fill={selectedParts.includes('right_thigh') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('right_thigh')} />

              {/* Left Knee */}
              <Rect x="78" y="360" width="28" height="25" rx="8" fill={selectedParts.includes('left_knee') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('left_knee')} />

              {/* Right Knee */}
              <Rect x="134" y="360" width="28" height="25" rx="8" fill={selectedParts.includes('right_knee') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('right_knee')} />

              {/* Left Calf (종아리) */}
              <Rect x="78" y="385" width="28" height="60" rx="10" fill={selectedParts.includes('left_calf') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('left_calf')} />

              {/* Right Calf */}
              <Rect x="134" y="385" width="28" height="60" rx="10" fill={selectedParts.includes('right_calf') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('right_calf')} />

              {/* Left Foot */}
              <Rect x="75" y="445" width="34" height="15" rx="5" fill={selectedParts.includes('left_foot') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('left_foot')} />

              {/* Right Foot */}
              <Rect x="131" y="445" width="34" height="15" rx="5" fill={selectedParts.includes('right_foot') ? '#2563eb' : '#e2e8f0'} onPress={() => togglePart('right_foot')} />
            </Svg>

            <View className="absolute top-[8%] left-[70%] bg-white px-3 py-1.5 rounded-xl border border-slate-200 opacity-80">
              <Text className="text-xs font-bold text-slate-900">머리</Text>
            </View>
            <View className="absolute top-[28%] left-[5%] bg-white px-4 py-2 rounded-2xl shadow-sm flex-row items-center gap-1.5 border border-blue-100 z-20">
              <MaterialIcons name="check-circle" size={14} color="#2563eb" />
              <Text className="text-sm font-bold text-slate-900">가슴/심장</Text>
            </View>
            <View className="absolute top-[48%] right-[2%] bg-white px-3 py-1.5 rounded-xl border border-slate-200 opacity-90">
              <Text className="text-xs font-bold text-slate-900">팔/어깨</Text>
            </View>
          </View>

          <View pointerEvents="none" className="absolute bottom-6 bg-white/90 px-4 py-2 rounded-full border border-blue-100 shadow-sm flex-row items-center gap-2">
            <View className={`w-2.5 h-2.5 rounded-full ${selectedParts.length > 0 ? 'bg-blue-600 opacity-60' : 'bg-slate-300'}`} />
            <Text className={`text-sm font-bold ${selectedParts.length > 0 ? 'text-blue-600' : 'text-slate-400'}`}>
              {selectedParts.length > 0
                ? (selectedParts.length === 1 ? `${partNames[selectedParts[0]]} 영역 선택됨` : `${partNames[selectedParts[0]]} 외 ${selectedParts.length - 1}곳 선택됨`)
                : '선택된 영역 없음'}
            </Text>
          </View>
        </View>

        {/* Contextual Area Tabs */}
        <View className="flex-col gap-6 mb-8 mt-2">
          {/* Selected Areas */}
          <View className="flex-col gap-3">
            <Text className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1">선택된 부위</Text>
            <View className="flex-row flex-wrap gap-2.5">
              {selectedParts.length === 0 ? (
                <View className="rounded-full shadow-sm overflow-hidden" style={{ shadowColor: '#94a3b8', shadowOpacity: 0.15, shadowRadius: 3, shadowOffset: { width: 0, height: 1 } }}>
                  <LinearGradient colors={['#ffffff', '#f1f5f9']} className="px-5 py-3 rounded-full border border-slate-200">
                    <Text className="text-slate-400 text-sm font-medium">부위를 터치하여 선택해주세요</Text>
                  </LinearGradient>
                </View>
              ) : (
                selectedParts.map(part => (
                  <TouchableOpacity
                    key={part}
                    activeOpacity={0.8}
                    onPress={() => togglePart(part)}
                    className="rounded-full shadow-sm"
                    style={{ shadowColor: '#2563eb', shadowOpacity: 0.25, shadowRadius: 3, shadowOffset: { width: 0, height: 2 } }}
                  >
                    <LinearGradient
                      colors={['#60a5fa', '#3b82f6', '#2563eb']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      className="px-5 py-3 rounded-full flex-row items-center gap-1.5 border border-blue-400"
                    >
                      <Text className="text-white text-sm font-bold">{partNames[part]}</Text>
                      <MaterialIcons name="close" size={16} color="#dbeafe" />
                    </LinearGradient>
                  </TouchableOpacity>
                ))
              )}
              <TouchableOpacity
                activeOpacity={0.7}
                className="rounded-full shadow-sm"
                style={{ shadowColor: '#94a3b8', shadowOpacity: 0.15, shadowRadius: 3, shadowOffset: { width: 0, height: 2 } }}
              >
                <LinearGradient colors={['#ffffff', '#f8fafc']} className="px-5 py-3 rounded-full border border-slate-200 items-center justify-center">
                  <MaterialIcons name="add" size={18} color="#64748b" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* Symptoms */}
          <View className="flex-col gap-3">
            <Text className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1">주요 증상</Text>
            <View className="flex-row flex-wrap gap-2.5">
              {[
                { label: '통증', color: 'blue' },
                { label: '압박감', color: 'blue' },
                { label: '답답함', color: 'slate' },
                { label: '호흡곤란', color: 'slate' },
                { label: '저림', color: 'slate' }
              ].map(symptom => (
                <TouchableOpacity
                  key={symptom.label}
                  activeOpacity={0.8}
                  className="rounded-full shadow-sm"
                  style={{ shadowColor: symptom.color === 'blue' ? '#3b82f6' : '#94a3b8', shadowOpacity: 0.15, shadowRadius: 3, shadowOffset: { width: 0, height: 2 } }}
                >
                  <LinearGradient
                    colors={symptom.color === 'blue' ? ['#eff6ff', '#dbeafe', '#bfdbfe'] : ['#ffffff', '#f8fafc', '#f1f5f9']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    className={`px-5 py-3 rounded-full border ${symptom.color === 'blue' ? 'border-blue-200' : 'border-slate-200'}`}
                  >
                    <Text className={`text-sm font-bold ${symptom.color === 'blue' ? 'text-blue-700' : 'text-slate-700'}`}>
                      {symptom.label}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Pain Intensity */}
        <View style={dStyles.sectionCard}>
          <View className="flex-row justify-between items-end">
            <Text className="text-sm font-bold text-slate-500 uppercase tracking-widest">통증 강도</Text>
            <View className="bg-blue-600 px-3 py-1 rounded-lg">
              <Text className="text-white text-lg font-bold">7</Text>
            </View>
          </View>
          <View className="w-full h-3 rounded-full overflow-hidden flex-row">
            <View className="flex-1 bg-emerald-500" />
            <View className="flex-1 bg-amber-400" />
            <View className="flex-[0.6] bg-red-500" />
            <View className="flex-[0.4] bg-slate-200" />
          </View>
          <View className="flex-row justify-between pt-1">
            <Text className="text-xs font-semibold text-slate-400">거의 없음</Text>
            <Text className="text-xs font-semibold text-slate-400">매우 심함</Text>
          </View>
        </View>

        {/* Time Selection */}
        <View className="flex-col gap-4 mb-8">
          <Text className="text-sm font-bold text-slate-500 uppercase tracking-widest">언제부터 시작되었나요?</Text>
          <View className="flex-row flex-wrap gap-3">
            <TouchableOpacity className="w-[48%] p-4 rounded-2xl bg-white border border-slate-200 shadow-sm" activeOpacity={0.7}>
              <Text className="text-sm font-bold text-slate-900 mb-1">방금 전</Text>
              <Text className="text-xs text-slate-500">최근 1시간 이내</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-[48%] p-4 rounded-2xl bg-blue-600 shadow-md" activeOpacity={0.8}>
              <Text className="text-sm font-bold text-white mb-1">1~2일 전</Text>
              <Text className="text-xs text-blue-100">어제 또는 오늘 새벽</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-[48%] p-4 rounded-2xl bg-white border border-slate-200 shadow-sm" activeOpacity={0.7}>
              <Text className="text-sm font-bold text-slate-900 mb-1">3~7일 전</Text>
              <Text className="text-xs text-slate-500">일주일 이내</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-[48%] p-4 rounded-2xl bg-white border border-slate-200 shadow-sm" activeOpacity={0.7}>
              <Text className="text-sm font-bold text-slate-900 mb-1">1주 이상</Text>
              <Text className="text-xs text-slate-500">만성적인 불편함</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View className="pt-8 pb-12 flex-col gap-6 border-t border-slate-100">
          <View className="flex-row items-center justify-center gap-2 bg-blue-50 py-3 rounded-2xl border border-blue-100">
            <MaterialIcons name="lock-outline" size={14} color="#2563eb" />
            <Text className="text-xs font-medium text-slate-600">선우님의 건강 데이터는 <Text className="text-blue-600 font-bold">암호화</Text> 기술로 보호됩니다</Text>
          </View>
          <View className="px-2">
            <Text className="text-[10px] leading-relaxed text-slate-400 text-center">
              본 서비스는 증상에 대한 참고용 정보를 제공하며, 실제 의사의 진단을 대신할 수 없습니다.{'\n'}위급 상황 발생 시 즉시 <Text className="font-bold text-slate-500">119</Text> 또는 가까운 응급실을 방문하시기 바랍니다.
            </Text>
          </View>
        </View>
      </Animated.ScrollView>

      {/* Floating Action Button */}
      <View className="absolute right-6 z-40" style={{ bottom: insets.bottom + 120 }}>
        <TouchableOpacity activeOpacity={0.85}>
          <LinearGradient
            colors={['#2563eb', '#1d4ed8']}
            className="w-12 h-12 rounded-full items-center justify-center"
            style={{ shadowColor: '#2563eb', shadowOpacity: 0.4, shadowRadius: 12 }}
          >
            <MaterialIcons name="chat-bubble" size={22} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Sticky Action Button */}
      <View style={[dStyles.stickyBar, { paddingBottom: insets.bottom + 12 }]}>
        <TouchableOpacity
          className="w-full py-4 rounded-2xl items-center justify-center shadow-sm"
          activeOpacity={0.8}
          onPress={() => router.push('/diagnosis')}
        >
          <LinearGradient
            colors={['#2563eb', '#1d4ed8']}
            className="absolute inset-0 rounded-2xl"
          />
          <Text className="text-white font-bold text-lg">AI 분석 시작하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const dStyles = StyleSheet.create({
  bodyCard: {
    backgroundColor: 'rgba(255,255,255,0.62)',
    borderRadius: 32,
    padding: 24,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 400,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.45)',
    shadowColor: '#2563eb',
    shadowOpacity: 0.07,
    shadowRadius: 24,
    elevation: 4,
  },
  sectionCard: {
    backgroundColor: 'rgba(255,255,255,0.62)',
    borderRadius: 32,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.45)',
    shadowColor: '#2563eb',
    shadowOpacity: 0.07,
    shadowRadius: 24,
    elevation: 4,
    gap: 16,
  },
  stickyBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.88)',
    paddingHorizontal: 24,
    paddingTop: 16,
    zIndex: 50,
    borderTopWidth: 1,
    borderTopColor: 'rgba(226,232,240,0.5)',
  },
});
