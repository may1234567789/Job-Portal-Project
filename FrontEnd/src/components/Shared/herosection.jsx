import React from 'react'
import './css/herosection.css'
import { Input } from '../ui/input'
import { Pointer, SearchIcon } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
    const [query, setQuery] = React.useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearch = () => {
        dispatch(setSearchQuery(query));
        navigate("/search");
    }
    return (
        <div>
            <div className="herosection">
                <div className="hero">
                    <div className="heroHeading"><h1>Find Your Dream <span className='text-blue-600'>Job </span>here</h1></div>
                    <p className='heroPara'>India's No. 1 Job Hunt Site</p>
                    <div className="searchWrapper">
                        <Input
                            type="text"
                            placeholder="Search your dream job"
                            className="input"
                            onChange={(e) => setQuery(e.target.value)}
                            onClick={handleSearch}
                        />
                        <button className="searchBtn" aria-label="Search">
                            <SearchIcon />
                        </button>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default HeroSection