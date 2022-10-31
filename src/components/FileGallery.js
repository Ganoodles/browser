import Link from 'next/link'
import Image from 'next/image';

const FileTree = (props)  => {

    const data = props.data
    const thumbnailQuality = "40"
    var pathArr = props.pathRoute.substring(1).split('/')

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    return (
        <div className='rounded-lg page'>
            <div className='interactive-buttons'>
                <div onClick={props.handleClick} className='transition-all duration-75 selection:bg-none active:border-button-500 cursor-pointer inline-block h-12 border pt-2 mb-4 border-themeColor-300
                            bg-themeColor-800 rounded-lg w-48 hover:border-themeColor-400'>
                    <img src="/svgs/columns-horizontal.svg" className="pl-3 invert h-7 inline-block"/>
                    <p className='pl-1 translate-y-[1px] inline-block '>List View</p>
                </div>
                <div className='transition-all duration-75 active:border-button-500 selection:bg-none cursor-pointer inline-block ml-4 h-12 border pt-2 mb-4 border-themeColor-300 
                            bg-themeColor-800 rounded-lg w-48 hover:border-themeColor-400'>
                    <img src="/svgs/plus.svg" className="pl-3 invert h-7 inline-block"/>
                    <p className='pl-1 translate-y-[1px] inline-block '>Apply Filter</p>
                </div>
            </div>

            <div className='w-full min-h-[55px] rounded-lg'>
                
                <div className='m-[1px] rounded-t-lg bg-themeColor-800 p-2 border border-themeColor-500'>
                    <div className='ellipsis reverse-ellipsis p-1 text-textColor-500 pl-1 bg-themeColor-500 rounded-md border overflow-hidden whitespace-nowrap overflow-ellipsis border-themeColor-300 mb-1'>
                        {pathArr.map((value) => {
                            return <Link href="" className='hover:bg-themeColor-600'><div className='transition-all duration-75 inline-block cursor-pointer hover:bg-themeColor-800 p-1 rounded-md'>{"\u00A0>\u00A0"}{value}</div></Link>
                        })} {/* TODO: Make directories selectable and fix scaling/wrapping, also make this dedicated component */}
                    </div> 
                </div>
                <div className='bg-themeColor-700 border-themeColor-1000 border-l border-r border-b rounded-b-2xl'>
                <div className=' pl-4 pr-4 pb-4 pt-2 min-h-[55px] grid-alignment'>
                {/* TODO: Find a way to not repeat the same function maybe? If possible, maybe make own component  */}
                {data.response.map(function(value) { return (
                    <a href={"/" + value.relativePath} className=" hover:bg-themeColor-900 p-2 max-h-[250px] overflow-hidden rounded-md active:bg-themeColor-400">
                        <div className='max-w-[140px] m-auto'>
                            {(() => {
                                if (value.type === "image") {
                                    return (
                                    <div className='pl-1 pr-1 pt-2'>
                                        <Image src={"/" + value.displayPath} className='object-cover rounded-md' width="100%" height="115px" layout="responsive" quality={thumbnailQuality} />
                                    </div>
                                    )
                                } else if (value.type === "video" && value.thumbnail || value.type === "audio" && value.thumbnail) {
                                    return (
                                        <div className='pl-1 pr-1 pt-2'>
                                            <Image src={"/" + value.thumbnail} className='object-cover rounded-md' width="100%" height="110px" layout="responsive" quality={thumbnailQuality} />
                                        </div>
                                    )
                                } else {
                                    return (<div className='rounded-md'><Image src={value.galleryIcon} className='object-cover rounded-md' width="100%" height="100px" layout="responsive" quality={thumbnailQuality} /></div>)
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
                <p className=' pt-2 text-center text-themeColor-400 mt-2'>Placeholder App Name</p>
        </div>
    )
}

export default FileTree


