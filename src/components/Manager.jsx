import React, { useEffect, useState } from 'react'
import { useRef } from 'react'

const Manager = () => {
    const ref = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])


    const showPassword = () => {
        if (ref.current.src.includes("/eye.png")) {
            ref.current.src = "/view.png"
        } else {
            ref.current.src = "/eye.png"
        }
    }

    const savePassword = () => {
        console.log(form)
        setPasswordArray([...passwordArray, form])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
        console.log(passwordArray)
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
            </div>
            <div className=" mycontainer">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-500'>&lt;</span>

                    Pass
                    <span className='text-green-500'>OP/ &gt;</span>
                </h1>
                <p className='text-lg text-green-900 text-center'>Your own Password Manager</p>

                <div className="text-white flex flex-col p-4 gap-8 items-center">

                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' name='site' className='border border-green-500 w-full rounded-full text-black px-4 py-1.5' type="text" />

                    <div className="flex w-full gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' name="username" className='border border-green-500 w-full rounded-full text-black px-4 py-1.5' type="text" />

                        <div className="relative">
                            <input value={form.password} onChange={handleChange} placeholder='Enter Password' name="password" className='border border-green-500 w-full rounded-full text-black px-4 py-1.5' type="text" />
                            <span className='absolute right-0 text-black top-1 cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-2' width={35} src="/view.png" alt="" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='text-black flex justify-center items-center bg-green-400 hover:bg-green-500 cursor-pointer rounded-full px-8 py-2 gap-1 w-fit'> <lord-icon
                        src="https://cdn.lordicon.com/sbnjyzil.json"
                        trigger="hover"
                        colors="primary:#121331,secondary: #002608"
                    >
                    </lord-icon>Add Password</button>
                </div>

                <div className="passwords">
                    <h2 className='text-xl py-4 font-bold'>Your Passwords</h2>

                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length != 0 &&

                        <table className="table-auto text-black w-full rounded-md overflow-hidden">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item,index) => {
                                    return <tr key={index}>
                                        <td className='py-2 border border-white text-center w-32'> <a href={item.site} target='_blank'>{item.site}</a></td>
                                        <td className='py-2 border border-white text-center w-32'>{item.username}</td>
                                        <td className='py-2 border border-white text-center w-32'>{item.password}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    }
                </div>

            </div>
        </>
    )

}

export default Manager