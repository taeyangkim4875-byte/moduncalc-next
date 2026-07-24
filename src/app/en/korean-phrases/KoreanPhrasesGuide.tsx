'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

type Tab = 'greetings' | 'restaurant' | 'shopping' | 'transport' | 'emergency' | 'numbers';

interface Phrase {
  korean: string;
  romanization: string;
  english: string;
}

const PHRASES: Record<Tab, { title: string; icon: string; phrases: Phrase[] }> = {
  greetings: {
    title: 'Greetings (인사)',
    icon: '👋',
    phrases: [
      { korean: '안녕하세요', romanization: 'An-nyeong-ha-se-yo', english: 'Hello' },
      { korean: '감사합니다', romanization: 'Gam-sa-ham-ni-da', english: 'Thank you' },
      { korean: '죄송합니다', romanization: 'Joe-song-ham-ni-da', english: "I'm sorry" },
      { korean: '괜찮아요', romanization: 'Gwaen-cha-na-yo', english: "It's okay" },
      { korean: '네 / 아니요', romanization: 'Ne / A-ni-yo', english: 'Yes / No' },
      { korean: '안녕히 가세요', romanization: 'An-nyeong-hi ga-se-yo', english: 'Goodbye (to person leaving)' },
      { korean: '안녕히 계세요', romanization: 'An-nyeong-hi gye-se-yo', english: 'Goodbye (to person staying)' },
      { korean: '처음 뵙겠습니다', romanization: 'Cheo-eum boep-get-seum-ni-da', english: 'Nice to meet you' },
      { korean: '실례합니다', romanization: 'Sil-lye-ham-ni-da', english: 'Excuse me (formal)' },
      { korean: '잠시만요', romanization: 'Jam-si-man-yo', english: 'Just a moment' },
    ],
  },
  restaurant: {
    title: 'Restaurant (식당)',
    icon: '🍽️',
    phrases: [
      { korean: '여기요!', romanization: 'Yeo-gi-yo!', english: 'Excuse me! (calling staff)' },
      { korean: '메뉴판 주세요', romanization: 'Me-nyu-pan ju-se-yo', english: 'Menu please' },
      { korean: '이거 주세요', romanization: 'I-geo ju-se-yo', english: 'This one please' },
      { korean: '물 주세요', romanization: 'Mul ju-se-yo', english: 'Water please' },
      { korean: '계산이요', romanization: 'Gye-san-i-yo', english: 'Check please' },
      { korean: '맵지 않게 해주세요', romanization: 'Maep-ji an-ke hae-ju-se-yo', english: 'Not spicy please' },
      { korean: '덜 맵게 해주세요', romanization: 'Deol maep-ge hae-ju-se-yo', english: 'Less spicy please' },
      { korean: '맛있어요!', romanization: 'Ma-si-sseo-yo!', english: "It's delicious!" },
      { korean: '배불러요', romanization: 'Bae-bul-leo-yo', english: "I'm full" },
      { korean: '포장해 주세요', romanization: 'Po-jang-hae ju-se-yo', english: 'To go / Wrap it up please' },
      { korean: '예약했어요', romanization: 'Ye-yak-hae-sseo-yo', english: 'I have a reservation' },
      { korean: '몇 명이세요?', romanization: 'Myeot myeong-i-se-yo?', english: 'How many people? (you will hear this)' },
    ],
  },
  shopping: {
    title: 'Shopping (쇼핑)',
    icon: '🛍️',
    phrases: [
      { korean: '얼마예요?', romanization: 'Eol-ma-ye-yo?', english: 'How much is it?' },
      { korean: '카드 돼요?', romanization: 'Ka-deu dwae-yo?', english: 'Can I pay by card?' },
      { korean: '현금만 돼요', romanization: 'Hyeon-geum-man dwae-yo', english: 'Cash only (you may hear this)' },
      { korean: '좀 깎아주세요', romanization: 'Jom kka-kka-ju-se-yo', english: 'Please give me a discount' },
      { korean: '이거 있어요?', romanization: 'I-geo i-sseo-yo?', english: 'Do you have this?' },
      { korean: '다른 색 있어요?', romanization: 'Da-reun saek i-sseo-yo?', english: 'Do you have another color?' },
      { korean: '너무 비싸요', romanization: 'Neo-mu bi-ssa-yo', english: "It's too expensive" },
      { korean: '영수증 주세요', romanization: 'Yeong-su-jeung ju-se-yo', english: 'Receipt please' },
      { korean: '교환 가능해요?', romanization: 'Gyo-hwan ga-neung-hae-yo?', english: 'Can I exchange this?' },
      { korean: '환불 가능해요?', romanization: 'Hwan-bul ga-neung-hae-yo?', english: 'Can I get a refund?' },
    ],
  },
  transport: {
    title: 'Transportation (교통)',
    icon: '🚕',
    phrases: [
      { korean: '여기서 내려주세요', romanization: 'Yeo-gi-seo nae-ryeo-ju-se-yo', english: 'Please drop me off here' },
      { korean: 'OO역 어떻게 가요?', romanization: 'OO-yeok eo-tteo-ke ga-yo?', english: 'How do I get to __ station?' },
      { korean: '여기로 가주세요', romanization: 'Yeo-gi-ro ga-ju-se-yo', english: 'Please go here (showing address)' },
      { korean: '얼마나 걸려요?', romanization: 'Eol-ma-na geol-lyeo-yo?', english: 'How long does it take?' },
      { korean: '다음 정류장이 어디예요?', romanization: 'Da-eum jeong-ryu-jang-i eo-di-ye-yo?', english: 'What is the next stop?' },
      { korean: '환승이에요', romanization: 'Hwan-seung-i-e-yo', english: 'I need to transfer' },
      { korean: '길을 잃었어요', romanization: 'Gi-reul i-reo-sseo-yo', english: "I'm lost" },
      { korean: '택시 어디서 타요?', romanization: 'Taek-si eo-di-seo ta-yo?', english: 'Where can I catch a taxi?' },
      { korean: '오른쪽 / 왼쪽', romanization: 'O-reun-jjok / Oen-jjok', english: 'Right / Left' },
      { korean: '직진해 주세요', romanization: 'Jik-jin-hae ju-se-yo', english: 'Go straight please' },
    ],
  },
  emergency: {
    title: 'Emergency (긴급)',
    icon: '🚨',
    phrases: [
      { korean: '도와주세요!', romanization: 'Do-wa-ju-se-yo!', english: 'Help me!' },
      { korean: '경찰을 불러주세요', romanization: 'Gyeong-cha-reul bul-leo-ju-se-yo', english: 'Please call the police' },
      { korean: '구급차를 불러주세요', romanization: 'Gu-geup-cha-reul bul-leo-ju-se-yo', english: 'Please call an ambulance' },
      { korean: '병원', romanization: 'Byeong-won', english: 'Hospital' },
      { korean: '약국', romanization: 'Yak-guk', english: 'Pharmacy' },
      { korean: '아파요', romanization: 'A-pa-yo', english: "I'm sick / It hurts" },
      { korean: '여기가 아파요', romanization: 'Yeo-gi-ga a-pa-yo', english: 'It hurts here (pointing)' },
      { korean: '알레르기가 있어요', romanization: 'Al-le-reu-gi-ga i-sseo-yo', english: 'I have allergies' },
      { korean: '도둑이야!', romanization: 'Do-du-gi-ya!', english: 'Thief!' },
      { korean: '불이야!', romanization: 'Bu-ri-ya!', english: 'Fire!' },
      { korean: '위험해요!', romanization: 'Wi-heom-hae-yo!', english: "It's dangerous!" },
      { korean: '대사관에 연락해 주세요', romanization: 'Dae-sa-gwan-e yeol-lak-hae ju-se-yo', english: 'Please contact the embassy' },
    ],
  },
  numbers: {
    title: 'Numbers (숫자)',
    icon: '🔢',
    phrases: [
      { korean: '하나 / 일', romanization: 'Ha-na / Il', english: '1 (Native / Sino-Korean)' },
      { korean: '둘 / 이', romanization: 'Dul / I', english: '2' },
      { korean: '셋 / 삼', romanization: 'Set / Sam', english: '3' },
      { korean: '넷 / 사', romanization: 'Net / Sa', english: '4' },
      { korean: '다섯 / 오', romanization: 'Da-seot / O', english: '5' },
      { korean: '여섯 / 육', romanization: 'Yeo-seot / Yuk', english: '6' },
      { korean: '일곱 / 칠', romanization: 'Il-gop / Chil', english: '7' },
      { korean: '여덟 / 팔', romanization: 'Yeo-deol / Pal', english: '8' },
      { korean: '아홉 / 구', romanization: 'A-hop / Gu', english: '9' },
      { korean: '열 / 십', romanization: 'Yeol / Sip', english: '10' },
      { korean: '백', romanization: 'Baek', english: '100' },
      { korean: '천', romanization: 'Cheon', english: '1,000' },
      { korean: '만', romanization: 'Man', english: '10,000' },
    ],
  },
};

