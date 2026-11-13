'use client';

import { useMemo } from 'react';
import Script from 'next/script';
import { useSettings } from '@/context/SettingsProvider';

export const DEFAULT_GOOGLE_ANALYTICS_SCRIPT = `<script async src="https://www.googletagmanager.com/gtm.js?id=GTM-5TZCTCDP"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
</script>`;

const hashString = (value) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
};

const parseScriptAttributes = (attrsString) => {
  const attrs = {};
  const attrRegex =
    /([a-zA-Z_:][\w:.-]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  let attrMatch;

  while ((attrMatch = attrRegex.exec(attrsString)) !== null) {
    const name = attrMatch[1].toLowerCase();
    const val = attrMatch[2] ?? attrMatch[3] ?? attrMatch[4];

    if (name === 'src' && val) {
      const trimmedSrc = val.trim();
      if (!/^(?:javascript|vbscript|data):/i.test(trimmedSrc)) {
        attrs.src = trimmedSrc;
      }
    } else if (name === 'id' && val) {
      attrs.id = val;
    } else if (name === 'type' && val) {
      if (val.toLowerCase() !== 'text/javascript') {
        attrs.type = val;
      }
    } else if (name === 'async') {
      attrs.async = val === undefined ? true : val !== 'false';
    } else if (name === 'defer') {
      attrs.defer = val === undefined ? true : val !== 'false';
    } else if (name === 'nomodule') {
      attrs.noModule = val === undefined ? true : val !== 'false';
    } else if (name === 'crossorigin') {
      attrs.crossOrigin = val ?? 'anonymous';
    } else if (name === 'referrerpolicy' && val) {
      attrs.referrerPolicy = val;
    } else if (name === 'fetchpriority' && val) {
      attrs.fetchPriority = val;
    } else if (name === 'nonce' && val) {
      attrs.nonce = val;
    } else if (name === 'integrity' && val) {
      attrs.integrity = val;
    } else if (name.startsWith('data-')) {
      attrs[name] = val ?? '';
    }
  }

  return attrs;
};

export const parseAnalyticsScripts = (rawValue) => {
  const normalized = String(rawValue || '')
    .replace(/\r\n/g, '\n')
    .trim();

  if (!normalized) {
    return [];
  }

  const contentHash = hashString(normalized);

  if (!/<\s*script\b/i.test(normalized)) {
    if (/^GTM-[A-Z0-9]+$/i.test(normalized)) {
      const gtmId = normalized.toUpperCase();
      return [
        {
          key: `${contentHash}-0`,
          src: `https://www.googletagmanager.com/gtm.js?id=${gtmId}`,
          restProps: { async: true, fetchPriority: 'low' },
          inlineCode: '',
        },
        {
          key: `${contentHash}-1`,
          id: `hz-analytics-inline-${contentHash}-1`,
          src: null,
          restProps: {},
          inlineCode: `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());`,
        },
      ];
    }

    if (/^G-[A-Z0-9]+$/i.test(normalized)) {
      const gaId = normalized.toUpperCase();
      return [
        {
          key: `${contentHash}-0`,
          src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`,
          restProps: { async: true, fetchPriority: 'low' },
          inlineCode: '',
        },
        {
          key: `${contentHash}-1`,
          id: `hz-analytics-inline-${contentHash}-1`,
          src: null,
          restProps: {},
          inlineCode: `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', '${gaId}');`,
        },
      ];
    }

    return [];
  }

  const parsed = [];
  const tokenRegex = /<!--[\s\S]*?-->|<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let match;
  let index = 0;

  while ((match = tokenRegex.exec(normalized)) !== null) {
    if (match[0].startsWith('<!--')) {
      continue;
    }

    const attrs = parseScriptAttributes(match[1] || '');
    const inlineCode = (match[2] || '').trim();
    const { src, id, ...restProps } = attrs;

    if (src) {
      if (!restProps.fetchPriority) {
        restProps.fetchPriority = 'low';
      }
      parsed.push({
        key: `${contentHash}-${index}`,
        id,
        src,
        restProps,
        inlineCode: '',
      });
      index += 1;
    } else if (inlineCode) {
      parsed.push({
        key: `${contentHash}-${index}`,
        id: id || `hz-analytics-inline-${contentHash}-${index}`,
        src: null,
        restProps,
        inlineCode,
      });
      index += 1;
    }
  }

  return parsed;
};

export default function GoogleAnalyticsScripts() {
  const settings = useSettings();

  const hasKeyInSettings =
    Boolean(settings) &&
    (Object.prototype.hasOwnProperty.call(settings, 'google_analytics') ||
      (Array.isArray(settings?.data) &&
        settings.data.some((item) => item?.key === 'google_analytics')));

  const rawScript = hasKeyInSettings
    ? (settings.google_analytics ?? '')
    : DEFAULT_GOOGLE_ANALYTICS_SCRIPT;

  const scripts = useMemo(() => parseAnalyticsScripts(rawScript), [rawScript]);

  if (!scripts.length) {
    return null;
  }

  return (
    <>
      {scripts.map((item) =>
        item.src ? (
          <Script
            key={item.key}
            id={item.id}
            src={item.src}
            strategy="afterInteractive"
            {...item.restProps}
          />
        ) : (
          <Script
            key={item.key}
            id={item.id}
            strategy="afterInteractive"
            {...item.restProps}
          >
            {item.inlineCode}
          </Script>
        )
      )}
    </>
  );
}
