import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {

    const {register, handleSubmit, formState: {errors} } = useForm();
    const {signInUser} = useAuth();

    const location = useLocation();

    const navigate = useNavigate();

    const handleLogin = (data) => {
        console.log(data);
        signInUser(data.email, data.password)
        .then(result => {
            const user = result.user;
            console.log(user);
            const from = location?.state || '/';
            navigate(from);
        })
        .catch(error => {
            console.log(error.message);
        });
    }
    return (
        
            <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
                <h3 className="text-3xl text-center">Welcome back. </h3>
                <p className="text-center">Please login to your account</p>
                <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
                    <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" {...register('email', {required: true})} className="input" placeholder="Email" />
                    {
                        errors.email?.type === 'required' && <p className="text-red-600">Email is required</p>
                    }

                    <label className="label">Password</label>
                    <input type="password" {...register('password', {required: true})} className="input" placeholder="Password" />
                    {
                        errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>
                    }

                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                    </fieldset>
                    <p>New to our playform? <Link to="/register" state={location.state} className="link link-hover text-blue-600 underline">Register</Link></p>
                </form>
                <SocialLogin></SocialLogin>
            </div>
        
    );
};

export default Login;