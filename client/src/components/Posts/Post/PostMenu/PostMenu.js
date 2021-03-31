import React, { useContext } from "react";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { useDispatch, useSelector } from "react-redux";

import "@szhsin/react-menu/dist/index.css";
import "./styles.scss";
import { HiDotsHorizontal } from "react-icons/hi";
import { PostContext } from "../../Posts";
import { deletePost } from "../../../../features/postsSlice";

export const PostMenu = ({ id }) => {
  const { setCurrentPostId } = useContext(PostContext);

  const dispatch = useDispatch();

  // const posts = useSelector((state) => state.posts.postsData);
  // const existingPost = currentPostId
  //   ? posts.find((post) => post._id === currentPostId)
  //   : null;

  const handleEdit = () => {
    setCurrentPostId(id);
    // scroll to top
  };

  const handleDelete = async () => {
    await dispatch(deletePost(id));
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
        <MenuItem className="menu-item" onClick={handleDelete}>
          Delete post
        </MenuItem>
      </Menu>
    </div>
  );
};
