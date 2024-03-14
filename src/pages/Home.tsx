import { useEffect, useState } from 'react';
import UserRow from '../components/UserRow';
import { IUser } from '../features/user/userSlice';
import EditUserModal from '../components/EditUserModal';
import { useAppSelector } from '../../hooks';

const Home = () => {
  const [allUsers, setAllUsers] = useState<IUser[] | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const getAllUsers = async () => {
    setIsFetching(true);
    try {
      const res = await fetch(
        'https://pre.bistrainer.com/v1/index.cfm?action=testapi.users'
      );
      if (res.ok) {
        console.log('res', res);
        const { users }: { users: IUser[] } = await res.json();

        setAllUsers(users);
      }
    } catch (error) {
      console.log('error', error);
    }
    setIsFetching(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const { isModalOpen } = useAppSelector((store) => store.modal);

  const filteredData = allUsers?.filter((item) => {
    const nameMatch = item.name
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    const emailMatch = item.email
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    const usernameMatch = item.username
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    return nameMatch || emailMatch || usernameMatch;
  });

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className='p-10'>
      {isModalOpen && <EditUserModal />}
      {isFetching ? (
        <p>Loading ...</p>
      ) : (
        <div>
          <h1 className='text-2xl my-5 text-center'>Manage users</h1>

          {/* input to filter users */}
          <div className='my-5 flex flex-col gap-2 items-start'>
            <label className='font-bold'>Filter users</label>
            <input
              type='text'
              className='py-1 px-2 bg-gray-600 rounded-lg'
              placeholder='Search...'
              value={searchInput}
              onChange={handleSearch}
            />
          </div>

          {/* Mapping all users */}
          <div className='flex flex-col gap-5 mt-5'>
            {allUsers && filteredData && filteredData?.length > 1 ? (
              filteredData?.map((user) => {
                return <UserRow key={user.id} {...user} />;
              })
            ) : (
              <p>No user found. Please try a different search</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Home;
