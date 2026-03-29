import React from 'react';
import { Skeleton } from "./skeleton";
import { Card, CardContent, CardHeader } from "./card";

export function MessageSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
          <div className="max-w-[80%]">
            <Skeleton className="h-20 w-64 rounded-2xl" />
            <Skeleton className="h-3 w-16 mt-1" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function CalendarSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 35 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

export function PaymentSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-24 mt-2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4 mt-2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Skeleton className="h-[600px] rounded-xl" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-64 rounded-xl" />
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function ListSkeleton({ count = 5 }) {
  return (
    <div className="space-y-3" role="status" aria-label="Loading content">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-lg">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function VaultSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading vault files">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-8 w-16" />
          </Card>
        ))}
      </div>
      {/* Files Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-start gap-3 mb-3">
              <Skeleton className="w-12 h-12 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="h-3 w-full mb-3" />
            <Skeleton className="h-3 w-3/4 mb-3" />
            <div className="flex gap-2">
              <Skeleton className="h-8 flex-1" />
              <Skeleton className="h-8 flex-1" />
              <Skeleton className="h-8 w-12" />
            </div>
          </Card>
        ))}
      </div>
      <span className="sr-only">Loading vault files...</span>
    </div>
  );
}

export function ChildrenSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading children profiles">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-32 w-full" />
            <div className="p-6 space-y-4">
              <div className="flex gap-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-20" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
              </div>
            </div>
          </Card>
        ))}
      </div>
      <span className="sr-only">Loading children profiles...</span>
    </div>
  );
}

export function StatsSkeleton({ count = 3 }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${count} gap-4`}>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-7 w-12" />
            </div>
            <Skeleton className="w-12 h-12 rounded-lg" />
          </div>
        </Card>
      ))}
    </div>
  );
}

export function GridSkeleton({ count = 6, cols = 3 }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${cols} gap-4`}>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="p-6">
          <div className="space-y-3">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-8 w-full mt-2" />
          </div>
        </Card>
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center" role="status" aria-label="Loading page">
      <div className="text-center">
        <Skeleton className="w-12 h-12 rounded-full mx-auto mb-4" />
        <Skeleton className="h-4 w-32 mx-auto" />
        <span className="sr-only">Loading page...</span>
      </div>
    </div>
  );
}