import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import axios from "axios";

export default function Video({ videoId }) {
  const [video, setVideo] = useState();
  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.vimeo.com/videos/${videoId}`,
      headers: { authorization: "BEARER " + import.meta.env.VITE_VIMEO_TOKEN },
    })
      .then(function (response) {
        setVideo(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div style={{ width: "100%", height: "240px", position: "relative" }}>
        {video ? (
          <iframe
            src={video.player_embed_url}
            height={"100%"}
            width={"100%"}
            frameBorder="0"
            allow="autoplay; fullscreen;"
            title={video.name}
          ></iframe>
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              background: "rgba(0,0,0,0.2",
            }}
          ></div>
        )}
      </div>
    </>
  );
}
