// CareOn Record – Glassmorphism UI
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { Animated, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, KeyboardAvoidingView } from 'react-native';
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

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMission, setSelectedMission] = useState<any>(null);
  const [inputValue, setInputValue] = useState('');

  const [completedMissions, setCompletedMissions] = useState<string[]>([]);
  const [showCoinAnim, setShowCoinAnim] = useState(false);
  const coinAnimValues = useRef([...Array(6)].map(() => new Animated.Value(0))).current;

  const triggerCoinAnimation = () => {
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
          .map((item, i) => {
            const isCompleted = completedMissions.includes(item.title);
            return (
            <GlassCard key={i} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 18, marginBottom: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
                <View style={[s.missionIcon, { backgroundColor: isCompleted ? '#f1f5f9' : item.color + '18' }]}>
                  <MaterialIcons name={item.icon} size={22} color={isCompleted ? '#94a3b8' : item.color} />
                </View>
                <View>
                  <Text style={[s.missionTitle, isCompleted && { color: '#94a3b8', textDecorationLine: 'line-through' }]}>{item.title}</Text>
                  <Text style={[s.missionPt, isCompleted && { color: '#94a3b8' }]}>{isCompleted ? '+50P 적립 완료' : '+50P 적립'}</Text>
                </View>
              </View>
              <TouchableOpacity activeOpacity={0.7} disabled={isCompleted} style={[s.missionBtn, isCompleted && { backgroundColor: '#e2e8f0' }]} onPress={() => {
                setSelectedMission(item);
                setInputValue('');
                setModalVisible(true);
              }}>
                <Text style={[s.missionBtnText, isCompleted && { color: '#94a3b8' }]}>{isCompleted ? '완료' : '기록'}</Text>
              </TouchableOpacity>
            </GlassCard>
            )
          })}
      </Animated.ScrollView>

      {/* Quick Logging Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.4)', justifyContent: 'center', padding: 24 }}>
            {/* Background Blur */}
            <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
            
            <GlassCard intensity={100} borderRadius={28} style={{ padding: 24, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.9)' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                <View style={[s.missionIcon, { backgroundColor: selectedMission?.color + '18', marginRight: 12 }]}>
                  <MaterialIcons name={selectedMission?.icon} size={24} color={selectedMission?.color} />
                </View>
                <View>
                  <Text style={{ fontSize: 20, fontWeight: '800', color: '#1e293b' }}>{selectedMission?.title}</Text>
                  <Text style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>간단하게 수치를 기록하세요</Text>
                </View>
              </View>

              <View style={{ backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 16, padding: 4, marginBottom: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.8)' }}>
                <TextInput
                  value={inputValue}
                  onChangeText={setInputValue}
                  placeholder={selectedMission?.title === '수면 기록하기' ? "예: 7시간 30분" : "예: 달리기 30분"}
                  placeholderTextColor="#94a3b8"
                  style={{ paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, color: '#1e293b', fontWeight: '600' }}
                  autoFocus
                />
              </View>

              <View style={{ flexDirection: 'row', gap: 12 }}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => setModalVisible(false)} style={{ flex: 1, backgroundColor: 'rgba(203,213,225,0.4)', paddingVertical: 14, borderRadius: 16, alignItems: 'center' }}>
                  <Text style={{ color: '#475569', fontWeight: '700', fontSize: 16 }}>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} onPress={() => {
                  if (inputValue.trim() === '') return;
                  setModalVisible(false);
                  if (selectedMission && !completedMissions.includes(selectedMission.title)) {
                    setCompletedMissions([...completedMissions, selectedMission.title]);
                    setTimeout(() => triggerCoinAnimation(), 300);
                  }
                }} style={{ flex: 1, backgroundColor: inputValue.trim() === '' ? '#cbd5e1' : (selectedMission?.color || '#2563eb'), paddingVertical: 14, borderRadius: 16, alignItems: 'center', shadowColor: inputValue.trim() === '' ? 'transparent' : (selectedMission?.color || '#2563eb'), shadowOpacity: 0.3, shadowRadius: 8, elevation: inputValue.trim() === '' ? 0 : 4 }}>
                  <Text style={{ color: inputValue.trim() === '' ? '#94a3b8' : '#ffffff', fontWeight: '800', fontSize: 16 }}>저장하기</Text>
                </TouchableOpacity>
              </View>
            </GlassCard>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Coin Stack Animation */}
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