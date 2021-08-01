import React from 'react';
import moment from 'moment';
import './slotGrid.style.scss';
import ImageCard from '../image_card/ImageCard';

//TODO - nasty hack to include images within frontend application. Real world application, images hosted server-side
const images = {
    one: require('../assets/images/one.jpg'),
    two: require('../assets/images/two.jpg'),
    three: require('../assets/images/three.jpg'),
    four: require('../assets/images/four.jpg'),
    five: require('../assets/images/five.jpg'),
    six: require('../assets/images/six.jpg'),
    seven: require('../assets/images/seven.jpg'),
    eight: require('../assets/images/eight.jpg'),
    nine: require('../assets/images/nine.jpg'),
    ten: require('../assets/images/ten.jpg'),
    eleven: require('../assets/images/eleven.jpg'),
    twelve: require('../assets/images/twelve.jpg'),
    thirteen: require('../assets/images/thirteen.jpg'),
    fourteen: require('../assets/images/fourteen.jpg'),
    fifteen: require('../assets/images/fifteen.jpg'),
    sixteen: require('../assets/images/sixteen.jpg'),
    seventeen: require('../assets/images/seventeen.jpg'),
    eighteen: require('../assets/images/eighteen.jpg'),
    nineteen: require('../assets/images/nineteen.jpg'),
    twenty: require('../assets/images/twenty.jpg')
};

interface images {
    object: string;
}

interface slotState {
    expSoon: boolean;
    valid: boolean;
    new: boolean;
}

interface Props {
    search: string;
    filter: string;
}

interface State {
    games: GameObject[];
    displayGames: GameObject[];
    filter: string;
}

interface GameObject {
    id: number;
    name: string;
    image: {
        name: string;
        type: string;
    },
    start: string;
    expires: string;
    newPeriod: number;
    flags: {
        top: boolean;
    }
}

class SlotGrid extends React.Component<Props, State> {
    displayGames: Array<GameObject> = [];
    constructor(props: Props) {
        super(props);
        this.state = {
            games: [],
            displayGames: [],
            filter: ''
        }
    }

    componentDidMount(): any {
        fetch('api/games').then(response => {
            return response.json();
        }).then(data => {
            this.setState({
                games: data,
                displayGames: data
            });
        });
    }

    componentDidUpdate(prevProps: { search: string; filter: string; }): void {
        let games = this.getGamesFromFilter();

        if (prevProps.filter !== this.props.filter) {
            this.setState({ displayGames: games });
        }

        if (prevProps.search !== this.props.search) {
            games = this.getGamesByNameFilter(games);
            this.setState({ displayGames: games });
        }
    }

    getGamesByNameFilter = (games: Array<GameObject>): Array<GameObject> => {
        const rtngames: Array<GameObject> = [];
            games.forEach(game => {
                const gameName = game.name.toLowerCase().replace(/[^a-zA-Z]/g, '');
                const searchValue = this.props.search.toLowerCase().replace(/[^a-zA-Z]/g, '');
                if (gameName.includes(searchValue)) {
                    rtngames.push(game);
                }
            });

            return rtngames;
    }

    getGamesFromFilter = (): Array<GameObject> => {
        switch (this.props.filter) {
            case 'new':
                return this.getNewGames();
                break;

            case 'top':
                return this.getTopGames();
                break;

            case 'all':
                return this.state.games;
                break;

                default:
                    return this.state.games;
                break;
        }
    }

    getTopGames = (): Array<GameObject> => {
        const games: Array<GameObject> = [];
        this.state.games.forEach(game => {
            if (game.flags.top === true) {
                games.push(game);
            }
        });
        return games;
    }

    getNewGames = (): Array<GameObject> => {
        const games: Array<GameObject> = [];
        this.state.games.forEach(game => {
            const now = moment().unix();
            if (moment(game.start, 'YYYY-MM-DDTHH:mm:ss').add(game.newPeriod, 'days').unix() > now) {
                games.push(game);
            }
        });
        return games;
    }

    renderGrid = (): any[] => {
        return this.state.displayGames.map((game: GameObject) => {
            const time = this.checkTimeValidity(game);
            if (!time.valid) {
                return;
            }
            return (
                <div key={game.id} className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-2 mb-1">
                    <ImageCard image={this.imageConverter(game)} />
                </div>
            )
        });
    }

    imageConverter = (game: GameObject): images => {
        // @ts-ignore
        const image: images = images[game.image.name];
        return image;
    }

    //TODO this check should be done server-side, sending only valid games to client. Done here since there is no server
    checkTimeValidity = (game: GameObject): slotState => {
        const start = moment(game.start, 'YYYY-MM-DDTHH:mm:ss').unix();
        const expires = moment(game.expires, 'YYYY-MM-DDTHH:mm:ss').unix();
        const now = moment().unix();
        const slotState: slotState = {
            expSoon: false,
            valid: false,
            new: false
        };

        // Game within start and expiry date
        if (start < now && expires > now) {
            slotState.valid = true;
            // Game due to expire within 7 days
            if ((now - expires) < 604800) {
                slotState.expSoon = true;
            }
            if (moment(game.start, 'YYYY-MM-DDTHH:mm:ss').add(game.newPeriod, 'days').unix() > now) {
                slotState.new = true;
            }
        }
        return slotState;
    }

    render(): JSX.Element {
        return (
            <div className='slotGrid row'>
                    {this.renderGrid()}
            </div>
        )
    }
}

export default SlotGrid;
