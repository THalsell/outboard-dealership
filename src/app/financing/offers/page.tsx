import { UnderDevelopment } from '@/components/ui/feedback';

export const metadata = {
  title: 'Financing Offers',
  description: 'View our current financing offers and promotions.',
};

export default function FinancingOffersPage() {
  return (
    <UnderDevelopment
      pageName="Special Financing Offers"
      message="Check back soon for exclusive financing deals and promotional offers. Call us at (931) 243-4555 to learn about current financing options."
    />
  );
}