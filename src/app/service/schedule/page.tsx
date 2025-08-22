import AppointmentScheduler from '@/components/service/AppointmentScheduler';

export const metadata = {
  title: 'Schedule Service | Clay Powersports',
  description: 'Schedule your outboard motor service appointment online. Choose your service type, preferred date, and book instantly.',
};

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Schedule Your Service</h1>
          <p className="text-gray-600 mt-2">Book your outboard motor service appointment online</p>
        </div>
        
        <AppointmentScheduler />
      </div>
    </div>
  );
}