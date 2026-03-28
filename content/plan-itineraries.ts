/**
 * Short example day plans — editorial, not bookings. Tune times and links as the guide evolves.
 */

export type PlanItineraryStep = {
  time: string;
  title: string;
  detail: string;
  /** Site path or short note */
  href?: string;
  hrefLabel?: string;
};

export type PlanItinerary = {
  id: string;
  title: string;
  vibe: string;
  steps: PlanItineraryStep[];
};

export const PLAN_ITINERARIES: PlanItinerary[] = [
  {
    id: "brattleboro-loop",
    title: "Coffee, river, downtown reset",
    vibe: "Best when you want food options and a walk after swimming.",
    steps: [
      {
        time: "Morning",
        title: "Fuel in Brattleboro",
        detail:
          "Grab coffee or breakfast on Main Street before you drive the last leg—lines are shorter than at busy pull-offs.",
        href: "/after-the-river",
        hrefLabel: "After the river picks",
      },
      {
        time: "Midday",
        title: "River time",
        detail:
          "Check conditions, park where the map says it’s fair game, and swim or wade on your own terms—leave no trace.",
        href: "/visit",
        hrefLabel: "Visit",
      },
      {
        time: "After",
        title: "Stroll and provisions",
        detail:
          "Bookstores, galleries, and the co-op for sandwiches—stretch the day without another long haul.",
        href: "/local",
        hrefLabel: "Local area",
      },
    ],
  },
  {
    id: "newfane-quiet",
    title: "Village pace + river afternoon",
    vibe: "Less retail, more Vermont texture and a slower drive home.",
    steps: [
      {
        time: "Late morning",
        title: "Newfane green",
        detail:
          "Loop the town green and courthouse hill if you like quiet streets before you head toward the corridor.",
        href: "/after-the-river",
        hrefLabel: "Town picks",
      },
      {
        time: "Afternoon",
        title: "Rock River",
        detail:
          "Use the map for parking and trail access. Read the water in person—no app replaces standing on the bank.",
        href: "/map",
        hrefLabel: "Map",
      },
      {
        time: "Evening",
        title: "Scenic exit",
        detail:
          "Take Route 30 or a side loop toward dinner—see scenic picks for a calm wind-down instead of rushing to the highway.",
        href: "/after-the-river",
        hrefLabel: "Scenic & evening",
      },
    ],
  },
  {
    id: "first-timer",
    title: "First visit — read, then go",
    vibe: "When you’ve never been and want the guide to set expectations.",
    steps: [
      {
        time: "Before you leave home",
        title: "Visitor guide + guidelines",
        detail:
          "Ten minutes with etiquette and safety saves friction in the parking area and at the water.",
        href: "/visitor-guide",
        hrefLabel: "Visitor guide",
      },
      {
        time: "En route",
        title: "Conditions snapshot",
        detail:
          "Sky, flow context, and how busy it felt to others—still your call when you arrive.",
        href: "/conditions",
        hrefLabel: "Conditions",
      },
      {
        time: "Same day",
        title: "Crowd check-in (optional)",
        detail:
          "Anonymous mood helps the next carload plan; skip it if you’d rather stay private.",
        href: "/#crowd-check-in",
        hrefLabel: "Home crowd widget",
      },
    ],
  },
];
