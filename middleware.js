export const config = {
  // This tells Vercel to only run this script when someone visits /portal
  matcher: ['/portal/:path*', '/portal'],
};

export default function middleware(request) {
  const basicAuth = request.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    // Change "karnel" and "build2026" to your desired username and password
    if (user === 'karnel' && pwd === 'build2026') {
      // Password is correct, allow them to see the page
      return; 
    }
  }

  // If password is wrong or not entered, block them and show the login prompt
  return new Response('Unauthorized: Access Denied', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Karnel Homes Secure Portal"',
    },
  });
}
