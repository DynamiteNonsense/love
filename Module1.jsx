
// Module 1: «Что такое Игры Любви?»
// Interactive: user creates 2-3 game cards with Name/Rules/Triggers/Payoff

const { useState, useEffect, useRef } = React;

const M1_COLORS = {
  accent: '#C05A3A',
  accentLight: '#FAF0EB',
  accentMid: '#E8A090',
  gold: '#C8842A',
  dark: '#2C1810',
  mid: '#7A5C4A',
  cream: '#FAF6F0',
  card: '#FFFFFF',
};

const m1Styles = {
  wrap: { maxWidth: 780, margin: '0 auto', padding: '48px 32px 80px' },
  hero: {
    background: 'linear-gradient(135deg, #2C1810 0%, #5A2A18 100%)',
    borderRadius: 20,
    padding: '52px 48px',
    marginBottom: 40,
    position: 'relative',
    overflow: 'hidden',
  },
  heroSuit: {
    position: 'absolute', top: 20, right: 28,
    fontSize: 80, opacity: 0.12, color: '#C05A3A',
    fontFamily: 'serif', lineHeight: 1,
    userSelect: 'none',
  },
  heroNum: {
    fontFamily: "'Playfair Display', serif",
    color: '#C8842A',
    fontSize: 13,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  heroTitle: {
    fontFamily: "'Playfair Display', serif",
    color: '#F5EDE0',
    fontSize: 38,
    fontWeight: 700,
    lineHeight: 1.15,
    marginBottom: 12,
  },
  heroSub: {
    color: '#A08878',
    fontSize: 16,
    lineHeight: 1.6,
    maxWidth: 480,
  },
  section: {
    background: '#FFFFFF',
    borderRadius: 16,
    padding: '32px 36px',
    marginBottom: 24,
    boxShadow: '0 2px 16px rgba(44,24,16,0.07)',
  },
  sectionTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 22,
    color: '#2C1810',
    fontWeight: 700,
    marginBottom: 16,
  },
  body: { fontSize: 15, lineHeight: 1.75, color: '#5A4438', marginBottom: 12 },
  tag: {
    display: 'inline-block',
    background: '#FAF0EB',
    color: '#C05A3A',
    borderRadius: 6,
    padding: '3px 10px',
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.06em',
    marginRight: 8,
    marginBottom: 8,
  },
  expand: {
    background: 'none',
    border: 'none',
    color: '#C05A3A',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 600,
    padding: '4px 0',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  twoCol: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
    marginTop: 16,
  },
  infoBox: {
    borderRadius: 12,
    padding: '18px 20px',
    fontSize: 14,
    lineHeight: 1.65,
  },
  // Game card styles
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: 20,
    marginTop: 20,
  },
  gameCard: {
    background: '#FFFDF9',
    border: '2px solid #EDE0D4',
    borderRadius: 16,
    padding: 24,
    position: 'relative',
    transition: 'all 0.25s',
  },
  gameCardActive: {
    borderColor: '#C05A3A',
    boxShadow: '0 4px 20px rgba(192,90,58,0.15)',
  },
  cardCorner: {
    position: 'absolute',
    top: 10,
    right: 14,
    fontFamily: "'Playfair Display', serif",
    fontSize: 22,
    color: '#C05A3A',
    opacity: 0.6,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#A08878',
    marginBottom: 5,
  },
  fieldInput: {
    width: '100%',
    border: 'none',
    borderBottom: '1.5px solid #EDE0D4',
    background: 'transparent',
    padding: '5px 0',
    fontSize: 14,
    color: '#2C1810',
    fontFamily: "'DM Sans', sans-serif",
    outline: 'none',
    transition: 'border-color 0.2s',
    marginBottom: 14,
  },
  fieldTextarea: {
    width: '100%',
    border: '1.5px solid #EDE0D4',
    borderRadius: 8,
    background: 'transparent',
    padding: '8px 10px',
    fontSize: 13,
    color: '#2C1810',
    fontFamily: "'DM Sans', sans-serif",
    outline: 'none',
    resize: 'none',
    lineHeight: 1.5,
    marginBottom: 14,
    transition: 'border-color 0.2s',
  },
  addBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
    padding: '14px',
    borderRadius: 12,
    border: '2px dashed #C8842A',
    background: 'transparent',
    color: '#C8842A',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
    transition: 'all 0.2s',
    marginTop: 20,
  },
  deleteBtn: {
    position: 'absolute',
    top: 10,
    left: 12,
    background: 'none',
    border: 'none',
    color: '#C8B0A0',
    cursor: 'pointer',
    fontSize: 14,
    padding: 4,
    lineHeight: 1,
    transition: 'color 0.2s',
  },
  insightRow: {
    display: 'flex',
    gap: 12,
    alignItems: 'flex-start',
    marginBottom: 14,
    padding: '14px 16px',
    background: '#FAF6F0',
    borderRadius: 10,
  },
  insightIcon: {
    fontSize: 18,
    flexShrink: 0,
    marginTop: 1,
  },
  insightText: {
    fontSize: 14,
    lineHeight: 1.65,
    color: '#5A4438',
  },
  nextBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
    padding: '16px',
    borderRadius: 12,
    border: 'none',
    background: 'linear-gradient(135deg, #C05A3A, #C8842A)',
    color: '#fff',
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
    marginTop: 32,
    boxShadow: '0 4px 20px rgba(192,90,58,0.3)',
    transition: 'all 0.2s',
  },
};

