export default function FeaturedCard({ title, img }: { title: string, img: string }) {
    return (
        <div className="bg-gray-100 dark:bg-white/5 rounded-xl p-4 flex items-center justify-between border border-black/5 dark:border-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors cursor-default overflow-hidden group">
            <div className="min-w-0">
                <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Featured</span>
                <div className="hidden max-sm:block min-[500px]:block">
                    <h4 className="text-sm md:text-base font-bold truncate text-black dark:text-white">
                        {title}
                    </h4>
                </div>
            </div>

            <img
                src={img}
                className="w-10 h-10 md:w-16 md:h-16 rounded-lg object-contain shrink-0 ml-4 group-hover:scale-105 transition-transform"
                alt=""
            />
        </div>
    );
}