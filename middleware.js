import { NextResponse } from "next/server";
/*
// EXAMPLE
export function middleware(request) {
    console.log(request);
    
    return NextResponse.redirect(new URL("/about", request.url));
    }
    
    export const config = {
        matcher: ["/account", "/cabins"],
        }; 
*/

import { auth } from "./app/_lib/auth";
export const middleware = auth; // auth also serves as a middleware function, we make it explicit here

export const config = {
  matcher: ["/account/:path*"],
};
