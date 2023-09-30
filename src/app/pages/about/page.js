// pages/index.js
import Link from 'next/link';
import LoadingBar from './LoadingBar';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Home</h1>
      <p>This is the home page.</p>
      <Link href="../loader/">
       About
      </Link>
      <LoadingBar />
    </div>
  );
}
