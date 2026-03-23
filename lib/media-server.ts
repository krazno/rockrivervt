import "server-only";

import fs from "fs";
import path from "path";

const TRAIL_VIDEO_REL = "public/media/videos/rock-river-trail-tour-full-hike.mp4";

/** True when the trail tour MP4 is present in `public/` (may be gitignored). */
export function trailTourVideoFileExists(): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), TRAIL_VIDEO_REL));
  } catch {
    return false;
  }
}
