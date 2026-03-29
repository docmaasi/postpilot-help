import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { AppLayout } from './app/AppLayout.jsx';
import { PageSkeleton } from './app/PageSkeleton.jsx';

// Lazy-loaded pages
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
const Settings = React.lazy(() => import('./pages/Settings.jsx'));
const Pricing = React.lazy(() => import('./pages/Pricing.jsx'));

export function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageSkeleton />}>
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
              <Route path="/billing" element={<Billing />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/pricing" element={<Pricing />} />
            </Route>
          </Routes>
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </Suspense>
    </BrowserRouter>
  );
}
