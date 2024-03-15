const CourseRowSkeleton = () => {
  return (
    <>
      <div
        role='status'
        className='w-full grid grid-cols-6 shadow animate-pulse shadow-primary-color  border-b border-gray-400 px-5 py-7'>
        <div className='h-2.5 rounded-full bg-gray-200 w-8'></div>
        <div className='h-2.5 rounded-full bg-gray-200 w-12'></div>
        <div className='h-2.5 rounded-full bg-gray-200 w-24'></div>
        <div className='h-2.5 rounded-full bg-gray-200 w-8'></div>
        <div className='h-2.5 rounded-full bg-gray-200 w-8'></div>
        <div className='h-2.5 rounded-full bg-gray-200 w-8'></div>
      </div>
      <span className='sr-only'>Loading...</span>
    </>
  );
};
export default CourseRowSkeleton;
