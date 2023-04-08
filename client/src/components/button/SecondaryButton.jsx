import Link from "next/link";

const SecondaryButton = (props) => {
    const { link, target, text } = props;

    return (
        <Link
            href={link}
            target={target}
            rel={target == "_blank" && "noopener noreferrer"}
            className="border border-border text-grey-1 px-3 py-2"
        >   
            {text}
        </Link>
    );
};

export default SecondaryButton;
