import * as React from "react";

function VideoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play" {...props}>
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}

export default VideoIcon;
