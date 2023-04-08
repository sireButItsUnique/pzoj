import Link from "next/link";

const PrimaryButton = (props) => {
	const { link, target, text, bgColor } = props;

	return (
		<Link
			href={link}
			target={target}
			rel={target == "_blank" && "noopener noreferrer"}
			className="bg-blue-1 px-3 py-2"
		>
			{text}
		</Link>
	);
};

export default PrimaryButton;
