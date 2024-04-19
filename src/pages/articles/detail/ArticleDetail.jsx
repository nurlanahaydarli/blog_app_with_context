import React from "react";
import Header from "../../../components/Header";
import {SimpleGrid, Box, Image, Text, Button} from "@chakra-ui/react";
import {useParams} from "react-router-dom";
import {useFetchData} from "../../../hooks/useFetchData";
import {getBlog_id} from "../../../services/articles";
import Loading from "../../../components/Loading/Loading";
import {convertTime} from "../../../utils/convertTime";
import {AddIcon, MinusIcon} from "@chakra-ui/icons";
import {useGlobalStore} from "../../../store/global/GlobalProvider";
import {TYPES} from "../../../store/global/types";
import NavigationShow from "../../../components/NavigationShow";
import {useTitle} from "../../../hooks/UseTitle";
import {categories} from "../../../constant/categories";

const ArticleDetail = () => {

    const {id} = useParams()
    const {data, loading} = useFetchData({
        requestFn: () => getBlog_id(id),
        dependency: [id],
    })
    const blogCategory = categories?.find((item) => item.id == data?.category);
    useTitle(`${data?.title} | Blog app`);
    const {state, dispatch} = useGlobalStore();
    const isFav = state?.favorites?.find((item) => item.id == id);

    const handleToggleFav = () => {
        if (isFav) {
            //remove
            const filteredFav = state.favorites.filter((item) => item.id != id);
            dispatch({type: TYPES.TOGGLE_FAV, payload: filteredFav})
            return

        } else {
            //add
            dispatch({type: TYPES.TOGGLE_FAV, payload: [...state.favorites, data]})
            return

        }
    }

    return (
        <>
            <Header/>
            <NavigationShow routes={['Articles', data?.title ]} />
            {loading ?
                <Loading/> :
                <SimpleGrid bg="gray.50" minH={'100vh'} columns={{sm: 2}} spacing="2" p="10">
                    <Box>
                        <Image
                            src={data?.cover_url ? data.cover_url : "https://t4.ftcdn.net/jpg/04/72/65/73/360_F_472657366_6kV9ztFQ3OkIuBCkjjL8qPmqnuagktXU.jpg"}
                            alt={data?.title}/>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="flex-start"
                        gap="16px"
                    >
                        <Text bgClip="text" fontSize="md" fontWeight="medium" color="gray">
                            {data?.created ?
                                <>{convertTime(parseInt(data.created))}</>
                                : ""
                            }
                        </Text>
                        <Text color={'teal'} fontSize="sm">{blogCategory?.title}</Text>
                        <Text
                            bgClip="text"
                            fontSize="2xl"
                            fontWeight="extrabold"
                            color="black"
                        >
                            {data?.title}
                        </Text>

                        <Text bgClip="text" fontSize="lg" fontWeight="medium" color="gray">
                            {data?.description}
                        </Text>
                        <Button
                            colorScheme={isFav ? "red" : "blue"}
                            leftIcon={isFav ? <MinusIcon/> : <AddIcon/>}
                            onClick={handleToggleFav}
                        >
                            {!isFav ? 'Add to favorite' : "Remove from favorite"}
                        </Button>
                    </Box>
                </SimpleGrid>
            }
        </>
    )
}
export default ArticleDetail