// CareOn Profile – Glassmorphism UI
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GlassCard from '../../components/GlassCard';
import TopBar from '../../components/TopBar';

export default function Profile() {
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const historyScrollRef = useRef<ScrollView>(null);
  const dayScrollRef = useRef<ScrollView>(null);

  const [isFlipped, setIsFlipped] = useState(false);
  const isFlippedRef = useRef(false);
  const flipAnim = useRef(new Animated.Value(0)).current;
  const currentAngle = useRef(0);
  const focusShineAnim = useRef(new Animated.Value(-600)).current;
  const blurTimeoutRef = useRef<any>(null);

  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);
  const dayScrollY = useRef(new Animated.Value(0)).current;
  const scrollTimeoutRef = useRef<any>(null);
  const isDraggingRef = useRef(false);

  const mockHistoryData = useMemo(() => {
    const data = {} as Record<number, Record<number, any[]>>;
    for (let m = 1; m <= 12; m++) {
      data[m] = {};
      for (let d = 1; d <= 31; d++) {
        const count = Math.floor(Math.random() * 3) + 1; // Always 1 to 3 activities
        data[m][d] = [];
        if (m === 4 && d === 25) {
          data[m][d] = [
            { id: '1', text: '주간 미션 달성', points: '+1,000', time: '08:30' },
            { id: '2', text: '증상 상세 기록', points: '+50', time: '12:00' },
            { id: '3', text: '연속 기록 보상', points: '+500', time: '19:10' }
          ];
        } else if (count > 0) {
          for (let i = 0; i < count; i++) {
            data[m][d].push({
              id: `${m}-${d}-${i}`,
              text: ['연속 기록 보상', '식단 기록 보상', '건강 퀴즈 정답', '수면 데이터 연동', '물 마시기 달성'][Math.floor(Math.random() * 5)],
              points: `+${[50, 100, 200, 300, 500][Math.floor(Math.random() * 5)]}`,
              time: `${Math.floor(Math.random() * 12 + 6).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`
            });
          }
        }
      }
    }
    return data;
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dayScrollRef.current?.scrollTo({ y: 24 * 40, animated: false });
    }, 100);
  }, []);

  useFocusEffect(useCallback(() => {
    if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);

    scrollViewRef.current?.scrollTo({ y: 0, animated: false });

    if (isFlippedRef.current) {
      currentAngle.current += 180;
      flipAnim.setValue(currentAngle.current);
      setIsFlipped(false);
      isFlippedRef.current = false;
    }

    focusShineAnim.setValue(-600);
    Animated.timing(focusShineAnim, {
      toValue: 600,
      duration: 1200,
      delay: 400,
      useNativeDriver: true,
    }).start();

    return () => {
      blurTimeoutRef.current = setTimeout(() => {
        if (isFlippedRef.current) {
          currentAngle.current += 180;
          flipAnim.setValue(currentAngle.current);
          setIsFlipped(false);
          isFlippedRef.current = false;
        }
        setIsMonthPickerOpen(false);
      }, 500);
    };
  }, [flipAnim, focusShineAnim]));

  const handleFlip = () => {
    if (!isFlippedRef.current) {
      const now = new Date();
      const m = now.getMonth() + 1;
      const d = now.getDate();
      setSelectedMonth(m);
      setSelectedDay(d);

      historyScrollRef.current?.scrollTo({ y: 0, animated: false });
      dayScrollRef.current?.scrollTo({ y: (d - 1) * 40, animated: false });
    }
    currentAngle.current += 180;
    Animated.spring(flipAnim, {
      toValue: currentAngle.current,
      friction: 10,
      tension: 14,
      useNativeDriver: true,
    }).start();
    setIsFlipped(!isFlippedRef.current);
    isFlippedRef.current = !isFlippedRef.current;
  };

  const moduloAnim = Animated.modulo(flipAnim, 360);

  const frontOpacity = moduloAnim.interpolate({ inputRange: [0, 89, 90, 269, 270, 360], outputRange: [1, 1, 0, 0, 1, 1], extrapolate: 'clamp' });
  const backOpacity = moduloAnim.interpolate({ inputRange: [0, 89, 90, 269, 270, 360], outputRange: [0, 0, 1, 1, 0, 0], extrapolate: 'clamp' });

  const frontAnimatedStyle = {
    opacity: frontOpacity,
    transform: [{ rotateY: flipAnim.interpolate({ inputRange: [0, 36000], outputRange: ['0deg', '36000deg'] }) }],
  };
  const backAnimatedStyle = {
    opacity: backOpacity,
    transform: [{ rotateY: flipAnim.interpolate({ inputRange: [0, 36000], outputRange: ['180deg', '36180deg'] }) }],
    position: 'absolute' as const, top: 0, left: 0, right: 0, bottom: 0,
  };

  const shineOpacity = moduloAnim.interpolate({
    inputRange: [0, 30, 150, 179, 180, 210, 330, 360],
    outputRange: [0, 1, 1, 0, 0, 1, 1, 0],
    extrapolate: 'clamp',
  });

  const shineTranslateX = moduloAnim.interpolate({
    inputRange: [0, 179, 180, 360],
    outputRange: [-500, 500, -500, 500],
  });

  const badges = [
    { label: 'Top Recorder', icon: 'military-tech' as const, color: '#10b981', bg: 'rgba(209,250,229,0.7)' },
    { label: 'Healthy Eater', icon: 'restaurant' as const, color: '#2563eb', bg: 'rgba(219,234,254,0.7)' },
    { label: 'Consistency', icon: 'bolt' as const, color: '#94a3b8', bg: 'rgba(226,232,240,0.5)', inactive: true },
  ];

  const settings = [
    { icon: 'person-outline' as const, label: '계정 정보' },
    { icon: 'notifications-none' as const, label: '알림 설정' },
    { icon: 'lock-outline' as const, label: '개인정보 보호' },
    { icon: 'help-outline' as const, label: '고객센터 / FAQ' },
  ];

  return (
    <View style={s.root}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <LinearGradient
        colors={['#fff0f5', '#efe5ff', '#e5f0ff', '#efe5ff']}
        locations={[0, 0.3, 0.7, 1]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill} />
      <TopBar rightIcon="settings" scrollY={scrollY} />

      <Animated.ScrollView ref={scrollViewRef as any} style={{ backgroundColor: 'transparent' }}
        contentContainerStyle={{ paddingTop: insets.top + 82, paddingBottom: insets.bottom + 110, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}>

        {/* 인삿말 */}
        <View style={s.welcomeRow}>
          <View style={{ flex: 1 }}>
            <Text style={s.welcomeText}>푸앙님,{'\n'}오늘도 건강한 하루를{'\n'}응원합니다.</Text>
          </View>
          <View style={s.profileImg}>
            <Image source={require('../../assets/images/puang.png')} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
          </View>
        </View>

        {/* 멤버십 카드 (포인트) */}
        <View style={[s.cardShadowWrapper, { perspective: 1000 } as any]}>
          {/* Front */}
          <Animated.View style={[frontAnimatedStyle, { backfaceVisibility: 'hidden' }]}>
            <LinearGradient colors={['#eef2ff', '#e0e7ff', '#c7d2fe']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={s.membershipCard}>
              {/* Top: Brand & History Btn */}
              <View style={s.cardTop}>
                <Text style={s.cardBrand}>CareOn</Text>
                <TouchableOpacity activeOpacity={0.7} style={s.historyBtn} onPress={handleFlip}>
                  <Text style={s.historyBtnText}>내역 확인</Text>
                  <MaterialIcons name="chevron-right" size={16} color="#64748b" />
                </TouchableOpacity>
              </View>

              {/* Middle: Balance */}
              <View style={s.cardMiddle}>
                <Text style={s.cardBalanceLabel}>나의 보유 포인트</Text>
                <View style={s.cardBalanceRow}>
                  <Text style={s.cardBalanceValue}>24,500</Text>
                  <Text style={s.cardBalanceUnit}>P</Text>
                </View>
              </View>

              {/* Bottom: Member Info & NFC */}
              <View style={s.cardBottom}>
                <View>
                  <Text style={s.cardMemberName}>푸앙</Text>
                </View>
                <MaterialCommunityIcons name="wifi" size={28} color="rgba(148,163,184,0.4)" style={{ transform: [{ rotate: '90deg' }] }} />
              </View>

              {/* Decoration */}
              <View style={s.cardDeco1} />
              <View style={s.cardDeco2} />

              {/* Holographic Shine */}
              <Animated.View style={{
                position: 'absolute', top: -50, bottom: -50, width: 140,
                opacity: shineOpacity,
                transform: [{ translateX: shineTranslateX }, { skewX: '-25deg' }],
                zIndex: 20, pointerEvents: 'none'
              }}>
                <LinearGradient
                  colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.7)', 'rgba(255,255,255,0)']}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  style={{ flex: 1 }}
                />
              </Animated.View>

              {/* Focus Shine */}
              <Animated.View style={{
                position: 'absolute', top: -50, bottom: -50, width: 140,
                transform: [{ translateX: focusShineAnim }, { skewX: '-25deg' }],
                zIndex: 20, pointerEvents: 'none'
              }}>
                <LinearGradient
                  colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.7)', 'rgba(255,255,255,0)']}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  style={{ flex: 1 }}
                />
              </Animated.View>
            </LinearGradient>
          </Animated.View>

          {/* Back */}
          <Animated.View style={[backAnimatedStyle, { backfaceVisibility: 'hidden' }]}>
            <LinearGradient colors={['#f8fafc', '#f1f5f9', '#e2e8f0']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={s.membershipCard}>
              <View style={s.cardTop}>
                <TouchableOpacity activeOpacity={0.7} style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => setIsMonthPickerOpen(!isMonthPickerOpen)}>
                  <Text style={[s.cardBrand, { fontSize: 16, color: '#475569', marginRight: 4 }]}>{selectedMonth}월 내역</Text>
                  <MaterialIcons name={isMonthPickerOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={20} color="#475569" />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={s.historyBtn} onPress={() => { setIsMonthPickerOpen(false); handleFlip(); }}>
                  <Text style={s.historyBtnText}>돌아가기</Text>
                  <MaterialIcons name="close" size={16} color="#64748b" />
                </TouchableOpacity>
              </View>

              {/* Month Picker View */}
              <View style={{ flex: 1, marginTop: 16, justifyContent: 'center', display: isMonthPickerOpen ? 'flex' : 'none' }}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', rowGap: 14 }}>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <View key={m} style={{ width: '25%', alignItems: 'center' }}>
                      <TouchableOpacity activeOpacity={0.7} onPress={() => { setSelectedMonth(m); setIsMonthPickerOpen(false); }}
                        style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: selectedMonth === m ? '#2563eb' : 'rgba(203,213,225,0.3)', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: '800', color: selectedMonth === m ? '#ffffff' : '#475569' }}>{m}</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>

              {/* Day Picker & Content View */}
              <View style={{ flex: 1, flexDirection: 'row', marginTop: 16, display: isMonthPickerOpen ? 'none' : 'flex' }}>
                {/* Left: Day Wheel Picker */}
                <View style={{ width: 60, height: '100%', borderRightWidth: 1, borderRightColor: 'rgba(203,213,225,0.4)', alignItems: 'center', justifyContent: 'center' }}>
                  <View style={{ height: 200, width: '100%', alignItems: 'center' }}>
                    {/* Fixed Center Highlight Circle */}
                    <View style={{ position: 'absolute', top: 83, left: 13, width: 34, height: 34, borderRadius: 17, backgroundColor: '#2563eb' }} pointerEvents="none" />

                    <Animated.ScrollView
                      ref={dayScrollRef}
                      style={{ height: 200, width: '100%' }}
                      contentContainerStyle={{ alignItems: 'center' }}
                      showsVerticalScrollIndicator={false}
                      snapToInterval={40}
                      snapToAlignment="start"
                      decelerationRate="normal"
                      onScrollBeginDrag={() => { isDraggingRef.current = true; }}
                      onScrollEndDrag={(e) => {
                        isDraggingRef.current = false;
                        const y = e.nativeEvent.contentOffset.y;
                        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
                        scrollTimeoutRef.current = setTimeout(() => {
                          const idx = Math.round(y / 40);
                          setSelectedDay(idx + 1);
                          dayScrollRef.current?.scrollTo({ y: idx * 40, animated: true });
                        }, 80);
                      }}
                      onMomentumScrollEnd={(e) => {
                        const y = e.nativeEvent.contentOffset.y;
                        const idx = Math.round(y / 40);
                        setSelectedDay(idx + 1);
                        dayScrollRef.current?.scrollTo({ y: idx * 40, animated: true });
                      }}
                      onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: dayScrollY } } }],
                        {
                          useNativeDriver: false,
                          listener: (e: any) => {
                            const y = e.nativeEvent.contentOffset.y;
                            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
                            scrollTimeoutRef.current = setTimeout(() => {
                              if (!isDraggingRef.current) {
                                const idx = Math.round(y / 40);
                                setSelectedDay(idx + 1);
                                dayScrollRef.current?.scrollTo({ y: idx * 40, animated: true });
                              }
                            }, 80);
                          }
                        }
                      )}
                      scrollEventThrottle={16}
                    >
                      {[null, null, ...Array.from({ length: 31 }, (_, i) => i + 1), null, null].map((d, i) => {
                        if (d === null) return <View key={`dummy-${i}`} style={{ height: 40 }} />;

                        const index = d - 1;
                        const inputRange = [(index - 2) * 40, (index - 1) * 40, index * 40, (index + 1) * 40, (index + 2) * 40];
                        const scale = dayScrollY.interpolate({ inputRange, outputRange: [0.6, 0.8, 1.25, 0.8, 0.6], extrapolate: 'clamp' });
                        const opacity = dayScrollY.interpolate({ inputRange, outputRange: [0.2, 0.5, 1, 0.5, 0.2], extrapolate: 'clamp' });
                        const color = dayScrollY.interpolate({ inputRange, outputRange: ['#94a3b8', '#64748b', '#ffffff', '#64748b', '#94a3b8'], extrapolate: 'clamp' });

                        return (
                          <Animated.View key={d} style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center', transform: [{ scale }], opacity }}>
                            <Animated.Text style={{ fontSize: 14, fontWeight: '800', color }}>{d}</Animated.Text>
                          </Animated.View>
                        );
                      })}
                    </Animated.ScrollView>
                  </View>
                </View>

                {/* Right: History List */}
                <ScrollView ref={historyScrollRef} style={{ flex: 1, paddingLeft: 14 }} showsVerticalScrollIndicator={true} indicatorStyle="black" contentContainerStyle={{ paddingBottom: 20 }}>
                  {mockHistoryData[selectedMonth]?.[selectedDay]?.length > 0 ? (
                    mockHistoryData[selectedMonth][selectedDay].map((item) => (
                      <View key={item.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(203,213,225,0.4)', paddingRight: 10 }}>
                        <View>
                          <Text style={{ fontSize: 13, fontWeight: '700', color: '#334155', marginBottom: 2 }}>{item.text}</Text>
                          <Text style={{ fontSize: 10, color: '#94a3b8' }}>{item.time}</Text>
                        </View>
                        <Text style={{ fontSize: 14, fontWeight: '800', color: '#2563eb' }}>{item.points}</Text>
                      </View>
                    ))
                  ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
                      <Text style={{ fontSize: 13, color: '#94a3b8', fontWeight: '600' }}>이 날의 내역이 없습니다.</Text>
                    </View>
                  )}
                </ScrollView>
              </View>
            </LinearGradient>
          </Animated.View>
        </View>

        {/* 헬스 뱃지 */}
        <GlassCard style={{ padding: 20, marginBottom: 14 }}>
          <Text style={s.sectionLabel}>획득한 헬스 뱃지</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 14 }}>
            {badges.map((b, i) => (
              <TouchableOpacity key={i} activeOpacity={0.8} style={{ alignItems: 'center', gap: 8, opacity: b.inactive ? 0.4 : 1 }}>
                <View style={[s.badgeBox, { backgroundColor: b.bg }]}>
                  <MaterialIcons name={b.icon} size={26} color={b.color} />
                </View>
                <Text style={s.badgeLabel}>{b.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </GlassCard>

        {/* 주간 레포트 */}
        <GlassCard style={{ padding: 22, marginBottom: 14 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <Text style={s.cardTitle}>주간 레포트 프리뷰</Text>
            <TouchableOpacity><Text style={{ fontSize: 13, color: '#2563eb', fontWeight: '700' }}>전체 보기</Text></TouchableOpacity>
          </View>
          {/* 막대 차트 */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 100, marginBottom: 16 }}>
            {[
              { day: '월', h: 64 }, { day: '화', h: 80 }, { day: '수', h: 56 },
              { day: '목', h: 100, active: true }, { day: '금', h: 88 }, { day: '토', h: 72 }, { day: '일', h: 48 }
            ].map((item, i) => (
              <View key={i} style={{ alignItems: 'center', gap: 4 }}>
                <View style={[s.bar, { height: item.h, backgroundColor: item.active ? '#2563eb' : 'rgba(203,213,225,0.6)' }]} />
                <Text style={[s.barDay, { color: item.active ? '#2563eb' : '#94a3b8', fontWeight: item.active ? '700' : '500' }]}>{item.day}</Text>
              </View>
            ))}
          </View>
          <View style={s.insightBox}>
            <View style={s.insightIcon}>
              <MaterialIcons name="auto-awesome" size={18} color="#10b981" />
            </View>
            <Text style={s.insightText}>이번 주 수면의 질이 지난주보다 <Text style={{ fontWeight: '800', color: '#10b981' }}>15%</Text> 향상되었어요!</Text>
          </View>
        </GlassCard>

        {/* 활동 통계 */}
        <Text style={[s.cardTitle, { marginBottom: 10 }]}>활동 통계</Text>
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
          <GlassCard style={{ flex: 1, padding: 18 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <MaterialIcons name="edit-calendar" size={26} color="#2563eb" />
              <Text style={s.statNum}>156회</Text>
            </View>
            <Text style={s.statLabel}>누적 기록 횟수</Text>
            <View style={s.statTrack}><View style={[s.statFill, { width: '78%', backgroundColor: '#2563eb' }]} /></View>
            <Text style={s.statSub}>목표 200회까지 44회 남음</Text>
          </GlassCard>
          <GlassCard style={{ flex: 1, padding: 18 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <MaterialIcons name="local-fire-department" size={26} color="#ef4444" />
              <Text style={[s.statNum, { color: '#ef4444' }]}>12일</Text>
            </View>
            <Text style={s.statLabel}>연속 기록 일수</Text>
            <View style={s.statTrack}><View style={[s.statFill, { width: '60%', backgroundColor: '#ef4444' }]} /></View>
            <Text style={s.statSub}>최고 기록: 21일</Text>
          </GlassCard>
        </View>

        {/* 환경설정 */}
        <Text style={s.sectionLabel}>환경설정</Text>
        <GlassCard style={{ marginBottom: 16, marginTop: 10 }}>
          {settings.map((item, i) => (
            <TouchableOpacity key={i} activeOpacity={0.7}
              style={[s.settingRow, i < settings.length - 1 && { borderBottomWidth: 1, borderBottomColor: 'rgba(226,232,240,0.5)' }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
                <MaterialIcons name={item.icon} size={20} color="#94a3b8" />
                <Text style={s.settingLabel}>{item.label}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color="#cbd5e1" />
            </TouchableOpacity>
          ))}
        </GlassCard>

        <TouchableOpacity style={{ alignItems: 'center', paddingVertical: 8 }}>
          <Text style={{ fontSize: 13, fontWeight: '700', color: '#94a3b8' }}>로그아웃</Text>
        </TouchableOpacity>
      </Animated.ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  welcomeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20, marginTop: 4 },
  welcomeText: { fontSize: 22, fontWeight: '800', color: '#1e293b', lineHeight: 32, letterSpacing: -0.4 },
  profileImg: { width: 64, height: 64, borderRadius: 32, overflow: 'hidden', borderWidth: 2, borderColor: 'rgba(255,255,255,0.8)' },
  cardShadowWrapper: { borderRadius: 20, marginBottom: 20, shadowColor: '#94a3b8', shadowOpacity: 0.15, shadowRadius: 16, shadowOffset: { width: 0, height: 8 }, elevation: 4 },
  membershipCard: { padding: 24, borderRadius: 20, overflow: 'hidden', aspectRatio: 1.58, justifyContent: 'space-between', borderWidth: 1, borderColor: 'rgba(255,255,255,0.6)' },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 },
  cardBrand: { fontSize: 22, fontWeight: '900', color: '#2563eb', fontStyle: 'italic', letterSpacing: 0.5 },
  historyBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.6)', paddingLeft: 14, paddingRight: 8, paddingVertical: 6, borderRadius: 99 },
  historyBtnText: { fontSize: 12, color: '#475569', fontWeight: '700', marginRight: 2 },
  cardMiddle: { marginVertical: 20, zIndex: 10 },
  cardBalanceLabel: { fontSize: 12, color: '#64748b', fontWeight: '700', marginBottom: 4 },
  cardBalanceRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 4 },
  cardBalanceValue: { fontSize: 36, fontWeight: '900', color: '#1e293b', letterSpacing: -1 },
  cardBalanceUnit: { fontSize: 20, fontWeight: '800', color: '#2563eb', marginBottom: 5 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 10 },
  cardMemberName: { fontSize: 16, color: '#334155', fontWeight: '800', letterSpacing: 1 },
  cardDeco1: { position: 'absolute', width: 280, height: 280, borderRadius: 140, backgroundColor: 'rgba(255,255,255,0.4)', top: -80, right: -80 },
  cardDeco2: { position: 'absolute', width: 160, height: 160, borderRadius: 80, backgroundColor: 'rgba(255,255,255,0.6)', bottom: -60, left: -40 },
  sectionLabel: { fontSize: 11, fontWeight: '800', color: '#94a3b8', letterSpacing: 1.5, textTransform: 'uppercase' },
  cardTitle: { fontSize: 17, fontWeight: '800', color: '#1e293b', letterSpacing: -0.3 },
  badgeBox: { width: 52, height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  badgeLabel: { fontSize: 10, fontWeight: '700', color: '#475569' },
  bar: { width: 10, borderRadius: 5 },
  barDay: { fontSize: 10 },
  insightBox: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: 'rgba(209,250,229,0.5)', padding: 14, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(167,243,208,0.4)' },
  insightIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.7)', alignItems: 'center', justifyContent: 'center' },
  insightText: { flex: 1, fontSize: 13, fontWeight: '600', color: '#1e293b' },
  statNum: { fontSize: 22, fontWeight: '900', color: '#2563eb' },
  statLabel: { fontSize: 13, fontWeight: '700', color: '#1e293b', marginBottom: 8 },
  statTrack: { height: 6, backgroundColor: 'rgba(226,232,240,0.6)', borderRadius: 99, overflow: 'hidden', marginBottom: 6 },
  statFill: { height: '100%', borderRadius: 99 },
  statSub: { fontSize: 10, color: '#94a3b8' },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16 },
  settingLabel: { fontSize: 15, fontWeight: '600', color: '#1e293b' },
});