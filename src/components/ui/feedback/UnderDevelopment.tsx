interface UnderDevelopmentProps {
  pageName?: string;
  message?: string;
}

export default function UnderDevelopment({
  pageName = "This Page",
  message = "We're working hard to bring you this feature. Please check back soon!",
}: UnderDevelopmentProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-white">
      <div className="text-center max-w-2xl mx-auto px-4">
        <div className="bg-light-gray rounded-xl p-8 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-deep-blue mb-4">
            {pageName} is Under Development
          </h1>
          <p className="text-lg text-charcoal mb-6">{message}</p>
        </div>
      </div>
    </div>
  );
}
