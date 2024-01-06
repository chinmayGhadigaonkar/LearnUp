import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FetchRequest from "../../utils/FetchRequest";
import { toast } from "react-toastify";

const AllComment = () => {
  const parms = useParams();

  const [comments, setComment] = useState([]);

  const GetAllComment = async (id) => {
    try {
      console.log(id);
      const res = await FetchRequest.get(`comments/getallcomment/${id}`);
      const { success, comments } = res.data;

      if (success) {
        // console.log(comments);

        setComment(comments);
        // toast.success("Comment added successfully");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetAllComment(parms.id);
  }, []);

  return (
    <div>
      <div className="mt-8 text-gray-300">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>

        {comments?.map((item) => {
          return (
            <div key={item._id} className="bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-start mb-4">
                <div className="">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOd6VLrAsHVVG0KJ7dMy-36-RAunP8w48blA&usqp=CAU"
                    alt="Author's profile"
                    className="w-10 h-10 rounded-full mr-4"
                  />
                </div>
                <div className="ml-4">
                  <p className="text-gray-800 font-semibold">John Doe</p>
                  <p className="text-gray-600">October 6, 2023</p>
                </div>
              </div>
              <p className="text-gray-800">{item.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllComment;
