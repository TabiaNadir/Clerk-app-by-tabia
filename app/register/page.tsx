'use client'; 

import { useState } from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Form Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate input
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (!isLoaded) {
      setError('Clerk is not loaded yet.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      await signUp.create({
        firstName: firstName,
        lastName: lastName,
        emailAddress: email,
        password,
      });

      // Send the email.
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // Change the UI to the pending verification section.
      setPendingVerification(true);
    } catch (err) {
      // Handle errors
      if (err instanceof Error) {
        setError(err.message || 'Something went wrong during sign-up');
      } else {
        console.error('Sign-up error:', err); // Log the full error for debugging
        setError('Something went wrong during sign-up');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Verify User Email Code
  const onPressVerify = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isLoaded) {
      setError('Clerk is not loaded yet.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push('/');
      } else {
        console.log('Verification response:', completeSignUp); // Log the response for debugging
        setError('Verification failed. Please check your code.');
      }
    } catch (err) {
      // Handle errors
      if (err instanceof Error) {
        setError(err.message || 'Verification failed.');
      } else {
        console.error('Verification error:', err); // Log the full error for debugging
        setError('Verification failed.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border p-5 rounded mx-auto my-20" style={{ maxWidth: '500px' }}>
      <h1 className="text-2xl mb-4 text-center">Register</h1>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {isLoading && (
        <div className="flex justify-center items-center mb-4">
          <div className="spinner"></div> {/* Add your spinner component or CSS */}
        </div>
      )}

      {!pendingVerification && (
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              onChange={(e) => setLastName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
              isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Creating account...' : 'Create an account'}
          </button>
        </form>
      )}

      {pendingVerification && (
        <div>
          <form className="space-y-4 md:space-y-6">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              placeholder="Enter Verification Code..."
            />
            <button
              type="submit"
              onClick={onPressVerify}
              disabled={isLoading}
              className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isLoading ? 'Verifying...' : 'Verify Email'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
