import Box from '@mui/material/Box';import React from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
export default function StreamUser() {
  const { login } = useParams();

  return (
    <div>
      <Box  display="flex" justifyContent="center" m={5}>
        <ReactPlayer width="1280px" height="720px" playing url={`https://www.twitch.tv/${login}`} />
      </Box>
    </div>
  );
}
