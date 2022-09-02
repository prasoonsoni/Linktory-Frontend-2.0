import React, { useEffect, useState } from "react";
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
  Image
} from "@chakra-ui/react";
import { FaHome, FaAngleDoubleRight, FaCcVisa, FaKey } from "react-icons/fa";
import logo from '../img/logo.png'
import LinkItem from './LinkItem'
import { HamburgerIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const SidebarContent = ({ onClose, ...rest }) => {
  const [links, setLinks] = useState([]);

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
      } else {
        setLinks([])
      }
    }
    getLinks();
  }, [links]);
  return (
    <Box bg="blue.50" w={{ base: "full", md: "25%" }} pos="fixed" h="full" {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="center">
        <Flex alignItems="center" gap={2}>
          <Link as={NavLink} to="/">
            <Image src={logo} mt={10}/>
          </Link>
        </Flex>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex >
      <VStack mt={8}>
        {links.map((link) => (
          <LinkItem key = {link._id} url = {link.link} name = {link.name} />
        ))}
      </VStack>

    </Box>
  );
};


const MobileNav = ({ onOpen, ...rest }) => {
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
      <Flex alignItems="center" gap={2}>
        <Heading as="h4" size="md">
          Linktory
        </Heading>
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
