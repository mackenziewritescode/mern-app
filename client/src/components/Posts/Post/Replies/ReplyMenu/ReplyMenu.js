import React, { useContext } from "react";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { useDispatch } from "react-redux";

import "@szhsin/react-menu/dist/index.css";
import "./styles.scss";
import { HiDotsHorizontal } from "react-icons/hi";
import { ReplyContext } from "../Replies";
import { deleteReply } from "../../../../features/repliesActions";
import { confirm } from "../../../../Confirm/Confirm";

export const ReplyMenu = ({ id }) => {
  const { setCurrentReplyId } = useContext(ReplyContext);

  const dispatch = useDispatch();

  const handleEdit = () => {
    setCurrentReplyId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async () => {
    if (await confirm("Are your sure?")) {
      await dispatch(deleteReply(id));
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
