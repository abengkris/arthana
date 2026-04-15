import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

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
          cookiesToSet.forEach(({ name, value, options }) =>
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

  // ONBOARDING REDIRECTION LOGIC
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');
  const isOnboarding = request.nextUrl.pathname.startsWith('/onboarding');

  if (user) {
    const onboardingComplete = user.user_metadata?.onboarding_complete;

    if (isDashboard && !onboardingComplete) {
      return NextResponse.redirect(new URL('/onboarding', request.url));
    }

    if (isOnboarding && onboardingComplete) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } else if (isDashboard || isOnboarding) {
    // If not logged in and trying to access dashboard or onboarding, redirect to login
    // Note: Assuming login page is at / or /login.
    // For now, just let it pass to the dashboard which should handle its own auth check if not in middleware.
    // But usually middleware handles it.
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return supabaseResponse;
}
