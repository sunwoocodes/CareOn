// CareOn Profile – Glassmorphism UI
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useRef } from 'react';
import { Animated, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GlassCard from '../../components/GlassCard';
import TopBar from '../../components/TopBar';

export default function Profile() {
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  useFocusEffect(useCallback(() => { scrollViewRef.current?.scrollTo({ y: 0, animated: false }); }, []));

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
            <Text style={s.welcomeText}>선우님,{'\n'}오늘도 건강한 하루를{'\n'}응원합니다.</Text>
          </View>
          <View style={s.profileImg}>
            <Image source={{ uri: 'https://i.pravatar.cc/150?img=7' }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
          </View>
        </View>

        {/* 포인트 카드 */}
        <LinearGradient colors={['#4f8ef7', '#2563eb']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={s.pointCard}>
          <View>
            <Text style={s.pointLabel}>나의 리워드 포인트</Text>
            <Text style={s.pointValue}>24,500 P</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 16 }}>
            <TouchableOpacity style={s.pointBtn}><Text style={s.pointBtnText}>상세보기</Text></TouchableOpacity>
            <MaterialIcons name="account-balance-wallet" size={24} color="rgba(255,255,255,0.5)" />
          </View>
          <View style={s.pointDeco1} />
          <View style={s.pointDeco2} />
        </LinearGradient>

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
          <GlassCard style={{ flex: 1, padding: 18, marginTop: 14 }}>
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
  pointCard: { borderRadius: 28, padding: 22, marginBottom: 14, overflow: 'hidden' },
  pointLabel: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 4 },
  pointValue: { fontSize: 34, fontWeight: '900', color: '#fff', letterSpacing: -1 },
  pointBtn: { borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)', backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 99 },
  pointBtnText: { fontSize: 13, color: '#fff', fontWeight: '600' },
  pointDeco1: { position: 'absolute', width: 180, height: 180, borderRadius: 90, backgroundColor: 'rgba(255,255,255,0.08)', top: -50, right: -40 },
  pointDeco2: { position: 'absolute', width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(255,255,255,0.06)', bottom: -30, left: -20 },
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