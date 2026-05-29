// ─────────────────────────────────────────────────────────────────────────────
// Edit values here. Adding/removing a person updates the directory + routes.
// ─────────────────────────────────────────────────────────────────────────────

export const uplate = {
  name: "UPlate",
  tagline: "Your Plate. Your Plan.",
  website: "https://u-plate.com/",
  websiteLabel: "Meet U-Plate",
  year: 2026,
};

export const team = [
  {
    slug: "nathaniel",
    firstName: "Nathaniel",
    fullName: "Nathaniel Kemmena-Sh",
    role: "Co-Founder & COO",
    email: "nathaniel@u-plate.com",
    linkedin: "https://www.linkedin.com/in/nkemmenash/",
  },
  {
    slug: "jeffrey",
    firstName: "Jeffrey",
    fullName: "Jeffrey Tseng",
    role: "Co-Founder & CEO",
    email: "jeffrey@u-plate.com",
    linkedin: "https://www.linkedin.com/in/j-tseng/",
  },
  {
    slug: "madhav",
    firstName: "Madhav",
    fullName: "Madhav Variyam",
    role: "Chief Marketing Officer",
    email: "madhav@u-plate.com",
    linkedin: "https://www.linkedin.com/in/madhavvariyam/",
  },
  {
    slug: "rishu",
    firstName: "Rishu",
    fullName: "Rishu Sharma",
    role: "Co-Founder & CTO",
    email: "rishu@u-plate.com",
    linkedin: "https://www.linkedin.com/in/rishit-sharma-2a7904299/",
  },
];

export const findPerson = (slug) =>
  team.find((member) => member.slug === slug);
