// CareOn Home – HTML 시안 기반 완전 재구현
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import {
  Animated, Platform, ScrollView, StatusBar,
  StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Defs, Stop, LinearGradient as SvgGradient, RadialGradient as SvgRadialGradient } from 'react-native-svg';
import TopBar from '../../components/TopBar';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// ── 글라스 카드 컴포넌트 ──
const GlassCard = ({
  children, style, intensity = 50, borderRadius = 28
}: {
  children: React.ReactNode; style?: object; intensity?: number; borderRadius?: number;
}) => {
  if (Platform.OS === 'android') {
    return (
      <View style={[{
        backgroundColor: 'rgba(255,255,255,0.60)',
        borderRadius,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.4)',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 20,
        elevation: 4,
      }, style]}>
        {children}
      </View>
    );
  }
  return (
    <BlurView intensity={intensity} tint="light" style={[{
      borderRadius,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.4)',
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowOffset: { width: 0, height: 8 },
      shadowRadius: 20,
      elevation: 4,
    }, style]}>
      {children}
    </BlurView>
  );
};

// ── 영양 막대 (액체 튜브 스타일) ──
type NutriItem = { label: string; value: number; fromColor: string; toColor: string; trackH: number };

const LiquidBar = ({ item }: { item: NutriItem }) => {
  const heightAnim = useRef(new Animated.Value(0)).current;

  useFocusEffect(useCallback(() => {
    heightAnim.setValue(0);
    Animated.timing(heightAnim, { toValue: item.value, duration: 900, useNativeDriver: false }).start();
  }, [item.value]));

  const fillHeight = heightAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%']
  });

  return (
    <View style={s.nutriCol}>
      <Text style={s.nutriPct}>{item.value}%</Text>
      {/* 튜브 컨테이너 */}
      <View style={[s.tubeOuter, { height: item.trackH }]}>
        <View style={s.tubeInner}>
          <Animated.View style={{ height: fillHeight, width: '100%', position: 'absolute', bottom: 0 }}>
            <LinearGradient
              colors={[item.fromColor, item.toColor]}
              start={{ x: 0.5, y: 1 }}
              end={{ x: 0.5, y: 0 }}
              style={{ flex: 1, borderRadius: 999 }}
            />
          </Animated.View>
        </View>
      </View>
      <Text style={s.nutriLbl}>{item.label}</Text>
    </View>
  );
};

// ── 활동 아이템 ──
type ActivityEntry = {
  icon: string; iconFamily: 'material' | 'community';
  iconColor: string; title: string; subtitle: string; time: string;
};

const ActivityItem = ({ entry, isLast }: { entry: ActivityEntry; isLast: boolean }) => (
  <View style={s.actRow}>
    {/* 아이콘 + 타임라인 선 */}
    <View style={s.actLeft}>
      <View style={s.actIconCircle}>
        {entry.iconFamily === 'community'
          ? <MaterialCommunityIcons name={entry.icon as any} size={20} color={entry.iconColor} />
          : <MaterialIcons name={entry.icon as any} size={20} color={entry.iconColor} />}
      </View>
      {!isLast && <View style={s.actLine} />}
    </View>
    {/* 내용 카드 */}
    <View style={s.actCard}>
      <View style={s.actCardHeader}>
        <Text style={s.actTitle}>{entry.title}</Text>
        <View style={s.actTimePill}>
          <Text style={s.actTimeText}>{entry.time}</Text>
        </View>
      </View>
      <Text style={s.actSub}>{entry.subtitle}</Text>
    </View>
  </View>
);

