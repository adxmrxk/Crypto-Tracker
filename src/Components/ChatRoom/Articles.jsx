import React, { useContext } from "react";
import { UserContext } from "../../Pages/SkeletonPage";

const Articles = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="p-3 grid grid-cols-3 gap-3">
      {user?.posts?.map((post, index) => (
        <div key={index} className="border-2 border-blue-400 mb-5 p-5">
          <h1 className="font-bold">{post.authorUsername}</h1>
          <p className="mt-2">{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Articles;
