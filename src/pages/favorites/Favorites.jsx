import Header from "../../components/Header";
import BlogCard from "../../components/BlogCard/BlogCard";
import {SimpleGrid} from "@chakra-ui/react";
import React from "react";
import {useNavigate} from "react-router-dom";
import {useGlobalStore} from "../../store/global/GlobalProvider";
import NavigationShow from "../../components/NavigationShow";
import {useTitle} from "../../hooks/UseTitle";

const Favorites=()=>{
    useTitle(`Favorites | Blog app`);
    let navigate = useNavigate()
    const {state: {favorites}}= useGlobalStore()
    return(
        <>
            <Header/>
            <NavigationShow routes={['Favorites']} />
            <SimpleGrid columns={{md: 3, sm: 1}} p="20" spacing="10">
                {favorites?.map((favorited_blog)=>(
                    <BlogCard
                        key={`favorited_${favorited_blog.id}`}
                        {...favorited_blog}
                        onReadMore={() => navigate("/articles/" + favorited_blog.id)}
                    />
                ))}

            </SimpleGrid>

        </>
    )
}
export default Favorites