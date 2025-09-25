import SectionHeader from "@/components/ui/display/SectionHeader";
import Card from "@/components/ui/display/Card";
import Button from "@/components/ui/forms/Button";

export default function PartsPageClient() {
  return (
    <div className="min-h-screen bg-white -mt-20 sm:-mt-16 pt-24 sm:pt-20">
      <div className="container mx-auto px-4 py-8">
        <SectionHeader
          title="Outboard Motor Parts & Accessories"
          subtitle="Genuine OEM and aftermarket parts for all major outboard brands"
        />

        <div className="mb-12">
          <Card padding="lg" className="text-center bg-blue-50">
            <h2 className="text-2xl font-bold text-deep-blue mb-4">
              Need a Specific Part?
            </h2>
            <p className="text-lg text-charcoal mb-6">
              Call us at{" "}
              <a
                href="tel:+19312434555"
                className="font-bold text-deep-blue hover:underline"
              >
                (931) 243-4555
              </a>{" "}
              for parts availability, pricing, and expert advice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+19312434555">
                <Button variant="primary" size="lg">
                  Call for Parts
                </Button>
              </a>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card padding="lg">
            <h3 className="text-xl font-bold text-charcoal mb-4">
              Why Choose Our Parts Department?
            </h3>
            <ul className="space-y-3 text-professional-gray">
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-0.5 flex-shrink-0">
                  ✓
                </span>
                Genuine OEM parts from all major manufacturers
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-0.5 flex-shrink-0">
                  ✓
                </span>
                Competitive aftermarket alternatives available
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-0.5 flex-shrink-0">
                  ✓
                </span>
                Expert advice from certified marine technicians
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-0.5 flex-shrink-0">
                  ✓
                </span>
                Fast shipping throughout the US
              </li>
            </ul>
          </Card>

          <Card padding="lg">
            <h3 className="text-xl font-bold text-charcoal mb-4">
              Brands We Service
            </h3>
            <div className="grid grid-cols-2 gap-4 text-professional-gray">
              <div>
                <ul className="space-y-2">
                  <li>• Yamaha</li>
                  <li>• Honda</li>
                  <li>• Mercury</li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2">
                  <li>• Suzuki</li>
                  <li>• Tohatsu</li>
                  <li>• Freedom</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
