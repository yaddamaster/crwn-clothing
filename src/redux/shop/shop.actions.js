import ShopActionTypes from './shop.types';

import {
    firestore,
    convertCollectionsSnapshotToMap
  } from '../../firebase/firebase.utils';
  
  export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
  });
  
  export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
  });
  
  export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
  });

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart()); //async

        // REST PATTERN
        // fetch('https://firestore.googleapis.com/v1/projects/crwn-db-da56b/databases/(default)/documents/collections'
        // )
        //     .then(response => response.json())
        //     .then(collections => console.log(collections));

        //PROMISE PATTERN
        collectionRef
            .get()
            .then(snapshot => {
                const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
                dispatch(fetchCollectionsSuccess(collectionsMap));
        })
        .catch(error => dispatch(fetchCollectionsFailure(error.message)));
        
        // OBSERVABLE PATTERN
        // this.unsubscriptFromSnapshot = collectionRef.onSnapshot(async snapshot => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     updateCollections(collectionsMap);
        //     this.setState({ loading: false });
        // });
    }
}

