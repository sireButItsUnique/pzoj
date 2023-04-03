import Link from "next/link";
import Image from "next/image";
import Button from "./Button";

const Navbar = (props) => {
	return (
		<nav className="z-[99] fixed right-0 left-0 top-0 border-b border-border">
			<div className="relative w-full bg-dark-2 px-10 py-4 flex justify-start items-center">
				<div className="logo">
					<Image src="/images/pzoj.png" width="35" height="35" />
				</div>

				{props.links.map((link, idx) => (
					<Link
						className="text-grey-1 pl-10 transition duration-200 ease-in-out hover:text-white"
						href={link.url}
						key={idx}
					>
						{link.text}
					</Link>
				))}

				<div className="absolute right-10">
					<Button
						text="Login"
						link="/login"
						bgColor="transparent"
						textColor="blue-1"
						borderColor="blue-1"
						hoverTextColor="dark-2"
						hoverFill={true}
					/>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
