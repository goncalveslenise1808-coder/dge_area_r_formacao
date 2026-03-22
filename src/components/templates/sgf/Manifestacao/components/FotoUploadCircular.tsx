'use client'
import {useState} from "react";

export function FotoUploadCircular({user}: { user: any }) {
    const [fotoPreview] = useState<string | null>(
        typeof user?.foto === "string" ? user.foto : null
    );

    if (!fotoPreview) return null;

    return (
        <div className="flex flex-col items-center space-y-2 w-1/2">
            <label className="text-sm font-medium">Foto</label>

            <div
                className="relative p-1 w-28 h-28 rounded-full overflow-hidden border-2 border-dashed border-gray-300 bg-gray-50 hover:border-green-500 transition-colors"
            >
                <img
                    src={fotoPreview}
                    alt="Foto do utilizador"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}