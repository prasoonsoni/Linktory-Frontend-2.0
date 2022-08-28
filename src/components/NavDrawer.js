import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import { Center, Text, Link } from "@chakra-ui/react";
import React from 'react'

const NavDrawer = (props) => {
    return (
        <>
            <Drawer
                isOpen={props.isOpen}
                placement='right'
                onClose={props.onClose}
                finalFocusRef={props.btnRef}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Create your account</DrawerHeader>

                    <DrawerBody>
                        {/* <Input placeholder='Type here...' /> */}
                    </DrawerBody>

                    <DrawerFooter>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default NavDrawer