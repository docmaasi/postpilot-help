import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { AppLayout } from './app/AppLayout.jsx';
import { PageSkeleton } from './app/PageSkeleton.jsx';

// Lazy-loaded pages
const Landing = React.lazy(() => import('./pages/Landing.jsx'));
const Dashboard = React.lazy(() => import('./pages/Dashboard.jsx'));
const Videos = React.lazy(() => import('./pages/Videos.jsx'));
const VideoDetail = React.lazy(() => import('./pages/VideoDetail.jsx'));
const Posts = React.lazy(() => import('./pages/Posts.jsx'));
const PostEditor = React.lazy(() => import('./pages/PostEditor.jsx'));
const Calendar = React.lazy(() => import('./pages/Calendar.jsx'));
const MediaLibrary = React.lazy(() => import('./pages/MediaLibrary.jsx'));
const Templates = React.lazy(() => import('./pages/Templates.jsx'));
const Campaigns = React.lazy(() => import('./pages/Campaigns.jsx'));
const Analytics = React.lazy(() => import('./pages/Analytics.jsx'));
const Comments = React.lazy(() => import('./pages/Comments.jsx'));
const Trending = React.lazy(() => import('./pages/Trending.jsx'));
const Connections = React.lazy(() => import('./pages/Connections.jsx'));
const Billing = React.lazy(() => import('./pages/Billing.jsx'));
const Circles = React.lazy(() => import('./pages/Circles.jsx'));
const Referrals = React.lazy(() => import('./pages/Referrals.jsx'));
const Settings = React.lazy(() => import('./pages/Settings.jsx'));
const Pricing = React.lazy(() => import('./pages/Pricing.jsx'));
const Terms = React.lazy(() => import('./pages/legal/Terms.jsx'));
const Privacy = React.lazy(() => import('./pages/legal/Privacy.jsx'));
const Cookies = React.lazy(() => import('./pages/legal/Cookies.jsx'));
const Contact = React.lazy(() => import('./pages/legal/Contact.jsx'));
const Blog = React.lazy(() => import('./pages/Blog.jsx'));
const BlogPost = React.lazy(() => import('./pages/BlogPost.jsx'));
const Platforms = React.lazy(() => import('./pages/Platforms.jsx'));

/** Public routes that bypass auth (no sidebar/header, no sign-in required) */
const PUBLIC_PATHS = ['/landing'];

function AuthGate({ children }) {
  const { pathname } = useLocation();
  const isPublic = PUBLIC_PATHS.includes(pathname);
  if (isPublic) return null;
  return children;
}

export function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageSkeleton />}>
        {/* Public routes — no auth required, no app layout */}
        <Routes>
          <Route path="/landing" element={<Landing />} />
        </Routes>

        {/* Authenticated app routes */}
        <AuthGate>
          <SignedIn>
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/videos/:id" element={<VideoDetail />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/posts/new" element={<PostEditor />} />
                <Route path="/posts/:id" element={<PostEditor />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/media" element={<MediaLibrary />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/campaigns" element={<Campaigns />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/analytics/:id" element={<Analytics />} />
                <Route path="/comments" element={<Comments />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="/connections" element={<Connections />} />
                <Route path="/circles" element={<Circles />} />
                <Route path="/referrals" element={<Referrals />} />
                <Route path="/billing" element={<Billing />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/platforms" element={<Platforms />} />
              </Route>
            </Routes>
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </AuthGate>
      </Suspense>
    </BrowserRouter>
  );
}
