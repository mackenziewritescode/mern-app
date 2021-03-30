import React, { useContext } from "react";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";

import "@szhsin/react-menu/dist/index.css";
import "./styles.scss";
import { HiDotsHorizontal } from "react-icons/hi";
import { PostContext } from "../../Posts";

export const PostMenu = ({ id }) => {
  const { setCurrentPostId } = useContext(PostContext);

  const handleEdit = () => {
    setCurrentPostId(id);
    // scroll to top
  };

  return (
    <div className="menu">
      <Menu
        menuButton={
          <MenuButton className="menu-button">
            <HiDotsHorizontal />
          </MenuButton>
        }
      >
        <MenuItem className="menu-item" value="Edit" onClick={handleEdit}>
          Edit post
        </MenuItem>
        <MenuItem className="menu-item">Delete post</MenuItem>
      </Menu>
    </div>
  );
};
