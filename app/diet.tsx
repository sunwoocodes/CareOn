import { MaterialIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Animated, Image, LayoutAnimation, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import TopBar from '../components/TopBar';

const NutrientBar = ({ label, value, colorClass, percent }: { label: string, value: string, colorClass: string, percent: any }) => (
  <View className="w-[30%] flex-col gap-1.5 mb-3">
    <View className="flex-row justify-between">
      <Text className="text-[10px] font-bold text-slate-500">{label}</Text>
      <Text className="text-[10px] font-bold text-slate-900">{value}</Text>
    </View>
    <View className="h-1 bg-slate-100 rounded-full overflow-hidden flex-row">
      <View className={`h-full ${colorClass}`} style={{ width: percent }} />
    </View>
  </View>
);

export default function DietLog() {
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const premiumGlowAnim = useRef(new Animated.Value(0)).current;

  const [isPremium, setIsPremium] = useState(false);
  const [expandedMeals, setExpandedMeals] = useState<Record<string, boolean>>({
    breakfast: false,
    lunch: false,
  });

  const toggleExpand = (meal: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedMeals(prev => ({ ...prev, [meal]: !prev[meal] }));
  };

  const handleTogglePremium = (val: boolean) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsPremium(val);

    if (val) {
      premiumGlowAnim.setValue(0);
      Animated.sequence([
        Animated.timing(premiumGlowAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      premiumGlowAnim.setValue(0);
    }
  };

  const renderPremiumToggle = () => (
    <View className="flex-row items-center gap-2">
      <Text className={`text-xs font-bold ${isPremium ? 'text-purple-600' : 'text-slate-400'}`}>
        PREMIUM
      </Text>
      <Switch
        value={isPremium}
        onValueChange={handleTogglePremium}
        trackColor={{ false: '#cbd5e1', true: '#d8b4fe' }}
        thumbColor={isPremium ? '#9333ea' : '#f8fafc'}
        ios_backgroundColor="#cbd5e1"
        style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
      />
    </View>
  );

  return (
    <View className="flex-1 bg-slate-50 overflow-hidden">
      <TopBar title="식단 상세 기록" showBack={true} showNotification={false} scrollY={scrollY} rightElement={renderPremiumToggle()} />

      {/* 🔥 Background Glow */}
      <View className="absolute -top-20 -left-10 w-72 h-72 bg-emerald-200 opacity-20 rounded-full blur-3xl" />
      <View className="absolute top-40 -right-10 w-72 h-72 bg-blue-200 opacity-20 rounded-full blur-3xl" />
      {isPremium && <View className="absolute top-80 right-0 w-96 h-96 bg-purple-300 opacity-20 rounded-full blur-3xl pointer-events-none" />}

      <Animated.ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: insets.top + 70,
          paddingBottom: insets.bottom + 100,
          paddingHorizontal: 24,
          alignSelf: 'center',
          width: '100%',
          maxWidth: 448
        }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
      >
        {/* Weekly Calendar Section */}
        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-bold text-lg text-slate-900">2024년 5월</Text>
            <MaterialIcons name="calendar-month" size={20} color="#64748b" />
          </View>
          <View className="flex-row justify-between">
            {/* Mon */}
            <TouchableOpacity className="items-center gap-2" activeOpacity={0.7}>
              <Text className="text-[11px] font-bold text-slate-500">월</Text>
              <View className="w-10 h-10 rounded-2xl items-center justify-center bg-slate-100">
                <Text className="text-slate-900 font-bold text-sm">12</Text>
              </View>
              <View className="w-6 h-6 rounded-full bg-slate-200 items-center justify-center">
                <Text className="text-[10px] font-extrabold text-slate-700">82</Text>
              </View>
            </TouchableOpacity>
            {/* Tue */}
            <TouchableOpacity className="items-center gap-2" activeOpacity={0.7}>
              <Text className="text-[11px] font-bold text-slate-500">화</Text>
              <View className="w-10 h-10 rounded-2xl items-center justify-center bg-slate-100">
                <Text className="text-slate-900 font-bold text-sm">13</Text>
              </View>
              <View className="w-6 h-6 rounded-full bg-slate-200 items-center justify-center">
                <Text className="text-[10px] font-extrabold text-slate-700">75</Text>
              </View>
            </TouchableOpacity>
            {/* Wed (Active) */}
            <TouchableOpacity className="items-center gap-2" activeOpacity={0.9}>
              <Text className="text-[11px] font-bold text-blue-600">수</Text>
              <View className="w-10 h-10 rounded-2xl items-center justify-center bg-blue-600 shadow-sm border border-blue-400">
                <Text className="text-white font-bold text-sm">14</Text>
              </View>
              <View className="w-6 h-6 rounded-full bg-blue-100 items-center justify-center border border-blue-200">
                <Text className="text-[10px] font-extrabold text-blue-600">92</Text>
              </View>
            </TouchableOpacity>
            {/* Thu */}
            <TouchableOpacity className="items-center gap-2" activeOpacity={0.7}>
              <Text className="text-[11px] font-bold text-slate-500">목</Text>
              <View className="w-10 h-10 rounded-2xl items-center justify-center bg-slate-100">
                <Text className="text-slate-900 font-bold text-sm">15</Text>
              </View>
              <View className="w-6 h-6 rounded-full bg-slate-200 items-center justify-center">
                <Text className="text-[10px] font-extrabold text-slate-700">88</Text>
              </View>
            </TouchableOpacity>
            {/* Fri */}
            <TouchableOpacity className="items-center gap-2" activeOpacity={0.7}>
              <Text className="text-[11px] font-bold text-slate-500">금</Text>
              <View className="w-10 h-10 rounded-2xl items-center justify-center bg-slate-100">
                <Text className="text-slate-900 font-bold text-sm">16</Text>
              </View>
              <View className="w-6 h-6 rounded-full bg-slate-100 items-center justify-center">
                <Text className="text-[10px] font-bold text-slate-400">--</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Greeting Section */}
        <View className="mb-8">
          <Text className="text-slate-900 font-extrabold text-2xl leading-snug tracking-tight">
            안녕하세요, 푸앙님!{'\n'}
            <Text className="text-slate-500 text-lg font-medium tracking-normal">오늘의 영양 상태를 한눈에 확인해보세요.</Text>
          </Text>
        </View>

        {/* Main Insight Card (Integrated with Premium Analysis) */}
        <View className={`bg-white rounded-[32px] p-6 shadow-md mb-8 border overflow-hidden ${isPremium ? 'border-purple-200' : 'border-slate-50'}`} style={{ shadowColor: isPremium ? '#9333ea' : '#10b981', shadowOpacity: 0.15, shadowRadius: 30 }}>

          {/* 샤랄라 애니메이션 배경 */}
          <Animated.View
            className="absolute inset-0 bg-purple-200 opacity-20"
            style={{
              opacity: premiumGlowAnim.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, 0.4, 0]
              }),
              transform: [{
                scale: premiumGlowAnim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 1.1, 1]
                })
              }]
            }}
          />
          <Animated.View
            className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full blur-3xl"
            style={{
              opacity: premiumGlowAnim.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, 0.8, 0]
              })
            }}
          />

          <View className="flex-row items-center justify-between relative z-10">
            <View className="flex-col gap-2">
              <Text className="text-slate-500 font-semibold text-sm">오늘의 식단 점수</Text>
              <View className="flex-row items-baseline gap-1">
                <Text className="text-4xl font-extrabold text-blue-600 tracking-tight">92</Text>
                <Text className="text-xl font-bold text-slate-900">점</Text>
              </View>
              <View className="flex-row items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 self-start">
                <View className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <Text className="text-emerald-700 text-xs font-bold">매우 우수함</Text>
              </View>
            </View>

            <View className="relative w-28 h-28 items-center justify-center">
              <Svg className="w-full h-full -rotate-90" viewBox="0 0 112 112">
                <Circle cx="56" cy="56" fill="transparent" r="48" stroke="#f1f5f9" strokeWidth="12" />
                <Circle cx="56" cy="56" fill="transparent" r="42" stroke="rgba(37,99,235,0.2)" strokeDasharray="263.89" strokeDashoffset="129.3" strokeLinecap="round" strokeWidth="6" />
                <Circle cx="56" cy="56" fill="transparent" r="48" stroke={isPremium ? '#9333ea' : '#2563eb'} strokeDasharray="301.59" strokeDashoffset="24.12" strokeLinecap="round" strokeWidth="12" />
              </Svg>
              <View className="absolute inset-0 items-center justify-center">
                <Text className={`font-bold text-xl ${isPremium ? 'text-purple-600' : 'text-blue-600'}`}>92%</Text>
              </View>
            </View>
          </View>

          <View className="mt-6 pt-6 border-t border-slate-100 flex-row justify-between relative z-10">
            <View className="items-center flex-1">
              <Text className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">칼로리</Text>
              <Text className="text-slate-900 font-bold text-sm">1,070 / 2,100</Text>
            </View>
            <View className="items-center flex-1 border-l border-slate-100 pl-6">
              <Text className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">남은 칼로리</Text>
              <Text className={`${isPremium ? 'text-purple-600' : 'text-blue-600'} font-bold text-sm`}>1,030 kcal</Text>
            </View>
          </View>

          {/* Integrated Premium Analysis Section */}
          {isPremium && (
            <View className="mt-6 pt-6 border-t border-purple-100 relative z-10">
              <View className="flex-row items-center gap-2 mb-4">
                <View className="bg-purple-100 p-1 rounded-full">
                  <MaterialIcons name="auto-awesome" size={14} color="#9333ea" />
                </View>
                <Text className="font-extrabold text-sm text-purple-900">프리미엄 리포트</Text>
              </View>

              <View className="bg-slate-50/50 rounded-2xl p-4 mb-3 border border-slate-100">
                <Text className="text-xs font-bold text-slate-500 mb-2">현재 부족한 영양소</Text>
                <View className="flex-row flex-wrap gap-2">
                  <View className="bg-red-50 px-2 py-1 rounded-full border border-red-100 flex-row items-center gap-1">
                    <MaterialIcons name="warning" size={12} color="#ef4444" />
                    <Text className="text-red-600 font-bold text-[10px]">칼슘</Text>
                  </View>
                  <View className="bg-orange-50 px-2 py-1 rounded-full border border-orange-100 flex-row items-center gap-1">
                    <MaterialIcons name="warning" size={12} color="#f97316" />
                    <Text className="text-orange-600 font-bold text-[10px]">마그네슘</Text>
                  </View>
                  <View className="bg-amber-50 px-2 py-1 rounded-full border border-amber-100 flex-row items-center gap-1">
                    <MaterialIcons name="warning" size={12} color="#f59e0b" />
                    <Text className="text-amber-600 font-bold text-[10px]">아연</Text>
                  </View>
                </View>
                <Text className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                  오늘 식단에서는 뼈 건강에 중요한 <Text className="font-bold text-slate-800">칼슘, 마그네슘, 아연</Text>이 부족합니다. 저녁 식사에 두부를 추가해보세요.
                </Text>
              </View>

              <View className="bg-purple-50 rounded-2xl p-3 border border-purple-100 flex-row items-center gap-3 shadow-sm">
                <View className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm">
                  <MaterialIcons name="medication" size={20} color="#9333ea" />
                </View>
                <View className="flex-1">
                  <Text className="text-[10px] font-bold text-purple-600 mb-0.5">오늘의 추천 영양제</Text>
                  <Text className="font-bold text-slate-900 text-[13px]">칼마디 (칼슘+마그네슘+아연+D)</Text>
                </View>
                <TouchableOpacity className="bg-purple-600 px-3 py-1.5 rounded-full" activeOpacity={0.7}>
                  <Text className="text-white font-bold text-[10px]">알아보기</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Timeline Section */}
        <View className="flex-col gap-6 mb-8">
          <View className="flex-row items-center justify-between">
            <Text className="font-bold text-xl text-slate-900 tracking-tight">오늘의 타임라인</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text className="text-blue-600 text-sm font-semibold">전체보기</Text>
            </TouchableOpacity>
          </View>

          {/* Breakfast */}
          <View className="relative pl-10 pt-1">
            <View className="absolute left-[11px] top-6 bottom-[-20px] w-[2px] bg-slate-200" />
            <View className="absolute left-0 top-1 w-6 h-6 rounded-full bg-blue-500 items-center justify-center border-4 border-slate-50">
              <MaterialIcons name="wb-sunny" size={12} color="white" />
            </View>

            <View className="bg-white rounded-[32px] overflow-hidden shadow-md border border-slate-50 flex-col md:flex-row" style={{ shadowColor: '#2563eb', shadowOpacity: 0.1, shadowRadius: 20 }}>
              <View className="w-full md:w-32 h-32">
                <Image source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYrJ74jNztfKIjQEMjB_vk-saDD4PFK3AVKRxSrO4z-b8j8TBy687MJunpmnxYB0VNpnVFCYlCkHoEDoDva3OCKWLxpD6WCdlFJZysBTRXR1dDQXKS6zlDZkP4K-q5X8aP3y_VAjOg1O2RB4mnnj5ekytbhIVDVphqjKhXzTskVdCb_Dwk-rtFRymxDLWWwaMWLDq-GqrOF_PZg8XwpRU98hF5xqI34pOlUlzH8WdIpqIPmz27HYv0TEQUrpfQGSTFIl3BacoRX2D3" }} className="w-full h-full" resizeMode="cover" />
              </View>
              <View className="p-5 flex-1 flex-col gap-3">
                <View className="flex-row justify-between items-start">
                  <View>
                    <Text className="text-xs text-slate-500 font-medium">08:30 AM · 아침</Text>
                    <Text className="text-slate-900 font-bold text-lg mt-0.5 tracking-tight">닭가슴살 아보카도 샐러드</Text>
                  </View>
                  <Text className="text-blue-600 font-bold text-lg">420 kcal</Text>
                </View>

                {/* Nutrients List */}
                <View className="flex-row flex-wrap justify-between mt-2">
                  <NutrientBar label="탄수화물" value="25g" percent="40%" colorClass="bg-amber-400" />
                  <NutrientBar label="단백질" value="38g" percent="75%" colorClass="bg-blue-600" />
                  <NutrientBar label="지방" value="18g" percent="50%" colorClass="bg-pink-500" />

                  {isPremium && (
                    <>
                      <NutrientBar label="당류" value="5g" percent="20%" colorClass="bg-emerald-500" />
                      <NutrientBar label="나트륨" value="400mg" percent="20%" colorClass="bg-red-400" />
                      <NutrientBar label="칼슘" value="200mg" percent="30%" colorClass="bg-indigo-400" />

                      {expandedMeals.breakfast && (
                        <>
                          <NutrientBar label="칼륨" value="300mg" percent="10%" colorClass="bg-purple-400" />
                          <NutrientBar label="마그네슘" value="50mg" percent="15%" colorClass="bg-teal-400" />
                          <NutrientBar label="인" value="100mg" percent="10%" colorClass="bg-orange-400" />
                          <NutrientBar label="철" value="2mg" percent="15%" colorClass="bg-rose-400" />
                          <NutrientBar label="아연" value="3mg" percent="30%" colorClass="bg-cyan-400" />
                          <NutrientBar label="콜레스테롤" value="50mg" percent="16%" colorClass="bg-yellow-400" />
                          <NutrientBar label="트랜스지방" value="0g" percent="0%" colorClass="bg-slate-400" />
                        </>
                      )}
                    </>
                  )}
                </View>

                {isPremium && (
                  <TouchableOpacity
                    onPress={() => toggleExpand('breakfast')}
                    className="py-1 mt-[-4px] items-center"
                    activeOpacity={0.7}
                  >
                    <MaterialIcons
                      name={expandedMeals.breakfast ? "expand-less" : "expand-more"}
                      size={20}
                      color="#94a3b8"
                    />
                  </TouchableOpacity>
                )}

                <View className="flex-row gap-2 mt-1">
                  <View className="bg-slate-100 px-2.5 py-1 rounded-lg">
                    <Text className="text-[10px] font-bold text-slate-700">저탄고지</Text>
                  </View>
                  <View className="bg-emerald-50 px-2.5 py-1 rounded-lg">
                    <Text className="text-[10px] font-bold text-emerald-700">고단백</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Lunch */}
          <View className="relative pl-10 pt-2">
            <View className="absolute left-[11px] top-6 bottom-[-20px] w-[2px] bg-slate-200" />
            <View className="absolute left-0 top-1 w-6 h-6 rounded-full bg-blue-500 items-center justify-center border-4 border-slate-50">
              <MaterialIcons name="wb-sunny" size={12} color="white" />
            </View>

            <View className="bg-white rounded-[32px] overflow-hidden shadow-md border border-slate-50 flex-col md:flex-row" style={{ shadowColor: '#2563eb', shadowOpacity: 0.1, shadowRadius: 20 }}>
              <View className="w-full md:w-32 h-32">
                <Image source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrpYtY0KGWGHto9AsdQjM83Ark0VD_1B4dk-gaB-gCBHQjyJzU1ycqfce-hh_5CPTo9QOhWcurigmhsrPHot_ny97-uP9PUJK1mgQTjfIQLJ8I25EtRAJPw6UgIP30PSjAU84KE0E7bawf3iJfqTavnHUn2JPGk7NzayKFqEhu3DxX6HPn86tJ2cKHvUcMaoj2QKfTA-j5z6S5bdcu9LN-sobJNdSlrqROF1LECIaaj5dJcDPf7ZuJJxxdkrrGmzkvGqeB2uln7_S2" }} className="w-full h-full" resizeMode="cover" />
              </View>
              <View className="p-5 flex-1 flex-col gap-3">
                <View className="flex-row justify-between items-start">
                  <View>
                    <Text className="text-xs text-slate-500 font-medium">12:45 PM · 점심</Text>
                    <Text className="text-slate-900 font-bold text-lg mt-0.5 tracking-tight">불고기 덮밥</Text>
                  </View>
                  <Text className="text-blue-600 font-bold text-lg">650 kcal</Text>
                </View>

                {/* Nutrients List */}
                <View className="flex-row flex-wrap justify-between mt-2">
                  <NutrientBar label="탄수화물" value="82g" percent="80%" colorClass="bg-amber-400" />
                  <NutrientBar label="단백질" value="28g" percent="55%" colorClass="bg-blue-600" />
                  <NutrientBar label="지방" value="22g" percent="60%" colorClass="bg-pink-500" />

                  {isPremium && (
                    <>
                      <NutrientBar label="당류" value="15g" percent="60%" colorClass="bg-emerald-500" />
                      <NutrientBar label="나트륨" value="950mg" percent="85%" colorClass="bg-red-400" />
                      <NutrientBar label="칼슘" value="80mg" percent="15%" colorClass="bg-indigo-400" />

                      {expandedMeals.lunch && (
                        <>
                          <NutrientBar label="칼륨" value="450mg" percent="25%" colorClass="bg-purple-400" />
                          <NutrientBar label="마그네슘" value="30mg" percent="10%" colorClass="bg-teal-400" />
                          <NutrientBar label="인" value="120mg" percent="15%" colorClass="bg-orange-400" />
                          <NutrientBar label="철" value="4mg" percent="30%" colorClass="bg-rose-400" />
                          <NutrientBar label="아연" value="2mg" percent="20%" colorClass="bg-cyan-400" />
                          <NutrientBar label="콜레스테롤" value="80mg" percent="26%" colorClass="bg-yellow-400" />
                          <NutrientBar label="트랜스지방" value="0g" percent="0%" colorClass="bg-slate-400" />
                        </>
                      )}
                    </>
                  )}
                </View>

                {isPremium && (
                  <TouchableOpacity
                    onPress={() => toggleExpand('lunch')}
                    className="py-1 mt-[-4px] items-center"
                    activeOpacity={0.7}
                  >
                    <MaterialIcons
                      name={expandedMeals.lunch ? "expand-less" : "expand-more"}
                      size={20}
                      color="#94a3b8"
                    />
                  </TouchableOpacity>
                )}

                <View className="flex-row gap-2 mt-1">
                  <View className="bg-slate-100 px-2.5 py-1 rounded-lg">
                    <Text className="text-[10px] font-bold text-slate-700">균형 잡힌</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Dinner Scheduled */}
          <View className="relative pl-10 pt-2">
            <View className="absolute left-0 top-1 w-6 h-6 rounded-full bg-slate-200 items-center justify-center border-4 border-slate-50">
              <MaterialIcons name="bedtime" size={12} color="#94a3b8" />
            </View>

            <View className="bg-white rounded-[32px] p-6 flex-col items-center justify-center border-2 border-dashed border-slate-300 shadow-sm">
              <Text className="text-slate-500 font-semibold mb-3">저녁 식사 예정</Text>
              <TouchableOpacity className="bg-blue-600 px-5 py-2.5 rounded-full flex-row items-center gap-2 shadow-sm" activeOpacity={0.8}>
                <MaterialIcons name="photo-camera" size={18} color="white" />
                <Text className="font-bold text-sm text-white">식단 기록하기</Text>
              </TouchableOpacity>
              <Text className="text-[11px] text-slate-400 font-medium mt-3">오후 07:00 예정</Text>
            </View>
          </View>
        </View>

        {/* Stats Bento Section */}
        <View className="flex-row gap-4 pb-8">
          <View className="bg-blue-50 p-6 rounded-[32px] flex-col gap-3 flex-1 border border-blue-100 shadow-sm">
            <View className="flex-row items-center gap-2">
              <MaterialIcons name="water-drop" size={20} color="#2563eb" />
              <Text className="text-slate-600 text-xs font-bold mt-0.5">수분 섭취</Text>
            </View>
            <View className="flex-row items-baseline gap-1">
              <Text className="text-2xl font-bold text-slate-900">1.2</Text>
              <Text className="text-xs text-slate-500 font-bold">/ 2.0L</Text>
            </View>
            <View className="h-1.5 w-full bg-blue-100 rounded-full overflow-hidden flex-row mt-1">
              <View className="h-full bg-blue-600" style={{ width: '60%' }} />
            </View>
          </View>

          <View className="bg-white border border-slate-50 p-6 rounded-[32px] flex-col gap-3 flex-1 shadow-md">
            <View className="flex-row items-center gap-2">
              <MaterialIcons name="bar-chart" size={20} color="#64748b" />
              <Text className="text-slate-600 text-xs font-bold mt-0.5">나트륨/당류 현황</Text>
            </View>

            <View className="flex-col gap-3 mt-1">
              <View className="flex-col gap-1.5">
                <View className="flex-row justify-between items-center">
                  <Text className="text-[10px] font-bold text-slate-900">나트륨</Text>
                  <Text className="text-[10px] font-extrabold text-red-500 uppercase mt-0.5">Warning</Text>
                </View>
                <View className="h-1 bg-slate-100 rounded-full overflow-hidden flex-row">
                  <View className="h-full bg-red-500" style={{ width: '85%' }} />
                </View>
              </View>
              <View className="flex-col gap-1.5">
                <View className="flex-row justify-between items-center">
                  <Text className="text-[10px] font-bold text-slate-900">당류</Text>
                  <Text className="text-[10px] font-extrabold text-emerald-600 uppercase mt-0.5">Safe</Text>
                </View>
                <View className="h-1 bg-slate-100 rounded-full overflow-hidden flex-row">
                  <View className="h-full bg-emerald-500" style={{ width: '32%' }} />
                </View>
              </View>
            </View>
          </View>
        </View>

      </Animated.ScrollView>

      {/* 화면 테두리 은은한 보라빛 글로우 애니메이션 (Premium 전환 시) */}
      <Animated.View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 9999,
          elevation: 9999,
          opacity: premiumGlowAnim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 1, 0]
          })
        }}
      >
        <LinearGradient
          colors={['rgba(168, 85, 247, 0.2)', 'rgba(168, 85, 247, 0.05)', 'rgba(168, 85, 247, 0)']}
          locations={[0, 0.4, 1]}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 60 }}
        />
        <LinearGradient
          colors={['rgba(168, 85, 247, 0)', 'rgba(168, 85, 247, 0.05)', 'rgba(168, 85, 247, 0.2)']}
          locations={[0, 0.6, 1]}
          style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 60 }}
        />
        <LinearGradient
          colors={['rgba(168, 85, 247, 0.2)', 'rgba(168, 85, 247, 0.05)', 'rgba(168, 85, 247, 0)']}
          locations={[0, 0.4, 1]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          style={{ position: 'absolute', top: 0, left: 0, width: 60, height: '100%' }}
        />
        <LinearGradient
          colors={['rgba(168, 85, 247, 0)', 'rgba(168, 85, 247, 0.05)', 'rgba(168, 85, 247, 0.2)']}
          locations={[0, 0.6, 1]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          style={{ position: 'absolute', top: 0, right: 0, width: 60, height: '100%' }}
        />
      </Animated.View>
    </View>
  );
}
