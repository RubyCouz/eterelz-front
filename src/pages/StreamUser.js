import { Box } from "@material-ui/core";
import React from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import AuthNavbar from "../Components/Navbar/AuthNavbar";

export default function StreamUser() {
  const { login } = useParams();

  return (
    <div>
      <AuthNavbar />
      <Box  display="flex" justifyContent="center" m={5}>
        <ReactPlayer width="1280px" height="720px" playing url={`https://www.twitch.tv/${login}`} />
      </Box>
    </div>
  );
}
