"use client";
import { useState, useContext, useEffect, createContext, useRef } from "react";
import { get_posts } from './api';

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const existingPosts = useRef({});
    const handleSetPosts = (newPosts) => {
        const newPostsWithoutDuplicates = newPosts.filter((post) => {
            const postString = JSON.stringify(post);
            if (existingPosts.current[postString]) {
                return false;
            }
            existingPosts.current[postString] = true;
            return true;
        });
        setPosts((prevPosts) => [...prevPosts, ...newPostsWithoutDuplicates]);
    };

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const isInitialRender = useRef(true);

    const handleGetPosts = async () => {
        setLoading(true);
        try {
            var device_id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            if (localStorage.getItem('device_id')) {
                var device_id = localStorage.getItem('device_id');
            } else {
                localStorage.setItem('device_id', device_id);
            }

            const data = await get_posts({page, device_id});
            if (data && hasMore) {
                setHasMore(data?.hash_more);
                handleSetPosts(data?.posts);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGetPosts();
    }, [page]);




    const value = {
        posts, setPosts,
        page, setPage,
        loading, setLoading,
        hasMore, setHasMore,
    };

    return (
        <StateContext.Provider value={value}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error(
            'useStateContext must be used within a StateProvider'
        );
    }
    return context;
};
