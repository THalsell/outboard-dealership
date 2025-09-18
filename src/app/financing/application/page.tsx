import { UnderDevelopment } from '@/components/ui/feedback';

export const metadata = {
  title: 'Financing Application',
  description: 'Apply for financing for your outboard motor purchase.',
};

export default function FinancingApplicationPage() {
  return (
    <UnderDevelopment
      pageName="Financing Application"
      message="Our online financing application will be available soon. In the meantime, please call us at (931) 243-4555 to discuss financing options."
    />
  );
}