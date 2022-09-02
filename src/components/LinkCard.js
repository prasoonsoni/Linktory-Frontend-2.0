import React, { useState, useEffect, useRef } from "react";
import { Box, VStack, Input, Flex, Button, HStack } from "@chakra-ui/react";
import { DeleteIcon, EditIcon, CloseIcon, CheckIcon } from '@chakra-ui/icons'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    useToast
} from '@chakra-ui/react'
const BASE_URL = process.env.REACT_APP_BASE_URL
const LinkCard = (props) => {
    const [link, setLink] = useState(props.link);
    const [name, setName] = useState(props.name);
    const [edit, setEdit] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [editLoading, setEditLoading] = useState(false)
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    
    const handleOnDelete = async () => {
        setDeleteLoading(true)
        const response = await fetch(`${BASE_URL}/api/links/deletelink/${props.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem('token')
            }
        });
        const json = await response.json();
        if (json.success) {
            toast({ title: json.message, variant: "left-accent", status: "success", duration: 2000 })
        } else {
            toast({ title: json.message, variant: "left-accent", status: "error", duration: 2000 })
        }
        setDeleteLoading(false)
    }

    const handleOnEdit = async () => {
        setEditLoading(true)
        const response = await fetch(`${BASE_URL}/api/links/updatelink/${props.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem('token')
            },
            body: JSON.stringify({ name, link })
        });
        const json = await response.json();
        if (json.success) {
            toast({ title: json.message, variant: "left-accent", status: "success", duration: 2000 })
        } else {
            toast({ title: json.message, variant: "left-accent", status: "error", duration: 2000 })
        }
        setEditLoading(false)
        setEdit(false)
    }
    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isCentered motionPreset='slideInBottom'>
                <AlertDialogOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px)'>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Link
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button leftIcon={<CloseIcon />} ref={cancelRef} onClick={onClose} variant="outline">
                                Cancel
                            </Button>
                            <Button isLoading={deleteLoading} loadingText="Deleting" leftIcon={<DeleteIcon />} colorScheme='red' ml={3} variant="outline" onClick={handleOnDelete}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <Box bg="white" w="full" p={8} borderRadius="md">
                <VStack align="left">
                    <Input value={name} onChange={(e) => setName(e.target.value)} disabled={!edit} />
                    <Input value={link} onChange={(e) => setLink(e.target.value)} disabled={!edit} />
                    {!edit && <HStack>
                        <Button leftIcon={<EditIcon />} colorScheme="green" variant="outline" onClick={() => setEdit(!edit)}>
                            Edit
                        </Button>
                        <Button leftIcon={<DeleteIcon />} colorScheme="red" variant="outline" onClick={onOpen}>
                            Delete
                        </Button>
                    </HStack>}
                    {edit && <HStack>
                        <Button isLoading={editLoading} loadingText="Updating" leftIcon={<CheckIcon />} colorScheme="green" variant="outline" onClick={handleOnEdit}>
                            Update
                        </Button>
                        <Button leftIcon={<CloseIcon />} colorScheme="red" variant="outline" onClick={() => { setEdit(!edit); setName(props.name); setLink(props.link) }}>
                            Cancel
                        </Button>
                    </HStack>}
                </VStack>
            </Box>
        </>
    );
};

export default LinkCard;
