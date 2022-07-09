import { RefreshIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { Tweet } from "../typings";
import Tweetbox from "./TweetBox";
import TweetComponent from '../components/Tweet'
import { fetchTweets } from "../utils/fetchTweets";
import toast from "react-hot-toast";

interface Props {
  tweets: Tweet[];
}

export default function feed( {tweets: tweetsProp} : Props) {
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp)
  console.log(tweets)

  const handleRefresh = async () => {
    const refreshToast = toast.loading('Refreshing...')
    const tweets = await fetchTweets();
    setTweets(tweets)

    toast.success('Feed Updated!', {
      id: refreshToast
    })
  }
  
  return (
    <div className='col-span-7 lg:col-span-5 max-h-screen 
    scrollbar-hide overflow-scroll border-x'>
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <RefreshIcon
          onClick={handleRefresh}
          className="w-8 h-8 cursor-pointer
                text-twitter mt-5 mr-5 transition-all duration-500 ease-out
                hover:rotate-180 active:scale-125"
        />
      </div>

      <div>
        <Tweetbox setTweets={setTweets} />
      </div>

      <div>
        {tweets.map(tweet => (
          <TweetComponent key={tweet._id} tweet={tweet}/>
        ))}
      </div>

    </div>
  );
}
