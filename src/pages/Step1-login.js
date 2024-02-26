import React, {useContext, useCallback} from 'react'
import AuthContext from '../context/AuthContext'
import { endpoints } from '../api/endpoints'

const Step1Login = () => {

    let {loginUser} = useContext(AuthContext)
    const [incorrectPassword, setIncorrectPassword] = React.useState(false)
    const [incorrectEmail, setIncorrectEmail] = React.useState(false)

    const REACT_APP_GOGGLE_REDIRECT_URL_ENDPOINT='http://localhost:3000';
    const REACT_APP_GOOGLE_CLIENT_ID="731150393378-4sr923k9j8f869bjmojt6pb9gr4mqa4s.apps.googleusercontent.com";

    function LogUserIn(event) {
        event.preventDefault()
        if(event.target.email.value === ''){
            setIncorrectEmail(true)
            return
        }else setIncorrectEmail(false)
        if(event.target.password.value === ''){
            setIncorrectPassword(true)
            return
        }else setIncorrectPassword(false)
        loginUser(event)
    }

    const openGoogleLoginPage = useCallback(() =>
    {
        const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";

        const scope = [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/admin.directory.user",
            "https://www.googleapis.com/auth/admin.directory.user.readonly",
            "https://www.googleapis.com/auth/cloud-platform",
        ].join(" ");

        const params = new URLSearchParams({
            response_type: "code",
            client_id: REACT_APP_GOOGLE_CLIENT_ID,
            redirect_uri: `${REACT_APP_GOGGLE_REDIRECT_URL_ENDPOINT}/google`,
            prompt: "select_account",
            access_type: "offline",
            scope,
        });

        const url = `${googleAuthUrl}?${params}`;

        window.location.href = url;
    }, []);

    return (
        <div>
          <div className="w-[100vw] h-[100vh] bg-no-repeat object-fill bg-center steps-background">
            <div className="mx-auto flex flex-col items-center justify-center w-full h-full">
            <div className="">
                <div>
                <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                    </div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
    
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">Login</h1>
                        </div>
                        <form onSubmit={LogUserIn}>
                            <div className="divide-y classNamedivide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="relative">
                                        <input requierd="true" autoComplete="off" id="email"  name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="email address" />
                                        <label htmlFor="email" className={`${incorrectEmail === false ? '' : 'text-red-400'} absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm`}>Email Address</label>
                                    
                                    </div>
                                    <div className="relative">
                                        <input requierd="true" autoComplete="off" id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="password" />
                                        <label htmlFor="password" className={`${incorrectPassword === false ? '' : 'text-red-400'} absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm`}>Password</label>
                                    </div>
                                    <div className="relative flex items-center justify-end">
                                        <button type="submit" className='bg-cyan-500 text-white rounded-md px-2 py-1'>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                        <button
                            className="bg-white text-gray-800 font-bold py-2 px-4 border rounded shadow  focus:outline-none  mb-8  mb-4"
                            onClick={openGoogleLoginPage}
                            >
                            <div className="flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 48 48"
                                    width="48px"
                                    height="48px"
                                >
                                    <path
                                        fill="#FFC107"
                                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                                    />
                                    <path
                                        fill="#FF3D00"
                                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                                    />
                                    <path
                                        fill="#4CAF50"
                                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                                    />
                                    <path
                                        fill="#1976D2"
                                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                                    />
                                </svg>
                                Sign in with Google
                            </div>
                        </button>
                    </div>
                </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}

export default Step1Login