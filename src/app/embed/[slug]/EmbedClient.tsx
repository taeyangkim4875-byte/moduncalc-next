'use client';

import dynamic from 'next/dynamic';

const CALC_MAP: Record<string, ReturnType<typeof dynamic>> = {
  loan: dynamic(() => import('@/app/loan/LoanCalculator')),
  salary: dynamic(() => import('@/app/salary/SalaryCalculator')),
  bmi: dynamic(() => import('@/app/health/bmi/BmiCalculator')),
  bmr: dynamic(() => import('@/app/health/bmr/BmrCalculator')),
  bodyfat: dynamic(() => import('@/app/health/bodyfat/BodyFatCalc')),
  'pension-nps': dynamic(() => import('@/app/pension/nps/PensionCalculator')),
  'pension-jobless': dynamic(() => import('@/app/pension/jobless/JoblessCalculator')),
  acqtax: dynamic(() => import('@/app/realestate/acqtax/AcqTaxCalc')),
  commission: dynamic(() => import('@/app/realestate/commission/CommissionCalc')),
  convert: dynamic(() => import('@/app/realestate/convert/ConvertCalc')),
  'tax-income': dynamic(() => import('@/app/tax/income/IncomeTaxCalc')),
  'tax-eitc': dynamic(() => import('@/app/tax/eitc/EitcCalc')),
  'tax-property': dynamic(() => import('@/app/tax/property/PropertyTaxCalc')),
  'salary-insurance': dynamic(() => import('@/app/salary/insurance/InsuranceCalc')),
};

export default function EmbedClient({ slug }: { slug: string }) {
  const Calc = CALC_MAP[slug];

  if (!Calc) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', color: '#8B95A1' }}>
        <div style={{ fontSize: '16px', fontWeight: 700 }}>계산기를 찾을 수 없습니다</div>
        <div style={{ fontSize: '13px', marginTop: '8px' }}>
          사용 가능한 계산기: {Object.keys(CALC_MAP).join(', ')}
        </div>
      </div>
    );
  }

  return <Calc />;
}
