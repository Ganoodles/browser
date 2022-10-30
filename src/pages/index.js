import Link from 'next/link'

function Home() {
    return (
        <div>
            <Link href='/files'>
                <p className="cursor-pointer">Go to Files</p>
            </Link>
        </div>

    )
}

export default Home
