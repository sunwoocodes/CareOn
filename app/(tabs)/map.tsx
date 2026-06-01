// CareOn Map – Glassmorphism UI
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect, useRef } from 'react';
import { Animated, Image, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import TopBar from '../../components/TopBar';

export default function Map() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(1);

  // Handle incoming route params (e.g. from diagnosis log)
  useEffect(() => {
    if (params.selectedId) {
      setSelectedMarkerId(Number(params.selectedId));
      if (params.filter) {
        setSelectedFilters([params.filter as string]);
      }
    }
  }, [params.selectedId, params.filter]);

  const sheetAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(sheetAnim, {
      toValue: selectedMarkerId !== null ? 1 : 0,
      friction: 8,
      tension: 60,
      useNativeDriver: true,
    }).start();
  }, [selectedMarkerId]);

  const markers = [
    {
      id: 1,
      name: '케어온 약국',
      tags: ['영업 중', '심야 약국'],
      top: '45%', left: '55%',
      type: 'pharmacy',
      icon: 'local-pharmacy',
      address: '서울특별시 강남구 테헤란로 427',
      rating: 4.8,
      ratingCount: 124,
      distance: '120m',
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200',
      isOpen: true,
    },
    {
      id: 2,
      name: '중앙대 병원',
      tags: ['전문의 진료'],
      top: '30%', left: '30%',
      type: 'hospital',
      icon: 'medical-services',
      address: '서울특별시 동작구 흑석로 102',
      rating: 4.5,
      ratingCount: 89,
      distance: '850m',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=200',
      isOpen: false,
    },
    {
      id: 3,
      name: '다이나믹 약국',
      tags: ['주차 가능'],
      top: '60%', left: '20%',
      type: 'pharmacy',
      icon: 'local-pharmacy',
      address: '서울특별시 서초구 서초대로 398',
      rating: 4.2,
      ratingCount: 45,
      distance: '1.2km',
      image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=200',
      isOpen: false,
    },
  ];

  // Intersection logic: Marker is visible if it contains ALL selected filters
  const visibleMarkers = markers.filter(marker =>
    selectedFilters.every(filter => marker.tags.includes(filter))
  );

  // If the currently selected marker is filtered out, deselect it
  useEffect(() => {
    if (selectedMarkerId !== null) {
      const isStillVisible = visibleMarkers.some(m => m.id === selectedMarkerId);
      if (!isStillVisible) {
        setSelectedMarkerId(null);
      }
    }
  }, [visibleMarkers, selectedMarkerId]);

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev =>
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const selectMarker = (id: number | null) => {
    setSelectedMarkerId(id);
  };

  const filterOptions = ['영업 중', '주차 가능', '전문의 진료', '심야 약국'];

  return (
    <View style={s.root}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <TopBar />

      <View style={{ flex: 1, position: 'relative' }}>
        {/* 지도 배경 */}
        <View style={StyleSheet.absoluteFill}>
          <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIS2epgkRnUBqWr0lIjo-i5vuLZuf_rJxNw-NE-ZVdgcG4uDs9d93bi-KkzyOxWgt49iQRm7nYLWxcWZV60XNooyOQCik4xqHGN6U3A1Z0tg1HOcBSHwYECcJrqItVfP00vr29x0OEW_Tyvv1nRbxaIsbCrG0TnXvtHnGw4JMkMvT_WgPsok6I9jfnYv4WjjE8EtHLaEZFknLiWwOm-kOn_DtNjVhBLSMxoZycpDSG83jdNElclpb8C4GXXD0axbOmWeKYI792wNbY' }}
            style={{ width: '100%', height: '100%', opacity: 0.92 }} resizeMode="cover" />

          {/* 동적 마커 렌더링 */}
          {visibleMarkers.map(marker => (
            <MapMarker
              key={marker.id}
              marker={marker}
              isSelected={marker.id === selectedMarkerId}
              onPress={() => selectMarker(marker.id === selectedMarkerId ? null : marker.id)}
            />
          ))}
        </View>

        {/* 필터 바 */}
        <View style={[s.filterBar, { top: insets.top + 70 }]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
            {filterOptions.map((f, i) => {
              const isActive = selectedFilters.includes(f);
              return (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.8}
                  onPress={() => toggleFilter(f)}
                  style={isActive ? s.filterActive : undefined}
                >
                  {isActive ? (
                    <>
                      <MaterialIcons name="check-circle" size={16} color="white" />
                      <Text style={{ color: '#fff', fontWeight: '600', fontSize: 13 }}>{f}</Text>
                    </>
                  ) : (
                    Platform.OS !== 'android' ? (
                      <BlurView intensity={60} tint="light" style={s.filterInactive}>
                        <Text style={s.filterInactiveText}>{f}</Text>
                      </BlurView>
                    ) : (
                      <View style={[s.filterInactive, { backgroundColor: 'rgba(255,255,255,0.85)' }]}>
                        <Text style={s.filterInactiveText}>{f}</Text>
                      </View>
                    )
                  )}
                </TouchableOpacity>
              );
            })}
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
        {(() => {
          const selectedMarker = visibleMarkers.find(m => m.id === selectedMarkerId) || visibleMarkers.find(m => m.id === 1) || markers[0];

          return (
            <Animated.View
              pointerEvents={selectedMarkerId !== null ? 'auto' : 'none'}
              style={[
                s.bottomSheet,
                { 
                  bottom: insets.bottom + 90,
                  opacity: sheetAnim,
                  transform: [{
                    translateY: sheetAnim.interpolate({ inputRange: [0, 1], outputRange: [30, 0] })
                  }]
                }
              ]}
            >
              {Platform.OS !== 'android'
                ? <BlurView intensity={70} tint="light" style={s.bottomSheetInner}><BottomContent marker={selectedMarker} /></BlurView>
                : <View style={[s.bottomSheetInner, { backgroundColor: 'rgba(255,255,255,0.92)' }]}><BottomContent marker={selectedMarker} /></View>}
            </Animated.View>
          );
        })()}
      </View>
    </View>
  );
}

