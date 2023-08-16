import React from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
export default function StarRating({ rating }) {
  const MAX_RATING = 5; // 5 est la note maximale
  let stars = [];

  for (let i = 0; i < MAX_RATING; i++) {
    if (rating > i + 0.75) {
      stars.push(<span key={i}><BsStarFill/></span>);  // étoile pleine
    } 
    else if (rating > i + 0.25) {
      stars.push(<span key={i}><BsStarHalf/></span>);  // demi-étoile
    }
    else {
      stars.push(<span key={i}><BsStar/></span>);  // étoile vide
    }
  }

  return <div>{stars}</div>;
}
