import { Link } from 'react-router-dom';
import { IUser } from '../features/users/usersSlice';
import { useAppDispatch } from '../../hooks';
import { openModal } from '../features/modal/modalSlice';

const UserRow = (user: IUser) => {
  const { username, email, name, id, address, city } = user;
  const dispatch = useAppDispatch();

  return (
    <>
      {/* Course data */}
      <div className='grid grid-cols-6 border-b border-gray-400 px-5 py-5 hover:bg-gray-200'>
        <p className='flex items-center'>{id}</p>
        <p className='flex items-center'>
          <Link
            to={`/user/${id}`}
            className='text-blue-500 border-b border-b-transparent hover:border-b hover:border-b-blue-500'>
            {username}
          </Link>
        </p>
        <p className='flex items-center'>{name}</p>
        <p className='flex items-center'>{email}</p>
        <div className='flex flex-col justify-center '>
          <p className=''>{address}</p>
          <p className=''>{city}</p>
        </div>
        {/* Buttons to edit user and see courses */}
        <div className='flex  items-center gap-2 text-white'>
          <button
            type='button'
            onClick={() => dispatch(openModal(user))}
            className='bg-orange-500 hover:bg-orange-300 px-2 py-1 rounded-lg'>
            Quick Edit
          </button>
          <Link
            to={`/user/${id}#course-list`}
            className='text-center bg-blue-500 hover:bg-blue-300 px-2 py-1 rounded-lg'>
            View Courses
          </Link>
        </div>
      </div>
    </>
  );
};
export default UserRow;
