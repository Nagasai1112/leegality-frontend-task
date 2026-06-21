const SkeletonCard = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col animate-pulse">
      
      <div className="aspect-square mb-4 bg-slate-200 rounded-md" />

      <div className="h-4 bg-slate-200 rounded mb-2 w-3/4" />

      <div className="flex items-center gap-2 mt-auto">
        <div className="h-4 bg-slate-200 rounded w-12" />
        <div className="h-4 bg-slate-200 rounded w-20" />
      </div>
    </div>
  );
};

export default SkeletonCard;