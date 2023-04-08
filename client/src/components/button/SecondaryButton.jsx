import Link from "next/link";

const SecondaryButton = (props) => {
    const { link, target, text, bgColor } = props;

    return (
        <Link
            href={link}
            target={target}
            rel={target == "_blank" && "noopener noreferrer"}
            class="border border-border"
        >
        
        </Link>
    );
};

export default SecondaryButton;