const EXAMPLE_GAMES = [
  { name: 'Игра «Угадай мои мысли»', rules: 'Я не говорю о своих нуждах, ожидая что партнёр сам догадается', triggers: 'Партнёр не замечает моё настроение', payoff: 'Чувствую себя «непонятым», подтверждаю убеждение «никто не заботится»' },
  { name: 'Игра «Критик»', rules: 'Замечаю только ошибки партнёра, редко хвалю', triggers: 'Что-то идёт не по плану', payoff: 'Ощущение контроля, но растущая дистанция' },
];

function GameCardWidget({ onDone }) {
  const saved = (() => {
    try { return JSON.parse(localStorage.getItem('ggl_m1_games') || 'null'); } catch { return null; }
  })();
  const [cards, setCards] = useState(saved || [
    { id: 1, name: '', rules: '', triggers: '', payoff: '' }
  ]);
  const [activeCard, setActiveCard] = useState(1);

  useEffect(() => {
    localStorage.setItem('ggl_m1_games', JSON.stringify(cards));
  }, [cards]);

  const update = (id, field, value) => {
    setCards(cs => cs.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const addCard = () => {
    if (cards.length >= 4) return;
    const newId = Date.now();
    setCards(cs => [...cs, { id: newId, name: '', rules: '', triggers: '', payoff: '' }]);
    setActiveCard(newId);
  };

  const removeCard = (id) => {
    if (cards.length <= 1) return;
    setCards(cs => cs.filter(c => c.id !== id));
  };

  const filledCount = cards.filter(c => c.name && c.rules).length;

  return (
    <div>
      <p style={{...m1Styles.body, marginBottom: 20}}>
        Вспомните 1–3 паттерна поведения в отношениях, которые повторяются снова и снова. Это и есть ваши текущие «игры». Заполните карточки:
      </p>
      <div style={m1Styles.cardGrid}>
        {cards.map((card, idx) => (
          <div
            key={card.id}
            style={{
              ...m1Styles.gameCard,
              ...(activeCard === card.id ? m1Styles.gameCardActive : {}),
            }}
            onClick={() => setActiveCard(card.id)}
          >
            {cards.length > 1 && (
              <button style={m1Styles.deleteBtn} onClick={e => { e.stopPropagation(); removeCard(card.id); }}>✕</button>
            )}
            <div style={m1Styles.cardCorner}>♥</div>
            <div style={{marginBottom: 16, marginTop: 4}}>
              <div style={m1Styles.fieldLabel}>Название игры</div>
              <input
                style={{
                  ...m1Styles.fieldInput,
                  borderBottomColor: activeCard === card.id ? '#C05A3A' : '#EDE0D4',
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 16,
                  fontWeight: 600,
                }}
                placeholder="Игра «...»"
                value={card.name}
                onChange={e => update(card.id, 'name', e.target.value)}
              />
            </div>
            <div>
              <div style={m1Styles.fieldLabel}>Правила</div>
              <textarea
                style={{
                  ...m1Styles.fieldTextarea,
                  borderColor: activeCard === card.id ? '#C05A3A' : '#EDE0D4',
                  height: 64,
                }}
                placeholder="Что я делаю, когда «играю»..."
                value={card.rules}
                onChange={e => update(card.id, 'rules', e.target.value)}
              />
            </div>
            <div>
              <div style={m1Styles.fieldLabel}>Триггеры</div>
              <textarea
                style={{
                  ...m1Styles.fieldTextarea,
                  borderColor: activeCard === card.id ? '#C05A3A' : '#EDE0D4',
                  height: 56,
                }}
                placeholder="Что запускает эту игру..."
                value={card.triggers}
                onChange={e => update(card.id, 'triggers', e.target.value)}
              />
            </div>
            <div>
              <div style={m1Styles.fieldLabel}>Выигрыш / скрытая выгода</div>
              <textarea
                style={{
                  ...m1Styles.fieldTextarea,
                  borderColor: activeCard === card.id ? '#C05A3A' : '#EDE0D4',
                  height: 56,
                }}
                placeholder="Что я «получаю» от этой игры..."
                value={card.payoff}
                onChange={e => update(card.id, 'payoff', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      {cards.length < 4 && (
        <button style={m1Styles.addBtn} onClick={addCard}>
          <span style={{fontSize: 18, lineHeight: 1}}>+</span> Добавить ещё игру
        </button>
      )}

      {filledCount > 0 && (
        <div style={{
          marginTop: 24,
          background: 'linear-gradient(135deg, #FFF8F0, #FAF0E8)',
          border: '1px solid #EDD8C4',
          borderRadius: 12,
          padding: '18px 20px',
        }}>
          <div style={{fontFamily: "'Playfair Display', serif", fontSize: 15, color: '#C05A3A', marginBottom: 8, fontWeight: 700}}>
            💡 Ключевой вопрос для каждой игры
          </div>
          <p style={{fontSize: 14, color: '#5A4438', lineHeight: 1.7, margin: 0}}>
            Посмотрите на «выигрыш». Какой <strong>фрейм</strong> (убеждение о себе или партнёре) стоит за этой игрой? 
            Именно там — корень. Меняя фрейм, мы меняем игру.
          </p>
        </div>
      )}
    </div>
  );
}

function Module1({ onComplete, onNavigate }) {
  const [theoryOpen, setTheoryOpen] = useState(false);

  return (
    <div style={{paddingTop: 0}}>
      <style>{`
        @media (max-width: 768px) {
          .m1-wrap { padding: 24px 16px 60px !important; }
          .m1-hero { padding: 36px 24px !important; }
          .m1-hero-title { font-size: 28px !important; }
          .m1-two-col { grid-template-columns: 1fr !important; }
        }
        .add-card-btn:hover { background: #FFF5EC !important; }
        .next-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 28px rgba(192,90,58,0.38) !important; }
        .field-input:focus { border-bottom-color: #C05A3A !important; }
      `}</style>

      <div style={m1Styles.wrap} className="m1-wrap">
        {/* Hero */}
        <div style={m1Styles.hero} className="m1-hero">
          <div style={m1Styles.heroSuit}>♥</div>
          <div style={m1Styles.heroNum}>Модуль 01</div>
          <div style={m1Styles.heroTitle} className="m1-hero-title">
            Что такое<br/>Игры Любви?
          </div>
          <div style={m1Styles.heroSub}>
            Каждый из нас играет в игры в отношениях — осознанно или нет. 
            Этот модуль откроет вам главный секрет: фреймы управляют играми.
          </div>
        </div>

        {/* Theory Block */}
        <div style={m1Styles.section}>
          <div style={m1Styles.sectionTitle}>Центральная метафора</div>
          <p style={m1Styles.body}>
            Л. Майкл Холл предлагает смотреть на всё наше поведение в отношениях как на <strong>«игры»</strong> — 
            структурированные паттерны взаимодействия со своими правилами, триггерами и «выигрышем». 
            У каждой игры есть невидимый двигатель — <strong>фрейм</strong>.
          </p>
          <div style={{display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16}}>
            {['NLP', 'Нейро-Семантика', 'Meta-States', 'Frame Games'].map(t => (
              <span key={t} style={m1Styles.tag}>{t}</span>
            ))}
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14}} className="m1-two-col">
            <div style={{...m1Styles.infoBox, background: '#FFF8F4', border: '1px solid #F0D8CE'}}>
              <div style={{fontFamily: "'Playfair Display', serif", fontSize: 15, color: '#C05A3A', marginBottom: 8, fontWeight: 700}}>
                🎭 Внутренняя игра
              </div>
              <div style={{fontSize: 13, color: '#6A4A3C', lineHeight: 1.7}}>
                Мысли, чувства, убеждения, образы, внутренний диалог. То, что происходит внутри нас — 
                первичная реальность, которая создаёт внешнее поведение.
              </div>
            </div>
            <div style={{...m1Styles.infoBox, background: '#F4F8F4', border: '1px solid #CDE0CD'}}>
              <div style={{fontFamily: "'Playfair Display', serif", fontSize: 15, color: '#2D5240', marginBottom: 8, fontWeight: 700}}>
                🌍 Внешняя игра
              </div>
              <div style={{fontSize: 13, color: '#3A5A3C', lineHeight: 1.7}}>
                Действия, слова, жесты, поведение — то, что видит партнёр. Внешняя игра всегда 
                отражает внутреннюю.
              </div>
            </div>
          </div>

          <button
            style={m1Styles.expand}
            onClick={() => setTheoryOpen(o => !o)}
          >
            {theoryOpen ? '▲' : '▼'} {theoryOpen ? 'Скрыть детали' : 'Подробнее: анатомия игры'}
          </button>

          {theoryOpen && (
            <div style={{marginTop: 16, paddingTop: 16, borderTop: '1px solid #EDE0D4'}}>
              <p style={m1Styles.body}>
                Любая игра состоит из четырёх элементов. Как только вы их видите — 
                вы уже вне игры, вы — наблюдатель. А наблюдатель может изменить игру.
              </p>
              {[
                ['Имя', 'Как называется этот паттерн? Название даёт власть над ним.'],
                ['Правила', 'Что нужно делать / не делать, чтобы «правильно» играть?'],
                ['Триггеры', 'Что запускает игру? Слово, взгляд, ситуация...'],
                ['Выигрыш', 'Какую скрытую потребность удовлетворяет эта игра?'],
              ].map(([k, v]) => (
                <div key={k} style={{display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start'}}>
                  <div style={{
                    background: '#FAF0EB',
                    color: '#C05A3A',
                    borderRadius: 8,
                    padding: '4px 10px',
                    fontSize: 12,
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    marginTop: 2,
                    letterSpacing: '0.04em',
                  }}>{k}</div>
                  <div style={{fontSize: 14, color: '#5A4438', lineHeight: 1.65}}>{v}</div>
                </div>
              ))}

              <div style={{...m1Styles.infoBox, background: '#FFFBF0', border: '1px solid #EDD8A0', marginTop: 8}}>
                <div style={{fontSize: 13, color: '#7A5C10', lineHeight: 1.7}}>
                  <strong>Ключевая идея:</strong> Фреймы — это «рамки» восприятия, убеждения вроде «любовь означает...», 
                  «настоящий партнёр должен...», «если любит — то...». Фрейм создаёт игру. Хочешь изменить игру — 
                  найди и измени фрейм.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Interactive */}
        <div style={m1Styles.section}>
          <div style={m1Styles.sectionTitle}>
            Практика: Карточки ваших игр
          </div>
          <GameCardWidget />
        </div>

        {/* Примеры */}
        <div style={{...m1Styles.section, background: '#F5F8F5'}}>
          <div style={{...m1Styles.sectionTitle, fontSize: 18, marginBottom: 12}}>
            Примеры типичных игр
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14}}>
            {EXAMPLE_GAMES.map((g, i) => (
              <div key={i} style={{
                background: '#fff',
                borderRadius: 12,
                padding: '18px 20px',
                border: '1px solid #E8E0D8',
              }}>
                <div style={{fontFamily: "'Playfair Display', serif", fontSize: 15, color: '#2C1810', marginBottom: 8, fontWeight: 600}}>
                  {g.name}
                </div>
                {[['Правила', g.rules], ['Триггеры', g.triggers], ['Выигрыш', g.payoff]].map(([k, v]) => (
                  <div key={k} style={{marginBottom: 6}}>
                    <span style={{fontSize: 10, fontWeight: 700, color: '#A08878', letterSpacing: '0.1em', textTransform: 'uppercase'}}>{k}: </span>
                    <span style={{fontSize: 13, color: '#5A4438'}}>{v}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div style={m1Styles.section}>
          <div style={m1Styles.sectionTitle}>Ключевые инсайты</div>
          {[
            ['🎯', 'Осознание игры — это уже половина изменения. Нельзя изменить то, чего не видишь.'],
            ['🔑', 'Выигрыш всегда логичен. Ваша «плохая» игра когда-то была лучшим решением, которое вы нашли.'],
            ['🌱', 'Новый фрейм → новая игра → новый опыт. Это не магия — это нейро-семантика.'],
          ].map(([icon, text]) => (
            <div key={text} style={m1Styles.insightRow}>
              <span style={m1Styles.insightIcon}>{icon}</span>
              <div style={m1Styles.insightText}>{text}</div>
            </div>
          ))}
        </div>

        <button
          className="next-btn"
          style={m1Styles.nextBtn}
          onClick={() => onComplete(1)}
        >
          Модуль 2: Танец Романтики →
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { Module1 });
