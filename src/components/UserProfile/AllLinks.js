import { VStack, Image, Skeleton, Box, Flex, Text, Link as ChakraLink, Spacer } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../img/logo.png'
import LinkItem from '../Dashboard/LinkItem';
const BASE_URL = process.env.REACT_APP_BASE_URL;
const AllLinks = (props) => {
    const username = props.username
    const [links, setLinks] = useState([])
    const [loading, setLoading] = useState(true)
    const [header, setHeader] = useState("")
    useEffect(() => {
        const getUserData = async () => {
            const response = await fetch(`${BASE_URL}/api/links/user/${username}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const json = await response.json();
            if (json.success) {
                setLinks(json.links);
                setHeader(json.username)
            } else {
                setLinks([]);
                setHeader(json.message)
            }
            setLoading(false)
        }
        getUserData()
    }, [links, username]);
    return (
        <VStack style={{ overflow: "hidden" }} h="100vh">
            <Link to="/">
                <Image src={logo} mt={10} height="80px" />
            </Link>
            <Text fontSize="xl" m={0}>{header}</Text>
            {loading && <Skeleton m={8} borderRadius="10px" height='40px' width="352px" border="50px" />}
            {!loading && links.length !== 0 && <VStack w="400px" borderRadius="20px" p={6} pt={2} backgroundColor="white">
                {!loading && links.map((link) => (
                    <LinkItem key={link._id} url={link.link} name={link.name} />
                ))}
            </VStack>
            }
            <Spacer />
            <Text size="sm" color="gray">Copyright © {new Date().getFullYear()} <ChakraLink href="https://prasoon.codes" target='_blank'>Prasoon Soni</ChakraLink></Text>
        </VStack>
    )
}

export default AllLinks