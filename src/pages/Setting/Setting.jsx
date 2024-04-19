import Header from "../../components/Header";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Button,
    Text, TableContainer, Table, Thead, Tr, Th, Tbody, IconButton, Td, Tooltip, Image, Box, ButtonGroup, useDisclosure
} from "@chakra-ui/react";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {useTitle} from "../../hooks/UseTitle";
import {useFetchData} from "../../hooks/useFetchData";
import {getBlogs, removeBlog} from "../../services/articles";
import {ShortText} from "../../utils/shortText";
import {defaultImg} from "../../constant/categories";
import {ROUTER} from "../../constant/router";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useToast} from '@chakra-ui/react'


const Setting = () => {
    useTitle(`Setting | Blog app`);
    const [currentItem, setCurrentItem] = useState()

    const {isOpen, onOpen, onClose} = useDisclosure()
    const {data, loading, setData} = useFetchData({requestFn: () => getBlogs()});
    let navigate = useNavigate()
    const toast = useToast()
    const handleRemove = async () => {
        try {
            await removeBlog(currentItem?.id)
            const newFilterData= data?.filter((item)=>item.id != currentItem?.id)
            setData(newFilterData)
            toast({
                title: 'You deleted blog successfully.',
                status: 'success',
                duration: 2000,
                colorScheme: "green",
                position: "top-right",
                isClosable: true,
            })
            onClose()
        } catch (err) {
            toast({
                title: err?.message,
                status: "error",
                position: "top-right",
                colorScheme: "red",
                duration: 2000,
                isClosable: true,
            })
        }

    }
    return (
        <>
            <Header/>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Remove Article</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        {/*<Text fontWeight={700}>sdfsdf</Text>{" "}*/}
                        <span>Are you sure to delete "<b>{currentItem?.title}</b>" ?</span>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme="red" onClick={handleRemove}>
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Box py={100} px={160}>
                <Text align={"center"} fontWeight={600} fontSize="6xl">
                    Setting
                </Text>

                <TableContainer>
                    <Table colorScheme="whatsapp">
                        <Thead>
                            <Tr>
                                <Th>#</Th>
                                <Th>Cover url</Th>
                                <Th>Title</Th>
                                <Th>Desc</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data?.filter((item) => item.id > 100)?.map((blog) => (
                                <Tr key={`setting_blog-${blog.id}`}>
                                    <Td>{blog.id}</Td>
                                    <Td>
                                        <Image
                                            width={10}
                                            height={10}
                                            borderRadius={10}
                                            objectFit={"cover"}
                                            src={blog.cover_url ? blog?.cover_url : defaultImg}
                                        />
                                    </Td>
                                    <Td>{ShortText(blog.title, 20)}</Td>
                                    <Tooltip
                                        label={blog.description}><Td>{ShortText(blog.description, 20)}</Td></Tooltip>
                                    <Td>
                                        <ButtonGroup>
                                            <IconButton colorScheme="teal"
                                                        onClick={() =>
                                                            navigate(
                                                                ROUTER.ARTICLE_CREATE + `?blog_id=${blog?.id}`
                                                            )
                                                        }
                                            >
                                                <EditIcon/>
                                            </IconButton>
                                            <IconButton
                                                colorScheme="red"
                                                onClick={() => {
                                                    setCurrentItem(blog);
                                                    onOpen()
                                                }}
                                            >
                                                <DeleteIcon/>
                                            </IconButton>
                                        </ButtonGroup>
                                    </Td>
                                </Tr>
                            ))}

                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}
export default Setting