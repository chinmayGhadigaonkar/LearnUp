import React from "react";

const ContactUS = () => {
  return (
    <section className="text-gray-600 body-font flex-1  py-9">
      <header className=" py-2  text-black font-bold text-2xl text-center">
        Contact Us
      </header>
      <div className="px-5 py-3 mx-auto   flex">
        <div className="lg:w-2/4 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:mx-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
          {/* <h2 className="text-gray-900 text-xl mb-1 font-medium title-font mx-auto">Contact Us</h2> */}

          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="message"
              className="leading-7 text-sm text-gray-600">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
          </div>
          <button className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg">
            Send
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactUS;
