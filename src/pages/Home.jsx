import { useAuth, useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import FetchRequest from "../utils/FetchRequest";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slice/userSlice";

const Home = () => {
  const { userId } = useAuth();
  const { isSignedIn, user } = useUser();
  const dispatch = useDispatch();

  const createClerkUser = async () => {
    if (isSignedIn) {
      const userData = user;
      const email = userData.emailAddresses[0].emailAddress;
      try {
        const credential = {
          userId,
          fullname: userData.fullName,
          username: userData.username,
          email,
        };

        const options = JSON.stringify(credential);
        const res = await FetchRequest.post("clerkauth/adduser", options);

        const { success, msg } = res.data;

        if (success) {
          toast.success("Registration successfully completed");
          return success;
        } else {
          toast.error(msg || "An error occurred");
        }
      } catch (error) {
        toast.error("An error occurred");
      }
    }
  };

  const getUser = async () => {
    if (isSignedIn) {
      const userData = user;
      const email = userData.emailAddresses[0].emailAddress;
      console.log(email);
      if (email !== undefined) {
        try {
          const res = await FetchRequest.get(
            `clerkauth/getemail?email=${email}`,
          );
          const { success, token, user } = res.data;
          console.log(user._id);

          console.log(success);
          if (success) {
            dispatch(setUser(token));
            return success;
          }

          return success;
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const init1 = async () => {
    const req = await getUser();
    return req;
  };

  const init2 = async () => {
    await createClerkUser();
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await init1();
      if (!res) {
        init2();
      }
    };
    fetchData();
  }, [isSignedIn]);

  return (
    <>
      <div className="bg-white text-black">
        <header className=" text-black h-80 py-auto sm:py-32 px-12">
          <h1 className="text-4xl font-bold">
            Welcome to <span className=" text-red-500 ">LearnUp.</span>
          </h1>
          <p className="pt-2 text-lg">Your Gateway to Collaborative Learning</p>
          <button className="flex my-8   text-white bg-black border-0 py-2 px-8 focus:outline-none hover:bg-white hover:border-red-500  hover:border-2 hover:text-red-500 rounded text-lg">
            Explore More
          </button>
        </header>

        <section className="text-gray-900 body-font bg-white">
          <div className="container px-5 py-24 mx-auto">
            <header className="text-center mb-20">
              <h1 className="sm:text-3xl text-2xl font-medium title-font text-black mb-4">
                Our Community
              </h1>
              <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500">
                Welcome to a vibrant online platform where students and
                professors come together for collaborative learning and
                knowledge sharing.
              </p>
              <div className="flex mt-6 justify-center">
                <div className="w-16 h-1 rounded-full bg-red-500 inline-flex"></div>
              </div>
            </header>
            <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
              <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-red-100 text-red-500 mb-5 flex-shrink-0">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-10 h-10"
                    viewBox="0 0 24 24">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <div className="flex-grow">
                  <h2 className="text-black text-lg title-font font-medium mb-3">
                    Enhanced Learning Experience
                  </h2>
                  <p className="leading-relaxed text-base">
                    This platform offers an immersive learning experience with
                    quick access to expert knowledge, interactive AI-driven
                    conversations, and insightful educational content.
                  </p>
                  <a
                    href="#"
                    className="mt-3 text-red-500 inline-flex items-center">
                    Learn More
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-red-100 text-red-500 mb-5 flex-shrink-0">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-10 h-10"
                    viewBox="0 0 24 24">
                    <circle cx="6" cy="6" r="3"></circle>
                    <circle cx="6" cy="18" r="3"></circle>
                    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                  </svg>
                </div>
                <div className="flex-grow">
                  <h2 className="text-black text-lg title-font font-medium mb-3">
                    Collaborative Knowledge Sharing
                  </h2>
                  <p className="leading-relaxed text-base">
                    The platform fosters efficient problem-solving through
                    collaborative Q&A discussions, enabling diverse perspectives
                    to enrich the learning process.
                  </p>
                  <a
                    href="#"
                    className="mt-3 text-red-500 inline-flex items-center">
                    Learn More
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-red-100 text-red-500 mb-5 flex-shrink-0">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-10 h-10"
                    viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="flex-grow">
                  <h2 className="text-black text-lg title-font font-medium mb-3">
                    AI-Powered Assistance
                  </h2>
                  <p className="leading-relaxed text-base">
                    The AI assistant provides instant responses to queries and
                    offers personalized assistance, enhancing the overall
                    educational support system.
                  </p>
                  <a
                    href="#"
                    className="mt-3 text-red-500 inline-flex items-center">
                    Learn More
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            {/* <button className="flex mx-auto mt-16 text-black bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg">
              Join Now
            </button> */}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
