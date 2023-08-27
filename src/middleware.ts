import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  // console.log("Pathname:", request.nextUrl.pathname);
  // if (request.nextUrl.pathname === "/profile") {
  // Validate JWT token
  //   if (usernameLoggedIn) {
  //     console.log("Pathname:", "WELCOME TO PROFILE");
  //     return NextResponse.redirect(new URL('/profile', request.url!))
  //   } else {
  //     return NextResponse.redirect(new URL('/login', request.url!))
  //   }
    
  // } 
  return NextResponse.next()
}
 
