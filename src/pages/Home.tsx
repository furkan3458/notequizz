import { useState,useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
const Home = ({...props}: any) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>NoteQuizz - Home</title>
            </Helmet>
        </>
    );
}

export default Home;