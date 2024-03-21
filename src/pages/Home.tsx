import { FC, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { connect, useSelector } from 'react-redux';
import Background from '../components/Background';
import { Button } from '@nextui-org/react';
import Box from '../components/Box';
import Const from '../utils/Const';
import { setGameStart } from '../states/actions/gameActions';
import { StateType } from '../states/reducers';

interface IHome {
    setGameStart: Function;
}

const Home: FC<IHome> = ({ ...props }: IHome): JSX.Element => {
    const [loaded, setLoaded] = useState(false);
    const game = useSelector((state: StateType) => state.game);

    useEffect(() => {
        if (!loaded)
            setLoaded(true);
    }, []);

    const startGame = () => {
        props.setGameStart(true);
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{Const.APP_NAME}</title>
            </Helmet>
            <>
                <Background>
                    {!game.isGameStart ? 
                    <Box size={'sm'} mxAuto={true}>
                        <Button color='secondary' onClick={() => startGame()}>{Const.START_BUTTON}</Button>
                    </Box>
                    :
                        <div>
                            Start
                        </div>
                    }
                    
                </Background>
                
            </>

        </>
    );
}
const mapDispatchToProps = {
    setGameStart,
}
export default connect(null, mapDispatchToProps)(Home);