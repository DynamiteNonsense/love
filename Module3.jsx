
// Module 3: «Эмоциональный Банковский Счёт»
// Interactive: visual bank with deposits/withdrawals + animated trust scale

const { useState, useEffect, useRef } = React;

const m3s = {
  wrap: { maxWidth: 780, margin: '0 auto', padding: '48px 32px 80px' },
  hero: {
    background: 'linear-gradient(135deg, #0D1F18 0%, #1A3828 100%)',
    borderRadius: 20, padding: '52px 48px', marginBottom: 40, position: 'relative', overflow: 'hidden',
  },
  heroSuit: { position: 'absolute', top: 20, right: 28, fontSize: 80, opacity: 0.12, color: '#4A9A70', fontFamily: 'serif', userSelect: 'none' },
  heroNum: { fontFamily: "'Playfair Display', serif", color: '#4A9A70', fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12 },
  heroTitle: { fontFamily: "'Playfair Display', serif", color: '#F5EDE0', fontSize: 38, fontWeight: 700, lineHeight: 1.15, marginBottom: 12 },
  heroSub: { color: '#7A9A8A', fontSize: 16, lineHeight: 1.6, maxWidth: 480 },
  section: { background: '#FFFFFF', borderRadius: 16, padding: '32px 36px', marginBottom: 24, boxShadow: '0 2px 16px rgba(44,24,16,0.07)' },
  sectionTitle: { fontFamily: "'Playfair Display', serif", fontSize: 22, color: '#2C1810', fontWeight: 700, marginBottom: 16 },
  body: { fontSize: 15, lineHeight: 1.75, color: '#5A4438', marginBottom: 12 },
  insightRow: { display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 14, padding: '14px 16px', background: '#FAF6F0', borderRadius: 10 },
  nextBtn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    width: '100%', padding: '16px', borderRadius: 12, border: 'none',
    background: 'linear-gradient(135deg, #2D5240, #4A7A60)', color: '#fff',
    fontSize: 16, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
    marginTop: 32, boxShadow: '0 4px 20px rgba(45,82,64,0.3)', transition: 'all 0.2s',
  },
};

const DEPOSIT_SUGGESTIONS = [
  'Искреннее «спасибо»', 'Внимательное слушание', 'Неожиданный сюрприз',
  'Слова поддержки', 'Помощь без просьбы', 'Качественное время вместе',
  'Физическая нежность', 'Выполненное обещание', 'Комплимент',
];
const WITHDRAWAL_SUGGESTIONS = [
  'Резкие слова в злости', 'Игнорирование', 'Несдержанное обещание',
  'Критика при других', 'Пренебрежение чувствами', 'Ложь или недосказанность',
  'Постоянные упрёки', 'Безразличие к нуждам',
];

