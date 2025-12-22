import React, { useContext } from "react";
import { UserContext } from "../../Pages/SkeletonPage";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const MediaPost = () => {
  const { user, setUser } = useContext(UserContext);
  //https://www.google.com/search?q=user+post+template+twitter&sca_esv=abeb4f522ce11e62&rlz=1C1VDKB_enCA1019CA1019&udm=2&biw=1920&bih=945&sxsrf=AE3TifMo4wM9olHg49aufq5DSA4KMK97xw%3A1765814565422&ei=JTFAaaPAGdXH0PEPq4PXwAY&ved=0ahUKEwjj5qTv-7-RAxXVIzQIHavBFWgQ4dUDCBI&uact=5&oq=user+post+template+twitter&gs_lp=Egtnd3Mtd2l6LWltZyIadXNlciBwb3N0IHRlbXBsYXRlIHR3aXR0ZXJIvwlQuAFYoQlwAXgAkAEAmAFjoAG4BKoBATe4AQPIAQD4AQGYAgCgAgCYAwCIBgGSBwCgB7sCsgcAuAcAwgcAyAcAgAgA&sclient=gws-wiz-img#sv=CAMSVhoyKhBlLUF5VmFtTzlweTE5OGlNMg5BeVZhbU85cHkxOThpTToOQWJYVHVFTzc2V0Y1MU0gBCocCgZtb3NhaWMSEGUtQXlWYW1POXB5MTk4aU0YADABGAcggbD3yAkwAkoKCAIQAhgCIAIoAg
  return (
    <div className=" grid  grid-cols-[repeat(auto-fit,550px)] gap-5">
      {user?.socials?.posts?.map((post, index) => (
        <div
          key={index}
          className="w-[550px] p-5 bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 rounded-xs cursor-pointer hover:scale-102 transition-all duration-250 ease-in-out"
        >
          <div className="bg-gradient-to-r from-gray-600 via-gray-700 to-gray-700">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-3">
                <div className="bg-gradient-to-br to-gray-400 via-gray-300 from-gray-200 w-[64px] h-[64px] rounded-full flex justify-center items-center text-2xl ">
                  {user?.profilePicture !== ""
                    ? user?.profilePicture
                    : user?.username.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex flex-col w-fit border-2">
                  <h1 className="font-semibold text-lg">{post.author}</h1>
                  <h1 className="-mt-1 -ml-5 text-md">{user?.displayName}</h1>
                </div>
              </div>
              <div className="flex items-center h-fit">
                <div
                  className="w-8 h-8 flex items-center justify-center rounded-full p-1
                hover:bg-blue-300/60 hover:scale-105 duration-300 transition-all cursor-pointer mr-2"
                >
                  <PersonAddIcon
                    className=" text-gray-700"
                    sx={{ fontSize: 22 }}
                  ></PersonAddIcon>
                </div>
                <div className="flex flex-row items-center justify-center cursor-pointer w-8 h-8 hover:bg-blue-300/60 hover:scale-105 duration-300 transition-all rounded-full p-1">
                  <h1 className="text-gray-700">•</h1>
                  <h1 className="text-gray-700">•</h1>
                  <h1 className="text-gray-700">•</h1>
                </div>
              </div>
            </div>
            <div className="max-w-[440px] h-[110px] mt-10 border-2 flex justify-start text-left px-2 overflow-hidden">
              <p className="break-words break-all line-clamp-6 p-1">
                {post?.content}
              </p>
            </div>
            <div className="flex flex-row gap-3">
              <div className="w-[195px] h-[175px] border-2 mt-5"></div>
              <div className="w-[195px] h-[175px] border-2 mt-5"></div>
            </div>
            {/*<p className="flex justify-start items-center text-left mt-1">
              {post?.datePosted &&
                new Date(post.datePosted).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
            </p>*/}
            <div className="flex flex-row gap-3 mt-3">
              <p>Comments</p>
              <p>Likes</p>
              <p>Dislikes</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MediaPost;
