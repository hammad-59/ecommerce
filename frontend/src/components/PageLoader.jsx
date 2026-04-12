const PageLoader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm z-50">
      <div className="w-14 h-14 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="mt-3 text-gray-600 font-medium">Please wait...</p>
    </div>
  );
};

export default PageLoader;