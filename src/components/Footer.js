import React from "react";
import { Center, Text, Link } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Center py={5} borderTop="1px" borderColor="gray.100">
      <Text>
        Made with ❤️ by <Link href="https://prasoon.codes" isExternal color="blue.500">Prasoon Soni</Link> |{" "}
        <Link
          href="https://github.com/alok27a/Cognition-Frontend"
          isExternal
          color="blue.500">
          Github Repository
        </Link>
      </Text>
    </Center>
  );
};

export default Footer;