export default function KoreanPhrasesGuide() {
  const [tab, setTab] = useState<Tab>('greetings');

  const tabClass = (active: boolean) =>
    `px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
      active
        ? 'bg-[var(--primary)] text-white'
        : 'bg-[var(--bg)] text-[#4E5968] hover:bg-[var(--primary-weak)]'
    }`;

  const current = PHRASES[tab];

  return (
    <>
      {/* Category Tabs */}
      <Card>
        <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
          {(Object.keys(PHRASES) as Tab[]).map(key => (
            <button key={key} className={tabClass(tab === key)} onClick={() => setTab(key)}>
              {PHRASES[key].title}
            </button>
          ))}
        </div>
      </Card>

      {/* Phrases Table */}
      <Card>
        <SectionTitle num={String((Object.keys(PHRASES) as Tab[]).indexOf(tab) + 1)}>{current.title}</SectionTitle>
        <div className="flex flex-col gap-2">
          {current.phrases.map((phrase, i) => (
            <div key={i} className="px-4 py-3 rounded-xl border-[1.5px] border-[var(--line)] hover:border-[var(--primary)] transition-all">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-base font-bold text-[#333]">{phrase.korean}</span>
                <span className="text-sm text-[#4E5968] font-semibold text-right">{phrase.english}</span>
              </div>
              <div className="text-xs text-[var(--sub)] mt-0.5">{phrase.romanization}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Pronunciation Guide */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">Korean Pronunciation Basics</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>Korean Alphabet (한글 Hangeul):</b> Korean uses its own alphabet with 14 consonants and 10 vowels. Unlike Chinese or Japanese, Korean letters represent sounds (phonetic), making it one of the most logical writing systems. You can learn to read Hangeul in just a few hours.</p>
          <p><b>Key Vowel Sounds:</b> ㅏ (a) = &quot;ah&quot;, ㅓ (eo) = &quot;uh&quot;, ㅗ (o) = &quot;oh&quot;, ㅜ (u) = &quot;oo&quot;, ㅡ (eu) = between &quot;uh&quot; and &quot;oo&quot; (no English equivalent), ㅣ (i) = &quot;ee&quot;. Double vowels: ㅐ (ae) = &quot;eh&quot;, ㅔ (e) = &quot;eh&quot; (nearly the same in modern Korean).</p>
          <p><b>Consonant Tips:</b> Korean has aspirated (strong breath) and tense (tight throat) consonants. ㄱ (g/k), ㅋ (k with strong breath), ㄲ (kk tight). Similarly: ㄷ/ㅌ/ㄸ (d/t/tt), ㅂ/ㅍ/ㅃ (b/p/pp), ㅈ/ㅊ/ㅉ (j/ch/jj), ㅅ/ㅆ (s/ss).</p>
          <p><b>Speech Levels:</b> Always use polite endings (-요 or -ㅂ니다) with strangers and elders. 해요체 (informal polite with -요) is safe for most situations. Never use 반말 (casual speech) with people older than you or strangers.</p>
          <p><b>Tips for Learning:</b> Use Naver Dictionary (en.dict.naver.com) for accurate translations. Install the Papago translation app. Watch Korean content with subtitles. Practice at convenience stores and restaurants where interactions are short and predictable. Koreans appreciate any attempt to speak Korean, even if imperfect.</p>
          <p><b>Numbers System:</b> Korea uses two number systems. Native Korean (하나, 둘, 셋) is used for counting items, hours, and age. Sino-Korean (일, 이, 삼) is used for money, phone numbers, dates, minutes, and addresses. This is one of the most confusing aspects for learners but becomes natural with practice.</p>
        </div>
      </Card>
    </>
  );
}
