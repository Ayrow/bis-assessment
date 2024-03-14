import { Link } from 'react-router-dom';
import { IUser } from '../features/users/usersSlice';
import { useAppDispatch } from '../../hooks';
import { openModal } from '../features/modal/modalSlice';

const UserRow = (user: IUser) => {
  const { username, email, name, id, address, city } = user;
  const dispatch = useAppDispatch();

  return (
    <>
      <div className='grid grid-cols-6 border px-5 py-5 rounded-lg'>
        <p className='flex items-center'>{id}</p>
        <p className='flex items-center'>{username}</p>
        <p className='flex items-center'>{name}</p>
        <p className='flex items-center'>{email}</p>
        <div className='flex flex-col justify-center'>
          <p className=''>{city}</p>
          <p className=''>{address}</p>
        </div>
        {/* Buttons to edit user and see courses */}
        <div className='flex flex-col items-center gap-2'>
          <button
            type='button'
            onClick={() => dispatch(openModal(user))}
            className='bg-orange-500 hover:bg-orange-300 px-2 py-1 rounded-lg'>
            Edit User
          </button>
          <Link
            to={`/user/${id}`}
            className='text-center bg-blue-500 hover:bg-blue-300 px-2 py-1 rounded-lg'>
            View Courses
          </Link>
        </div>
      </div>
    </>
  );
};
export default UserRow;
