import { useState, useRef, useEffect } from 'react'
import { supabase } from '../client'
import { useParams, useNavigate } from 'react-router-dom'

export default function EditCreator() {
    const { id } = useParams()   // get id from URL (e.g. /creator/edit/123)
    const navigate = useNavigate()
    const [creator, setCreator] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const formRef = useRef(null)

    useEffect(() => {
        async function fetchCreator() {
            const { data } = await supabase
                .from('creators')
                .select()
                .eq('id', id)
                .single()
            setCreator(data)
        }
        fetchCreator()
        formRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [id])

    async function updateCreator(formData) {
        const updated = {
            name: formData.get("name"),
            imageUrl: formData.get("image"),
            description: formData.get("description"),
            youtube: formData.get("youtube"),
            twitter: formData.get("twitter"),
            instagram: formData.get("instagram"),
        }
        await supabase
            .from('creators')
            .update(updated)
            .eq('id', id)
        navigate(`/creator/${id}`)  
    }

    async function deleteCreator() {
        await supabase
            .from('creators')
            .delete()
            .eq('id', id)
        navigate('/')  // go back home after deleting
    }

    if (!creator) return <p>Loading...</p>

    return (
        <form action={updateCreator} ref={formRef}>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" name="name" defaultValue={creator.name}/>
            <br />

            <label htmlFor="image">Image</label>
            <p>Provide a link to an image of your creator. Be sure to include the http://</p>
            <input id="image" type="text" name="image" defaultValue={creator.imageUrl}/>
            <br />

            <label htmlFor="description">Description</label>
            <p>Provide a description of the creator. Who are they? What makes them interesting?</p>
            <textarea id="description" type="text" name="description" defaultValue={creator.description}></textarea>
            <br />

            
            <h2>SOCIAL MEDIA LINKS</h2>
            <p id="normal">Provide at least one of the creator's social media links.</p>
            <div className="social">
                <i className="fa-brands fa-youtube"></i>
                <label htmlFor="youtube">YouTube</label>
            </div>
            <p>The creator's YouTube handle (without the @)</p>
            <input id="youtube" type="text" name="youtube" defaultValue={creator.youtube}/>

            <div className="social">
                <i className="fa-brands fa-twitter"></i>
                <label htmlFor="twitter">Twitter</label>
            </div>
            <p>The creator's Twitter handle (without the @)</p>
            <input id="twitter" type="text" name="twitter" defaultValue={creator.twitter} />
     
            <div className="social">
                <i className="fa-brands fa-instagram"></i>
                <label htmlFor="instagram">Instagram</label>
            </div>
            <p>The creator's Instagram handle (without the @)</p>
            <input id="instagram" type="text" name="instagram" defaultValue={creator.instagram}/>

            <div className='bottom-btns' id="edit-page">
                <button type="submit" className="btn edit">UPDATE</button>
                <button type="button" onClick={() => setShowModal(true)} className="btn delete">DELETE</button>
            </div>

            {/* Confirmation Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>⚠️ WAIT!!!! ⚠️</h2>
                        <p>Are you sure you want to delete {creator.name}???</p>
                        <div className="modal-buttons">
                            <button className="btn cancel" onClick={() => setShowModal(false)}>
                                NAH, NEVER MIND
                            </button>
                            <button className="btn confirm" type="button" onClick={deleteCreator}>
                                YES! TOTALLY SURE
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </form>
    )
}