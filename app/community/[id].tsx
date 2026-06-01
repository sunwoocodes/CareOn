import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useRef } from 'react';
import { Animated, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TopBar from '../../components/TopBar';

export default function CommunityDetail() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-slate-50 overflow-hidden"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TopBar title="게시글" showBack={true} showNotification={false} scrollY={scrollY} />

      {/* 🔥 Background Glow */}
      <View className="absolute -top-20 -left-10 w-72 h-72 bg-blue-200 opacity-20 rounded-full blur-3xl" />
      <View className="absolute top-60 -right-10 w-72 h-72 bg-emerald-200 opacity-20 rounded-full blur-3xl" />

      <Animated.ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: insets.top + 70,
          paddingBottom: insets.bottom + 120,
          paddingHorizontal: 20
        }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
      >
        {/* Post Header */}
        <View className="flex-row items-center justify-between mb-6">
          <View className="flex-row items-center gap-3">
            <View className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-200 border border-slate-300">
              <Image source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8K12zLeXP9xAcCJxTWfAlhY7dX6jGxMMbzwpDWVxUEk-9kQdufdug_0YE8n4yihOxxBD5ivrbgozW81gsJH_RjlsEOeJh_5wSCmVx0RJvb4xvrvvgEvON8pZ_XzB3_c5odIpWximkPpGKggDqlswBcOAlSXUvPWTxy3ubEHrak8zUX4GA5iAkM7W97IT-yLQ6QISHbOuc2af4HP2igZfWdtmCiMK5LvOmeXfDO-RZieLPtcwgYw3_AfrgryUxrqaFZEAf5NQ90Spf" }} className="w-full h-full" resizeMode="cover" />
            </View>
            <View>
              <View className="flex-row items-center gap-2">
                <Text className="font-bold text-slate-900">강남지킴이</Text>
                <View className="bg-blue-50 px-2 py-0.5 rounded-full flex-row items-center gap-1 border border-blue-100">
                  <MaterialIcons name="verified" size={10} color="#2563eb" />
                  <Text className="text-blue-600 text-[10px] font-bold uppercase tracking-widest">Verified Patient</Text>
                </View>
              </View>
              <Text className="text-xs text-slate-500 mt-0.5">방금 전</Text>
            </View>
          </View>
        </View>

        {/* Post Content */}
        <View className="flex-col gap-6">
          <Text className="text-[17px] leading-relaxed text-slate-700 font-medium tracking-tight">
            강남 세브란스 정형외과 재활 후기입니다. 수술 후 3개월 차에 접어들면서 재활 강도를 높였는데, 담당 선생님께서 너무 친절하게 지도해주셔서 큰 무리 없이 진행 중이에요. 특히 이번에 도입된 신형 재활 기구들이 근력 회복에 정말 효율적인 것 같습니다. 병원 복도도 리모델링되어서 훨씬 쾌적해졌네요.
          </Text>

          {/* Image Carousel */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-4 pr-12" snapToInterval={310} decelerationRate="fast" className="-mx-5 px-5">
            <View className="w-[300px] aspect-[4/3] rounded-[32px] overflow-hidden bg-slate-200 shadow-sm">
              <Image source={{ uri: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800" }} className="w-full h-full" resizeMode="cover" />
            </View>
            <View className="w-[300px] aspect-[4/3] rounded-[32px] overflow-hidden bg-slate-200 shadow-sm">
              <Image source={{ uri: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800" }} className="w-full h-full" resizeMode="cover" />
            </View>
          </ScrollView>

          {/* Contextual Links */}
          <View className="flex-col gap-3 mt-2">
            <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-2 py-4 px-6 rounded-2xl border-2 border-blue-200 bg-blue-50" activeOpacity={0.7}>
              <MaterialIcons name="map" size={20} color="#2563eb" />
              <Text className="text-blue-700 font-bold">병원 위치 확인</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-2 py-4 px-6 rounded-2xl border-2 border-blue-200 bg-blue-50" activeOpacity={0.7}>
              <MaterialIcons name="medication" size={20} color="#2563eb" />
              <Text className="text-blue-700 font-bold">처방 정보 보기</Text>
            </TouchableOpacity>
          </View>

          {/* Reactions */}
          <View className="pt-4 flex-col gap-4">
            <TouchableOpacity className="w-full flex-row items-center justify-center gap-2 py-4 bg-blue-600 rounded-[32px] shadow-md" activeOpacity={0.8}>
              <MaterialIcons name="favorite" size={20} color="white" />
              <Text className="text-white font-bold">도움돼요</Text>
            </TouchableOpacity>
            <View className="flex-row flex-wrap gap-2">
              <TouchableOpacity className="px-4 py-2 rounded-full bg-slate-100 border border-slate-200" activeOpacity={0.7}>
                <Text className="text-slate-700 text-sm font-semibold">✨ 정확한 정보예요</Text>
              </TouchableOpacity>
              <TouchableOpacity className="px-4 py-2 rounded-full bg-slate-100 border border-slate-200" activeOpacity={0.7}>
                <Text className="text-slate-700 text-sm font-semibold">🫂 위로가 돼요</Text>
              </TouchableOpacity>
              <TouchableOpacity className="px-4 py-2 rounded-full bg-slate-100 border border-slate-200" activeOpacity={0.7}>
                <Text className="text-slate-700 text-sm font-semibold">💡 유익해요</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View className="h-3 bg-slate-100 -mx-5 my-8 rounded-full" />

        {/* Comments Section */}
        <View className="flex-col gap-6">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-bold text-slate-900">댓글 <Text className="text-blue-600">12</Text></Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text className="text-sm text-slate-500 font-medium">인기순 ↓</Text>
            </TouchableOpacity>
          </View>

          {/* Expert Pinned Comment */}
          <View className="bg-blue-50 rounded-[32px] p-5 border border-blue-100">
            <View className="flex-row items-center gap-2 mb-3">
              <View className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-200">
                <Image source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYaqJ37p3S-z2oWo4odcBu9lylmJhywCzkcRB3t_Wc44xWhzHOOhpMSKvEpmNz3flmLiA5Gt3JztFbL2JDPI-iRL76Aw7EYUz13_pfG0EodZ6fUqdWBu5MxJpyla8LUqg5tDf93rQFAUa7TqwyV1MWQuCqHM02lBOdNZkQcN4fm_CoA_fO9HemmZbcc3ZXhqaxFkxLCoM20TL7SaNwjrXtt_e6nRleuxkRmPDUmLMWUshjKLkDoZqZdejKsbTkxU1ejBGhlgNfY-PC" }} className="w-full h-full" resizeMode="cover" />
              </View>
              <View>
                <View className="flex-row items-center gap-1.5">
                  <Text className="font-bold text-blue-700">이지훈 약사</Text>
                  <View className="bg-blue-600 px-2 py-0.5 rounded-full">
                    <Text className="text-white text-[9px] font-bold uppercase tracking-widest">전문가</Text>
                  </View>
                </View>
                <Text className="text-[10px] text-blue-500 font-medium">CareOn 파트너 전문진</Text>
              </View>
            </View>
            <Text className="text-sm leading-relaxed text-slate-700 font-medium">
              강남 세브란스는 재활 프로토콜이 굉장히 체계적인 곳입니다. 수술 부위의 가동 범위를 서서히 넓히는 것이 중요하니, 처방받은 소염제도 규칙적으로 복용하시면서 꾸준히 정진하시길 응원합니다!
            </Text>
            <View className="mt-3 flex-row items-center gap-4">
              <Text className="text-xs font-bold text-blue-500">방금 전</Text>
              <TouchableOpacity className="flex-row items-center gap-1" activeOpacity={0.7}>
                <MaterialIcons name="chat-bubble-outline" size={12} color="#3b82f6" />
                <Text className="text-xs font-bold text-blue-500">답글 2</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Standard Comments */}
          <View className="flex-col gap-6 pt-4">
            <View className="flex-row gap-3">
              <View className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
                <Image source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgdUVVwuK6AXmfMBx2PtnLTIzBcpS8-1NjA3Et0cazvqCXHekKaDfC-yfGhmJLq5KLxgTMXXufYq3mQFZAjpwubkGBLi4Khz0l-ZP8zcnSush4m_-W8Zu9xjuDzQYGG__gDC1CY7VVT-2ge_9hHjTb62oetrkD9F89b4_OBhBU_ZDNx-U4ZP-er-zoq50HHaAI1-nDw0WdnVOuTaJ0Rxhhf440KpIYm1mVXX-BR3lDc0QfYoI3eEu8oRLjuDvw_SCtux0LL3Jwjsaj" }} className="w-full h-full" resizeMode="cover" />
              </View>
              <View className="flex-1 flex-col gap-1.5">
                <View className="flex-row items-center gap-2">
                  <Text className="font-bold text-sm text-slate-900">민들레홀씨</Text>
                  <Text className="text-[10px] text-slate-500">15분 전</Text>
                </View>
                <Text className="text-sm text-slate-600 leading-relaxed pr-2">저도 다음 달에 예약했는데 기구들이 정말 좋은가보네요! 후기 감사합니다.</Text>
                <View className="flex-row items-center gap-4">
                  <TouchableOpacity className="flex-row items-center gap-1" activeOpacity={0.7}>
                    <MaterialIcons name="favorite-border" size={14} color="#64748b" />
                    <Text className="text-xs font-bold text-slate-500">4</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.7}>
                    <Text className="text-xs font-bold text-slate-500">답글 달기</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View className="flex-row gap-3">
              <View className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
                <Image source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmLKLEto2r2nFGZzSADukRaHV3MV0p9xewUp4HBUmDFDNvYR4vR_yP6C_T6m78sownKbv__CUoi9XfK3DfjWBlUvbl1phT-8FbI9nHRCACMZH7oKRR8VqT965SxkJEiGUjV8npAkwhXCdyTmLU6lony_1dpsWoiQgoH5U3M62ryB9U4SZIgyg5UQB-Fq0_pugTgY7s435S97iYOnAprqr_H_yzitWmsnw8G7hNAkBRkOu5PaRh0T6Rfy4_iXb7ay7zE0ScEPUdO08h" }} className="w-full h-full" resizeMode="cover" />
              </View>
              <View className="flex-1 flex-col gap-1.5">
                <View className="flex-row items-center gap-2">
                  <Text className="font-bold text-sm text-slate-900">오늘도건강</Text>
                  <Text className="text-[10px] text-slate-500">32분 전</Text>
                </View>
                <Text className="text-sm text-slate-600 leading-relaxed pr-2">병원 시설이 정말 깨끗해보여요. 빠른 쾌유 빌게요!</Text>
                <View className="flex-row items-center gap-4">
                  <TouchableOpacity className="flex-row items-center gap-1" activeOpacity={0.7}>
                    <MaterialIcons name="favorite-border" size={14} color="#64748b" />
                    <Text className="text-xs font-bold text-slate-500">2</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.7}>
                    <Text className="text-xs font-bold text-slate-500">답글 달기</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Animated.ScrollView>

      {/* Input Box (Floating) */}
      <View className="absolute bottom-0 left-0 right-0 px-4 w-full justify-center bg-white/95 border-t border-slate-100"
        style={{ paddingBottom: insets.bottom + 12, paddingTop: 10 }}>
        <View className="flex-row items-center gap-3 bg-slate-100 rounded-full px-2 py-1.5 border border-slate-200">
          <TextInput
            className="flex-1 text-sm bg-transparent pl-4 pr-2 h-10 text-slate-800"
            placeholder="따뜻한 댓글을 남겨주세요..."
            placeholderTextColor="#94a3b8"
          />
          <TouchableOpacity className="w-10 h-10 rounded-full bg-blue-600 items-center justify-center" activeOpacity={0.8}>
            <MaterialIcons name="send" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
