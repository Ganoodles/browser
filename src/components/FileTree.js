import Link from 'next/link'
import { useState } from 'react';
import Image from 'next/image';

const FileTree = (props)  => {
    const downloadIcon = '/svgs/download.svg'

    const data = props.data
    var pathArr = props.pathRoute.substring(1).split('/')

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);

    }
    return ( // TODO: Implement custom scrollbar and dont resize div
        <div className='rounded-lg page'>
            <div className='interactive-buttons'>
                <div onClick={props.handleClick} className='transition-all duration-75 selection:bg-none active:border-button-500 cursor-pointer inline-block h-12 border pt-2 mb-4 border-themeColor-300
                            bg-themeColor-800 rounded-lg w-48 hover:border-themeColor-400'>
                    <img src="/svgs/columns-horizontal.svg" className="pl-3 invert h-7 inline-block"/>
                    <p className='pl-1 translate-y-[1px] inline-block '>Gallery View</p>
                </div>
                <div className='transition-all active:border-button-500 duration-75 selection:bg-none cursor-pointer inline-block ml-4 h-12 border pt-2 mb-4 border-themeColor-300 
                            bg-themeColor-800 rounded-lg w-48 hover:border-themeColor-400'>
                    <img src="/svgs/plus.svg" className="pl-3 invert h-7 inline-block"/>
                    <p className='pl-1 translate-y-[1px] inline-block '>Apply Filter</p>
                </div>
            </div>
            <table className='w-full shadow-lg shadow-themeColor-900'>
                <thead className='w-full p-3'>
                    <div className='m-[1px] rounded-t-lg bg-themeColor-800 p-2 border border-themeColor-500'>
                        <div className='p-1 text-textColor-500 bg-themeColor-500 pl-1 rounded-md border border-themeColor-300'>
                            {pathArr.map((value) => {
                                return <Link href="" className='hover:bg-themeColor-600'><div className='transition-all duration-75 inline-block cursor-pointer hover:bg-themeColor-800 p-1 rounded-md'>{"\u00A0>\u00A0"}{value}</div></Link>
                            })} {/* TODO: Make directories selectable and fix scaling/wrapping, also make this dedicated component */}
                        </div> 
                        <div className='flex justify-between flex-row pt-3'>
                            <th className='font-normal basis-full text-left pl-12'>Name</th>
                            <th className='font-normal basis-full text-right pr-4'>Modified</th>
                            <th className='font-normal basis-full text-left pl-4'>Type</th>
                            <th className='font-normal basis-full text-right pr-11'>Size</th>
                        </div>
                    </div>
                </thead> 
                <tbody className='tbodySelector'>
                    {/* TODO: Find a way to not repeat the same function maybe? If possible, maybe make own component  */}
                    {data.response.map(function(value) { return (
                        <tr>
                            <a href={"/" + value.relativePath}  passHref={true}>
                                <span className=' active:bg-themeColor-450 border-l border-r border-themeColor-1000 w-full p-3 cursor-pointer flex flex-row justify-between border-solid bg-themeColor-700 hover:bg-themeColor-800 '>
                                    <img src={value.simpleIcon} className="h-7 mr-4 flex-shrink pointer-events-none invert inline-block"></img>
                                    <td className='overflow-hidden text-textColor-500 whitespace-nowrap text-ellipsis basis-full text-left'>{value.name}</td>
                                    <td className='overflow-hidden text-textColor-500 whitespace-nowrap text-ellipsis basis-full text-right pr-4'>{value.dateModified}</td>
                                    <td className='overflow-hidden whitespace-nowrap text-ellipsis basis-full text-left pl-4'>
                                        <div className=' bg-itemIdentifier-image h-7 rounded-full inline-block'><p className='pl-4 pt-[1px] pr-4'>{capitalizeFirstLetter(value.type)}</p></div>
                                    </td>
                                    <td className='overflow-hidden whitespace-nowrap text-ellipsis basis-full text-right'>{value.size}</td>
                                    <a href={value.relativePath} className='inline-block float-right flex-shrink-0 pr-0 pl-4' download>
                                        <img src={downloadIcon} className="invert cursor-pointer h-7"></img>
                                    </a>    
                                </span>
                            </a>
                        </tr>
                    )})}
                    {!data.response[0] && !data.response[0] ? <div className='bg-themeColor-700 p-4'>No files found.</div> : null}
                </tbody>
                <p className=' pt-2 text-center text-themeColor-400 mt-2 mb-5'>Placeholder App Name</p>
            </table>
        </div>
    )
}

export default FileTree


