
// Module 2: «Танец Романтики и Притяжения»
// Interactive: Romance scale slider + reframing toxic frames

const { useState, useEffect } = React;

const M2 = {
  accent: '#C8842A',
  accentLight: '#FFF8EE',
  dark: '#2C1810',
  mid: '#7A5C4A',
  cream: '#FAF6F0',
};

const m2s = {
  wrap: { maxWidth: 780, margin: '0 auto', padding: '48px 32px 80px' },
  hero: {
    background: 'linear-gradient(135deg, #1A0E06 0%, #4A2808 100%)',
    borderRadius: 20, padding: '52px 48px', marginBottom: 40, position: 'relative', overflow: 'hidden',
  },
  heroSuit: { position: 'absolute', top: 20, right: 28, fontSize: 80, opacity: 0.12, color: '#C8842A', fontFamily: 'serif', userSelect: 'none' },
  heroNum: { fontFamily: "'Playfair Display', serif", color: '#C8842A', fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12 },
  heroTitle: { fontFamily: "'Playfair Display', serif", color: '#F5EDE0', fontSize: 38, fontWeight: 700, lineHeight: 1.15, marginBottom: 12 },
  heroSub: { color: '#A08868', fontSize: 16, lineHeight: 1.6, maxWidth: 480 },
  section: { background: '#FFFFFF', borderRadius: 16, padding: '32px 36px', marginBottom: 24, boxShadow: '0 2px 16px rgba(44,24,16,0.07)' },
  sectionTitle: { fontFamily: "'Playfair Display', serif", fontSize: 22, color: '#2C1810', fontWeight: 700, marginBottom: 16 },
  body: { fontSize: 15, lineHeight: 1.75, color: '#5A4438', marginBottom: 12 },
  insightRow: { display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 14, padding: '14px 16px', background: '#FAF6F0', borderRadius: 10 },
  nextBtn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    width: '100%', padding: '16px', borderRadius: 12, border: 'none',
    background: 'linear-gradient(135deg, #C8842A, #E0A050)', color: '#fff',
    fontSize: 16, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
    marginTop: 32, boxShadow: '0 4px 20px rgba(200,132,42,0.3)', transition: 'all 0.2s',
  },
};

const ROMANCE_LEVELS = [
  { val: 0, label: 'Автопилот', desc: 'Романтика исчезла из фокуса. Отношения на «техническом обслуживании».', color: '#A08878' },
  { val: 25, label: 'Усталость', desc: 'Иногда бывают моменты близости, но они случайны и редки.', color: '#C07850' },
  { val: 50, label: 'Пробуждение', desc: 'Начинаете замечать, что хотите большего. Романтика становится осознанной.', color: '#C8842A' },
  { val: 75, label: 'Культивация', desc: 'Целенаправленно создаёте романтические моменты. Фреймы становятся ресурсными.', color: '#A07830' },
  { val: 100, label: 'Осознанная романтика', desc: 'Романтика как образ жизни. Каждый момент — возможность для связи.', color: '#2D5240' },
];

const TOXIC_FRAMES = [
  { toxic: 'Он/она должен(а) сам(а) знать, что мне нужно', resource: 'Я беру ответственность за выражение своих потребностей — это и есть зрелая близость', category: 'Ожидания' },
  { toxic: 'Романтика должна быть спонтанной, а не запланированной', resource: 'Намеренная романтика показывает приоритет. Лучший подарок — это время и внимание, которые выбраны сознательно', category: 'Идеализация' },
  { toxic: 'Если страсть угасла — значит, мы не подходим друг другу', resource: 'Страсть требует ухода, как сад. Угасание — это сигнал к действию, не к уходу', category: 'Стадии' },
  { toxic: 'Настоящая любовь не требует усилий', resource: 'Настоящая любовь — это практика. Усилие — признак ценности, а не слабости чувств', category: 'Миф' },
  { toxic: 'Если он/она меня любит, то изменится', resource: 'Принятие человека таким, какой он есть — фундамент настоящей любви. Изменение — личный выбор каждого', category: 'Контроль' },
  { toxic: 'Романтика — это только для начала отношений', resource: 'Романтика — это внутреннее состояние, не стадия. Великие любовники создают её снова и снова', category: 'Этапы' },
];

