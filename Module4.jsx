
// Module 4: «Игра Самораскрытия»
// Interactive: Disclosure Pyramid + Deep Question Generator

const { useState, useEffect } = React;

const m4s = {
  wrap: { maxWidth: 780, margin: '0 auto', padding: '48px 32px 80px' },
  hero: {
    background: 'linear-gradient(135deg, #180A2A 0%, #3A1858 100%)',
    borderRadius: 20, padding: '52px 48px', marginBottom: 40, position: 'relative', overflow: 'hidden',
  },
  heroSuit: { position: 'absolute', top: 20, right: 28, fontSize: 80, opacity: 0.12, color: '#9A60C8', fontFamily: 'serif', userSelect: 'none' },
  heroNum: { fontFamily: "'Playfair Display', serif", color: '#9A60C8', fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12 },
  heroTitle: { fontFamily: "'Playfair Display', serif", color: '#F5EDE0', fontSize: 38, fontWeight: 700, lineHeight: 1.15, marginBottom: 12 },
  heroSub: { color: '#8A78A0', fontSize: 16, lineHeight: 1.6, maxWidth: 480 },
  section: { background: '#FFFFFF', borderRadius: 16, padding: '32px 36px', marginBottom: 24, boxShadow: '0 2px 16px rgba(44,24,16,0.07)' },
  sectionTitle: { fontFamily: "'Playfair Display', serif", fontSize: 22, color: '#2C1810', fontWeight: 700, marginBottom: 16 },
  body: { fontSize: 15, lineHeight: 1.75, color: '#5A4438', marginBottom: 12 },
  insightRow: { display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 14, padding: '14px 16px', background: '#FAF6F0', borderRadius: 10 },
  nextBtn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    width: '100%', padding: '16px', borderRadius: 12, border: 'none',
    background: 'linear-gradient(135deg, #5B3A7E, #7A50A0)', color: '#fff',
    fontSize: 16, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
    marginTop: 32, boxShadow: '0 4px 20px rgba(91,58,126,0.3)', transition: 'all 0.2s',
  },
};

const PYRAMID_LEVELS = [
  {
    id: 5, label: 'Уровень 5: Суть', color: '#5B3A7E', lightColor: '#F5EFF8',
    desc: 'Мечты, страхи, смысл жизни, травмы, самые сокровенные желания',
    examples: ['Мой главный страх', 'То, чего я стыжусь', 'Мои сокровенные мечты', 'Как я хочу быть запомнен'],
    icon: '💜',
  },
  {
    id: 4, label: 'Уровень 4: Ценности', color: '#7A50A0', lightColor: '#F0EBF8',
    desc: 'Глубинные убеждения, моральные принципы, духовность, жизненная философия',
    examples: ['Что для меня священно', 'Мои политические взгляды', 'Как я понимаю справедливость', 'Духовные убеждения'],
    icon: '✦',
  },
  {
    id: 3, label: 'Уровень 3: Переживания', color: '#8B6914', lightColor: '#FAF5E8',
    desc: 'Прошлый опыт, отношения, семья, личная история, уязвимости',
    examples: ['Детские воспоминания', 'Прошлые отношения', 'Моменты стыда', 'Чего я боюсь в отношениях'],
    icon: '♦',
  },
  {
    id: 2, label: 'Уровень 2: Мнения', color: '#C8842A', lightColor: '#FFF8EE',
    desc: 'Взгляды, суждения, оценки, предпочтения, вкусы',
    examples: ['Моё отношение к деньгам', 'Взгляды на воспитание детей', 'Что меня раздражает', 'Жизненные приоритеты'],
    icon: '◆',
  },
  {
    id: 1, label: 'Уровень 1: Факты', color: '#A08060', lightColor: '#FAF6F2',
    desc: 'Работа, хобби, распорядок, нейтральная биография',
    examples: ['Где работаю', 'Что люблю делать', 'Любимая еда', 'Как провёл выходные'],
    icon: '○',
  },
];

const DEEP_QUESTIONS = [
  { level: 5, q: 'Если бы ты знал(а), что тебе осталось жить год — что бы изменил(а)?', category: 'Смысл' },
  { level: 5, q: 'Какой страх больше всего управляет твоими решениями?', category: 'Страхи' },
  { level: 5, q: 'Что ты так и не простил(а) себе?', category: 'Принятие' },
  { level: 5, q: 'Что для тебя означает «прожить жизнь хорошо»?', category: 'Смысл' },
  { level: 4, q: 'Что ты считаешь своей главной ценностью, за которую готов(а) бороться?', category: 'Ценности' },
  { level: 4, q: 'Какое убеждение из детства до сих пор управляет тобой?', category: 'Убеждения' },
  { level: 4, q: 'В какой момент ты чувствуешь себя наиболее живым(ой)?', category: 'Ценности' },
  { level: 3, q: 'Какой опыт в прошлом сильнее всего изменил тебя?', category: 'История' },
  { level: 3, q: 'Что ты больше всего боишься потерять в наших отношениях?', category: 'Уязвимость' },
  { level: 3, q: 'Когда ты в последний раз чувствовал(а) себя по-настоящему увиденным(ой)?', category: 'Связь' },
  { level: 2, q: 'Что тебя восхищает в других людях, но чего нет в тебе?', category: 'Рост' },
  { level: 2, q: 'Как ты хочешь, чтобы о тебе думали через 20 лет?', category: 'Наследие' },
];

