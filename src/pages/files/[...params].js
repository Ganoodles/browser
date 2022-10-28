import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr/immutable'; 

import FileTree from '../../components/FileTree';
import FileGallery from '../../components/FileGallery';

export default function HomeDirList() {
    const { asPath, pathname } = useRouter();
    const pathRoute = asPath

    const [viewList, setViewList] = useState(true)

    useEffect(() => {
        const localViewState = (localStorage.getItem('viewList') == 'true' ? false : true)
        setViewList(localViewState)
    }, [])


    const handleClick = () => {
        localStorage.setItem('viewList', viewList)
        setViewList(!viewList)
    };

    const fetcher = (url) => fetch(url).then((res) => res.json());

    const { data, error } = useSWR("http://127.0.0.1:8000/api", fetcher);
    
    if (error) return "An error has occurred. Most likely has something to do with backend not running.";
    if (!data) return "";

    return (
        <body className='flex justify-center'>
            <div className='mt-8 absolute w-3/4 max-w-[1800px] min-w-[650px]'>
                {viewList === true && (<FileTree data={data} handleClick={handleClick} pathRoute={pathRoute} />)}
                {viewList === false && (<FileGallery data={data} handleClick={handleClick} pathRoute={pathRoute} />)}
            </div>
        </body>
    )
}
