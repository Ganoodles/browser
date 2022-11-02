import Link from 'next/link'
import { useState } from 'react'

import FileContextMenu from './FileContextMenu'

const initialContextMenu = {
    show: false,
    locHref: false,
    x: 0,
    y: 0,
}

const FileList = (props)  => {
    const downloadIcon = '/svgs/download.svg'

    const data = props.data
    var pathArr = props.pathRoute.substring(1).split('/')
    console.log(pathArr)
    
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


    return ( // TODO: Implement custom scrollbar and dont resize div
        <div>
            {contextMenu.show && <FileContextMenu x={contextMenu.x} y={contextMenu.y} locHref={contextMenu.locHref} closeContextMenu={contextMenuClose}/>}

            <table className='w-full'>
                <thead className='w-full p-3'>
                    <div className='flex justify-between flex-row pt-3 pb-2 text-almostWhite'>
                        <th className='font-normal basis-full text-left pl-14'>Name</th>
                        <th className='font-normal basis-full text-right pr-6'>Modified</th>
                        <th className='font-normal basis-full text-left pl-4'>Type</th>
                        <th className='font-normal basis-full text-right pr-14'>Size</th>
                    </div>
                </thead> 
                <tbody className='tbodySelector'>
                    {/* TODO: Find a way to not repeat the same function maybe? If possible, maybe make own component  */}
                    {data.response.map(function(value) { return (
                        <tr>
                            <a href={"/" + value.relativePath} onContextMenu={(e) => handleContextMenu("/" + value.relativePath, e)}>
                                <span 
                                    className='active:bg-themeColor-450 w-full p-3 cursor-pointer flex flex-row justify-between bg-themeColor-700 hover:bg-bColor-softer hover:outline outline-1 outline-bColor-soft'>
                                    <img src={value.simpleIcon} className="h-7 mr-4 flex-shrink pointer-events-none invert-[70%] inline-block"></img>
                                    <td className='overflow-hidden text-textColor-500 whitespace-nowrap text-ellipsis basis-full text-left'>{value.name}</td>
                                    <td className='overflow-hidden text-textColor-500 whitespace-nowrap text-ellipsis basis-full text-right pr-4'>{value.dateModified}</td>
                                    <td className='overflow-hidden whitespace-nowrap text-ellipsis basis-full text-left pl-4'>
                                        <div className=' bg-itemIdentifier-image h-7 rounded-full inline-block'>
                                            <p className='text-almostWhite pl-4 pt-[1px] pr-4'>{capitalizeFirstLetter(value.type)}</p>
                                        </div>
                                    </td>
                                    <td className='overflow-hidden whitespace-nowrap text-ellipsis basis-full text-right'>{value.size}</td>
                                    <a href={value.relativePath} className='inline-block float-right flex-shrink-0 ml-4' download>
                                        <img src={downloadIcon} className="invert-[70%] hover:invert transition-all duration-75 cursor-pointer h-7"></img>
                                    </a>    
                                </span>
                            </a>
                        </tr>
                    )})}
                    {!data.response[0] && !data.response[0] ? <div className='bg-themeColor-700 p-4'>No files found.</div> : null}
                </tbody>
            </table>
        </div>
    )
}

export default FileList


