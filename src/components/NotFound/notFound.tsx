'use client'
export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
            {/* Linhas de fundo */}
            <div className="absolute inset-0">
                <svg
                    className="w-full h-full opacity-10"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <pattern id="circuit" width="100" height="100" patternUnits="userSpaceOnUse">
                            <path
                                d="M0 50 H100 M50 0 V100"
                                stroke="white"
                                strokeWidth="0.5"
                                fill="none"
                            />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#circuit)" />
                </svg>
            </div>

            {/* Conteúdo */}
            <h1 className="text-black/50 text-8xl font-bold z-10">404</h1>
            <p className="text-gray-400 text-lg z-10 mb-6">Page Not Found</p>
            <button
                onClick={() => window.history.back()}
                className="z-10 px-5 py-2 bg-white text-black rounded-full shadow hover:bg-gray-200 transition"
            >
                ← Go Back
            </button>
        </div>
    );
}
