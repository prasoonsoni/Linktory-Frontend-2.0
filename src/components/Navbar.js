import React from "react";
import { Box, Flex, HStack, IconButton, useDisclosure, Button, Container, Heading, Link, VStack, FormControl, FormLabel, useToast, Input, InputGroup, UnorderedList } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, InputRightElement } from '@chakra-ui/react'
import logo from '../img/logo.png'
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal"

const Navbar = () => {
  const toast = useToast()
  const { isOpen: loginIsOpen, onOpen: loginOnOpen, onClose: loginOnClose } = useDisclosure();
  const { isOpen: registerIsOpen, onOpen: registerOnOpen, onClose: registerOnClose } = useDisclosure();
  let navigate = useNavigate();


  return (
    <Box px={4}>
      <Container maxW="container.xl" py={4}>
        <LoginModal isOpen={loginIsOpen} onOpen={loginOnOpen} onClose={loginOnClose} />
        <RegisterModal isOpen={registerIsOpen} onOpen={registerOnOpen} onClose={registerOnClose} />
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <HStack spacing={8} justifyContent="space-between" w={{ base: "none", md: "full" }} mx={{ base: "auto", md: 0 }}>
            <HStack>
              <img src={logo} width='40%' />
            </HStack>
            <HStack spacing={4} display={{ base: "none", md: "flex" }}>
              <Button colorScheme="blue" p={4} onClick={loginOnOpen} >
                Sign In
              </Button>
              <Button colorScheme="blue" p={4} onClick={registerOnOpen} >
                Sign Up
              </Button>
            </HStack>
            <IconButton size="md" icon={<HamburgerIcon />} display={{ md: "none" }} aria-label={"Toggle menu"} />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
