import React, { useEffect, useState } from "react";
import { UnlockIcon } from '@chakra-ui/icons'
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
    toast, Link, VStack, HStack,
    Avatar
} from "@chakra-ui/react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    Skeleton
} from '@chakra-ui/react'
import { AddIcon, DeleteIcon, EditIcon, CloseIcon, CheckIcon } from '@chakra-ui/icons'
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
    const [name, setName] = useState("")
    const [link, setLink] = useState("")
    const [addLoading, setAddLoading] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!sessionStorage.getItem('token')) {
            navigate('/')
        }
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

            setLoading(false)
        }
        getLinks();
    })
    const handleOnAdd = async () => {
        if (!name || !link) {
            toast({ title: "Fields cannot be empty.", variant: "left-accent", status: "error", duration: 2000 })
            return
        }
        setAddLoading(true)
        const response = await fetch(`${BASE_URL}/api/links/addlink`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem('token')
            },
            body: JSON.stringify({ name, link })
        });
        const json = await response.json();
        if (json.success) {
            setLink("")
            setName("")

            toast({ title: json.message, variant: "left-accent", status: "success", duration: 2000 })
        } else {
            toast({ title: json.message, variant: "left-accent", status: "error", duration: 2000 })
        }
        setAddLoading(false)

    }
    const handleOnLogout = () => {
        sessionStorage.removeItem('token')
        navigate('/')
        toast({ title: "Logged out successfully", variant: "left-accent", status: "success", duration: 2000 })
    }
    return (
        <>
            <Sidebar>
                <Stack p={4} gap={3} >
                    <Card>
                        <HStack>
                            <VStack align="left" w="100%">
                                <Heading w="100%">Welcome to your Dashboard.</Heading>
                                <Link w="fit-content" color="blue" fontSize={{ base: "sm", md: "md", lg: "xl" }} href={URL + "/" + username} isExternal >{URL + "/" + username}</Link>
                            </VStack>
                            <Popover>
                                <PopoverTrigger>
                                    <Avatar name={username} display={{ base: "none", md: "flex" }} _hover={{ cursor: "pointer" }} />
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverCloseButton />
                                    <PopoverHeader>Want to logout?</PopoverHeader>
                                    <PopoverBody><Button onClick={handleOnLogout} leftIcon={<UnlockIcon />} w="100%" variant="outline" colorScheme="red">Logout</Button></PopoverBody>
                                </PopoverContent>
                            </Popover>
                        </HStack>
                    </Card>
                    <Card >
                        <Stack gap={3}>
                            <Heading>Add New Link.</Heading>
                            <VStack align="left">
                                <Input placeholder="Name Here..." value={name} onChange={(e) => { setName(e.target.value) }} />
                                <Input placeholder="Link Here..." value={link} onChange={(e) => { setLink(e.target.value) }} />
                                <HStack>
                                    <Button isLoading={addLoading} loadingText="Adding" leftIcon={<AddIcon />} colorScheme="green" variant="outline" onClick={handleOnAdd}>Add</Button>
                                    <Button leftIcon={<CloseIcon />} colorScheme="red" variant="outline" onClick={() => { setName(""); setLink("") }}>Reset</Button>
                                </HStack>
                            </VStack>
                        </Stack>
                    </Card>
                    {loading && <Card>
                        <Stack gap={3}>
                            <Skeleton height='40px' width={{ base: "40%", md: "10%" }} border="50px" />
                            <Skeleton height='45px' width="100%" border="50px" />
                            <Skeleton height='45px' width="100%" border="50px" />
                            <HStack>
                                <Skeleton height='45px' width={{ base: "40%", md: "10%" }} border="50px" />
                                <Skeleton height='45px' width={{ base: "40%", md: "10%" }} border="50px" />
                            </HStack>
                        </Stack>
                    </Card>}
                    {!loading && links.length === 0 && <Card>
                        <Text>No links found.</Text>
                    </Card>}
                    {links.map((link, index) => (
                        <LinkCard index={index + 1} key={link._id} link={link.link} name={link.name} id={link._id} />
                    ))}
                </Stack>
            </Sidebar>
        </>
    );
};

export default Dashboard;
