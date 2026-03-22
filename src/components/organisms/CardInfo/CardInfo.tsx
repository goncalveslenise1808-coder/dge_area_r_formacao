import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export function CardInfo({
     title,
     items,
     icon: Icon,
}: {
    title: string;
    items: string[];
    icon?: LucideIcon;
}) {
    return (
        <>
            {title && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="bg-blue-500/5 rounded-2xl p-6 border-2 border-blue-500/20"
                >
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                        {Icon && <Icon className="w-5 h-5 text-blue-600" />}
                        {title}
                    </h3>

                    <div className="space-y-2 text-sm text-muted-foreground">
                        {items.map((item, index) => (
                            <p key={index}>• {item}</p>
                        ))}
                    </div>
                </motion.div>
            )}
        </>
    );
}
