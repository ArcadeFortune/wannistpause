import { useState } from "react";

export default function Lofi() {  

  const [embedController, setEmbedController] = useState(null);

  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    console.log('tset')
    const element = document.getElementById('embed-iframe');
    const options = {
        uri: 'spotify:playlist:1JLw7Y5YvlsA10XjaKHTxE'
      };
    const callback = (EmbedController) => {
      setEmbedController(EmbedController);

    };
    IFrameAPI.createController(element, options, callback);
  };

    // Event handler for the button
    const changeUri = () => {
      if (embedController) {
        embedController.play();
      }
    };
  return (
    <>
      <div id ="embed-iframe">test</div>
      <button onClick={changeUri}>click me</button>
    </>
  );
};
