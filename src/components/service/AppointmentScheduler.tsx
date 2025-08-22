'use client';

import { useState, useEffect } from 'react';
import { AppointmentBooking, ServiceType, ServiceSchedule, ScheduleTimeSlot, CustomerInfo, ServiceMotorInfo } from '@/types/models';
import { useAuth } from '@/contexts/AuthContext';

// Mock schedule data - replace with API call
const mockScheduleData: ServiceSchedule[] = [
  {
    date: new Date('2024-03-15'),
    capacity: 8,
    availableSlots: 5,
    timeSlots: [
      { id: '1', start: '08:00', end: '09:00', available: true, duration: 60, serviceTypes: [ServiceType.ROUTINE_MAINTENANCE] },
      { id: '2', start: '09:00', end: '10:00', available: true, duration: 60, serviceTypes: [ServiceType.ROUTINE_MAINTENANCE] },
      { id: '3', start: '10:00', end: '11:00', available: false, duration: 60, serviceTypes: [ServiceType.REPAIR], appointmentId: 'apt-001' },
      { id: '4', start: '11:00', end: '12:00', available: true, duration: 60, serviceTypes: [ServiceType.INSPECTION] },
      { id: '5', start: '13:00', end: '15:00', available: true, duration: 120, serviceTypes: [ServiceType.REPAIR] },
      { id: '6', start: '15:00', end: '16:00', available: true, duration: 60, serviceTypes: [ServiceType.ROUTINE_MAINTENANCE] },
      { id: '7', start: '16:00', end: '17:00', available: false, duration: 60, serviceTypes: [ServiceType.WARRANTY], blocked: true, blockReason: 'Staff meeting' },
    ],
    specialHours: false,
  },
];

interface AppointmentSchedulerProps {
  onAppointmentBooked?: (appointment: AppointmentBooking) => void;
}

