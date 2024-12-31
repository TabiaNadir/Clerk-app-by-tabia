import SignInPage from "@/app/sign-in/[[...slug]]/page";
import SignUpPage from "@/app/sign-up/[[...sign-up]]/page";

const Dashboard = () => {
    return (
      <>
      <SignInPage />
      <SignUpPage />
        <h1 className='text-2xl font-bold mb-5'>Dashboard</h1>
        <p className='mb-5'>Welcome to the dashboard!</p>
      </>
    );
  };
  
  export default Dashboard;
