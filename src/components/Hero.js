import React from "react";

import {
  Stack,
  Heading,
  Button,
  Container,
  Image,
  Flex,
  Box,
  Link,
  useDisclosure,
  useToast,
  toast,
  Textarea,
  useClipboard,
  Text
} from "@chakra-ui/react";

import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, InputRightElement
} from '@chakra-ui/react'
import { CopyIcon } from '@chakra-ui/icons'

const Hero = () => {

  return (
    <Container maxW="container.xl" bg="blue.50">
      <Stack direction={{ base: "column", md: "row" }} py={8}>
        <Flex flex="1">
          <Stack justifyContent="center" gap={8}>
            <Box maxW="50ch">
              <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
              Everything you are. <br/>In one simple link.
              </Heading>
            </Box>
          </Stack>
        </Flex>
        <Flex flex="0.75" pt={{ base: 4, md: 0 }}>
          {/* <Image src={Security} alt="Security" /> */}
        </Flex>
      </Stack>
    </Container>
  );
};

export default Hero;
