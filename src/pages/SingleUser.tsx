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
            {userCourses?.map((course, index) => {
              return <CourseRow key={index} {...course} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};
export default SingleUser;
