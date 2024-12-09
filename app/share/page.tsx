"use client";

import { useEffect } from "react";

const ShareExample = () => {
  useEffect(() => {
    const shareButton = document.getElementById("shareButton");

    if (navigator.share && shareButton) {
      shareButton.addEventListener("click", async () => {
        try {
          await navigator.share({
            title: "Share Example",
            text: "Check out this awesome content!",
            url: window.location.href,
          });

          console.log("Shared successfully");
        } catch (error) {
          if (error instanceof Error) {
            console.error("Error sharing:", error.message);
          } else {
            console.error("Error sharing:", error);
          }
        }
      });
    } else {
      console.warn("Web Share API not supported on this browser");
    }
  }, []);

  return (
    <div>
      <button id="shareButton">Share</button>
    </div>
  );
};

export default ShareExample;
