'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AppointmentScheduler from './AppointmentScheduler';
import ServiceStatusTracker from './ServiceStatusTracker';
import MaintenanceReminders from './MaintenanceReminders';
import OwnerResources from './OwnerResources';
import WarrantyRegistration from './WarrantyRegistration';

type ServiceSection = 'overview' | 'schedule' | 'status' | 'maintenance' | 'resources' | 'warranty';

const serviceFeatures = [
  {
    id: 'schedule' as ServiceSection,
    title: 'Schedule Service',
    description: 'Book appointments for maintenance, repairs, and inspections',
    icon: '📅',
    color: 'blue',
    features: ['Online scheduling', 'Real-time availability', 'Service reminders', 'Appointment confirmation']
  },
  {
    id: 'status' as ServiceSection,
    title: 'Service Status',
    description: 'Track your motor service progress in real-time',
    icon: '🔍',
    color: 'green',
    features: ['Live progress tracking', 'Photo updates', 'Parts status', 'Completion notifications']
  },
  {
    id: 'maintenance' as ServiceSection,
    title: 'Maintenance Reminders',
    description: 'Stay on top of your motor maintenance schedule',
    icon: '🔧',
    color: 'orange',
    features: ['Automated reminders', 'Service intervals', 'Maintenance history', 'Cost estimates']
  },
  {
    id: 'resources' as ServiceSection,
    title: 'Owner Resources',
    description: 'Access manuals, videos, and troubleshooting guides',
    icon: '📚',
    color: 'purple',
    features: ['Owner manuals', 'Video tutorials', 'Troubleshooting guides', 'Parts diagrams']
  },
  {
    id: 'warranty' as ServiceSection,
    title: 'Warranty Registration',
    description: 'Register your motor warranty and manage claims',
    icon: '🛡️',
    color: 'red',
    features: ['Online registration', 'Warranty tracking', 'Claim management', 'Coverage details']
  },
];

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-600',
    hover: 'hover:bg-blue-100',
    button: 'bg-blue-600 hover:bg-blue-700'
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-600',
    hover: 'hover:bg-green-100',
    button: 'bg-green-600 hover:bg-green-700'
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-600',
    hover: 'hover:bg-orange-100',
    button: 'bg-orange-600 hover:bg-orange-700'
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-600',
    hover: 'hover:bg-purple-100',
    button: 'bg-purple-600 hover:bg-purple-700'
  },
  red: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-600',
    hover: 'hover:bg-red-100',
    button: 'bg-red-600 hover:bg-red-700'
  }
};

export default function ServiceDashboard() {
  useAuth();
  const [activeSection, setActiveSection] = useState<ServiceSection>('overview');

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white">
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Professional Marine Service & Support
          </h1>
          <p className="text-xl mb-6 text-blue-100">
            Expert outboard motor service, maintenance, and support from certified technicians. 
            Keep your motor running at peak performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setActiveSection('schedule')}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Schedule Service Now
            </button>
            <button
              onClick={() => setActiveSection('status')}
              className="bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors"
            >
              Check Service Status
            </button>
          </div>
        </div>
      </div>

      {/* Service Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceFeatures.map((feature) => {
          const colors = colorClasses[feature.color as keyof typeof colorClasses];
          return (
            <div
              key={feature.id}
              onClick={() => setActiveSection(feature.id)}
              className={`${colors.bg} ${colors.border} border rounded-xl p-6 cursor-pointer ${colors.hover} transition-all duration-200 hover:shadow-lg group`}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{feature.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {feature.description}
                  </p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    {feature.features.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <svg className={`w-4 h-4 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Center Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">2,500+</div>
            <div className="text-gray-600">Motors Serviced</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
            <div className="text-gray-600">Customer Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">24-48hrs</div>
            <div className="text-gray-600">Avg. Turnaround</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">15+</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
        </div>
      </div>

      {/* Service Packages */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Service Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Basic Service</h3>
                <div className="text-2xl font-bold text-blue-600">$185</div>
              </div>
            </div>
            <ul className="text-sm text-gray-600 space-y-2 mb-4">
              <li>• Engine oil change</li>
              <li>• Basic inspection</li>
              <li>• Fluid level check</li>
              <li>• Basic tune-up</li>
            </ul>
            <button
              onClick={() => setActiveSection('schedule')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              Book Service
            </button>
          </div>

          <div className="border-2 border-green-500 rounded-lg p-6 hover:shadow-md transition-shadow relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">POPULAR</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Complete Service</h3>
                <div className="text-2xl font-bold text-green-600">$485</div>
              </div>
            </div>
            <ul className="text-sm text-gray-600 space-y-2 mb-4">
              <li>• Full engine service</li>
              <li>• Comprehensive inspection</li>
              <li>• Lower unit service</li>
              <li>• Water pump check</li>
              <li>• Spark plug replacement</li>
              <li>• Fuel system service</li>
            </ul>
            <button
              onClick={() => setActiveSection('schedule')}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              Book Service
            </button>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Seasonal Prep</h3>
                <div className="text-2xl font-bold text-purple-600">$225</div>
              </div>
            </div>
            <ul className="text-sm text-gray-600 space-y-2 mb-4">
              <li>• Winterization service</li>
              <li>• Spring preparation</li>
              <li>• Fuel system treatment</li>
              <li>• Battery maintenance</li>
            </ul>
            <button
              onClick={() => setActiveSection('schedule')}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              Book Service
            </button>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-50 rounded-xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
            <p className="text-gray-600 mb-2">(931) 243-4555</p>
            <p className="text-sm text-gray-500">Monday - Friday: 8AM - 5PM</p>
            <p className="text-sm text-gray-500">Saturday: 8AM - 12PM</p>
            <p className="text-sm text-gray-500">Sunday: Closed</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
            <p className="text-gray-600 mb-2">615 West Lake Avenue</p>
            <p className="text-gray-600 mb-2">Celina, TN 38551</p>
            <p className="text-sm text-gray-500">Service bay entrance on north side</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Emergency Service</h3>
            <p className="text-gray-600 mb-2">(555) 123-HELP</p>
            <p className="text-sm text-gray-500">24/7 emergency support</p>
            <p className="text-sm text-gray-500">On-water assistance available</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverview();
      case 'schedule':
        return <AppointmentScheduler />;
      case 'status':
        return <ServiceStatusTracker appointmentId="apt-001" />;
      case 'maintenance':
        return <MaintenanceReminders />;
      case 'resources':
        return <OwnerResources />;
      case 'warranty':
        return <WarrantyRegistration />;
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {activeSection !== 'overview' && (
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <button
                onClick={() => setActiveSection('overview')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Service Center
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                {serviceFeatures.find(f => f.id === activeSection)?.title || 'Service Center'}
              </h1>
              <div className="w-24" />
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </div>
    </div>
  );
}