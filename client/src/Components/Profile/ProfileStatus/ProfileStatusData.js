import React from "react";
import { CgMenuRightAlt } from "react-icons/cg";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { GoPaperclip } from "react-icons/go";

export const ProfileStatusData = [
  {
    icon: <CgMenuRightAlt className="profile-status-icon" />,
    label: "Info",
    description: "ABOUT",
  },
  {
    icon: <MdOutlineLocalPostOffice className="profile-status-icon" />,
    label: 0,
    description: "MESSAGES",
  },
  {
    icon: <GoPaperclip className="profile-status-icon" />,
    label: 10,
    description: "POSTS",
  },
];
