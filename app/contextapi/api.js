import axios from 'axios';
import Url from './url';


const api = axios.create({
    baseURL: Url.base_url

});


const get_posts = async ({ page, device_id }) => {
    try {
        const response = await api.get(Url.get_posts + `?page=${page}&device_id=${device_id}`);

        return response.data.data;
    } catch (error) {
        console.log(error)
    }
}

const create_post = async (data) => {
    try {
        const response = await api.post(Url.create_post, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating post:', error.response?.data || error.message);
        return { success: false, message: error.response?.data?.message || 'Something went wrong' };
    }
};

const like_post = async (data) => {
    try {
        const response = await api.post(Url.like_post, data);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

const share_post = async (data) => {
    try {
        const response = await api.post(Url.share_post, data);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export {
    get_posts,
    create_post,
    like_post,
    share_post
}
