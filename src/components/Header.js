import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {

    return (
        <div className='z-[100] flex items-center justify-center position absolute top-0 left-1/2 transform -translate-x-1/2'>
            <Link className="p-1 m-1 border rounded-xl bg-neutral-100 hover:bg-neutral-300" to="/">Import browsers data</Link>
            <Link className="p-1 m-1 border rounded-xl bg-neutral-100 hover:bg-neutral-300" to="/step1" >Login</Link>
            <Link className="p-1 m-1 border rounded-xl bg-neutral-100 hover:bg-neutral-300" to="/step2">Company/Freelance</Link>
            <Link className="p-1 m-1 border rounded-xl bg-neutral-100 hover:bg-neutral-300" to="/step3">Company CUI</Link>
            <Link className="p-1 m-1 border rounded-xl bg-neutral-100 hover:bg-neutral-300" to="/step4">Applications</Link>
            <Link className="p-1 m-1 border rounded-xl bg-neutral-100 hover:bg-neutral-300" to="/step5">Organigram</Link>
        </div>
    )
}

export default Header