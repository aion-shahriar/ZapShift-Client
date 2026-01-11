import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Register = () => {

    const {register, handleSubmit, formState: {errors} }=useForm();
    const { registerUser, updateUserProfile } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();

    const axiosSecure= useAxiosSecure();


    
    const handleRegistration = (data) => {
       
        const profileImg = data.photo[0];
        
        registerUser(data.email, data.password)
        .then(() => {

            const formData = new FormData();
            formData.append('image', profileImg);
            const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`;

            axios.post(image_API_URL, formData)
            .then(res => {
                console.log(res.data);

                // create user in the database
                const userInfo = {
                    email: data.email,
                    displayName: data.name,
                    photoURL: res.data.data.url
                }
                axiosSecure.post('/users', userInfo)
                .then(res => {
                    if(res.data.insertedId) {
                        console.log('User created in database');
                    }
                })


                // update profile
                const userProfile = {
                    displayName: data.name,
                    photoURL: res.data.data.url
                }

                updateUserProfile(userProfile)
                .then(() => {
                    // Profile updated successfully
                    navigate(location?.state || '/'); 
                })
                .catch(error => {
                    console.log(error.message);
                });
            })
            
           
             

        })
        .catch(error => {
            console.log(error.message);
        });
    }
    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <h3 className="text-3xl text-center">Welcome to Zap Shift</h3>
                <p className="text-center">Please register your account</p>
            <form className='card-body' onSubmit={handleSubmit(handleRegistration)}>
                <fieldset className="fieldset">
                    {/* Name field */}
                    <label className="label">Name</label>
                    <input type="text" {...register('name', {required: true})} className="input" placeholder="Name" />
                    {
                        errors.name?.type === 'required' && <p className="text-red-600">Name is required</p>
                    }

                    {/* Photo field */}
                    <label className="label">Photo</label>
                    <input type="file" {...register('photo', {required: true})} className="file-input" placeholder="Photo" />
                    {
                        errors.photo?.type === 'required' && <p className="text-red-600">Photo is required</p>
                    }

                    {/* Email field */}
                    <label className="label">Email</label>
                    <input type="email" {...register('email', {required: true})} className="input" placeholder="Email" />
                    {
                        errors.email?.type === 'required' && <p className="text-red-600">Email is required</p>
                    }

                    {/* Password field */}
                    <label className="label">Password</label>
                    <input type="password" {...register('password', {
                        required: true,
                        minLength: 6,
                        pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).+$/
                        
                    })} className="input" placeholder="Password" />
                    {
                        errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>
                    }
                    {
                        errors.password?.type === 'minLength' && <p className="text-red-600">Password must be at least 6 characters</p>
                    }
                    {
                        errors.password?.type === 'pattern' && <p className="text-red-600">Password must contain uppercase, lowercase, number and special character</p>
                    }
                    

                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Register</button>
                </fieldset>
                <p>Already have an account? <Link to="/login" state={location.state} className="link link-hover text-blue-600 underline">Login</Link></p>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;