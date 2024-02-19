import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FetchRequest from "../../utils/FetchRequest";
import { useDispatch } from "react-redux";
import { AddComment, GetAllComment } from "../../store/slice/commentSlice";
import { toast } from "react-toastify";
import { UserProfile } from "@clerk/clerk-react";
import { useSelector } from "react-redux";

const AllComment = () => {
  const parms = useParams();

  // const [comments, setComment] = useState([]);

  // const GetAllComment = async (id) => {
  //   try {
  //     console.log(id);
  //     const res = await FetchRequest.get(`comments/getallcomment/${id}`);
  //     const { success, comments } = res.data;

  //     if (success) {
  //       // console.log(comments);

  //       setComment(comments);
  //       // toast.success("Comment added successfully");
  //       return;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const dispatch = useDispatch();
  useEffect(() => {
    // GetAllComment(parms.id);

    dispatch(GetAllComment(parms.id));
  }, []);

  const { comments } = useSelector((state) => state.comment);
  console.log(comments);

  return (
    <div>
      <div className="mt-8 text-gray-300">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>

        {comments?.map((item) => {
          return (
            <div key={item._id} className="bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-start mb-4">
                <div className="ml-0">
                  <p className="text-gray-800 font-semibold">
                    {item.user.fullname}
                  </p>
                  <p className="text-gray-600">
                    {new Date(item.createdAt).toDateString()}
                  </p>
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
