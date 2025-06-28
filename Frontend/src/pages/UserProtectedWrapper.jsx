import { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectedWrapper = ({ children }) => {

    const { setUser } = useContext(UserDataContext)
    const token = localStorage.getItem('token')
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        if (!token) {
            navigate('/user-login')
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(
            (response) => {
                if (response.status === 200) {
                    setUser(response.data)
                    setIsLoading(false)
                }
            }
        ).catch(
            (err) => {
                navigate("/user-login");
            }
        )
    }, [token, navigate, setUser])


    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }
    return (
        <>
            {children}
        </>
    )
}

export default UserProtectedWrapper