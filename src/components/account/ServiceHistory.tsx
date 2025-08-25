'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ServiceHistory as ServiceHistoryType, ServiceType, ServiceReminder } from '@/types/models';

// Mock data - replace with API call
const mockServiceHistory: ServiceHistoryType[] = [
  {
    id: '1',
    appointmentId: 'SRV-2024-001',
    motorId: 'yamaha-f200-2020-001',
    date: new Date('2024-01-15'),
    type: ServiceType.ROUTINE_MAINTENANCE,
    technician: 'Mike Johnson',
    workPerformed: [
      'Engine oil change',
      'Lower unit oil change',
      'Spark plug replacement',
      'Fuel filter replacement',
      'Water pump impeller inspection'
    ],
    partsUsed: [
      {
        partId: '1',
        partNumber: 'YAM-OIL-10W30',
        name: 'Yamalube 10W-30 Engine Oil (4qt)',
        quantity: 1,
        unitPrice: 45,
        total: 45,
      },
      {
        partId: '2',
        partNumber: 'YAM-SPARK-NGK',
        name: 'NGK Spark Plugs (Set of 6)',
        quantity: 1,
        unitPrice: 85,
        total: 85,
      },
    ],
    laborHours: 2.5,
    totalCost: 385,
    warranty: false,
    notes: '100-hour maintenance completed. Motor running excellent.',
    nextServiceDue: new Date('2024-07-15'),
  },
  {
    id: '2',
    appointmentId: 'SRV-2023-089',
    motorId: 'yamaha-f200-2020-001',
    date: new Date('2023-08-20'),
    type: ServiceType.REPAIR,
    technician: 'Sarah Williams',
    workPerformed: [
      'Diagnosed engine misfire',
      'Replaced faulty ignition coil',
      'ECU diagnostic scan',
      'Test run and performance check'
    ],
    partsUsed: [
      {
        partId: '3',
        partNumber: 'YAM-COIL-68V-82310',
        name: 'Ignition Coil Assembly',
        quantity: 1,
        unitPrice: 165,
        total: 165,
      },
    ],
    laborHours: 1.5,
    totalCost: 315,
    warranty: true,
    notes: 'Warranty repair - faulty ignition coil replaced under manufacturer warranty.',
  },
  {
    id: '3',
    appointmentId: 'SRV-2023-045',
    motorId: 'yamaha-f200-2020-001',
    date: new Date('2023-04-10'),
    type: ServiceType.WINTERIZATION,
    technician: 'Mike Johnson',
    workPerformed: [
      'Fuel system stabilization',
      'Fogging oil application',
      'Lower unit drain and refill',
      'Battery maintenance',
      'Propeller removal and storage'
    ],
    partsUsed: [
      {
        partId: '4',
        partNumber: 'YAM-FOG-OIL',
        name: 'Yamaha Fogging Oil',
        quantity: 2,
        unitPrice: 18,
        total: 36,
      },
      {
        partId: '5',
        partNumber: 'YAM-STABIL-FUEL',
        name: 'Fuel Stabilizer',
        quantity: 1,
        unitPrice: 15,
        total: 15,
      },
    ],
    laborHours: 1.0,
    totalCost: 151,
    warranty: false,
    notes: 'Motor winterized and prepared for storage season.',
  },
];

const mockServiceReminders: ServiceReminder[] = [
  {
    id: '1',
    userId: '1',
    motorId: 'yamaha-f200-2020-001',
    type: 'maintenance',
    title: '200-Hour Service Due',
    description: 'Your Yamaha F200 is approaching the 200-hour service interval. Schedule maintenance to ensure optimal performance.',
    dueDate: new Date('2024-03-15'),
    hoursInterval: 200,
    acknowledged: false,
    createdAt: new Date('2024-02-15'),
  },
  {
    id: '2',
    userId: '1',
    motorId: 'mercury-150-2019-001',
    type: 'seasonal',
    title: 'Spring Preparation',
    description: 'Spring boating season is approaching. Schedule your spring preparation service.',
    dueDate: new Date('2024-03-01'),
    acknowledged: false,
    createdAt: new Date('2024-02-10'),
  },
];

