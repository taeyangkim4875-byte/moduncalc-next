import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { CalculatorJsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from '@/components/SeoContent';
import AcqTaxReverse from './AcqTaxReverse';

export const metadata: Metadata = {
  title: '취득세 예산으로 매수 가능 금액 역산 - 취득세 역방향 계산기',
  description: '준비한 취득세 예산으로 살 수 있는 최대 집값을 역산합니다. 1주택 500만원 예산이면 약 4.5억, 2주택이면 약 5,700만원. 주택 수·면적별 세율 자동 적용.',
  alternates: { canonical: 'https://moduncalc.com/realestate/acqtax/reverse' },
  openGraph: {
    title: '취득세 예산으로 매수 한도 역산하기 (2026)',
    description: '취득세 예산 입력 → 매수 가능 최대 금액 역산. 1~3주택 세율 자동 반영.',
    url: 'https://moduncalc.com/realestate/acqtax/reverse',
  },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="역방향 계산"
      title="취득세 → 매수 한도 역산"
      description="취득세 예산으로 살 수 있는 최대 집값을 역산해 드려요."
    >
      <BreadcrumbJsonLd items={[{ name: '홈', href: '/' }, { name: '부동산', href: '/realestate' }, { name: '취득세', href: '/realestate/acqtax' }, { name: '매수 한도 역산', href: '/realestate/acqtax/reverse' }]} />
      <CalculatorJsonLd
        name="취득세 역방향 계산기"
        description="취득세 예산으로 매수 가능 최대 금액을 역산하세요. 주택 수·면적별 세율 자동 적용."
        url="https://moduncalc.com/realestate/acqtax/reverse"
      />
      <FaqJsonLd items={[
        { q: '취득세 500만원이면 얼마짜리 집을 살 수 있나요?', a: '1주택·85㎡ 이하 기준 약 4억 5천만원입니다. 취득세 1%에 지방교육세 0.1%가 더해져 실질 부담률이 1.1%이기 때문입니다. 2주택이면 약 5,700만원, 3주택 이상이면 약 3,800만원으로 줄어듭니다.' },
        { q: '취득세 예산은 매매가의 몇 %로 잡아야 하나요?', a: '1주택 6억 이하는 1.1%(지방교육세 포함), 6억 초과 9억 이하는 1.1~3.3%, 9억 초과는 3.3%입니다. 85㎡를 넘으면 농어촌특별세 0.2%가 추가됩니다. 2주택은 8.8%, 3주택 이상은 13.2%까지 올라갑니다.' },
        { q: '생애 첫 주택 감면은 반영되나요?', a: '이 계산기는 법정 기본 세율 기준입니다. 생애최초 주택 구입 감면(최대 200만원) 대상이라면 실제로는 더 비싼 집을 살 수 있습니다.' },
      ]} />
      <AcqTaxReverse />

      <SeoSection title="취득세 예산별 매수 가능 금액">
        <p>
          85㎡ 이하(농어촌특별세 없음) 기준으로, <strong>준비한 취득세 예산으로 살 수 있는 최대 매매가</strong>입니다.
          취득세에 지방교육세(취득세의 10%)를 더한 총액 기준입니다.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">취득세 예산</th>
                <th className="text-right p-2 font-bold">1주택</th>
                <th className="text-right p-2 font-bold">2주택</th>
                <th className="text-right p-2 font-bold">3주택 이상</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[var(--line)]"><td className="p-2 font-bold">500만원</td><td className="p-2 text-right">약 4억 5천만원</td><td className="p-2 text-right">약 5,700만원</td><td className="p-2 text-right">약 3,800만원</td></tr>
              <tr className="border-t border-[var(--line)]"><td className="p-2 font-bold">1,000만원</td><td className="p-2 text-right">약 6억 6천만원</td><td className="p-2 text-right">약 1억 1,400만원</td><td className="p-2 text-right">약 7,600만원</td></tr>
              <tr className="border-t border-[var(--line)]"><td className="p-2 font-bold">2,000만원</td><td className="p-2 text-right">약 7억 9천만원</td><td className="p-2 text-right">약 2억 2,700만원</td><td className="p-2 text-right">약 1억 5,200만원</td></tr>
              <tr className="border-t border-[var(--line)]"><td className="p-2 font-bold">3,000만원</td><td className="p-2 text-right">약 9억 1천만원</td><td className="p-2 text-right">약 3억 4,100만원</td><td className="p-2 text-right">약 2억 2,700만원</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          같은 예산으로 <strong>1주택은 4억 5천만원, 2주택은 5,700만원</strong>짜리 집을 살 수 있습니다.
          여덟 배 차이입니다. 두 번째 집을 살지 고민 중이라면 이 숫자부터 확인하는 편이 좋습니다.
        </p>
      </SeoSection>

      <SeoSection title="6억~9억 구간은 세율이 계단식이 아닙니다">
        <p>
          많이 오해하는 부분입니다. 1주택 취득세율은 <strong>6억을 넘는 순간 갑자기 3%가 되는 것이 아니라</strong>,
          6억 초과 9억 이하 구간에서 1%부터 3%까지 연속적으로 올라갑니다.
        </p>
        <SeoFormula>
          <div>6억 이하 : 1%</div>
          <div>6억 초과 9억 이하 : 세율(%) = 매매가(억) × 2/3 − 3</div>
          <div>9억 초과 : 3%</div>
          <div>+ 지방교육세 = 취득세 × 10%</div>
          <div>+ 농어촌특별세 = 매매가 × 0.2% (85㎡ 초과 시에만)</div>
        </SeoFormula>
        <p>
          예를 들어 7억이면 7 × 2/3 − 3 = 1.67%입니다.
          2020년 개정 전에는 6억에서 6억 1원이 되는 순간 세금이 수백만원 뛰는 구조여서
          6억에 맞춘 다운계약이 성행했는데, 이 문제를 없애려고 연속 함수로 바꾼 것입니다.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">매매가</th>
                <th className="text-right p-2 font-bold">1주택 세율</th>
                <th className="text-right p-2 font-bold">1주택 총액</th>
                <th className="text-right p-2 font-bold">2주택 총액</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[var(--line)]"><td className="p-2">3억</td><td className="p-2 text-right">1.00%</td><td className="p-2 text-right">330만원</td><td className="p-2 text-right">2,640만원</td></tr>
              <tr className="border-t border-[var(--line)]"><td className="p-2">5억</td><td className="p-2 text-right">1.00%</td><td className="p-2 text-right">550만원</td><td className="p-2 text-right">4,400만원</td></tr>
              <tr className="border-t border-[var(--line)]"><td className="p-2">6억</td><td className="p-2 text-right">1.00%</td><td className="p-2 text-right">660만원</td><td className="p-2 text-right">5,280만원</td></tr>
              <tr className="border-t border-[var(--line)]"><td className="p-2">7억</td><td className="p-2 text-right">1.67%</td><td className="p-2 text-right">1,283만원</td><td className="p-2 text-right">6,160만원</td></tr>
              <tr className="border-t border-[var(--line)]"><td className="p-2">9억</td><td className="p-2 text-right">3.00%</td><td className="p-2 text-right">2,970만원</td><td className="p-2 text-right">7,920만원</td></tr>
              <tr className="border-t border-[var(--line)]"><td className="p-2">10억</td><td className="p-2 text-right">3.00%</td><td className="p-2 text-right">3,300만원</td><td className="p-2 text-right">8,800만원</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[var(--sub)]">※ 85㎡ 이하 기준(농어촌특별세 제외), 취득세 + 지방교육세 합계</p>
      </SeoSection>

      <SeoSection title="취득세 말고도 더 드는 돈">
        <p>
          취득세 예산만 맞춰두면 잔금 날 자금이 모자랍니다. 집을 살 때 실제로 붙는 부대비용은 다음과 같습니다.
        </p>
        <SeoList>
          <li><strong>취득세 + 지방교육세</strong> — 이 계산기가 다루는 부분입니다.</li>
          <li><strong>농어촌특별세 0.2%</strong> — 전용면적 85㎡를 초과할 때만 붙습니다. 5억이면 100만원입니다.</li>
          <li><strong>중개수수료(복비)</strong> — 거래가 구간별 상한요율 안에서 협의합니다. 5억이면 상한 기준 최대 200만원입니다.</li>
          <li><strong>등기 비용</strong> — 법무사 보수, 국민주택채권 매입 할인액, 인지세를 합쳐 통상 50~100만원입니다.</li>
          <li><strong>대출 부대비용</strong> — 인지세, 감정평가 수수료, 중도상환수수료(중도 상환 시) 등이 추가될 수 있습니다.</li>
        </SeoList>
        <p>
          5억·85㎡ 이하·1주택 기준으로 취득세 550만원에 복비와 등기를 더하면 <strong>800만원 안팎</strong>이 매매가 위에 얹힙니다.
          <SeoLink href="/realestate/registration">등기비용 계산기</SeoLink>와 <SeoLink href="/realestate/commission">복비 계산기</SeoLink>로 나머지도 함께 잡아두세요.
        </p>
      </SeoSection>

      <SeoFaq
        title="취득세, 이런 점도 확인하세요"
        items={[
          { q: '취득세는 언제까지 내야 하나요?', a: '취득일(잔금 지급일과 등기접수일 중 빠른 날)로부터 60일 이내에 신고·납부해야 합니다. 기한을 넘기면 신고불성실가산세 20%와 납부지연가산세가 붙습니다. 보통 등기를 대행하는 법무사가 함께 처리합니다.' },
          { q: '주택 수는 어떻게 계산하나요?', a: '세대 기준입니다. 본인뿐 아니라 세대를 함께 구성하는 배우자·직계존비속이 보유한 주택을 합산합니다. 분양권과 입주권, 주거용 오피스텔도 주택 수에 포함될 수 있습니다. 조합원입주권·분양권의 취득 시점에 따라 판단이 달라지므로 관할 시군구청이나 위택스에서 확인하세요.' },
          { q: '생애최초 감면은 얼마나 받나요?', a: '요건을 충족하면 취득세를 최대 200만원까지 감면받을 수 있습니다. 소득 요건, 주택가격 요건, 실거주 의무가 있으며 요건을 어기면 감면분이 추징됩니다. 이 계산기는 감면 전 기본 세율 기준이므로, 감면 대상이라면 실제 매수 한도는 더 올라갑니다.' },
          { q: '조정대상지역이면 세율이 다른가요?', a: '다주택자 중과 세율 적용에서 조정대상지역 여부가 기준이 되어 왔습니다. 지정 현황과 중과 요건은 정부 대책에 따라 자주 바뀌므로, 계약 직전에 국토교통부 공고와 위택스에서 현재 기준을 반드시 확인하시기 바랍니다.' },
        ]}
      />

      <SeoSection title="함께 쓰면 좋은 계산기">
        <p>
          매매가를 정해두고 취득세를 보려면 <SeoLink href="/realestate/acqtax">취득세 계산기</SeoLink>,
          대출 가능 금액은 <SeoLink href="/loan/dsr">DSR 계산기</SeoLink>,
          월 상환액은 <SeoLink href="/loan">대출 이자 계산기</SeoLink>에서 확인하세요.
          팔 때 세금은 <SeoLink href="/realestate/transfer">양도소득세 계산기</SeoLink>,
          부동산 관련 계산기 전체는 <SeoLink href="/realestate">부동산 계산기 모음</SeoLink>에 모아두었습니다.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
