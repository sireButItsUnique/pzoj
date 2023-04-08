import Link from "next/link";
import Image from "next/image";
import Button from "./Button";

const Navbar = (props) => {
	return (
		<nav className="z-[99] border-b border-border fixed top-0 left-0 right-0">
			<div className="relative w-full bg-dark-2 px-10 py-4 flex justify-start items-center">
				<div className="logo">
					<Image src="/images/pzoj.png" width="35" height="35" />
				</div>

				{props.links.map((link, idx) => (
					<Link
						className="text-grey-1 pl-10 transition duration-200 ease-in-out hover:text-white-0"
						href={link.url}
						key={idx}
					>
						{link.text}
					</Link>
				))}

				<div className="absolute right-10">
					<Button
						link="/login"
						target=""
						text="Login"
						bgColor="dark-2"
					/>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
