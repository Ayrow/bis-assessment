const UserRowSkeleton = () => {
  return (
    <>
      <div
        role='status'
        className='w-full grid grid-cols-6 shadow animate-pulse shadow-primary-color  border-b border-gray-400 px-5 py-10'>
        <div className='h-2.5 rounded-full bg-gray-200 w-8'></div>
        <div className='h-2.5 rounded-full bg-gray-200 w-20'></div>
        <div className='h-2.5 rounded-full bg-gray-200 w-20'></div>
        <div className='h-2.5 rounded-full bg-gray-200 w-24'></div>
        <div className='h-2.5 rounded-full bg-gray-200 w-24'></div>
        <div className='flex gap-5'>
          <div className='h-2.5 rounded-full bg-gray-200 w-20'></div>
          <div className='h-2.5 rounded-full bg-gray-200 w-20'></div>
        </div>
      </div>
      <span className='sr-only'>Loading...</span>
    </>
  );
};
export default UserRowSkeleton;
