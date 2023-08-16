
import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { IonInput, IonButton, IonLabel, IonItem, IonAlert } from '@ionic/react';
// pour ajouter un film, on utilise la mutation suivante
// on a besoin du titre, de l'année et de l'évaluation
// on récupère l'id du film créé
const ADD_MOVIE = gql`
    mutation AddMovie($title: String!, $year: Int!, $rating: Float!) {
        createMovie(title: $title, year: $year, rating: $rating) {
            _id
        }
    }
`;
// pour modifier un film, on utilise la mutation suivante (on a besoin de l'id du film)  
// on peut modifier le titre, l'année et l'évaluation
const UPDATE_MOVIE = gql`
    mutation UpdateMovie($_id: ID!, $title: String!, $year: Int!, $rating: Float!) {
        updateMovie(_id: $_id, title: $title, year: $year, rating: $rating) {
            _id
        }
    }
`;

function MovieForm({ movie, onDone }) {
    const [title, setTitle] = useState(movie ? movie.title : "");
    const [year, setYear] = useState(movie ? movie.year : "");
    const [rating, setRating] = useState(movie ? movie.rating : "");
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
     

    const [addMovie] = useMutation(ADD_MOVIE, {
        onCompleted: () => onDone && onDone()
    });

    const [updateMovie] = useMutation(UPDATE_MOVIE, {
        onCompleted: () => onDone && onDone()
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (movie && movie._id) {
            await updateMovie({ variables: { _id: movie._id, title, year: parseInt(year), rating: parseFloat(rating) } })
            .catch(error => {
                console.error(error.message);
                if (error.networkError && error.networkError.result) {
                    console.error(error.networkError.result.errors);
                }
                });
                 setAlertMessage("Film mis à jour avec succès !");
                   // alert("Film mis à jour avec succès !");
        } else {
            await addMovie({ variables: { title, year: parseInt(year), rating: parseFloat(rating) } });
        //    alert("Film ajouté avec succès !");
             setAlertMessage("Film ajouté avec succès !");
            setTitle("");
            setYear("");
            setRating("");
        }
        setShowAlert(true);
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <IonItem>
                <IonLabel position="floating">Titre:</IonLabel>
                <IonInput value={title} onIonChange={(e) => setTitle(e.detail.value)} required />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Année:</IonLabel>
                <IonInput value={year} type="number" min="1900" onIonChange={(e) => setYear(e.detail.value)} required />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Évaluation:</IonLabel>
                <IonInput value={rating} type="number" step="0.1" min="0" max="5" onIonChange={(e) => setRating(e.detail.value)} required />
            </IonItem>
            <IonButton expand="block" type="submit">{movie ? 'Modifier' : 'Ajouter'}</IonButton>
        </form>
        <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header={'Notification'}
                message={alertMessage}
                buttons={['OK']}
            />
        </>
    );
}

export default MovieForm;
