const Footer = () => {
  return (
    <footer className='bg-gray-200 rounded-lg shadow'>
      <div className='w-full max-w-screen-xl mx-auto p-4 md:py-8'>
        <div className='sm:flex sm:items-center sm:justify-between'>
          <a
            href='https://bistrainer.com/'
            className='flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse'>
            <span className='self-center text-2xl font-semibold whitespace-nowrap text-gray-900'>
              Aymeric Trainer
            </span>
          </a>
          <ul className='flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 '>
            <li>
              <a href='#' className='hover:underline me-4 md:me-6'>
                About
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline me-4 md:me-6'>
                Privacy Policy
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline me-4 md:me-6'>
                Terms and Conditions
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline'>
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className='my-6 border-gray-900 sm:mx-auto  lg:my-8' />
        <span className='block text-sm text-gray-500 sm:text-center '>
          © 2023{' '}
          <a href='https://bistrainer.com/' className='hover:underline'>
            Aymeric Trainer
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};
export default Footer;
