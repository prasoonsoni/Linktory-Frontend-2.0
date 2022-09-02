import React, { useEffect, useState } from "react";
import { UnlockIcon } from '@chakra-ui/icons'
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
} from '@chakra-ui/react'
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  Drawer,
  DrawerContent,
  useDisclosure,
  Heading,
  Button,
  Text,
  Link,
  VStack,
  Image,
  Skeleton,
  Avatar,
  useToast
} from "@chakra-ui/react";
import { FaHome, FaAngleDoubleRight, FaCcVisa, FaKey } from "react-icons/fa";
import logo from '../img/logo.png'
import LinkItem from './LinkItem'
import { HamburgerIcon } from "@chakra-ui/icons";
import { NavLink, useNavigate } from "react-router-dom";

const URL = process.env.REACT_APP_URL;
const BASE_URL = process.env.REACT_APP_BASE_URL;
var globalUsername = "";
const SidebarContent = ({ onClose, ...rest }) => {
  const [links, setLinks] = useState([]);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  useEffect(() => {
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
        globalUsername = username
      } else {
        setLinks([])
      }
      setLoading(false)
    }
    getLinks();
  }, [links]);
  
  return (
    <Box bg="blue.50" w={{ base: "full", md: "25%" }} pos="fixed" h="full" {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="center">
        <Flex alignItems="center" gap={2}>
          <Link as={NavLink} to="/">
            <Image src={logo} mt={10} height="60px" />
          </Link>

        </Flex>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex >
      <VStack mt={8}>

        {loading && <><Skeleton height='40px' width="80%" border="50px" />
          <Skeleton height='40px' width="80%" border="50px" />
          <Skeleton height='40px' width="80%" border="50px" /></>}
        {links.map((link) => (
          <LinkItem key={link._id} url={link.link} name={link.name} />
        ))}
      </VStack>

    </Box>
  );
};


const MobileNav = ({ onOpen, ...rest }) => {
  const navigate = useNavigate()
  const toast = useToast()
  const handleOnLogout = () => {
    sessionStorage.removeItem('token')
    navigate('/')
    toast({ title: "Logged out successfully", variant: "left-accent", status: "success", duration: 2000 })
  }
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg="white"
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
      justifyContent="flex-start"
      gap={8}
      {...rest}
    >
      <IconButton
        onClick={onOpen}
        aria-label="open menu"
        icon={<HamburgerIcon />}
      />
      <Flex alignItems="center" gap={2} width="100%">
        <Heading as="h4" size="md" width="100%">
          Linktory
        </Heading>
        <Popover>
          <PopoverTrigger>
            <Avatar size="sm" name={globalUsername} display={{ base: "flex", md: "none" }} _hover={{ cursor: "pointer" }} />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverCloseButton />
            <PopoverHeader>Want to logout?</PopoverHeader>
            <PopoverBody><Button onClick={handleOnLogout} leftIcon={<UnlockIcon />} w="100%" variant="outline" colorScheme="red">Logout</Button></PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    </Flex>
  );
};

const Sidebar = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg="gray.100">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: "25%" }} p="4">
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
