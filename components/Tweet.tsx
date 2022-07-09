import React, { useEffect, useState } from "react";
import { Tweet, Comment, CommentBody } from "../typings";
import TimeAgo from "react-timeago";
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import { fetchComments } from "../utils/fetchComments";
import { useSession } from "next-auth/react";
import toast from 'react-hot-toast'

interface Props {
  tweet: Tweet;
}

function Tweet({ tweet }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [input, setInput] = useState<string>('');

  const [commentBoxVisible, setCommentBoxVisible]=useState<boolean>(false)
  const { data:session } = useSession()

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id);
    setComments(comments);
  };

  useEffect(() => {
    refreshComments();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const commentToast = toast.loading('Comment posting...')

    const comment: CommentBody = {
        comment: input,
        tweetId: tweet._id,
        username: session?.user?.name || 'Unknown User',
        profileImg: session?.user?.image || 'https://links.papareact.com/gll'
    }

    const result = await fetch(`/api/addComment`, {
        body: JSON.stringify(comment),
        method: 'POST',
    })

    toast.success('Comment Posted', {
        id: commentToast,
    })

    setInput('')
    setCommentBoxVisible(false)
    refreshComments()
  }

  return (
    <div className="flex flex-col space-x-3 border-y p-5 border-gray-200">
      <div className="flex space-x-3">
        <img
          src={tweet.profileImg}
          alt=""
          className="w-10 h-10 rounded-full object-cover"
        />

        <div>
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">{tweet.username}</p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              @{tweet.username.replace(/\s+/g, "").toLowerCase()} •{" "}
            </p>

            <TimeAgo
              className="text-gray-500 text-sm"
              date={tweet._createdAt}
            />
          </div>

          <p className="pt-1">{tweet.text}</p>

          {tweet.image && (
            <img
              src={tweet.image}
              alt=""
              className="m-5 ml-0 mb-1
                    max-h-60 rounded-lg object-cover shadow-sm"
            />
          )}
        </div>
      </div>

      <div className="mt-5 flex justify-between">
        <div onClick={() => session && setCommentBoxVisible(!commentBoxVisible)} 
        className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <ChatAlt2Icon className="h-5 w-5" />
          <p>{comments.length}</p>
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <SwitchHorizontalIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <HeartIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <UploadIcon className="h-5 w-5" />
        </div>
      </div>

      {commentBoxVisible && (
        <form onSubmit = {handleSubmit} className="mt-3 flex space-x-3 ">
            <input
            className="flex-1 rounded-lg bg-gray-200 p-2 outline-none"
            type="text" 
            placeholder="Write a comment..." 
            value = {input}
            onChange={(e) => setInput(e.target.value)}
            />
            <button
            type = 'submit'
            disabled={!input} className="text-twitter disabled:text-gray-200">Post</button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t
        border-gray-200 p-5">
          {comments.map((comment) => (
            <div key={comment._id} className="flex space-x-2 relative">
                <hr className='absolute left-5 top-10 h-8 border-x border-twitter-30'/>
              <img
                src={comment.profileImg}
                alt=""
                className="mt-2 h-7 w-7 object-cover rounded-full"
              />
              <div>
                <div className="flex items-center space-x-1">
                  <p className="mr-1 font-bold">{comment.username}</p>
                  <p className="hidden text-sm text-gray-500 lg:inline">
                    @{comment.username.replace(/\s+/g, "").toLowerCase()} •
                  </p>

                  <TimeAgo
                    className="text-gray-500 text-sm"
                    date={comment._createdAt}
                  />
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tweet;
