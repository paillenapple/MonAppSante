import React from "react";
import { DashboardTemplate } from "../../templates";
import PostForm from "./PostForm";

const Post = (props) => {
  const { pathname } = props.location;
  const { currentUser } = props;
  return (
    <DashboardTemplate
      title="Déposer une annonce"
      pathname={pathname}
      currentUser={currentUser}
    >
      <PostForm currentUser={currentUser} />
    </DashboardTemplate>
  );
};

export default Post;
