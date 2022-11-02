import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr/immutable'; 

import MainLayout from '../../components/MainLayout';
import FileTree from '../../components/FileList';
import FileGallery from '../../components/FileGallery';

export default function HomeDirList() {
    const { asPath, pathname } = useRouter();
    const pathRoute = asPath

    const fetcher = (url) => fetch(url).then((res) => res.json());

    const { data, error } = useSWR("http://127.0.0.1:8000/api", fetcher);
    
    if (error) return "An error has occurred. Most likely has something to do with backend not running.";
    if (!data) return "";

    return (
        <html>
            <MainLayout data={data} pathRoute={pathRoute} />
        </html>
    )
}
