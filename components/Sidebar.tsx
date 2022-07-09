import React from 'react'
import {
    BellIcon,
    HashtagIcon,
    BookmarkIcon,
    CollectionIcon,
    DotsCircleHorizontalIcon,
    MailIcon,
    UserIcon,
    HomeIcon,
} from '@heroicons/react/outline'
import SideBarRow from './SidebarRow'
import { signIn, signOut, useSession } from 'next-auth/react';


export default function Sidebar() {
  const {data: session } = useSession();

  return (

    <div className='flex flex-col col-span-2 items-center px-4 md:items-start'>
        <img className='m-3 h-10 w-10'src="https://links.papareact.com/drq" alt="" />
        <SideBarRow Icon = {HomeIcon} title='Home' />
        <SideBarRow Icon = {HashtagIcon} title='Explore' />
        <SideBarRow Icon = {BellIcon} title='Notifications' />
        <SideBarRow Icon = {MailIcon} title='Messages' />
        <SideBarRow Icon = {BookmarkIcon} title='Bookmarks' />
        <SideBarRow Icon = {CollectionIcon} title='Lists' />
        <SideBarRow onClick={session ? signOut : signIn} Icon = {UserIcon} title={session? 'Sign Out' : 'Sign In'} />
        <SideBarRow Icon = {DotsCircleHorizontalIcon} title='More' />
    </div>

  )
}
