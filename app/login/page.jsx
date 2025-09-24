'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUserStore } from '@/store/useUserStore';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Login = () => {
  const { isLoading, errors, loginUser } = useUserStore();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  });

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      if (response !== 'No record found.') {
        toast.success('Login Success');
        router.push('/');
      } else {
        toast.error(response);
      }
      setFormData({
        userName: '',
        password: '',
      });
    } catch (err) {
      toast.error('Login failed');
      console.log('Errors :', err);
      setFormData({
        userName: '',
        password: '',
      });
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm">
        <div>
          <div className="mb-4 flex justify-center items-center">
            <Image src="/logo.png" preview={false} width={200} alt='logo' />
          </div>
          <CardHeader className="flex flex-col gap-2 mb-4">
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="username">UserName</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter Username"
                    name="userName"
                    onChange={handleChange}
                    value={formData.userName}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    onChange={handleChange}
                    type={!showPassword ? 'password' : 'text'}
                    value={formData.password}
                    placeholder="Enter Password"
                    required
                  />
                </div>
                <div
                  className="col-span-full"
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? (
                    <div className="flex gap-3 items-center justify-end">
                      <p>Hide Password</p>
                      <EyeOutlined />
                    </div>
                  ) : (
                    <div className="flex gap-3 items-center justify-end">
                      <p>Show Password</p>
                      <EyeInvisibleOutlined />
                    </div>
                  )}
                </div>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? 'Login...' : 'Login'}
                </Button>
              </div>
            </form>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default Login;
