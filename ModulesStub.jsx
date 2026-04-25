
// ModulesStub.jsx — Modules 5–12 stubs with basic structure + ModuleStub fallback

const { useState } = React;

const STUB_DATA = {
  5: {
    suit: '♥', color: '#B04060', bg: 'linear-gradient(135deg, #250818, #4A1030)',
    title: 'Языки Любви', subtitle: 'Стратегии Признательности',
    desc: 'Гэри Чепмен описал 5 языков любви, Холл добавляет нейро-семантическую глубину: у каждого из нас есть уникальная «стратегия любви» — последовательность VAK, которая зажигает наше сердце.',
    topics: ['5 языков любви', 'VAK-стратегия любви', 'Якорение позитивных состояний', '"Одна вещь, от которой я чувствую себя любимым"'],
    interactive: 'VAK-тест стратегии любви + персональная карта признательности',
    insights: [
      'Говорить на языке любви партнёра важнее, чем на своём.',
      'Стратегия любви — это последовательность: что нужно сначала увидеть, услышать, почувствовать.',
      'Якорение: связывайте ресурсные состояния с физическими жестами.',
    ],
  },
  6: {
    suit: '♦', color: '#8B6914', bg: 'linear-gradient(135deg, #1A1408, #3A2A10)',
    title: 'Искусство Общения', subtitle: 'Речь и Раппорт',
    desc: 'Слова — это инструменты фреймирования. То, как мы говорим с партнёром, либо строит связь, либо разрушает её. Холл различает четыре типа слушания и предлагает практику «сладких пустяков».',
    topics: ['4 типа слушания', 'Вербальный пейсинг и раппорт', '«Сладкие пустяки» (Sweet Nothings)', 'Стратегическая речь'],
    interactive: 'Симулятор диалога: выберите стиль ответа и увидьте эффект на эмоциональный счёт',
    insights: [
      '«Аттентивное» слушание — это дар полного присутствия.',
      'Раппорт строится через зеркалирование языка и темпа партнёра.',
      'Маленькие слова любви, сказанные ежедневно, ценнее редких признаний.',
    ],
  },
  7: {
    suit: '♣', color: '#1A5C50', bg: 'linear-gradient(135deg, #081814, #0D2A24)',
    title: 'Синхронизация', subtitle: 'Мета-Программы Партнёров',
    desc: 'Мета-программы — это фильтры восприятия, которые определяют, как мы обрабатываем информацию и принимаем решения. Различия в мета-программах — главный источник «необъяснимых» конфликтов.',
    topics: ['Глобальный / детальный', 'Сходство / различие', 'Приближение / избегание', 'Внутренняя / внешняя референция', 'Опции / процедуры'],
    interactive: 'Тест мета-программ + радарная диаграмма сравнения с партнёром',
    insights: [
      'Конфликт из-за мета-программ — это не «кто прав», а «у нас разные карты».',
      'Знание профиля партнёра превращает раздражение в понимание.',
      'Гибкость: умение «переключать» мета-программы — навык великих любовников.',
    ],
  },
  8: {
    suit: '♠', color: '#3A4A7E', bg: 'linear-gradient(135deg, #080C1A, #1A2040)',
    title: 'Осознанная Любовь', subtitle: 'Проектирование Будущего',
    desc: 'Well-Formed Outcomes — метод НЛП для создания чётких, достижимых целей. В отношениях это означает переход от реактивного режима («что не так») к проактивному («что мы создаём»).',
    topics: ['Well-Formed Outcomes для отношений', 'Прогнозирование совместного будущего', 'Проактивное vs реактивное состояние', 'Таймлайн целей'],
    interactive: 'Конструктор «Хорошо сформулированного результата» + визуальная карта-таймлайн',
    insights: [
      'Отношения без осознанного направления дрейфуют — всегда куда-то, не всегда туда, куда вы хотите.',
      'WFO: результат должен быть позитивным, конкретным, достижимым и в вашей власти.',
      'Совместная карта будущего создаёт «притяжение» к желаемому.',
    ],
  },
  9: {
    suit: '♥', color: '#C03060', bg: 'linear-gradient(135deg, #250810, #4A1020)',
    title: 'Игра Удовольствия', subtitle: 'Карта Радости и Мета-плежур',
    desc: 'Холл разделяет первичные удовольствия (непосредственные ощущения) и мета-удовольствия (смысл, который мы придаём этим ощущениям). Именно мета-уровень определяет, насколько богата ваша жизнь радостью.',
    topics: ['Первичные и мета-удовольствия', 'Паттерн усиления радости', 'Де-плежуринг вредных привычек', 'Романтика через удовольствие'],
    interactive: 'Дерево удовольствий: от действий к ценностям',
    insights: [
      'Радость — это навык. Одни и те же события разные люди переживают по-разному.',
      'Мета-удовольствие: «Мне приятно, что мне приятно» — это усиливает опыт.',
      'Де-плежуринг: убрать смысловую «зарядку» с разрушительных привычек.',
    ],
  },
  10: {
    suit: '♦', color: '#A04010', bg: 'linear-gradient(135deg, #1A0C08, #3A1808)',
    title: 'Здоровый Конфликт', subtitle: 'Правила Честной Борьбы',
    desc: 'Конфликт в отношениях неизбежен. Вопрос не «как избежать», а «как драться честно». Холл предлагает фреймворк позитивной борьбы, где оба выигрывают.',
    topics: ['Позитивная борьба', 'Правила честного боя', 'Замечать обиды пока они маленькие', 'Эмоции как "просто эмоции"'],
    interactive: 'Трекер конфликта: фреймовый анализ ситуации → новый фрейм',
    insights: [
      'Конфликт = различие + важность. Ни одно из них не плохо.',
      'Правило честного боя: атакуй проблему, не человека.',
      'Мелкие обиды — это инвестиции в будущий взрыв. Обрабатывай их сразу.',
    ],
  },
  11: {
    suit: '♣', color: '#2A5A3A', bg: 'linear-gradient(135deg, #081408, #102818)',
    title: 'Исцеление Любви', subtitle: 'Пороги и Прощение',
    desc: 'Каждый человек имеет «порог» — точку, после которой он закрывается и перестаёт вкладывать в отношения. Узнать свой порог и научиться его нейтрализовать — ключевой навык.',
    topics: ['Пороги (thresholds) — когда человек "закрывается"', 'Паттерн нейтрализации порога', 'Прощение как процесс', 'Давать любви второй шанс'],
    interactive: 'Шкала порога 0–10 + пошаговый нейтрализатор',
    insights: [
      'Порог — это не слабость, это сигнал. Тело говорит: «Мне нужно что-то изменить».',
      'Прощение — это не про другого. Это про освобождение себя от груза.',
      'Нейтрализация порога: сначала признать, потом понять фрейм, потом выбрать новый.',
    ],
  },
  12: {
    suit: '♠', color: '#4A2A6A', bg: 'linear-gradient(135deg, #100818, #28103A)',
    title: 'Со-Творение', subtitle: 'Взаимозависимость и Слияние Миров',
    desc: 'Финальный модуль интегрирует всё пройденное. Здоровые отношения — это не зависимость и не независимость, а взаимозависимость двух целостных людей, создающих третью реальность — общий мир.',
    topics: ['Взаимозависимость vs зависимость vs независимость', 'Игра самооценки', 'Swish-паттерн для ресурсного Я', 'Ответственность к/за', 'Слияние карт реальности'],
    interactive: 'Финальная рефлексия: 5 игр + персональный план Великого Любовника',
    insights: [
      'Два целостных человека создают богатство. Двое неполных — взаимозависимость из страха.',
      'Swish: замените образ «слабого Я» на образ «ресурсного Я» — резко и быстро.',
      'Ваш персональный план — это не список задач. Это выбор игр, которые вы хотите играть.',
    ],
  },
};

