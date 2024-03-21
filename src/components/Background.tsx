import { useEffect, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
import { setVideoLoading } from '../states/actions/contentActions';
import { StateType } from '../states/reducers';
import Const from '../utils/Const';
import Flex, { FlexType } from './Flex';

interface IBackground extends React.PropsWithChildren {
    setVideoLoading: Function;
}

const Background = ({ ...props }: IBackground) => {

    const content = useSelector((state: StateType) => state.content);
    const game = useSelector((state: StateType) => state.game);
    const mainVideoRef = useRef<HTMLDivElement>(null);
    const mainThemeSoundRef = useRef<HTMLDivElement>(null);
    let init = false;

    useEffect(() => {
        if (!init) {
            initialize();
        }
    }, []);

    const initialize = () => {
        content.backgroundVideo!.className = 'bg-video';
        content.backgroundVideo!.autoplay = true;
        content.backgroundVideo!.muted = true;
        content.backgroundVideo!.loop = true;
        content.backgroundVideo!.play();
        mainVideoRef.current!.append(content.backgroundVideo!);


        content.backgroundMusic!.autoplay = true;
        content.backgroundMusic!.muted = false;
        content.backgroundMusic!.loop = true;
        content.backgroundMusic!.controls = false;
        content.backgroundMusic!.volume = 0.5;
        content.backgroundMusic!.play();
        mainThemeSoundRef.current!.append(content.backgroundMusic!);
        document.body.addEventListener("mousemove", function () {
            //
            content.backgroundMusic!.play();
        })
        init = true;
    }

    return (
        <>
            <div className='main-bg-video main-bg-opacity opacity-anim select-none' ref={mainVideoRef}>
                <Flex direction='col' mxAuto={true} align='center' justify='center' className='h-screen'>
                    {!game.isGameStart ?
                        <Flex mxAuto={true} align='center' justify='center' className='p-3'>
                            <FlexType flexType='flex-auto' mxAuto={true} className='text-6xl text-white drop-shadow-md antialiased opacity-anim'>{Const.APP_NAME}</FlexType>
                        </Flex> : <></>
                    }
                    <Flex>{props.children}</Flex>
                </Flex>
            </div>
            <div ref={mainThemeSoundRef}>
            </div>
        </>
    );
}

const mapStateToProps = () => ({})
const mapDispatchToProps = { setVideoLoading };

export default connect(mapStateToProps, mapDispatchToProps)(Background);