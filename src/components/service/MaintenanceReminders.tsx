'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MaintenanceReminder, MaintenanceType } from '@/types/models';
import { useAuth } from '@/contexts/AuthContext';

// Mock data - replace with API call
const mockReminders: MaintenanceReminder[] = [
  {
    id: '1',
    userId: '1',
    motorId: 'yamaha-f200-001',
    type: MaintenanceType.OIL_CHANGE,
    title: '200-Hour Oil Change Due',
    description: 'Your Yamaha F200 is approaching the 200-hour service interval. Regular oil changes are essential for engine longevity.',
    dueDate: new Date('2024-03-20'),
    dueHours: 200,
    priority: 'high',
    status: 'pending',
    reminderSent: true,
    reminderDates: [new Date('2024-03-10'), new Date('2024-03-15')],
    servicePackageId: 'oil-change-200hr',
    estimatedCost: 185,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-15'),
  },
  {
    id: '2',
    userId: '1',
    motorId: 'yamaha-f200-001',
    type: MaintenanceType.SPARK_PLUGS,
    title: 'Spark Plug Replacement',
    description: 'Spark plugs should be inspected and replaced as needed for optimal performance.',
    dueDate: new Date('2024-04-15'),
    dueHours: 250,
    priority: 'medium',
    status: 'pending',
    reminderSent: false,
    reminderDates: [],
    estimatedCost: 125,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
  },
  {
    id: '3',
    userId: '1',
    motorId: 'mercury-150-001',
    type: MaintenanceType.ANNUAL_SERVICE,
    title: 'Annual Service Due',
    description: 'Comprehensive annual maintenance for your Mercury 150. Includes full inspection and service.',
    dueDate: new Date('2024-05-01'),
    priority: 'high',
    status: 'pending',
    reminderSent: false,
    reminderDates: [],
    servicePackageId: 'annual-service-complete',
    estimatedCost: 485,
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
  },
  {
    id: '4',
    userId: '1',
    motorId: 'yamaha-f200-001',
    type: MaintenanceType.WINTERIZATION,
    title: 'Winterization Service',
    description: 'Prepare your motor for winter storage to prevent damage during the off-season.',
    dueDate: new Date('2024-11-01'),
    priority: 'medium',
    status: 'dismissed',
    reminderSent: false,
    reminderDates: [],
    estimatedCost: 225,
    createdAt: new Date('2024-08-01'),
    updatedAt: new Date('2024-08-15'),
  },
  {
    id: '5',
    userId: '1',
    motorId: 'yamaha-f200-001',
    type: MaintenanceType.LOWER_UNIT_OIL,
    title: 'Lower Unit Oil Change',
    description: 'Lower unit oil should be changed regularly to protect the gearcase.',
    dueDate: new Date('2024-03-25'),
    dueHours: 150,
    priority: 'critical',
    status: 'overdue',
    reminderSent: true,
    reminderDates: [new Date('2024-03-20'), new Date('2024-03-22')],
    estimatedCost: 85,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-03-22'),
  },
];

