import React, {useEffect, useState} from "react";
import BlogCard from "../../components/BlogCard/BlogCard";
import {Box, SimpleGrid} from "@chakra-ui/react";
import Header from "../../components/Header";
import {getBlogs} from "../../services/articles";
import {useNavigate} from "react-router-dom";
import {useFetchData} from "../../hooks/useFetchData";
import Loading from "../../components/Loading/Loading";
import SearchBox from "../../components/SearchBox";
import NavigationShow from "../../components/NavigationShow";
import {useTitle} from "../../hooks/UseTitle";
// import NavigationShow from "../../components/NavigationShow";
// import SearchBox from "../../components/SearchBox";

const Articles = () => {
    useTitle(`Articles | Blog app`);
    const [searchData, setSearchData] = useState()
    let navigate = useNavigate()
    const {data, loading} = useFetchData({requestFn: () => getBlogs()})


    useEffect(() => {
        setSearchData(data)
    }, [data])

    const handleSearch=(text)=>{
        const filteredData = searchData?.filter((item)=>{
            return item.title.toLowerCase().includes(text.toLowerCase())
            // new RegExp(text, "i").test(item.title)
        })
        setSearchData(filteredData)
    }
    return (
        <>
            <Header/>
            <Box px={50} py={10}>
                <NavigationShow routes={['Articles']}/>
                <SearchBox
                    onFocus={() => setSearchData(data)}
                    onSearch={handleSearch}
                />
            </Box>

            {loading ?
                <Loading/>
                :
                <SimpleGrid columns={{md: 3, sm: 1}} p="20" spacing="10">
                    {searchData?.filter((item) => item.id > 100)?.map((blog) => (
                        <BlogCard
                            key={`blog-${blog.id}`}
                            {...blog}
                            onReadMore={() => navigate("/articles/" + blog.id)}
                        />
                    ))}
                </SimpleGrid>
            }

        </>
    )
}
export default Articles