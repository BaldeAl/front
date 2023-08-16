
import React from "react";
import MovieForm from "./MovieForm";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { IonHeader, IonToolbar, IonTitle } from '@ionic/react';

const GET_MOVIE_BY_ID = gql`
    query GetMovieById($id: ID!) {
        getMovie(id: $id) {
            _id
            title
            year
            rating
        }
    }
`;
// Composant pour mettre à jour un film
function UpdateMovie() {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_MOVIE_BY_ID, {
        variables: { id },
    }); // Récupération du film à partir de son id
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <div>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Mettre à jour le film</IonTitle>
                </IonToolbar>
            </IonHeader>
            <>
                <MovieForm movie={data.getMovie} />
            </>
        </div>
    );
}

export default UpdateMovie;
