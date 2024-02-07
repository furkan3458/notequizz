import { FC, useState } from "react";
import Box from "./Box";
import Flex, { FlexType } from "./Flex";
import { Progress } from "@nextui-org/react";

interface ILoading {
    initDegree: number
}

const Loading:FC<ILoading> = (props:ILoading) => {
    const [degree] = useState<number>(props.initDegree);

    return (
        <>
            <Box size={'sm'} mxAuto={true}>
                <Flex align={'center'} justify={'center'} className={'h-screen'}>
                    <FlexType flexType='flex-initial'>
                        <Box className={'pulse-anim-cont'}>
                            <div className='pulse-anim loading-background'/>
                            <div className='pulse-anim loading-text'>NoteQuizz</div>
                        </Box>
                        <Box>
                            <Progress value={degree}/>
                        </Box>
                    </FlexType>
                </Flex>
            </Box>
        </>
    );
}

export default Loading;