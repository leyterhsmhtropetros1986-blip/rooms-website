import { NextResponse } from 'next/server';

const SESSION_COOKIE_NAME = 'admin_session';

function toBase64Url(bytes) {
  let str = '';
  bytes.forEach((byte) => {
    str += String.fromCharCode(byte);
  });
  return btoa(str).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function decodeBase64Url(value) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(padded);
  return new TextDecoder().decode(Uint8Array.from(binary, (ch) => ch.charCodeAt(0)));
}

async function hmacSign(secret, message) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return toBase64Url(new Uint8Array(signature));
}

async function isValidSession(token, secret, ownerEmails) {
  if (!token || !secret) return false;
  const [header, payload, signature] = token.split('.');
  if (!header || !payload || !signature) return false;

  const expected = await hmacSign(secret, `${header}.${payload}`);
  if (signature !== expected) return false;

  try {
    const decoded = JSON.parse(decodeBase64Url(payload));
    if (!decoded.sub || !decoded.exp) return false;
    if (decoded.exp < Math.floor(Date.now() / 1000)) return false;

    if (ownerEmails.length === 0) return true;
    return ownerEmails.includes(String(decoded.sub).toLowerCase());
  } catch {
    return false;
  }
}

export default async function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const sessionSecret = process.env.SESSION_SECRET || '';
  const ownerEmails = (process.env.ADMIN_OWNER_EMAILS || '')
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  const shouldProtectAdminPage = pathname.startsWith('/admin') && pathname !== '/admin/login.html';
  const shouldProtectAdminApi = pathname.startsWith('/api/admin') || pathname.startsWith('/api/auth/session');

  if (!shouldProtectAdminPage && !shouldProtectAdminApi) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const valid = await isValidSession(token, sessionSecret, ownerEmails);

  if (valid) return NextResponse.next();

  if (shouldProtectAdminApi) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }

  return Response.redirect(new URL('/admin/login.html', request.url));
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/api/auth/session'],
};
