import React from 'react';
import './ImageCard.style.scss';

interface Props {
    image: any;
}

class ImageCard extends React.Component<Props, any> {

    constructor(props: Props) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <img src={this.props.image} />
        )
    }
}

export default ImageCard;
