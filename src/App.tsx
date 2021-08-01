import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faBorderAll, faStar, faPlus } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faBorderAll, faStar, faPlus)
import './App.style.scss';
import TopNav from './top_nav/TopNav';
import SlotGrid from './slot_grid/SlotGrid';

const App = (): JSX.Element => {
    const [search, setSearch]: [string, ((search: (((prevState: string) => string) | string)) => void)] = React.useState('');
    const [filter, setFilter]: [string, ((filter: (((prevState: string) => string) | string)) => void)] = React.useState('');

    function handleChange(value: any) {
        setSearch(value);
    }

    function applyFilter(value: string) {
        setFilter(value);
    }

    return (
        <div className='app'>
            <TopNav search={search}
                    onChange={handleChange}
                    applyFilter={applyFilter} />

            <SlotGrid search={search}
                      filter={filter} />
        </div>
    )
}

export default App;
