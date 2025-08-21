import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../client'



export default function ViewCreator() {
    const { id } = useParams()   
    const [creator, setCreator] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [showModal, setShowModal] = React.useState(false)
    const navigate = useNavigate()

    React.useEffect(() => {
        async function fetchCreator() {
            let { data, error } = await supabase
            .from('creators')
            .select()
            .eq('id', id)
            .single()

            if (error) console.error(error)
            else setCreator(data)

            setLoading(false)
        }

        fetchCreator()
    }, [id])

    function updateCreator() {
        navigate(`/edit/${creator.id}`)
    }

    async function deleteCreator() {
            await supabase
                .from('creators')
                .delete()
                .eq('id', id)
            navigate('/')  // go back home after deleting
        }

    if (loading) return <p>Loading...</p>
    if (!creator) return <p>Creator not found</p>

    return (
        <section className="creator-page">
            <div className="creator-content">
                <img src={creator.imageUrl || '../../assets/Empty.png'} />
                <div className="creator-info">
                    <h1>{creator.name.toUpperCase()}</h1>
                    <p className="desc">{creator.description}</p>
                    {creator.youtube ? <div className="icon-container">
                        <i className="fa-brands fa-youtube"></i>
                        <p>@{creator.youtube}</p>
                    </div>: null}
                    {creator.twitter ? <div className="icon-container">
                        <i className="fa-brands fa-twitter"></i>
                        <p>@{creator.twitter}</p>
                    </div>: null}
                    {creator.instagram ? <div className="icon-container">
                        <i className="fa-brands fa-instagram"></i>
                        <p>@{creator.instagram}</p>
                    </div>: null}
                </div>
            </div>
            <div className='bottom-btns'>
                <button className="btn edit" onClick={updateCreator}>EDIT</button>
                <button className="btn delete" onClick={() => setShowModal(true)}>DELETE</button>
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
                            <button className="btn confirm" onClick={deleteCreator}>
                                YES! TOTALLY SURE
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}