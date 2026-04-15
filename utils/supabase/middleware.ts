import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Updates the user session and handles onboarding redirection logic.
 * @param {NextRequest} request - The incoming Next.js request.
 * @returns {Promise<NextResponse>} The updated Next.js response.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // refreshing the auth token
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Route paths
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');
  const isOnboarding = request.nextUrl.pathname.startsWith('/onboarding');
  const isAuth =
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/auth');

  if (user) {
    const onboardingComplete = user.user_metadata?.onboarding_complete;

    if (!onboardingComplete && !isOnboarding && !isAuth) {
      // Authenticated but not onboarded: force to /onboarding
      return NextResponse.redirect(new URL('/onboarding', request.url));
    }

    if (onboardingComplete && isOnboarding) {
      // Onboarded user: redirect away from /onboarding to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } else if (isDashboard || isOnboarding) {
    // Unauthenticated user: redirect to login if trying to access dashboard/onboarding
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return supabaseResponse;
}
