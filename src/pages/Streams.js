import React, { useEffect, useState } from "react";
import AuthNavbar from "../Components/Navbar/AuthNavbar";
import { gql, useQuery } from "@apollo/client";
import "./Streams.css"
import { Link } from "react-router-dom";

//Requête Apollo qui liste le contenu de la table streams
const LIST_STREAMS = gql`
  query {
    streams {
      _id
      stream_url
      stream_support
    }
  }
`;

export default function Streams() {
  const { loading, error, data } = useQuery(LIST_STREAMS);
  const [dataTwitch, setDataTwitch] = useState([]);
  //Hook qui permet declencher une fonction asynchrone lorsque l'état du composant change
  useEffect(() => {
    // Objet des paramêtre de la requête
    const requestInit = {
      method: "GET",
      headers: {
        "Client-Id": "tk7kkf31oibovpw35uqocv2jm6557p",
        Authorization: "Bearer ygs8705ohztp9kthn5gmbnt054lnoh",
      },
    };
    // On vérifie si data n'est true (n'est pas vide)
    if (data) {
      const login = (string) => {
        const login = data.streams
          .map((element) => element.stream_url)
          .join(`&${string}=`);
        return login;
      };
      // On fait une requete fetch à l'api de twitch streams et users
      const fetchTwitch = async () => {
        const responseStreams = await fetch(
          `https://api.twitch.tv/helix/streams?user_login=${login(
            "user_login"
          )}`,
          requestInit
        );
        const resultStreams = await responseStreams.json();
        const responseUsers = await fetch(
          `https://api.twitch.tv/helix/users?login=${login("login")}`,
          requestInit
        );
        const resultUsers = await responseUsers.json();
        //Déclaration d'un tableau vide pour récupérer tous les valeurs de streams et users
        const dataUser = [];
        for (const user in resultUsers.data) {
          for (const stream in resultStreams.data) {
            if (
              resultUsers.data[user].id === resultStreams.data[stream].user_id
            ) {
              dataUser.push({
                ...resultUsers.data[user],
                ...resultStreams.data[stream],
                stream_id: resultStreams.data[stream].id,
              });
            }
          }
        }
        setDataTwitch(dataUser);
      };
      fetchTwitch();
    }
  }, [data]);

  if (loading) return <div>Chargment ...</div>;
  if (error)
    return <div>Impossible d'afficher la page une Erreur est survenue...</div>;
  if (!data) return <div>Aucune données</div>;
  return (
    <>
      <AuthNavbar />
      <h1>Listes des Streams</h1>
      {/* Container de la card */}
      <div className="container-grid">
        {/* On vérifie la présence de données dans dataTwitch si ok on boucle pour afficher toutes les valeurs */}
        {dataTwitch &&
          dataTwitch.map((el, index) => (
            <div className="card-container" key={el.id}>
            {/* Entête de la card */}
              <div className="card-header">
                <div className="card-header-avatar">
                  <img src={el.profile_image_url} alt="" className="avatar" />
                </div>
                <div className="postTitle">
                  <Link key={index} to={`/streams/${el.user_name}`}>
                  <p className="user-name">{el.user_name}</p>
                  </Link>
                  <p className="game-name">{el.game_name} </p>
                </div>
              </div>
              {/* Corp de la card */}
              <div className="card-body">
                <Link key={index} to={`/streams/${el.user_name}`}>
                  <div className="container-background">
                    <img
                      src={el.thumbnail_url.replace(
                        "{width}x{height}",
                        "300x170"
                      )}
                      alt="img"
                    />
                    <div className="stream-live">
                      <p>{el.type}</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
