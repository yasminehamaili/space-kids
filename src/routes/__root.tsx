import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Starfield } from "../components/Starfield";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 pt-24">
      <div className="glass-panel max-w-md p-8 text-center">
        <h1 className="text-7xl font-bold text-white">404</h1>
        <p className="mt-4 text-white/80">This planet is lost in space!</p>
        <a href="/" className="mt-6 inline-block rounded-full bg-primary px-5 py-2 font-bold text-primary-foreground">
          Back to home
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center px-4 pt-24">
      <div className="glass-panel max-w-md p-8 text-center">
        <h1 className="text-2xl font-bold text-white">Oops, meteor strike!</h1>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rounded-full bg-primary px-5 py-2 font-bold text-primary-foreground"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Space Kids — Explore the Solar System!" },
      { name: "description", content: "A fun, colorful playground for kids to explore the planets of our Solar System." },
      { property: "og:title", content: "Space Kids — Explore the Solar System!" },
      { property: "og:description", content: "A fun, colorful playground for kids to explore the planets of our Solar System." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@400;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Starfield />
      <Navbar />
      <main className="pt-24">
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
