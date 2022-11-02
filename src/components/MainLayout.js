import Link from 'next/link'
import styles from '../../styles/MainLayout.module.css'

import FileList from './FileList'
import FileGallery from './FileGallery'

import { useEffect, useState } from 'react'

const MainLayout = (props)  => {
    const downloadIcon = '/svgs/download.svg'

    const data = props.data
    var pathArr = props.pathRoute.substring(1).split('/')
    console.log(pathArr)

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const [viewList, setViewList] = useState(true)

    useEffect(() => {
        const localViewState = (localStorage.getItem('viewList') == 'true' ? false : true)
        setViewList(localViewState)
    }, [])


    const handleClick = () => {
        localStorage.setItem('viewList', viewList)
        setViewList(!viewList)
    };


    return (
        <div className='m-0'>
            <div className={`${styles.gridCon}`}>
                <nav className={`${styles.navbar} border-b border-bColor-soft`}></nav>
                <div className={`${styles.treeLabel} border-r border-b border-l border-bColor-soft bg-bgColor-soft text-center`}>
                    <p className='p-[7px] text-almostWhite'>{pathArr[pathArr.length - 1]}</p>
                </div>
                <div className={`${styles.tabBar}`}>
                    <div onClick={handleClick} className='inline-block pl-4 pt-2 border-r border-bColor-softer h-10 w-14 transition-all duration-200
                        hover:cursor-pointer hover:bg-bgColor-basicallyBlack active:bg-bgColor-bluishGrey'>
                        <img className={`${styles.navIcon} w-6 transition-all duration-200`} src="/svgs/ui/camera.svg"/>
                    </div>
                    <div className='inline-block pl-4 pt-2 border-r border-bColor-soft h-10 w-14 transition-all duration-200
                        hover:cursor-pointer hover:bg-bgColor-basicallyBlack active:bg-bgColor-bluishGrey'>
                        <img className={`${styles.navIcon} w-6 transition-all duration-200`} src="/svgs/ui/filter.svg"/>
                    </div>
                </div>
                <main className={`${styles.mainArea} overflow-auto border-l border-bColor-soft bg-bgColor-soft`}>
                    <div className={`${styles.fileNav} absolute w-auto left-[30rem] z-10 right-0 h-12 bg-bgColor-bluishGrey border border-bColor-hard-blue`}>
                        <p className='leading-7'>
                            {pathArr.map((value) => {
                                return <Link href="" className='hover:bg-themeColor-600'>
                                        <div className='transition-all duration-200 inline-block cursor-pointer hover:bg-bgColor-lighterBluishGrey active:bg-bgColor-bluishGrey pr-3.5 p-[9px]'>{"\u00A0>\u00A0"}{value}</div>
                                    </Link>
                            })} {/* TODO: Make directories selectable and fix scaling/wrapping, also make this dedicated component */}
                        </p>
                    </div>
                    <div className={`${styles.fileArea}`}>
                        <div className={`${styles.fileLabels}`}></div>
                    </div>
                    <div className={`${styles.fileContent} mt-12`}>
                        {viewList === true && (<FileList data={props.data} pathRoute={props.pathRoute} />)}
                        {viewList === false && (<FileGallery data={props.data} pathRoute={props.pathRoute} />)}
                    </div>
                </main>
                <div className={`${styles.sidebar}`}></div>
            </div>
        </div>
    )
}

export default MainLayout


