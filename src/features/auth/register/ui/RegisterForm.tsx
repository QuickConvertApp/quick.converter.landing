
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { registerSchema, RegisterFormValues } from '../model/schema';
import { registerUser } from '../api/register';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  
  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await registerUser(data);
      
      if (result.success) {
        // Registration successful, redirect to login page
        router.push('/sign-in?registered=true');
      } else {
        // Registration failed, show error
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-md border-gray-800 bg-gray-900">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-white">Create an account</CardTitle>
        <CardDescription className="text-gray-400">
          Enter your details to create your account and get started
        </CardDescription>
      </CardHeader>

      {error && (
        <div className="mx-6 mb-2 p-3 bg-red-900/50 border border-red-800 text-red-200 rounded text-sm">
          {error}
        </div>
      )}

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-white">
                First Name
              </Label>
              <Input
                id="firstName"
                type="text"
                {...register('firstName')}
                className="bg-gray-800 border-gray-700 text-white focus:border-white"
                disabled={isLoading}
              />
              {errors.firstName && (
                <p className="text-xs text-red-400">{errors.firstName.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-white">
                Last Name
              </Label>
              <Input
                id="lastName"
                type="text"
                {...register('lastName')}
                className="bg-gray-800 border-gray-700 text-white focus:border-white"
                disabled={isLoading}
              />
              {errors.lastName && (
                <p className="text-xs text-red-400">{errors.lastName.message}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              {...register('email')}
              className="bg-gray-800 border-gray-700 text-white focus:border-white"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-xs text-red-400">{errors.email.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              {...register('password')}
              className="bg-gray-800 border-gray-700 text-white focus:border-white"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-xs text-red-400">{errors.password.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-white">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              className="bg-gray-800 border-gray-700 text-white focus:border-white"
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-400">{errors.confirmPassword.message}</p>
            )}
          </div>
          
          <Button
            type="submit"
            className="w-full bg-white text-black hover:bg-gray-200 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </form>

        <div className="relative my-6">
          <Separator className="bg-gray-800" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 px-2 text-xs text-gray-400">
            OR CONTINUE WITH
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="default" className="border-gray-700 text-white bg-gray-800 hover:bg-gray-600 transition-all ease-in">
            <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.0003 2C6.47731 2 2.00031 6.477 2.00031 12C2.00031 16.991 5.65731 21.128 10.4373 21.878V14.891H7.89831V12H10.4373V9.797C10.4373 7.291 11.9323 5.907 14.2153 5.907C15.3103 5.907 16.4543 6.102 16.4543 6.102V8.562H15.1913C13.9503 8.562 13.5633 9.333 13.5633 10.124V12H16.3363L15.8933 14.89H13.5633V21.878C18.3433 21.128 22.0003 16.991 22.0003 12C22.0003 6.477 17.5233 2 12.0003 2Z" />
            </svg>
            Facebook
          </Button>
          <Button variant="outline" className="border-gray-700 text-white bg-gray-800 hover:bg-gray-600 transition-all ease-in">
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Google
          </Button>
        </div>
      </CardContent>

      <CardFooter className="flex justify-center border-t border-gray-800 pt-6">
        <p className="text-gray-400 text-sm">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-white hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}; 