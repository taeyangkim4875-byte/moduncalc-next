'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

type Category = 'numbers' | 'medical' | 'police' | 'lost-arc' | 'disaster' | 'embassies' | 'phrases';

const EMERGENCY_NUMBERS = [
  { number: '112', label: 'Police (경찰)', desc: 'Crime, theft, assault, traffic accidents', english: true },
  { number: '119', label: 'Fire / Ambulance (소방/구급)', desc: 'Fire, medical emergency, rescue', english: true },
  { number: '1345', label: 'Immigration Helpline (외국인종합안내)', desc: 'Visa, ARC, immigration questions', english: true },
  { number: '1339', label: 'Health Consultation (보건복지콜센터)', desc: 'Medical advice, hospital info, disease info', english: true },
  { number: '1588-0112', label: 'Emergency in English', desc: 'English-speaking emergency assistance', english: true },
  { number: '110', label: 'Government Complaint Center (정부민원)', desc: 'Government services, complaints, inquiries', english: false },
  { number: '120', label: 'Seoul Dasan Call Center (다산콜센터)', desc: 'Seoul city services, transportation, general info', english: true },
  { number: '1350', label: 'Ministry of Justice (법무부)', desc: 'Legal questions, immigration policy', english: false },
];

const PHRASES = [
  { korean: '도와주세요!', romanization: 'Do-wa-ju-se-yo!', english: 'Help me!' },
  { korean: '경찰을 불러주세요', romanization: 'Gyeong-cha-reul bul-leo-ju-se-yo', english: 'Please call the police' },
  { korean: '구급차를 불러주세요', romanization: 'Gu-geup-cha-reul bul-leo-ju-se-yo', english: 'Please call an ambulance' },
  { korean: '아파요', romanization: 'A-pa-yo', english: "I'm sick / It hurts" },
  { korean: '병원에 가야 해요', romanization: 'Byeong-won-e ga-ya hae-yo', english: 'I need to go to the hospital' },
  { korean: '여기가 어디예요?', romanization: 'Yeo-gi-ga eo-di-ye-yo?', english: 'Where is this place?' },
  { korean: '영어 할 수 있는 사람 있어요?', romanization: 'Yeong-eo hal su in-neun sa-ram i-sseo-yo?', english: 'Is there someone who speaks English?' },
  { korean: '불이야!', romanization: 'Bu-ri-ya!', english: 'Fire!' },
  { korean: '도둑이야!', romanization: 'Do-du-gi-ya!', english: 'Thief!' },
  { korean: '알레르기가 있어요', romanization: 'Al-le-reu-gi-ga i-sseo-yo', english: 'I have allergies' },
  { korean: '약국이 어디에 있어요?', romanization: 'Yak-gu-gi eo-di-e i-sseo-yo?', english: 'Where is the pharmacy?' },
  { korean: '대사관에 연락해 주세요', romanization: 'Dae-sa-gwan-e yeol-lak-hae ju-se-yo', english: 'Please contact the embassy' },
];

const EMBASSIES = [
  { country: 'United States', phone: '02-397-4114', address: '188 Sejong-daero, Jongno-gu, Seoul' },
  { country: 'United Kingdom', phone: '02-3210-5500', address: '24 Sejong-daero 19-gil, Jung-gu, Seoul' },
  { country: 'Canada', phone: '02-3783-6000', address: '21 Jeongdong-gil, Jung-gu, Seoul' },
  { country: 'Australia', phone: '02-2003-0100', address: '19F Kyobo Building, Jongno-gu, Seoul' },
  { country: 'Philippines', phone: '02-796-7387', address: '5-1 Itaewon-dong, Yongsan-gu, Seoul' },
];

