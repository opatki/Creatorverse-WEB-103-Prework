import React from 'react'
import { supabase } from "../client"
import ContentCreator from '../components/ContentCreator'

export default function ShowCreators() {
    const [creators, setCreators] = React.useState([])

    React.useEffect(() => {
        fetchCreators()
    }, [])

    async function fetchCreators() {
        const { data, error } = await supabase
            .from('creators')
            .select()

        if (error) {
            console.error(error)
            return
        }
        setCreators(data)
        console.log(data)
    }

    const renderCreators = creators.map(creator => (
        <ContentCreator 
        key={creator.id}
        id={creator.id}
        name={creator.name} 
        imageUrl={creator.imageUrl}
        description={creator.description} 
        youtube={creator.youtube} 
        twitter={creator.twitter} 
        instagram={creator.instagram} 
        />
    ))

    return (
        <section className="all-creators">
            {renderCreators}
        </section>
    )
}