'use client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMutation } from '@apollo/client';
import Link from 'next/link';
import { useState } from 'react';
import { checkConfirmPassword, validateEmail, validatePassword } from '@/utils/validates';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { SIGN_UP } from '@/types/CreateUserInput';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const [signUp, { data, error }] = useMutation(SIGN_UP);

  const handleSignUp = async () => {
    if (!validateEmail(email)) {
      const notify = () => toast.error('Invalid Email');
      notify();
      return;
    }
    if (!validatePassword(password)) {
      toast.error('Password must be 6 - 24 characters');
      return;
    }
    if (!checkConfirmPassword(password, confirmPassword)) {
      toast.error('Confirm password does not match');
      return;
    }
    try {
      const result = await signUp({ variables: { createUserInput: { username: email, password, email } } });
      if (!error) {
        toast.success('Sign up successfully');
        const router = useRouter();
        await router.push('/login');
      } else {
        toast.error('Uh oh! Some things went wrong!');
      }
    } catch (e) {
      toast.error(error?.message);
    }
  };
  return (
    <Card className="max-w-[500px] mx-auto my-20">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline">
            <Icons.facebook className="mr-2 h-4 w-4" />
            Facebook
          </Button>
          <Button variant="outline">
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required={true}
                 onChange={(e) => setEmail(e.target.value)}
                 defaultValue=""
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required={true}
                 onChange={(e) => setPassword(e.target.value)}
                 defaultValue=""
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Confirm Password</Label>
          <Input id="confirm-password" type="password" required={true}
                 onChange={(e) => setConfirmPassword(e.target.value)}
                 defaultValue=""
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button className="w-full" onClick={handleSignUp}>Create account</Button>
        <CardDescription className="mt-3">
          <span>Already has account, </span>
          <Link href="/login" className="underline text-sky-600">Login</Link>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}