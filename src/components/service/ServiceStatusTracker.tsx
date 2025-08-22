'use client';

import { useState, useEffect } from 'react';
import { ServiceProgress, ServiceStage } from '@/types/models';

// Mock data - replace with API call
const mockServiceProgress: ServiceProgress = {
  appointmentId: 'apt-001',
  currentStage: {
    id: '3',
    name: 'Diagnosis & Inspection',
    description: 'Comprehensive diagnostic testing and visual inspection',
    order: 3,
    status: 'in_progress',
    estimatedDuration: 90,
    actualDuration: 45,
    startTime: new Date('2024-03-15T10:30:00'),
    technician: 'Mike Johnson',
  },
  stages: [
    {
      id: '1',
      name: 'Check-In',
      description: 'Motor received and initial assessment',
      order: 1,
      status: 'completed',
      estimatedDuration: 15,
      actualDuration: 10,
      startTime: new Date('2024-03-15T08:00:00'),
      endTime: new Date('2024-03-15T08:10:00'),
      technician: 'Sarah Williams',
      notes: 'Motor checked in, customer concerns documented',
      checklist: [
        { id: '1', description: 'Visual inspection complete', required: true, completed: true },
        { id: '2', description: 'Customer concerns documented', required: true, completed: true },
        { id: '3', description: 'Service history reviewed', required: true, completed: true },
      ],
      requiredParts: [],
      tools: ['Inspection checklist', 'Camera'],
      safetyRequirements: ['Safety glasses'],
    },
    {
      id: '2',
      name: 'Preparation',
      description: 'Motor setup and safety preparation',
      order: 2,
      status: 'completed',
      estimatedDuration: 30,
      actualDuration: 25,
      startTime: new Date('2024-03-15T08:30:00'),
      endTime: new Date('2024-03-15T08:55:00'),
      technician: 'Mike Johnson',
      notes: 'Motor positioned on test tank, safety protocols followed',
      checklist: [
        { id: '4', description: 'Motor positioned on test tank', required: true, completed: true },
        { id: '5', description: 'Safety equipment checked', required: true, completed: true },
        { id: '6', description: 'Test area prepared', required: true, completed: true },
      ],
      requiredParts: [],
      tools: ['Test tank', 'Lifting equipment'],
      safetyRequirements: ['Safety harness', 'Non-slip shoes'],
    },
    {
      id: '3',
      name: 'Diagnosis & Inspection',
      description: 'Comprehensive diagnostic testing and visual inspection',
      order: 3,
      status: 'in_progress',
      estimatedDuration: 90,
      actualDuration: 45,
      startTime: new Date('2024-03-15T10:30:00'),
      technician: 'Mike Johnson',
      notes: 'Running comprehensive diagnostics, found potential issue with ignition system',
      checklist: [
        { id: '7', description: 'Engine compression test', required: true, completed: true },
        { id: '8', description: 'Ignition system check', required: true, completed: true, notes: 'Weak spark on cylinder 3' },
        { id: '9', description: 'Fuel system inspection', required: true, completed: false },
        { id: '10', description: 'Electrical system test', required: true, completed: false },
      ],
      requiredParts: [],
      tools: ['Diagnostic computer', 'Compression gauge', 'Multimeter'],
      safetyRequirements: ['Eye protection', 'Hearing protection'],
    },
    {
      id: '4',
      name: 'Repair & Replacement',
      description: 'Perform necessary repairs and part replacements',
      order: 4,
      status: 'pending',
      estimatedDuration: 180,
      checklist: [
        { id: '11', description: 'Replace faulty ignition coil', required: true, completed: false },
        { id: '12', description: 'Replace spark plugs', required: true, completed: false },
        { id: '13', description: 'Test repair work', required: true, completed: false },
      ],
      requiredParts: ['ignition-coil-001', 'spark-plugs-set'],
      tools: ['Socket set', 'Torque wrench'],
      safetyRequirements: ['Safety glasses', 'Gloves'],
    },
    {
      id: '5',
      name: 'Testing & Quality Check',
      description: 'Final testing and quality assurance',
      order: 5,
      status: 'pending',
      estimatedDuration: 60,
      checklist: [
        { id: '14', description: 'Full engine test run', required: true, completed: false },
        { id: '15', description: 'Performance verification', required: true, completed: false },
        { id: '16', description: 'Quality inspection', required: true, completed: false },
      ],
      requiredParts: [],
      tools: ['Test tank', 'Tachometer', 'Temperature gauge'],
      safetyRequirements: ['Hearing protection', 'Safety glasses'],
    },
    {
      id: '6',
      name: 'Completion',
      description: 'Final documentation and customer notification',
      order: 6,
      status: 'pending',
      estimatedDuration: 15,
      checklist: [
        { id: '17', description: 'Service documentation complete', required: true, completed: false },
        { id: '18', description: 'Customer notification sent', required: true, completed: false },
        { id: '19', description: 'Motor prepared for pickup', required: true, completed: false },
      ],
      requiredParts: [],
      tools: ['Documentation system'],
      safetyRequirements: [],
    },
  ],
  estimatedCompletion: new Date('2024-03-15T16:00:00'),
  delays: [
    {
      id: '1',
      reason: 'Parts Delivery Delay',
      description: 'Ignition coil delayed by supplier',
      delayDuration: 60,
      timestamp: new Date('2024-03-15T11:30:00'),
      impact: 'moderate',
    },
  ],
  updates: [
    {
      id: '1',
      message: 'Service started - motor checked in and initial assessment complete',
      type: 'progress',
      timestamp: new Date('2024-03-15T08:10:00'),
      technician: 'Sarah Williams',
      customerNotified: true,
    },
    {
      id: '2',
      message: 'Diagnosis in progress - found potential ignition system issue',
      type: 'info',
      timestamp: new Date('2024-03-15T11:15:00'),
      technician: 'Mike Johnson',
      customerNotified: true,
    },
    {
      id: '3',
      message: 'Parts ordered - ignition coil and spark plugs requested',
      type: 'info',
      timestamp: new Date('2024-03-15T11:45:00'),
      technician: 'Mike Johnson',
      customerNotified: true,
    },
  ],
  photosVideos: [
    {
      id: '1',
      type: 'photo',
      url: '/service-photos/motor-checkin-001.jpg',
      description: 'Motor condition at check-in',
      stage: '1',
      timestamp: new Date('2024-03-15T08:05:00'),
      technician: 'Sarah Williams',
    },
    {
      id: '2',
      type: 'photo',
      url: '/service-photos/ignition-issue-001.jpg',
      description: 'Faulty ignition coil identified',
      stage: '3',
      timestamp: new Date('2024-03-15T11:10:00'),
      technician: 'Mike Johnson',
    },
  ],
  partsStatus: [
    {
      partId: 'ignition-coil-001',
      partNumber: 'YAM-68V-82310-00',
      name: 'Ignition Coil Assembly',
      quantity: 1,
      status: 'ordered',
      estimatedArrival: new Date('2024-03-16T10:00:00'),
      vendor: 'Yamaha Parts Direct',
      cost: 165,
    },
    {
      partId: 'spark-plugs-set',
      partNumber: 'NGK-BPR6HS',
      name: 'Spark Plugs (Set of 6)',
      quantity: 1,
      status: 'in_stock',
      vendor: 'NGK',
      cost: 85,
    },
  ],
};

