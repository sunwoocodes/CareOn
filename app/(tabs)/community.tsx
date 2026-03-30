import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useRef } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TopBar from '../../components/TopBar';

export default function Community() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);

  useFocusEffect(
    useCallback(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }, [])
  );

  return (
    <View className="flex-1 bg-slate-50">
      <TopBar rightIcon="search" />

      {/* 🔥 Background Glow */}
      <View className="absolute -top-20 -left-10 w-72 h-72 bg-emerald-200 opacity-20 rounded-full blur-3xl" />
      <View className="absolute top-40 -right-10 w-72 h-72 bg-blue-200 opacity-20 rounded-full blur-3xl" />

      <ScrollView
        ref={scrollViewRef}
        contentContainerClassName="px-6 mx-auto w-full max-w-md"
        contentContainerStyle={{
          paddingTop: insets.top + 70,
          paddingBottom: insets.bottom + 100
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Editorial Section Heading */}
        <View className="mb-6 mt-2">
          <Text className="text-2xl font-extrabold text-slate-900 mb-1">
            커뮤니티
          </Text>
          <Text className="text-slate-500">
            실시간으로 나누는 건강한 이야기
          </Text>
        </View>

        {/* Category Horizontal Grid */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8 -mx-6 px-6" contentContainerClassName="gap-4 pr-12">
          {/* Free Talk Card */}
          <TouchableOpacity activeOpacity={0.8} className="w-44 bg-blue-50/80 p-5 rounded-3xl border border-blue-100/50">
            <View className="w-10 h-10 bg-blue-100 rounded-xl items-center justify-center mb-4">
              <MaterialIcons name="forum" size={20} color="#2563eb" />
            </View>
            <Text className="font-bold text-lg mb-1 text-slate-900">자유게시판</Text>
            <Text className="text-xs text-blue-600 font-bold">1시간 내 15개 새 글</Text>
          </TouchableOpacity>
          {/* Reviews Card */}
          <TouchableOpacity activeOpacity={0.8} className="w-44 bg-emerald-50/80 p-5 rounded-3xl border border-emerald-100/50">
            <View className="w-10 h-10 bg-emerald-100 rounded-xl items-center justify-center mb-4">
              <MaterialIcons name="rate-review" size={20} color="#10b981" />
            </View>
            <Text className="font-bold text-lg mb-1 text-slate-900">병원 후기</Text>
            <Text className="text-xs text-emerald-600 font-bold">지금 8명 열람 중</Text>
          </TouchableOpacity>
          {/* Tips Card */}
          <TouchableOpacity activeOpacity={0.8} className="w-44 bg-orange-50/80 p-5 rounded-3xl border border-orange-100/50">
            <View className="w-10 h-10 bg-orange-100 rounded-xl items-center justify-center mb-4">
              <MaterialIcons name="lightbulb" size={20} color="#f97316" />
            </View>
            <Text className="font-bold text-lg mb-1 text-slate-900">꿀팁 공유</Text>
            <Text className="text-xs text-orange-600 font-bold">오늘 24개 인기 정보</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Feed List */}
        <View className="flex-col gap-6">
          {/* Post 1: Review Type */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push('/community/1')}
            className="bg-white rounded-[32px] overflow-hidden p-6 shadow-md border border-slate-50"
            style={{ shadowColor: '#3b82f6', shadowOpacity: 0.1, shadowRadius: 25 }}
          >
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center gap-3">
                <View className="w-11 h-11 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200">
                  <Image source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVqwbLNJG2FVxSv46ZlWoncXyitkFKVkzBLvsV3xt6Mj1yTTjcGkgJxybNP4OzZjPaPEmpChN_r39SlBXK5hMkp4AfIKBrDLcNT4lz5tKIwBcYfuw_HyNXObzAPkClHihGP6Twvfe550T_xav01xiKe0ey7V388dRJqJYr42QGKM6b3A5IYC3A-U99EWO4kCl0wL5ZnOV9UlJV51EEVJLPiBMIcFawq1z1oceClCpIwhU4RcGjV_O_ak828B3Xkt2r8BZxc4FgqScg" }} className="w-full h-full" resizeMode="cover" />
                </View>
                <View>
                  <View className="flex-row items-center gap-1.5">
                    <Text className="font-bold text-slate-900">강남지킴이</Text>
                    <View className="bg-blue-50 px-2.5 py-1 rounded-full flex-row items-center gap-1 border border-blue-100 border-opacity-50">
                      <MaterialIcons name="verified" size={12} color="#2563eb" />
                      <Text className="text-blue-600 text-[10px] font-extrabold">Verified Patient</Text>
                    </View>
                  </View>
                  <Text className="text-[11px] text-slate-500 font-medium mt-0.5">방금 전 · 병원 후기</Text>
                </View>
              </View>
              <MaterialIcons name="more-horiz" size={24} color="#cbd5e1" />
            </View>
            <Text className="text-xl font-extrabold mb-2 tracking-tight text-slate-900 flex-wrap">강남 세브란스 정형외과 재활 후기입니다</Text>
            <Text className="text-slate-600 text-sm leading-relaxed mb-4">수술 후 3개월 차 재활 운동 시작했어요. 선생님들이 너무 친절하시고 장비가 새거라 좋네요. 특히 도수치료 프로그램이 정말 체계적입니다.</Text>

            <View className="flex-row flex-wrap gap-2 mb-5">
              <View className="bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
                <Text className="text-[11px] text-blue-700 font-bold">#재활성공</Text>
              </View>
              <View className="bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
                <Text className="text-[11px] text-blue-700 font-bold">#병원추천</Text>
              </View>
            </View>

            <View className="rounded-2xl overflow-hidden mb-5 aspect-video w-full border border-slate-100">
              <Image source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9wUkQQsHczrswWd_fqURmxjt-i00554E1W4DwpIaA0BISJnZty90Gmvv3l2fqTuyxvtC-ZSdd6BeuCf0EyFk2dqSHjsESil4PitWw7Km-JLxgSCLGcVETVJcnGQH8cpYXRIzU5qIkiQz6hMymG85uwn7BTnH-96mwkvUquOgrWvFyFgdOQCedeQMuBkxqYG20YMO9QZLj1NiYzVhqKL4zmH1sHpn3bkA2cjuVXomrOiGyDEsqIPfzud6-KDp_Aesb4y0vRIAF1XgH" }} className="w-full h-full" resizeMode="cover" />
            </View>

            <View className="flex-row gap-2 mb-6">
              <View className="flex-row items-center gap-1 bg-blue-50 px-4 py-2.5 rounded-2xl border border-blue-100">
                <MaterialIcons name="location-on" size={14} color="#1d4ed8" />
                <Text className="text-blue-700 text-[11px] font-bold">강남세브란스병원</Text>
              </View>
              <View className="flex-row items-center gap-1 bg-emerald-50 px-4 py-2.5 rounded-2xl border border-emerald-100">
                <MaterialIcons name="medical-services" size={14} color="#10b981" />
                <Text className="text-emerald-700 text-[11px] font-bold">처방 정보</Text>
              </View>
            </View>

            <View className="flex-row items-center gap-6 pt-4 border-t border-slate-100">
              <View className="flex-row items-center gap-1.5">
                <MaterialIcons name="favorite" size={18} color="#2563eb" />
                <Text className="text-blue-600 text-sm font-bold">도움돼요</Text>
                <Text className="text-blue-600 text-sm font-medium opacity-60">24</Text>
              </View>
              <View className="flex-row items-center gap-1.5">
                <MaterialIcons name="chat-bubble-outline" size={18} color="#64748b" />
                <Text className="text-slate-500 text-sm">댓글</Text>
                <Text className="text-slate-500 text-sm opacity-60">12</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Post 2: Tips Type */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push('/community/2')}
            className="bg-white rounded-[32px] overflow-hidden p-6 shadow-md border border-slate-50 mb-6"
            style={{ shadowColor: '#3b82f6', shadowOpacity: 0.1, shadowRadius: 25 }}
          >
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center gap-3">
                <View className="w-11 h-11 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200">
                  <Image source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuC93cnvK_2twVS1SwtuYswZohadY4-314WoYg2tAfc3uJ2t4lLpumm2eiEPkQCtUWBdWDXiSTAJL1o21XLLyNwb2KHpebfCRGGArgZ0oN1l1t84G-MBsp-dCdABrnASnmoUdqC6qvY2hZzHSod5BbV8T7OMzoR8hggfJtCxCyCF432J8EgD3BHOydZjSYXq1qn0qtqYBYbzLFtcTZJtPda3Ld995vjrDj5mbZZy5ihE3BLNnwVq माधवqC6qvY2hZzHSod5BbV8T7OMzoR8hggfJtCxCyCF432J8EgD3BHOydZjSYXq1qn0qtqYBYbzLFtcTZJtPda3Ld995vjrDj5mbZZy5ihE3BLNnwVqxn9riw83VNeQqVI1Iel2MLhUvUQb" }} className="w-full h-full" resizeMode="cover" />
                </View>
                <View>
                  <Text className="font-bold text-slate-900 mb-0.5">건강요정</Text>
                  <Text className="text-[11px] text-slate-500 font-medium">15분 전 · 꿀팁 공유</Text>
                </View>
              </View>
              <MaterialIcons name="more-horiz" size={24} color="#cbd5e1" />
            </View>
            <Text className="text-xl font-extrabold mb-2 tracking-tight text-slate-900">약봉투 버리지 말고 이렇게 관리하세요!</Text>
            <Text className="text-slate-600 text-sm leading-relaxed mb-4">처방받은 약들 종류가 많아지면 헷갈리기 쉽잖아요. 저는 약봉투 사진 찍어서 이 앱에 기록해두니까 너무 편하더라구요. 여러분만의 팁도 있나요?</Text>

            <View className="flex-row flex-wrap gap-2 mb-5">
              <View className="bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">
                <Text className="text-[11px] text-emerald-700 font-bold">#복약꿀팁</Text>
              </View>
              <View className="bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">
                <Text className="text-[11px] text-emerald-700 font-bold">#약관리</Text>
              </View>
            </View>

            <View className="rounded-2xl overflow-hidden mb-5 aspect-video w-full border border-slate-100">
              <Image source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfdbga0abvGp1nFQTprpy66pfr8BSoSQoqpGHcfZtUVMUQcs01u3CsoNC2gsOcftlwO6UHxLkLdzKdBqtYNlcnOv1orjLS89pFO9MZjStEnnSj5Rqhiecdy_FFIk4rhRhCctXZIcGV6CcacksBJLZikdSrra_8U7hyzBgOvc42zDfd2dhKle8ub1JbfLdk8ngeUaCcnhMXB7At2eB-ImQn5Vwe0RCiDxn1lD3MHmAttO2dOIMuFcAahGETg-uLLqX-0MS7xf1irewN" }} className="w-full h-full" resizeMode="cover" />
            </View>

            <View className="flex-row items-center gap-6 pt-4 border-t border-slate-100">
              <View className="flex-row items-center gap-1.5">
                <MaterialIcons name="favorite" size={18} color="#2563eb" />
                <Text className="text-blue-600 text-sm font-bold">도움돼요</Text>
                <Text className="text-blue-600 text-sm font-medium opacity-60">56</Text>
              </View>
              <View className="flex-row items-center gap-1.5">
                <MaterialIcons name="chat-bubble-outline" size={18} color="#64748b" />
                <Text className="text-slate-500 text-sm">댓글</Text>
                <Text className="text-slate-500 text-sm opacity-60">8</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 🔥 FAB */}
      <View style={{ bottom: insets.bottom + 90 }} className="absolute right-6">
        <TouchableOpacity activeOpacity={0.85}>
          <LinearGradient
            colors={['#2563eb', '#1d4ed8']}
            className="w-14 h-14 rounded-full items-center justify-center"
            style={{
              shadowColor: '#2563eb',
              shadowOpacity: 0.4,
              shadowRadius: 12
            }}
          >
            <MaterialIcons name="add" size={28} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}