import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';
import axios from 'axios';
import React, { useCallback, useMemo } from 'react';
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';

interface FavoriteButtonProps {
    movieId: string;
}
const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
    const { mutate: mutateFavorite } = useFavorites();
    const { data: currentUser, mutate } = useCurrentUser();

    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(movieId);
    }, [currentUser, movieId]);

    const toggleFavorite = useCallback(async () => {
        let response;
        if (isFavorite) {
            console.log(isFavorite);
            response = await axios.delete("/api/favorite", { data: { movieId } });
        } else {
            console.log(isFavorite);
            response = await axios.post("/api/favorite", { movieId });
        }

        const updatedFavoriteIds = response?.data?.favoriteIds;

        mutate({
            ...currentUser,
            favoriteIds: updatedFavoriteIds,
        });

        mutateFavorite();
    }, [movieId, isFavorite, currentUser, mutate, mutateFavorite]);

    const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

    return (
        <div onClick={toggleFavorite} className='cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300'>
            <Icon className="text-white" />
        </div>
    );
}

export default FavoriteButton;