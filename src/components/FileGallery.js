import Link from 'next/link'
import Image from 'next/image';
import { useState } from 'react';

import FileContextMenu from './FileContextMenu'

const initialContextMenu = {
    show: false,
    locHref: false,
    x: 0,
    y: 0,
}

const FileTree = (props)  => {

    const data = props.data
    const thumbnailQuality = "40"
    var pathArr = props.pathRoute.substring(1).split('/')

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const [contextMenu, setContextMenu] = useState(initialContextMenu)

    const handleContextMenu = (href, e) => {
        e.preventDefault()

        const { pageX, pageY } = e
        setContextMenu({ show: true, locHref: href, x: pageX, y: pageY })
    }

    const contextMenuClose = () => setContextMenu(initialContextMenu)
    
    return (
        <div>
            {contextMenu.show && <FileContextMenu x={contextMenu.x} y={contextMenu.y} locHref={contextMenu.locHref} closeContextMenu={contextMenuClose}/>}
            <div className='w-full'>
                <div className='bg-themeColor-700'>
                <div className=' pl-4 pr-4 pb-4 pt-2 min-h-[55px] grid-alignment'>
                {/* TODO: Find a way to not repeat the same function maybe? If possible, maybe make own component  */}
                {data.response.map(function(value) { return (
                    <a href={"/" + value.relativePath} className=" hover:bg-bColor-softer hover:outline outline-bColor-soft outline-1 p-2 max-h-[250px] overflow-hidden rounded-md active:bg-themeColor-400" onContextMenu={(e) => handleContextMenu("/" + value.relativePath, e)}>
                        <div className='max-w-[140px] m-auto'>
                            {(() => {
                                if (value.type === "image") {
                                    return (
                                    <div className='pl-1 pr-1 pt-2'>
                                        <Image src={"/" + value.displayPath} className='object-cover rounded-md' width="100%" height="110px" layout="responsive" quality={thumbnailQuality} />
                                    </div>
                                    )
                                } else if (value.type === "video" && value.thumbnail || value.type === "audio" && value.thumbnail) {
                                    return (
                                        <div className='pl-1 pr-1 pt-2'>
                                            <Image src={"/" + value.thumbnail} className='object-cover rounded-md' width="100%" height="110px" layout="responsive" quality={thumbnailQuality} />
                                        </div>
                                    )
                                } else {
                                    return (<div className='rounded-md'><Image src={value.galleryIcon} className='object-cover rounded-md' width="100%" height="110px" layout="responsive" quality={thumbnailQuality} /></div>)
                                }
                            })()}
                            <div className='text-center w-full p-1 text-sm break-words'>{value.name}</div>
                        </div>
                    </a>
                )})}
                {!data.response[0] && !data.response[0] ? <div className='p-2'>No files found.</div> : null}
                </div>
                </div>
            </div>
        </div>
    )
}

export default FileTree


