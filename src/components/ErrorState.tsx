const ErrorState = ({
  title = "Something went wrong",
  message = "We couldn’t load data. You may also refresh the page or try again later.",
  onRetry,
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
}) => (
  <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-6 text-center w-full h-full">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="mt-1 text-sm text-slate-600 dark:text-gray-300">{message}</p>

    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold
                   bg-sky-500 text-white hover:opacity-90 focus-visible:ring-2 focus-visible:ring-yellow-400"
      >
        Retry
      </button>
    )}
  </div>
);

export default ErrorState;
