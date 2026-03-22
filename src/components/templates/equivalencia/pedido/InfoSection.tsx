import { ReactNode } from 'react';
import {Card} from "@/components/atoms/card";

interface InfoSectionProps {
    icon: ReactNode;
    title: string;
    children: ReactNode;
}

export function InfoSection({ title, children }: InfoSectionProps) {
    return (
        <Card className="p-6 bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex gap-4">
                <div className="flex-1 space-y-3">
                    <h2 className="text-gray-900">
                        {title}
                    </h2>
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </Card>
    );
}