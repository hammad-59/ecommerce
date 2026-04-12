import { FaSearch } from "react-icons/fa";



const Filters = ({
  handleOnChange,
  searchInput,
  meta,
  categories,
  subCategoriesToShow,
  subCategories,
  genderFilter,
}) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-5 mb-6">
      
      {/* 🔍 Search */}
      <div className="mb-5">
        <label className="font-semibold flex gap-5 items-center"> Search: <input
          type="text"
          name="searchInput"
          value={searchInput}
          onChange={handleOnChange}
          placeholder="Search products..."
          className="w-70 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
        /></label>
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 📂 Categories */}
        <div>
          <h3 className="font-semibold mb-2">Category</h3>
          <div className="flex flex-wrap gap-2">
            {meta?.category?.map((g, i) => (
              <label
                key={i}
                className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg cursor-pointer hover:bg-gray-200"
              >
                <input
                  type="checkbox"
                  name="categories"
                  value={g}
                  checked={categories.includes(g)}
                  onChange={handleOnChange}
                />
                <span className="text-sm">{g}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 📁 Sub Categories */}
        <div>
          <h3 className="font-semibold mb-2">Sub Category</h3>
          <div className="flex flex-wrap gap-2">
            {subCategoriesToShow.map((sub, i) => (
              <label
                key={i}
                className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg cursor-pointer hover:bg-gray-200"
              >
                <input
                  type="checkbox"
                  name="subCategories"
                  value={sub}
                  checked={subCategories.includes(sub)}
                  onChange={handleOnChange}
                />
                <span className="text-sm">{sub}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 🚻 Gender */}
        <div>
          <h3 className="font-semibold mb-2">Gender</h3>
          <div className="flex flex-wrap gap-2">
            {meta?.gender?.map((g, i) => (
              <label
                key={i}
                className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg cursor-pointer hover:bg-gray-200"
              >
                <input
                  type="checkbox"
                  name="gender"
                  value={g}
                  checked={genderFilter.includes(g)}
                  onChange={handleOnChange}
                />
                <span className="text-sm">{g}</span>
              </label>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Filters;