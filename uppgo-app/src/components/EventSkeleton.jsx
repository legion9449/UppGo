function EventSkeleton() {
  return (
    <div className="animate-pulse rounded-xl overflow-hidden shadow-lg bg-white">

      <div className="h-60 bg-gray-300"></div>

      <div className="p-4 space-y-3">

        <div className="h-4 bg-gray-300 rounded w-3/4"></div>

        <div className="h-3 bg-gray-200 rounded w-1/2"></div>

        <div className="h-3 bg-gray-200 rounded w-2/3"></div>

      </div>

    </div>
  );
}

export default EventSkeleton;