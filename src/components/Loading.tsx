import { FC, useEffect, useState } from "react";
import Box from "./Box";
import Flex, { FlexType } from "./Flex";
import { Progress } from "@nextui-org/react";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { StateType } from "../states/reducers";
import { setLoadingBar, setLoading } from "../states/actions/contentActions";

interface ILoading {
    initDegree: number
    setLoadingBar: Function
    setLoading: Function
}

const Loading: FC<ILoading> = ({ ...props }: ILoading) => {
    const [degree, setDegree] = useState<number>(props.initDegree);
    const content = useSelector((state: StateType) => state.content);

    useEffect(() => {
        calculate();
    }, [content.isFontLoaded, content.isFingerPrintInited, content.isVideoLoaded]);

    useEffect(() => {
        setDegree(content.loadingBar);
    }, [content.loadingBar])
    

    const calculate = () => {
        const contentList: string[] = [
            'isFontLoaded',
            'isFingerPrintInited',
            'isVideoLoaded',
        ]
        const progressVal = 100 / contentList.length;
        const contentEntries = Object.entries(content);
        let newProgressVal: number = 0;
        for (let cont of contentList) {
            const isLoad = contentEntries.find((v) => { return v.find((v1) => { return cont === v1 }); });
            newProgressVal += isLoad![1] === true ? progressVal : 0;
        }

        props.setLoadingBar(newProgressVal < 100 ? newProgressVal : 100);
    }

    const onAnimEnd = () => {
        if(degree >= 100) props.setLoading(false);
    }

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
                        <Progress value={degree} onTransitionEnd={() => onAnimEnd()} />
                    </Box>
                </FlexType>
            </Flex>
        </Box>
    </>
);
}

const mapStateToProps = () => ({})
const mapDispatchToProps = { setLoadingBar, setLoading };

export default connect(mapStateToProps, mapDispatchToProps)(Loading);