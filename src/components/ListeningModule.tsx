'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useToast } from './Toast';

const PASSAGE_TEXT = `Good morning, Riverside Health Club. My name is Jenny. How can I help you?

Hi, Jenny. I'm interested in joining the club. Could you give me some information about the membership options?

Of course. We have three types of membership. The basic plan costs 35 pounds per month, and that gives you access to the gym and the swimming pool. The standard plan is 52 pounds per month and includes all the basic facilities plus group fitness classes. And finally, the premium plan is 78 pounds per month, which gives you unlimited access to everything, including personal training sessions.

That sounds good. I think the standard plan would suit me best. What are your opening hours?

We're open from 6 in the morning until 10 at night on weekdays. On Saturdays we open at 8 and close at 8. And on Sundays we're open from 9 until 6 in the evening.

Great. And is there a car park available?

Yes, we have a free car park at the back of the building with space for 120 cars. We also have bicycle racks near the main entrance if you prefer to cycle.`;

export default function ListeningModule() {
  const { showToast } = useToast();
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const startTimeRef = useRef<number>(0);
  const elapsedRef = useRef<number>(0);

  // Use SpeechSynthesis to generate audio from the passage text
  const estimatedDuration = 65; // ~65 seconds for this passage

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      clearInterval(intervalRef.current);
    };
  }, []);

  const togglePlay = useCallback(() => {
    if (playing) {
      window.speechSynthesis.cancel();
      clearInterval(intervalRef.current);
      elapsedRef.current = currentTime;
      setPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(PASSAGE_TEXT);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.lang = 'en-GB';

    // Try to use a British voice
    const voices = window.speechSynthesis.getVoices();
    const britishVoice = voices.find((v) => v.lang.includes('en-GB')) || voices.find((v) => v.lang.includes('en'));
    if (britishVoice) utterance.voice = britishVoice;

    utterance.onend = () => {
      clearInterval(intervalRef.current);
      setPlaying(false);
      setCurrentTime(estimatedDuration);
      showToast('Audio finished! Now answer the questions.');
    };

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setPlaying(true);
    setDuration(estimatedDuration);
    startTimeRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = elapsedRef.current + (Date.now() - startTimeRef.current) / 1000;
      setCurrentTime(Math.min(elapsed, estimatedDuration));
    }, 200);

    showToast('🎧 Playing audio — listen carefully!');
  }, [playing, currentTime, showToast]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const fmtTime = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  // Deterministic waveform heights (no Math.random — avoids hydration mismatch)
  const WAVE_HEIGHTS = [18,9,24,12,7,20,15,26,10,22,8,19,14,25,11,6,21,16,23,13,17,9,24,7,20,12,26,15,8,22,19,10,25,14,6,21,11,23,16,18,13,7,24,20,9,26,12,15,22,8,19,25,10,14,21,6,23,17,11,18];
  const waveformBars = WAVE_HEIGHTS.map((h, i) => ({
    h,
    isPlayed: i < Math.floor((progress / 100) * 60),
  }));

  const submitAnswers = () => {
    const filled = Object.values(answers).filter((v) => v.trim()).length;
    if (filled === 0) { showToast('Please fill in at least one answer before submitting.'); return; }
    showToast(`✅ ${filled} answer${filled > 1 ? 's' : ''} submitted! AI is checking...`);
    setTimeout(() => showToast(`📊 Results: ${filled}/6 answered. Estimated band: 6.5`), 2200);
  };

  return (
    <div className="tab-content active" id="panel-listening" role="tabpanel" aria-labelledby="tab-listening">
      <div className="listening-wrap">
        <div className="listening-header">
          <div>
            <h3 className="listening-title">Listening — Section 1</h3>
            <div className="listening-meta">Riverside Health Club Inquiry · Questions 1–10</div>
          </div>
          <span className="listening-badge">Conversation · Beginner</span>
        </div>

        <div className="audio-player">
          <div className="audio-player-inner">
            <button type="button" className="play-btn" onClick={togglePlay} aria-label={playing ? 'Pause audio' : 'Play audio'}>
              <i className={playing ? 'ti ti-player-pause' : 'ti ti-player-play'} aria-hidden="true" />
            </button>
            <div className="audio-progress-wrap">
              <div className="audio-waveform">
                {waveformBars.map((bar, i) => (
                  <div key={i} className={`audio-wf-bar${bar.isPlayed ? ' played' : ''}`} style={{ height: bar.h }} />
                ))}
              </div>
              <div className="audio-bar-track">
                <div className="audio-bar-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="audio-times">
                <span>{fmtTime(currentTime)}</span>
                <span>{fmtTime(estimatedDuration)}</span>
              </div>
            </div>
            <div className="audio-volume">
              <i className="ti ti-volume" style={{ color: 'var(--text3)', fontSize: 16 }} />
              <input type="range" min="0" max="100" defaultValue={80} className="volume-slider" aria-label="Volume" />
            </div>
          </div>
          <div className="audio-tags">
            <span className="audio-tag accent">Section 1</span>
            <span className="audio-tag teal">Conversation</span>
            <span className="audio-tag gray">~1:05 min</span>
            <span className="audio-tag gray">British Accent</span>
          </div>
        </div>

        <div className="listen-instructions">
          <i className="ti ti-info-circle" style={{ color: 'var(--accent3)', fontSize: 15 }} />
          Listen carefully and complete the sentences below. Use <strong>NO MORE THAN TWO WORDS AND/OR A NUMBER</strong> for each answer.
        </div>

        <div className="listening-questions">
          <div className="lq-group">
            <div className="lq-group-title">Questions 1–6: Complete the sentences</div>
            <div className="lq-grid">
              {[
                { id: 'lq1', label: '1. The basic membership costs', hint: 'price per month', placeholder: 'e.g. 25 pounds' },
                { id: 'lq2', label: '2. The standard plan costs', hint: 'price per month', placeholder: 'e.g. 40 pounds' },
                { id: 'lq3', label: '3. The premium plan includes', hint: 'special feature', placeholder: 'e.g. yoga classes' },
                { id: 'lq4', label: '4. On weekdays the club opens at', hint: 'time', placeholder: 'e.g. 7 am' },
                { id: 'lq5', label: '5. On Sundays the club closes at', hint: 'time', placeholder: 'e.g. 5 pm' },
                { id: 'lq6', label: '6. The car park has space for', hint: 'number of cars', placeholder: 'e.g. 80 cars' },
              ].map((q) => (
                <div className="lq-item" key={q.id}>
                  <label className="lq-label">{q.label} <span className="lq-blank-label">{q.hint}</span></label>
                  <input
                    type="text"
                    className="lq-input"
                    placeholder={q.placeholder}
                    aria-label={`Question ${q.id.replace('lq', '')}`}
                    value={answers[q.id] || ''}
                    onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="listening-footer">
          <button type="button" className="btn-listen-submit" onClick={submitAnswers}><i className="ti ti-check" aria-hidden="true" /> Submit All Answers</button>
          <button type="button" className="btn-listen-next" onClick={() => showToast('Loading Section 2...')}>Next Section <i className="ti ti-arrow-right" aria-hidden="true" /></button>
        </div>
      </div>
    </div>
  );
}