function RomanceSlider() {
  const saved = parseInt(localStorage.getItem('ggl_m2_romance') || '50');
  const [value, setValue] = useState(saved);

  useEffect(() => {
    localStorage.setItem('ggl_m2_romance', value);
  }, [value]);

  const current = ROMANCE_LEVELS.reduce((prev, curr) =>
    Math.abs(curr.val - value) < Math.abs(prev.val - value) ? curr : prev
  );

  const getGradient = (v) => {
    const stops = [
      [0, '#A08878'], [25, '#C07850'], [50, '#C8842A'], [75, '#A07830'], [100, '#2D5240']
    ];
    const lo = stops.reduce((p, c) => c[0] <= v ? c : p);
    const hi = stops.find(s => s[0] >= v) || lo;
    return lo[1];
  };

  return (
    <div>
      <p style={m2s.body}>Где вы находитесь прямо сейчас в своих отношениях? Передвиньте ползунок:</p>

      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#A08878', marginBottom: 10, letterSpacing: '0.06em' }}>
          <span>АВТОПИЛОТ</span><span>ОСОЗНАННАЯ РОМАНТИКА</span>
        </div>

        <input
          type="range" min="0" max="100" value={value}
          onChange={e => setValue(parseInt(e.target.value))}
          style={{ width: '100%', height: 6, accentColor: current.color, cursor: 'pointer' }}
        />

        {/* Tick markers */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          {ROMANCE_LEVELS.map(l => (
            <div key={l.val} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '20%' }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: value >= l.val ? l.color : '#EDE0D4',
                transition: 'background 0.3s',
                marginBottom: 4,
              }}></div>
              <span style={{ fontSize: 10, color: '#A08878', textAlign: 'center', lineHeight: 1.3 }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Result card */}
      <div style={{
        background: `linear-gradient(135deg, ${current.color}18, ${current.color}08)`,
        border: `2px solid ${current.color}40`,
        borderRadius: 16,
        padding: '24px 28px',
        transition: 'all 0.4s',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: current.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, color: '#fff',
          }}>♦</div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: M2.dark, fontWeight: 700 }}>
              {current.label}
            </div>
            <div style={{ fontSize: 12, color: '#A08878', marginTop: 2 }}>{value}% шкалы осознанности</div>
          </div>
        </div>
        <p style={{ fontSize: 14, color: '#5A4438', lineHeight: 1.7, margin: 0 }}>{current.desc}</p>

        {value < 75 && (
          <div style={{ marginTop: 16, padding: '12px 16px', background: 'rgba(255,255,255,0.6)', borderRadius: 10 }}>
            <div style={{ fontSize: 13, color: '#7A5C4A', lineHeight: 1.65 }}>
              <strong>Следующий шаг:</strong> {
                value < 25 ? 'Начните с малого — замечайте один момент связи в день. Без давления, без ожиданий.' :
                value < 50 ? 'Попробуйте назначить «свидание» с партнёром. Не как обязанность, а как выбор.' :
                'Создайте один новый романтический ритуал — утренний, вечерний или еженедельный.'
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ReframingExercise() {
  const savedIdx = parseInt(localStorage.getItem('ggl_m2_reframe_idx') || '0');
  const savedCustom = localStorage.getItem('ggl_m2_custom') || '';

  const [selectedIdx, setSelectedIdx] = useState(savedIdx);
  const [customToxic, setCustomToxic] = useState(savedCustom);
  const [showCustom, setShowCustom] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [customResult, setCustomResult] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('ggl_m2_reframe_idx', selectedIdx);
    setRevealed(false);
  }, [selectedIdx]);

  useEffect(() => {
    localStorage.setItem('ggl_m2_custom', customToxic);
  }, [customToxic]);

  const handleCustomReframe = async () => {
    if (!customToxic.trim()) return;
    setLoading(true);
    setCustomResult('');
    try {
      const result = await window.claude.complete({
        messages: [{
          role: 'user',
          content: `Ты коуч по нейро-семантике и NLP. Пользователь указал токсичный фрейм в отношениях: "${customToxic}". 
Сформулируй ресурсный альтернативный фрейм в 1-2 предложениях. Тон тёплый, мудрый, не поучительный. Только сам фрейм, без вступлений.`
        }]
      });
      setCustomResult(result);
    } catch (e) {
      setCustomResult('Подумайте: что более ресурсное убеждение могло бы занять это место?');
    }
    setLoading(false);
  };

  const frame = TOXIC_FRAMES[selectedIdx];

  return (
    <div>
      <p style={m2s.body}>Выберите токсичный фрейм, который вам знаком, и увидите ресурсную альтернативу. Или введите свой:</p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {TOXIC_FRAMES.map((f, i) => (
          <button
            key={i}
            onClick={() => { setSelectedIdx(i); setShowCustom(false); }}
            style={{
              padding: '7px 14px',
              borderRadius: 8,
              border: `1.5px solid ${selectedIdx === i && !showCustom ? '#C8842A' : '#EDE0D4'}`,
              background: selectedIdx === i && !showCustom ? '#FFF8EE' : 'transparent',
              color: selectedIdx === i && !showCustom ? '#C8842A' : '#7A5C4A',
              fontSize: 12,
              cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: selectedIdx === i && !showCustom ? 600 : 400,
              transition: 'all 0.2s',
            }}
          >{f.category}</button>
        ))}
        <button
          onClick={() => setShowCustom(true)}
          style={{
            padding: '7px 14px', borderRadius: 8,
            border: `1.5px solid ${showCustom ? '#C8842A' : '#EDE0D4'}`,
            background: showCustom ? '#FFF8EE' : 'transparent',
            color: showCustom ? '#C8842A' : '#7A5C4A',
            fontSize: 12, cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: showCustom ? 600 : 400,
            transition: 'all 0.2s',
          }}
        >✏️ Свой фрейм</button>
      </div>

      {!showCustom ? (
        <div>
          {/* Toxic frame */}
          <div style={{
            background: '#FFF4F0', border: '2px solid #F0C0B0',
            borderRadius: 14, padding: '20px 24px', marginBottom: 16,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#C05A3A', marginBottom: 10, textTransform: 'uppercase' }}>
              🔴 Токсичный фрейм
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: '#3C1808', lineHeight: 1.5, fontStyle: 'italic' }}>
              «{frame.toxic}»
            </div>
          </div>

          {!revealed ? (
            <button
              onClick={() => setRevealed(true)}
              style={{
                width: '100%', padding: '14px', borderRadius: 12,
                border: '2px solid #C8842A', background: 'transparent',
                color: '#C8842A', fontSize: 14, fontWeight: 600,
                cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                transition: 'all 0.2s',
              }}
            >
              ✨ Показать ресурсный фрейм
            </button>
          ) : (
            <div style={{
              background: '#F0F8F4', border: '2px solid #A0C8A8',
              borderRadius: 14, padding: '20px 24px',
              animation: 'fadeIn 0.4s ease',
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#2D5240', marginBottom: 10, textTransform: 'uppercase' }}>
                🌱 Ресурсный фрейм
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: '#1A3828', lineHeight: 1.5, fontStyle: 'italic' }}>
                «{frame.resource}»
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#A08878', marginBottom: 8, textTransform: 'uppercase' }}>
              Ваш токсичный фрейм
            </div>
            <textarea
              value={customToxic}
              onChange={e => setCustomToxic(e.target.value)}
              placeholder="Напишите убеждение, которое мешает вам в отношениях..."
              style={{
                width: '100%', border: '1.5px solid #EDE0D4', borderRadius: 10,
                padding: '12px 14px', fontSize: 14, color: '#2C1810',
                fontFamily: "'DM Sans', sans-serif", outline: 'none', resize: 'none',
                height: 80, lineHeight: 1.6, background: '#FFFDF9',
              }}
            />
          </div>
          <button
            onClick={handleCustomReframe}
            disabled={loading || !customToxic.trim()}
            style={{
              width: '100%', padding: '13px', borderRadius: 10,
              border: 'none', background: loading ? '#D0C0B0' : '#C8842A',
              color: '#fff', fontSize: 14, fontWeight: 600,
              cursor: loading ? 'default' : 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              transition: 'all 0.2s', marginBottom: 16,
            }}
          >
            {loading ? '⏳ Генерирую...' : '✨ Получить ресурсный фрейм'}
          </button>
          {customResult && (
            <div style={{
              background: '#F0F8F4', border: '2px solid #A0C8A8',
              borderRadius: 14, padding: '20px 24px',
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#2D5240', marginBottom: 10, textTransform: 'uppercase' }}>
                🌱 Ресурсный фрейм
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: '#1A3828', lineHeight: 1.5, fontStyle: 'italic' }}>
                «{customResult}»
              </div>
            </div>
          )}
        </div>
      )}

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }`}</style>
    </div>
  );
}

function Module2({ onComplete }) {
  const [theoryOpen, setTheoryOpen] = useState(false);

  return (
    <div>
      <style>{`@media(max-width:768px){.m2-wrap{padding:24px 16px 60px !important;}.m2-hero{padding:36px 24px !important;}.m2-title{font-size:28px !important;}}`}</style>
      <div style={m2s.wrap} className="m2-wrap">
        <div style={m2s.hero} className="m2-hero">
          <div style={m2s.heroSuit}>♦</div>
          <div style={m2s.heroNum}>Модуль 02</div>
          <div style={{...m2s.heroTitle}} className="m2-title">Танец Романтики<br/>и Притяжения</div>
          <div style={m2s.heroSub}>Романтика — это не событие, которое происходит с вами. Это состояние ума, которое вы создаёте.</div>
        </div>

        <div style={m2s.section}>
          <div style={m2s.sectionTitle}>Романтика как внутреннее состояние</div>
          <p style={m2s.body}>Большинство из нас ждут, что романтика «случится» — как будто это внешнее событие. Но Холл утверждает: романтика живёт внутри. Это <strong>фрейм восприятия</strong>, который вы надеваете на обычные моменты.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginTop: 16, marginBottom: 16 }}>
            {[
              { stage: '1. Влюблённость', desc: 'Химия, идеализация, слияние. Нейробиологический «наркотик».' },
              { stage: '2. Реальность', desc: 'Спадает флёр. Партнёр становится «настоящим». Тест отношений.' },
              { stage: '3. Решение', desc: 'Выбрать любить. Переход от «нас нашло» к «мы создаём».' },
              { stage: '4. Глубокая романтика', desc: 'Осознанная, зрелая, богатая смыслом. Лучше, чем влюблённость.' },
            ].map(s => (
              <div key={s.stage} style={{ background: '#FFF8F0', borderRadius: 10, padding: '14px 16px', border: '1px solid #F0E0CC' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#C8842A', marginBottom: 6 }}>{s.stage}</div>
                <div style={{ fontSize: 13, color: '#5A4438', lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            ))}
          </div>

          <button style={{ background: 'none', border: 'none', color: '#C8842A', cursor: 'pointer', fontSize: 13, fontWeight: 600, padding: '4px 0', display: 'flex', alignItems: 'center', gap: 6 }}
            onClick={() => setTheoryOpen(o => !o)}>
            {theoryOpen ? '▲' : '▼'} Фреймы, убивающие романтику
          </button>
          {theoryOpen && (
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #EDE0D4' }}>
              {[
                ['⚡ Ожидания', 'Когда реальный партнёр не совпадает с идеальным образом в голове — разочарование гасит романтику.'],
                ['🎭 Идеализация', '«Влюблённость» в образ, не в человека. Когда падает маска — падает и чувство.'],
                ['⏰ Автоматизм', 'Брать партнёра как само собой разумеющееся. Романтика умирает от невнимания.'],
                ['📊 Счётчик', 'Постоянный подсчёт кто больше сделал. Разрушает дух дарения.'],
              ].map(([k, v]) => (
                <div key={k} style={{ ...m2s.insightRow, marginBottom: 10 }}>
                  <span style={{ fontSize: 17 }}>{k.split(' ')[0]}</span>
                  <div style={{ fontSize: 14, color: '#5A4438', lineHeight: 1.65 }}>
                    <strong>{k.slice(2)}</strong> — {v}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={m2s.section}>
          <div style={m2s.sectionTitle}>Диагностика: Шкала романтики</div>
          <RomanceSlider />
        </div>

        <div style={m2s.section}>
          <div style={m2s.sectionTitle}>Рефрейминг: от токсичного к ресурсному</div>
          <ReframingExercise />
        </div>

        <div style={m2s.section}>
          <div style={m2s.sectionTitle}>Ключевые инсайты</div>
          {[
            ['♦', 'Романтика — это навык, не дар. Её можно развивать целенаправленно.'],
            ['🌹', 'Лучшие романтические отношения — это когда два человека выбирают друг друга снова и снова.'],
            ['✨', 'Фрейм «партнёр — это подарок» создаёт совершенно иную игру, чем фрейм «партнёр — это должное».'],
          ].map(([icon, text]) => (
            <div key={text} style={m2s.insightRow}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{icon}</span>
              <div style={{ fontSize: 14, color: '#5A4438', lineHeight: 1.65 }}>{text}</div>
            </div>
          ))}
        </div>

        <button style={m2s.nextBtn} onClick={() => onComplete(2)}>
          Модуль 3: Эмоциональный Банк →
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { Module2 });
