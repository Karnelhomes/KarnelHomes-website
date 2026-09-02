export const config = {
  // This tells Vercel to only require a password for the portal
  matcher: ['/portal/:path*', '/portal'],
};

export default function middleware(request) {
  const basicAuth = request.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    // You can change 'karnel' and 'build2026' to anything you want
    if (user === 'karnel' && pwd === 'build2026') {
      return; 
    }
  }

  // Shows the native browser login prompt
  return new Response('Unauthorized: Access Denied', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Karnel Homes Secure Portal"',
    },
  });
}
