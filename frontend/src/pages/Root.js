import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';
import { getAuthToken } from '../util/auth';

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit()
  // const navigation = useNavigation();
  // this helps to user to kogout whenever there is inactivity for 
  // for an hour
  useEffect(() => {
    if(!token){
      return;
    }
    if (token === "EXPIRED"){
      submit(null, {action: '/logout', method: 'post'})
    }
    const tokenDuration = getAuthToken();


    setTimeout(() => {
      submit(null, {action: '/logout', method: 'post'})
    }, tokenDuration)
  }, [token, submit])
  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
