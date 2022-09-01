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

import hero from '../img/hero.svg'
const Hero = () => {

  return (
    <Container maxW="container.xl" bg="blue.50" >
      <Stack direction={{ base: "column", md: "row" }} py={8}>
        <Flex flex="1">
          <Stack justifyContent="center" gap={8}>
            <Box maxW="50ch">
              <Heading fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}>
              The Only Link You’ll Ever Need
              </Heading>
              <Text fontSize={{ base: "lg", md: "xl", lg: "2xl" }}>
              Connect audiences to all of your content with just one link 🔗
              </Text>
            </Box>
          </Stack>
        </Flex>
        <Flex flex="0.75" pt={{ base: 4, md: 0 }}>
          <Image src={hero} alt="Hero" />
        </Flex>
      </Stack>
    </Container>
  );
};

export default Hero;
