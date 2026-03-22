"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {Card} from "@/components/atoms/card";
import {Skeleton} from "@/components/atoms/skeleton";

export default function RedirectWithSkeleton({to}: { to: string }) {
    const router = useRouter();

    useEffect(() => {
        const id = setTimeout(() => router.replace(to), 0);
        return () => clearTimeout(id);
    }, [router, to]);

    return (
        <div
            className="space-y-8 p-6"
            aria-busy="true"
            aria-live="polite"
            aria-label="A redirecionar para a sua formação…"
        >
            <div className="space-y-2">
                <Skeleton className="h-6 w-48 dark:bg-[#1d293d]"/>
                <Skeleton className="h-4 w-72 dark:bg-[#1d293d]"/>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {Array.from({length: 6}).map((_, i) => (
                    <Card key={i} className="p-4 space-y-4 border-none shadow-none">
                        <Skeleton className="h-5 w-3/4 dark:bg-[#1d293d]"/>
                        <Skeleton className="h-4 w-1/2 dark:bg-[#1d293d]"/>
                        <Skeleton className="h-32 w-full"/>
                        <div className="flex gap-3">
                            <Skeleton className="h-9 w-24 dark:bg-[#1d293d]"/>
                            <Skeleton className="h-9 w-24 dark:bg-[#1d293d]"/>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
