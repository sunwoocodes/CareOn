import { MaterialIcons } from '@expo/vector-icons';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TopBar from '../../components/TopBar';

export default function Map() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-slate-50">
      <TopBar />

      {/* Map Canvas Container */}
      <View className="flex-1 relative">
        {/* Fullscreen Map Representation */}
        <View className="absolute inset-0 z-0 bg-slate-50">
          <Image
            source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIS2epgkRnUBqWr0lIjo-i5vuLZuf_rJxNw-NE-ZVdgcG4uDs9d93bi-KkzyOxWgt49iQRm7nYLWxcWZV60XNooyOQCik4xqHGN6U3A1Z0tg1HOcBSHwYECcJrqItVfP00vr29x0OEW_Tyvv1nRbxaIsbCrG0TnXvtHnGw4JMkMvT_WgPsok6I9jfnYv4WjjE8EtHLaEZFknLiWwOm-kOn_DtNjVhBLSMxoZycpDSG83jdNElclpb8C4GXXD0axbOmWeKYI792wNbY" }}
            className="w-full h-full opacity-90"
            resizeMode="cover"
          />

          {/* Custom Markers */}
          {/* Marker 1: Selected Pharmacy */}
          <View className="absolute top-[45%] left-[55%] -translate-x-12 -translate-y-12 items-center">
            <View className="bg-blue-600 p-2.5 rounded-2xl border-2 border-white shadow-md">
              <MaterialIcons name="local-pharmacy" size={24} color="white" />
            </View>
            <View className="mt-2 bg-white/90 px-3 py-1 rounded-lg border border-slate-100 shadow-sm">
              <Text className="text-[11px] font-bold text-blue-700">케어온 약국</Text>
            </View>
          </View>

          {/* Marker 2: Medical Center */}
          <View className="absolute top-[30%] left-[30%] items-center opacity-80">
            <View className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
              <MaterialIcons name="medical-services" size={20} color="#2563eb" />
            </View>
          </View>

          {/* Marker 3: Another Pharmacy */}
          <View className="absolute top-[60%] left-[20%] items-center opacity-80">
            <View className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
              <MaterialIcons name="local-pharmacy" size={20} color="#2563eb" />
            </View>
          </View>
        </View>

        {/* Filter Bar (Overlay on Map) */}
        <View className="absolute z-40 w-full px-4" style={{ top: insets.top + 70 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2 pb-2">
            {/* Active Filter */}
            <TouchableOpacity className="flex-row items-center gap-1 bg-blue-600 px-4 py-2 rounded-full shadow-sm" activeOpacity={0.8}>
              <MaterialIcons name="check-circle" size={18} color="white" />
              <Text className="text-white text-sm font-semibold">영업 중</Text>
            </TouchableOpacity>

            {/* Inactive Filters */}
            <TouchableOpacity className="bg-white/90 px-4 py-2 rounded-full shadow-sm border border-slate-100" activeOpacity={0.8}>
              <Text className="text-slate-600 text-sm font-medium">주차 가능</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white/90 px-4 py-2 rounded-full shadow-sm border border-slate-100" activeOpacity={0.8}>
              <Text className="text-slate-600 text-sm font-medium">전문의 진료</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white/90 px-4 py-2 rounded-full shadow-sm border border-slate-100" activeOpacity={0.8}>
              <Text className="text-slate-600 text-sm font-medium">심야 약국</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Floating Action Button (Contextual) */}
        <View className="absolute right-6 z-40 flex-col gap-3" style={{ bottom: 200 }}>
          <TouchableOpacity className="w-12 h-12 bg-white rounded-full shadow-md border border-slate-100 items-center justify-center" activeOpacity={0.8}>
            <MaterialIcons name="my-location" size={24} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* Selected Pharmacy Bottom Sheet */}
        <View className="absolute left-0 w-full z-40 px-4 pb-4" style={{ bottom: 100 }}>
          <View className="bg-white/90 rounded-[32px] overflow-hidden shadow-md border border-slate-100">
            {/* AD Section */}
            <View className="bg-blue-50/80 px-6 py-3 flex-row items-center justify-between border-b border-blue-100/30">
              <View className="flex-row items-center gap-2">
                <View className="bg-blue-500 px-1.5 py-0.5 rounded-sm">
                  <Text className="text-white text-[10px] font-bold tracking-widest">[AD]</Text>
                </View>
                <Text className="text-xs font-semibold text-blue-700">추천: 24시간 연중무휴 약국</Text>
              </View>
              <MaterialIcons name="info-outline" size={16} color="#60a5fa" />
            </View>
            <View className="p-6">
              <View className="flex-row justify-between items-start mb-4">
                <View className="flex-1 mr-4">
                  <View className="flex-row items-center gap-2">
                    <Text className="text-xl font-extrabold tracking-tight text-slate-900">케어온 약국</Text>
                    <View className="bg-emerald-50 px-2 py-0.5 rounded-full flex-row items-center gap-1">
                      <View className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                      <Text className="text-[10px] font-bold text-emerald-600 mt-0.5">영업중</Text>
                    </View>
                  </View>
                  <Text className="text-sm text-slate-500 font-medium mt-1">서울특별시 강남구 테헤란로 427</Text>

                  <View className="flex-row items-center gap-3 mt-2">
                    <View className="flex-row items-center gap-1">
                      <MaterialIcons name="star" size={14} color="#f59e0b" />
                      <Text className="text-sm font-bold text-slate-700 mt-0.5">4.8</Text>
                      <Text className="text-xs text-slate-400 mt-0.5">(124)</Text>
                    </View>
                    <View className="w-1 h-1 bg-slate-300 rounded-full" />
                    <View className="flex-row items-center gap-1">
                      <MaterialIcons name="near-me" size={14} color="#64748b" />
                      <Text className="text-sm font-medium text-slate-500 mt-0.5">120m</Text>
                    </View>
                  </View>
                </View>
                <View className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                  <Image
                    source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAD2CvpudhDgARnghMjM7g_toCBqe6uNICNgGXSPatkaAPjPdeIl0uy8hl2UFmnUeHBigU_YL86JUgiqRg3ha3JepWcVxhLWepbRROekh12q-LFOMkDf8GtCPWAFKeCXcvsBezQPSPFnzXnj8AOt_FiYqZQ9goKzH8zoqFwNFReNhdUNgs-jAJ-A65ksjOIomuA_O8zb0RXfcReWXp_r1-KfIKDa9nsa20QDUgKz3G4ipHtSX3q9u4wrnXAvo5y0REd-p79ihJEv5N5" }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
              </View>

              {/* Action Buttons */}
              <View className="flex-row gap-3">
                <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-2 bg-slate-100 py-3.5 rounded-2xl" activeOpacity={0.7}>
                  <MaterialIcons name="call" size={18} color="#475569" />
                  <Text className="text-slate-700 font-bold mt-0.5">전화하기</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-2 bg-blue-600 py-3.5 rounded-2xl shadow-sm" activeOpacity={0.8}>
                  <MaterialIcons name="directions" size={18} color="white" />
                  <Text className="text-white font-bold mt-0.5">길찾기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}