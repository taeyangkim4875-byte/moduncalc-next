'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

type Purpose = '' | 'work' | 'study' | 'marriage' | 'investment' | 'family';
type JobType = '' | 'english' | 'it' | 'office' | 'other';
type KoreanLevel = '' | 'none' | 'basic' | 'topik3' | 'topik5';
type Duration = '' | 'short' | 'medium' | 'long' | 'permanent';

interface VisaResult {
  code: string;
  name: string;
  duration: string;
  workAllowed: string;
  requirements: string[];
  whereToApply: string;
}

function getRecommendedVisa(purpose: Purpose, jobType: JobType, koreanLevel: KoreanLevel, duration: Duration): VisaResult | null {
  if (!purpose || !duration) return null;

  if (purpose === 'study') {
    return {
      code: 'D-2',
      name: 'Student Visa (유학 비자)',
      duration: '6 months ~ 2 years (renewable)',
      workAllowed: 'Part-time only (20hrs/week during semester)',
      requirements: [
        'Acceptance letter from a Korean university',
        'Proof of financial ability (~$10,000 USD)',
        'Valid passport',
        'Health certificate',
      ],
      whereToApply: 'Korean embassy/consulate in your home country',
    };
  }

  if (purpose === 'marriage') {
    return {
      code: 'F-6',
      name: 'Marriage Visa (결혼이민 비자)',
      duration: '1 year (renewable, path to F-5)',
      workAllowed: 'Yes, unrestricted',
      requirements: [
        'Marriage certificate with Korean spouse',
        'Spouse\'s Korean citizenship proof (가족관계증명서)',
        'Basic Korean ability or proof of completing integration program',
        'Combined household income requirements',
        'Background check from home country',
      ],
      whereToApply: 'Korean embassy/consulate or local immigration office (출입국관리사무소) if already in Korea',
    };
  }

  if (purpose === 'investment') {
    return {
      code: 'D-8 / F-5',
      name: 'Investment Visa (투자 비자)',
      duration: 'D-8: 2 years (renewable) / F-5: permanent',
      workAllowed: 'Yes, for your own business',
      requirements: [
        'Minimum investment of ₩100,000,000 (~$75,000 USD) for D-8',
        'For F-5: investment of ₩500,000,000+ or D-8 for 5+ years',
        'Business registration and plan',
        'Proof of funds (legitimate source)',
      ],
      whereToApply: 'Korean embassy/consulate or local immigration office',
    };
  }

  if (purpose === 'family') {
    if (duration === 'short') {
      return {
        code: 'C-3',
        name: 'Short-term Visit Visa (단기방문 비자)',
        duration: 'Up to 90 days',
        workAllowed: 'No',
        requirements: [
          'Valid passport (6+ months validity)',
          'Return flight ticket',
          'Proof of accommodation',
          'Many nationalities are visa-exempt for 90 days',
        ],
        whereToApply: 'Korean embassy/consulate (or visa-free entry if eligible)',
      };
    }
    return {
      code: 'F-1',
      name: 'Family Visit Visa (방문동거 비자)',
      duration: '1~2 years (renewable)',
      workAllowed: 'Limited (requires separate work permit)',
      requirements: [
        'Proof of family relationship with Korean resident',
        'Sponsor\'s invitation letter and financial guarantee',
        'Valid passport',
        'Background check',
      ],
      whereToApply: 'Korean embassy/consulate in your home country',
    };
  }

  // Work visas
  if (purpose === 'work') {
    if (duration === 'short') {
      return {
        code: 'C-4',
        name: 'Short-term Work Visa (단기취업 비자)',
        duration: 'Up to 90 days',
        workAllowed: 'Yes, for specified activity only',
        requirements: [
          'Employment contract or invitation from Korean company',
          'Proof of qualifications',
          'Valid passport',
        ],
        whereToApply: 'Korean embassy/consulate in your home country',
      };
    }

    if (jobType === 'english') {
      return {
        code: 'E-2',
        name: 'English Teaching Visa (회화지도 비자)',
        duration: '1 year (renewable)',
        workAllowed: 'Yes, at sponsoring institution only',
        requirements: [
          'Bachelor\'s degree (any field)',
          'Citizenship from English-speaking country (US, UK, Canada, Australia, NZ, Ireland, South Africa)',
          'Clean criminal background check (apostilled)',
          'Health check (including drug test)',
          'Sealed university transcripts',
        ],
        whereToApply: 'Korean embassy/consulate in your home country (must apply from passport country)',
      };
    }

    if (koreanLevel === 'topik5' && (duration === 'long' || duration === 'permanent')) {
      return {
        code: 'F-2',
        name: 'Resident Visa - Points System (거주 비자)',
        duration: '3 years (renewable, path to F-5)',
        workAllowed: 'Yes, unrestricted',
        requirements: [
          'Points-based system: need 80+ points out of 120',
          'Categories: age, education, Korean ability, income, experience in Korea',
          'TOPIK score contributes significantly (TOPIK 5+: 20 points)',
          'Annual income above threshold (~₩30,000,000)',
          'Must currently hold valid visa in Korea',
        ],
        whereToApply: 'Local immigration office (출입국관리사무소) in Korea',
      };
    }

    // Default professional work visa
    return {
      code: 'E-7',
      name: 'Professional Work Visa (특정활동 비자)',
      duration: '1~3 years (renewable)',
      workAllowed: 'Yes, at sponsoring company only',
      requirements: [
        'Job offer from Korean company (employer sponsors)',
        'Bachelor\'s degree + relevant work experience (or Master\'s degree)',
        'Employment contract meeting 2026 minimum salary threshold',
        'Company must prove no qualified Korean candidate available',
        'Relevant professional certifications (recommended)',
      ],
      whereToApply: 'Korean embassy/consulate (initial) or immigration office (change of status)',
    };
  }

  return null;
}

