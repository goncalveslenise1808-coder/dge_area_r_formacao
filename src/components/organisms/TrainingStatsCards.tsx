import {Card, CardContent, CardHeader, CardTitle} from "@/components/atoms/card";
import {ElementType} from "react";

interface TrainingStatsCardsProps {
    values?: (number | undefined)[];
    titles?: string[];
    icons?: ElementType[];
}

export function TrainingStatsCards({values, titles, icons}: TrainingStatsCardsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {values?.map((value, idx) => {
                const Icon = icons?.[idx];
                return (
                    <Card key={idx}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {titles?.[idx] || 'Status'}
                            </CardTitle>
                            {Icon && <Icon className="h-4 w-4 text-muted-foreground"/>}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{value ?? 0}</div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}