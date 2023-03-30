import Link from "next/link";

const Navbar = (props) => {
    
    return (
        <nav className="fixed right-0 left-0 bg-dark-2 py-3 align-middle">
            {props.links.map(link => 
                <Link className= 
                    "text-grey-1 px-6 tranition duration-[400ms] ease-in-out hover:text-white hover:underline-offset-[1rem] hover:underline"
                    href={link.url} 
                >
                    {link.text}
                </Link>
            )}
        </nav> 
    )
}

export default Navbar;