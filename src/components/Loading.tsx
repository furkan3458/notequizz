import { FC, useEffect, useState } from "react";
import Box from "./Box";
import Flex, { FlexType } from "./Flex";
import { Button, Progress } from "@nextui-org/react";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { StateType } from "../states/reducers";
import { setLoadingBar, setLoading } from "../states/actions/contentActions";
import Const from "../utils/Const";

interface ILoading {
    initDegree: number
    setLoadingBar: Function
    setLoading: Function
}

const Loading: FC<ILoading> = ({ ...props }: ILoading) => {
    const [degree, setDegree] = useState<number>(props.initDegree);
    const [loadingBarCompleted, setloadingBarCompleted] = useState<boolean>(false);
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

    const onLoadingAnimEnd = () => {
        const inter = setInterval(() => {
            if(degree >= 100) setloadingBarCompleted(true);
            clearInterval(inter);
        }, 250);
    }

    const onAnimEnd = () => {
        const inter = setInterval(() => {
            if(loadingBarCompleted) props.setLoading(false);
            clearInterval(inter);
        }, 250);
    }

return (
    <>
        <Box className={"transition fade-in-out delay-150 duration-300 " + (!loadingBarCompleted ? "opacity-100" : "opacity-0")} size={'sm'} mxAuto={true} onTransitionEnd={() => onAnimEnd()}>
            <Flex align={'center'} justify={'center'} className={'h-screen'}>
                <FlexType flexType='flex-initial'>
                    <Box className={'pulse-anim-cont'}>
                        <div className='pulse-anim loading-background'/>
                        <div className='pulse-anim loading-text'>{Const.APP_NAME}</div>
                    </Box>
                    <Box>
                        <Progress value={degree} onTransitionEnd={() => onLoadingAnimEnd()} />
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