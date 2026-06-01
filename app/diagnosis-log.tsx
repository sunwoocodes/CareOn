import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState, useEffect } from 'react';
import { Animated, LayoutAnimation, ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform, UIManager } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
import TopBar from '../components/TopBar';

export default function DiagnosisLog() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  // Form States
  const [rating, setRating] = useState(0);
  const [improvement, setImprovement] = useState('좋아짐');
  const [effectiveness, setEffectiveness] = useState<string | null>(null);
  const [hasSideEffect, setHasSideEffect] = useState<boolean>(false);
  const [sideEffects, setSideEffects] = useState<string[]>([]);
  
  const [isReceiptVerified, setIsReceiptVerified] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCoinAnim, setShowCoinAnim] = useState(false);
  const [showRewardInfo, setShowRewardInfo] = useState(true);
  const rewardOpacity = useRef(new Animated.Value(1)).current;
  const coinAnimValues = useRef([...Array(6)].map(() => new Animated.Value(0))).current;

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        Animated.timing(rewardOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setShowRewardInfo(false);
          Animated.timing(rewardOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start();
        });
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setShowRewardInfo(true);
      rewardOpacity.setValue(1);
    }
  }, [isSubmitted]);

  const toggleSideEffect = (effect: string) => {
    setSideEffects(prev => prev.includes(effect) ? prev.filter(e => e !== effect) : [...prev, effect]);
  };

  const submitReview = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsSubmitted(true);
    
    // Scroll to top (delayed to avoid LayoutAnimation conflict)
    setTimeout(() => {
      if (scrollViewRef.current) {
        if (typeof scrollViewRef.current.scrollTo === 'function') {
          scrollViewRef.current.scrollTo({ y: 0, animated: true });
        } else if (typeof (scrollViewRef.current as any).getNode === 'function') {
          (scrollViewRef.current as any).getNode().scrollTo({ y: 0, animated: true });
        }
      }
    }, 100);
    
    // Coin Animation
    setShowCoinAnim(true);
    const animations = coinAnimValues.map((anim, i) => {
      anim.setValue(0);
      return Animated.timing(anim, {
        toValue: 1,
        duration: 800,
        delay: i * 100,
        useNativeDriver: true,
      });
    });
    Animated.parallel(animations).start(() => setShowCoinAnim(false));
  };

  return (
    <View className="flex-1 bg-slate-50 overflow-hidden">
      <TopBar title="증상 기록" showBack={true} showNotification={false} scrollY={scrollY} />

      {/* 🔥 Background Glow */}
      <View className="absolute -top-20 -left-10 w-72 h-72 bg-emerald-200 opacity-20 rounded-full blur-3xl" />
      <View className="absolute top-60 -right-10 w-72 h-72 bg-blue-200 opacity-20 rounded-full blur-3xl" />

      <Animated.ScrollView
        ref={scrollViewRef}
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
        {/* Personalized Greeting */}
        <View className="mb-10">
          <Text className="text-3xl font-extrabold tracking-tight mb-2 leading-snug text-slate-900">
            푸앙님,{'\n'}지금까지의 기록이에요
          </Text>
          <Text className="text-slate-500 text-sm">분석된 결과와 추천 복약 정보를 확인하세요.</Text>
        </View>

        {/* Main Timeline Section */}
        <View className="flex-col gap-6 mb-12">
          {/* Selected Card: Timeline Item 1 */}
          <View className="bg-white rounded-[32px] p-6 shadow-md border-2 border-blue-200 relative overflow-hidden"
            style={{ shadowColor: '#2563eb', shadowOpacity: 0.12, shadowRadius: 25 }}>
            <View className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-full -mr-16 -mt-16" />

            <View className="flex-row justify-between items-start mb-4 relative z-10">
              <View className="bg-slate-100 px-3 py-1 rounded-full">
                <Text className="text-slate-500 text-xs font-bold">5월 14일 오후 2:30</Text>
              </View>
              <View className="flex-row items-center gap-1.5 px-3 py-1 bg-blue-600 rounded-full">
                <MaterialIcons name="edit-note" size={14} color="white" />
                <Text className="text-white text-[11px] font-bold">리뷰 작성 대기</Text>
              </View>
            </View>

            <Text className="text-xl font-bold mb-4 text-slate-900 relative z-10 tracking-tight">역류성 식도염 의심</Text>

            <View className="flex-col gap-4 relative z-10">
              <View className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <Text className="text-xs text-slate-500 mb-1">추천 약품</Text>
                <View className="flex-row items-center gap-2">
                  <MaterialIcons name="local-pharmacy" size={18} color="#2563eb" />
                  <Text className="font-bold text-slate-900">제산제 A (겔포스-M)</Text>
                </View>
              </View>
            </View>

            <View className="mt-4 pt-4 border-t border-slate-100 relative z-10">
              {!isReceiptVerified ? (
                <TouchableOpacity 
                  className="flex-row items-center gap-2 px-4 py-2.5 bg-blue-50 rounded-full w-auto self-start border border-blue-100" 
                  activeOpacity={0.8}
                  onPress={() => setIsReceiptVerified(true)}
                >
                  <MaterialIcons name="receipt-long" size={16} color="#1d4ed8" />
                  <Text className="text-blue-700 text-xs font-bold">약국 영수증 인증하고 포인트 받기</Text>
                </TouchableOpacity>
              ) : (
                <View className="flex-row items-center gap-2 px-4 py-2.5 bg-blue-50 rounded-full w-auto self-start border border-blue-100 opacity-70">
                  <MaterialIcons name="verified" size={16} color="#1d4ed8" />
                  <Text className="text-blue-700 text-xs font-bold">영수증 인증 완료</Text>
                </View>
              )}
            </View>
          </View>

          {/* Review Section */}
          {!isSubmitted ? (
            <View className="mb-6 flex-col">
              <View className="flex-row items-end justify-between mb-6">
                <View>
                  <Text className="text-[10px] font-bold text-blue-600 tracking-widest uppercase mb-1">Feedback</Text>
                  <Text className="text-2xl font-bold text-slate-900 tracking-tight">약국 및 복약 리뷰</Text>
                  <Text className="text-sm text-slate-500 mt-1">5월 14일 진료에 대한 후기를 남겨주세요</Text>
                </View>
                {isReceiptVerified ? (
                  <View className="flex-row items-center gap-1">
                    <MaterialIcons name="check-circle" size={14} color="#16a34a" />
                    <Text className="text-xs text-green-600 font-bold">인증 완료</Text>
                  </View>
                ) : (
                  <Text className="text-xs text-slate-400">인증 후 작성 가능</Text>
                )}
              </View>

            <View className="flex-col gap-6">
              {/* Pharmacy Rating Card */}
              <View className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm">
                <View className="flex-col gap-4">
                  <View className="pt-2 mb-2">
                    <Text className="text-base font-extrabold text-slate-700">[약국 서비스 리뷰 ⭐]</Text>
                  </View>
                  <View className="flex-row gap-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <TouchableOpacity 
                        key={i} 
                        className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-slate-100 shadow-sm" 
                        activeOpacity={0.7}
                        onPress={() => setRating(i === rating ? 0 : i)}
                      >
                        <MaterialIcons name="star" size={24} color={i <= rating ? "#f59e0b" : "#cbd5e1"} />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>

              {/* Medication Feedback Card */}
              <View className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm flex-col gap-8">
                <View className="flex-col gap-4">
                  <View className="pt-2 mb-2">
                    <Text className="text-base font-extrabold text-slate-700">[복약 효능 피드백 😊]</Text>
                  </View>

                  {/* Symptom Improvement */}
                  <View className="flex-col gap-3">
                    <Text className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">증상 개선 정도</Text>
                    <View className="flex-row gap-2 p-1 bg-slate-100 rounded-xl">
                      {['좋아짐', '그대로임', '나빠짐'].map((option) => {
                        const isSelected = improvement === option;
                        return (
                          <TouchableOpacity 
                            key={option}
                            className={`flex-1 py-3 rounded-lg items-center justify-center ${isSelected ? 'bg-blue-600 shadow-sm' : 'bg-transparent'}`} 
                            activeOpacity={0.8}
                            onPress={() => setImprovement(option)}
                          >
                            <Text className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-500'}`}>{option}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>

                  {/* Effectiveness Icons */}
                  <View className="flex-col gap-3">
                    <Text className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">나에게 잘 맞았나요?</Text>
                    <View className="flex-row gap-3">
                      {[
                        { label: '좋아요', icon: 'sentiment-satisfied', activeColor: '#2563eb', activeBorder: 'border-blue-200' },
                        { label: '보통이에요', icon: 'sentiment-neutral', activeColor: '#2563eb', activeBorder: 'border-blue-200' },
                        { label: '별로예요', icon: 'sentiment-dissatisfied', activeColor: '#dc2626', activeBorder: 'border-red-200' }
                      ].map((item) => {
                        const isSelected = effectiveness === item.label;
                        return (
                          <TouchableOpacity 
                            key={item.label}
                            className={`flex-1 flex-col items-center gap-2 p-4 bg-white rounded-2xl border ${isSelected ? `border-2 ${item.activeBorder} shadow-sm` : 'border-slate-100 shadow-sm'}`} 
                            activeOpacity={0.8}
                            onPress={() => setEffectiveness(item.label)}
                          >
                            <MaterialIcons name={item.icon as any} size={28} color={isSelected ? item.activeColor : "#94a3b8"} />
                            <Text className={`text-xs font-bold ${isSelected ? (item.label === '별로예요' ? 'text-red-600' : 'text-blue-600') : 'text-slate-500'}`}>{item.label}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                </View>

                {/* Side Effects Section */}
                <View className="pt-6 border-t border-slate-100 flex-col gap-4">
                  <Text className="text-sm font-bold text-slate-700">부작용 여부</Text>
                  <View className="flex-row gap-3">
                    <TouchableOpacity 
                      className={`flex-1 py-4 bg-white border ${!hasSideEffect ? 'border-2 border-blue-400 bg-blue-50' : 'border-slate-200'} rounded-2xl items-center`} 
                      activeOpacity={0.8}
                      onPress={() => { setHasSideEffect(false); setSideEffects([]); }}
                    >
                      <Text className={`${!hasSideEffect ? 'text-blue-700' : 'text-slate-500'} font-bold text-sm`}>없음</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      className={`flex-1 py-4 bg-white border ${hasSideEffect ? 'border-2 border-red-400 bg-red-50' : 'border-slate-200'} rounded-2xl items-center`} 
                      activeOpacity={0.8}
                      onPress={() => setHasSideEffect(true)}
                    >
                      <Text className={`${hasSideEffect ? 'text-red-600' : 'text-slate-500'} font-bold text-sm`}>있음</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Emergency Response UI */}
                  {hasSideEffect && (
                    <View className="mt-4 p-5 bg-red-50 rounded-[24px] border border-red-100 flex-col">
                      <Text className="text-sm font-bold text-slate-700 mb-3">어떤 부작용인가요?</Text>
                      <View className="flex-row flex-wrap gap-2 mb-5">
                        {['발진', '어지러움', '구토', '기타'].map(effect => {
                          const isSelected = sideEffects.includes(effect);
                          return (
                            <TouchableOpacity 
                              key={effect}
                              className={`px-4 py-2 rounded-full ${isSelected ? 'bg-red-500 shadow-sm' : 'bg-white border border-slate-200'}`} 
                              activeOpacity={0.7}
                              onPress={() => toggleSideEffect(effect)}
                            >
                              <Text className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-slate-500'}`}>{effect}</Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>

                      <View className="flex-row items-start gap-2 mb-2">
                        <MaterialIcons name="warning" size={16} color="#dc2626" />
                        <Text className="text-xs font-bold leading-relaxed text-red-600 flex-1">경고: 증상이 심할 경우 즉시 복용을 중단하고 전문의와 상담하세요.</Text>
                      </View>

                      <View className="mt-4 pt-4 border-t border-red-200">
                        <TouchableOpacity 
                          className="w-full py-3.5 bg-red-500 rounded-xl flex-row items-center justify-center gap-2 shadow-sm" 
                          activeOpacity={0.8}
                          onPress={() => router.push({ pathname: '/map', params: { selectedId: 2, filter: '전문의 진료' } })}
                        >
                          <MaterialIcons name="location-on" size={16} color="white" />
                          <Text className="text-white text-xs font-bold">내 주변 내과/응급실 찾기 →</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </View>
            <View className="mt-8">
              <TouchableOpacity 
                className={`w-full py-4 rounded-2xl flex-row justify-center shadow-md ${isReceiptVerified && effectiveness !== null ? 'bg-blue-600' : 'bg-slate-300'}`} 
                activeOpacity={0.8}
                onPress={(isReceiptVerified && effectiveness !== null) ? submitReview : undefined}
                disabled={!isReceiptVerified || effectiveness === null}
              >
                <Text className="text-white font-bold text-base">리뷰 제출하고 +100P 받기</Text>
              </TouchableOpacity>
            </View>
            </View>
          ) : (
            <View className="bg-white rounded-[32px] p-6 border border-slate-100 flex-col gap-5 shadow-sm mb-6">
              <View className="flex-col">
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-[11px] font-medium text-slate-500">5월 14일 오후 2:30</Text>
                  <View className="flex-row items-center gap-1 bg-slate-100 px-3 py-1 rounded-full">
                    <MaterialIcons name="check-circle" size={12} color="#64748b" />
                    <Text className="text-slate-500 text-[10px] font-bold">리뷰 작성 완료</Text>
                  </View>
                </View>
                <Text className="text-lg font-bold text-slate-900 mb-3 tracking-tight">약국 및 복약 리뷰</Text>

                <View className="flex-row gap-2 mb-4">
                  <View className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg">
                    <Text className="text-xs font-medium text-slate-700">효과 {improvement}</Text>
                  </View>
                  <View className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg">
                    <Text className="text-xs font-medium text-slate-700">만족도 {effectiveness}</Text>
                  </View>
                </View>

                <Animated.View style={{ opacity: rewardOpacity }}>
                  {showRewardInfo ? (
                    <View className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <Text className="text-[10px] text-slate-400 mb-1 uppercase tracking-wider font-bold">Review Reward</Text>
                      <View className="flex-row items-center gap-2 mt-1">
                        <View className="w-6 h-6 rounded-full bg-blue-100 items-center justify-center">
                          <Text className="text-blue-700 font-bold text-[10px]">+100</Text>
                        </View>
                        <Text className="text-sm font-semibold text-slate-700">포인트 지급 완료</Text>
                      </View>
                    </View>
                  ) : (
                    <View className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <Text className="text-[10px] text-slate-400 mb-1 uppercase tracking-wider font-bold">Recommended Care</Text>
                      <Text className="text-sm font-semibold text-slate-700 mt-1">제산제 A 및 자극적인 음식 피하기</Text>
                    </View>
                  )}
                </Animated.View>
              </View>

              <View className="pt-4 border-t border-slate-100">
                <View className="flex-row items-center gap-2 px-5 py-2.5 bg-blue-50 rounded-full w-auto self-start border border-blue-100 opacity-70">
                  <MaterialIcons name="verified" size={14} color="#64748b" />
                  <Text className="text-slate-500 text-xs font-bold">영수증 인증 완료</Text>
                </View>
              </View>
            </View>
          )}

          {/* Completed Card: Timeline Item 2 */}
          <View className="bg-white rounded-[32px] p-6 border border-slate-100 flex-col gap-5 shadow-sm">
            <View className="flex-col">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-[11px] font-medium text-slate-500">5월 10일 오전 10:15</Text>
                <View className="flex-row items-center gap-1 bg-slate-100 px-3 py-1 rounded-full">
                  <MaterialIcons name="check-circle" size={12} color="#64748b" />
                  <Text className="text-slate-500 text-[10px] font-bold">리뷰 작성 완료</Text>
                </View>
              </View>
              <Text className="text-lg font-bold text-slate-900 mb-3 tracking-tight">급성 편도염 초기</Text>

              <View className="flex-row gap-2 mb-4">
                <View className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg">
                  <Text className="text-xs font-medium text-slate-700">침 삼킬 때 통증</Text>
                </View>
                <View className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg">
                  <Text className="text-xs font-medium text-slate-700">미열</Text>
                </View>
              </View>

              <View className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <Text className="text-[10px] text-slate-400 mb-1 uppercase tracking-wider font-bold">Recommended Care</Text>
                <Text className="text-sm font-semibold text-slate-700 mt-1">인후염 소염제 B 및 충분한 수분 섭취</Text>
              </View>
            </View>

            <View className="pt-4 border-t border-slate-100">
              <View className="flex-row items-center gap-2 px-5 py-2.5 bg-blue-50 rounded-full w-auto self-start border border-blue-100 opacity-70">
                <MaterialIcons name="verified" size={14} color="#64748b" />
                <Text className="text-slate-500 text-xs font-bold">영수증 인증 완료</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Medical Disclaimer */}
        <View className="mt-8 mb-8 px-2">
          <View className="px-4 py-4 bg-rose-50 rounded-2xl border border-rose-100 flex-row items-start gap-3">
            <MaterialIcons name="error-outline" size={18} color="#e11d48" style={{ marginTop: 2 }} />
            <View className="flex-1">
              <Text className="text-xs leading-relaxed text-rose-800">
                본 서비스는 증상에 대한 <Text className="font-bold text-rose-900">참고용 정보</Text>를 제공하며, 실제 의사의 진단을 대신할 수 없습니다. 위급 상황 발생 시 즉시 <Text className="font-bold text-rose-900">119</Text> 또는 가까운 <Text className="font-bold text-rose-900">응급실</Text>을 방문하시기 바랍니다.
              </Text>
            </View>
          </View>
        </View>
      </Animated.ScrollView>

      {/* Coin Stack Animation Overlay */}
      {showCoinAnim && (
        <View style={[StyleSheet.absoluteFill, { justifyContent: 'center', alignItems: 'center', zIndex: 9999 }]} pointerEvents="none">
          {coinAnimValues.map((anim, i) => {
            const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [150, -250] });
            const opacity = anim.interpolate({ inputRange: [0, 0.1, 0.8, 1], outputRange: [0, 1, 1, 0] });
            const scale = anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.3, 1.2, 1] });
            const translateX = i % 2 === 0 ? i * 15 : -i * 15; // scatter slightly
            return (
              <Animated.View key={i} style={{ position: 'absolute', transform: [{ translateY }, { translateX }, { scale }], opacity }}>
                <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: '#fbbf24', borderWidth: 3, borderColor: '#f59e0b', justifyContent: 'center', alignItems: 'center', shadowColor: '#f59e0b', shadowOpacity: 0.6, shadowRadius: 15, elevation: 8 }}>
                  <Text style={{ color: '#fff', fontWeight: '900', fontSize: 22, textShadowColor: '#d97706', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 2 }}>P</Text>
                </View>
              </Animated.View>
            );
          })}
        </View>
      )}
    </View>
  );
}
