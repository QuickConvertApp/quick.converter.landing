import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import SigninForm from '@/features/auth/signin/ui/SigninForm';

const SigninPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign In Account - Quick Converter</title>
        <meta name="description" content="Create an account to use Quick Converter" />
      </Head>
      
      <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center p-4">
        <Link href="/" className="cursor-pointer">
          <div className="mb-8 flex items-center gap-3">
            <Image src="/logo.svg" alt="logo" width={124} height={124} />
          </div>
        </Link>
        
        <SigninForm />
      </div>
    </>
  );
};

export default SigninPage; 