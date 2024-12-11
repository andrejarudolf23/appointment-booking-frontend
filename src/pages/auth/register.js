import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

const registerSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters.').required('Password is required'),
});

export default function Register() {
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(registerSchema),
    });

    const onSubmit = async (data) => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, data)
            alert('Registration successful! Please log in.');
        } catch (error) {
            alert(error.response?.data?.message || 'Something went wrong');
        }
    }
    
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
                <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="name">Name</label>
                        <input type="text" id="name" className={`w-full px-3 py-2 border rounded ${errors.name ? 'border-red-500' : ''}`}
                        {...register('name')} aria-invalid={!!errors.name}/>
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className={`w-full px-3 py-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
                            {...register('email')}
                            aria-invalid={!!errors.email}
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className={`w-full px-3 py-2 border rounded ${errors.password ? 'border-red-500' : ''}`}
                            {...register('password')}
                            aria-invalid={!!errors.password}
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}

