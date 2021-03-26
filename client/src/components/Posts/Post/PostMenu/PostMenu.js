import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { unwrapResult } from "@reduxjs/toolkit";

import "@szhsin/react-menu/dist/index.css";
import "./styles.scss";
import { HiDotsHorizontal } from "react-icons/hi";
import { updatePost } from "../../../../api";

export const PostMenu = ({ id }) => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.postsData);
  const post = posts.find((post) => post._id === id);

  const handleEdit = async () => {
    try {
      const result = await dispatch(updatePost({ id: id, isEditing: true }));
      unwrapResult(result);
    } catch (error) {
      console.log(error);
    }
    // console.log(post);
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