interface ServiceStatusTrackerProps {
  appointmentId: string;
}

export default function ServiceStatusTracker({ appointmentId }: ServiceStatusTrackerProps) {
  const [progress, setProgress] = useState<ServiceProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'progress' | 'updates' | 'photos' | 'parts'>('progress');

  useEffect(() => {
    const fetchProgress = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(mockServiceProgress);
      setLoading(false);
    };

    fetchProgress();
  }, [appointmentId]);

  const getStageIcon = (stage: ServiceStage) => {
    if (stage.status === 'completed') {
      return (
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      );
    } else if (stage.status === 'in_progress') {
      return (
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        </div>
      );
    } else {
      return (
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-xs font-medium text-gray-600">{stage.order}</span>
        </div>
      );
    }
  };

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'progress':
        return (
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'issue':
        return (
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'completion':
        return (
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getPartsStatusBadge = (status: string) => {
    const baseClasses = 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium';
    switch (status) {
      case 'in_stock':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'ordered':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'backordered':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'installed':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-6 bg-gray-300 rounded w-1/3"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-1"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!progress) {
    return (
      <div className="text-center py-12">
        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Service Information Found</h3>
        <p className="text-gray-600">
          We couldn&apos;t find service information for appointment #{appointmentId}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with Current Status */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Service Status</h1>
            <p className="text-blue-100 mb-4">
              Appointment #{appointmentId}
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span>Current Stage:</span>
                <span className="font-medium">{progress.currentStage.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>Technician:</span>
                <span className="font-medium">{progress.currentStage.technician}</span>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <svg className="w-12 h-12 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>
        <div className="mt-4 bg-white/10 rounded-lg p-3">
          <div className="flex justify-between items-center text-sm">
            <span>Estimated Completion:</span>
            <span className="font-medium">{progress.estimatedCompletion.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'progress', label: 'Progress', count: progress.stages.length },
            { id: 'updates', label: 'Updates', count: progress.updates.length },
            { id: 'photos', label: 'Photos', count: progress.photosVideos.length },
            { id: 'parts', label: 'Parts', count: progress.partsStatus.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'progress' | 'updates' | 'photos' | 'parts')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'progress' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Service Progress</h3>
          
          <div className="relative">
            {progress.stages.map((stage, index) => (
              <div key={stage.id} className="relative flex items-start space-x-4 pb-8">
                {/* Connector line */}
                {index < progress.stages.length - 1 && (
                  <div className="absolute left-4 top-8 w-0.5 h-full bg-gray-300" />
                )}
                
                {/* Stage icon */}
                {getStageIcon(stage)}
                
                {/* Stage content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-medium text-gray-900">{stage.name}</h4>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      stage.status === 'completed' ? 'bg-green-100 text-green-800' :
                      stage.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {stage.status.replace('_', ' ')}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mt-1">{stage.description}</p>
                  
                  {stage.notes && (
                    <p className="text-sm text-gray-700 mt-2 bg-gray-50 p-2 rounded">
                      <strong>Notes:</strong> {stage.notes}
                    </p>
                  )}
                  
                  {stage.status !== 'pending' && (
                    <div className="mt-2 text-sm text-gray-600 space-y-1">
                      {stage.startTime && (
                        <div>Started: {stage.startTime.toLocaleString()}</div>
                      )}
                      {stage.endTime && (
                        <div>Completed: {stage.endTime.toLocaleString()}</div>
                      )}
                      {stage.technician && (
                        <div>Technician: {stage.technician}</div>
                      )}
                      <div>
                        Duration: {stage.actualDuration || stage.estimatedDuration} minutes
                        {stage.actualDuration && stage.actualDuration !== stage.estimatedDuration && (
                          <span className="text-gray-500">
                            {' '}(est. {stage.estimatedDuration})
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Checklist for in-progress or completed stages */}
                  {stage.checklist && stage.status !== 'pending' && (
                    <div className="mt-4 bg-gray-50 rounded-lg p-4">
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Checklist</h5>
                      <div className="space-y-2">
                        {stage.checklist.map((item) => (
                          <div key={item.id} className="flex items-start gap-2">
                            <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center ${
                              item.completed ? 'bg-green-500' : 'bg-gray-300'
                            }`}>
                              {item.completed && (
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <div className="flex-1 text-sm">
                              <span className={item.completed ? 'text-gray-900' : 'text-gray-600'}>
                                {item.description}
                              </span>
                              {item.notes && (
                                <div className="text-gray-500 text-xs mt-1">{item.notes}</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'updates' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Service Updates</h3>
          
          <div className="space-y-4">
            {progress.updates.map((update) => (
              <div key={update.id} className="bg-white border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getUpdateIcon(update.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h4 className="text-sm font-medium text-gray-900">{update.message}</h4>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {update.timestamp.toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      By {update.technician}
                      {update.customerNotified && (
                        <span className="ml-2 text-green-600">• Customer notified</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'photos' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Service Photos</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {progress.photosVideos.map((media) => (
              <div key={media.id} className="bg-white border rounded-lg overflow-hidden">
                <div className="aspect-w-16 aspect-h-12 bg-gray-200">
                  <div className="flex items-center justify-center">
                    {media.type === 'photo' ? (
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    ) : (
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="p-3">
                  <h5 className="text-sm font-medium text-gray-900 mb-1">{media.description}</h5>
                  <div className="text-xs text-gray-600">
                    <div>Stage: {progress.stages.find(s => s.id === media.stage)?.name}</div>
                    <div>By {media.technician}</div>
                    <div>{media.timestamp.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'parts' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Parts Status</h3>
          
          <div className="bg-white border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Part
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Part Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ETA
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cost
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {progress.partsStatus.map((part) => (
                  <tr key={part.partId}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{part.name}</div>
                        <div className="text-sm text-gray-500">Qty: {part.quantity}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {part.partNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getPartsStatusBadge(part.status)}>
                        {part.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {part.estimatedArrival ? part.estimatedArrival.toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${part.cost.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Parts Information</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Parts are ordered from authorized dealers for guaranteed compatibility</li>
              <li>• You&apos;ll be notified when parts arrive and work can continue</li>
              <li>• All parts come with manufacturer warranty</li>
              <li>• Total parts cost: ${progress.partsStatus.reduce((sum, part) => sum + part.cost, 0).toLocaleString()}</li>
            </ul>
          </div>
        </div>
      )}

      {/* Delays Section */}
      {progress.delays.length > 0 && (
        <div className="bg-yellow-50 rounded-lg p-4">
          <h4 className="font-medium text-yellow-900 mb-2">Service Delays</h4>
          <div className="space-y-2">
            {progress.delays.map((delay) => (
              <div key={delay.id} className="text-sm text-yellow-800">
                <div className="flex justify-between items-start">
                  <div>
                    <strong>{delay.reason}:</strong> {delay.description}
                  </div>
                  <span className="text-xs text-yellow-600">
                    +{Math.floor(delay.delayDuration / 60)}h {delay.delayDuration % 60}m
                  </span>
                </div>
                <div className="text-xs text-yellow-600 mt-1">
                  {delay.timestamp.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}