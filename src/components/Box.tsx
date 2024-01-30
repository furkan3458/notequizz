import { FC, ReactElement } from "react";

interface IBoxInterface extends React.PropsWithChildren {
    children: any;
    size: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    mxAuto: boolean;
}

const Box: FC<IBoxInterface> = (props: IBoxInterface) => {
    return (
        <div className={(props.size === undefined ? '' : (props.size + ':')) + 'container' + (props.mxAuto ? ' mx-auto' : '')}>
            {props.children}
        </div>
    );
};

export default Box;