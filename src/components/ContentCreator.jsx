import { Link } from 'react-router-dom'

export default function ContentCreator({ name, description, imageUrl, id, youtube, twitter, instagram}) {

    const styles = {
        backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imageUrl ? imageUrl : "../../assets/Empty.png"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
    }

    return (
        <section style={styles} className="content-creator">
            <div className="main-info bright">
                <h2>{name.toUpperCase()}</h2>
                <div>
                    <Link to={`/creator/${id}`}><i className="fa-solid fa-circle-info"></i></Link>
                    <Link to={`/edit/${id}`}><i className="fa-solid fa-pen"></i></Link>
                </div>
            </div>
            <div className="socials bright">
                <a href={`https://www.youtube.com/@${youtube}`} target="_blank">
                    <i className="fa-brands fa-youtube"></i>
                </a>
                <a href={`https://x.com/${twitter}`} target="_blank">
                    <i className="fa-brands fa-twitter"></i>
                </a>
                <a href={`https://www.instagram.com/${instagram}`} target="_blank">
                    <i className="fa-brands fa-instagram"></i>
                </a>
            </div>
            <p className="description bright">{description}</p>
        </section>
    )
}