import ErrorState from "./ErrorState";

const DataStateWrapper = ({
  isLoading,
  isError,
  skeleton,
  children,
}: {
  isLoading: boolean;
  isError: boolean;
  isEmpty?: any;
  skeleton?: React.ReactNode;
  children: React.ReactNode;
}) => {
  if (isLoading) return <>{skeleton}</>;
  if (isError) return <ErrorState />;
  //   if (isEmpty) return <EmptyState />;
  return <div>{children}</div>;
};

export default DataStateWrapper;
