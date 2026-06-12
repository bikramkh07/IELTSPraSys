'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useToast } from './Toast';
import MockFeedbackBanner from './MockFeedbackBanner';
import { fetchWritingFeedback, saveScore } from '@/lib/fetch-feedback';
import type { WritingFeedback } from '@/lib/api-response';

const WRITING_PROMPTS = [
  'The bar chart below shows the percentage of households with internet access in four different countries between 2005 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
  'The pie charts below show the main reasons why agricultural land becomes less productive in three regions of the world. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
  'The line graph below shows the average daily temperatures in three major cities over a twelve-month period. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
  'The table below gives information about the underground railway systems in six cities around the world. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
  'The two maps below show a town centre before and after the construction of a new shopping centre. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
  'The diagram below shows the process by which electricity is generated in a hydroelectric power station. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
];

const SAMPLE_ESSAY = `The bar chart illustrates the proportion of households that had access to the internet in four countries — the United States, Canada, Japan and Germany — over a fifteen-year period from 2005 to 2020.

Overall, all four nations experienced a significant rise in internet access during this period. The United States and Canada consistently maintained the highest levels of connectivity, while Japan and Germany started from lower bases but showed substantial growth.

In 2005, the United States led with approximately 62% of households connected, followed closely by Canada at 58%. By contrast, Japan and Germany had considerably lower rates of around 40% and 35% respectively.

By 2020, internet penetration had risen dramatically across all four countries. The United States reached 92%, while Canada followed at 90%. Japan showed the most rapid growth, climbing to 88%, nearly doubling its 2005 figure. Germany also increased significantly to 82%, though it remained the lowest among the four nations throughout the entire period.`;

