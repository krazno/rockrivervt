#!/usr/bin/env bash
# Import photos/videos from a source folder into /public/media with SEO-friendly names.
# - Videos: copy as rock-river-newfane-vermont-river-video-NN.mp4
# - HEIC: convert to JPEG via macOS sips → rock-river-newfane-vermont-outdoors-NNN.jpg
# - Thumbnails: 480px max edge under /public/media/thumbnails/
#
# Usage:
#   ./scripts/import-rock-river-media.sh "/path/to/Rock river"
#
# After importing, update data/media.ts (dimensions + counts) or run a dimension pass:
#   for j in public/media/images/*.jpg; do sips -g pixelWidth -g pixelHeight "$j"; done

set -euo pipefail
SRC=${1:?"Pass source directory path"}
DEST="$(cd "$(dirname "$0")/.." && pwd)/public/media"

mkdir -p "$DEST/images" "$DEST/videos" "$DEST/thumbnails"

v=1
shopt -s nullglob
for f in "$SRC"/*.MOV "$SRC"/*.mov "$SRC"/*.MP4 "$SRC"/*.mp4; do
  [[ -f "$f" ]] || continue
  out="$DEST/videos/rock-river-newfane-vermont-river-video-$(printf '%02d' "$v").mp4"
  cp "$f" "$out"
  echo "Video → $out"
  v=$((v + 1))
done

i=1
while IFS= read -r -d '' f; do
  base="rock-river-newfane-vermont-outdoors-$(printf '%03d' "$i").jpg"
  sips -s format jpeg "$f" --out "$DEST/images/$base"
  sips -Z 480 "$DEST/images/$base" --out "$DEST/thumbnails/$base"
  echo "Image → $DEST/images/$base"
  i=$((i + 1))
done < <(find "$SRC" -maxdepth 1 -name '*.HEIC' -print0 | sort -z)

echo "Done. Next: sync IMAGE_DIMENSIONS / video count in data/media.ts"
