import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginnedWrapper = ({ children }) => {
    const { user, setUser } = useContext(UserDataContext);
    const { setCaptain } = useContext(CaptainDataContext);
    const token = localStorage.getItem("token");
    const [notLoginned, setNotLoginned] = useState(true)
    const navigate = useNavigate();
    useEffect(() => {
        if (token) {
            axios
                .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    if (response.status === 200) {
                        setUser(response.data)
                        setNotLoginned(false)
                        navigate("/home");
                    }
                })
                .catch((err) => {
                    axios
                        .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                        .then((response) => {
                            if (response.status === 200) {
                                setCaptain(response.data);
                                setNotLoginned(false)
                                navigate("/captain-home");
                            }
                        })
                        .catch(() => {
                            setNotLoginned(true)
                        });
                });
        }
    }, [navigate, setCaptain, setUser, token])
    if (notLoginned) {
        return <>{children}</>;
    }
};

export default LoginnedWrapper
