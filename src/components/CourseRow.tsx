import { StarIcon } from '@heroicons/react/16/solid';
import { ICourse } from '../pages/SingleUser';
import { Link } from 'react-router-dom';

const CourseRow = (course: ICourse) => {
  const { passmarks, certificate, classcode, classid, classname, marks } =
    course;

  // Dynamic background color based on passed or failed courses
  const checkIfFailedCourse = () => {
    if (passmarks > marks) {
      return 'bg-red-800 hover:bg-red-700';
    } else {
      return 'bg-green-800 hover:bg-green-700';
    }
  };

  return (
    <div
      className={`${checkIfFailedCourse()} grid grid-cols-6 gap-5 p-5 text-white border-b border-gray-400`}>
      <p>{classid}</p>
      <p>{classcode}</p>
      <p>{classname}</p>
      <p>{passmarks}</p>
      <p>{marks}</p>
      {/* Display certificate or failed based on mark and passmark */}
      {passmarks > marks ? (
        <p>Failed</p>
      ) : (
        <Link to={certificate} target='blank'>
          <StarIcon className='h-7 w-7 clear-start text-orange-500 hover:text-orange-300' />
        </Link>
      )}
    </div>
  );
};
export default CourseRow;