function DisclosurePyramid() {
  const loadTopics = () => {
    try { return JSON.parse(localStorage.getItem('ggl_m4_topics') || '{}'); } catch { return {}; }
  };
  const [topics, setTopics] = useState(loadTopics());
  const [openLevel, setOpenLevel] = useState(null);
  const [newTopic, setNewTopic] = useState('');
  const [comfort, setComfort] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ggl_m4_comfort') || '{}'); } catch { return {}; }
  });

  useEffect(() => { localStorage.setItem('ggl_m4_topics', JSON.stringify(topics)); }, [topics]);
  useEffect(() => { localStorage.setItem('ggl_m4_comfort', JSON.stringify(comfort)); }, [comfort]);

  const addTopic = (levelId) => {
    if (!newTopic.trim()) return;
    setTopics(t => ({
      ...t,
      [levelId]: [...(t[levelId] || []), newTopic.trim()],
    }));
    setNewTopic('');
  };

  const removeTopic = (levelId, idx) => {
    setTopics(t => ({ ...t, [levelId]: t[levelId].filter((_, i) => i !== idx) }));
  };

  const toggleComfort = (levelId) => {
    setComfort(c => ({ ...c, [levelId]: !c[levelId] }));
  };

  const totalTopics = Object.values(topics).flat().length;

  return (
    <div>
      <p style={m4s.body}>Близость строится постепенно — от поверхностного к глубокому. Добавьте темы, которые уже открыты в ваших отношениях, и те, которые хотите исследовать. Отметьте уровни, на которых вам комфортно находиться.</p>

      {totalTopics > 0 && (
        <div style={{ background: '#F0EBF8', borderRadius: 10, padding: '12px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 20 }}>💜</span>
          <span style={{ fontSize: 14, color: '#5B3A7E' }}>
            Вы добавили <strong>{totalTopics}</strong> тем. {totalTopics >= 5 ? 'Отличная работа — вы строите глубокую карту близости!' : 'Продолжайте добавлять темы для каждого уровня.'}
          </span>
        </div>
      )}

      {/* Pyramid visualization */}
      <div style={{ marginBottom: 8 }}>
        {PYRAMID_LEVELS.map((level, idx) => {
          const isOpen = openLevel === level.id;
          const levelTopics = topics[level.id] || [];
          const isComfy = comfort[level.id];
          const widthPct = 40 + (5 - idx) * 12;

          return (
            <div key={level.id} style={{ marginBottom: 6 }}>
              {/* Triangle row */}
              <div
                onClick={() => setOpenLevel(isOpen ? null : level.id)}
                style={{
                  margin: '0 auto',
                  width: `${widthPct}%`,
                  minWidth: 240,
                  background: isOpen ? level.color : level.lightColor,
                  border: `2px solid ${level.color}`,
                  borderRadius: isOpen ? '12px 12px 0 0' : 12,
                  padding: '12px 20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.25s',
                  userSelect: 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 16 }}>{level.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: isOpen ? '#fff' : level.color }}>{level.label}</div>
                    {levelTopics.length > 0 && (
                      <div style={{ fontSize: 11, color: isOpen ? 'rgba(255,255,255,0.7)' : level.color, marginTop: 2 }}>
                        {levelTopics.length} {levelTopics.length === 1 ? 'тема' : 'тем'}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {isComfy && <span style={{ fontSize: 13, color: isOpen ? 'rgba(255,255,255,0.8)' : level.color }}>✓ Комфортно</span>}
                  <span style={{ color: isOpen ? '#fff' : level.color, fontSize: 14 }}>{isOpen ? '▲' : '▼'}</span>
                </div>
              </div>

              {/* Expanded panel */}
              {isOpen && (
                <div style={{
                  margin: '0 auto',
                  width: `${widthPct}%`,
                  minWidth: 240,
                  background: '#FFFDF9',
                  border: `2px solid ${level.color}`,
                  borderTop: 'none',
                  borderRadius: '0 0 12px 12px',
                  padding: '16px 20px',
                }}>
                  <p style={{ fontSize: 13, color: '#5A4438', lineHeight: 1.6, marginBottom: 12 }}>{level.desc}</p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                    {level.examples.map(ex => (
                      <button key={ex} onClick={() => { setNewTopic(ex); }}
                        style={{
                          padding: '4px 10px', borderRadius: 20,
                          border: `1px solid ${level.color}60`,
                          background: `${level.color}12`,
                          color: level.color, fontSize: 12, cursor: 'pointer',
                          fontFamily: "'DM Sans', sans-serif",
                        }}>{ex}</button>
                    ))}
                  </div>

                  {levelTopics.length > 0 && (
                    <div style={{ marginBottom: 12 }}>
                      {levelTopics.map((t, i) => (
                        <div key={i} style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          padding: '7px 10px', background: `${level.color}10`,
                          borderRadius: 8, marginBottom: 5,
                        }}>
                          <span style={{ flex: 1, fontSize: 13, color: '#3C2818' }}>{t}</span>
                          <button onClick={() => removeTopic(level.id, i)}
                            style={{ background: 'none', border: 'none', color: '#C0B0A0', cursor: 'pointer', fontSize: 13, padding: 2 }}>✕</button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                    <input
                      value={newTopic}
                      onChange={e => setNewTopic(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && addTopic(level.id)}
                      placeholder="Добавить тему..."
                      style={{
                        flex: 1, border: `1.5px solid ${level.color}60`,
                        borderRadius: 8, padding: '8px 12px', fontSize: 13,
                        color: '#2C1810', fontFamily: "'DM Sans', sans-serif", outline: 'none', background: '#fff',
                      }}
                    />
                    <button onClick={() => addTopic(level.id)} style={{
                      padding: '8px 16px', borderRadius: 8, border: 'none',
                      background: level.color, color: '#fff', fontSize: 13,
                      fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                    }}>+</button>
                  </div>

                  <button onClick={() => toggleComfort(level.id)} style={{
                    padding: '8px 14px', borderRadius: 8,
                    border: `1.5px solid ${level.color}`,
                    background: isComfy ? level.color : 'transparent',
                    color: isComfy ? '#fff' : level.color,
                    fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
                  }}>
                    {isComfy ? '✓ Этот уровень мне комфортен' : 'Отметить как комфортный'}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function QuestionGenerator() {
  const [category, setCategory] = useState('all');
  const [current, setCurrent] = useState(null);
  const [used, setUsed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');

  const categories = ['all', ...new Set(DEEP_QUESTIONS.map(q => q.category))];

  const getNext = () => {
    const pool = DEEP_QUESTIONS.filter(q => (category === 'all' || q.category === category) && !used.includes(q.q));
    if (pool.length === 0) { setUsed([]); return; }
    const picked = pool[Math.floor(Math.random() * pool.length)];
    setCurrent(picked);
    setUsed(u => [...u, picked.q]);
    setAiQuestion('');
  };

  const getAiQuestion = async () => {
    setLoading(true);
    setAiQuestion('');
    try {
      const result = await window.claude.complete({
        messages: [{
          role: 'user',
          content: `Придумай один глубокий вопрос для партнёров, который поможет углубить близость и самораскрытие. Уровень глубины: ${category === 'all' ? 'любой' : category}. Только сам вопрос, без пояснений. На русском языке.`
        }]
      });
      setAiQuestion(result.trim());
    } catch (e) {
      setAiQuestion('Расскажи мне о моменте, когда ты чувствовал(а) себя полностью принятым(ой).');
    }
    setLoading(false);
  };

  const levelColor = current ? PYRAMID_LEVELS.find(l => l.id === current.level)?.color || '#5B3A7E' : '#5B3A7E';

  return (
    <div>
      <p style={m4s.body}>Эти вопросы помогут вам и партнёру перейти от поверхностного к глубокому. Выберите категорию и начните разговор:</p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)} style={{
            padding: '7px 14px', borderRadius: 8,
            border: `1.5px solid ${category === cat ? '#5B3A7E' : '#EDE0D4'}`,
            background: category === cat ? '#F5EFF8' : 'transparent',
            color: category === cat ? '#5B3A7E' : '#7A5C4A',
            fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
            fontWeight: category === cat ? 600 : 400, transition: 'all 0.2s',
          }}>{cat === 'all' ? 'Все темы' : cat}</button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <button onClick={getNext} style={{
          flex: 1, padding: '13px', borderRadius: 10, border: 'none',
          background: '#5B3A7E', color: '#fff', fontSize: 14, fontWeight: 600,
          cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
        }}>
          🎲 Случайный вопрос
        </button>
        <button onClick={getAiQuestion} disabled={loading} style={{
          flex: 1, padding: '13px', borderRadius: 10,
          border: '2px solid #5B3A7E', background: 'transparent',
          color: loading ? '#A08878' : '#5B3A7E', fontSize: 14, fontWeight: 600,
          cursor: loading ? 'default' : 'pointer', fontFamily: "'DM Sans', sans-serif",
          transition: 'all 0.2s',
        }}>
          {loading ? '⏳ Создаю...' : '✨ Создать с AI'}
        </button>
      </div>

      {(current || aiQuestion) && (
        <div style={{
          background: current && !aiQuestion
            ? `linear-gradient(135deg, ${levelColor}18, ${levelColor}08)`
            : 'linear-gradient(135deg, #F5EFF8, #EBE4F4)',
          border: `2px solid ${current && !aiQuestion ? levelColor : '#7A50A0'}40`,
          borderRadius: 16, padding: '28px 30px',
          animation: 'fadeIn 0.4s ease',
        }}>
          {current && !aiQuestion && (
            <div style={{ fontSize: 11, fontWeight: 700, color: levelColor, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
              {PYRAMID_LEVELS.find(l => l.id === current.level)?.label} · {current.category}
            </div>
          )}
          {aiQuestion && (
            <div style={{ fontSize: 11, fontWeight: 700, color: '#7A50A0', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
              ✨ AI-вопрос
            </div>
          )}
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: '#2C1810', lineHeight: 1.4, fontStyle: 'italic' }}>
            «{aiQuestion || current?.q}»
          </div>
          <div style={{ marginTop: 16, fontSize: 13, color: '#7A5C4A', lineHeight: 1.65 }}>
            <em>Совет: не торопитесь с ответом. Дайте себе и партнёру время почувствовать, что возникает.</em>
          </div>
        </div>
      )}

      {!current && !aiQuestion && (
        <div style={{ textAlign: 'center', padding: '32px', color: '#A08878', fontSize: 14 }}>
          Нажмите кнопку выше, чтобы получить вопрос для глубокого разговора
        </div>
      )}

      <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }`}</style>
    </div>
  );
}

function Module4({ onComplete }) {
  return (
    <div>
      <style>{`@media(max-width:768px){.m4-wrap{padding:24px 16px 60px !important;}.m4-hero{padding:36px 24px !important;}.m4-title{font-size:28px !important;}}`}</style>
      <div style={m4s.wrap} className="m4-wrap">
        <div style={m4s.hero} className="m4-hero">
          <div style={m4s.heroSuit}>♠</div>
          <div style={m4s.heroNum}>Модуль 04</div>
          <div style={m4s.heroTitle} className="m4-title">Игра<br/>Самораскрытия</div>
          <div style={m4s.heroSub}>Истинная близость рождается тогда, когда мы позволяем другому увидеть нас настоящими.</div>
        </div>

        <div style={m4s.section}>
          <div style={m4s.sectionTitle}>Уровни близости</div>
          <p style={m4s.body}>Холл описывает самораскрытие как путешествие вглубь. Большинство отношений застревают на поверхностных уровнях — не из-за отсутствия желания, а из-за страхов, которые блокируют путь вниз.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {['Страх отвержения', 'Страх уязвимости', 'Стыд и самооценка', 'Прошлые раны', 'Отсутствие доверия'].map(f => (
              <div key={f} style={{ background: '#F8F0FC', border: '1px solid #D8C0EC', borderRadius: 10, padding: '12px 14px', display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ color: '#5B3A7E', fontSize: 14 }}>🔒</span>
                <span style={{ fontSize: 13, color: '#4A2860' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={m4s.section}>
          <div style={m4s.sectionTitle}>Пирамида самораскрытия</div>
          <DisclosurePyramid />
        </div>

        <div style={m4s.section}>
          <div style={m4s.sectionTitle}>Генератор глубоких вопросов</div>
          <QuestionGenerator />
        </div>

        <div style={m4s.section}>
          <div style={m4s.sectionTitle}>Ключевые инсайты</div>
          {[
            ['♠', 'Самораскрытие — это не слабость. Это мужество. И именно оно создаёт настоящую близость.'],
            ['🗝️', 'Нас боятся узнать — потому что боятся, что, увидев настоящего нас, уйдут. Но именно скрытость и создаёт дистанцию.'],
            ['🌊', 'Глубина самораскрытия определяет глубину отношений. Поверхностные разговоры = поверхностная связь.'],
          ].map(([icon, text]) => (
            <div key={text} style={m4s.insightRow}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{icon}</span>
              <div style={{ fontSize: 14, color: '#5A4438', lineHeight: 1.65 }}>{text}</div>
            </div>
          ))}
        </div>

        <button style={m4s.nextBtn} onClick={() => onComplete(4)}>
          Модуль 5: Языки Любви →
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { Module4 });
