import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { FaqJsonLd, CalculatorJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import { SeoSection, SeoFaq, SeoFormula, SeoList, SeoLink } from '@/components/SeoContent';
import HolidayPayCalc from './HolidayPayCalc';
import { SMALL_WORKPLACE_APPLIES, SMALL_WORKPLACE_EXEMPT } from '@/data/labor';

export const metadata: Metadata = {
  title: '주휴수당 계산기 - 받을 수 있는지 조건부터 확인',
  description:
    '주 15시간 이상 개근하면 주휴수당 대상입니다. 시급과 근무시간을 넣으면 지급 대상인지, 안 되면 왜 안 되는지 알려드려요. 주휴시간 8시간 상한, 쪼개기 계약, 5인 미만 사업장까지.',
  alternates: { canonical: 'https://moduncalc.com/salary/holiday-pay' },
  openGraph: {
    title: '주휴수당 계산기 - 받을 수 있는지 조건부터 확인',
    description: '주 15시간 이상 개근 시 지급. 지급 대상 여부와 사유, 주휴수당 금액, 실질 시급까지 한 번에.',
    url: 'https://moduncalc.com/salary/holiday-pay',
  },
};

export default function Page() {
  return (
    <PageLayout
      eyebrow="사장님·알바 모두"
      title="주휴수당 계산기"
      description="받을 수 있는지부터 판정하고, 금액과 실질 시급까지 계산해 드려요."
    >
      <BreadcrumbJsonLd
        items={[
          { name: '홈', href: '/' },
          { name: '연봉', href: '/salary' },
          { name: '주휴수당', href: '/salary/holiday-pay' },
        ]}
      />
      <CalculatorJsonLd
        name="주휴수당 계산기"
        description="1주 소정근로시간과 개근 여부로 주휴수당 지급 대상인지 판정하고 금액을 계산합니다."
        url="https://moduncalc.com/salary/holiday-pay"
      />
      <FaqJsonLd
        items={[
          {
            q: '주휴수당은 누가 받을 수 있나요?',
            a: '1주 소정근로시간이 15시간 이상이고 그 주의 소정근로일을 개근한 근로자입니다. 정규직·계약직·아르바이트 구분이 없고, 5인 미만 사업장에도 똑같이 적용됩니다. 외국인 근로자도 같습니다.',
          },
          {
            q: '주휴수당은 어떻게 계산하나요?',
            a: '주휴시간 = (1주 소정근로시간 ÷ 40) × 8시간이고, 여기에 시급을 곱합니다. 주휴시간은 최대 8시간입니다. 주 20시간 일하면 주휴시간은 4시간이고, 2026년 최저시급 10,320원 기준 주휴수당은 41,280원입니다.',
          },
          {
            q: '주 40시간 넘게 일하면 주휴수당도 더 받나요?',
            a: '아닙니다. 소정근로시간은 1일 8시간·1주 40시간을 넘을 수 없어서(근로기준법 제50조) 주휴시간은 8시간에서 멈춥니다. 주 48시간을 일해도 주휴시간은 8시간입니다. 40시간을 넘는 부분은 주휴가 아니라 연장근로수당으로 따로 계산합니다.',
          },
          {
            q: '주 14시간으로 계약하면 주휴수당을 안 줘도 되나요?',
            a: '소정근로시간이 실제로 주 14시간이라면 법적으로는 지급 의무가 없습니다. 다만 계약서만 14시간이고 실제로는 매주 15시간 이상 일했다면 실질에 따라 판단하므로 주휴수당이 발생할 수 있습니다. 4주를 평균해 1주 15시간 이상인지를 봅니다.',
          },
          {
            q: '결근하면 그 주 주휴수당은 어떻게 되나요?',
            a: '그 주에 한해 발생하지 않습니다. 다만 지각이나 조퇴는 결근이 아니므로 주휴수당에 영향을 주지 않습니다. 연차휴가를 쓴 날은 출근한 것으로 봅니다.',
          },
          {
            q: '5인 미만 사업장도 주휴수당을 줘야 하나요?',
            a: '네. 주휴수당은 5인 미만 사업장에도 적용됩니다. 5인 미만이 면제되는 것은 연장·야간·휴일 가산수당, 연차유급휴가, 주 52시간 상한, 부당해고 구제신청이며 주휴수당은 여기에 포함되지 않습니다.',
          },
        ]}
      />

      <HolidayPayCalc />

      <SeoSection title="주휴수당이란">
        <p>
          근로기준법 제55조는 사용자가 근로자에게 <strong>1주에 평균 1회 이상의 유급휴일</strong>을 주도록 하고 있습니다.
          이 유급휴일에 지급하는 임금이 주휴수당입니다. 일하지 않은 하루치 임금을 추가로 받는 셈입니다.
        </p>
        <p>
          핵심은 <strong>&lsquo;유급&rsquo;</strong>이라는 점입니다. 쉬는 날을 주는 것만으로는 부족하고 그날의 임금까지 줘야 합니다.
          법정 수당이라 주지 않으면 임금 체불이고, 당사자가 합의해도 포기시킬 수 없습니다.
        </p>
      </SeoSection>

      <SeoSection title="지급 요건은 두 가지뿐입니다">
        <SeoList>
          <li>
            <strong>1주 소정근로시간 15시간 이상</strong> — 소정근로시간은 계약으로 정한 근로시간입니다.
            연장근로는 포함하지 않습니다. 주 15시간 미만인 초단시간 근로자는 주휴수당뿐 아니라
            연차와 퇴직금도 적용되지 않습니다(근로기준법 제18조 제3항).
          </li>
          <li>
            <strong>그 주의 소정근로일 개근</strong> — 정해진 근무일에 모두 출근해야 합니다.
            <strong>지각·조퇴는 결근이 아닙니다.</strong> 1분이라도 출근했다면 개근으로 봅니다.
            연차휴가를 사용한 날도 출근한 것으로 처리합니다.
          </li>
        </SeoList>
        <p>
          고용형태는 요건이 아닙니다. 정규직·계약직·아르바이트·일용직 구분 없이, 외국인 근로자도 동일하게 적용됩니다.
          <strong> 사업장 규모도 요건이 아닙니다.</strong> 직원이 한 명뿐인 가게도 줘야 합니다.
        </p>
      </SeoSection>

      <SeoSection title="계산 공식">
        <SeoFormula>
          <div>주휴시간 = (1주 소정근로시간 ÷ 40) × 8시간 &nbsp;(최대 8시간)</div>
          <div>주휴수당 = 주휴시간 × 시급</div>
          <div>1개월 평균 주수 = 365 ÷ 7 ÷ 12 = 4.3452주</div>
          <div>월 환산 = (1주 소정근로시간 + 주휴시간) × 4.3452 × 시급</div>
        </SeoFormula>
        <p>
          주휴시간에 <strong>8시간 상한</strong>이 있다는 점을 놓치기 쉽습니다.
          소정근로시간은 1일 8시간, 1주 40시간을 넘을 수 없으므로(근로기준법 제50조)
          주 48시간을 일해도 주휴시간은 8시간입니다. 상한을 적용하지 않고 (48÷40)×8 = 9.6시간으로 계산하면
          과다 계산이 됩니다. 40시간을 넘는 부분은 주휴가 아니라 <strong>연장근로</strong>로 따로 처리해야 합니다.
        </p>
      </SeoSection>

      <SeoSection title="계산 예시 세 가지">
        <p>2026년 최저시급 10,320원 기준입니다.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">근무 조건</th>
                <th className="text-right p-2 font-bold">주휴시간</th>
                <th className="text-right p-2 font-bold">주휴수당(주)</th>
                <th className="text-right p-2 font-bold">실질 시급</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[var(--line)]">
                <td className="p-2">주 3일 × 6시간 = 18시간</td>
                <td className="p-2 text-right">3.6시간</td>
                <td className="p-2 text-right font-bold">37,152원</td>
                <td className="p-2 text-right">12,384원</td>
              </tr>
              <tr className="border-t border-[var(--line)]">
                <td className="p-2">주 5일 × 4시간 = 20시간</td>
                <td className="p-2 text-right">4시간</td>
                <td className="p-2 text-right font-bold">41,280원</td>
                <td className="p-2 text-right">12,384원</td>
              </tr>
              <tr className="border-t border-[var(--line)]">
                <td className="p-2">주 5일 × 8시간 = 40시간</td>
                <td className="p-2 text-right">8시간</td>
                <td className="p-2 text-right font-bold">82,560원</td>
                <td className="p-2 text-right">12,384원</td>
              </tr>
              <tr className="border-t border-[var(--line)]">
                <td className="p-2">주 6일 × 8시간 = 48시간</td>
                <td className="p-2 text-right">8시간 <span className="text-[#B86E00] font-bold">(상한)</span></td>
                <td className="p-2 text-right font-bold">82,560원</td>
                <td className="p-2 text-right">12,040원</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          15시간 이상 40시간 이하 구간에서는 <strong>실질 시급이 시급의 정확히 1.2배</strong>가 됩니다.
          40시간 일하고 48시간분을 받기 때문입니다(48 ÷ 40 = 1.2).
          40시간을 넘기면 주휴시간이 고정되므로 실질 시급 배수가 오히려 떨어집니다.
        </p>
      </SeoSection>

      <SeoSection title="사장님이 자주 틀리는 부분">
        <p>
          주휴수당은 <strong>5인 미만 사업장에도 적용됩니다.</strong> 직원 수를 이유로 거절할 수 없습니다.
          5인 미만이 면제되는 항목과 그렇지 않은 항목을 구분해 두면 분쟁을 줄일 수 있습니다.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="text-left p-2 font-bold">5인 미만 사업장</th>
                <th className="text-left p-2 font-bold">항목</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[var(--line)]">
                <td className="p-2 font-bold text-[var(--green)] whitespace-nowrap">적용됨</td>
                <td className="p-2">{SMALL_WORKPLACE_APPLIES.join(' · ')}</td>
              </tr>
              <tr className="border-t border-[var(--line)]">
                <td className="p-2 font-bold text-[#E5484D] whitespace-nowrap">적용 안 됨</td>
                <td className="p-2">{SMALL_WORKPLACE_EXEMPT.join(' · ')}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[var(--sub)]">
          근로기준법 제11조 및 같은 법 시행령 제7조 [별표 1]. 상시 근로자 수는 특정 시점이 아니라
          일정 기간의 평균으로 산정하며, 정기적으로 일하는 단시간 근로자도 포함됩니다.
        </p>
        <p>
          <strong>이번 계산기는 가산수당을 계산하지 않습니다.</strong> 5인 이상 사업장이라면
          연장·야간·휴일 근로에 통상임금의 50%가 가산되는데, 이는 주휴수당과 별개로 계산해야 합니다.
          시간대별 수당은 <SeoLink href="/daily/time">시간 계산기</SeoLink>에서 확인하세요.
        </p>
      </SeoSection>

      <SeoFaq
        title="자주 묻는 질문"
        items={[
          {
            q: '주 14시간으로 쪼개서 계약하면 안 줘도 되나요?',
            a: '소정근로시간이 실제로 주 14시간이라면 법적으로는 지급 의무가 없습니다. 다만 계약서만 14시간이고 실제로는 매주 15시간 이상 일했다면 계약서가 아니라 실질에 따라 판단합니다. 보통 4주를 평균해 1주 소정근로시간이 15시간 이상인지를 봅니다. 또 여러 날로 쪼개 근로계약을 나눠도 같은 사용자 아래 계속 근로라면 합산될 수 있습니다. 출퇴근 기록을 남겨두는 것이 중요합니다.',
          },
          {
            q: '월급제인데 주휴수당이 따로 안 찍혀 있어요.',
            a: '월급제는 주휴수당이 월급에 포함된 것으로 보는 경우가 일반적입니다. 확인 방법은 간단합니다. 월급을 209시간으로 나눈 값이 최저시급 이상이면 주휴수당이 포함된 것으로 볼 수 있습니다. 209시간은 (주 40시간 + 주휴 8시간) × 4.3452주를 반올림한 숫자이고, 이미 주휴시간이 들어가 있습니다. 반대로 월급을 174시간(40시간 × 4.3452)으로 나눠 계산하고 있다면 주휴수당이 빠진 것입니다.',
          },
          {
            q: '주휴수당을 안 주면 어떻게 하나요?',
            a: '주휴수당 미지급은 임금 체불입니다. 먼저 사업주에게 서면(문자·메일도 가능)으로 지급을 요청해 기록을 남기고, 해결되지 않으면 고용노동부에 진정을 넣습니다. 노동포털에서 온라인 접수가 가능하고 관할 지청 방문도 됩니다. 임금 채권의 소멸시효는 3년이라 이미 퇴사했어도 3년 이내분은 청구할 수 있습니다. 상담은 고용노동부 ☎ 1350에서 익명으로도 받을 수 있습니다.',
          },
          {
            q: '퇴사하는 주의 주휴수당은 받나요?',
            a: '주휴수당은 그 주의 소정근로일을 개근하고 다음 주에도 근로관계가 이어지는 것을 전제로 보는 것이 행정해석입니다. 그래서 마지막 주에 퇴사하면 그 주 주휴수당은 발생하지 않는 것으로 처리되는 경우가 많습니다. 다만 사안에 따라 판단이 갈리는 영역이라 금액이 크면 노무사 상담을 권합니다.',
          },
          {
            q: '주휴수당도 4대보험과 세금을 떼나요?',
            a: '네. 주휴수당은 임금이므로 4대보험료와 소득세 산정 기준에 포함됩니다. 다만 3.3% 원천징수로 처리되는 프리랜서 계약이라면 애초에 근로자가 아니라는 전제이므로 주휴수당도 발생하지 않습니다. 실질이 근로자인데 3.3%로 처리되고 있다면 근로자성 판단을 다퉈볼 수 있습니다.',
          },
          {
            q: '주휴수당은 최저임금 계산에 들어가나요?',
            a: '월급이 최저임금에 미달하는지 볼 때는 월 소정근로시간 209시간으로 나누는데, 이 209시간에 주휴시간이 이미 포함되어 있습니다. 즉 주휴수당을 포함한 금액을 주휴시간을 포함한 시간으로 나누는 구조라 양쪽에 함께 들어갑니다.',
          },
        ]}
      />

      <SeoSection title="함께 쓰면 좋은 계산기">
        <p>
          연도별 최저시급과 수습 감액까지 보려면 <SeoLink href="/salary/minimum">최저시급 계산기</SeoLink>를,
          근무시간과 야간·연장 가산수당은 <SeoLink href="/daily/time">시간 계산기</SeoLink>에서 계산할 수 있습니다.
          1년 이상 근무했다면 <SeoLink href="/salary/severance">퇴직금 계산기</SeoLink>와
          <SeoLink href="/salary/annual"> 연차 계산기</SeoLink>도 확인해 보세요.
          4대보험 공제 후 실수령액은 <SeoLink href="/salary">연봉 실수령액 계산기</SeoLink>에서 볼 수 있고,
          제도 전반은 <SeoLink href="/guide/minimum-wage">2026 최저시급 완전 정리</SeoLink>에 정리해 두었습니다.
        </p>
      </SeoSection>
    </PageLayout>
  );
}
