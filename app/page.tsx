import SignInPage from "./sign-in/[[...slug]]/page";
import SignUpPage from "./sign-up/[[...sign-up]]/page";

export default function Home() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-5">Welcome</h1>
      <p className="mb-5">
        This is the demo site for Traversy Media&apos;s Next.js &amp; Clerk tutorial. Go
        ahead and sign up or sign in!
      </p>
      <SignInPage />
      <SignUpPage />
    </>
  );
}
