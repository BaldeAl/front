// Navbar.js
import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton } from '@ionic/react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <IonHeader>
            <IonToolbar color="primary">
                <IonTitle>Mon App</IonTitle>
                <IonButtons slot="start">
                    <Link to="/">
                        <IonButton fill="outline" color="light">Accueil</IonButton>
                    </Link>
                </IonButtons>
                <IonButtons slot="end">
                    <Link to="/add">
                        <IonButton fill="outline" color="light">Ajouter un film</IonButton>
                    </Link>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    );
}

export default Navbar;

