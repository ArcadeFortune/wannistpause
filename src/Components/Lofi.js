/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { KshManagerContext } from "../KshManager";
import { getYTId } from "../importantFunctions";

export default function Lofi() {
  const ksh = useContext(KshManagerContext)

	useEffect(() => {
		if (!window.YT) {
			const tag = document.createElement("script");
			tag.src = "https://www.youtube.com/iframe_api";

			window.onYouTubeIframeAPIReady = loadVideo;

			const firstScriptTag = document.getElementsByTagName("script")[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		} else {
			loadVideo(1);
		}
    
    return () => {
      if (ksh.YTPlayerRef.current) {
        ksh.YTPlayerRef.current.destroy(); // Clean up on component unmount
      }
    };
  }, [ksh.settings.YTURL.value]); // Depend on YTURL to re-run effect

	const loadVideo = (autoplay=0) => {
    const id = getYTId(ksh.settings.YTURL.value || 'https://www.youtube.com/watch?v=A7uNvvAKsYU&list=PLXIclLvfETS3AgCnZg4N6QqHu_T27XKIq')    

    if (id.type === 'playlist') {
      ksh.YTPlayerRef.current = new window.YT.Player("youtube-player", {
        playerVars: {
          listType: 'playlist',
          list: id.id,
          autoplay: autoplay, // 0 to not autoplay, 1 to autoplay
        },
        events: {
          'onStateChange': ksh.handleUpdateYT
        }
      });

    } else {
      ksh.YTPlayerRef.current = new window.YT.Player("youtube-player", {
        videoId: id.id,
        playerVars: {
          autoplay: autoplay, // 0 to not autoplay, 1 to autoplay
        },
        events: {
          'onStateChange': ksh.handleUpdateYT
        }
      });
    }
	};
  
	return (
		<div className="hidden">
			<div id="youtube-player" />
			<button onClick={ksh.handlePlayYT}>Play Video</button>
		</div>
	);
}
