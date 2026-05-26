"use client";
import { VideoAscii } from "react-video-ascii";

export default function Home() {
  return (
    <>
      <h1>AI</h1>
      <VideoAscii
        src={"video.mp4"}
        clickEffect={false}
        mouseEffect={false}
      ></VideoAscii>
    </>
  );
}
