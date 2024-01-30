import videoBg from '../assets/note_background.mp4';

const Background = ({ children }: any) => {
    return (
        <div className='main-bg-video'>
            <video className='bg-video' src={videoBg} autoPlay muted loop />
            {children}
        </div>
    );
}

export default Background;