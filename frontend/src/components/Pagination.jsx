const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
  dropDown,
  setDropDown,
}) => {
  const renderPages = () => {
    const pages = [];
    const start = Math.max(currentPage - 1, 1);
    const end = Math.min(currentPage + 1, totalPages);

    // First page + start ellipsis
    if (start > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => setCurrentPage(1)}
          className="bg-white text-gray-700 px-3 py-1 rounded shadow-sm hover:bg-gray-200"
        >
          1
        </button>
      );

      if (start > 2) {
        pages.push(
          <span key="start-ellipsis" className="px-2 text-gray-500">
            ...
          </span>
        );
      }
    }

    // Middle pages
    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`bg-white text-gray-700 px-3 py-1 rounded shadow-sm hover:bg-gray-200 ${
            currentPage === i ? "font-bold bg-blue-600 text-black" : ""
          }`}
        >
          {i}
        </button>
      );
    }

    // End ellipsis + last page
    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push(
          <span key="end-ellipsis" className="px-2 text-gray-500">
            ...
          </span>
        );
      }

      pages.push(
        <button
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
          className="bg-white text-gray-700 px-3 py-1 rounded shadow-sm hover:bg-gray-200"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <section className="flex flex-col sm:flex-row items-center justify-evenly gap-3">
      {/* Pagination Buttons */}
      <div className="flex flex-wrap gap-1 justify-center">
        <button
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="bg-white text-gray-700 px-3 py-1 rounded shadow-sm hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>

        {totalPages > 1 && renderPages()}

        <button
          onClick={() =>
            setCurrentPage(Math.min(currentPage + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="bg-white text-gray-700 px-3 py-1 rounded shadow-sm hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      {/* Limit Dropdown */}
      <label className="mt-2 sm:mt-0">
        Show:
        <select
          name="limit"
          value={dropDown}
          onChange={(e) => {
            setDropDown(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="ml-2 border border-gray-300 rounded px-2 py-1"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </label>
    </section>
  );
};

export default Pagination;