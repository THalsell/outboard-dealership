"use client";

import { useFilter } from "@/contexts/FilterContext";
import { useState } from "react";
import Icon from "@/components/ui/display/Icon";
import Button from "@/components/ui/forms/Button";

interface FilterSidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
  availableBrands?: string[];
  horsepowerRange?: { min: number; max: number };
  availableShaftLengths?: string[];
  onClearAll?: () => void;
}

export default function FilterSidebar({
  isMobile = false,
  onClose,
  availableBrands = [
    "Honda",
    "Yamaha",
    "Mercury",
    "Suzuki",
    "Tohatsu",
    "Freedom",
  ],

  availableShaftLengths = ['Short (15")', 'Long (20")', 'Extra Long (25")'],
  onClearAll,
}: FilterSidebarProps) {
  const { filters, updateFilter, resetFilters } = useFilter();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "availability",
    "brand",
    "condition",
  ]);

  const brands = availableBrands;
  const shaftLengths = availableShaftLengths;
  const conditions = ["new", "used", "overstock", "scratch-dent"];
  const fuelDeliveryTypes = ["carburetor", "efi", "propane"];
  const startingTypes = ["manual", "electric"];
  const steeringTypes = ["remote", "tiller"];
  const trimTiltTypes = ["manual", "power-tilt", "power-trim-tilt"];

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const handleBrandToggle = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    updateFilter("brands", newBrands);

    // Update URL to match home page logo behavior
    const url = new URL(window.location.href);
    if (newBrands.length === 1) {
      // Single brand selected - add to URL like home page logos do
      url.searchParams.set('brand', newBrands[0].toLowerCase());
    } else {
      // Multiple brands or no brands - remove brand param
      url.searchParams.delete('brand');
    }
    window.history.pushState({}, '', url.toString());
  };

  const handleShaftLengthToggle = (length: string) => {
    const newLengths = filters.shaftLengths.includes(length)
      ? filters.shaftLengths.filter((l) => l !== length)
      : [...filters.shaftLengths, length];
    updateFilter("shaftLengths", newLengths);
  };

  const handleConditionToggle = (condition: string) => {
    const newConditions = filters.conditions.includes(condition)
      ? filters.conditions.filter((c) => c !== condition)
      : [...filters.conditions, condition];
    updateFilter("conditions", newConditions);
  };

  const handleFuelDeliveryToggle = (fuelType: string) => {
    const newFuelDelivery = filters.fuelDelivery.includes(fuelType)
      ? filters.fuelDelivery.filter((f) => f !== fuelType)
      : [...filters.fuelDelivery, fuelType];
    updateFilter("fuelDelivery", newFuelDelivery);
  };

  const handleStartingToggle = (startType: string) => {
    const newStarting = filters.starting.includes(startType)
      ? filters.starting.filter((s) => s !== startType)
      : [...filters.starting, startType];
    updateFilter("starting", newStarting);
  };

  const handleSteeringToggle = (steeringType: string) => {
    const newSteering = filters.steering.includes(steeringType)
      ? filters.steering.filter((s) => s !== steeringType)
      : [...filters.steering, steeringType];
    updateFilter("steering", newSteering);
  };

  const handleTrimTiltToggle = (trimTiltType: string) => {
    const newTrimTilt = filters.trimTilt.includes(trimTiltType)
      ? filters.trimTilt.filter((t) => t !== trimTiltType)
      : [...filters.trimTilt, trimTiltType];
    updateFilter("trimTilt", newTrimTilt);
  };

  return (
    <div
      className={`${
        isMobile
          ? "bg-white p-4" // Removed h-full and overflow-hidden
          : ""
      }`}
    >
      {/* Header */}
      <div className="pb-1 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-charcoal uppercase tracking-wide">
            Filter By
          </h2>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="md"
              onClick={onClearAll || resetFilters}
              className="text-sm text-deep-blue hover:text-deep-blue/80 font-medium"
            >
              Clear All
            </Button>
            {isMobile && (
              <Button
                variant="ghost"
                size="md"
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 p-1"
                aria-label="Close filter panel"
              >
                <Icon name="close" size="xl" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-0">
        {/* Availability */}
        <div className="py-0.5 border-b border-gray-200">
          <Button
            variant="ghost"
            size="md"
            onClick={() => toggleSection("availability")}
            className="flex items-center justify-between w-full text-left hover:no-underline hover:bg-gray-50 focus:outline-none focus:ring-0"
            aria-expanded={expandedSections.includes("availability")}
            aria-controls="availability-section"
          >
            <h3 className="text-xl font-semibold text-charcoal">
              Availability
            </h3>
            <Icon
              name="chevronDown"
              size="md"
              className={`text-gray-400 transition-transform ${
                expandedSections.includes("availability") ? "rotate-180" : ""
              }`}
            />
          </Button>
          {expandedSections.includes("availability") && (
            <div id="availability-section" className="mt-1 space-y-0.5">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={(e) =>
                    updateFilter("inStockOnly", e.target.checked)
                  }
                  className="w-4 h-4 text-deep-blue rounded border-gray-300 "
                />
                <span className="text-sm text-gray-700">In Stock Only</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.onSaleOnly}
                  onChange={(e) => updateFilter("onSaleOnly", e.target.checked)}
                  className="w-4 h-4 text-deep-blue rounded border-gray-300 "
                />
                <span className="text-sm text-gray-700">On Sale</span>
              </label>
            </div>
          )}
        </div>

        {/* Brand Filter */}
        <div className="py-0.5 border-b border-gray-200">
          <Button
            variant="ghost"
            size="md"
            onClick={() => toggleSection("brand")}
            className="flex items-center justify-between w-full text-left hover:no-underline hover:bg-gray-50 focus:outline-none focus:ring-0"
            aria-expanded={expandedSections.includes("brand")}
            aria-controls="brand-section"
          >
            <h3 className="text-xl font-semibold text-charcoal">Brand</h3>
            <Icon
              name="chevronDown"
              size="md"
              className={`text-gray-400 transition-transform ${
                expandedSections.includes("brand") ? "rotate-180" : ""
              }`}
            />
          </Button>
          {expandedSections.includes("brand") && (
            <div id="brand-section" className="mt-1 space-y-0.5">
              {brands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                    className="w-4 h-4 text-deep-blue rounded border-gray-300 "
                  />
                  <span className="text-sm text-gray-700">{brand}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Horsepower */}
        <div className="py-0.5 border-b border-gray-200">
          <Button
            variant="ghost"
            size="md"
            onClick={() => toggleSection("horsepower")}
            className="flex items-center justify-between w-full text-left hover:no-underline hover:bg-gray-50 focus:outline-none focus:ring-0"
            aria-expanded={expandedSections.includes("horsepower")}
            aria-controls="horsepower-section"
          >
            <h3 className="text-xl font-semibold text-charcoal">Horsepower</h3>
            <Icon
              name="chevronDown"
              size="md"
              className={`text-gray-400 transition-transform ${
                expandedSections.includes("horsepower") ? "rotate-180" : ""
              }`}
            />
          </Button>
          {expandedSections.includes("horsepower") && (
            <div id="horsepower-section" className="mt-1 space-y-0.5">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={
                    filters.minHorsepower === 0 && filters.maxHorsepower === 30
                  }
                  onChange={() => {
                    updateFilter("minHorsepower", 0);
                    updateFilter("maxHorsepower", 30);
                  }}
                  className="w-4 h-4 text-deep-blue rounded border-gray-300 focus:ring-deep-blue"
                />
                <span className="text-sm text-gray-700">2.5 - 30 HP</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={
                    filters.minHorsepower === 40 &&
                    filters.maxHorsepower === 100
                  }
                  onChange={() => {
                    updateFilter("minHorsepower", 40);
                    updateFilter("maxHorsepower", 100);
                  }}
                  className="w-4 h-4 text-deep-blue rounded border-gray-300 focus:ring-deep-blue"
                />
                <span className="text-sm text-gray-700">40 - 100 HP</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={
                    filters.minHorsepower === 115 &&
                    filters.maxHorsepower === 200
                  }
                  onChange={() => {
                    updateFilter("minHorsepower", 115);
                    updateFilter("maxHorsepower", 200);
                  }}
                  className="w-4 h-4 text-deep-blue rounded border-gray-300 focus:ring-deep-blue"
                />
                <span className="text-sm text-gray-700">115 - 200 HP</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={
                    filters.minHorsepower === 225 &&
                    filters.maxHorsepower === 500
                  }
                  onChange={() => {
                    updateFilter("minHorsepower", 225);
                    updateFilter("maxHorsepower", 500);
                  }}
                  className="w-4 h-4 text-deep-blue rounded border-gray-300 focus:ring-deep-blue"
                />
                <span className="text-sm text-gray-700">225+ HP</span>
              </label>
            </div>
          )}
        </div>

        {/* Condition */}
        <div className="py-0.5 border-b border-gray-200">
          <Button
            variant="ghost"
            size="xl"
            onClick={() => toggleSection("condition")}
            className="flex items-center justify-between w-full text-left hover:no-underline hover:bg-gray-50 focus:outline-none focus:ring-0"
            aria-expanded={expandedSections.includes("condition")}
            aria-controls="condition-section"
          >
            <h3 className="text-xl font-semibold text-charcoal">Condition</h3>
            <Icon
              name="chevronDown"
              size="md"
              className={`text-gray-400 transition-transform ${
                expandedSections.includes("condition") ? "rotate-180" : ""
              }`}
            />
          </Button>
          {expandedSections.includes("condition") && (
            <div id="condition-section" className="mt-1 space-y-0.5">
              {conditions.map((condition) => (
                <label
                  key={condition}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.conditions.includes(condition)}
                    onChange={() => handleConditionToggle(condition)}
                    className="w-4 h-4 text-deep-blue rounded border-gray-300 "
                  />
                  <span className="text-sm text-gray-700 capitalize">
                    {condition === "scratch-dent"
                      ? "Scratch & Dent"
                      : condition === "overstock"
                      ? "Overstock"
                      : condition.charAt(0).toUpperCase() + condition.slice(1)}
                  </span>
                  {condition === "new" && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                      New
                    </span>
                  )}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Shaft Length */}
        <div className="py-0.5 border-b border-gray-200">
          <Button
            variant="ghost"
            size="xl"
            onClick={() => toggleSection("shaft")}
            className="flex items-center justify-between w-full text-left hover:no-underline hover:bg-gray-50 focus:outline-none focus:ring-0"
            aria-expanded={expandedSections.includes("shaft")}
            aria-controls="shaft-section"
          >
            <h3 className="text-xl font-semibold text-charcoal">
              Shaft Length
            </h3>
            <Icon
              name="chevronDown"
              size="md"
              className={`text-gray-400 transition-transform ${
                expandedSections.includes("shaft") ? "rotate-180" : ""
              }`}
            />
          </Button>
          {expandedSections.includes("shaft") && (
            <div id="shaft-section" className="mt-1 space-y-0.5">
              {shaftLengths.map((length) => (
                <label
                  key={length}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.shaftLengths.includes(length)}
                    onChange={() => handleShaftLengthToggle(length)}
                    className="w-4 h-4 text-deep-blue rounded border-gray-300 "
                  />
                  <span className="text-sm text-gray-700">
                    {length === '15"'
                      ? '15" (Short)'
                      : length === '20"'
                      ? '20" (Long)'
                      : length === '25"'
                      ? '25" (Extra Long)'
                      : length}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Fuel Delivery */}
        <div className="py-0.5 border-b border-gray-200">
          <Button
            variant="ghost"
            size="xl"
            onClick={() => toggleSection("fuel")}
            className="flex items-center justify-between w-full text-left hover:no-underline hover:bg-gray-50 focus:outline-none focus:ring-0"
            aria-expanded={expandedSections.includes("fuel")}
            aria-controls="fuel-section"
          >
            <h3 className="text-xl font-semibold text-charcoal">
              Fuel Delivery
            </h3>
            <Icon
              name="chevronDown"
              size="md"
              className={`text-gray-400 transition-transform ${
                expandedSections.includes("fuel") ? "rotate-180" : ""
              }`}
            />
          </Button>
          {expandedSections.includes("fuel") && (
            <div id="fuel-section" className="mt-1 space-y-0.5">
              {fuelDeliveryTypes.map((fuelType) => (
                <label
                  key={fuelType}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.fuelDelivery.includes(fuelType)}
                    onChange={() => handleFuelDeliveryToggle(fuelType)}
                    className="w-4 h-4 text-deep-blue rounded border-gray-300 "
                  />
                  <span className="text-sm text-gray-700 capitalize">
                    {fuelType === "carburetor"
                      ? "Carburetor"
                      : fuelType === "efi"
                      ? "EFI (Electronic Fuel Injection)"
                      : "Propane"}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Starting Method */}
        <div className="py-0.5 border-b border-gray-200">
          <Button
            variant="ghost"
            size="xl"
            onClick={() => toggleSection("starting")}
            className="flex items-center justify-between w-full text-left hover:no-underline hover:bg-gray-50 focus:outline-none focus:ring-0"
            aria-expanded={expandedSections.includes("starting")}
            aria-controls="starting-section"
          >
            <h3 className="text-xl font-semibold text-charcoal">
              Starting Method
            </h3>
            <Icon
              name="chevronDown"
              size="md"
              className={`text-gray-400 transition-transform ${
                expandedSections.includes("starting") ? "rotate-180" : ""
              }`}
            />
          </Button>
          {expandedSections.includes("starting") && (
            <div id="starting-section" className="mt-1 space-y-0.5">
              {startingTypes.map((startType) => (
                <label
                  key={startType}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.starting.includes(startType)}
                    onChange={() => handleStartingToggle(startType)}
                    className="w-4 h-4 text-deep-blue rounded border-gray-300 "
                  />
                  <span className="text-sm text-gray-700 capitalize">
                    {startType === "manual"
                      ? "Manual (Pull Start)"
                      : "Electric Start"}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Steering */}
        <div className="py-0.5 border-b border-gray-200">
          <Button
            variant="ghost"
            size="xl"
            onClick={() => toggleSection("steering")}
            className="flex items-center justify-between w-full text-left hover:no-underline hover:bg-gray-50 focus:outline-none focus:ring-0"
            aria-expanded={expandedSections.includes("steering")}
            aria-controls="steering-section"
          >
            <h3 className="text-xl font-semibold text-charcoal">Controls</h3>
            <Icon
              name="chevronDown"
              size="md"
              className={`text-gray-400 transition-transform ${
                expandedSections.includes("steering") ? "rotate-180" : ""
              }`}
            />
          </Button>
          {expandedSections.includes("steering") && (
            <div id="steering-section" className="mt-1 space-y-0.5">
              {steeringTypes.map((steeringType) => (
                <label
                  key={steeringType}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.steering.includes(steeringType)}
                    onChange={() => handleSteeringToggle(steeringType)}
                    className="w-4 h-4 text-deep-blue rounded border-gray-300 "
                  />
                  <span className="text-sm text-gray-700 capitalize">
                    {steeringType === "remote"
                      ? "Remote Steering"
                      : "Tiller Handle"}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Trim & Tilt */}
        <div className="py-0.5">
          <Button
            variant="ghost"
            size="xl"
            onClick={() => toggleSection("trimtilt")}
            className="flex items-center justify-between w-full text-left hover:no-underline hover:bg-gray-50 focus:outline-none focus:ring-0"
            aria-expanded={expandedSections.includes("trimtilt")}
            aria-controls="trimtilt-section"
          >
            <h3 className="text-xl font-semibold text-charcoal">Trim & Tilt</h3>
            <Icon
              name="chevronDown"
              size="md"
              className={`text-gray-400 transition-transform ${
                expandedSections.includes("trimtilt") ? "rotate-180" : ""
              }`}
            />
          </Button>
          {expandedSections.includes("trimtilt") && (
            <div id="trimtilt-section" className="mt-1 space-y-0.5">
              {trimTiltTypes.map((trimTiltType) => (
                <label
                  key={trimTiltType}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.trimTilt.includes(trimTiltType)}
                    onChange={() => handleTrimTiltToggle(trimTiltType)}
                    className="w-4 h-4 text-deep-blue rounded border-gray-300 "
                  />
                  <span className="text-sm text-gray-700 capitalize">
                    {trimTiltType === "manual"
                      ? "Manual Tilt"
                      : trimTiltType === "power-tilt"
                      ? "Power Tilt"
                      : "Power Trim & Tilt"}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Footer Buttons */}
      {isMobile && (
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex gap-3">
          <Button
            variant="secondary"
            size="md"
            onClick={onClose}
            className="flex-1"
          >
            Close
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={onClose}
            className="flex-1"
          >
            Apply Filters
          </Button>
        </div>
      )}
    </div>
  );
}
