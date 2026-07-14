'use client';

import { useState } from 'react';
import Card, { SectionTitle } from '@/components/Card';

type Category = 'fruits' | 'vegetables' | 'meat' | 'dairy' | 'drinks' | 'snacks';

interface GroceryItem {
  name: string;
  kr: string;
  unit: string;
  low: number;
  high: number;
  cheapest: string;
  category: Category;
}

const ITEMS: GroceryItem[] = [
  // Fruits
  { name: 'Apples', kr: '사과', unit: '1 ea', low: 2000, high: 3000, cheapest: 'Market', category: 'fruits' },
  { name: 'Bananas', kr: '바나나', unit: 'bunch', low: 3000, high: 5000, cheapest: 'Supermarket', category: 'fruits' },
  { name: 'Strawberries', kr: '딸기', unit: 'pack', low: 5000, high: 8000, cheapest: 'Market', category: 'fruits' },
  { name: 'Watermelon', kr: '수박', unit: '1 ea', low: 12000, high: 20000, cheapest: 'Market', category: 'fruits' },
  { name: 'Mandarin Oranges', kr: '귤', unit: '1 kg', low: 3000, high: 6000, cheapest: 'Coupang', category: 'fruits' },
  { name: 'Grapes', kr: '포도', unit: 'bunch', low: 5000, high: 10000, cheapest: 'Market', category: 'fruits' },
  // Vegetables
  { name: 'Rice (10kg)', kr: '쌀', unit: '10 kg', low: 25000, high: 40000, cheapest: 'Coupang', category: 'vegetables' },
  { name: 'Onions', kr: '양파', unit: '3 ea', low: 1500, high: 3000, cheapest: 'Market', category: 'vegetables' },
  { name: 'Kimchi', kr: '김치', unit: '1 kg', low: 5000, high: 10000, cheapest: 'Market', category: 'vegetables' },
  { name: 'Garlic', kr: '마늘', unit: '1 pack', low: 3000, high: 6000, cheapest: 'Market', category: 'vegetables' },
  { name: 'Green Onions', kr: '대파', unit: 'bunch', low: 1000, high: 2500, cheapest: 'Market', category: 'vegetables' },
  { name: 'Tofu', kr: '두부', unit: '1 pack', low: 1500, high: 2500, cheapest: 'Supermarket', category: 'vegetables' },
  // Meat
  { name: 'Chicken Breast', kr: '닭가슴살', unit: '1 kg', low: 6000, high: 8000, cheapest: 'Coupang', category: 'meat' },
  { name: 'Pork Belly', kr: '삼겹살', unit: '1 kg', low: 15000, high: 20000, cheapest: 'Supermarket', category: 'meat' },
  { name: 'Beef (Korean)', kr: '한우', unit: '1 kg', low: 30000, high: 50000, cheapest: 'Market', category: 'meat' },
  { name: 'Imported Beef', kr: '수입소고기', unit: '1 kg', low: 15000, high: 25000, cheapest: 'Coupang', category: 'meat' },
  { name: 'Pork Loin', kr: '돼지 등심', unit: '1 kg', low: 10000, high: 14000, cheapest: 'Supermarket', category: 'meat' },
  // Dairy
  { name: 'Milk (1L)', kr: '우유', unit: '1 L', low: 2500, high: 3500, cheapest: 'Supermarket', category: 'dairy' },
  { name: 'Eggs (30-pack)', kr: '계란', unit: '30 ea', low: 5000, high: 7000, cheapest: 'Coupang', category: 'dairy' },
  { name: 'Yogurt (pack)', kr: '요거트', unit: '4 ea', low: 3000, high: 5000, cheapest: 'Supermarket', category: 'dairy' },
  { name: 'Cheese Slices', kr: '슬라이스 치즈', unit: '10 ea', low: 3000, high: 5000, cheapest: 'Supermarket', category: 'dairy' },
  // Drinks
  { name: 'Soju', kr: '소주', unit: '360 ml', low: 1800, high: 2500, cheapest: 'Convenience Store', category: 'drinks' },
  { name: 'Beer (500ml)', kr: '맥주', unit: '500 ml', low: 2500, high: 4000, cheapest: 'Supermarket', category: 'drinks' },
  { name: 'Coffee (cafe)', kr: '카페 커피', unit: '1 cup', low: 4500, high: 6000, cheapest: 'Cafe', category: 'drinks' },
  { name: 'Bottled Water (2L)', kr: '생수', unit: '2 L', low: 800, high: 1500, cheapest: 'Coupang', category: 'drinks' },
  { name: 'Instant Coffee (100)', kr: '믹스커피', unit: '100 sticks', low: 10000, high: 15000, cheapest: 'Coupang', category: 'drinks' },
  // Snacks
  { name: 'Ramen (5-pack)', kr: '라면', unit: '5 ea', low: 3000, high: 5000, cheapest: 'Supermarket', category: 'snacks' },
  { name: 'Chips', kr: '과자', unit: '1 bag', low: 1500, high: 3000, cheapest: 'Convenience Store', category: 'snacks' },
  { name: 'Ice Cream Bar', kr: '아이스크림', unit: '1 ea', low: 1000, high: 2500, cheapest: 'Convenience Store', category: 'snacks' },
  { name: 'Bread (loaf)', kr: '식빵', unit: '1 loaf', low: 2500, high: 4000, cheapest: 'Bakery', category: 'snacks' },
];