function BottomContent({ marker }: { marker: any }) {
  return (
    <>
      {/* 약국 정보 */}
      <View style={{ padding: 18 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
          <View style={{ flex: 1, marginRight: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 3 }}>
              <Text style={s.pharmacyName}>{marker.name}</Text>
              <View style={[s.openBadge, { backgroundColor: marker.isOpen ? 'rgba(209,250,229,0.7)' : 'rgba(254,226,226,0.7)' }]}>
                <View style={[s.openDot, { backgroundColor: marker.isOpen ? '#10b981' : '#ef4444' }]} />
                <Text style={[s.openText, { color: marker.isOpen ? '#059669' : '#b91c1c' }]}>{marker.isOpen ? '영업중' : '영업종료'}</Text>
              </View>
            </View>
            <Text style={s.pharmacyAddr}>{marker.address}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 6 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                <MaterialIcons name="star" size={13} color="#f59e0b" />
                <Text style={s.ratingText}>{marker.rating}</Text>
                <Text style={s.ratingCount}>({marker.ratingCount})</Text>
              </View>
              <View style={s.dot} />
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                <MaterialIcons name="near-me" size={13} color="#64748b" />
                <Text style={s.distText}>{marker.distance}</Text>
              </View>
            </View>
          </View>
          <View style={s.pharmacyImg}>
            <Image source={{ uri: marker.image }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
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

function MapMarker({ marker, isSelected, onPress }: { marker: any; isSelected: boolean; onPress: () => void }) {
  const scaleAnim = useRef(new Animated.Value(isSelected ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: isSelected ? 1 : 0,
      friction: 6,
      tension: 60,
      useNativeDriver: true,
    }).start();
  }, [isSelected]);

  const largeOpacity = scaleAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });
  const smallOpacity = scaleAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });
  const largeScale = scaleAnim.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] });
  const smallScale = scaleAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0.5] });

  return (
    <View style={{ position: 'absolute', top: marker.top, left: marker.left, width: 200, height: 200, marginLeft: -100, marginTop: -100, alignItems: 'center', justifyContent: 'center', zIndex: isSelected ? 10 : 1 }}>
      <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* Large Expanded Marker */}
        <Animated.View style={[s.marker, { opacity: largeOpacity, transform: [{ scale: largeScale }], position: 'absolute', alignItems: 'center' }]} pointerEvents={isSelected ? 'auto' : 'none'}>
          <View style={s.markerIcon}>
            <MaterialIcons name={marker.icon as any} size={22} color="white" />
          </View>
          <View style={s.markerLabel}><Text style={s.markerLabelText}>{marker.name}</Text></View>
        </Animated.View>

        {/* Small Idle Marker */}
        <Animated.View style={[s.markerSmall, { opacity: smallOpacity, transform: [{ scale: smallScale }], position: 'absolute' }]} pointerEvents={!isSelected ? 'auto' : 'none'}>
          <MaterialIcons name={marker.icon as any} size={18} color="#2563eb" />
        </Animated.View>

      </TouchableOpacity>
    </View>
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