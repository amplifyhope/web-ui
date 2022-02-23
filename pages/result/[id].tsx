import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { prisma } from 'common/database';
import fetchJson from 'utils/fetchJson';

const Result = props => {
  const [session, setSession] = useState({});
  const { id } = props;

  const getSession = async (session_id: string) => {
    const foundSession = await fetchJson(
      `/api/checkout-sessions/${session_id}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    );
    setSession(foundSession);
  };

  useEffect(() => {
    getSession(id);
  }, []);

  useEffect(() => {
    if (Object.keys(session).length !== 0) {
    }
  }, [session]);

  console.log('client session: ', session);
  return (
    <div>
      <div>Result page</div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.query;

  return {
    props: {
      id
    }
  };
};

export default Result;
