import React from "react";
import "./styles.scss";
import { FullPost } from "./FullPost/FullPost";
import { Reply } from "./Reply/Reply";
import { ReplyForm } from "../../../Forms/ReplyForm";

export const Replies = () => {
  return (
    <>
      <ReplyForm />
      <FullPost />
      <Reply />
    </>
  );
};
