import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './TopNav.style.scss';

interface Props {
    onChange: any;
    applyFilter: any;
    search: string;
}

// @ts-ignore
class TopNav extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    handleChange = (event: { target: { value: any; }; }): void => {
        this.props.onChange(event.target.value);
    }

    applyFilter = (value: string): void => {
        this.props.applyFilter(value);
    }

    allButton = (): JSX.Element => {
        return (
            <div className='col-1 button' onClick={() => this.applyFilter('all')}>
                <FontAwesomeIcon icon="border-all" />
                <p>ALL</p>
            </div>
        );
    }

    newButton = (): JSX.Element => {
        return (
            <div className='col-1 button' onClick={() => this.applyFilter('new')}>
                <FontAwesomeIcon icon="plus" />
                <p>NEW</p>
            </div>
        );
    }

    topButton = (): JSX.Element => {
        return (
            <div className='col-1 button' onClick={() => this.applyFilter('top')}>
                <FontAwesomeIcon icon="star" />
                <p>TOP</p>
            </div>
        );
    }

    render(): JSX.Element {
        return (
            <div className="TopNav row ">
                <div className='desktop'>
                    <div className="col-12 d-flex flex-row-reverse">
                        <input className='form-field form-control'
                               placeholder='Search'
                               onChange={this.handleChange}
                               value={this.props.search}
                        />
                        <div className='buttons px-4'>
                            {this.allButton()}
                            {this.newButton()}
                            {this.topButton()}
                        </div>
                    </div>
                </div>

                <div className='mobile'>
                    <div className="col-12 d-flex flex-row-reverse mobile">
                        <input className='form-field form-control'
                               placeholder='Search'
                               onChange={this.handleChange}
                               value={this.props.search}
                        />
                    </div>

                    <div className='buttons col-12 d-flex'>
                        <div className='buttons px-4'>
                            {this.allButton()}
                            {this.newButton()}
                            {this.topButton()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TopNav;
