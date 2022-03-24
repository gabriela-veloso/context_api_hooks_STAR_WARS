import React, { useContext, useEffect } from 'react';
import SWContext from '../context/SWContext';
import Loading from './Loading';
import Table from './Table';
import Form from './Form';

function Home() {
  const { fetchData, isLoading } = useContext(SWContext);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Form />
      <div>
        { isLoading
          ? <Loading />
          : (
            <Table />
          )}
      </div>
    </div>
  );
}

export default Home;
