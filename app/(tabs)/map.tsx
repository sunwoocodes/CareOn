// CareOn Map – Glassmorphism UI
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Image, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TopBar from '../../components/TopBar';

export default function Map() {
  const insets = useSafeAreaInsets();

  return (
    <View style={s.root}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <TopBar />

      <View style={{ flex: 1, position: 'relative' }}>
        {/* 지도 배경 */}
        <View style={StyleSheet.absoluteFill}>
          <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIS2epgkRnUBqWr0lIjo-i5vuLZuf_rJxNw-NE-ZVdgcG4uDs9d93bi-KkzyOxWgt49iQRm7nYLWxcWZV60XNooyOQCik4xqHGN6U3A1Z0tg1HOcBSHwYECcJrqItVfP00vr29x0OEW_Tyvv1nRbxaIsbCrG0TnXvtHnGw4JMkMvT_WgPsok6I9jfnYv4WjjE8EtHLaEZFknLiWwOm-kOn_DtNjVhBLSMxoZycpDSG83jdNElclpb8C4GXXD0axbOmWeKYI792wNbY' }}
            style={{ width: '100%', height: '100%', opacity: 0.92 }} resizeMode="cover" />

          {/* 마커 1 */}
          <View style={[s.marker, { top: '45%', left: '55%' }]}>
            <View style={s.markerIcon}>
              <MaterialIcons name="local-pharmacy" size={22} color="white" />
            </View>
            <View style={s.markerLabel}><Text style={s.markerLabelText}>케어온 약국</Text></View>
          </View>

          {/* 마커 2 */}
          <View style={[s.marker, { top: '30%', left: '30%', opacity: 0.8 }]}>
            <View style={s.markerSmall}>
              <MaterialIcons name="medical-services" size={18} color="#2563eb" />
            </View>
          </View>

          {/* 마커 3 */}
          <View style={[s.marker, { top: '60%', left: '20%', opacity: 0.8 }]}>
            <View style={s.markerSmall}>
              <MaterialIcons name="local-pharmacy" size={18} color="#2563eb" />
            </View>
          </View>
        </View>

        {/* 필터 바 */}
        <View style={[s.filterBar, { top: insets.top + 70 }]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
            <TouchableOpacity style={s.filterActive} activeOpacity={0.8}>
              <MaterialIcons name="check-circle" size={16} color="white" />
              <Text style={{ color: '#fff', fontWeight: '600', fontSize: 13 }}>영업 중</Text>
            </TouchableOpacity>
            {['주차 가능', '전문의 진료', '심야 약국'].map((f, i) => (
              <TouchableOpacity key={i} activeOpacity={0.8}>
                {Platform.OS !== 'android'
                  ? <BlurView intensity={60} tint="light" style={s.filterInactive}><Text style={s.filterInactiveText}>{f}</Text></BlurView>
                  : <View style={[s.filterInactive, { backgroundColor: 'rgba(255,255,255,0.85)' }]}><Text style={s.filterInactiveText}>{f}</Text></View>}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* 내 위치 버튼 */}
        <View style={[s.locBtn, { bottom: 220 }]}>
          <TouchableOpacity activeOpacity={0.8}>
            {Platform.OS !== 'android'
              ? <BlurView intensity={70} tint="light" style={s.locBtnInner}><MaterialIcons name="my-location" size={22} color="#64748b" /></BlurView>
              : <View style={[s.locBtnInner, { backgroundColor: 'rgba(255,255,255,0.9)' }]}><MaterialIcons name="my-location" size={22} color="#64748b" /></View>}
          </TouchableOpacity>
        </View>

        {/* 약국 정보 바텀시트 */}
        <View style={[s.bottomSheet, { bottom: insets.bottom + 90 }]}>
          {Platform.OS !== 'android'
            ? <BlurView intensity={70} tint="light" style={s.bottomSheetInner}>{BottomContent()}</BlurView>
            : <View style={[s.bottomSheetInner, { backgroundColor: 'rgba(255,255,255,0.92)' }]}>{BottomContent()}</View>}
        </View>
      </View>
    </View>
  );
}

function BottomContent() {
  return (
    <>
      {/* 광고 */}
      <View style={s.adBar}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View style={s.adBadge}><Text style={s.adBadgeText}>AD</Text></View>
          <Text style={s.adText}>추천: 24시간 연중무휴 약국</Text>
        </View>
        <MaterialIcons name="info-outline" size={15} color="#60a5fa" />
      </View>
      {/* 약국 정보 */}
      <View style={{ padding: 18 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
          <View style={{ flex: 1, marginRight: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 3 }}>
              <Text style={s.pharmacyName}>케어온 약국</Text>
              <View style={s.openBadge}>
                <View style={s.openDot} />
                <Text style={s.openText}>영업중</Text>
              </View>
            </View>
            <Text style={s.pharmacyAddr}>서울특별시 강남구 테헤란로 427</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 6 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                <MaterialIcons name="star" size={13} color="#f59e0b" />
                <Text style={s.ratingText}>4.8</Text>
                <Text style={s.ratingCount}>(124)</Text>
              </View>
              <View style={s.dot} />
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                <MaterialIcons name="near-me" size={13} color="#64748b" />
                <Text style={s.distText}>120m</Text>
              </View>
            </View>
          </View>
          <View style={s.pharmacyImg}>
            <Image source={{ uri: 'https://i.pravatar.cc/150?img=10' }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
          </View>
        </View>
        {/* 버튼 */}
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity activeOpacity={0.7} style={s.callBtn}>
            <MaterialIcons name="call" size={17} color="#475569" />
            <Text style={s.callBtnText}>전화하기</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={s.dirBtn}>
            <MaterialIcons name="directions" size={17} color="#fff" />
            <Text style={s.dirBtnText}>길찾기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f7f9fb' },
  marker: { position: 'absolute', alignItems: 'center' },
  markerIcon: { backgroundColor: '#2563eb', padding: 10, borderRadius: 16, borderWidth: 2, borderColor: '#fff' },
  markerLabel: { marginTop: 4, backgroundColor: 'rgba(255,255,255,0.92)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  markerLabelText: { fontSize: 11, fontWeight: '700', color: '#1d4ed8' },
  markerSmall: { backgroundColor: '#fff', padding: 8, borderRadius: 14, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, elevation: 3 },
  filterBar: { position: 'absolute', left: 0, right: 0, paddingHorizontal: 16, zIndex: 40 },
  filterActive: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#2563eb', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 99 },
  filterInactive: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 99, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(226,232,240,0.5)' },
  filterInactiveText: { fontSize: 13, color: '#475569', fontWeight: '500' },
  locBtn: { position: 'absolute', right: 16, zIndex: 40 },
  locBtnInner: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(226,232,240,0.5)' },
  bottomSheet: { position: 'absolute', left: 16, right: 16, borderRadius: 28, overflow: 'hidden', zIndex: 40, borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)' },
  bottomSheetInner: { overflow: 'hidden' },
  adBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(219,234,254,0.4)', backgroundColor: 'rgba(239,246,255,0.6)' },
  adBadge: { backgroundColor: '#2563eb', paddingHorizontal: 5, paddingVertical: 2, borderRadius: 4 },
  adBadgeText: { color: '#fff', fontSize: 9, fontWeight: '700' },
  adText: { fontSize: 12, fontWeight: '600', color: '#1d4ed8' },
  pharmacyName: { fontSize: 18, fontWeight: '800', color: '#1e293b', letterSpacing: -0.3 },
  pharmacyAddr: { fontSize: 12, color: '#64748b', marginTop: 2 },
  openBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(209,250,229,0.7)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 99 },
  openDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#10b981' },
  openText: { fontSize: 10, fontWeight: '700', color: '#059669' },
  ratingText: { fontSize: 13, fontWeight: '700', color: '#334155' },
  ratingCount: { fontSize: 12, color: '#94a3b8' },
  dot: { width: 3, height: 3, borderRadius: 2, backgroundColor: '#cbd5e1' },
  distText: { fontSize: 12, color: '#64748b', fontWeight: '500' },
  pharmacyImg: { width: 60, height: 60, borderRadius: 16, overflow: 'hidden', backgroundColor: '#e2e8f0' },
  callBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: 'rgba(241,245,249,0.8)', paddingVertical: 12, borderRadius: 16 },
  callBtnText: { fontWeight: '700', color: '#475569' },
  dirBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: '#2563eb', paddingVertical: 12, borderRadius: 16 },
  dirBtnText: { fontWeight: '700', color: '#fff' },
});