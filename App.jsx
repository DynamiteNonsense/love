
// App.jsx — Main shell: sidebar navigation + module router
// Exports: App to window

const { useState, useEffect, useCallback } = React;

const MODULES = [
  { id: 1, suit: '♥', title: 'Игры Любви', subtitle: 'Что такое фреймы и игры?', color: '#C05A3A' },
  { id: 2, suit: '♦', title: 'Танец Романтики', subtitle: 'Притяжение и состояние ума', color: '#C8842A' },
  { id: 3, suit: '♣', title: 'Эмоциональный Банк', subtitle: 'Вклады и снятия доверия', color: '#2D5240' },
  { id: 4, suit: '♠', title: 'Самораскрытие', subtitle: 'Путь к настоящей близости', color: '#5B3A7E' },
  { id: 5, suit: '♥', title: 'Языки Любви', subtitle: 'Стратегии признательности', color: '#B04060' },
  { id: 6, suit: '♦', title: 'Искусство Общения', subtitle: 'Речь и раппорт', color: '#8B6914' },
  { id: 7, suit: '♣', title: 'Синхронизация', subtitle: 'Мета-программы партнёров', color: '#1A5C50' },
  { id: 8, suit: '♠', title: 'Осознанная Любовь', subtitle: 'Проектирование будущего', color: '#3A4A7E' },
  { id: 9, suit: '♥', title: 'Игра Удовольствия', subtitle: 'Карта радости и мета-плежур', color: '#C03060' },
  { id: 10, suit: '♦', title: 'Здоровый Конфликт', subtitle: 'Правила честной борьбы', color: '#A04010' },
  { id: 11, suit: '♣', title: 'Исцеление Любви', subtitle: 'Пороги и прощение', color: '#2A5A3A' },
  { id: 12, suit: '♠', title: 'Со-Творение', subtitle: 'Взаимозависимость и слияние', color: '#4A2A6A' },
];

const appStyles = {
  root: {
    fontFamily: "'DM Sans', sans-serif",
    background: '#FAF6F0',
    minHeight: '100vh',
    display: 'flex',
    color: '#2C1810',
  },
  sidebar: {
    width: 280,
    minWidth: 280,
    background: '#1E1209',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    position: 'sticky',
    top: 0,
    overflowY: 'auto',
    zIndex: 10,
    flexShrink: 0,
  },
  sidebarHeader: {
    padding: '28px 24px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  logo: {
    fontFamily: "'Playfair Display', serif",
    color: '#F0E6D3',
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 1.3,
    marginBottom: 4,
  },
  logoSub: {
    color: '#8A7060',
    fontSize: 11,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
  },
  progressWrap: {
    padding: '12px 24px 16px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  progressLabel: {
    color: '#8A7060',
    fontSize: 11,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: 8,
    display: 'flex',
    justifyContent: 'space-between',
  },
  progressBar: {
    height: 4,
    background: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #C8842A, #C05A3A)',
    borderRadius: 2,
    transition: 'width 0.6s ease',
  },
  navList: {
    flex: 1,
    padding: '8px 12px',
    listStyle: 'none',
    margin: 0,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 12px',
    borderRadius: 10,
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginBottom: 2,
  },
  navItemActive: {
    background: 'rgba(200,132,42,0.18)',
  },
  navItemCompleted: {
    opacity: 0.7,
  },
  suitBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    flexShrink: 0,
    fontWeight: 'bold',
    position: 'relative',
  },
  navTitle: {
    color: '#D4C4B0',
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 1.2,
  },
  navSub: {
    color: '#6A5A4A',
    fontSize: 11,
    marginTop: 1,
  },
  checkMark: {
    marginLeft: 'auto',
    color: '#C8842A',
    fontSize: 13,
    flexShrink: 0,
  },
  main: {
    flex: 1,
    overflowY: 'auto',
    minHeight: '100vh',
  },
};

