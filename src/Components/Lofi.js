/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef } from "react";
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
			loadVideo();
		}
	}, []);

	const loadVideo = () => {
    const id = getYTId(ksh.YTURL)    

    if (id.type === 'playlist') {
      ksh.YTPlayerRef.current = new window.YT.Player("youtube-player", {
        playerVars: {
          listType: 'playlist',
          list: id.id,
          autoplay: 0, // 0 to not autoplay, 1 to autoplay
        },
        events: {
          'onStateChange': ksh.handleUpdateYT()
        }
      });
    } else {
      ksh.YTPlayerRef.current = new window.YT.Player("youtube-player", {
        videoId: id.id,
        playerVars: {
          autoplay: 0, // 0 to not autoplay, 1 to autoplay
        },
        events: {
          'onStateChange': ksh.handleUpdateYT()
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
