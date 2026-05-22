const NoItems = () => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 relative my-5 col-span-3">
      <div className="w-full max-w-xl rounded-lg border border-gray-200 bg-white p-10 sm:p-14 shadow-2xl text-center">
        
        <div className="flex justify-center">
          <img
            className="w-70 sm:w-96 md:w-md object-contain"
            src="https://cdn.dribbble.com/userupload/23000951/file/original-51162083f8d27d9af7c6c0a19b9116ba.gif"
            alt="no-items"
          />
        </div>

        <h1 className="mt-6 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
          Your Cart is Empty
        </h1>

        <p className="mt-4 text-base sm:text-lg text-gray-500">
          Looks like you haven’t added anything to your cart yet.
        </p>

      </div>
    </section>
  );
};

export default NoItems;