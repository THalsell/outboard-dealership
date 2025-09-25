import SectionHeader from '@/components/ui/display/SectionHeader';
import Card from '@/components/ui/display/Card';
import { generateBreadcrumbSchema, BREADCRUMB_PATTERNS } from '@/lib/seo/breadcrumb-schema';

export const metadata = {
  title: "About Us",
  description:
    "Learn about Outboard Motor Sales - your trusted outboard motor dealership with nationwide shipping to all 48 states.",
};

export default function AboutPage() {
  const breadcrumbItems = BREADCRUMB_PATTERNS.about();
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

  const values = [
    {
      title: 'Expert Knowledge',
      description: 'Our team has decades of experience with outboard motors and marine equipment.'
    },
    {
      title: 'Quality Service',
      description: 'From sales to service, we provide exceptional customer care and support.'
    },
    {
      title: 'Boating Passion',
      description: 'We are boaters ourselves and understand what it takes to get you on the water.'
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="min-h-screen bg-white -mt-20 sm:-mt-16 pt-24 sm:pt-20">
      <div className="container mx-auto px-4 py-8">
        <SectionHeader
          title="About Outboard Motor Sales"
          subtitle="Your trusted partner for outboard motors nationwide"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-deep-blue mb-6">Our Story</h2>
            <div className="space-y-4 text-charcoal">
              <p>
                Located in Celina, Tennessee, Outboard Motor Sales has been serving the boating community
                nationwide with free shipping to all 48 contiguous states. We specialize in new and used outboard
                motors from all major manufacturers.
              </p>
              <p>
                As an authorized dealer for Yamaha, Honda, Mercury, Suzuki, Tohatsu, and Freedom outboard
                motors, we offer a comprehensive selection of marine propulsion solutions for every type
                of boater.
              </p>
              <p>
                Our commitment to excellence extends beyond just selling motors. We provide expert service,
                genuine parts, and the knowledge you need to make the right choice for your boating needs.
              </p>
            </div>
          </div>

          <Card padding="lg" className="bg-blue-50">
            <h3 className="text-2xl font-bold text-deep-blue mb-6">Why Choose Us?</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div>
                  <h4 className="font-semibold text-charcoal">Authorized Dealer Network</h4>
                  <p className="text-professional-gray text-sm">Direct relationships with all major outboard manufacturers</p>
                </div>
              </li>
              <li className="flex items-start">
                <div>
                  <h4 className="font-semibold text-charcoal">Free Shipping</h4>
                  <p className="text-professional-gray text-sm">Free delivery to all 48 contiguous states</p>
                </div>
              </li>
              <li className="flex items-start">
                <div>
                  <h4 className="font-semibold text-charcoal">Full Service Department</h4>
                  <p className="text-professional-gray text-sm">Complete maintenance, repair, and parts services</p>
                </div>
              </li>
              <li className="flex items-start">
                <div>
                  <h4 className="font-semibold text-charcoal">Personal Service</h4>
                  <p className="text-professional-gray text-sm">Local family business with personalized attention</p>
                </div>
              </li>
            </ul>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {values.map((value, index) => (
            <Card key={index} padding="lg" className="text-center">
              <h3 className="text-xl font-bold text-charcoal mb-3">{value.title}</h3>
              <p className="text-professional-gray">{value.description}</p>
            </Card>
          ))}
        </div>

        <Card padding="lg" className="bg-gray-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-deep-blue mb-4">Visit Our Showroom</h2>
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-charcoal mb-3">Location & Hours</h3>
              <div className="space-y-2 text-professional-gray">
                <p className="text-center">
                  615 West Lake Avenue, Celina, TN 38551
                </p>
                <p className="text-center">
                  (931) 243-4555
                </p>
                <p className="text-center">
                  Mon-Fri: 8:00 AM - 5:00 PM
                </p>
                <p className="text-center">
                  Saturday: 8:00 AM - 12:00 PM
                </p>
                <p className="mt-4 text-sm font-medium text-deep-blue">
                  We ship nationwide to all 48 contiguous states!
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
      </div>
    </>
  );
}
