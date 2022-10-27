import Link from 'next/link'
import { useRouter } from 'next/router';
import FileTree from '../../components/FileTree';
import FileGallery from '../../components/FileGallery';
import useSWR from 'swr/immutable'; 
import axios from 'axios'
import { useState } from 'react';
import { useEffect } from "react";

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

    const { data, error } = useSWR("http://127.0.0.1:8000", fetcher);
    
    if (error) return "An error has occurred.";
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
