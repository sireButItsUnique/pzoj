import SecondaryButton from './button/SecondaryButton';

const Footer = () => {
    const currYear = new Date().getFullYear();

    return (
        <footer className="text-center">
            <hr
                className="w-[20rem] m-auto border-b border-border mt-[4rem] mb-[2rem]"
            />

            <span className="mr-2">
                <SecondaryButton
                    link="https://github.com/sireButItsUnique/pzoj"
                    target="_blank"
                    text="Github"
                    bgColor="bg-dark-0"
                />
            </span>

            <span className="ml-2">
                <SecondaryButton
                    link="https://devpost.com/software/pzoj"
                    target="_blank"
                    text="Devpost"
                    bgColor="bg-dark-0"
                />
            </span>

            <p className="text-grey-1 mt-[1.5rem] pb-6">&copy; {currYear} Team PZOJ</p>
        </footer>
    );
};

export default Footer;