export default function MaintenanceReminders() {
  const { state } = useAuth();
  const [reminders, setReminders] = useState<MaintenanceReminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'overdue' | 'critical'>('all');

  useEffect(() => {
    const fetchReminders = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Filter reminders for current user
      const userReminders = state.user ? mockReminders : mockReminders.slice(0, 3);
      setReminders(userReminders);
      setLoading(false);
    };

    fetchReminders();
  }, [state.user]);

  const handleDismissReminder = async (reminderId: string) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === reminderId 
          ? { ...reminder, status: 'dismissed' }
          : reminder
      )
    );
    // Make API call to dismiss reminder
  };

  const handleScheduleService = (reminderId: string) => {
    // Navigate to appointment scheduler with pre-filled data
    console.log('Scheduling service for reminder:', reminderId);
  };

  const getMaintenanceIcon = (type: MaintenanceType) => {
    switch (type) {
      case MaintenanceType.OIL_CHANGE:
        return '🛢️';
      case MaintenanceType.SPARK_PLUGS:
        return '⚡';
      case MaintenanceType.LOWER_UNIT_OIL:
        return '🔧';
      case MaintenanceType.IMPELLER:
        return '🌊';
      case MaintenanceType.FUEL_FILTER:
        return '⛽';
      case MaintenanceType.ANNUAL_SERVICE:
        return '📅';
      case MaintenanceType.WINTERIZATION:
        return '❄️';
      case MaintenanceType.SPRING_PREP:
        return '🌱';
      case MaintenanceType.INSPECTION:
        return '🔍';
      case MaintenanceType.MAJOR_SERVICE:
        return '🔧';
      default:
        return '🔧';
    }
  };

  const getPriorityColor = (priority: string, status: string) => {
    if (status === 'overdue') return 'border-red-500 bg-red-50';
    
    switch (priority) {
      case 'critical':
        return 'border-red-400 bg-red-50';
      case 'high':
        return 'border-orange-400 bg-orange-50';
      case 'medium':
        return 'border-yellow-400 bg-yellow-50';
      case 'low':
        return 'border-blue-400 bg-blue-50';
      default:
        return 'border-gray-300 bg-white';
    }
  };

  const getPriorityBadge = (priority: string, status: string) => {
    const baseClasses = 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium';
    
    if (status === 'overdue') {
      return `${baseClasses} bg-red-100 text-red-800`;
    }
    
    switch (priority) {
      case 'critical':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'high':
        return `${baseClasses} bg-orange-100 text-orange-800`;
      case 'medium':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'low':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getDaysUntilDue = (dueDate: Date) => {
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredReminders = reminders.filter(reminder => {
    if (reminder.status === 'dismissed') return false;
    
    switch (filter) {
      case 'overdue':
        return reminder.status === 'overdue' || getDaysUntilDue(reminder.dueDate) < 0;
      case 'critical':
        return reminder.priority === 'critical';
      case 'pending':
        return reminder.status === 'pending' && getDaysUntilDue(reminder.dueDate) >= 0;
      case 'all':
      default:
        return true;
    }
  });

  const overdueCount = reminders.filter(r => 
    r.status === 'overdue' || (r.status !== 'dismissed' && getDaysUntilDue(r.dueDate) < 0)
  ).length;

  const criticalCount = reminders.filter(r => 
    r.priority === 'critical' && r.status !== 'dismissed'
  ).length;

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg p-4">
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
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Maintenance Reminders</h2>
          <p className="text-gray-600">Stay on top of your motor maintenance schedule</p>
        </div>

        {(overdueCount > 0 || criticalCount > 0) && (
          <div className="flex gap-2">
            {overdueCount > 0 && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                {overdueCount} Overdue
              </span>
            )}
            {criticalCount > 0 && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                {criticalCount} Critical
              </span>
            )}
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'all', label: 'All Reminders', count: filteredReminders.length },
            { id: 'overdue', label: 'Overdue', count: overdueCount },
            { id: 'critical', label: 'Critical', count: criticalCount },
            { id: 'pending', label: 'Upcoming', count: reminders.filter(r => r.status === 'pending' && getDaysUntilDue(r.dueDate) >= 0).length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as 'all' | 'pending' | 'overdue' | 'critical')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                filter === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                  tab.id === 'overdue' ? 'bg-red-100 text-red-600' :
                  tab.id === 'critical' ? 'bg-orange-100 text-orange-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Reminders List */}
      {filteredReminders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">All Caught Up!</h3>
          <p className="text-gray-600 mb-4">
            {filter === 'all' ? "No maintenance reminders at this time." : `No ${filter} maintenance items.`}
          </p>
          {!state.isAuthenticated && (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Sign in to see your reminders
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReminders.map((reminder) => {
            const daysUntilDue = getDaysUntilDue(reminder.dueDate);
            const isOverdue = daysUntilDue < 0;
            
            return (
              <div
                key={reminder.id}
                className={`border-l-4 rounded-lg p-6 ${getPriorityColor(reminder.priority, reminder.status)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="text-3xl">{getMaintenanceIcon(reminder.type)}</div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{reminder.title}</h3>
                        <span className={getPriorityBadge(reminder.priority, reminder.status)}>
                          {isOverdue ? 'OVERDUE' : reminder.priority.toUpperCase()}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 mb-3">{reminder.description}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-600 mb-4">
                        <div>
                          <span className="font-medium">Due Date:</span>
                          <div className={isOverdue ? 'text-red-600 font-medium' : ''}>
                            {reminder.dueDate.toLocaleDateString()}
                            {isOverdue ? ` (${Math.abs(daysUntilDue)} days ago)` : 
                             daysUntilDue === 0 ? ' (Today)' :
                             daysUntilDue === 1 ? ' (Tomorrow)' :
                             ` (in ${daysUntilDue} days)`}
                          </div>
                        </div>
                        
                        {reminder.dueHours && (
                          <div>
                            <span className="font-medium">Service Hours:</span>
                            <div>{reminder.dueHours} hours</div>
                          </div>
                        )}
                        
                        {reminder.estimatedCost && (
                          <div>
                            <span className="font-medium">Estimated Cost:</span>
                            <div>${reminder.estimatedCost}</div>
                          </div>
                        )}
                      </div>

                      {reminder.reminderSent && reminder.reminderDates.length > 0 && (
                        <div className="text-xs text-gray-500 mb-3">
                          Reminders sent: {reminder.reminderDates.map(d => d.toLocaleDateString()).join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <Link
                    href="/service/schedule"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Schedule Service
                  </Link>
                  
                  <button
                    onClick={() => handleScheduleService(reminder.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Quick Book
                  </button>
                  
                  <button
                    onClick={() => handleDismissReminder(reminder.id)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Maintenance Tips */}
      <div className="bg-blue-50 rounded-lg p-6 mt-8">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Maintenance Best Practices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-2">Regular Maintenance</h4>
            <ul className="space-y-1">
              <li>• Change oil every 100 hours or annually</li>
              <li>• Replace spark plugs every 300 hours</li>
              <li>• Check lower unit oil every 100 hours</li>
              <li>• Replace fuel filter annually</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Seasonal Care</h4>
            <ul className="space-y-1">
              <li>• Winterize before storage</li>
              <li>• Spring preparation service</li>
              <li>• Flush cooling system after salt water use</li>
              <li>• Annual professional inspection</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Service Packages */}
      {filteredReminders.length > 0 && (
        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-4">Service Packages Available</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">Basic Service</h4>
              <p className="text-sm text-green-700 mb-3">Oil change, filter replacement, basic inspection</p>
              <div className="text-lg font-bold text-green-900">$185</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">Complete Service</h4>
              <p className="text-sm text-green-700 mb-3">Full maintenance package with all inspections</p>
              <div className="text-lg font-bold text-green-900">$485</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">Seasonal Package</h4>
              <p className="text-sm text-green-700 mb-3">Winterization or spring preparation service</p>
              <div className="text-lg font-bold text-green-900">$225</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}