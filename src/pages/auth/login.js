import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
});

export default function Login() {
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, data);
            localStorage.setItem('token', response.data.token);
            alert('Login successful');

        } catch (err) {
            alert(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="email">Email</label>
                        <input type="email" id="email" className={`w-full px-3 py-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
                        {...register('email')} aria-invalid={!!errors.email}/>
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="password">Password</label>
                        <input type="password" id="password" className={`w-full px-3 py-2 border rounded ${errors.password ? 'border-red-500' : ''}`}
                        {...register('password')} aria-invalid={!!errors.password}/>
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Login    </button>
                </form>
            </div>
        </div>
        
    )
}