function Sidebar({ currentModule, completedModules, onNavigate }) {
  const total = MODULES.length;
  const completed = completedModules.length;
  const pct = Math.round((completed / total) * 100);

  return (
    <div style={appStyles.sidebar}>
      <div style={appStyles.sidebarHeader}>
        <div style={appStyles.logo}>Игры Великих<br/>Любовников</div>
        <div style={appStyles.logoSub}>Курс-тренинг · 12 модулей</div>
      </div>
      <div style={appStyles.progressWrap}>
        <div style={appStyles.progressLabel}>
          <span>Прогресс</span>
          <span style={{color: '#C8842A', fontWeight: 600}}>{pct}%</span>
        </div>
        <div style={appStyles.progressBar}>
          <div style={{...appStyles.progressFill, width: `${pct}%`}}></div>
        </div>
      </div>
      <ul style={appStyles.navList}>
        {MODULES.map(mod => {
          const isActive = mod.id === currentModule;
          const isDone = completedModules.includes(mod.id);
          return (
            <li
              key={mod.id}
              style={{
                ...appStyles.navItem,
                ...(isActive ? appStyles.navItemActive : {}),
                ...(isDone && !isActive ? appStyles.navItemCompleted : {}),
              }}
              onClick={() => onNavigate(mod.id)}
            >
              <div style={{
                ...appStyles.suitBadge,
                background: isActive ? mod.color : 'rgba(255,255,255,0.06)',
              }}>
                <span style={{color: isActive ? '#fff' : mod.color, fontSize: 14}}>{mod.suit}</span>
                <span style={{
                  position: 'absolute',
                  bottom: -1,
                  right: -1,
                  background: '#1E1209',
                  borderRadius: 3,
                  fontSize: 8,
                  color: '#6A5A4A',
                  padding: '0 2px',
                  fontFamily: 'monospace',
                }}>{mod.id}</span>
              </div>
              <div style={{flex: 1, minWidth: 0}}>
                <div style={{
                  ...appStyles.navTitle,
                  color: isActive ? '#F0E6D3' : '#A09080',
                }}>{mod.title}</div>
                <div style={appStyles.navSub}>{mod.subtitle}</div>
              </div>
              {isDone && <span style={appStyles.checkMark}>✓</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function App() {
  const [currentModule, setCurrentModule] = useState(() => {
    return parseInt(localStorage.getItem('ggl_current_module') || '1');
  });
  const [completedModules, setCompletedModules] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ggl_completed') || '[]'); }
    catch { return []; }
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('ggl_current_module', currentModule);
  }, [currentModule]);

  useEffect(() => {
    localStorage.setItem('ggl_completed', JSON.stringify(completedModules));
  }, [completedModules]);

  const handleComplete = useCallback((moduleId) => {
    setCompletedModules(prev => prev.includes(moduleId) ? prev : [...prev, moduleId]);
    if (moduleId < 12) setTimeout(() => setCurrentModule(moduleId + 1), 400);
  }, []);

  const navigate = useCallback((id) => {
    setCurrentModule(id);
    setSidebarOpen(false);
    window.scrollTo({ top: 0 });
  }, []);

  const ModuleComponent = window[`Module${currentModule}`];

  return (
    <div style={appStyles.root}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            zIndex: 99, display: 'none',
          }}
        />
      )}

      {/* Sidebar — hidden on mobile via CSS class */}
      <style>{`
        @media (max-width: 768px) {
          .sidebar-desktop { display: none !important; }
          .mobile-header { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-header { display: none !important; }
          .sidebar-desktop { display: flex !important; }
        }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 3px; }
      `}</style>

      <div className="sidebar-desktop" style={{display: 'flex', flexDirection: 'column'}}>
        <Sidebar
          currentModule={currentModule}
          completedModules={completedModules}
          onNavigate={navigate}
        />
      </div>

      {/* Mobile top bar */}
      <div className="mobile-header" style={{
        display: 'none',
        position: 'fixed',
        top: 0, left: 0, right: 0,
        background: '#1E1209',
        padding: '12px 16px',
        alignItems: 'center',
        gap: 12,
        zIndex: 100,
        height: 56,
      }}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
          background: 'none', border: 'none', color: '#F0E6D3',
          fontSize: 20, cursor: 'pointer', padding: 4,
        }}>☰</button>
        <span style={{fontFamily: "'Playfair Display', serif", color: '#F0E6D3', fontSize: 15}}>
          Игры Великих Любовников
        </span>
      </div>

      <div style={appStyles.main}>
        {ModuleComponent
          ? <ModuleComponent
              moduleId={currentModule}
              onComplete={handleComplete}
              onNavigate={navigate}
              completedModules={completedModules}
            />
          : <ModuleStub
              module={MODULES[currentModule - 1]}
              onComplete={handleComplete}
              onNavigate={navigate}
            />
        }
      </div>
    </div>
  );
}

Object.assign(window, { App, MODULES });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
