import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import PrimaryButton from "./button/PrimaryButton";

function tokenName() {
	if (typeof window === "undefined")
		return null;
	let token = localStorage.getItem("token");
	if (!token)
		return null;
	token = token.split(".")[0];
	token = JSON.parse(atob(token));
	if (parseInt(token.expiration) * 1000 < Date.now())
		return null;
	return token.username;
}

const Navbar = (props) => {
	const [username, setUsername] = useState(null);

	useEffect(() => {
		let newusername = tokenName();
		if (newusername === null) {
			localStorage.removeItem("token");
			return;
		}
		setUsername(newusername);
	}, []);

	return (
		<nav className="z-[99] border-b border-border fixed top-0 left-0 right-0">
			<div className="relative w-full bg-dark-2 px-10 py-4 flex justify-start items-center">
				<div className="logo">
					<Link
						href="/"
						className="opacity-100 transition duration-200 hover:opacity-70"
					>
						<Image src="/images/pzoj.png" width="35" height="35" />
					</Link>
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
					{
						(username === null) ?
							(<PrimaryButton
								link="/account"
								target="_self"
								text="Login"
								bgColor="dark-2"
							/>) : (<PrimaryButton
								link="/"
								target="_self"
								bgColor="dark-2"
								text={`Logout ${username}`}
								onClick={() => {
									localStorage.removeItem("token");
									setUsername(null);
								}}
							/>)
					}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
