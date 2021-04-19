import React, { useContext } from "react";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { useDispatch } from "react-redux";

import "@szhsin/react-menu/dist/index.css";
import "./styles.scss";
import { HiDotsHorizontal } from "react-icons/hi";
import { ReplyContext } from "../Replies";
import { deleteReply } from "../../../../../features/repliesActions";
import { deletePost } from "../../../../../features/postsActions";
import { confirm } from "../../../../Confirm/Confirm";

export const FullPostMenu = ({ id }) => {
  const { setCurrentReplyId } = useContext(ReplyContext);

  const dispatch = useDispatch();

  const handleEdit = () => {
    setCurrentReplyId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async () => {
    if (await confirm("post")) {
      await dispatch(deletePost(id));
    }
  };

  return (
    <div className="reply-menu">
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
