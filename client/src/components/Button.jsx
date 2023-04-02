import Link from "next/link";

const Button = (props) => {
	// text color, href, color of background (default), color of text (default), color of text (on hover), color of border, hoverFill (true / false)
	const {
		text,
		link,
		bgColor,
		textColor,
		borderColor,
		hoverTextColor,
		hoverFill,
	} = props;

	return (
		<Link
			className={`bg-${bgColor} text-${textColor} px-4 py-2 transition duration-200 ease-in-out border rounded border-${borderColor} ${
				hoverFill &&
				`hover:text-${hoverTextColor} hover:bg-${textColor}`
			}`}
			href={link}
		>
			{text}
		</Link>
	);
};

export default Button;
