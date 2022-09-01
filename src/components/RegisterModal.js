import React, { useRef, useState } from "react";
import { Button, FormControl, FormLabel, Input, InputGroup, useToast } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, InputRightElement } from '@chakra-ui/react'
const BASE_URL = process.env.REACT_APP_BASE_URL

const RegisterModal = (props) => {
    const toast = useToast()
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleOnClick = async () => {
        if (name.trim().length === 0 || username.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0) {
            toast({ title: "Fields cannot be empty.", variant: "left-accent", status: "error", duration: 2000 })
            return;
        }
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, username: username.trim().toLocaleLowerCase(), email: email.trim().toLocaleLowerCase(), password }),
        });
        const json = await response.json();
        if (json.success) {
            toast({ title: "Logged In Successfully!!", variant: "left-accent", status: "success", duration: 2000 })
        } else {
            toast({ title: json.message, variant: "left-accent", status: "error", duration: 2000 })
        }
        setLoading(false);
    };
    return (
        <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={props.isOpen} onClose={props.onClose} isCentered motionPreset='slideInBottom'>
            <ModalOverlay
                bg='blackAlpha.300'
                backdropFilter='blur(10px)' />
            <ModalContent>
                <ModalHeader>Create your account</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl mt={4}>
                        <FormLabel>Name</FormLabel>
                        <Input ref={initialRef} placeholder='Enter Name Here' value={name} onChange={(e) => { setName(e.target.value) }} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Username</FormLabel>
                        <Input placeholder='Enter Username Here' value={username} onChange={(e) => { setUsername(e.target.value) }} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>E-Mail</FormLabel>
                        <Input placeholder='Enter E-Mail Here' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Password</FormLabel>
                        <InputGroup size='md'>
                            <Input placeholder='Enter Password Here' type={show ? 'text' : 'password'} value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={() => { setShow(!show) }}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleOnClick} colorScheme='blue' mr={3} isLoading={loading} loadingText="Signing Up">
                        Sign Up
                    </Button>
                    <Button onClick={props.onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default RegisterModal