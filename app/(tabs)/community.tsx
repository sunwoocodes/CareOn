// CareOn Community – Glassmorphism UI
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useRef } from 'react';
import { Animated, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GlassCard from '../../components/GlassCard';
import TopBar from '../../components/TopBar';

export default function Community() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  useFocusEffect(useCallback(() => { scrollViewRef.current?.scrollTo({ y: 0, animated: false }); }, []));

  const categories = [
    { label: '자유게시판', icon: 'forum' as const, color: '#2563eb', bg: 'rgba(219,234,254,0.7)', sub: '1시간 내 15개 새 글' },
    { label: '병원 후기', icon: 'rate-review' as const, color: '#10b981', bg: 'rgba(209,250,229,0.7)', sub: '지금 8명 열람 중' },
    { label: '꿀팁 공유', icon: 'lightbulb' as const, color: '#f97316', bg: 'rgba(255,237,213,0.7)', sub: '오늘 24개 인기 정보' },
  ];

  return (
    <View style={s.root}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <LinearGradient
        colors={['#fff0f5', '#efe5ff', '#e5f0ff', '#efe5ff']}
        locations={[0, 0.3, 0.7, 1]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill} />
      <TopBar rightIcon="search" scrollY={scrollY} />

      <Animated.ScrollView ref={scrollViewRef as any} style={{ backgroundColor: 'transparent' }}
        contentContainerStyle={{ paddingTop: insets.top + 82, paddingBottom: insets.bottom + 110, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}>

        <View style={{ marginBottom: 20 }}>
          <Text style={s.pageTitle}>커뮤니티</Text>
          <Text style={s.pageSubtitle}>실시간으로 나누는 건강한 이야기</Text>
        </View>

        {/* 카테고리 */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12, paddingRight: 20, marginBottom: 24 }}>
          {categories.map((cat, i) => (
            <TouchableOpacity key={i} activeOpacity={0.8}>
              <GlassCard style={[s.catCard, { backgroundColor: cat.bg }]}>
                <View style={[s.catIcon, { backgroundColor: 'rgba(255,255,255,0.7)' }]}>
                  <MaterialIcons name={cat.icon} size={20} color={cat.color} />
                </View>
                <Text style={s.catLabel}>{cat.label}</Text>
                <Text style={[s.catSub, { color: cat.color }]}>{cat.sub}</Text>
              </GlassCard>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 게시글 1 */}
        <TouchableOpacity activeOpacity={0.9} onPress={() => router.push('/community/1')} style={{ marginBottom: 16 }}>
          <GlassCard style={{ padding: 20 }}>
            <View style={s.postHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View style={s.avatar}>
                  <Image source={{ uri: 'https://i.pravatar.cc/150?img=3' }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                </View>
                <View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Text style={s.authorName}>강남지킴이</Text>
                    <View style={s.verifiedBadge}>
                      <MaterialIcons name="verified" size={11} color="#2563eb" />
                      <Text style={s.verifiedText}>Verified</Text>
                    </View>
                  </View>
                  <Text style={s.postMeta}>방금 전 · 병원 후기</Text>
                </View>
              </View>
              <MaterialIcons name="more-horiz" size={22} color="#cbd5e1" />
            </View>
            <Text style={s.postTitle}>강남 세브란스 정형외과 재활 후기입니다</Text>
            <Text style={s.postBody}>수술 후 3개월 차 재활 운동 시작했어요. 선생님들이 너무 친절하시고 장비가 새거라 좋네요.</Text>
            <View style={s.tagRow}>
              <View style={s.tag}><Text style={s.tagText}>#재활성공</Text></View>
              <View style={s.tag}><Text style={s.tagText}>#병원추천</Text></View>
            </View>
            <View style={s.postImageBox}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400' }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
            </View>
            <View style={s.postFooter}>
              <View style={s.footerBtn}>
                <MaterialIcons name="favorite" size={16} color="#2563eb" />
                <Text style={s.footerBtnText}>도움돼요 24</Text>
              </View>
              <View style={s.footerBtn}>
                <MaterialIcons name="chat-bubble-outline" size={16} color="#64748b" />
                <Text style={[s.footerBtnText, { color: '#64748b' }]}>댓글 12</Text>
              </View>
            </View>
          </GlassCard>
        </TouchableOpacity>

        {/* 게시글 2 */}
        <TouchableOpacity activeOpacity={0.9} onPress={() => router.push('/community/2')}>
          <GlassCard style={{ padding: 20 }}>
            <View style={s.postHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View style={s.avatar}>
                  <Image source={{ uri: 'https://i.pravatar.cc/150?img=5' }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                </View>
                <View>
                  <Text style={s.authorName}>건강요정</Text>
                  <Text style={s.postMeta}>15분 전 · 꿀팁 공유</Text>
                </View>
              </View>
              <MaterialIcons name="more-horiz" size={22} color="#cbd5e1" />
            </View>
            <Text style={s.postTitle}>약봉투 버리지 말고 이렇게 관리하세요!</Text>
            <Text style={s.postBody}>처방받은 약들 종류가 많아지면 헷갈리기 쉽잖아요. 약봉투 사진 찍어서 이 앱에 기록해두니까 너무 편하더라구요.</Text>
            <View style={s.tagRow}>
              <View style={[s.tag, { backgroundColor: 'rgba(209,250,229,0.7)', borderColor: 'rgba(167,243,208,0.5)' }]}>
                <Text style={[s.tagText, { color: '#059669' }]}>#복약꿀팁</Text>
              </View>
            </View>
            <View style={s.postFooter}>
              <View style={s.footerBtn}>
                <MaterialIcons name="favorite" size={16} color="#2563eb" />
                <Text style={s.footerBtnText}>도움돼요 56</Text>
              </View>
              <View style={s.footerBtn}>
                <MaterialIcons name="chat-bubble-outline" size={16} color="#64748b" />
                <Text style={[s.footerBtnText, { color: '#64748b' }]}>댓글 8</Text>
              </View>
            </View>
          </GlassCard>
        </TouchableOpacity>
      </Animated.ScrollView>

      {/* FAB */}
      <View style={[s.fab, { bottom: insets.bottom + 90 }]}>
        <TouchableOpacity activeOpacity={0.85}>
          <LinearGradient colors={['#4f8ef7', '#2563eb']} style={s.fabGrad}>
            <MaterialIcons name="add" size={26} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  pageTitle: { fontSize: 22, fontWeight: '800', color: '#1e293b', letterSpacing: -0.4 },
  pageSubtitle: { fontSize: 14, color: '#64748b', marginTop: 4 },
  catCard: { width: 160, padding: 18 },
  catIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  catLabel: { fontSize: 15, fontWeight: '700', color: '#1e293b', marginBottom: 3 },
  catSub: { fontSize: 11, fontWeight: '600' },
  postHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  avatar: { width: 42, height: 42, borderRadius: 14, overflow: 'hidden', backgroundColor: '#e2e8f0' },
  authorName: { fontSize: 14, fontWeight: '700', color: '#1e293b' },
  verifiedBadge: { flexDirection: 'row', alignItems: 'center', gap: 2, backgroundColor: 'rgba(219,234,254,0.8)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 99 },
  verifiedText: { fontSize: 10, fontWeight: '700', color: '#2563eb' },
  postMeta: { fontSize: 11, color: '#94a3b8', marginTop: 2 },
  postTitle: { fontSize: 17, fontWeight: '800', color: '#1e293b', marginBottom: 6, letterSpacing: -0.3 },
  postBody: { fontSize: 13, color: '#475569', lineHeight: 20, marginBottom: 12 },
  tagRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  tag: { backgroundColor: 'rgba(219,234,254,0.7)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 99, borderWidth: 1, borderColor: 'rgba(191,219,254,0.5)' },
  tagText: { fontSize: 11, fontWeight: '700', color: '#2563eb' },
  postImageBox: { height: 160, borderRadius: 16, overflow: 'hidden', marginBottom: 14, backgroundColor: '#e2e8f0' },
  postFooter: { flexDirection: 'row', gap: 20, paddingTop: 12, borderTopWidth: 1, borderTopColor: 'rgba(226,232,240,0.5)' },
  footerBtn: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  footerBtnText: { fontSize: 13, fontWeight: '700', color: '#2563eb' },
  fab: { position: 'absolute', right: 20 },
  fabGrad: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', shadowColor: '#2563eb', shadowOpacity: 0.45, shadowOffset: { width: 0, height: 6 }, shadowRadius: 14, elevation: 10 },
});