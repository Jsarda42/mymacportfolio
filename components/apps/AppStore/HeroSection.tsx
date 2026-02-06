export default function HeroSection() {
    return (
        <>
            <div className="relative w-full aspect-video md:aspect-21/9 rounded-xl overflow-hidden mb-10 shadow-sm">
                <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-r from-black/80 md:from-black/60 via-transparent to-transparent z-10 p-6 md:p-8 flex flex-col justify-end">
                    <h2 className="text-xl md:text-3xl font-bold text-white max-w-xs leading-tight">
                        Experience the Studio               </h2>
                    <p className="hidden sm:block text-[10px] md:text-sm text-gray-200 max-w-sm mt-2 opacity-80">
                        A hand-curated library of professional tools.
                    </p>
                </div>
                <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564"
                    className="absolute inset-0 w-full h-full object-cover"
                    alt=""
                />
            </div>
        </>
    )
}