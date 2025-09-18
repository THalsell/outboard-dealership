import { UnderDevelopment } from "@/components/ui/feedback";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Outboard Motor Sales - your trusted outboard motor dealership.",
};

export default function AboutPage() {
  return (
    <UnderDevelopment
      pageName="About Us"
      message="We're putting together our company story, mission, and team information. Check back soon to learn more about our dealership and our commitment to serving the boating community or give us a call at (931) 243-4555!"
    />
  );
}
