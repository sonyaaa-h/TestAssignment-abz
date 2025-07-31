import s from "./Hero.module.css";

const Hero = () => {
    return (
        <div className={s.hero}>
            <div className={s.infoWrap}>
                <h1 className={s.title}>Test assignment for front-end developer</h1>
                <p className={s.heroText}>
                    What defines a good front-end developer is one that has skilled
                    knowledge of HTML, CSS, JS with a vast understanding of User design
                    thinking as they'll be building web interfaces with accessibility in
                    mind. They should also be excited to learn, as the world of Front-End
                    Development keeps evolving.
                </p>
                <a href="#" className={s.heroLink}>Sign up</a>
            </div>
        </div>
    );
};
export default Hero;
