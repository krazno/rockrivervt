/**
 * Mock wildlife spotting data for the homepage Animal Spotting widget.
 * Replace with API / database fields later; keep the same shape when possible.
 *
 * Images: use `/public/media/images/` (or thumbnails). Paths below point at
 * on-site river/woods photos as stand-ins until species-specific photos exist.
 */

export type AnimalSpottingEntry = {
  id: string;
  name: string;
  /** Path under public, e.g. `/media/images/...` */
  image: string;
  /** Alt text for the image (honest if photo is habitat, not the animal). */
  imageAlt: string;
  sightings: number;
  /** Short label, e.g. "Today", "Yesterday", "2 hours ago" */
  lastSeen: string;
  /** Show small “Wild Neighbor” badge on the card */
  wildNeighborBadge?: boolean;
};

export const animals: AnimalSpottingEntry[] = [
  {
    id: "bear",
    name: "Black Bear",
    image: "/media/thumbnails/rock-river-newfane-vermont-outdoors-014.jpg",
    imageAlt:
      "Woods along Rock River near Newfane, Vermont — typical black bear habitat in the corridor",
    sightings: 7,
    lastSeen: "Today",
    wildNeighborBadge: true,
  },
  {
    id: "raccoon",
    name: "Raccoon",
    image: "/media/thumbnails/rock-river-newfane-vermont-outdoors-016.jpg",
    imageAlt:
      "Riverbank and forest edge near Rock River, Vermont — where raccoons are often active at dusk",
    sightings: 12,
    lastSeen: "Yesterday",
  },
  {
    id: "chipmunk",
    name: "Chipmunk",
    image: "/media/thumbnails/rock-river-newfane-vermont-outdoors-018.jpg",
    imageAlt:
      "Leafy ground and stone along Rock River trails — common chipmunk territory",
    sightings: 21,
    lastSeen: "Today",
  },
  {
    id: "deer",
    name: "White-tailed Deer",
    image: "/media/thumbnails/rock-river-newfane-vermont-outdoors-020.jpg",
    imageAlt:
      "Mixed woods near Rock River, Vermont — white-tailed deer range along the river",
    sightings: 9,
    lastSeen: "2 hours ago",
    wildNeighborBadge: true,
  },
];
