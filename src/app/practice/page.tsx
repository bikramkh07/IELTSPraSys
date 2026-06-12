'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import AppShell from '@/components/AppShell';

function ModuleLoading() {
  return <div className="module-loading" role="status">Loading module...</div>;
}

const WritingModule = dynamic(() => import('@/components/WritingModule'), {
  loading: ModuleLoading,
});
const SpeakingModule = dynamic(() => import('@/components/SpeakingModule'), {
  loading: ModuleLoading,
});
const ReadingModule = dynamic(() => import('@/components/ReadingModule'), {
  loading: ModuleLoading,
});
const ListeningModule = dynamic(() => import('@/components/ListeningModule'), {
  loading: ModuleLoading,
});

const MODULES = ['writing', 'speaking', 'reading', 'listening'] as const;
const MODULE_ICONS: Record<string, string> = {
  writing: 'ti-pencil',
  speaking: 'ti-microphone',
  reading: 'ti-book',
  listening: 'ti-headphones',
};

export default function PracticePage() {
  const [activeModule, setActiveModule] = useState<string>('writing');

  return (
    <AppShell>
      <section className="content-section" id="modules">
        <div className="section-label">Practice Modules</div>
        <h2 className="section-h2">Your Daily AI Examiner</h2>
        <p className="section-sub">
          Choose a module and start practising. Your AI Examiner is ready to evaluate you in real time, 24 hours a day.
        </p>

        <div className="module-tabs" role="tablist">
          {MODULES.map((mod) => (
            <button
              key={mod}
              id={`tab-${mod}`}
              className={`module-tab${activeModule === mod ? ' active' : ''}`}
              role="tab"
              type="button"
              aria-selected={activeModule === mod}
              aria-controls={`panel-${mod}`}
              tabIndex={activeModule === mod ? 0 : -1}
              onClick={() => setActiveModule(mod)}
            >
              <i className={`ti ${MODULE_ICONS[mod]}`} /> {mod.charAt(0).toUpperCase() + mod.slice(1)}
            </button>
          ))}
        </div>

        {activeModule === 'writing' && <WritingModule />}
        {activeModule === 'speaking' && <SpeakingModule />}
        {activeModule === 'reading' && <ReadingModule />}
        {activeModule === 'listening' && <ListeningModule />}
      </section>
    </AppShell>
  );
}
