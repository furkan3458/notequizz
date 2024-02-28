import { SyntheticEvent, useEffect, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
import { setVideoLoading } from '../states/actions/contentActions';
import { StateType } from '../states/reducers';

interface IBackground extends React.PropsWithChildren {
    setVideoLoading: Function;
}

const Background = ({ ...props }: IBackground) => {

    const videoRef = useRef<HTMLVideoElement>(null);
    const content = useSelector((state: StateType) => state.content);

    useEffect(() => {
    }, []);

    return (
        <div className='main-bg-video'>
            <video className='bg-video' ref={videoRef} src={content.backgroundVideo?.src} autoPlay muted loop/>
            {props.children}
        </div>
    );
}

const mapStateToProps = () => ({})
const mapDispatchToProps = { setVideoLoading };

export default connect(mapStateToProps, mapDispatchToProps)(Background);