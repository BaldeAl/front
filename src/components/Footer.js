
import {  IonToolbar, IonFooter } from '@ionic/react';


function Footer() {
    return (
        <IonFooter>
            <IonToolbar color="primary">
                <p style={{ textAlign: 'center', margin: 0, color: 'white' }}>© Tous droits réservés, 2023</p>
            </IonToolbar>
        </IonFooter>
    );
}

export default Footer;
