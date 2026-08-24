import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import MapClient from './MapClient';

export const metadata: Metadata = {
  title: '계산기 연결 지도 - 모든계산',
  description:
    '모든계산의 계산기들이 어떻게 연결되는지 한눈에 확인하세요. 연봉→세금, BMI→기초대사량 등 자연스러운 계산 여정을 따라갈 수 있습니다.',
  alternates: { canonical: 'https://moduncalc.com/map' },
};

export default function MapPage() {
  return (
    <PageLayout
      eyebrow="모든계산"
      title="계산기 연결 지도"
      description="계산기끼리 어떻게 연결되는지 확인하세요"
    >
      <MapClient />
    </PageLayout>
  );
}
