import { Drawer, DrawerBody, DrawerFooter, DrawerOverlay, DrawerContent, DrawerCloseButton, VStack, Button, useDisclosure, DrawerHeader, Center } from '@chakra-ui/react'
import React from 'react'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
const NavDrawer = (props) => {
    const { isOpen: loginIsOpen, onOpen: loginOnOpen, onClose: loginOnClose } = useDisclosure()
    const { isOpen: registerIsOpen, onOpen: registerOnOpen, onClose: registerOnClose } = useDisclosure()
    return (
        <>
            <Drawer
                isOpen={props.isOpen}
                placement='right'
                onClose={props.onClose}
                finalFocusRef={props.btnRef}>
                <DrawerOverlay />
                <LoginModal isOpen={loginIsOpen} onOpen={loginOnOpen} onClose={loginOnClose} />
                <RegisterModal isOpen={registerIsOpen} onOpen={registerOnOpen} onClose={registerOnClose} />
                <DrawerContent>
                    <DrawerHeader>
                        Linktory
                    </DrawerHeader>
                    <DrawerCloseButton />
                    <DrawerBody>
                        <VStack spacing={2} display={{ base: "flex", md: "none" }} width="100%">
                            <Button colorScheme="blue" p={4} onClick={loginOnOpen} width="100%" opacity="0.5">
                                Sign In
                            </Button>
                            <Button colorScheme="blue" p={4} onClick={registerOnOpen} width="100%" opacity="0.5">
                                Sign Up
                            </Button>
                        </VStack>
                    </DrawerBody>

                    <DrawerFooter>
                        <Center>
                            © Copyright Prasoon Soni
                        </Center>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default NavDrawer