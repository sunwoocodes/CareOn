import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
// 1. BlurView를 지우고 TopBar를 불러옵니다.
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TopBar from '../../components/TopBar'; // TopBar 임포트 추가

export default function Community() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-surface">
      {/* 2. 길었던 커스텀 헤더를 지우고 TopBar로 교체! (우측 아이콘을 돋보기로 설정) */}
      <TopBar title="커뮤니티" rightIcon="search" />

      {/* 3. pb-32를 지우고, contentContainerStyle을 통해 위아래 여백 동적 적용 */}
      <ScrollView
        contentContainerClassName="px-6 max-w-2xl mx-auto w-full"
        contentContainerStyle={{
          paddingTop: insets.top + 70,    // 상단 여백 (TopBar 두께만큼)
          paddingBottom: insets.bottom + 100 // 하단 여백 (하단 탭바 + 플로팅 버튼 피하기)
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Editorial Section Heading */}
        <View className="mb-8">
          <Text className="text-4xl font-extrabold font-headline tracking-tight text-on-surface mb-2">커뮤니티</Text>
          <Text className="text-secondary font-medium">실시간으로 나누는 건강한 이야기</Text>
        </View>

        {/* Category Horizontal Grid */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8 -mx-6 px-6" contentContainerClassName="gap-4 pr-12">
          {/* Free Talk Card */}
          <TouchableOpacity activeOpacity={0.8} className="w-44 bg-blue-50/80 p-5 rounded-3xl border border-blue-100/50">
            <View className="w-10 h-10 bg-primary/10 rounded-xl items-center justify-center mb-4">
              <MaterialIcons name="forum" size={20} color="#004ac6" />
            </View>
            <Text className="font-bold text-lg mb-1 text-on-surface">자유게시판</Text>
            <Text className="text-xs text-primary font-bold">1시간 내 15개 새 글</Text>
          </TouchableOpacity>
          {/* Reviews Card */}
          <TouchableOpacity activeOpacity={0.8} className="w-44 bg-emerald-50/80 p-5 rounded-3xl border border-emerald-100/50">
            <View className="w-10 h-10 bg-tertiary/10 rounded-xl items-center justify-center mb-4">
              <MaterialIcons name="rate-review" size={20} color="#00614b" />
            </View>
            <Text className="font-bold text-lg mb-1 text-on-surface">병원 후기</Text>
            <Text className="text-xs text-tertiary font-bold">지금 8명 열람 중</Text>
          </TouchableOpacity>
          {/* Tips Card */}
          <TouchableOpacity activeOpacity={0.8} className="w-44 bg-amber-50/80 p-5 rounded-3xl border border-amber-100/50">
            <View className="w-10 h-10 bg-secondary/10 rounded-xl items-center justify-center mb-4">
              <MaterialIcons name="lightbulb" size={20} color="#505f76" />
            </View>
            <Text className="font-bold text-lg mb-1 text-on-surface">꿀팁 공유</Text>
            <Text className="text-xs text-secondary font-bold">오늘 24개 인기 정보</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Feed List */}
        <View className="flex-col gap-6">
          {/* Post 1: Review Type */}
          <TouchableOpacity activeOpacity={0.9} onPress={() => router.push('/community/1')} className="bg-white rounded-[40px] overflow-hidden p-6 shadow-sm border border-slate-50">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center gap-3">
                <View className="w-11 h-11 rounded-2xl bg-surface-container-high overflow-hidden border border-surface-container">
                  <Image source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVqwbLNJG2FVxSv46ZlWoncXyitkFKVkzBLvsV3xt6Mj1yTTjcGkgJxybNP4OzZjPaPEmpChN_r39SlBXK5hMkp4AfIKBrDLcNT4lz5tKIwBcYfuw_HyNXObzAPkClHihGP6Twvfe550T_xav01xiKe0ey7V388dRJqJYr42QGKM6b3A5IYC3A-U99EWO4kCl0wL5ZnOV9UlJV51EEVJLPiBMIcFawq1z1oceClCpIwhU4RcGjV_O_ak828B3Xkt2r8BZxc4FgqScg" }} className="w-full h-full" resizeMode="cover" />
                </View>
                <View>
                  <View className="flex-row items-center gap-1.5">
                    <Text className="font-bold text-on-surface">강남지킴이</Text>
                    <View className="bg-blue-50 px-2.5 py-1 rounded-full flex-row items-center gap-1 border border-blue-100 border-opacity-50">
                      <MaterialIcons name="verified" size={12} color="#2563eb" />
                      <Text className="text-blue-600 text-[10px] font-extrabold">Verified Patient</Text>
                    </View>
                  </View>
                  <Text className="text-[11px] text-secondary font-medium">방금 전 · 병원 후기</Text>
                </View>
              </View>
              <MaterialIcons name="more-horiz" size={24} color="#cbd5e1" />
            </View>
            <Text className="text-xl font-extrabold mb-2 tracking-tight flex-wrap">강남 세브란스 정형외과 재활 후기입니다</Text>
            <Text className="text-on-surface-variant text-sm leading-relaxed mb-4">수술 후 3개월 차 재활 운동 시작했어요. 선생님들이 너무 친절하시고 장비가 새거라 좋네요. 특히 도수치료 프로그램이 정말 체계적입니다.</Text>

            <View className="flex-row flex-wrap gap-2 mb-5">
              <View className="bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
                <Text className="text-[11px] text-blue-700 font-bold">#재활성공</Text>
              </View>
              <View className="bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
                <Text className="text-[11px] text-blue-700 font-bold">#병원추천</Text>
              </View>
            </View>

            <View className="rounded-3xl overflow-hidden mb-5 aspect-video w-full">
              <Image source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9wUkQQsHczrswWd_fqURmxjt-i00554E1W4DwpIaA0BISJnZty90Gmvv3l2fqTuyxvtC-ZSdd6BeuCf0EyFk2dqSHjsESil4PitWw7Km-JLxgSCLGcVETVJcnGQH8cpYXRIzU5qIkiQz6hMymG85uwn7BTnH-96mwkvUquOgrWvFyFgdOQCedeQMuBkxqYG20YMO9QZLj1NiYzVhqKL4zmH1sHpn3bkA2cjuVXomrOiGyDEsqIPfzud6-KDp_Aesb4y0vRIAF1XgH" }} className="w-full h-full" resizeMode="cover" />
            </View>

            <View className="flex-row gap-2 mb-6">
              <View className="flex-row items-center gap-1 bg-blue-50 px-4 py-2.5 rounded-2xl border border-blue-100">
                <MaterialIcons name="location-on" size={14} color="#1d4ed8" />
                <Text className="text-blue-700 text-[11px] font-bold">강남세브란스병원</Text>
              </View>
              <View className="flex-row items-center gap-1 bg-blue-50 px-4 py-2.5 rounded-2xl border border-blue-100">
                <MaterialIcons name="medical-services" size={14} color="#1d4ed8" />
                <Text className="text-blue-700 text-[11px] font-bold">처방 정보</Text>
              </View>
            </View>

            <View className="flex-row items-center gap-6 pt-4 border-t border-surface-container-low">
              <View className="flex-row items-center gap-1.5">
                <MaterialIcons name="favorite" size={18} color="#2563eb" />
                <Text className="text-blue-600 text-sm font-bold">도움돼요</Text>
                <Text className="text-blue-600 text-sm font-medium opacity-60">24</Text>
              </View>
              <View className="flex-row items-center gap-1.5">
                <MaterialIcons name="chat-bubble-outline" size={18} color="#505f76" />
                <Text className="text-secondary text-sm">댓글</Text>
                <Text className="text-secondary text-sm opacity-60">12</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Post 2: Tips Type */}
          <TouchableOpacity activeOpacity={0.9} onPress={() => router.push('/community/2')} className="bg-white rounded-[40px] overflow-hidden p-6 shadow-sm border border-slate-50 mb-6">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center gap-3">
                <View className="w-11 h-11 rounded-2xl bg-surface-container-high overflow-hidden border border-surface-container">
                  <Image source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuC93cnvK_2twVS1SwtuYswZohadY4-314WoYg2tAfc3uJ2t4lLpumm2eiEPkQCtUWBdWDXiSTAJL1o21XLLyNwb2KHpebfCRGGArgZ0oN1l1t84G-MBsp-dCdABrnASnmoUdqC6qvY2hZzHSod5BbV8T7OMzoR8hggfJtCxCyCF432J8EgD3BHOydZjSYXq1qn0qtqYBYbzLFtcTZJtPda3Ld995vjrDj5mbZZy5ihE3BLNnwVqxn9riw83VNeQqVI1Iel2MLhUvUQb" }} className="w-full h-full" resizeMode="cover" />
                </View>
                <View>
                  <Text className="font-bold text-on-surface mb-0.5">건강요정</Text>
                  <Text className="text-[11px] text-secondary font-medium">15분 전 · 꿀팁 공유</Text>
                </View>
              </View>
              <MaterialIcons name="more-horiz" size={24} color="#cbd5e1" />
            </View>
            <Text className="text-xl font-extrabold mb-2 tracking-tight">약봉투 버리지 말고 이렇게 관리하세요!</Text>
            <Text className="text-on-surface-variant text-sm leading-relaxed mb-4">처방받은 약들 종류가 많아지면 헷갈리기 쉽잖아요. 저는 약봉투 사진 찍어서 이 앱에 기록해두니까 너무 편하더라구요. 여러분만의 팁도 있나요?</Text>

            <View className="flex-row flex-wrap gap-2 mb-5">
              <View className="bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
                <Text className="text-[11px] text-blue-700 font-bold">#복약꿀팁</Text>
              </View>
              <View className="bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
                <Text className="text-[11px] text-blue-700 font-bold">#약관리</Text>
              </View>
            </View>

            <View className="rounded-3xl overflow-hidden mb-5 aspect-video w-full">
              <Image source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfdbga0abvGp1nFQTprpy66pfr8BSoSQoqpGHcfZtUVMUQcs01u3CsoNC2gsOcftlwO6UHxLkLdzKdBqtYNlcnOv1orjLS89pFO9MZjStEnnSj5Rqhiecdy_FFIk4rhRhCctXZIcGV6CcacksBJLZikdSrra_8U7hyzBgOvc42zDfd2dhKle8ub1JbfLdk8ngeUaCcnhMXB7At2eB-ImQn5Vwe0RCiDxn1lD3MHmAttO2dOIMuFcAahGETg-uLLqX-0MS7xf1irewN" }} className="w-full h-full" resizeMode="cover" />
            </View>

            <View className="flex-row items-center gap-6 pt-4 border-t border-surface-container-low">
              <View className="flex-row items-center gap-1.5">
                <MaterialIcons name="favorite" size={18} color="#2563eb" />
                <Text className="text-blue-600 text-sm font-bold">도움돼요</Text>
                <Text className="text-blue-600 text-sm font-medium opacity-60">56</Text>
              </View>
              <View className="flex-row items-center gap-1.5">
                <MaterialIcons name="chat-bubble-outline" size={18} color="#505f76" />
                <Text className="text-secondary text-sm">댓글</Text>
                <Text className="text-secondary text-sm opacity-60">8</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 4. 플로팅 버튼(FAB) 위치를 기기 하단 여백에 맞춰 동적으로 조정 */}
      <View className="absolute right-6 z-40" style={{ bottom: insets.bottom + 90 }}>
        <TouchableOpacity activeOpacity={0.8}>
          <LinearGradient
            colors={['#004ac6', '#1d4ed8']}
            className="w-16 h-16 rounded-[24px] shadow-lg items-center justify-center"
          >
            <MaterialIcons name="edit" size={30} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}