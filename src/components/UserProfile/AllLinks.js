import { VStack, Image, Skeleton, Box, Flex, Text } from '@chakra-ui/react';
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
        <Box w="full" h="full" align="center">
            <Flex h="20" alignItems="center" mx="8" justifyContent="center">
                <Flex alignItems="center" gap={2}>
                    <Link to="/">
                        <Image src={logo} mt={10} height="80px" />
                    </Link>
                </Flex>
            </Flex >
            <Text fontSize="xl" mt={5}>{header}</Text>
            {loading && <Skeleton m={8} borderRadius="10px" height='40px' width="300px" border="50px" />}
            {!loading && links.length !== 0 && <VStack w="300px" borderRadius="20px" pt={6} pb={6} backgroundColor="white">
                {!loading && links.map((link) => (
                    <LinkItem key={link._id} url={link.link} name={link.name} />
                ))}
            </VStack>}

        </Box>
    )
}

export default AllLinks