import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Background from '../components/Background';
import { Button } from '@nextui-org/react';
import Box from '../components/Box';
import Const from '../utils/Const';
const Home = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if(!loaded)
            setLoaded(true);
    }, []);

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{Const.APP_NAME}</title>
            </Helmet>
            <Background>
                <Box size={'sm'} mxAuto={true}>
                    <Button color='secondary'>{Const.START_BUTTON}</Button>
                </Box>
            </Background>
        </>
    );
}

export default Home;