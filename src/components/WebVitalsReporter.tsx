'use client';

import { useReportWebVitals } from 'next/web-vitals';

const ENABLED = process.env.NEXT_PUBLIC_ENABLE_WEB_VITALS === 'true';

export default function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    if (!ENABLED || typeof navigator === 'undefined') return;

    const payload = JSON.stringify({
      id: metric.id,
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      navigationType: metric.navigationType,
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/monitoring/web-vitals', payload);
      return;
    }

    void fetch('/api/monitoring/web-vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    });
  });

  return null;
}
