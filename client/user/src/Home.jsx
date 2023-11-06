import React, { useEffect, useState } from "react";
import "./App.css";
import {
    Card,
    Button,
    TextField,
    Grid,
    CircularProgress,
    InputAdornment
} from "@mui/material";
import { useNavigate } from 'react-router-dom'
import axios from "axios";

const Home = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const userName = window.localStorage.getItem('userName')
        const jwtToken=window.localStorage.getItem('jwtToken')
        if(userName===null &&jwtToken===null){
            navigate('/')
        }else{
            fetchingDetails()
        }
        
       
    }, [])

    const fetchingDetails = async () => {
        const userName = window.localStorage.getItem('userName')
       

       
        const response = await axios.post('http://localhost:5000/details', { userName: userName })
        setData(response.data)
    }
    return (
        <Card className="card-container ">
            <p> ➡️ Home</p>
            {
                data?.map((eachObj) => {
                    return (
                        <div className="card" key={eachObj.id}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"

                                style={{ marginLeft: "15px" }}
                            >
                                {eachObj.firstName}
                            </Button>
                            <Button
                                variant="contained"
                                color="warning"
                                type="submit"

                                style={{ marginLeft: "15px" }}
                            >
                                {eachObj.lastName}
                            </Button>
                            <Button
                                variant="contained"
                                color="info"
                                type="submit"

                                style={{ marginLeft: "15px" }}
                            >
                                {eachObj.userName}
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                type="submit"

                                style={{ marginLeft: "15px" }}
                            >
                                {eachObj.password}
                            </Button>
                        </div>
                    )


                })
            }




        </Card>
    );
};

export default Home;
