import React from "react";
import Header from "../../components/Header";
import {Box, Button, Image, SimpleGrid, Text} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {ROUTER} from "../../constant/router";
import {useTitle} from "../../hooks/UseTitle";

const Home=()=>{
    let navigate = useNavigate()
    useTitle(`Home | Blog app`);
    return(
        <>
            <Header />
            <SimpleGrid bg="gray.50" minHeight="70vh"  columns={{ md: 2, sm:1 }} spacing="2" p="10">
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    gap="16px"
                >
                    <Text
                        bgClip="text"
                        fontSize="6xl"
                        fontWeight="extrabold"
                        color="black"
                    >
                        Welcome to Articles Devil
                    </Text>

                    <Text bgClip="text" fontSize="2xl" fontWeight="medium" color="black">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam quos
                        maiores eos impedit praesentium fuga quasi libero ducimus repellat
                        doloremque earum rerum, ullam tempora exercitationem a ad, voluptas,
                        rem tenetur.
                    </Text>
                    <Button
                        size="lg"
                        colorScheme="teal"
                        alignSelf="flex-start"
                        onClick={() => navigate(ROUTER.ARTICLE_CREATE)}
                    >
                        Get started
                    </Button>
                </Box>
                <Box>
                    <Image width={'100%'} objectFit='contain' src="https://www.shutterstock.com/image-photo/bloggingblog-concepts-ideas-white-worktable-600nw-1029506242.jpg" />
                </Box>
            </SimpleGrid>
        </>
    )
}
export default Home