export default function AppointmentScheduler({ onAppointmentBooked }: AppointmentSchedulerProps) {
  const { state } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [appointment, setAppointment] = useState<Partial<AppointmentBooking>>({
    status: 'draft',
    urgency: 'medium',
    timePreference: 'no_preference',
    transportNeeded: false,
    createdAt: new Date(),
  });
  const [availableSchedules, setAvailableSchedules] = useState<ServiceSchedule[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<ScheduleTimeSlot | null>(null);
  const [, setErrors] = useState<Record<string, string>>({});

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!appointment.motorInfo?.brand) {
      newErrors.brand = 'Brand is required';
    }
    if (!appointment.motorInfo?.model) {
      newErrors.model = 'Model is required';
    }
    if (!appointment.motorInfo?.year) {
      newErrors.year = 'Year is required';
    } else if (appointment.motorInfo.year < 1990 || appointment.motorInfo.year > new Date().getFullYear()) {
      newErrors.year = 'Please enter a valid year';
    }
    if (!appointment.motorInfo?.serialNumber) {
      newErrors.serialNumber = 'Serial number is required';
    }

    if (!state.isAuthenticated) {
      if (!appointment.customerInfo?.firstName) {
        newErrors.firstName = 'First name is required';
      }
      if (!appointment.customerInfo?.lastName) {
        newErrors.lastName = 'Last name is required';
      }
      if (!appointment.customerInfo?.email) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(appointment.customerInfo.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!appointment.customerInfo?.phone) {
        newErrors.phone = 'Phone number is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    // Pre-fill customer info if user is logged in
    if (state.user) {
      setAppointment(prev => ({
        ...prev,
        userId: state.user!.id,
        customerInfo: {
          firstName: state.user!.firstName,
          lastName: state.user!.lastName,
          email: state.user!.email,
          phone: state.user!.phone || '',
          preferredContact: 'email',
        },
      }));
    }
  }, [state.user]);

  useEffect(() => {
    // Fetch available schedules
    const fetchSchedules = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAvailableSchedules(mockScheduleData);
      setLoading(false);
    };

    fetchSchedules();
  }, []);

  const handleServiceTypeChange = (serviceType: ServiceType) => {
    setAppointment(prev => ({ ...prev, serviceType }));
  };

  const handleCustomerInfoChange = (
    field: keyof CustomerInfo,
    value: string
  ) => {
    setAppointment(prev => ({
      ...prev,
      customerInfo: { ...prev.customerInfo!, [field]: value },
    }));
  };

  const handleMotorInfoChange = (
    field: keyof ServiceMotorInfo,
    value: ServiceMotorInfo[keyof ServiceMotorInfo]
  ) => {
    setAppointment(prev => ({
      ...prev,
      motorInfo: { ...prev.motorInfo!, [field]: value },
    }));
  };

  const handleDateSelection = (date: Date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
    setAppointment(prev => ({ ...prev, preferredDate: date }));
  };

  const handleTimeSlotSelection = (timeSlot: ScheduleTimeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleSubmitAppointment = async () => {
    setLoading(true);
    
    try {
      const finalAppointment: AppointmentBooking = {
        ...appointment,
        id: 'apt-' + Date.now(),
        status: 'submitted',
        createdAt: new Date(),
      } as AppointmentBooking;

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Appointment submitted:', finalAppointment);
      onAppointmentBooked?.(finalAppointment);
      
      setStep(5); // Success step
    } catch (error) {
      console.error('Failed to book appointment:', error);
    } finally {
      setLoading(false);
    }
  };

  const getServiceTypeOptions = () => [
    { value: ServiceType.ROUTINE_MAINTENANCE, label: 'Routine Maintenance', description: 'Oil changes, inspections, tune-ups' },
    { value: ServiceType.REPAIR, label: 'Repair Service', description: 'Diagnose and fix issues' },
    { value: ServiceType.WARRANTY, label: 'Warranty Service', description: 'Covered warranty repairs' },
    { value: ServiceType.INSPECTION, label: 'Inspection', description: 'Pre-purchase or annual inspection' },
    { value: ServiceType.WINTERIZATION, label: 'Winterization', description: 'Prepare for storage season' },
    { value: ServiceType.SPRING_PREP, label: 'Spring Preparation', description: 'Get ready for boating season' },
    { value: ServiceType.EMERGENCY, label: 'Emergency Service', description: 'Urgent repairs needed' },
  ];

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-center">
        {[1, 2, 3, 4].map((stepNumber, index) => (
          <div key={stepNumber} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= stepNumber 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-300 text-gray-600'
            }`}>
              {step > stepNumber ? '✓' : stepNumber}
            </div>
            {index < 3 && (
              <div className={`w-16 h-1 mx-2 ${
                step > stepNumber ? 'bg-blue-600' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>Service Type</span>
        <span>Motor Info</span>
        <span>Schedule</span>
        <span>Review</span>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">What service do you need?</h2>
        <p className="text-gray-600">Select the type of service you&apos;re looking for</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {getServiceTypeOptions().map((option) => (
          <button
            key={option.value}
            onClick={() => handleServiceTypeChange(option.value)}
            className={`p-4 text-left border rounded-lg transition-all ${
              appointment.serviceType === option.value
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <h3 className="font-semibold text-gray-900 mb-1">{option.label}</h3>
            <p className="text-sm text-gray-600">{option.description}</p>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Urgency Level
          </label>
          <select
            value={appointment.urgency}
            onChange={(e) => setAppointment(prev => ({ ...prev, urgency: e.target.value as 'low' | 'medium' | 'high' | 'emergency' }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="low">Low - Routine maintenance</option>
            <option value="medium">Medium - Non-critical issue</option>
            <option value="high">High - Important repair needed</option>
            <option value="emergency">Emergency - Urgent attention required</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Describe the issue or service needed
          </label>
          <textarea
            value={appointment.description || ''}
            onChange={(e) => setAppointment(prev => ({ ...prev, description: e.target.value }))}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Please describe the symptoms, concerns, or specific service you need..."
          />
        </div>
      </div>

      <button
        onClick={() => setStep(2)}
        disabled={!appointment.serviceType || !appointment.description}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-medium transition-colors"
      >
        Continue to Motor Information
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Motor Information</h2>
        <p className="text-gray-600">Tell us about your outboard motor</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Brand *</label>
          <select
            value={appointment.motorInfo?.brand || ''}
            onChange={(e) => handleMotorInfoChange('brand', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Brand</option>
            <option value="Yamaha">Yamaha</option>
            <option value="Mercury">Mercury</option>
            <option value="Honda">Honda</option>
            <option value="Suzuki">Suzuki</option>
            <option value="Evinrude">Evinrude</option>
            <option value="Johnson">Johnson</option>
            <option value="Tohatsu">Tohatsu</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Model *</label>
          <input
            type="text"
            value={appointment.motorInfo?.model || ''}
            onChange={(e) => handleMotorInfoChange('model', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., F200, Verado 250"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Year *</label>
          <input
            type="number"
            value={appointment.motorInfo?.year || ''}
            onChange={(e) => handleMotorInfoChange('year', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1990"
            max={new Date().getFullYear()}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Serial Number *</label>
          <input
            type="text"
            value={appointment.motorInfo?.serialNumber || ''}
            onChange={(e) => handleMotorInfoChange('serialNumber', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter serial number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hours Used (if known)</label>
          <input
            type="number"
            value={appointment.motorInfo?.hoursUsed || ''}
            onChange={(e) => handleMotorInfoChange('hoursUsed', e.target.value ? parseInt(e.target.value) : undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Total engine hours"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Service Date</label>
          <input
            type="date"
            value={appointment.motorInfo?.lastServiceDate ? appointment.motorInfo.lastServiceDate.toISOString().split('T')[0] : ''}
            onChange={(e) => handleMotorInfoChange('lastServiceDate', e.target.value ? new Date(e.target.value) : undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {!state.isAuthenticated && (
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">Customer Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
              <input
                type="text"
                value={appointment.customerInfo?.firstName || ''}
                onChange={(e) => handleCustomerInfoChange('firstName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
              <input
                type="text"
                value={appointment.customerInfo?.lastName || ''}
                onChange={(e) => handleCustomerInfoChange('lastName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                value={appointment.customerInfo?.email || ''}
                onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input
                type="tel"
                value={appointment.customerInfo?.phone || ''}
                onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={() => setStep(1)}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => {
            if (validateStep2()) {
              setStep(3);
            }
          }}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-medium transition-colors"
        >
          Continue to Scheduling
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Schedule Your Appointment</h2>
        <p className="text-gray-600">Select your preferred date and time</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Dates</h3>
          <div className="space-y-2">
            {availableSchedules.map((schedule) => (
              <button
                key={schedule.date.toISOString()}
                onClick={() => handleDateSelection(schedule.date)}
                className={`w-full p-4 text-left border rounded-lg transition-all ${
                  selectedDate?.toDateString() === schedule.date.toDateString()
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-900">
                      {schedule.date.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                    <div className="text-sm text-gray-600">
                      {schedule.availableSlots} of {schedule.capacity} slots available
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      schedule.availableSlots > 3 ? 'text-green-600' :
                      schedule.availableSlots > 1 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {schedule.availableSlots > 0 ? 'Available' : 'Fully Booked'}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Times</h3>
          {selectedDate ? (
            <div className="space-y-2">
              {availableSchedules
                .find(s => s.date.toDateString() === selectedDate.toDateString())
                ?.timeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => slot.available ? handleTimeSlotSelection(slot) : null}
                    disabled={!slot.available}
                    className={`w-full p-3 text-left border rounded-lg transition-all ${
                      selectedTimeSlot?.id === slot.id
                        ? 'border-blue-500 bg-blue-50'
                        : slot.available
                        ? 'border-gray-300 hover:border-gray-400'
                        : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className={`font-medium ${slot.available ? 'text-gray-900' : 'text-gray-400'}`}>
                          {slot.start} - {slot.end}
                        </div>
                        <div className="text-sm text-gray-500">
                          Duration: {slot.duration} minutes
                        </div>
                      </div>
                      <div className="text-right">
                        {!slot.available && (
                          <div className="text-sm text-red-600">
                            {slot.blocked ? slot.blockReason : 'Booked'}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Select a date to see available time slots
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setStep(2)}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => setStep(4)}
          disabled={!selectedDate || !selectedTimeSlot}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-medium transition-colors"
        >
          Review Appointment
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Appointment</h2>
        <p className="text-gray-600">Please confirm the details below</p>
      </div>

      <div className="bg-white border rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Service Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Service Type:</span>
                <span className="font-medium">{appointment.serviceType?.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Urgency:</span>
                <span className="font-medium capitalize">{appointment.urgency}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Appointment Time</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{selectedDate?.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">{selectedTimeSlot?.start} - {selectedTimeSlot?.end}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Motor Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Make/Model:</span>
                <span className="font-medium">{appointment.motorInfo?.brand} {appointment.motorInfo?.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Year:</span>
                <span className="font-medium">{appointment.motorInfo?.year}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Serial:</span>
                <span className="font-medium">{appointment.motorInfo?.serialNumber}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Customer Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium">{appointment.customerInfo?.firstName} {appointment.customerInfo?.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{appointment.customerInfo?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span className="font-medium">{appointment.customerInfo?.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {appointment.description && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Service Description</h3>
            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
              {appointment.description}
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setStep(3)}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleSubmitAppointment}
          disabled={loading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg font-medium transition-colors"
        >
          {loading ? 'Booking...' : 'Confirm Appointment'}
        </button>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Appointment Requested!</h2>
        <p className="text-gray-600 mb-4">
          We&apos;ve received your service appointment request and will contact you within 24 hours to confirm.
        </p>
        <div className="bg-blue-50 rounded-lg p-4 text-left">
          <h3 className="font-semibold text-blue-900 mb-2">What&apos;s Next?</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• You&apos;ll receive a confirmation email shortly</li>
            <li>• Our service advisor will call to confirm your appointment</li>
            <li>• We&apos;ll send you a reminder 24 hours before your appointment</li>
            <li>• Bring your motor registration and any relevant documentation</li>
          </ul>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => {
            setStep(1);
            setAppointment({ status: 'draft', urgency: 'medium', timePreference: 'no_preference', transportNeeded: false, createdAt: new Date() });
            setSelectedDate(null);
            setSelectedTimeSlot(null);
          }}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors"
        >
          Book Another Appointment
        </button>
        <button
          onClick={() => window.location.href = '/service'}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
        >
          Back to Service Center
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
      {renderStepIndicator()}
      
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      {step === 4 && renderStep4()}
      {step === 5 && renderStep5()}
    </div>
  );
}