function BankAccount() {
  const loadData = () => {
    try { return JSON.parse(localStorage.getItem('ggl_m3_bank') || 'null'); } catch { return null; }
  };

  const [transactions, setTransactions] = useState(loadData()?.transactions || []);
  const [input, setInput] = useState('');
  const [type, setType] = useState('deposit');
  const [amount, setAmount] = useState(10);
  const [animBal, setAnimBal] = useState(null);
  const animRef = useRef(null);

  const balance = transactions.reduce((s, t) => s + t.value, 0);
  const clampedBal = Math.max(-100, Math.min(100, balance));

  useEffect(() => {
    localStorage.setItem('ggl_m3_bank', JSON.stringify({ transactions }));
  }, [transactions]);

  // Animate balance on change
  useEffect(() => {
    if (animRef.current) clearTimeout(animRef.current);
    setAnimBal(true);
    animRef.current = setTimeout(() => setAnimBal(false), 600);
  }, [balance]);

  const addTransaction = () => {
    if (!input.trim()) return;
    const val = type === 'deposit' ? amount : -amount;
    const tx = { id: Date.now(), text: input.trim(), value: val, type, date: new Date().toLocaleDateString('ru') };
    setTransactions(ts => [tx, ...ts.slice(0, 19)]);
    setInput('');
    setAmount(10);
  };

  const removeTransaction = (id) => setTransactions(ts => ts.filter(t => t.id !== id));

  const pct = ((clampedBal + 100) / 200) * 100;

  const getBalanceColor = (b) => {
    if (b > 50) return '#2D7A50';
    if (b > 20) return '#5A9A60';
    if (b > 0) return '#A0C080';
    if (b > -20) return '#E0A050';
    if (b > -50) return '#D06040';
    return '#B03020';
  };
  const balColor = getBalanceColor(clampedBal);

  const getBalanceLabel = (b) => {
    if (b > 70) return 'Глубокое доверие';
    if (b > 40) return 'Крепкая связь';
    if (b > 10) return 'Хороший запас';
    if (b > -10) return 'Нейтральный баланс';
    if (b > -40) return 'Накапливается напряжение';
    if (b > -70) return 'Критический уровень';
    return 'Кризис доверия';
  };

  return (
    <div>
      <p style={m3s.body}>Каждое ваше взаимодействие с партнёром — это либо вклад, либо снятие с эмоционального счёта. Ведите свой реальный учёт:</p>

      {/* Balance Gauge */}
      <div style={{
        background: 'linear-gradient(135deg, #0D1F18, #1A3828)',
        borderRadius: 16, padding: '28px 32px', marginBottom: 24,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 11, color: '#6A9A80', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Баланс доверия</div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 42,
              fontWeight: 700,
              color: balColor,
              lineHeight: 1,
              transition: 'color 0.5s',
              ...(animBal ? { transform: 'scale(1.05)', transition: 'transform 0.15s, color 0.5s' } : {}),
            }}>
              {balance > 0 ? '+' : ''}{balance}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 13, color: balColor, fontWeight: 600, transition: 'color 0.5s' }}>{getBalanceLabel(clampedBal)}</div>
            <div style={{ fontSize: 11, color: '#4A7A60', marginTop: 4 }}>{transactions.length} операций</div>
          </div>
        </div>

        {/* Bar */}
        <div style={{ position: 'relative', height: 12, background: 'rgba(255,255,255,0.08)', borderRadius: 6, overflow: 'hidden' }}>
          {/* Zero marker */}
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 2, background: 'rgba(255,255,255,0.2)', zIndex: 2 }}></div>
          <div style={{
            position: 'absolute',
            top: 0, bottom: 0,
            left: balance >= 0 ? '50%' : `${pct}%`,
            width: `${Math.abs(clampedBal) / 2}%`,
            background: `linear-gradient(90deg, ${balColor}90, ${balColor})`,
            borderRadius: 6,
            transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 10, color: '#4A6A58' }}>
          <span>-100</span><span>0</span><span>+100</span>
        </div>
      </div>

      {/* Input */}
      <div style={{ background: '#F9F6F2', borderRadius: 14, padding: '20px 22px', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {['deposit', 'withdrawal'].map(t => (
            <button key={t} onClick={() => setType(t)} style={{
              flex: 1, padding: '10px', borderRadius: 10,
              border: `2px solid ${type === t ? (t === 'deposit' ? '#2D7A50' : '#C05A3A') : '#EDE0D4'}`,
              background: type === t ? (t === 'deposit' ? '#EFF8F3' : '#FFF0EC') : 'transparent',
              color: type === t ? (t === 'deposit' ? '#2D7A50' : '#C05A3A') : '#A08878',
              fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
              transition: 'all 0.2s',
            }}>
              {t === 'deposit' ? '↑ Вклад' : '↓ Снятие'}
            </button>
          ))}
        </div>

        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTransaction()}
          placeholder={type === 'deposit' ? 'Что вы сделали для партнёра...' : 'Что уменьшило доверие...'}
          style={{
            width: '100%', border: `1.5px solid ${type === 'deposit' ? '#A0C8A8' : '#E0A898'}`,
            borderRadius: 10, padding: '11px 14px', fontSize: 14,
            color: '#2C1810', fontFamily: "'DM Sans', sans-serif",
            outline: 'none', background: '#fff', marginBottom: 12,
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <span style={{ fontSize: 13, color: '#7A5C4A', whiteSpace: 'nowrap' }}>Вес: {amount}</span>
          <input type="range" min="1" max="30" value={amount}
            onChange={e => setAmount(parseInt(e.target.value))}
            style={{ flex: 1, accentColor: type === 'deposit' ? '#2D7A50' : '#C05A3A' }}
          />
        </div>

        {/* Quick chips */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
          {(type === 'deposit' ? DEPOSIT_SUGGESTIONS : WITHDRAWAL_SUGGESTIONS).slice(0, 5).map(s => (
            <button key={s} onClick={() => setInput(s)} style={{
              padding: '4px 10px', borderRadius: 20,
              border: '1px solid #EDE0D4', background: 'transparent',
              color: '#7A5C4A', fontSize: 12, cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif", transition: 'all 0.15s',
            }}>{s}</button>
          ))}
        </div>

        <button onClick={addTransaction} disabled={!input.trim()} style={{
          width: '100%', padding: '12px', borderRadius: 10, border: 'none',
          background: input.trim() ? (type === 'deposit' ? '#2D7A50' : '#C05A3A') : '#D0C8C0',
          color: '#fff', fontSize: 14, fontWeight: 600,
          cursor: input.trim() ? 'pointer' : 'default',
          fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s',
        }}>
          {type === 'deposit' ? '+ Записать вклад' : '– Записать снятие'}
        </button>
      </div>

      {/* Transactions */}
      {transactions.length > 0 && (
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#A08878', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
            История операций
          </div>
          <div style={{ maxHeight: 280, overflowY: 'auto', paddingRight: 4 }}>
            {transactions.map(tx => (
              <div key={tx.id} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 14px', marginBottom: 6, borderRadius: 10,
                background: tx.type === 'deposit' ? '#F0F8F2' : '#FEF4F0',
                border: `1px solid ${tx.type === 'deposit' ? '#C0E0C8' : '#F0C8B8'}`,
              }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>{tx.type === 'deposit' ? '↑' : '↓'}</span>
                <span style={{ flex: 1, fontSize: 14, color: '#3C2818' }}>{tx.text}</span>
                <span style={{
                  fontWeight: 700, fontSize: 14,
                  color: tx.type === 'deposit' ? '#2D7A50' : '#C05A3A',
                  flexShrink: 0,
                }}>
                  {tx.value > 0 ? '+' : ''}{tx.value}
                </span>
                <button onClick={() => removeTransaction(tx.id)} style={{
                  background: 'none', border: 'none', color: '#C0B0A0',
                  cursor: 'pointer', fontSize: 13, padding: 2, flexShrink: 0,
                }}>✕</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {transactions.length === 0 && (
        <div style={{ textAlign: 'center', padding: '32px', color: '#A08878', fontSize: 14 }}>
          Начните вести счёт своих взаимодействий с партнёром ↑
        </div>
      )}
    </div>
  );
}

function Module3({ onComplete }) {
  return (
    <div>
      <style>{`@media(max-width:768px){.m3-wrap{padding:24px 16px 60px !important;}.m3-hero{padding:36px 24px !important;}.m3-title{font-size:28px !important;}}`}</style>
      <div style={m3s.wrap} className="m3-wrap">
        <div style={m3s.hero} className="m3-hero">
          <div style={m3s.heroSuit}>♣</div>
          <div style={m3s.heroNum}>Модуль 03</div>
          <div style={{...m3s.heroTitle}} className="m3-title">Эмоциональный<br/>Банковский Счёт</div>
          <div style={m3s.heroSub}>Доверие — это не данность. Это баланс, который формируется каждым взаимодействием.</div>
        </div>

        <div style={m3s.section}>
          <div style={m3s.sectionTitle}>Метафора банковского счёта</div>
          <p style={m3s.body}>Стивен Кови ввёл эту метафору, Холл расширил её в контексте любовных отношений. Каждое взаимодействие с партнёром — это финансовая транзакция на счёте <strong>эмоционального доверия</strong>.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 16 }}>
            <div style={{ background: '#EFF8F3', borderRadius: 12, padding: '18px 20px', border: '1px solid #B0D8B8' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, color: '#2D7A50', marginBottom: 10, fontWeight: 700 }}>↑ Вклады</div>
              {['Внимание и присутствие', 'Сдержанные обещания', 'Доброта в малом', 'Принятие без осуждения', 'Честность'].map(i => (
                <div key={i} style={{ fontSize: 13, color: '#3A6048', marginBottom: 5, display: 'flex', gap: 6 }}>
                  <span style={{ color: '#2D7A50' }}>✓</span> {i}
                </div>
              ))}
            </div>
            <div style={{ background: '#FEF4F0', borderRadius: 12, padding: '18px 20px', border: '1px solid #F0C0A8' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, color: '#C05A3A', marginBottom: 10, fontWeight: 700 }}>↓ Снятия</div>
              {['Невыполненные слова', 'Резкость и критика', 'Игнорирование чувств', 'Предательство доверия', 'Постоянные упрёки'].map(i => (
                <div key={i} style={{ fontSize: 13, color: '#6A3020', marginBottom: 5, display: 'flex', gap: 6 }}>
                  <span style={{ color: '#C05A3A' }}>✕</span> {i}
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 16, background: '#FFFBF0', border: '1px solid #EDD8A0', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, color: '#7A5C10', lineHeight: 1.7 }}>
              <strong>Ключевое открытие:</strong> Одно снятие требует 5–7 вкладов для компенсации. Поэтому стоит инвестировать в счёт превентивно, не дожидаясь кризиса.
            </div>
          </div>
        </div>

        <div style={m3s.section}>
          <div style={m3s.sectionTitle}>Ваш Эмоциональный Банк</div>
          <BankAccount />
        </div>

        <div style={m3s.section}>
          <div style={m3s.sectionTitle}>Ключевые инсайты</div>
          {[
            ['♣', 'Высокий счёт создаёт «запас прочности» — когда что-то идёт не так, партнёр даёт benefit of the doubt.'],
            ['💎', 'Маленькие ежедневные вклады ценнее редких грандиозных жестов. Постоянство строит доверие.'],
            ['🔍', 'Если счёт хронически низкий — это сигнал. Не «партнёр плохой», а «мы не инвестируем в связь».'],
          ].map(([icon, text]) => (
            <div key={text} style={m3s.insightRow}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{icon}</span>
              <div style={{ fontSize: 14, color: '#5A4438', lineHeight: 1.65 }}>{text}</div>
            </div>
          ))}
        </div>

        <button style={m3s.nextBtn} onClick={() => onComplete(3)}>
          Модуль 4: Игра Самораскрытия →
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { Module3 });
