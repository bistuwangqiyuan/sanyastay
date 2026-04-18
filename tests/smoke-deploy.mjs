/**
 * HTTP smoke tests for deployed SanyaStay (default: production Netlify).
 * Usage: npm run test:smoke
 *        SMOKE_BASE_URL=http://localhost:3000 npm run test:smoke
 */
const base = (process.env.SMOKE_BASE_URL || 'https://sanyastay.netlify.app').replace(/\/$/, '');

let failed = false;

function fail(message) {
  console.error('FAIL:', message);
  failed = true;
}

function ok(message) {
  console.log('OK:', message);
}

async function expectStatus(method, path, init, allowed) {
  const res = await fetch(`${base}${path}`, { ...init, redirect: 'follow' });
  if (!allowed.includes(res.status)) {
    fail(`${method} ${path} — expected HTTP ${allowed.join(' or ')}, got ${res.status}`);
    return null;
  }
  return res;
}

async function main() {
  console.log('Smoke base URL:', base, '\n');

  const pages = ['/', '/properties', '/help', '/login', '/register', '/community', '/about', '/host'];
  for (const p of pages) {
    const res = await expectStatus('GET', p, {}, [200]);
    if (res) ok(`GET ${p} (200)`);
  }

  const propRes = await expectStatus('GET', '/api/properties', {}, [200]);
  if (propRes) {
    try {
      const json = await propRes.json();
      if (!Array.isArray(json.properties)) {
        fail('GET /api/properties — JSON missing "properties" array');
      } else {
        ok('GET /api/properties (200 + shape)');
      }
    } catch (e) {
      fail(`GET /api/properties — invalid JSON: ${e.message}`);
    }
  }

  const commRes = await expectStatus('GET', '/api/community', {}, [200]);
  if (commRes) {
    try {
      const json = await commRes.json();
      if (!Array.isArray(json.posts)) {
        fail('GET /api/community — JSON missing "posts" array');
      } else {
        ok('GET /api/community (200 + shape)');
      }
    } catch (e) {
      fail(`GET /api/community — invalid JSON: ${e.message}`);
    }
  }

  const bookRes = await fetch(`${base}/api/bookings`, { redirect: 'follow' });
  if (![401, 503].includes(bookRes.status)) {
    fail(`GET /api/bookings — expected 401 or 503, got ${bookRes.status}`);
  } else {
    ok(`GET /api/bookings (${bookRes.status} — unauthenticated or DB off)`);
  }

  const chatRes = await fetch(`${base}/api/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: [{ role: 'user', content: 'ping' }] }),
    redirect: 'follow',
  });
  if (chatRes.status === 503) {
    ok('POST /api/ai/chat (503 — no OPENAI_API_KEY, expected on Netlify preview)');
  } else if (chatRes.status === 200) {
    ok('POST /api/ai/chat (200 — stream, key configured)');
  } else {
    fail(`POST /api/ai/chat — unexpected ${chatRes.status}`);
  }

  if (failed) {
    process.exit(1);
  }
  console.log('\nAll smoke checks passed.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
