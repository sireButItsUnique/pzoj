import Link from "next/link";

const Navbar = (props) => {
    
    return (
        <nav className="bg-dark-2 py-3">
            {props.links.map(link => {
                return <Link className="text-grey-1 px-6 hover:text-white" href={link.url} >{link.text}</Link>;
            })}
        </nav> 
    )
}

export default Navbar;