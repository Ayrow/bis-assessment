import { useEffect, useState } from 'react';
import { IUser, setUsers } from '../features/users/usersSlice';
import EditUserModal from '../components/EditUserModal';
import { useAppDispatch, useAppSelector } from '../../hooks';
import UsersList from '../components/UsersList';
import UserRowSkeleton from '../components/UserRowSkeleton';

const Home = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  const { isModalOpen } = useAppSelector((store) => store.modal);
  const { users } = useAppSelector((store) => store.users);
  const dispatch = useAppDispatch();

  const getAllUsers = async () => {
    setIsFetching(true);
    try {
      const res = await fetch(
        'https://pre.bistrainer.com/v1/index.cfm?action=testapi.users'
      );
      if (res.ok) {
        console.log('res', res);
        const { users }: { users: IUser[] } = await res.json();
        dispatch(setUsers(users));
      }
    } catch (error) {
      console.log('error', error);
    }
    setIsFetching(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const goPreviousPage = () => {
    if (pageNumber !== 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const goNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const goToPageNumber = (arg: number) => {
    setPageNumber(arg);
  };

  useEffect(() => {
    if (!users) {
      getAllUsers();
    }
  }, []);

  return (
    <div className=''>
      {isModalOpen && <EditUserModal />}

      <div>
        <div className='p-10'>
          <h1 className='text-2xl my-5 text-center'>Manage users</h1>

          {/* input to filter users */}
          <div className='my-5 flex flex-col gap-2 items-start'>
            <label className='font-bold'>Filter users</label>
            <input
              type='text'
              className='py-1 px-2 bg-gray-200 rounded-lg'
              placeholder='Search...'
              value={searchInput}
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* Header list */}
        <div className=' grid grid-cols-6 bg-gray-400 border-b-2 border-gray-500 p-5 text-lg'>
          <p>Id</p>
          <p>Username</p>
          <p>Name</p>
          <p>Email</p>
          <p>Address</p>
          <p></p>
        </div>

        {/* Mapping all users */}
        {isFetching ? (
          <div className='flex flex-col'>
            <UserRowSkeleton />
            <UserRowSkeleton />
            <UserRowSkeleton />
            <UserRowSkeleton />
            <UserRowSkeleton />
            <UserRowSkeleton />
          </div>
        ) : (
          <div className='flex flex-col'>
            {users ? (
              <UsersList
                users={users}
                searchInput={searchInput}
                pageNumber={pageNumber}
                goPreviousPage={goPreviousPage}
                goNextPage={goNextPage}
                goToPageNumber={goToPageNumber}
              />
            ) : (
              <p>No user found. Please try a different search</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;
