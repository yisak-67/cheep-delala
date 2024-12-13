import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { FaRegMessage } from "react-icons/fa6";
import * as Io5Icons from "react-icons/io5";
import { MdOutlineLocalPostOffice } from "react-icons/md";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome className="sidebar-icons" />,
    cName: "nav-text",
  },
  {
    title: "Messages",
    path: "/messages",
    icon: <MdOutlineLocalPostOffice className="sidebar-icons" />,
    cName: "nav-text",
  },
  {
    title: "Saved Items",
    path: "/saveditems",
    icon: <Io5Icons.IoSaveOutline className="sidebar-icons" />,
    cName: "nav-text",
  },
  {
    title: "Posts",
    path: "/posts",
    icon: <Io5Icons.IoNotificationsOutline className="sidebar-icons" />,
    cName: "nav-text",
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <Io5Icons.IoSettingsOutline className="sidebar-icons" />,
    cName: "nav-text",
  },
  {
    title: "Help and Support",
    path: "/help",
    icon: <Io5Icons.IoHelpCircleOutline className="sidebar-icons" />,
    cName: "nav-text",
  },
];
