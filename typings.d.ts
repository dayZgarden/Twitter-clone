export interface Tweet extends TweetBody { 
    _id: string
    _createdAt: string
    _updatedAt: string
    _rev: string
    type: 'tweet'
    blockTweet: boolean
}

export type TweetBody = {
    text: string
    username: string
    profileImg: string
    image?: string
}