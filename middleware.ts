import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
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
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is logged in, try to fetch locale from profiles if cookie is not set or differs
  const currentCookieLocale = request.cookies.get('NEXT_LOCALE')?.value;

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('locale')
      .eq('id', user.id)
      .single();

    if (profile?.locale && profile.locale !== currentCookieLocale) {
      response.cookies.set('NEXT_LOCALE', profile.locale, { path: '/' });
    } else if (!currentCookieLocale) {
      response.cookies.set('NEXT_LOCALE', 'id', { path: '/' });
    }
  } else if (!currentCookieLocale) {
    response.cookies.set('NEXT_LOCALE', 'id', { path: '/' });
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
