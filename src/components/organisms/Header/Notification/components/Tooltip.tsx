import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/atoms/tooltip";
import { Button } from "@/components/atoms/button";
import { cn } from "@/lib/utils";

interface TooltipNotificationProps {
    handleArquivada: () => void;
    title: string;
    icon: React.ReactNode;
    className?: string;
}

export function TooltipNotification({
    handleArquivada,
    title,
    icon,
    className
}: TooltipNotificationProps) {
    return (
        <div>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        onClick={handleArquivada}
                        className={cn("bg-transparent text-black", className)}
                    >
                        {icon}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{title}</p>
                </TooltipContent>
            </Tooltip>
        </div>
    );
}
