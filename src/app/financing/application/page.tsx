import SectionHeader from "@/components/ui/display/SectionHeader";
import Card from "@/components/ui/display/Card";
import Button from "@/components/ui/forms/Button";
import Icon from "@/components/ui/display/Icon";
import {
  generateBreadcrumbSchema,
  BREADCRUMB_PATTERNS,
} from "@/lib/seo/breadcrumb-schema";

export const metadata = {
  title: "Financing Application",
  description:
    "Apply for financing for your outboard motor purchase with flexible terms and competitive rates.",
};

export default function FinancingApplicationPage() {
  const breadcrumbItems = BREADCRUMB_PATTERNS.financingApplication();
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
            title="Outboard Motor Financing"
            subtitle="Flexible financing options to get you on the water"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card padding="lg">
              <h2 className="text-2xl font-bold text-deep-blue mb-6">
                Apply for Financing
              </h2>
              <div className="space-y-4">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-deep-blue mb-3">
                    Quick Pre-Approval Process
                  </h3>
                  <p className="text-charcoal mb-4">
                    Get pre-approved for financing in minutes. Call our
                    financing specialists for personalized assistance.
                  </p>
                  <a href="tel:+19312434555">
                    <Button variant="primary" size="lg" fullWidth>
                      <Icon name="phone" className="w-5 h-5 mr-2" />
                      Call (931) 243-4555 for Financing
                    </Button>
                  </a>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-charcoal">
                    What You&#39;ll Need:
                  </h4>
                  <ul className="space-y-2 text-professional-gray">
                    <li className="flex items-start">
                      <Icon
                        name="check"
                        className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0"
                      />
                      Valid driver&#39;s license or state ID
                    </li>
                    <li className="flex items-start">
                      <Icon
                        name="check"
                        className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0"
                      />
                      Proof of income (pay stubs or tax returns)
                    </li>
                    <li className="flex items-start">
                      <Icon
                        name="check"
                        className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0"
                      />
                      Social Security number
                    </li>
                    <li className="flex items-start">
                      <Icon
                        name="check"
                        className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0"
                      />
                      Bank account information
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card padding="lg">
              <h2 className="text-2xl font-bold text-deep-blue mb-6">
                Financing Benefits
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4 flex-shrink-0">
                    <Icon
                      name="dollar-sign"
                      className="w-5 h-5 text-green-600"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-2">
                      Competitive Rates
                    </h3>
                    <p className="text-professional-gray">
                      Low APR financing options available for qualified buyers
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                    <Icon name="calendar" className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-2">
                      Flexible Terms
                    </h3>
                    <p className="text-professional-gray">
                      Choose from 12 to 144 month financing terms
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-full mr-4 flex-shrink-0">
                    <Icon name="check" className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-2">
                      Fast Approval
                    </h3>
                    <p className="text-professional-gray">
                      Quick decision process, often same-day approval
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-charcoal mb-3">
                  Financing Partners:
                </h4>
                <p className="text-sm text-professional-gray">
                  We work with multiple lenders to find the best rates and terms
                  for your situation.
                </p>
              </div>
            </Card>
          </div>

          <Card padding="lg" className="bg-gray-50">
            <div className="text-center">
              <h3 className="text-xl font-bold text-charcoal mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-professional-gray mb-6">
                Our financing specialists are standing by to help you find the
                perfect financing solution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="lg">
                  <Icon name="phone" className="w-5 h-5 mr-2" />
                  Call (931) 243-4555
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
