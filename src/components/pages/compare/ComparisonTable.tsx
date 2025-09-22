import React, { memo, useMemo } from "react";
import { Product } from "@/types/product";

interface ComparisonTableProps {
  selectedProducts: (Product | null)[];
  getSpecValue: (product: Product, key: string) => string;
  specCategories: Array<{
    title: string;
    specs: string[];
  }>;
}

const ComparisonTable = memo<ComparisonTableProps>(
  ({ selectedProducts, getSpecValue, specCategories }) => {
    const allSpecs = useMemo(
      () =>
        specCategories
          .flatMap((category) => category.specs)
          .filter((spec) => spec !== "Stock Status"),
      [specCategories]
    );

    const maxTags = useMemo(
      () => Math.max(...selectedProducts.map((p) => p?.tags?.length || 0)),
      [selectedProducts]
    );

    // Responsive table renderer
    const renderTable = (isMobile: boolean) => {
      const sizeClasses = isMobile
        ? {
            wrapper: "block lg:hidden",
            header: "text-lg sm:text-xl",
            th: "text-xs",
            td: "text-xs",
            padding: "p-1 sm:p-2",
            headerPadding: "px-2 py-2 sm:px-4 sm:py-3",
            specLabel: "text-xs font-semibold",
            featureLabel: "text-xs font-semibold",
          }
        : {
            wrapper:
              "hidden lg:block max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto",
            header: "text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl",
            th: "text-sm xl:text-base",
            td: "text-sm xl:text-base",
            padding: "p-2 xl:p-3",
            headerPadding: "px-4 py-4 xl:py-5",
            specLabel: "text-base xl:text-lg",
            featureLabel: "text-base xl:text-lg",
          };

      return (
        <div
          className={`${sizeClasses.wrapper} bg-white rounded-lg shadow-2xl overflow-hidden`}
        >
          <div className={`bg-deep-blue ${sizeClasses.headerPadding}`}>
            <h2
              className={`${sizeClasses.header} font-bold text-white text-center`}
            >
              Specifications
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-500">
                  <th
                    className={`text-left ${sizeClasses.padding} font-semibold text-gray-900 ${sizeClasses.th} sticky left-0 bg-gray-100 z-10 border-r border-gray-500 w-24 sm:w-32 lg:w-auto min-w-[6rem]`}
                  ></th>
                  {selectedProducts.map((product, index) => (
                    <th
                      key={index}
                      className={`${
                        sizeClasses.padding
                      } text-center border-l border-gray-500 ${
                        index === 1 ? "!bg-gray-100" : "!bg-gray-200"
                      }`}
                    >
                      <span
                        className={`text-gray-900 font-semibold ${sizeClasses.th}`}
                      >
                        {product ? `ENGINE ${index + 1}` : "-"}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allSpecs.map((spec) => {
                  // Check if any product has a value for this spec
                  const hasValue = selectedProducts.some(
                    (product) =>
                      product &&
                      getSpecValue(product, spec) &&
                      getSpecValue(product, spec) !== "-"
                  );

                  // Skip rows where no product has a value
                  if (!hasValue) return null;

                  return (
                    <tr
                      key={spec}
                      className="bg-white border-b border-gray-500"
                    >
                      <td
                        className={`${sizeClasses.padding} font-semibold text-gray-900 ${sizeClasses.specLabel} sticky left-0 bg-gray-100 z-10 border-b border-r border-gray-400 uppercase w-24 sm:w-32 lg:w-auto min-w-[6rem]`}
                      >
                        {spec}
                      </td>
                      {selectedProducts.map((product, index) => {
                        const value = product
                          ? getSpecValue(product, spec)
                          : "-";
                        const isHighlighted =
                          value && value !== "-" && value !== "";

                        return (
                          <td
                            key={index}
                            className={`${
                              sizeClasses.padding
                            } text-left text-gray-900 ${
                              sizeClasses.td
                            } font-medium border-l border-gray-500 ${
                              index === 1 ? "!bg-gray-100" : "!bg-gray-200"
                            } ${isHighlighted ? "font-semibold" : ""}`}
                          >
                            {value || "-"}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}

                {/* Feature tags */}
                {maxTags > 0 &&
                  Array.from({ length: maxTags }, (_, i) => {
                    // Check if any product has a tag at this index
                    const hasTag = selectedProducts.some((p) => p?.tags?.[i]);
                    if (!hasTag) return null;

                    return (
                      <tr
                        key={`feature-${i}`}
                        className="bg-white border-b border-gray-500"
                      >
                        <td
                          className={`${sizeClasses.padding} font-semibold text-gray-900 ${sizeClasses.featureLabel} sticky left-0 bg-white z-10 border-r border-gray-500 uppercase w-24 sm:w-32 lg:w-auto min-w-[6rem]`}
                        >
                          Feature {i + 1}
                        </td>
                        {selectedProducts.map((product, index) => (
                          <td
                            key={index}
                            className={`${
                              sizeClasses.padding
                            } text-left text-gray-900 ${
                              sizeClasses.td
                            } font-medium border-l border-gray-500 ${
                              index === 1 ? "!bg-gray-100" : "!bg-gray-200"
                            }`}
                          >
                            {product?.tags?.[i] || "-"}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      );
    };

    return (
      <>
        {renderTable(true)}
        {renderTable(false)}
      </>
    );
  }
);

ComparisonTable.displayName = "ComparisonTable";

export default ComparisonTable;
