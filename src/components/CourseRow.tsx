import { StarIcon } from '@heroicons/react/16/solid';
import { ICourse } from '../pages/SingleUser';
import { Link } from 'react-router-dom';

const CourseRow = (course: ICourse) => {
  const { passmarks, certificate, classcode, classid, classname, marks } =
    course;
  return (
    <div className='grid grid-cols-6 gap-5 border p-5 rounded-lg'>
      <p>{classid}</p>
      <p>{classcode}</p>
      <p>{classname}</p>
      <p>{passmarks}</p>
      <p>{marks}</p>
      <Link to={certificate} target='blank'>
        <StarIcon className='h-6 w-6 clear-start text-orange-500 hover:text-orange-300' />
      </Link>
    </div>
  );
};
export default CourseRow;
