// CareOn Record – Glassmorphism UI
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useRef } from 'react';
import { Animated, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GlassCard from '../../components/GlassCard';
import TopBar from '../../components/TopBar';

type InsightItem = { label: string; value: number; color: string };

const InsightBar = ({ item }: { item: InsightItem }) => {
  const widthAnim = useRef(new Animated.Value(0)).current;
  useFocusEffect(useCallback(() => {
    widthAnim.setValue(0);
    Animated.timing(widthAnim, { toValue: item.value, duration: 800, useNativeDriver: false }).start();
  }, [item.value]));
  const animatedWidth = widthAnim.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] });
  return (
    <View style={{ marginBottom: 14 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
        <Text style={s.barLabel}>{item.label}</Text>
        <Text style={s.barValue}>{item.value}%</Text>
      </View>
      <View style={s.barTrack}>
        <Animated.View style={{ height: '100%', backgroundColor: item.color, width: animatedWidth, borderRadius: 999 }} />
      </View>
    </View>
  );
};

export default function Record() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const scale1 = useRef(new Animated.Value(1)).current;
  const scale2 = useRef(new Animated.Value(1)).current;

  useFocusEffect(useCallback(() => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: false });
  }, []));

  const pressIn = (s: Animated.Value) => Animated.spring(s, { toValue: 0.97, useNativeDriver: true }).start();
  const pressOut = (s: Animated.Value) => Animated.spring(s, { toValue: 1, useNativeDriver: true }).start();

  return (
    <View style={s.root}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <LinearGradient
        colors={['#fff0f5', '#efe5ff', '#e5f0ff', '#efe5ff']}
        locations={[0, 0.3, 0.7, 1]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill} />
      <TopBar scrollY={scrollY} />
      <Animated.ScrollView ref={scrollViewRef as any} style={{ backgroundColor: 'transparent' }}
        contentContainerStyle={{ paddingTop: insets.top + 82, paddingBottom: insets.bottom + 110, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}>

        {/* 헤더 */}
        <View style={{ marginBottom: 20 }}>
          <Text style={s.pageTitle}>오늘의 기록</Text>
          <Text style={s.pageSubtitle}>건강 데이터를 꾸준히 기록해보세요</Text>
        </View>

        {/* 식단 기록 카드 */}
        <Animated.View style={{ transform: [{ scale: scale1 }], marginBottom: 16 }}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => router.push('/diet')}
            onPressIn={() => pressIn(scale1)} onPressOut={() => pressOut(scale1)}>
            <GlassCard intensity={80} borderRadius={32} style={{ padding: 26, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.8)' }}>
              <LinearGradient colors={['rgba(37,99,235,0.08)', 'transparent']} style={StyleSheet.absoluteFill} />
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View style={{ zIndex: 10 }}>
                  <Text style={{ fontSize: 22, fontWeight: '800', color: '#1e293b', marginBottom: 6 }}>식단 기록</Text>
                  <Text style={{ fontSize: 14, color: '#64748b', marginBottom: 28, fontWeight: '500' }}>영양 밸런스를 관리하세요</Text>
                  
                  <View style={{ backgroundColor: '#2563eb', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 16, alignSelf: 'flex-start', shadowColor: '#2563eb', shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 }}>
                    <Text style={{ color: '#fff', fontWeight: '800', fontSize: 14 }}>기록 시작하기 →</Text>
                  </View>
                </View>

                <View style={{ width: 60, height: 60, borderRadius: 22, backgroundColor: '#eff6ff', alignItems: 'center', justifyContent: 'center', zIndex: 10, shadowColor: '#2563eb', shadowOpacity: 0.12, shadowRadius: 10, elevation: 3, borderWidth: 1, borderColor: 'rgba(255,255,255,0.9)' }}>
                  <MaterialIcons name="restaurant" size={28} color="#2563eb" />
                </View>
              </View>

              {/* 배경 큰 아이콘 */}
              <MaterialIcons name="restaurant" size={150} color="rgba(37,99,235,0.03)" style={{ position: 'absolute', right: -25, bottom: -25, zIndex: 0 }} />
            </GlassCard>
          </TouchableOpacity>
        </Animated.View>

        {/* 증상 기록 카드 */}
        <Animated.View style={{ transform: [{ scale: scale2 }], marginBottom: 24 }}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => router.push('/diagnosis-log')}
            onPressIn={() => pressIn(scale2)} onPressOut={() => pressOut(scale2)}>
            <GlassCard intensity={80} borderRadius={32} style={{ padding: 26, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.8)' }}>
              <LinearGradient colors={['rgba(16,185,129,0.08)', 'transparent']} style={StyleSheet.absoluteFill} />
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View style={{ zIndex: 10 }}>
                  <Text style={{ fontSize: 22, fontWeight: '800', color: '#1e293b', marginBottom: 6 }}>증상 기록</Text>
                  <Text style={{ fontSize: 14, color: '#64748b', marginBottom: 28, fontWeight: '500' }}>몸 상태를 체크하세요</Text>
                  
                  <View style={{ backgroundColor: '#10b981', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 16, alignSelf: 'flex-start', shadowColor: '#10b981', shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 }}>
                    <Text style={{ color: '#fff', fontWeight: '800', fontSize: 14 }}>기록 시작하기 →</Text>
                  </View>
                </View>

                <View style={{ width: 60, height: 60, borderRadius: 22, backgroundColor: '#ecfdf5', alignItems: 'center', justifyContent: 'center', zIndex: 10, shadowColor: '#10b981', shadowOpacity: 0.12, shadowRadius: 10, elevation: 3, borderWidth: 1, borderColor: 'rgba(255,255,255,0.9)' }}>
                  <MaterialIcons name="monitor-heart" size={28} color="#10b981" />
                </View>
              </View>

              {/* 배경 큰 아이콘 */}
              <MaterialIcons name="monitor-heart" size={150} color="rgba(16,185,129,0.03)" style={{ position: 'absolute', right: -25, bottom: -25, zIndex: 0 }} />
            </GlassCard>
          </TouchableOpacity>
        </Animated.View>

        {/* Wellness Insight */}
        <GlassCard style={{ padding: 22, marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <MaterialIcons name="auto-awesome" size={18} color="#2563eb" />
            <Text style={s.insightTitle}>Wellness Insight</Text>
          </View>
          {[{ label: '탄수화물', value: 54, color: '#f59e0b' },
            { label: '단백질', value: 56, color: '#3b82f6' },
            { label: '지방', value: 44, color: '#f43f5e' }]
            .map((item, i) => <InsightBar key={i} item={item} />)}
        </GlassCard>

        {/* 오늘의 미션 */}
        <Text style={[s.pageTitle, { marginBottom: 12 }]}>오늘의 기록 미션</Text>
        {[{ title: '수면 기록하기', icon: 'bedtime' as const, color: '#6366f1' },
          { title: '운동 기록하기', icon: 'fitness-center' as const, color: '#10b981' }]
          .map((item, i) => (
            <GlassCard key={i} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 18, marginBottom: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
                <View style={[s.missionIcon, { backgroundColor: item.color + '18' }]}>
                  <MaterialIcons name={item.icon} size={22} color={item.color} />
                </View>
                <View>
                  <Text style={s.missionTitle}>{item.title}</Text>
                  <Text style={s.missionPt}>+50P 적립</Text>
                </View>
              </View>
              <View style={s.missionBtn}><Text style={s.missionBtnText}>기록</Text></View>
            </GlassCard>
          ))}
      </Animated.ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  pageTitle: { fontSize: 22, fontWeight: '800', color: '#1e293b', letterSpacing: -0.4 },
  pageSubtitle: { fontSize: 14, color: '#64748b', marginTop: 4 },
  barLabel: { fontSize: 12, fontWeight: '700', color: '#475569' },
  barValue: { fontSize: 12, fontWeight: '700', color: '#1e293b' },
  barTrack: { height: 8, backgroundColor: 'rgba(226,232,240,0.6)', borderRadius: 999, overflow: 'hidden' },
  insightTitle: { fontSize: 16, fontWeight: '700', color: '#1e293b' },
  missionIcon: { width: 46, height: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  missionTitle: { fontSize: 14, fontWeight: '700', color: '#1e293b' },
  missionPt: { fontSize: 12, color: '#2563eb', fontWeight: '600', marginTop: 2 },
  missionBtn: { backgroundColor: '#2563eb', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  missionBtnText: { color: '#fff', fontWeight: '700' },
});