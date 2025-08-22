'use client';

import { useState } from 'react';
import { WarrantyRegistration as WarrantyRegistrationType, WarrantyMotorInfo, WarrantyOwnerInfo, DealerInfo, PurchaseInfo, WarrantyStatus } from '@/types/models';
import { useAuth } from '@/contexts/AuthContext';

export default function WarrantyRegistration() {
  const { state } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [registration, setRegistration] = useState<Partial<WarrantyRegistrationType>>({
    status: WarrantyStatus.PENDING,
    registrationDate: new Date(),
  });

  const handleMotorInfoChange = (
    field: keyof WarrantyMotorInfo,
    value: string | number | undefined
  ) => {
    setRegistration(prev => ({
      ...prev,
      motorInfo: { ...prev.motorInfo!, [field]: value },
    }));
  };

  const handleOwnerInfoChange = (field: keyof WarrantyOwnerInfo, value: string | number | undefined) => {
    setRegistration(prev => ({
      ...prev,
      ownerInfo: { ...prev.ownerInfo!, [field]: value },
    }));
  };

  const handleOwnerAddressChange = (field: string, value: string) => {
    setRegistration(prev => ({
      ...prev,
      ownerInfo: {
        ...prev.ownerInfo!,
        address: { ...prev.ownerInfo!.address!, [field]: value },
      },
    }));
  };

  const handleBoatInfoChange = (field: string, value: string | number) => {
    setRegistration(prev => ({
      ...prev,
      ownerInfo: {
        ...prev.ownerInfo!,
        boatInfo: { ...prev.ownerInfo!.boatInfo!, [field]: value },
      },
    }));
  };

  const handleDealerInfoChange = (
    field: keyof DealerInfo,
    value: string | number | undefined
  ) => {
    setRegistration(prev => ({
      ...prev,
      dealerInfo: { ...prev.dealerInfo!, [field]: value },
    }));
  };

  const handlePurchaseInfoChange = (
    field: keyof PurchaseInfo,
    value: string | number | Date | boolean | undefined
  ) => {
    setRegistration(prev => ({
      ...prev,
      purchaseInfo: { ...prev.purchaseInfo!, [field]: value },
    }));
  };

  type InstallationField = 'installedByDealer' | 'installationDate' | 'installerName';
  type InstallationValue = boolean | Date | string;

  const handleInstallationInfoChange = (field: InstallationField, value: InstallationValue) => {
    setRegistration(prev => ({
      ...prev,
      purchaseInfo: {
        ...prev.purchaseInfo!,
        installation: { ...prev.purchaseInfo!.installation!, [field]: value },
      },
    }));
  };

  const handleSubmitRegistration = async () => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Warranty registration submitted:', registration);
      setStep(6); // Success step
    } catch (error) {
      console.error('Failed to register warranty:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-center">
        {[1, 2, 3, 4, 5].map((stepNumber, index) => (
          <div key={stepNumber} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= stepNumber 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-300 text-gray-600'
            }`}>
              {step > stepNumber ? '✓' : stepNumber}
            </div>
            {index < 4 && (
              <div className={`w-16 h-1 mx-2 ${
                step > stepNumber ? 'bg-green-600' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>Motor Info</span>
        <span>Owner Info</span>
        <span>Dealer Info</span>
        <span>Purchase Info</span>
        <span>Review</span>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Motor Information</h2>
        <p className="text-gray-600">Enter your outboard motor details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Brand *</label>
          <select
            value={registration.motorInfo?.brand || ''}
            onChange={(e) => handleMotorInfoChange('brand', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
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
            value={registration.motorInfo?.model || ''}
            onChange={(e) => handleMotorInfoChange('model', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="e.g., F200, Verado 250"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Year *</label>
          <input
            type="number"
            value={registration.motorInfo?.year || ''}
            onChange={(e) => handleMotorInfoChange('year', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            min="1990"
            max={new Date().getFullYear()}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Serial Number *</label>
          <input
            type="text"
            value={registration.motorInfo?.serialNumber || ''}
            onChange={(e) => handleMotorInfoChange('serialNumber', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter serial number (found on motor bracket)"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Horsepower *</label>
          <input
            type="number"
            value={registration.motorInfo?.horsepower || ''}
            onChange={(e) => handleMotorInfoChange('horsepower', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            min="2.5"
            max="600"
            step="2.5"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Engine Type</label>
          <select
            value={registration.motorInfo?.engineType || ''}
            onChange={(e) => handleMotorInfoChange('engineType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Select Type</option>
            <option value="4-Stroke">4-Stroke</option>
            <option value="2-Stroke">2-Stroke</option>
            <option value="Electric">Electric</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cylinders</label>
          <input
            type="number"
            value={registration.motorInfo?.cylinders || ''}
            onChange={(e) => handleMotorInfoChange('cylinders', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            min="1"
            max="12"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Shaft Length</label>
          <select
            value={registration.motorInfo?.shaftLength || ''}
            onChange={(e) => handleMotorInfoChange('shaftLength', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Select Length</option>
            <option value="Short (15&quot;)">Short (15&quot;)</option>
            <option value="Long (20&quot;)">Long (20&quot;)</option>
            <option value="Extra Long (25&quot;)">Extra Long (25&quot;)</option>
          </select>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 mb-2">Where to find your serial number:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Located on the motor bracket (transom clamp area)</li>
          <li>• Usually on a metal plate or stamped into the bracket</li>
          <li>• May also be found on the engine block</li>
          <li>• Check your owner&apos;s manual for specific location</li>
        </ul>
      </div>

      <button
        onClick={() => setStep(2)}
        disabled={!registration.motorInfo?.brand || !registration.motorInfo?.model || !registration.motorInfo?.year || !registration.motorInfo?.serialNumber || !registration.motorInfo?.horsepower}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-medium transition-colors"
      >
        Continue to Owner Information
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Owner Information</h2>
        <p className="text-gray-600">Enter your contact and address information</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
            <input
              type="text"
              value={registration.ownerInfo?.firstName || state.user?.firstName || ''}
              onChange={(e) => handleOwnerInfoChange('firstName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
            <input
              type="text"
              value={registration.ownerInfo?.lastName || state.user?.lastName || ''}
              onChange={(e) => handleOwnerInfoChange('lastName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              value={registration.ownerInfo?.email || state.user?.email || ''}
              onChange={(e) => handleOwnerInfoChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
            <input
              type="tel"
              value={registration.ownerInfo?.phone || state.user?.phone || ''}
              onChange={(e) => handleOwnerInfoChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
              <input
                type="text"
                value={registration.ownerInfo?.address?.street1 || ''}
                onChange={(e) => handleOwnerAddressChange('street1', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Apt/Suite (Optional)</label>
              <input
                type="text"
                value={registration.ownerInfo?.address?.street2 || ''}
                onChange={(e) => handleOwnerAddressChange('street2', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                <input
                  type="text"
                  value={registration.ownerInfo?.address?.city || ''}
                  onChange={(e) => handleOwnerAddressChange('city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                <input
                  type="text"
                  value={registration.ownerInfo?.address?.state || ''}
                  onChange={(e) => handleOwnerAddressChange('state', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
                <input
                  type="text"
                  value={registration.ownerInfo?.address?.zipCode || ''}
                  onChange={(e) => handleOwnerAddressChange('zipCode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Boat Information (Optional)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Boat Make</label>
              <input
                type="text"
                value={registration.ownerInfo?.boatInfo?.make || ''}
                onChange={(e) => handleBoatInfoChange('make', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Boat Model</label>
              <input
                type="text"
                value={registration.ownerInfo?.boatInfo?.model || ''}
                onChange={(e) => handleBoatInfoChange('model', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Boat Year</label>
              <input
                type="number"
                value={registration.ownerInfo?.boatInfo?.year || ''}
                onChange={(e) => handleBoatInfoChange('year', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                min="1980"
                max={new Date().getFullYear()}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Boat Length (ft)</label>
              <input
                type="number"
                value={registration.ownerInfo?.boatInfo?.length || ''}
                onChange={(e) => handleBoatInfoChange('length', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                min="8"
                max="100"
                step="0.5"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setStep(1)}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => setStep(3)}
          disabled={!registration.ownerInfo?.firstName || !registration.ownerInfo?.lastName || !registration.ownerInfo?.email || !registration.ownerInfo?.phone}
          className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-medium transition-colors"
        >
          Continue to Dealer Information
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dealer Information</h2>
        <p className="text-gray-600">Information about where you purchased your motor</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Dealer Name *</label>
          <input
            type="text"
            value={registration.dealerInfo?.name || ''}
            onChange={(e) => handleDealerInfoChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Clay Powersports"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Dealer Address</label>
          <input
            type="text"
            value={registration.dealerInfo?.address || ''}
            onChange={(e) => handleDealerInfoChange('address', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dealer Phone</label>
            <input
              type="tel"
              value={registration.dealerInfo?.phone || ''}
              onChange={(e) => handleDealerInfoChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dealer Email</label>
            <input
              type="email"
              value={registration.dealerInfo?.email || ''}
              onChange={(e) => handleDealerInfoChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sales Person Name</label>
          <input
            type="text"
            value={registration.dealerInfo?.salesPersonName || ''}
            onChange={(e) => handleDealerInfoChange('salesPersonName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-yellow-50 rounded-lg p-4">
        <h3 className="font-medium text-yellow-900 mb-2">Can&apos;t remember dealer details?</h3>
        <p className="text-sm text-yellow-800">
          No problem! You can leave these fields blank and we&apos;ll help you locate the dealer information using your motor&apos;s serial number.
        </p>
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
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
        >
          Continue to Purchase Information
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Purchase Information</h2>
        <p className="text-gray-600">Details about your motor purchase</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Date *</label>
            <input
              type="date"
              value={registration.purchaseInfo?.purchaseDate ? registration.purchaseInfo.purchaseDate.toISOString().split('T')[0] : ''}
              onChange={(e) => handlePurchaseInfoChange('purchaseDate', new Date(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Number</label>
            <input
              type="text"
              value={registration.purchaseInfo?.invoiceNumber || ''}
              onChange={(e) => handlePurchaseInfoChange('invoiceNumber', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Price</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">$</span>
              <input
                type="number"
                value={registration.purchaseInfo?.purchasePrice || ''}
                onChange={(e) => handlePurchaseInfoChange('purchasePrice', parseFloat(e.target.value))}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                min="0"
                step="0.01"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Trade-In Allowance</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">$</span>
              <input
                type="number"
                value={registration.purchaseInfo?.tradeInAllowance || ''}
                onChange={(e) => handlePurchaseInfoChange('tradeInAllowance', parseFloat(e.target.value))}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                min="0"
                step="0.01"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Installation Information</h3>
          <div className="space-y-4">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={registration.purchaseInfo?.installation?.installedByDealer || false}
                  onChange={(e) => handleInstallationInfoChange('installedByDealer', e.target.checked)}
                  className="w-4 h-4 text-green-600 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Motor was installed by dealer</span>
              </label>
            </div>

            {registration.purchaseInfo?.installation?.installedByDealer && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Installation Date</label>
                  <input
                    type="date"
                    value={registration.purchaseInfo?.installation?.installationDate ? registration.purchaseInfo.installation.installationDate.toISOString().split('T')[0] : ''}
                    onChange={(e) => handleInstallationInfoChange('installationDate', new Date(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Installer Name</label>
                  <input
                    type="text"
                    value={registration.purchaseInfo?.installation?.installerName || ''}
                    onChange={(e) => handleInstallationInfoChange('installerName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setStep(3)}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => setStep(5)}
          disabled={!registration.purchaseInfo?.purchaseDate}
          className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-medium transition-colors"
        >
          Review Registration
        </button>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Registration</h2>
        <p className="text-gray-600">Please verify all information is correct</p>
      </div>

      <div className="bg-white border rounded-lg p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Motor Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Brand/Model:</span>
              <div className="font-medium">{registration.motorInfo?.brand} {registration.motorInfo?.model}</div>
            </div>
            <div>
              <span className="text-gray-600">Year:</span>
              <div className="font-medium">{registration.motorInfo?.year}</div>
            </div>
            <div>
              <span className="text-gray-600">Serial Number:</span>
              <div className="font-medium">{registration.motorInfo?.serialNumber}</div>
            </div>
            <div>
              <span className="text-gray-600">Horsepower:</span>
              <div className="font-medium">{registration.motorInfo?.horsepower} HP</div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Owner Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Name:</span>
              <div className="font-medium">{registration.ownerInfo?.firstName} {registration.ownerInfo?.lastName}</div>
            </div>
            <div>
              <span className="text-gray-600">Email:</span>
              <div className="font-medium">{registration.ownerInfo?.email}</div>
            </div>
            <div>
              <span className="text-gray-600">Phone:</span>
              <div className="font-medium">{registration.ownerInfo?.phone}</div>
            </div>
            <div>
              <span className="text-gray-600">Address:</span>
              <div className="font-medium">
                {registration.ownerInfo?.address?.street1}<br />
                {registration.ownerInfo?.address?.city}, {registration.ownerInfo?.address?.state} {registration.ownerInfo?.address?.zipCode}
              </div>
            </div>
          </div>
        </div>

        {registration.purchaseInfo?.purchaseDate && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Purchase Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Purchase Date:</span>
                <div className="font-medium">{registration.purchaseInfo.purchaseDate.toLocaleDateString()}</div>
              </div>
              {registration.purchaseInfo.invoiceNumber && (
                <div>
                  <span className="text-gray-600">Invoice Number:</span>
                  <div className="font-medium">{registration.purchaseInfo.invoiceNumber}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="bg-green-50 rounded-lg p-4">
        <h3 className="font-medium text-green-900 mb-2">Warranty Coverage</h3>
        <p className="text-sm text-green-800 mb-2">
          Based on your motor information, you&apos;ll receive the following warranty coverage:
        </p>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• Factory warranty: 3 years or 300 hours</li>
          <li>• Corrosion protection: 5 years</li>
          <li>• Emissions warranty: As required by EPA</li>
        </ul>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setStep(4)}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleSubmitRegistration}
          disabled={loading}
          className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3 px-4 rounded-lg font-medium transition-colors"
        >
          {loading ? 'Registering...' : 'Complete Registration'}
        </button>
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Warranty Registration Complete!</h2>
        <p className="text-gray-600 mb-4">
          Your outboard motor warranty has been successfully registered.
        </p>
        <div className="bg-green-50 rounded-lg p-4 text-left">
          <h3 className="font-semibold text-green-900 mb-2">What&apos;s Next?</h3>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• You&apos;ll receive a confirmation email within 24 hours</li>
            <li>• Your warranty certificate will be mailed to your address</li>
            <li>• Keep your purchase receipt as proof of purchase date</li>
            <li>• Register for maintenance reminders to protect your warranty</li>
          </ul>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => window.location.href = '/service'}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors"
        >
          Back to Service Center
        </button>
        <button
          onClick={() => {
            setStep(1);
            setRegistration({ status: WarrantyStatus.PENDING, registrationDate: new Date() });
          }}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
        >
          Register Another Motor
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
      {step <= 5 && renderStepIndicator()}
      
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      {step === 4 && renderStep4()}
      {step === 5 && renderStep5()}
      {step === 6 && renderStep6()}
    </div>
  );
}