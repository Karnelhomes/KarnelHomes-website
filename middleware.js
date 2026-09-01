import { NextResponse } from 'next/server';

export const config = {
  // This ensures the password only applies to the /portal page
  matcher: ['/portal/:path*'],
};

export function middleware(req) {
  const basicAuth = req.headers.get('authorization');
  const url = req.nextUrl;

  // The password logic
  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    // Change "karnel" and "build2026" to whatever username and password you want
    if (user === 'karnel' && pwd === 'build2026') {
      return NextResponse.next();
    }
  }

  url.pathname = '/api/auth';

  // Force the browser to show a native Username/Password login box
  return new NextResponse('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Portal"',
    },
  });
}