export default function EmergencyGuide() {
  const [category, setCategory] = useState<Category>('numbers');

  const tabClass = (active: boolean) =>
    `px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
      active
        ? 'bg-[var(--primary)] text-white'
        : 'bg-[var(--bg)] text-[#4E5968] hover:bg-[var(--primary-weak)]'
    }`;

  return (
    <>
      {/* Category Tabs */}
      <Card>
        <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
          <button className={tabClass(category === 'numbers')} onClick={() => setCategory('numbers')}>Emergency #</button>
          <button className={tabClass(category === 'medical')} onClick={() => setCategory('medical')}>Medical</button>
          <button className={tabClass(category === 'police')} onClick={() => setCategory('police')}>Police</button>
          <button className={tabClass(category === 'lost-arc')} onClick={() => setCategory('lost-arc')}>Lost ARC</button>
          <button className={tabClass(category === 'disaster')} onClick={() => setCategory('disaster')}>Disaster</button>
          <button className={tabClass(category === 'embassies')} onClick={() => setCategory('embassies')}>Embassies</button>
          <button className={tabClass(category === 'phrases')} onClick={() => setCategory('phrases')}>Phrases</button>
        </div>
      </Card>

      {/* Emergency Numbers */}
      {category === 'numbers' && (
        <Card>
          <SectionTitle num="1">Emergency Numbers (긴급 전화번호)</SectionTitle>
          <div className="flex flex-col gap-2">
            {EMERGENCY_NUMBERS.map(item => (
              <a
                key={item.number}
                href={`tel:${item.number}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border-[1.5px] border-[var(--line)] hover:border-[var(--primary)] transition-all no-underline"
              >
                <div className="w-14 h-10 rounded-lg bg-[var(--primary-weak)] text-[var(--primary)] font-extrabold text-lg grid place-items-center flex-none">
                  {item.number}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-[#333]">{item.label}</div>
                  <div className="text-xs text-[var(--sub)]">{item.desc}</div>
                </div>
                {item.english && (
                  <span className="text-[9px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded-md flex-none">EN</span>
                )}
              </a>
            ))}
          </div>
          <p className="text-xs text-[var(--sub)] mt-3">Tap any number to call directly. Numbers marked <span className="font-bold text-green-700">EN</span> have English-speaking operators.</p>
        </Card>
      )}

      {/* Medical */}
      {category === 'medical' && (
        <Card>
          <SectionTitle num="1">Medical Emergencies (응급 의료)</SectionTitle>
          <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
            <p><b>Call 119 for an ambulance.</b> It is free in Korea. Say your location clearly. If you cannot speak Korean, say "English please" and they will connect you to a translator or transfer you to 1339.</p>
            <p><b>International Clinics:</b> Major hospitals in Seoul have international clinics with English-speaking staff. Key options include:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Severance Hospital International Health Care Center (세브란스병원)</li>
              <li>Samsung Medical Center International Clinic (삼성서울병원)</li>
              <li>Seoul National University Hospital (서울대병원)</li>
              <li>Asan Medical Center (서울아산병원)</li>
              <li>Inha University Hospital (인하대병원) - Incheon area</li>
            </ul>
            <p><b>At the Emergency Room (응급실):</b> Bring your ARC (외국인등록증) and health insurance card. You will be triaged by severity. Payment is required after treatment - bring a credit card. ER copay with insurance is around ₩15,000-60,000 depending on the hospital level. Without insurance, costs can be ₩100,000-500,000+.</p>
            <p><b>Pharmacies (약국):</b> Prescription medicines require a doctor&apos;s prescription. Over-the-counter medicines (pain relievers, cold medicine) can be bought without prescription. Most pharmacies close by 7-8 PM but 24-hour pharmacies exist near major hospitals.</p>
            <p><b>Health Consultation (1339):</b> Call 1339 for non-emergency medical questions, hospital referrals, and health information in English. Available 24/7.</p>
          </div>
        </Card>
      )}

      {/* Police */}
      {category === 'police' && (
        <Card>
          <SectionTitle num="1">Filing a Police Report (경찰 신고)</SectionTitle>
          <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
            <p><b>Call 112 for police.</b> For emergencies, call immediately. For non-emergencies, visit the nearest police station (경찰서) or police box (파출소). English interpretation is available by phone through 112.</p>
            <p><b>Filing a Report as a Foreigner:</b></p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Bring your passport or ARC (외국인등록증)</li>
              <li>Explain the situation - an interpreter can be arranged if needed</li>
              <li>You will receive a case number (사건번호) and report receipt (신고접수증)</li>
              <li>For theft, get a theft report (도난신고서) - needed for insurance claims</li>
              <li>Request an English copy of the report if needed</li>
            </ol>
            <p><b>Common Situations:</b></p>
            <ul className="list-disc pl-5 space-y-1">
              <li><b>Theft/Pickpocketing:</b> File report at police station. Check nearby CCTV areas. Korea has extensive CCTV coverage which helps recovery.</li>
              <li><b>Traffic Accident:</b> Call 112, do not move vehicles until police arrive. Take photos. Exchange insurance information.</li>
              <li><b>Harassment:</b> Korea has specific laws protecting against stalking (스토킹) and harassment. Report immediately.</li>
              <li><b>Scams:</b> Report to the Cyber Crime Investigation Unit or call 182 for reporting.</li>
            </ul>
            <p><b>Tip:</b> In Korea, police response time in urban areas is typically 3-5 minutes. Police boxes (파출소) are located in most neighborhoods and subway stations.</p>
          </div>
        </Card>
      )}

      {/* Lost ARC */}
      {category === 'lost-arc' && (
        <Card>
          <SectionTitle num="1">Lost ARC - What to Do (외국인등록증 분실)</SectionTitle>
          <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
            <p><b>Step 1:</b> Report the loss at the nearest police station (경찰서). Get a loss report (분실신고서). You can also report online.</p>
            <p><b>Step 2:</b> Within 14 days, visit your local immigration office (출입국관리사무소). Bring:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Passport (여권)</li>
              <li>Passport-size photo (3.5cm x 4.5cm)</li>
              <li>Police loss report (분실신고서)</li>
              <li>Reissue fee: ₩30,000</li>
              <li>Application form (available at the office)</li>
            </ul>
            <p><b>Step 3:</b> Processing takes about 2-3 weeks. You will receive a receipt as temporary ID.</p>
            <p><b>Online Option:</b> You can start the process on HiKorea (hikorea.go.kr) under &quot;Alien Registration Card Reissue.&quot; Book an appointment to avoid long wait times.</p>
            <p><b>Important:</b> Without your ARC, you cannot use many Korean services (banking, phone contracts, etc.). Your passport serves as temporary ID until the new ARC is issued. Failure to report and reapply within 14 days may result in a fine of up to ₩1,000,000.</p>
          </div>
        </Card>
      )}

      {/* Natural Disaster */}
      {category === 'disaster' && (
        <Card>
          <SectionTitle num="1">Natural Disaster Alerts (재난 안내)</SectionTitle>
          <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
            <p><b>Emergency Alerts (안전 안내 문자):</b> All phones in Korea receive emergency text alerts automatically. These are in Korean but you can use your phone&apos;s translation feature. Common alerts include typhoon warnings (태풍), heavy rain (호우), earthquake (지진), fine dust (미세먼지), and extreme heat/cold.</p>
            <p><b>How to Read Alert Types:</b></p>
            <ul className="list-disc pl-5 space-y-1">
              <li><b>긴급재난문자:</b> Urgent disaster alert (high priority)</li>
              <li><b>안전안내문자:</b> Safety information (lower priority)</li>
              <li><b>태풍:</b> Typhoon - stay indoors, avoid rivers/coast</li>
              <li><b>호우:</b> Heavy rain - watch for flooding, avoid underground areas</li>
              <li><b>지진:</b> Earthquake - move to open areas or under sturdy furniture</li>
              <li><b>폭염:</b> Extreme heat - stay hydrated, seek air-conditioned spaces</li>
            </ul>
            <p><b>Evacuation Shelters:</b> Every neighborhood has designated shelters. Subway stations double as emergency shelters. Check the SafeKorea app or website (safekorea.go.kr) for nearest shelter locations.</p>
            <p><b>Useful Apps:</b> Install &quot;Emergency Ready App&quot; (안전디딤돌) by the Ministry of the Interior for real-time disaster info in English. The app shows shelter locations, weather alerts, and emergency contacts.</p>
          </div>
        </Card>
      )}

      {/* Embassies */}
      {category === 'embassies' && (
        <Card>
          <SectionTitle num="1">Embassy Contacts (대사관 연락처)</SectionTitle>
          <div className="flex flex-col gap-2">
            {EMBASSIES.map(embassy => (
              <div key={embassy.country} className="px-4 py-3 rounded-xl border-[1.5px] border-[var(--line)]">
                <div className="text-sm font-bold text-[#333]">{embassy.country}</div>
                <div className="text-xs text-[var(--sub)] mt-0.5">{embassy.address}</div>
                <a href={`tel:${embassy.phone}`} className="text-sm font-bold text-[var(--primary)] mt-1 inline-block">{embassy.phone}</a>
              </div>
            ))}
          </div>
          <p className="text-xs text-[var(--sub)] mt-3">Contact your embassy for passport replacement, legal assistance, or emergencies involving citizens abroad. Most embassies have 24-hour emergency lines.</p>
        </Card>
      )}

      {/* Emergency Korean Phrases */}
      {category === 'phrases' && (
        <Card>
          <SectionTitle num="1">Emergency Korean Phrases (긴급 한국어 표현)</SectionTitle>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--line)]">
                  <th className="text-left py-2 px-2 text-xs font-bold text-[var(--sub)]">Korean</th>
                  <th className="text-left py-2 px-2 text-xs font-bold text-[var(--sub)]">Pronunciation</th>
                  <th className="text-left py-2 px-2 text-xs font-bold text-[var(--sub)]">English</th>
                </tr>
              </thead>
              <tbody>
                {PHRASES.map((phrase, i) => (
                  <tr key={i} className="border-b border-[var(--line)] last:border-0">
                    <td className="py-2.5 px-2 font-bold text-[#333]">{phrase.korean}</td>
                    <td className="py-2.5 px-2 text-[var(--sub)] text-xs">{phrase.romanization}</td>
                    <td className="py-2.5 px-2 text-[#4E5968]">{phrase.english}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Guide */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">How the Korean Emergency System Works</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>Calling 119 (Fire/Ambulance):</b> When you call 119, state your location clearly (address or nearby landmark). Dispatchers will ask for the nature of the emergency. Ambulances are free and typically arrive within 5-8 minutes in urban areas. You will be taken to the nearest hospital unless you request a specific one.</p>
          <p><b>Hospital Emergency Rooms (응급실):</b> Korean ERs follow a triage system. Severe cases are seen immediately. Wait times for non-critical cases can be 1-3 hours. Bring your ARC and insurance card. Payment is collected after treatment. Most major hospital ERs operate 24/7.</p>
          <p><b>Language Support:</b> Many emergency dispatchers speak basic English, but having key Korean phrases ready helps significantly. The 1588-0112 line specifically provides English emergency assistance. You can also use the BBB Korea (1588-5644) volunteer interpretation service for non-emergency situations.</p>
          <p><b>Insurance Matters:</b> If you are enrolled in National Health Insurance (국민건강보험), emergency treatment is covered at 70-80%. Without insurance, you pay 100% out of pocket. Keep your insurance card with you at all times. Foreign visitors should consider travel insurance that covers medical emergencies in Korea.</p>
        </div>
      </Card>
    </>
  );
}
