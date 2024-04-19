import React, {useEffect, useState} from "react";
import {
    Box, Button,
    Divider,
    FormControl,
    FormHelperText,
    FormLabel,
    Image,
    Input,
    Select,
    Text,
    Textarea
} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import Header from "../../../components/Header";
import {useTitle} from "../../../hooks/UseTitle";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useFormik} from "formik";
import {categories, defaultImg} from "../../../constant/categories";
import {createBlog, getBlog_id, updateBlog} from "../../../services/articles";
import {useToast} from '@chakra-ui/react'
import {ROUTER} from "../../../constant/router";
import {useFetchData} from "../../../hooks/useFetchData";

const initialValues = {
    title: "",
    description: "",
    cover_url: "",
    category: "",
    created: Date.now()

}
const ArticleCreate = () => {
    let toast = useToast()
    const [param] = useSearchParams();
    const blog_id = param.get("blog_id")
    let navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    useFetchData({
        condition: !blog_id,
        requestFn: () => getBlog_id(blog_id),
        dependency: [blog_id],
        onSuccess: (data) => {
            const { title, desc, cover_url, category, images } = data;
            setValues({ title, desc, cover_url, category, images, created: Date.now() });
        },
    });
    const {values,handleChange, handleSubmit, errors,setValues} = useFormik({
        initialValues,
        onSubmit: handleSubmitCustom,
        validate: (form) => {
            let error = {}
            if (!form?.title?.trim()) {
                error.title = "Required field title!"
            }
            if (!form?.description?.trim()) {
                error.description = "Required field description!"
            }
            if (!form?.cover_url?.trim()) {
                error.cover_url = "Required field cover url!"
            }
            return error;
        }
    })
    useEffect(() => {
        if (!blog_id) return;

        setValues({
            title: "",
            description: "",
            cover_url: "",
            category: null,
            created: Date.now(),
        });
    }, [blog_id]);

    async function  handleSubmitCustom(data, {resetForm}) {
        setLoading(true);
        try{
            if (blog_id) {
                await updateBlog(data,blog_id);
                navigate(ROUTER.SETTING);
            } else {
                await createBlog(data);
                navigate(ROUTER.ARTICLES);
            }
            toast({
                title:  blog_id ? "Blog updated." : "Blog created.",
                status: 'success',
                duration: 2000,
                colorScheme: "green",
                position: "top-right",
                isClosable: true,
            })
            navigate(ROUTER.ARTICLES)
        } catch(err){
            console.log(err,'err')
            toast({
                title: 'Error occurred!',
                status: 'error',
                duration: 2000,
                colorScheme: "red",
                position: "top-right",
                isClosable: true,
            })
        }finally {
            setLoading(false);
        }
    }


    return (
        <>
            <Header/>
            <Box py={100} px={250}>
                <Text fontSize="6xl" align="center" fontWeight={600}>
                    {blog_id ? "Update Blog" : "Create Blog"}
                </Text>
                <Divider/>

                <Box display="flex" flexDirection="column" my={10} gap={6}>
                    <Image
                        width={200}
                        height={200}
                        objectFit="cover"
                        borderRadius={10}
                        src={values.cover_url? values.cover_url : defaultImg}
                    />
                    <FormControl>
                        <FormLabel>Cover Url</FormLabel>
                        <Input name="cover_url" onChange={handleChange}/>
                        {errors?.cover_url && (
                            <FormHelperText color="red">{errors.cover_url}</FormHelperText>
                        )}
                    </FormControl>
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input name="title" onChange={handleChange}/>
                        {errors?.title && (
                            <FormHelperText color="red">{errors?.title}</FormHelperText>
                        )}
                    </FormControl>

                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Textarea name="description" onChange={handleChange}/>
                        {errors?.description && (
                            <FormHelperText color="red">{errors?.description}</FormHelperText>
                        )}
                    </FormControl>

                    <FormControl>
                        <FormLabel>Category</FormLabel>
                        <Select name="category" onChange={handleChange}>
                            <option selected>Select Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.title}</option>
                            ))}
                        </Select>
                    </FormControl>

                    <Divider/>
                    {/*<Box py={5}>*/}
                    {/*    <Image*/}
                    {/*        width={50}*/}
                    {/*        height={50}*/}
                    {/*        objectFit="cover"*/}
                    {/*        borderRadius={10}*/}
                    {/*        mb={4}*/}
                    {/*    />*/}
                    {/*    <FormControl>*/}
                    {/*        <Input*/}
                    {/*            value=""*/}
                    {/*        />*/}
                    {/*    </FormControl>*/}
                    {/*</Box>*/}
                    {/*<Button*/}
                    {/*    colorScheme="red"*/}
                    {/*    alignSelf="flex-start"*/}
                    {/*    leftIcon={<AddIcon/>}*/}
                    {/*>*/}
                    {/*    Add*/}
                    {/*</Button>*/}

                    <Divider/>
                    <Button
                        colorScheme="teal"
                        my={10}
                        onClick={handleSubmit}
                        isLoading={loading}
                    >
                        {blog_id ? "Update" : "Create"}  blog
                    </Button>
                </Box>

                <Divider/>
            </Box>
        </>
    )
}
export default ArticleCreate