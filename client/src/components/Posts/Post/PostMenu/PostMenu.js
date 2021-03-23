import React from "react";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "./styles.scss";
import { HiDotsHorizontal } from "react-icons/hi";

export const PostMenu = () => {
  return (
    <div className="menu">
      <Menu
        menuButton={
          <MenuButton className="menu-button">
            <HiDotsHorizontal />
          </MenuButton>
        }
      >
        <MenuItem className="menu-item">Edit post</MenuItem>
        <MenuItem className="menu-item">Delete post</MenuItem>
      </Menu>
    </div>
  );
};
