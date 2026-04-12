
const Contact = () => {
  return (
    <section className="py-20 text-center px-4">

      {/* Heading */}
      <h2 className="text-3xl font-bold mb-10">Contact Page</h2>

      {/* Google Map */}
      <div className="w-full mb-16">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.3915999877236!2d67.14294437482744!3d24.884620744291297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33944a58c9575%3A0x8eebd6c5d34ae034!2sShama%20shopping%20centre!5e0!3m2!1sen!2s!4v1738517418359!5m2!1sen!2s"
          className="w-full h-100 border-0 rounded-lg"
          loading="lazy"
          title="map"
        ></iframe>
      </div>

      {/* Form */}
      <div className="max-w-xl mx-auto">
        <form
          action="https://formspree.io/f/mnnjvgbw"
          method="POST"
          className="flex flex-col gap-6"
        >
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            autoComplete="off"
            className="px-4 py-3 border rounded-md outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="email"
            name="Email"
            placeholder="Email"
            required
            autoComplete="off"
            className="px-4 py-3 border rounded-md outline-none focus:ring-2 focus:ring-green-500"
          />

          <textarea
            name="Message"
            rows="6"
            placeholder="Enter Your Message"
            required
            autoComplete="off"
            className="px-4 py-3 border rounded-md outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>

          <input
            type="submit"
            value="Send"
            className="bg-green-500 text-white py-3 rounded-md cursor-pointer transition duration-200 hover:bg-white hover:text-green-500 hover:border hover:border-green-500 hover:scale-95"
          />
        </form>
      </div>
    </section>
  );
};

export default Contact;