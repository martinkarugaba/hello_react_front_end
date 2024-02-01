import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRandomGreeting } from '../redux/greetingSlice';

const GreetingComponent = () => {
  const dispatch = useDispatch();
  const { greeting, status, error } = useSelector((state) => state.greeting);

  useEffect(() => {
    dispatch(fetchRandomGreeting());
  }, [dispatch, greeting]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  } if (status === 'failed') {
    return (
      <p>
        Error:
        {error}
      </p>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        fontSize: '1.8rem',
      }}
    >
      <h1>{greeting}</h1>
    </div>
  );
};

export default GreetingComponent;