export default function WritingModule() {
  const { showToast } = useToast();
  const [prompt, setPrompt] = useState(WRITING_PROMPTS[0]);
  const [essay, setEssay] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [seconds, setSeconds] = useState(1200);
  const [feedback, setFeedback] = useState<WritingFeedback | null>(null);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const autoSubmittedRef = useRef(false);

  const [hasStarted, setHasStarted] = useState(false);

  const submitFeedback = useCallback(async () => {
    const words = essay.trim() ? essay.trim().split(/\s+/).length : 0;
    if (words < 50) {
      showToast('Please write at least 50 words before requesting feedback.');
      return;
    }
    if (loading) return;

    setLoading(true);
    showToast('🤖 AI examiner is analysing your essay...');

    try {
      const data = await fetchWritingFeedback(essay, prompt);
      setFeedback(data);
      void saveScore('writing', data);
      const label = data.mock ? ' (sample)' : '';
      showToast(`Feedback ready! Overall Band: ${data.overall}${label} 📊`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Could not get feedback';
      showToast(message);
    } finally {
      setLoading(false);
    }
  }, [essay, prompt, loading, showToast]);

  useEffect(() => {
    if (!hasStarted) return;
    timerRef.current = setInterval(() => {
      setSeconds((s) => (s <= 0 ? 0 : s - 1));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted || seconds > 0 || autoSubmittedRef.current) return;
    autoSubmittedRef.current = true;
    showToast('⏰ Time is up! Submitting your essay...');
    void submitFeedback();
  }, [seconds, hasStarted, showToast, submitFeedback]);

  const timeStr = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

  const handleEssayChange = (val: string) => {
    if (!hasStarted) setHasStarted(true);
    setEssay(val);
    setWordCount(val.trim() ? val.trim().split(/\s+/).length : 0);
  };

  const loadNewPrompt = () => {
    const others = WRITING_PROMPTS.filter((p) => p !== prompt);
    setPrompt(others[Math.floor(Math.random() * others.length)]);
    setSeconds(1200);
    setFeedback(null);
    autoSubmittedRef.current = false;
    showToast('New prompt loaded! Timer reset. ✍️');
  };

  const loadSample = () => {
    setEssay(SAMPLE_ESSAY);
    setWordCount(SAMPLE_ESSAY.trim().split(/\s+/).length);
    showToast('Sample response loaded — 168 words ✅');
  };

  const wcColor = wordCount >= 150 ? 'var(--green)' : wordCount > 100 ? 'var(--gold)' : 'var(--text2)';

  return (
    <div className="tab-content active" id="panel-writing" role="tabpanel" aria-labelledby="tab-writing">
      <div className="exam-section">
        <div className="exam-topbar">
          <div className="exam-type-badge"><div className="type-dot" /> Writing Task 1 — Academic</div>
          <div className="exam-controls">
            <button type="button" className="exam-new-btn" onClick={loadNewPrompt}><i className="ti ti-refresh" aria-hidden="true" /> New Prompt</button>
            <div className="exam-timer" style={{ color: seconds < 300 ? 'var(--coral)' : 'var(--gold)' }}>{timeStr}</div>
          </div>
        </div>
        <div className="exam-body">
          <div className="writing-prompt">
            <div className="writing-prompt-label"><i className="ti ti-file-text" /> Task Prompt</div>
            <p>{prompt}</p>
            <p className="prompt-note">Write at least 150 words · Recommended time: 20 minutes</p>
          </div>
          <textarea
            className="writing-area"
            value={essay}
            onChange={(e) => handleEssayChange(e.target.value)}
            placeholder={'Begin your response here...\n\nThe AI examiner will evaluate your response across four IELTS writing criteria:\n• Task Achievement\n• Coherence & Cohesion\n• Lexical Resource\n• Grammatical Range & Accuracy'}
            aria-label="Essay writing area"
          />
          <div className="exam-footer">
            <div className="word-count">Words: <span className="wc-num" style={{ color: wcColor }}>{wordCount}</span> <span className="wc-min">/ 150 minimum</span></div>
            <div className="exam-footer-btns">
              <button type="button" className="btn-load-sample" onClick={loadSample}><i className="ti ti-file-import" aria-hidden="true" /> Load Sample</button>
              <button type="button" className="btn-get-feedback" onClick={() => void submitFeedback()} disabled={loading}>
                <i className="ti ti-brain" aria-hidden="true" /> {loading ? 'Analysing...' : 'Get AI Feedback'}
              </button>
            </div>
          </div>
          {feedback && (
            <div className="ai-feedback-panel" id="aiFeedbackPanel">
              <div className="ai-feedback-header">
                <div className="ai-avatar"><i className="ti ti-robot" /></div>
                <div><div className="ai-feedback-title">AI examiner Feedback</div><div className="ai-feedback-sub">IELTS Band Score Analysis</div></div>
                <button type="button" className="close-feedback" aria-label="Close writing feedback" onClick={() => setFeedback(null)}><i className="ti ti-x" aria-hidden="true" /></button>
              </div>
              {feedback.mock && <MockFeedbackBanner />}
              <div className="ai-scores-row">
                <div className="ai-score-chip"><div className="chip-val" style={{ color: 'var(--gold)' }}>{feedback.ta}</div><div className="chip-lab">Task Achievement</div></div>
                <div className="ai-score-chip"><div className="chip-val" style={{ color: 'var(--accent3)' }}>{feedback.cc}</div><div className="chip-lab">Coherence</div></div>
                <div className="ai-score-chip"><div className="chip-val" style={{ color: 'var(--teal)' }}>{feedback.lr}</div><div className="chip-lab">Lexical Resource</div></div>
                <div className="ai-score-chip"><div className="chip-val" style={{ color: 'var(--green)' }}>{feedback.gra}</div><div className="chip-lab">Grammar</div></div>
                <div className="ai-score-chip overall-chip"><div className="chip-val chip-overall">{feedback.overall}</div><div className="chip-lab">Overall Band</div></div>
              </div>
              <div className="ai-feedback-text">{feedback.feedback}</div>
              <div className="feedback-improvements">
                {feedback.improvements.map((imp, i) => (
                  <div key={i} className="improvement-tag"><i className="ti ti-arrow-up" /> {imp}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
