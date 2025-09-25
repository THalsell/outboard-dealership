import SectionHeader from "@/components/ui/display/SectionHeader";
import Card from "@/components/ui/display/Card";
import Button from "@/components/ui/forms/Button";
import Icon from "@/components/ui/display/Icon";
import {
  generateBreadcrumbSchema,
  BREADCRUMB_PATTERNS,
} from "@/lib/seo/breadcrumb-schema";

export const metadata = {
  title: "Financing Offers",
  description:
    "Special financing offers and promotions on outboard motors with competitive rates.",
};

export default function FinancingOffersPage() {
  const breadcrumbItems = BREADCRUMB_PATTERNS.financingOffers();
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="min-h-screen bg-white -mt-20 sm:-mt-16 pt-24 sm:pt-20">
        <div className="container mx-auto px-4 py-8">
          <SectionHeader
            title="Special Financing Offers"
            subtitle="Take advantage of our current financing promotions and competitive rates"
          />

          <Card padding="lg" className="bg-blue-50 mb-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-deep-blue mb-4">
                Ready to Apply for Financing?
              </h2>
              <p className="text-lg text-charcoal mb-6">
                Call our financing specialists to discuss current offers and
                find the best option for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="lg">
                  <Icon name="phone" className="w-5 h-5 mr-2" />
                  Call (931) 243-4555
                </Button>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card padding="lg">
              <h3 className="text-xl font-bold text-charcoal mb-4">
                Financing FAQ
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-charcoal mb-2">
                    What credit score do I need?
                  </h4>
                  <p className="text-professional-gray text-sm">
                    We work with all credit types. Our lenders offer options for
                    excellent, good, fair, and rebuilding credit.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal mb-2">
                    How long does approval take?
                  </h4>
                  <p className="text-professional-gray text-sm">
                    Most applications are processed within 24 hours, with many
                    receiving same-day approval.
                  </p>
                </div>
              </div>
            </Card>

            <Card padding="lg">
              <h3 className="text-xl font-bold text-charcoal mb-4">
                Why Finance Through Us?
              </h3>
              <ul className="space-y-3 text-professional-gray">
                <li className="flex items-start">
                  <Icon
                    name="check"
                    className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                  />
                  Multiple lender network for best rates
                </li>
                <li className="flex items-start">
                  <Icon
                    name="check"
                    className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                  />
                  Manufacturer incentives and rebates
                </li>
                <li className="flex items-start">
                  <Icon
                    name="check"
                    className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                  />
                  Extended warranty options available
                </li>
                <li className="flex items-start">
                  <Icon
                    name="check"
                    className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                  />
                  Personal service from local experts
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
