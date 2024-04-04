'use client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '@/hooks/AuthContext';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();
  const handleSubmit = async () => {
    try {
      const { result } = await login({ email, password });
      if (result) {
        toast.success('Welcome back!');
        router.push('/dashboard');
      } else {
        toast.error('Uh oh! Some things went wrong!');
      }
    } catch (e: any) {
      toast.error(e.message);
    }
  };
  return (
    <Card className="max-w-[500px] mx-auto my-28">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login
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
          <Input id="email" type="email" placeholder="m@example.com"
                 required={true} onChange={(e) => setEmail(e.target.value)}
                 defaultValue={''}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password"
                 required={true} onChange={(e) => setPassword(e.target.value)} defaultValue={''}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button className="w-full" onClick={handleSubmit}>Login</Button>
        <CardDescription className="mt-3">
          <span>Don't have account, </span>
          <Link href="/signup" className="underline text-sky-600">Sign Up</Link>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}