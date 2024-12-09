import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/');
        const data = await response.text();
        console.log('Frontend data: ' + data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return <div>Welcome to the Appointment Booking App!</div>;
}

export default Home;