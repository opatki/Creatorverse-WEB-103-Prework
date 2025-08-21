import { useEffect, useState, useRef } from 'react'
import { supabase } from '../client'
import { useNavigate } from 'react-router-dom'

export default function AddCreator() {
    const navigate = useNavigate()
    const [youtube, setYoutube] = useState("")
    const [twitter, setTwitter] = useState("")
    const [instagram, setInstagram] = useState("")
    const [error, setError] = useState("")
    const formRef = useRef(null);

    useEffect(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [])

    async function newCreator(formData) {
        if (!youtube && !twitter && !instagram) {
            setError("Please provide at least one social link.")
            return
        }
        setError("")

        const creator = {
            name: formData.get("name"),
            imageUrl: formData.get("image"),
            description: formData.get("description"),
            youtube: formData.get("youtube"),
            twitter: formData.get("twitter"),
            instagram: formData.get("instagram"),
        }
        console.log(creator)
        await supabase
            .from('creators')
            .insert(creator)
            .single()
        navigate('/')
    }

    return (
        <form action={newCreator} ref={formRef}>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" name="name" required />
            <br />

            <label htmlFor="image">Image</label>
            <p>Provide a link to an image of your creator. Be sure to include the http://</p>
            <input id="image" type="text" name="image" />
            <br />

            <label htmlFor="description">Description</label>
            <p>Provide a description of the creator. Who are they? What makes them interesting?</p>
            <textarea id="description" type="text" name="description" required ></textarea>
            <br />

            
            <h2>SOCIAL MEDIA LINKS</h2>
            <p id="normal">Provide at least one of the creator's social media links.</p>
            <div className="social">
                <i className="fa-brands fa-youtube"></i>
                <label htmlFor="youtube">YouTube</label>
            </div>
            <p>The creator's YouTube handle (without the @)</p>
            <input id="youtube" type="text" name="youtube" value={youtube} onChange={(e) => setYoutube(e.target.value)} />

            <div className="social">
                <i className="fa-brands fa-twitter"></i>
                <label htmlFor="twitter">Twitter</label>
            </div>
            <p>The creator's Twitter handle (without the @)</p>
            <input id="twitter" type="text" name="twitter" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
     
            <div className="social">
                <i className="fa-brands fa-instagram"></i>
                <label htmlFor="instagram">Instagram</label>
            </div>
            <p>The creator's Instagram handle (without the @)</p>
            <input id="instagram" type="text" name="instagram" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
            
            {error && <p style={{ color: "red" }}>{error}</p>}

            <button type="submit">SUBMIT</button>
          
        </form>
    )
}