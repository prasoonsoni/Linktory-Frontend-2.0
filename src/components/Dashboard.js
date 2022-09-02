import React, { useEffect, useState } from "react";
import {
    Stack,
    Input,
    Heading,
    FormControl,
    FormLabel,
    Text,
    Button,
    useToast,
    InputRightElement,
    InputGroup,
    toast, Link
} from "@chakra-ui/react";
import { Textarea } from '@chakra-ui/react'
import Sidebar from "./Sidebar";
import Card from "./Card";
import { Select } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import LinkCard from "./LinkCard";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const URL = process.env.REACT_APP_URL;

const Dashboard = () => {
    const navigate = useNavigate()
    const toast = useToast();
    const [username, setUsername] = useState("")
    const [links, setLinks] = useState([])
    useEffect(() => {
        if (!sessionStorage.getItem('token')) {
            navigate('/')
        }
        console.log(`${BASE_URL}/api/links/getlinks`)
        console.log(sessionStorage.getItem("token"))

        const getLinks = async () => {
            const response = await fetch(`${BASE_URL}/api/links/getlinks`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": sessionStorage.getItem("token"),
                },
            });
            const json = await response.json();
            if (json.success) {
                setLinks(json.links);
                setUsername(json.username);
            } else {
                console.log(json.message)
                setLinks([])
            }
        }
        getLinks();
    },[links])
    return (
        <>
            <Sidebar>
                <Stack p={4} gap={3} >
                    <Card >
                        <Stack gap={3}>
                            <Heading>Welcome to Your Dashboard.</Heading>
                            <Link color="blue" fontSize={{ base: "sm", md: "md", lg: "xl" }} href={URL + "/" + username} isExternal >{URL + "/" + username}</Link>
                        </Stack>
                    </Card>
                    {links.map((link) => (
                        <LinkCard key = {link._id} link = {link.link} name = {link.name} id={link._id}/>
                    ))}
                </Stack>
            </Sidebar>
        </>
    );
};

export default Dashboard;
