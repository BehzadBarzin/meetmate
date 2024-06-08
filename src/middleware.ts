import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// -----------------------------------------------------------------------------
// A route matcher to protect routes (require authentication)
const protectedRoutes = createRouteMatcher([
  "/",
  "/upcoming",
  "/previous",
  "/recordings",
  "/personal-room",
  "/meeting(.*)",
]);

// -----------------------------------------------------------------------------
// A middleware to determine the routes to protect
export default clerkMiddleware((auth, req) => {
  if (protectedRoutes(req)) {
    auth().protect();
  }
});

// -----------------------------------------------------------------------------
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
