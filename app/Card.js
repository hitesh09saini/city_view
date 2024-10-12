import React from 'react'
import url from './contextapi/url';
import { like_post, share_post } from './contextapi/api'

const Card = ({ item }) => {
    const [liked, setLiked] = React.useState(false);
    const [count, setCount] = React.useState(item?.likes);

    const handleLike = async (post_id) => {

        try {
            var device_id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            if (localStorage.getItem('device_id')) {
                var device_id = localStorage.getItem('device_id');
            } else {
                localStorage.setItem('device_id', device_id);
            }

            const res = await like_post({ post_id, device_id });

            if (res?.success) {
                setCount(count + 1);
                setLiked(true);
            }
        } catch (error) {
            console.log(error);

        }

    }




    return (
        <div className="gallery-item">
            <img loading='lazy' src={item?.post} alt={item?.title} />
            <div className='title'>
                {item?.title}
            </div>

            <button className='text-3xl bg-white absolute top-[10px] p-1 right-[5px] flex items-center gap-1' >

                <div className='text-sm '>
                    {count > 999 ? (count / 1000).toFixed(1) + 'k' : count}
                </div>


                {
                    item?.userLike || liked ? <div className='text-xl'>❤️</div> : <div onClick={() => handleLike(item?._id)}>&#9825;</div>

                }
            </button>


        </div>
    )
}

export default Card