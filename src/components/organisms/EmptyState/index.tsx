import { Search } from 'lucide-react';
interface EmptyStateProps {
    title: string;
    description?: string;
    isborder?: boolean;
}
export function EmptyState({ title, description, isborder = true }: EmptyStateProps) {
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <div className={`w-10/12 flex justify-center items-center text-center py-12 ${isborder ? "border-2 border-dashed" : ""} rounded-2xl`}>
                <div className="max-w-md mx-auto">
                    <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{title}</h3>
                    <p className="text-muted-foreground text-lg">{description}</p>
                </div>
            </div>
        </div>
    );
}
