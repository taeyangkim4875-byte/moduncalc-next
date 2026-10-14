import { describe, it, expect } from 'vitest';
import { eokFromMan, won, wonFromMan, MAN_SUFFIX_EN, MAN_SUFFIX_EN_MONTHLY } from '../krwEn';

describe('eokFromMan', () => {
  /**
   * 회귀: /en/tax-comparison 에서 만원을 100 으로 나눠 억원을 구하고 있었다.
   * 5,000만원(₩50,000,000)이 "50.0억원"으로 100배 크게 표시됐다.
   */
  it('1억 = 10,000만원 환산을 지킨다', () => {
    expect(eokFromMan(10000)).toBe('1억원');
    expect(eokFromMan(5000)).toBe('0.5억원');
    expect(eokFromMan(16500)).toBe('1.65억원');
  });

  it('만원 값을 억원으로 100배 크게 적지 않는다', () => {
    expect(eokFromMan(5000)).not.toBe('50.0억원');
    expect(eokFromMan(5000)).not.toContain('50');
  });

  it('10억 이상은 소수점을 떼고 읽기 쉽게 적는다', () => {
    expect(eokFromMan(100000)).toBe('10억원');
    expect(eokFromMan(500000)).toBe('50억원');
  });
});

describe('won / wonFromMan', () => {
  it('만원 단위를 원 단위로 10,000배 한다', () => {
    expect(wonFromMan(5000)).toBe('₩50,000,000');
    expect(wonFromMan(300)).toBe('₩3,000,000');
  });

  it('원 단위는 그대로 천 단위 구분만 넣는다', () => {
    expect(won(1234567)).toBe('₩1,234,567');
    expect(won(1234.6)).toBe('₩1,235');
  });
});

describe('영문 입력란 접미사', () => {
  /** 영문 독자에게 맨 "만원" 은 정보가 아니므로 원화 금액을 반드시 같이 적는다. */
  it('만원 뒤에 원화 환산을 붙인다', () => {
    expect(MAN_SUFFIX_EN).toContain('₩');
    expect(MAN_SUFFIX_EN_MONTHLY).toContain('₩');
    expect(MAN_SUFFIX_EN_MONTHLY).toContain('/mo');
  });
});
