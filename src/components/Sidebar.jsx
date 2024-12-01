import React from "react";
import {
  MdHome,
  BiHistory,
  HiOutlineVideoCamera,
  BiLike,
  HiOutlineUser,
  HiOutlineBookOpen,
} from "./icons";
import Button from "./Button";

const Sidebar = () => {
  const sideComp = [
    {
      text: "Home",
      to: "/",
      children: <MdHome size={20} />,
    },
    {
      text: "History",
      to: "/history",
      children: <BiHistory size={20} />,
    },
    {
      text: "Liked Videos",
      to: "/liked-videos",
      children: <BiLike size={20} />,
    },
    {
      text: "Subscriptions",
      to: "/subscriptions",
      children: <HiOutlineUser size={20} />,
    },
    {
      text: "Playlists",
      to: "/playlists",
      children: <HiOutlineBookOpen size={20} />,
    },
  ];
  return (
    <>
      {/* <hr /> */}
      <aside className="bg-[#161618] hidden md:flex flex-col justify-between items-center p-3 py-8 m-0 fixed left-0 w-[180px] h-[90vh] overflow-y-auto">
        {sideComp.map((comp) => (
          <Button
            key={comp.text}
            className="px-4 min-w-[150.635px] py-2 my-3 flex items-center justify-start border-[1px] border-[#bccee4]"
            bgColor="bg-[#161618]"
          >
            <div className="flex items-center justify-start">
              <div className="m-1">{comp.children}</div>
              <div className="">{comp.text}</div>
            </div>
          </Button>
        ))}
      </aside>
    </>
  );
};

export default Sidebar;