// ── 메인 ──
export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView>(null);
  const [score, setScore] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;

  useFocusEffect(useCallback(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
    setScore(0);
    progress.setValue(0);
    let i = 0;
    const t = setInterval(() => { i++; setScore(i); if (i >= 85) clearInterval(t); }, 12);
    Animated.timing(progress, { toValue: 1, duration: 1200, useNativeDriver: false }).start();
    return () => clearInterval(t);
  }, [progress]));

  const strokeDashoffset = progress.interpolate({ inputRange: [0, 1], outputRange: [578.05, 86.7] });

  const nutriItems: NutriItem[] = [
    { label: '탄수화물', value: 45, fromColor: '#f59e0b', toColor: '#fcd34d', trackH: 96 },
    { label: '단백질', value: 35, fromColor: '#2563eb', toColor: '#60a5fa', trackH: 96 },
    { label: '지방', value: 20, fromColor: '#f43f5e', toColor: '#fda4af', trackH: 96 },
  ];

  const activities: ActivityEntry[] = [
    { icon: 'directions-walk', iconFamily: 'material', iconColor: '#2563eb', title: '오전 산책', subtitle: '35분간 유산소 운동', time: '08:30 AM' },
    { icon: 'pill', iconFamily: 'community', iconColor: '#00614b', title: '영양제 섭취', subtitle: '멀티비타민 및 오메가3', time: '09:15 AM' },
    { icon: 'weather-night', iconFamily: 'community', iconColor: '#6366f1', title: '수면 데이터', subtitle: '6시간 45분 숙면', time: '07:00 AM' },
  ];

  return (
    <View style={s.root}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* 배경: 부드러운 LinearGradient */}
      <LinearGradient
        colors={['#fff0f5', '#efe5ff', '#e5f0ff', '#efe5ff']}
        locations={[0, 0.3, 0.7, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <TopBar scrollY={scrollY} />

      <Animated.ScrollView
        ref={scrollRef as any}
        style={{ backgroundColor: 'transparent' }}
        contentContainerStyle={{ paddingTop: insets.top + 82, paddingBottom: insets.bottom + 110, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
      >
        {/* ── HERO ── */}
        <GlassCard intensity={45} borderRadius={32} style={s.heroCard}>
          {/* 내부 광택 */}
          <LinearGradient colors={['rgba(255,255,255,0.5)', 'transparent']} style={StyleSheet.absoluteFill} />
          <Text style={s.heroGreeting}>선우님, 오늘 컨디션은 최고예요!</Text>

          {/* 점수 링 */}
          <View style={s.ringWrapper}>
            {/* SVG 링 */}
            <Svg width={220} height={220} viewBox="0 0 224 224" style={{ transform: [{ rotate: '-90deg' }], position: 'absolute' }}>
              <Defs>
                <SvgGradient id="gr" x1="0%" y1="0%" x2="100%" y2="100%">
                  <Stop offset="0%" stopColor="#34d399" />
                  <Stop offset="100%" stopColor="#059669" />
                </SvgGradient>
              </Defs>

              {/* 깔끔한 반투명 트랙 */}
              <Circle cx="112" cy="112" r="92" stroke="rgba(255,255,255,0.6)" strokeWidth="16" fill="none" />

              {/* 진행 바 */}
              <AnimatedCircle cx="112" cy="112" r="92" stroke="url(#gr)" strokeWidth="16"
                fill="none" strokeDasharray="578.05" strokeDashoffset={strokeDashoffset} strokeLinecap="round" />
            </Svg>

            {/* 중앙 frosted 원 */}
            <BlurView intensity={80} tint="light" style={s.scoreCenter}>
              <Text style={s.scoreNum}>{score}</Text>
              <Text style={s.scoreLabel}>GREAT</Text>
            </BlurView>
          </View>

          {/* 배지 */}
          <View style={s.badge}>
            <MaterialCommunityIcons name="trending-up" size={15} color="#00614b" />
            <Text style={s.badgeText}> 어제보다 +3점 상승</Text>
          </View>
        </GlassCard>

        {/* ── 퀵 액션 ── */}
        <View style={s.quickRow}>
          <TouchableOpacity style={{ flex: 1 }} activeOpacity={0.85} onPress={() => router.push('/diet')}>
            <GlassCard intensity={50} borderRadius={28} style={s.quickCard}>
              <View style={[s.quickIconBox, { backgroundColor: 'rgba(254,237,213,0.8)' }]}>
                <Text style={{ fontSize: 28 }}>🥗</Text>
              </View>
              <View style={{ marginTop: 12 }}>
                <Text style={s.quickTitle}>식단 기록</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                  <Text style={[s.quickSub, { color: '#ea580c' }]}>기록하기</Text>
                  <MaterialIcons name="arrow-forward" size={13} color="#ea580c" />
                </View>
              </View>
            </GlassCard>
          </TouchableOpacity>

          <View style={{ width: 14 }} />

          <TouchableOpacity style={{ flex: 1, marginTop: 14 }} activeOpacity={0.85} onPress={() => router.push('/diagnosis-analysis')}>
            <GlassCard intensity={50} borderRadius={28} style={s.quickCard}>
              <View style={[s.quickIconBox, { backgroundColor: 'rgba(219,234,254,0.8)' }]}>
                <Text style={{ fontSize: 28 }}>💊</Text>
              </View>
              <View style={{ marginTop: 12 }}>
                <Text style={s.quickTitle}>증상 체크</Text>
                <View style={s.quickBadge}>
                  <Text style={s.quickBadgeText}>최근 2일 전</Text>
                </View>
              </View>
            </GlassCard>
          </TouchableOpacity>
        </View>

        {/* ── Wellness Insight ── */}
        <GlassCard intensity={30} borderRadius={32} style={s.insightCard}>
          {/* 우상단 장식 */}
          <View style={s.insightCornerBg} />
          <MaterialCommunityIcons name="auto-fix" size={32} color="rgba(0,74,198,0.15)" style={s.insightCornerIcon} />

          {/* 헤더 태그 */}
          <View style={s.insightTagRow}>
            <BlurView intensity={30} tint="light" style={s.insightTagPill}>
              <MaterialCommunityIcons name="chart-line-variant" size={14} color="#004ac6" />
              <Text style={s.insightTagText}>Wellness Insight</Text>
            </BlurView>
          </View>

          <Text style={s.insightHeadline}>영양 균형이{'\n'}매우 안정적입니다</Text>

          {/* 액체 튜브 막대 */}
          <View style={s.nutriRow}>
            {nutriItems.map((item, i) => <LiquidBar key={i} item={item} />)}
          </View>

          {/* 설명 박스 */}
          <BlurView intensity={40} tint="light" style={s.insightNoteBox}>
            <Text style={s.insightNoteText}>
              단백질 섭취량이 목표 대비 <Text style={{ fontWeight: '800', color: '#2563eb' }}>12%</Text> 높습니다.{' '}
              현재의 균형 잡힌 식단을 유지하세요.
            </Text>
          </BlurView>
        </GlassCard>

        {/* ── 오늘의 활동 ── */}
        <GlassCard intensity={50} borderRadius={32} style={s.timelineCard}>
          <View style={s.timelineHeader}>
            <Text style={s.sectionTitle}>오늘의 활동</Text>
            <TouchableOpacity style={s.seeAllBtn}>
              <Text style={s.seeAllText}>전체보기</Text>
            </TouchableOpacity>
          </View>
          <View>
            {activities.map((entry, idx) => (
              <ActivityItem key={idx} entry={entry} isLast={idx === activities.length - 1} />
            ))}
          </View>
        </GlassCard>
      </Animated.ScrollView>

      {/* FAB */}
      <View style={[s.fab, { bottom: insets.bottom + 90 }]}>
        <TouchableOpacity activeOpacity={0.88}>
          <LinearGradient colors={['#60a5fa', '#2563eb']} style={s.fabGrad}>
            <MaterialIcons name="add" size={28} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },

  blob: { position: 'absolute', borderRadius: 999 },

  // HERO
  heroCard: { marginBottom: 16, padding: 28, alignItems: 'center' },
  heroGreeting: { fontSize: 16, fontWeight: '700', color: '#1e293b', marginBottom: 24, textAlign: 'center' },

  ringWrapper: { width: 220, height: 220, alignItems: 'center', justifyContent: 'center', marginBottom: 22 },
  
  scoreCenter: { width: 140, height: 140, borderRadius: 70, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.9)', overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 10, elevation: 2 },
  scoreNum: { fontSize: 56, fontWeight: '900', color: '#1e293b', letterSpacing: -2 },
  scoreLabel: { fontSize: 13, fontWeight: '800', color: '#059669', letterSpacing: 2, marginTop: 2 },

  badge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 999, paddingHorizontal: 18, paddingVertical: 9, borderWidth: 1, borderColor: 'rgba(255,255,255,0.6)', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  badgeText: { fontSize: 13, fontWeight: '800', color: '#059669' },

  // QUICK
  quickRow: { flexDirection: 'row', marginBottom: 16 },
  quickCard: { padding: 22 },
  quickIconBox: { width: 54, height: 54, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  quickTitle: { fontSize: 16, fontWeight: '800', color: '#1e293b' },
  quickSub: { fontSize: 12, fontWeight: '700' },
  quickBadge: { marginTop: 4, backgroundColor: 'rgba(255,255,255,0.6)', alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2 },
  quickBadgeText: { fontSize: 11, fontWeight: '600', color: '#64748b' },

  // INSIGHT
  insightCard: { marginBottom: 16, padding: 26 },
  insightCornerBg: { position: 'absolute', top: 0, right: 0, width: 120, height: 120, borderBottomLeftRadius: 120, backgroundColor: 'rgba(0,74,198,0.05)' },
  insightCornerIcon: { position: 'absolute', top: 22, right: 22 },
  insightTagRow: { marginBottom: 14 },
  insightTagPill: { flexDirection: 'row', alignItems: 'center', gap: 5, alignSelf: 'flex-start', borderRadius: 999, overflow: 'hidden', paddingHorizontal: 12, paddingVertical: 7, borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)' },
  insightTagText: { fontSize: 13, fontWeight: '700', color: '#004ac6' },
  insightHeadline: { fontSize: 22, fontWeight: '900', color: '#1e293b', lineHeight: 32, marginBottom: 20, letterSpacing: -0.5 },

  nutriRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', paddingBottom: 16, marginBottom: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(148,163,184,0.25)' },
  nutriCol: { alignItems: 'center', gap: 6 },
  nutriPct: { fontSize: 14, fontWeight: '900', color: '#1e293b' },
  tubeOuter: { width: 32, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.6)', padding: 4, borderWidth: 1, borderColor: 'rgba(255,255,255,0.7)', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 },
  tubeInner: { flex: 1, borderRadius: 999, overflow: 'hidden', position: 'relative' },
  nutriLbl: { fontSize: 10, fontWeight: '500', color: '#94a3b8' },

  insightNoteBox: { borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.6)', padding: 14 },
  insightNoteText: { fontSize: 13, fontWeight: '500', color: '#475569', lineHeight: 20 },

  // TIMELINE
  timelineCard: { padding: 22 },
  timelineHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitle: { fontSize: 19, fontWeight: '800', color: '#1e293b', letterSpacing: -0.4 },
  seeAllBtn: { backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 999, paddingHorizontal: 16, paddingVertical: 7, borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)' },
  seeAllText: { fontSize: 12, fontWeight: '700', color: '#2563eb' },

  actRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  actLeft: { width: 44, alignItems: 'center' },
  actIconCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 3, borderWidth: 1, borderColor: '#f1f5f9' },
  actLine: { width: 2, flex: 1, minHeight: 20, backgroundColor: 'rgba(0,74,198,0.15)', marginTop: 4, borderRadius: 1 },
  actCard: { flex: 1, backgroundColor: 'rgba(255,255,255,0.55)', borderRadius: 18, padding: 14, marginLeft: 10, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.7)' },
  actCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  actTitle: { fontSize: 13, fontWeight: '700', color: '#1e293b' },
  actTimePill: { backgroundColor: '#ffffff', borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  actTimeText: { fontSize: 10, fontWeight: '700', color: '#64748b' },
  actSub: { fontSize: 12, color: '#475569', fontWeight: '500' },

  // FAB
  fab: { position: 'absolute', right: 22 },
  fabGrad: { width: 54, height: 54, borderRadius: 27, alignItems: 'center', justifyContent: 'center', shadowColor: '#2563eb', shadowOpacity: 0.55, shadowOffset: { width: 0, height: 8 }, shadowRadius: 20, elevation: 10, borderWidth: 1, borderColor: 'rgba(147,197,253,0.5)' },
});