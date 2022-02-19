import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { animeListAll } from "../../store/animeList/actions";
import { selectAnimeList, selectError, selectLoading } from "../../store/animeList/selectors";
import Button from '@mui/material/Button';
import { CircularProgress } from "@mui/material";
import './AnimeList.sass'

export const AnimeList = () => {

    const dispatch = useDispatch();
    const animeList = useSelector(selectAnimeList, shallowEqual);
    const error = useSelector(selectError, shallowEqual);
    const loading = useSelector(selectLoading, shallowEqual);
    
    const fetchAnimeList = () => {
        dispatch(animeListAll())
    }

    useEffect(() => {
        fetchAnimeList();
    }, []);

    if(error) {
        return (
            <>
                <Button onClick={fetchAnimeList} color="error" size="large" variant="contained">Refresh</Button>
                <h1 className="error">{error.message}</h1>
            </>
        )
    }

    return (
        <>  
            {loading && <CircularProgress />
}
            <h1>AnimeList</h1>
            <div className="anime-list">
                {animeList.map((anime) => (
                    <div className="anime-card" key={anime.anime_id}>
                        <img className="anime-card-img" src={anime.anime_img} alt={anime.anime_name} />
                        <p>{anime.anime_name}</p>
                    </div>
                ))}
            </div>
        </>
    );
}