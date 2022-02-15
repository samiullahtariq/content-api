import React, { FC } from "react";
// import { PostDataType } from "data/types";
import convertNumbThousand from "../../utils/convertNumbThousand";
import twFocusClass from "../../utils/twFocusClass";

// export interface PostCardLikeActionProps {
//   className?: string;
//   id: PostDataType["id"];
//   likeCount: number;
//   isLiked: boolean;
//   onClickLike?: (id: PostDataType["id"]) => void;
// }

const PostCardLikeAction = ({
  className = "px-3 h-8 text-xs",
  //id,
  twitter_shares,
  //isLiked = true,
//  onClickLike = () => {},
}) => {
  console.log(twitter_shares + "in the action")
  return (
    <button
      className={`nc-PostCardLikeAction relative min-w-[68px] flex items-center rounded-full leading-none group transition-colors ${className}`}
     // onClick={() => onClickLike(id)}
      title="Twitter_shares"
      data-nc-id="PostCardLikeAction"
    >
     <i className="lab la-twitter mr-1 w-1 text-base" style={{padding : "10px"}}>
        {/* <path
          fillRule="evenodd"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          // d="M11.995 7.23319C10.5455 5.60999 8.12832 5.17335 6.31215 6.65972C4.49599 8.14609 4.2403 10.6312 5.66654 12.3892L11.995 18.25L18.3235 12.3892C19.7498 10.6312 19.5253 8.13046 17.6779 6.65972C15.8305 5.18899 13.4446 5.60999 11.995 7.23319Z"
          // clipRule="evenodd"
        ></path> */}
      </i>

      <span
        className={`ml-1`}
      >
      
        {convertNumbThousand(twitter_shares)}
      </span>
    </button>
  );
};

export default PostCardLikeAction;
