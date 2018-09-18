import * as React from "react";
import { observer } from "mobx-react";

export interface IconBackProps {
    className: string | undefined; // remember to put a color to fill inside the style
    clickHandler?: () => void | null;
}

@observer
export class IconBack extends React.Component<IconBackProps> {
    handleClick = () => {
        if(this.props.clickHandler)
        {
            this.props.clickHandler();
        }
    }

    render() {
        return <svg onClick={this.handleClick} className={this.props.className} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" aria-labelledby="title" color="#cacaca">
            <title id="title">Umbrella Icon</title>
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
    }
}