const CATEGORIES: { key: Category; label: string }[] = [
  { key: 'fruits', label: 'Fruits' },
  { key: 'vegetables', label: 'Vegetables' },
  { key: 'meat', label: 'Meat' },
  { key: 'dairy', label: 'Dairy' },
  { key: 'drinks', label: 'Drinks' },
  { key: 'snacks', label: 'Snacks' },
];

export default function GroceryCalcEn() {
  const [activeTab, setActiveTab] = useState<Category>('fruits');
  const [cart, setCart] = useState<Record<string, number>>({});

  const filtered = ITEMS.filter(i => i.category === activeTab);

  const toggleCart = (name: string) => {
    setCart(prev => {
      const next = { ...prev };
      if (next[name]) {
        delete next[name];
      } else {
        const item = ITEMS.find(i => i.name === name);
        if (item) next[name] = 1;
      }
      return next;
    });
  };

  const updateQty = (name: string, qty: number) => {
    setCart(prev => {
      const next = { ...prev };
      if (qty <= 0) {
        delete next[name];
      } else {
        next[name] = qty;
      }
      return next;
    });
  };

  const cartItems = Object.entries(cart).map(([name, qty]) => {
    const item = ITEMS.find(i => i.name === name);
    return item ? { ...item, qty } : null;
  }).filter(Boolean) as (GroceryItem & { qty: number })[];

  const weeklyLow = cartItems.reduce((sum, i) => sum + i.low * i.qty, 0);
  const weeklyHigh = cartItems.reduce((sum, i) => sum + i.high * i.qty, 0);
  const monthlyLow = weeklyLow * 4;
  const monthlyHigh = weeklyHigh * 4;

  return (
    <>
      <Card>
        <SectionTitle num="1">Browse Prices by Category</SectionTitle>
        <div className="flex gap-1.5 overflow-x-auto pb-2 mb-3">
          {CATEGORIES.map(c => (
            <button
              key={c.key}
              onClick={() => setActiveTab(c.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border-[1.5px] transition-colors ${
                activeTab === c.key
                  ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                  : 'bg-white text-[var(--sub)] border-[var(--line)]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {filtered.map(item => {
            const inCart = !!cart[item.name];
            return (
              <div
                key={item.name}
                onClick={() => toggleCart(item.name)}
                className={`flex items-center justify-between p-3 rounded-xl border-[1.5px] cursor-pointer transition-colors ${
                  inCart ? 'border-[var(--primary)] bg-[var(--primary-weak)]' : 'border-[var(--line)] bg-white'
                }`}
              >
                <div className="flex-1">
                  <div className="text-sm font-bold">{item.name} <span className="text-[var(--sub)] font-normal">({item.kr})</span></div>
                  <div className="text-xs text-[var(--sub)]">{item.unit}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-extrabold text-[var(--primary-dark)]">{item.low.toLocaleString()} - {item.high.toLocaleString()} won</div>
                  <div className="text-[10px] text-[var(--sub)]">Cheapest: {item.cheapest}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <SectionTitle num="2">Weekly Budget Calculator</SectionTitle>
        <p className="text-xs text-[var(--sub)] mb-3">Tap items above to add them to your weekly shopping list, then adjust quantities.</p>
        {cartItems.length === 0 ? (
          <div className="text-center py-6 text-sm text-[var(--sub)]">Tap items from any category to build your weekly list.</div>
        ) : (
          <>
            <div className="flex flex-col gap-2 mb-4">
              {cartItems.map(item => (
                <div key={item.name} className="flex items-center justify-between bg-[var(--bg)] rounded-xl p-3">
                  <div className="flex-1">
                    <div className="text-sm font-bold">{item.name}</div>
                    <div className="text-xs text-[var(--sub)]">{item.low.toLocaleString()} - {item.high.toLocaleString()} / {item.unit}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(item.name, item.qty - 1)} className="w-7 h-7 rounded-lg bg-white border border-[var(--line)] text-sm font-bold">-</button>
                    <span className="text-sm font-extrabold w-5 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.name, item.qty + 1)} className="w-7 h-7 rounded-lg bg-white border border-[var(--line)] text-sm font-bold">+</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-[var(--line)] pt-3">
              <div className="flex justify-between text-sm mb-1"><span className="text-[var(--sub)]">Weekly estimate</span><span className="font-bold">{weeklyLow.toLocaleString()} - {weeklyHigh.toLocaleString()} won</span></div>
              <div className="flex justify-between text-sm"><span className="text-[var(--sub)]">Monthly estimate (x4)</span><span className="font-extrabold text-[var(--primary-dark)]">{monthlyLow.toLocaleString()} - {monthlyHigh.toLocaleString()} won</span></div>
            </div>
          </>
        )}
      </Card>

      <Card>
        <h2 className="text-base font-extrabold mb-3">Where to Shop in Korea</h2>
        <div className="text-sm text-[#4E5968] leading-relaxed flex flex-col gap-3">
          <p><b>E-Mart (이마트):</b> Korea&apos;s largest supermarket chain. Great for bulk buying, imported goods, and weekly deals. The &quot;No Brand&quot; store brand offers excellent value. Most locations have parking and are open until 10-11 PM. Closed on 2nd and 4th Sundays.</p>
          <p><b>Homeplus (홈플러스):</b> Similar to E-Mart with slightly lower prices on some items. Has an excellent online delivery service. Also closed on alternating Sundays (usually 2nd and 4th).</p>
          <p><b>Coupang (쿠팡):</b> Korea&apos;s Amazon equivalent. Rocket Delivery (로켓배송) offers next-day or same-day delivery. Often has the best prices on bulk items, water, eggs, and household goods. Coupang Rocket Fresh for groceries.</p>
          <p><b>Traditional Markets (시장):</b> Best prices for fresh produce, meat, and fish. Prices are often negotiable. Visit Gwangjang Market (광장시장), Namdaemun Market (남대문시장), or your local neighborhood market. Cash is preferred.</p>
          <p><b>Money-saving tips:</b> Look for 1+1 (buy one get one free) deals at convenience stores. Buy seasonal fruits at markets. Use Coupang for heavy items like water and rice. Cook at home - a single meal at a restaurant costs as much as a day&apos;s groceries.</p>
          <p><b>Useful Korean terms:</b> 할인 (discount), 1+1 (buy one get one), 2+1 (buy two get one), 국산 (domestic), 수입 (imported), 유기농 (organic), 무료배송 (free shipping), 장바구니 (shopping cart/basket).</p>
        </div>
      </Card>
    </>
  );
}
