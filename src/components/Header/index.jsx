import {Badge, Box, Button, ButtonGroup, Stack, Text} from "@chakra-ui/react";
import {useLocation, useNavigate} from "react-router-dom";
import {ROUTER} from "../../constant/router";
import {useGlobalStore} from "../../store/global/GlobalProvider";

const Header = () => {
    let navigate = useNavigate()
    const {pathname} = useLocation();

    const isActive = (p) => (pathname === p ? "orange" : "white");
    const {state: {favorites}} = useGlobalStore();
    const fav_count = favorites?.length;
    return (
        <>
            <Box
                height="100px"
                p="12px"
                px={50}
                alignItems="center"
                display="flex"
                justifyContent="space-between"
                backgroundColor="cyan.700"
            >
                <Text as="h1" fontSize="4xl" color="white" fontWeight={600}>
                    Blog
                </Text>
                <Stack direction="row" spacing={4} align="center" as="ul">
                    <Button
                        variant="ghost"
                        cursor="pointer"
                        as="li"
                        color={isActive(ROUTER.HOME)}
                        _hover={{color: "teal.600", bg: 'white'}}
                        onClick={() => {
                            navigate(ROUTER.HOME)
                        }}
                    >
                        Home
                    </Button>
                    <Button
                        variant="ghost"
                        cursor="pointer"
                        as="li"
                        color={isActive(ROUTER.ABOUT)}
                        _hover={{color: "teal.600", bg: 'white'}}
                        onClick={() => {
                            navigate(ROUTER.ABOUT)
                        }}
                    >
                        About
                    </Button>
                    <Button
                        variant="ghost"
                        cursor="pointer"
                        as="li"
                        color={isActive(ROUTER.ARTICLES)}
                        _hover={{color: "teal.600", bg: 'white'}}
                        onClick={() => {
                            navigate(ROUTER.ARTICLES)
                        }}
                    >
                        Articles
                    </Button>
                    <Button
                        variant="ghost"
                        cursor="pointer"
                        as="li"
                        color={isActive(ROUTER.FAV)}
                        _hover={{color: "teal.600", bg: 'white'}}
                        onClick={() => {
                            navigate(ROUTER.FAV)
                        }}
                    >
                        Favorites
                        {!!fav_count && (<Badge colorScheme='green' mx={'2px'}>{fav_count}</Badge>)}
                    </Button>
                    <Button
                        variant="ghost"
                        cursor="pointer"
                        as="li"
                        color={isActive(ROUTER.FAQ)}
                        _hover={{color: "teal.600", bg: 'white'}}
                        onClick={() => {
                            navigate(ROUTER.FAQ)
                        }}
                    >
                        FAQ
                    </Button>
                    <ButtonGroup>
                        <Button as="button" onClick={() => {
                            navigate(ROUTER.ARTICLE_CREATE)
                        }}>
                            Create
                        </Button>
                        <Button as="button" onClick={() => {
                            navigate(ROUTER.SETTING)
                        }}>
                            Setting
                        </Button>
                    </ButtonGroup>
                </Stack>
            </Box>
        </>
    )
}
export default Header