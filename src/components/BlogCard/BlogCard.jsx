import {Stack,Card, CardBody, CardFooter, Divider, Heading, Image, Text,ButtonGroup,Button} from "@chakra-ui/react";
import {ShortText} from "../../utils/shortText";
import {categories} from "../../constant/categories";

const BlogCard=({title,cover_url,description,id,onReadMore,category})=>{
    const blogCategory = categories?.find((item) => item.id == category);
    return(
        <>
            <Card maxW='sm'>
                <CardBody>
                    <Image height={'200px'} objectFit={'cover'}
                        src={cover_url? cover_url: "https://t4.ftcdn.net/jpg/04/72/65/73/360_F_472657366_6kV9ztFQ3OkIuBCkjjL8qPmqnuagktXU.jpg"}
                        alt={title}
                        borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                        <Heading size='sm' color={"teal"}>Category: {blogCategory.title}</Heading>
                        <Heading size='md'>{title}</Heading>
                        <Text>
                            {ShortText(description,120)}
                        </Text>

                    </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                    <ButtonGroup spacing='2'>
                        <Button  onClick={onReadMore} color={'white'} backgroundColor='cyan.600'>
                            Read more
                        </Button>
                        {/*<Button color={'white'} backgroundColor='red.400'>*/}
                        {/*    Add to favorite*/}
                        {/*</Button>*/}
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </>
    )
}
export default BlogCard