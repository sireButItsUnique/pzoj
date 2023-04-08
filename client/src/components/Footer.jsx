import SecondaryButton from './button/SecondaryButton';

const Footer = () => {
    const currYear = new Date().getFullYear();

    return (
        <footer className="text-center">
            <hr
                className="w-[20rem] m-auto border-b border-border my-[4rem]"
            />

            <SecondaryButton
                link="https://github.com/sireButItsUnique/pzoj"
                target="_blank"
                text="Github"
                bgColor="bg-dark-0"
            />
            <SecondaryButton
                link="https://devpost.com/software/pzoj"
                target="_blank"
                text="Devpost"
                bgColor="bg-dark-0"
            />

            <p className="text-grey-1">&copy; {currYear} Team PZOJ</p>
        </footer>
    );
};

export default Footer;