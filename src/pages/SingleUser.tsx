import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CourseRow from '../components/CourseRow';
import { ArrowLeftCircleIcon } from '@heroicons/react/20/solid';
import CourseRowSkeleton from '../components/CourseRowSkeleton';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/16/solid';

export interface ICourse {
  certificate: string;
  passmarks: number;
  classid: string;
  classcode: string;
  classname: string;
  marks: number;
}

const SingleUser = () => {
  const { id } = useParams();
  const [userCourses, setUserCourses] = useState<ICourse[] | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const getUserCourses = async () => {
    setIsFetching(true);
    try {
      // fetch course based on user id
      const res = await fetch(
        `https://pre.bistrainer.com/v1/index.cfm?action=testapi.courses&id=${id}`
      );
      if (res.ok) {
        const { classes } = await res.json();
        setUserCourses(classes);
      }
    } catch (error) {
      console.log('error', error);
    }
    setIsFetching(false);
  };

  // Handles search input for a course
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  // Filtering courses based on the search input
  const filteredCourses = userCourses?.filter((item) => {
    return item.classcode.toLowerCase().includes(searchInput.toLowerCase());
  });

  useEffect(() => {
    // Fetch courses on mount
    getUserCourses();
  }, []);

  return (
    <>
      <div className='pt-10 px-10'>
        <Link
          to={'/'}
          className='bg-blue-500 hover:bg-blue-300 px-2 py-1 rounded-lg mb-10 flex items-center gap-2 w-24 text-white'>
          <ArrowLeftCircleIcon className='h-5 w-5' />
          Back
        </Link>
      </div>

      {/* Search course input */}
      <div className='p-10 flex flex-col gap-2 items-start'>
        <div className='flex gap-2 items-center'>
          <input
            type='text'
            className='py-1 px-2 bg-gray-200 rounded-lg'
            placeholder='Find course...'
            value={searchInput}
            onChange={handleSearch}
          />
          {searchInput ? (
            // Button to clear search
            <button
              type='button'
              className='text-red-500'
              onClick={() => setSearchInput('')}>
              <XMarkIcon className='h-8 w-8' />
            </button>
          ) : (
            <MagnifyingGlassIcon className='h-8 w-8' />
          )}
        </div>
      </div>
      {/* Header for the table */}
      <div className='grid grid-cols-6 bg-gray-200 font-bold gap-5 p-5'>
        <p>Id</p>
        <p>Classcode</p>
        <p>ClassName</p>
        <p>Passmark</p>
        <p>Mark</p>
        <p>Certificate</p>
      </div>

      {/* Course list */}
      {isFetching ? (
        // Skeleton for course row when fetching
        <div className='flex flex-col'>
          <CourseRowSkeleton />
          <CourseRowSkeleton />
          <CourseRowSkeleton />
          <CourseRowSkeleton />
          <CourseRowSkeleton />
        </div>
      ) : (
        // Course list when fetched
        <div className='flex flex-col'>
          {userCourses && filteredCourses && filteredCourses.length > 0 ? (
            filteredCourses?.map((course, index) => {
              return <CourseRow key={index} {...course} />;
            })
          ) : (
            // No course found
            <p>No course found</p>
          )}
        </div>
      )}
    </>
  );
};
export default SingleUser;
