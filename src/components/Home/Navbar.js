import React from "react";
import { Box, Flex, HStack, IconButton, useDisclosure, Button, Container, useToast } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import logo from '../../img/logo.png'
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal"
import NavDrawer from "./NavDrawer";

const Navbar = () => {
  const toast = useToast()
  const { isOpen: loginIsOpen, onOpen: loginOnOpen, onClose: loginOnClose } = useDisclosure();
  const { isOpen: registerIsOpen, onOpen: registerOnOpen, onClose: registerOnClose } = useDisclosure();
  const { isOpen: drawerIsOpen, onOpen: drawerOnOpen, onClose: drawerOnClose } = useDisclosure();
  const btnRef = React.useRef();
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
            <IconButton ref={btnRef} onClick={drawerOnOpen} size="md" icon={<HamburgerIcon />} display={{ md: "none" }} aria-label={"Toggle menu"} />
            <NavDrawer isOpen={drawerIsOpen} onOpen={drawerOnOpen} onClose={drawerOnClose} btnRef={btnRef} />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