export default function ServiceHistory() {
  const [serviceHistory, setServiceHistory] = useState<ServiceHistoryType[]>([]);
  const [reminders, setReminders] = useState<ServiceReminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMotor, setSelectedMotor] = useState<string>('all');

  useEffect(() => {
    const fetchServiceData = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setServiceHistory(mockServiceHistory);
      setReminders(mockServiceReminders);
      setLoading(false);
    };

    fetchServiceData();
  }, []);

  const acknowledgeReminder = async (reminderId: string) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === reminderId 
          ? { ...reminder, acknowledged: true }
          : reminder
      )
    );
    // Make API call to acknowledge reminder
  };

  const getServiceTypeIcon = (type: ServiceType) => {
    switch (type) {
      case ServiceType.ROUTINE_MAINTENANCE:
        return '🔧';
      case ServiceType.REPAIR:
        return '⚙️';
      case ServiceType.WARRANTY:
        return '🛡️';
      case ServiceType.INSPECTION:
        return '🔍';
      case ServiceType.WINTERIZATION:
        return '❄️';
      case ServiceType.SPRING_PREP:
        return '🌱';
      case ServiceType.EMERGENCY:
        return '🚨';
      default:
        return '🔧';
    }
  };

  const getServiceTypeBadge = (type: ServiceType) => {
    const baseClasses = 'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium';
    
    switch (type) {
      case ServiceType.ROUTINE_MAINTENANCE:
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case ServiceType.REPAIR:
        return `${baseClasses} bg-red-100 text-red-800`;
      case ServiceType.WARRANTY:
        return `${baseClasses} bg-green-100 text-green-800`;
      case ServiceType.INSPECTION:
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case ServiceType.WINTERIZATION:
        return `${baseClasses} bg-cyan-100 text-cyan-800`;
      case ServiceType.SPRING_PREP:
        return `${baseClasses} bg-emerald-100 text-emerald-800`;
      case ServiceType.EMERGENCY:
        return `${baseClasses} bg-purple-100 text-purple-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const filteredHistory = selectedMotor === 'all' 
    ? serviceHistory 
    : serviceHistory.filter(service => service.motorId === selectedMotor);

  const unacknowledgedReminders = reminders.filter(r => !r.acknowledged);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg p-6">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Service Reminders */}
      {unacknowledgedReminders.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM6 2v14a2 2 0 002 2h5" />
            </svg>
            Service Reminders ({unacknowledgedReminders.length})
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unacknowledgedReminders.map((reminder) => (
              <div key={reminder.id} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-yellow-800">{reminder.title}</h4>
                    <p className="text-sm text-yellow-700 mt-1">{reminder.description}</p>
                    <p className="text-xs text-yellow-600 mt-2">
                      Due: {reminder.dueDate.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Link
                      href="/service/schedule"
                      className="text-xs bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 transition-colors"
                    >
                      Schedule
                    </Link>
                    <button
                      onClick={() => acknowledgeReminder(reminder.id)}
                      className="text-xs text-yellow-600 hover:text-yellow-800"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Service History */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Service History</h2>
          
          <div className="flex gap-2">
            <select
              value={selectedMotor}
              onChange={(e) => setSelectedMotor(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Motors</option>
              <option value="yamaha-f200-2020-001">Yamaha F200 (2020)</option>
              <option value="mercury-150-2019-001">Mercury 150 (2019)</option>
            </select>
            
            <Link
              href="/service/schedule"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Schedule Service
            </Link>
          </div>
        </div>

        {filteredHistory.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Service History</h3>
            <p className="text-gray-600 mb-4">No service records found for the selected motor.</p>
            <Link
              href="/service/schedule"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Schedule First Service
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredHistory.map((service) => (
              <div key={service.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{getServiceTypeIcon(service.type)}</span>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {service.type.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                          </h3>
                          <span className={getServiceTypeBadge(service.type)}>
                            {service.warranty && '🛡️'} {service.type.replace('_', ' ')}
                          </span>
                        </div>
                        
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>Date: {service.date.toLocaleDateString()}</p>
                          <p>Technician: {service.technician}</p>
                          <p>Appointment: #{service.appointmentId}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">${service.totalCost}</p>
                        <p className="text-sm text-gray-600">{service.laborHours}h labor</p>
                      </div>
                    </div>

                    {/* Work Performed */}
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Work Performed:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {service.workPerformed.map((work, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            {work}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Parts Used */}
                    {service.partsUsed.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Parts Used:</h4>
                        <div className="bg-gray-50 rounded-lg p-3">
                          {service.partsUsed.map((part) => (
                            <div key={part.partId} className="flex justify-between items-center text-sm py-1">
                              <div>
                                <span className="font-medium">{part.name}</span>
                                <span className="text-gray-600 ml-2">({part.partNumber})</span>
                              </div>
                              <div className="text-right">
                                <span>{part.quantity} × ${part.unitPrice} = ${part.total}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    {service.notes && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Notes:</h4>
                        <p className="text-sm text-gray-700 italic">&quot;{service.notes}&quot;</p>
                      </div>
                    )}

                    {/* Next Service Due */}
                    {service.nextServiceDue && (
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm font-medium text-blue-800">
                            Next service recommended: {service.nextServiceDue.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}