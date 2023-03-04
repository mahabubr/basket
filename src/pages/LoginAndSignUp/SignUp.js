import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const SignUp = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();


    const { googleSignIn, emailPasswordSignUp, updateUser } = useAuth()

    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    const navigate = useNavigate()


    const onSubmit = data => {
        const name = data.name
        const photoURL = data.photoURL
        const email = data.email
        const password = data.password

        emailPasswordSignUp(email, password)
            .then(result => {
                const user = result.user
                toast.success("Register Complete")
                updateUser(name, photoURL)
                    .then(() => {
                        toast.success('Profile Updated')
                        navigate(from, { replace: true })
                    })
                    .catch(e => toast.error(e.message.slice(17, 2)))
            })
            .catch(e => toast.error(e.message.slice(17, 2)))
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                // const user = result.user
                toast.success('Register Complete')
                navigate(from, { replace: true })
            })
            .catch(e => toast.error(e.message.slice(17, -2)))
    }

    return (
        <div className='h-screen w-10/12 md:w-8/12 lg:w-6/12 mx-auto flex justify-center items-center'>
            <div className='bg-amber-100 p-10 rounded-lg'>
                <h2 className='text-3xl font-bold text-center'>Register</h2>
                <p className='text-center text-slate-600'>Already have an account ? <Link className='font-bold text-sky-700'>Login Here</Link></p>
                <form onSubmit={handleSubmit(onSubmit)} className='mt-4'>
                    <div className="form-control w-full">
                        <label htmlFor='name' className="label">
                            <span className="label-text">Full Name</span>
                        </label>
                        <input {...register("name", { required: true })} id='name' type="text" placeholder="Type here" className="input w-full" />
                        {
                            errors.photoURL?.type === 'required' &&
                            <div className="alert alert-error shadow-lg p-1 rounded-none">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>Required Full Name</span>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="form-control w-full">
                        <label htmlFor='url' className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input {...register("photoURL", { required: true })} id='url' type="text" placeholder="Drop Your Link" className="input w-full" />
                        {
                            errors.photoURL?.type === 'required' &&
                            <div className="alert alert-error shadow-lg p-1 rounded-none">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>Required Photo URL</span>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="form-control w-full">
                        <label htmlFor='email' className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input {...register("email", { required: true, maxLength: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ })} id='email' type="email" placeholder="Drop Your Link" className="input w-full" />
                        {
                            (errors.email?.type === 'required' || errors.email?.type === 'maxLength') &&
                            <div className="alert alert-error shadow-lg p-1 rounded-none">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>Required Email Address.</span>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="form-control w-full">
                        <label htmlFor='password' className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input {...register("password", { required: true, minLength: 6 })} id='password' type="password" placeholder="******" className="input w-full" />
                        {
                            (errors.password?.type === 'required' || errors.password?.type === 'minLength') &&
                            <div className="alert alert-error shadow-lg p-1 rounded-none">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>Password at Least 6 Characters</span>
                                </div>
                            </div>
                        }
                    </div>
                    <button type='submit' className="btn btn-accent w-full mt-4">Register Now</button>
                </form>
                <button onClick={handleGoogleSignIn} className="btn btn-outline btn-info w-full mt-3">Google Login</button>
            </div>
        </div>
    );
};

export default SignUp;