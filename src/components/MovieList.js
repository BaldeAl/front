import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client"; 

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IonHeader,IonAlert, IonToast,IonToolbar , IonTitle, IonContent, IonSearchbar,IonCol, IonItem, IonLabel, IonButton, IonCard, IonCardHeader, IonCardContent, IonGrid, IonRow } from '@ionic/react';
import StarRating from "./StartRating";


const GET_MOVIES = gql`
    query GetMovies {
        getMovies {
            _id
            title
            rating
            year
        }
    }
`;

const DELETE_MOVIE = gql`
    mutation DeleteMovie($_id: ID!) {
        deleteMovie(_id: $_id) {
            _id
            title
        }
    }
`;

function MovieList() {
    const { loading, error, data } = useQuery(GET_MOVIES, {
        fetchPolicy: "network-only"
        });
    const defaultMovie = {
        title:"Grey Man",
        year:2022,
        rating:4.7
    };
   
    const [searchTerm, setSearchTerm] = useState('');

    if (loading) return <p>Chargement des films...</p>;
    if (error) return <> <p>Erreur lors de la récupération des films: {error.message}</p> 
                        <IonItem>
                                <IonCard>
                                    <IonCardHeader>
                                        <IonLabel>{defaultMovie.title}</IonLabel>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <p>Année: {defaultMovie.year}</p>
                                        <p>Évaluation: <StarRating rating={defaultMovie.rating}/> </p>
                                        <IonButton expand="full" >Modifier</IonButton>
                                        <IonButton expand="full" color="danger">Supprimer</IonButton>
                                    </IonCardContent>
                                </IonCard>
                            </IonItem>
                      </>;

    const filteredMovies = data.getMovies.filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase()));
    return (
         <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Liste des films</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonSearchbar 
                    value={searchTerm}
                    onIonChange={e => setSearchTerm(e.detail.value)}
                    placeholder="Recherche par nom..."
                />
                
                <IonGrid>
                    <IonRow>
                        {filteredMovies.map(movie => (
                            <IonCol size="12" size-sm="6" size-md="4" key={movie._id}>
                                <>
                                    <MovieItem key={movie._id} movie={movie} />
                                 </>
                            </IonCol>
                         ))}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </>
    );
}

function MovieItem({ movie }) {
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

   const [deleteMovie] = useMutation(DELETE_MOVIE, {
        update(cache, { data: { deleteMovie } }) {
            const currentData = cache.readQuery({ query: GET_MOVIES });
            const updatedMovies = currentData.getMovies.filter(m => m._id !== deleteMovie._id);
            cache.writeQuery({
                query: GET_MOVIES,
                data: { getMovies: updatedMovies },
            });
        }    });

    const navigate = useNavigate();

    const handleDelete = async () => {
        setAlertMessage('Voulez-vous vraiment supprimer ce film?');
         setShowAlert(true)
    };

    const handleEdit = () => {
        console.log("Modifier le film", movie._id);
        navigate(`/update/${movie._id}`);
    };

    return (
        <>
        <IonItem>
            <IonCard>
                <IonCardHeader>
                    <IonLabel>{movie.title}</IonLabel>
                </IonCardHeader>
                <IonCardContent>
                    <p>Année: {movie.year}</p>
                    <p>Évaluation: <StarRating rating={movie.rating}/> </p>
                    <IonButton expand="full" onClick={handleEdit}>Modifier</IonButton>
                    <IonButton expand="full" color="danger" onClick={handleDelete}>Supprimer</IonButton>
                </IonCardContent>
            </IonCard>
        </IonItem>
         <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header={'Confirmation'}
                message={alertMessage}
                buttons={[
                    {
                        text: 'Annuler',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                            setShowAlert(false);
                        }
                    },
                    {
                        text: 'Supprimer',
                        handler: async () => {
                            try {
                                await deleteMovie({ variables: { _id: movie._id } });
                                setAlertMessage("Film supprimé avec succès !");
                                setShowAlert(false);
                                setShowToast(true);
                            } catch (error) {
                                setAlertMessage(`Erreur lors de la suppression du film : ${error.message}`);
                                setShowAlert(false);
                                setShowToast(true);
                            }
                        }
                    }
                ]}
            />
            <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message={alertMessage}
            duration={2000} // Le toast sera affiché pendant 2 secondes.
        />

        </>
    );
}

export default MovieList;
