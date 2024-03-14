import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CourseRow from '../components/CourseRow';
import { ArrowLeftCircleIcon } from '@heroicons/react/20/solid';

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
      const res = await fetch(
        `https://pre.bistrainer.com/v1/index.cfm?action=testapi.courses&id=${id}`
      );
      if (res.ok) {
        const { classes } = await res.json();
        console.log('classes', classes);
        setUserCourses(classes);
      }
    } catch (error) {
      console.log('error', error);
    }
    setIsFetching(false);
  };

  // Filtering courses based on the search input
  const filteredCourses = userCourses?.filter((item) => {
    const classnameMatch = item.classname
      .toLowerCase()
      .includes(searchInput.toLowerCase());

    const classcodeMatch = item.classcode
      .toLowerCase()
      .includes(searchInput.toLowerCase());

    return classnameMatch || classcodeMatch;
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    getUserCourses();
  }, []);

  return (
    <div className='p-10'>
      <Link
        to={'/'}
        className='bg-blue-500 hover:bg-blue-300 px-2 py-1 rounded-lg mb-10 flex items-center gap-2 w-24'>
        <ArrowLeftCircleIcon className='h-5 w-5' />
        Back
      </Link>
      {isFetching ? (
        <p>Fetching ...</p>
      ) : (
        <>
          {/* Search course input */}
          <div className='my-5 flex flex-col gap-2 items-start'>
            <label className='font-bold'>Find a course</label>
            <input
              type='text'
              className='py-1 px-2 bg-gray-600 rounded-lg'
              placeholder='Search...'
              value={searchInput}
              onChange={handleSearch}
            />
          </div>
          {/* Header for the grid */}
          <div className='grid grid-cols-6 font-bold gap-5 p-5'>
            <p>Id</p>
            <p>Classcode</p>
            <p>ClassName</p>
            <p>Passmark</p>
            <p>Mark</p>
            <p>Certificate</p>
          </div>

          {/* Course list */}
          <div className='flex flex-col gap-2'>
            {userCourses && filteredCourses && filteredCourses.length > 1 ? (
              filteredCourses?.map((course, index) => {
                return <CourseRow key={index} {...course} />;
              })
            ) : (
              <p>No course found</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default SingleUser;
