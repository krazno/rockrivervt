/** Plain Q&A for /visit and /guidelines — keep answers short for humans and FAQPage JSON-LD. */

export type FaqItem = {
  question: string;
  answer: string;
};

export const VISIT_PAGE_FAQ: FaqItem[] = [
  {
    question: "Where do I park for Rock River?",
    answer:
      "Most public pull-offs used for trail and river access are along Vermont Route 30 on the Dummerston side (near the Depot Road area). The river itself runs through Newfane—town names on a map don’t always match where you leave the car. Use the interactive map for pinned parking before you go.",
  },
  {
    question: "Is this site official?",
    answer:
      "No. RockRiverVT is a neighbor-maintained visitor guide—not the town, the state, or Rock River Preservation. For formal policies, donations, and volunteer programs, see rockriverpreservation.org.",
  },
  {
    question: "How do I know if today is a good day to go?",
    answer:
      "Start with the live conditions page and the “right now” snapshot on the home page—weather, river context, and crowd check-ins are starting points, not guarantees. If the water looks fast, brown, or unsafe when you arrive, wait for another day.",
  },
  {
    question: "What should I do first as a new visitor?",
    answer:
      "Open the map, read the visit page for parking and seasons, skim the guidelines for shoreline norms, then check conditions the day you leave. Photos in the gallery only hint at current water and light.",
  },
  {
    question: "Are there clothing-optional areas?",
    answer:
      "Yes—signed areas exist as part of long-standing local use. Outside those areas, treat the shoreline like any shared outdoor space. Read the guidelines for photography, sound, and space.",
  },
];

export const GUIDELINES_PAGE_FAQ: FaqItem[] = [
  {
    question: "Are these guidelines the same as posted rules?",
    answer:
      "This page summarizes what usually works for visitors. Posted signs, stewards, and Rock River Preservation set formal expectations on protected land. When in doubt, follow what is posted and steward direction.",
  },
  {
    question: "Can I take photos?",
    answer:
      "Only with clear permission from anyone who would be identifiable. Sound carries on the water—keep voices low and skip drones or staged shoots that disturb others.",
  },
  {
    question: "Where should I plan parking and river conditions?",
    answer:
      "Use the map for pins, the visit page for arrival context, and the conditions page for weather and river tools before you lose signal.",
  },
];
