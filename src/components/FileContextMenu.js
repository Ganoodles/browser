import { useRef } from 'react'
import { useOnClickOutside } from '../hooks/useOnClickOutside'

const FileContextMenu = ({ x, y, locHref, closeContextMenu })  => {
    
    const contextMenuRef = useRef(null)
    useOnClickOutside(contextMenuRef, closeContextMenu)

    const ignoreContext = (e) => {
        e.preventDefault()
    }

    return (
        <div 
            ref={contextMenuRef}
            onClick={() => closeContextMenu()} 
            className='absolute z-20 bg-bgColor-hard rounded-md border min-w-[11rem] max-w-[30rem] border-bColor-soft' 
            style={{ top: `${y}px`, left: `${x}px` }}>
                <a onContextMenu={ignoreContext} 
                    className='text-almostWhite hover:bg-bColor-softer hover:outline outline-1 outline-bColor-soft cursor-pointer p-4 w-full rounded-sm block overflow-hidden overflow-ellipsis' 
                    href={locHref}>
                        Open Preview
                        <img src="/svgs/image.svg" className='invert inline pl-8 float-right'></img>
                </a>
                
                <a onContextMenu={ignoreContext} 
                    className='text-almostWhite hover:bg-bColor-softer hover:outline outline-1 outline-bColor-soft cursor-pointer p-4 w-full rounded-sm block overflow-hidden overflow-ellipsis' 
                    href={locHref} 
                    target="_blank">
                        Open in New Tab
                        <img src="/svgs/plus.svg" className='invert inline pl-8 float-right'></img>
                </a>
                
                <a onContextMenu={ignoreContext} 
                    className='text-almostWhite hover:bg-bColor-softer hover:outline outline-1 outline-bColor-soft cursor-pointer p-4 w-full rounded-sm block overflow-hidden overflow-ellipsis' 
                    href={locHref} 
                    download>
                        Download
                        <img src="/svgs/download.svg" className='invert inline pl-8 float-right'></img>
                </a>
                
                <a 
                    onContextMenu={ignoreContext} 
                    className='text-almostWhite hover:bg-bColor-softer hover:outline outline-1 outline-bColor-soft cursor-pointer p-4 w-full rounded-sm block overflow-hidden overflow-ellipsis'
                    onClick={() => {navigator.clipboard.writeText(window.location.host + locHref)}}>
                        Copy Link
                        <img src="/svgs/copy.svg" className='invert inline pl-8 float-right'></img>
                </a>
        </div>
    )
}

export default FileContextMenu