export default function VisaCheckCalc() {
  const [step, setStep] = useState(1);
  const [purpose, setPurpose] = useState<Purpose>('');
  const [jobType, setJobType] = useState<JobType>('');
  const [nationality, setNationality] = useState('');
  const [koreanLevel, setKoreanLevel] = useState<KoreanLevel>('');
  const [duration, setDuration] = useState<Duration>('');

  const totalSteps = purpose === 'work' ? 5 : 4;
  const isComplete = purpose && koreanLevel && duration && (purpose !== 'work' || jobType);

  const result = isComplete ? getRecommendedVisa(purpose, jobType, koreanLevel, duration) : null;

  function handlePurpose(val: Purpose) {
    setPurpose(val);
    setJobType('');
    setStep(val === 'work' ? 2 : 3);
  }

  function handleJobType(val: JobType) {
    setJobType(val);
    setStep(3);
  }

  function handleNationality() {
    setStep(purpose === 'work' ? 4 : 4);
  }

  function handleKoreanLevel(val: KoreanLevel) {
    setKoreanLevel(val);
    setStep(purpose === 'work' ? 5 : 5);
  }

  function handleDuration(val: Duration) {
    setDuration(val);
  }

  function reset() {
    setStep(1);
    setPurpose('');
    setJobType('');
    setNationality('');
    setKoreanLevel('');
    setDuration('');
  }

  const btnClass = (active: boolean) =>
    `w-full text-left px-4 py-3 rounded-xl border-[1.5px] font-semibold text-sm transition-all cursor-pointer ${
      active
        ? 'border-[var(--primary)] bg-[var(--primary-weak)] text-[var(--primary-dark)]'
        : 'border-[var(--line)] hover:border-[var(--primary)] text-[#4E5968]'
    }`;

  return (
    <>
      {/* Progress */}
      <Card>
        <div className="flex items-center gap-1 mb-1">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < step ? 'bg-[var(--primary)]' : 'bg-[var(--line)]'}`} />
          ))}
        </div>
        <div className="text-xs text-[var(--sub)] font-bold">Question {Math.min(step, totalSteps)} of {totalSteps}</div>
      </Card>

      {/* Step 1: Purpose */}
      {step >= 1 && (
        <Card>
          <SectionTitle num="1">What is your purpose for coming to Korea?</SectionTitle>
          <div className="flex flex-col gap-2">
            <button className={btnClass(purpose === 'work')} onClick={() => handlePurpose('work')}>Work (취업)</button>
            <button className={btnClass(purpose === 'study')} onClick={() => handlePurpose('study')}>Study (유학)</button>
            <button className={btnClass(purpose === 'marriage')} onClick={() => handlePurpose('marriage')}>Marriage to Korean citizen (결혼)</button>
            <button className={btnClass(purpose === 'investment')} onClick={() => handlePurpose('investment')}>Business / Investment (투자)</button>
            <button className={btnClass(purpose === 'family')} onClick={() => handlePurpose('family')}>Family visit (가족방문)</button>
          </div>
        </Card>
      )}

      {/* Step 2: Job type (only if work) */}
      {step >= 2 && purpose === 'work' && (
        <Card>
          <SectionTitle num="2">What type of work?</SectionTitle>
          <div className="flex flex-col gap-2">
            <button className={btnClass(jobType === 'english')} onClick={() => handleJobType('english')}>English teacher (영어강사)</button>
            <button className={btnClass(jobType === 'it')} onClick={() => handleJobType('it')}>IT / Engineering (IT/엔지니어링)</button>
            <button className={btnClass(jobType === 'office')} onClick={() => handleJobType('office')}>Office worker (사무직)</button>
            <button className={btnClass(jobType === 'other')} onClick={() => handleJobType('other')}>Other professional (기타 전문직)</button>
          </div>
        </Card>
      )}

      {/* Step 3: Nationality */}
      {step >= 3 && (
        <Card>
          <SectionTitle num={purpose === 'work' ? '3' : '2'}>What is your nationality?</SectionTitle>
          <input
            type="text"
            value={nationality}
            onChange={e => setNationality(e.target.value)}
            placeholder="e.g. American, British, Vietnamese..."
            className="w-full py-3 px-4 border-[1.5px] border-[var(--line)] rounded-xl text-sm font-semibold outline-none focus:border-[var(--primary)] mb-2"
          />
          {nationality && (
            <button onClick={handleNationality} className="w-full py-2.5 rounded-xl bg-[var(--primary)] text-white font-bold text-sm">
              Next
            </button>
          )}
        </Card>
      )}

      {/* Step 4: Korean level */}
      {step >= 4 && (
        <Card>
          <SectionTitle num={purpose === 'work' ? '4' : '3'}>Korean language ability?</SectionTitle>
          <div className="flex flex-col gap-2">
            <button className={btnClass(koreanLevel === 'none')} onClick={() => handleKoreanLevel('none')}>None (없음)</button>
            <button className={btnClass(koreanLevel === 'basic')} onClick={() => handleKoreanLevel('basic')}>Basic conversation (기초)</button>
            <button className={btnClass(koreanLevel === 'topik3')} onClick={() => handleKoreanLevel('topik3')}>TOPIK Level 3~4 (중급)</button>
            <button className={btnClass(koreanLevel === 'topik5')} onClick={() => handleKoreanLevel('topik5')}>TOPIK Level 5~6 (고급)</button>
          </div>
        </Card>
      )}

      {/* Step 5: Duration */}
      {step >= 5 && (
        <Card>
          <SectionTitle num={purpose === 'work' ? '5' : '4'}>How long do you plan to stay?</SectionTitle>
          <div className="flex flex-col gap-2">
            <button className={btnClass(duration === 'short')} onClick={() => handleDuration('short')}>Less than 90 days (단기)</button>
            <button className={btnClass(duration === 'medium')} onClick={() => handleDuration('medium')}>1~2 years (중기)</button>
            <button className={btnClass(duration === 'long')} onClick={() => handleDuration('long')}>Long-term, 3+ years (장기)</button>
            <button className={btnClass(duration === 'permanent')} onClick={() => handleDuration('permanent')}>Permanent residency (영주)</button>
          </div>
        </Card>
      )}

      {/* Result */}
      {result && (
        <Card className="!border-2 !border-[var(--primary)]">
          <div className="text-center mb-4">
            <div className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider mb-1">Recommended Visa</div>
            <div className="text-3xl font-extrabold text-[var(--primary-dark)]">{result.code}</div>
            <div className="text-sm font-bold text-[#4E5968]">{result.name}</div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-[var(--bg)] rounded-xl p-3 text-center">
              <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Duration</div>
              <div className="text-xs font-bold mt-1">{result.duration}</div>
            </div>
            <div className="bg-[var(--bg)] rounded-xl p-3 text-center">
              <div className="text-[10px] text-[var(--sub)] font-bold uppercase">Work Allowed?</div>
              <div className="text-xs font-bold mt-1">{result.workAllowed}</div>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-xs font-bold text-[var(--sub)] uppercase mb-2">Key Requirements</div>
            <ul className="text-sm text-[#4E5968] space-y-1.5">
              {result.requirements.map((req, i) => (
                <li key={i} className="flex gap-2"><span className="text-[var(--primary)] flex-none">&#10003;</span>{req}</li>
              ))}
            </ul>
          </div>

          <div className="bg-[var(--bg)] rounded-xl p-3">
            <div className="text-xs font-bold text-[var(--sub)] uppercase mb-1">Where to Apply</div>
            <div className="text-sm text-[#4E5968]">{result.whereToApply}</div>
          </div>

          <button onClick={reset} className="w-full mt-4 py-2.5 rounded-xl border-[1.5px] border-[var(--line)] text-sm font-bold text-[var(--sub)] hover:border-[var(--primary)]">
            Start Over
          </button>
        </Card>
      )}

      {/* Guide */}
      <Card>
        <h2 className="text-base font-extrabold mb-3">Visa Application Process Guide</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>Step 1 - Choose Your Visa:</b> Use the quiz above to determine which visa type fits your situation. Each visa has different requirements and limitations.</p>
          <p><b>Step 2 - Gather Documents:</b> Most visas require a valid passport, application form (Form 34), passport photos, and visa-specific documents. All foreign documents must be apostilled or authenticated.</p>
          <p><b>Step 3 - Apply:</b> Submit your application at the Korean embassy or consulate in your home country. Some visa types allow applying online through HiKorea (hikorea.go.kr). Processing typically takes 5-10 business days.</p>
          <p><b>Step 4 - Get Your ARC (외국인등록증):</b> Within 90 days of arrival, visit your local immigration office (출입국관리사무소) to register and receive your Alien Registration Card. This is your ID in Korea, needed for banking, phone plans, and more.</p>
          <p><b>Visa Renewal Tips:</b> Start renewal at least 30 days before expiration. Prepare updated documents (employment verification, tax records). Late renewal can result in fines or visa cancellation. Check processing times on HiKorea.</p>
          <p><b>2026 Updates:</b> The E-7 visa now requires employers to meet an updated minimum salary threshold. The F-2 points system has been revised with additional weight given to Korean language proficiency and tax payment history.</p>
        </div>
      </Card>
    </>
  );
}