function ModuleStub({ module, onComplete, onNavigate }) {
  if (!module) return null;
  const data = STUB_DATA[module.id];
  if (!data) return null;

  return (
    <div>
      <style>{`@media(max-width:768px){.stub-wrap{padding:24px 16px 60px !important;}.stub-hero{padding:36px 24px !important;}.stub-title{font-size:28px !important;}}`}</style>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '48px 32px 80px' }} className="stub-wrap">
        {/* Hero */}
        <div style={{
          background: data.bg, borderRadius: 20, padding: '52px 48px',
          marginBottom: 40, position: 'relative', overflow: 'hidden',
        }} className="stub-hero">
          <div style={{ position: 'absolute', top: 20, right: 28, fontSize: 80, opacity: 0.12, color: data.color, fontFamily: 'serif', userSelect: 'none' }}>
            {data.suit}
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", color: data.color, fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12 }}>
            Модуль {String(module.id).padStart(2, '0')}
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", color: '#F5EDE0', fontSize: 38, fontWeight: 700, lineHeight: 1.15, marginBottom: 12 }} className="stub-title">
            {data.title}<br/><span style={{ fontSize: 24, fontWeight: 400, opacity: 0.8 }}>{data.subtitle}</span>
          </div>
        </div>

        {/* Overview */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '32px 36px', marginBottom: 24, boxShadow: '0 2px 16px rgba(44,24,16,0.07)' }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: '#2C1810', fontWeight: 700, marginBottom: 16 }}>Обзор модуля</div>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: '#5A4438', marginBottom: 20 }}>{data.desc}</p>

          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: '#2C1810', fontWeight: 600, marginBottom: 12 }}>Ключевые темы</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10, marginBottom: 24 }}>
            {data.topics.map((t, i) => (
              <div key={i} style={{
                background: '#FAF6F0', borderRadius: 10, padding: '12px 16px',
                border: `1px solid ${data.color}30`, display: 'flex', gap: 10, alignItems: 'flex-start',
              }}>
                <span style={{ color: data.color, fontSize: 14, flexShrink: 0, marginTop: 2 }}>{data.suit}</span>
                <span style={{ fontSize: 13, color: '#5A4438', lineHeight: 1.5 }}>{t}</span>
              </div>
            ))}
          </div>

          <div style={{
            background: `${data.color}12`, border: `2px dashed ${data.color}50`,
            borderRadius: 14, padding: '20px 24px',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: data.color, textTransform: 'uppercase', marginBottom: 8 }}>
              🎯 Интерактивное упражнение
            </div>
            <div style={{ fontSize: 15, color: '#3C2818', lineHeight: 1.6 }}>{data.interactive}</div>
            <div style={{ marginTop: 12, fontSize: 13, color: '#7A5C4A', fontStyle: 'italic' }}>
              Полная интерактивность этого модуля скоро будет доступна
            </div>
          </div>
        </div>

        {/* Insights */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '32px 36px', marginBottom: 24, boxShadow: '0 2px 16px rgba(44,24,16,0.07)' }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: '#2C1810', fontWeight: 700, marginBottom: 16 }}>Ключевые инсайты</div>
          {data.insights.map((ins, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 14, padding: '14px 16px', background: '#FAF6F0', borderRadius: 10 }}>
              <span style={{ fontSize: 18, flexShrink: 0, color: data.color }}>{data.suit}</span>
              <div style={{ fontSize: 14, color: '#5A4438', lineHeight: 1.65 }}>{ins}</div>
            </div>
          ))}
        </div>

        {module.id < 12 ? (
          <button
            onClick={() => onComplete(module.id)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              width: '100%', padding: '16px', borderRadius: 12, border: 'none',
              background: `linear-gradient(135deg, ${data.color}, ${data.color}CC)`,
              color: '#fff', fontSize: 16, fontWeight: 600, cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif", marginTop: 8,
              boxShadow: `0 4px 20px ${data.color}40`, transition: 'all 0.2s',
            }}
          >
            Модуль {module.id + 1} →
          </button>
        ) : (
          <div style={{ textAlign: 'center', padding: '32px', background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(44,24,16,0.07)' }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: '#2C1810', fontWeight: 700, marginBottom: 12 }}>
              🎉 Поздравляем!
            </div>
            <p style={{ fontSize: 15, color: '#5A4438', lineHeight: 1.75, maxWidth: 480, margin: '0 auto 20px' }}>
              Вы прошли все 12 модулей курса «Игры Великих Любовников». 
              Теперь у вас есть карта — и умение её использовать.
            </p>
            <button
              onClick={() => onComplete(12)}
              style={{
                padding: '14px 32px', borderRadius: 12, border: 'none',
                background: 'linear-gradient(135deg, #C05A3A, #C8842A)',
                color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >Завершить курс ✓</button>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { ModuleStub, STUB_DATA });
