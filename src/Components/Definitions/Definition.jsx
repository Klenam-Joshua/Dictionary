import "./Definition.css";
import LoadingDiv from "../LoadingDiv/LoadingDiv";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"
import styled from "styled-components";
import { useEffect, useState } from "react";


export default function Definition() {
      let search = useParams();
      const navigate = useNavigate();
      const [searchResult, setSearchResult] = useState(null)
      const [word, setWord] = useState("")
      const [notfound, setNotFound] = useState(false);
      const [error, setError] = useState(false);


      function play(audioUrl) {
            try {
                  let audio = new Audio();
                  audio.preload = 'auto'
                  // console.log(audio)
                  audio.src = audioUrl;
                  audio.play()
                  audio.volume = 1
            }
            catch (error) {
                  console.log(error)
            }
      }

      function getRegion(audioUrl) {
            let splitedUrl = audioUrl.split("/");
            //console.log(splitedUrl)
            let lastText = (splitedUrl[splitedUrl.length - 1]);
            const region = lastText.split(".")[0].split("-")[1];
            return region;
      }

      useEffect(() => {

            fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + search.word)

                  .then((response) => {

                        if (response.status === 404) {
                              setNotFound(true)
                        }


                        if (!response.ok) {
                              setError(true);
                              //return response.json()
                        }
                        else {
                              return response.json();
                        }
                  })
                  .then((result) => {
                        setSearchResult(result)
                        console.log(searchResult);
                  }
                  )


            //    console.log(searchResult)
      }, [])

      useEffect(() => {
            console.log(searchResult)
      }, [searchResult])
      //console.log(word2)
      if (notfound) {
            return (
                  <p className="text-center mt-4">please this word cannot be found</p>
            )
      }
      else if (error) {
            return (
                  <p> there was an error, please retry again</p>
            )
      }
      return (
            <>
                  <div className="search_box_container_main">
                        <div className="search_box_container">
                              <form onSubmit={
                                    (e) => {
                                          //e.preventDefault();
                                          navigate("/Definition/" + word);
                                          document.title = word;

                                    }
                              }>
                                    <input type="text" id="search_box"
                                          placeholder="search Dictionary"
                                          value={word}
                                          onChange={
                                                (event) => {
                                                      setWord(event.target.value)
                                                }
                                          }
                                    />
                                    <button className="d-none" type="submit"></button>
                              </form>
                        </div>
                  </div>
                  <div className="display_container mt-4">
                        {
                              searchResult ?
                                    <>
                                          <div>
                                                <p className="mb-3  font-italic" >meaning of {searchResult[0].word + " "}
                                                      in English
                                                </p>
                                                <hr />
                                          </div>
                                          {
                                                searchResult.map((result) => {
                                                      console.log(result)
                                                      return (
                                                            <div key={uuidv4()}>

                                                                  <h1 className="word font-2">
                                                                        {result.word}
                                                                  </h1>
                                                                  <span className="font-italic">
                                                                        {

                                                                              result.meanings[0].partOfSpeech}
                                                                  </span>
                                                                  <div className="pronunciation">
                                                                        {
                                                                              //  result.phonetics.find((phonetic)=>{
                                                                              //           if(phonetic.audio !== ""){
                                                                              //                return phonetic
                                                                              //           }
                                                                              //  });
                                                                              result.phonetics.map((phonetic) => {
                                                                                    if (phonetic.audio !== "") {
                                                                                          return (


                                                                                                <div key={uuidv4()}>
                                                                                                      <span className="region">
                                                                                                            {getRegion(phonetic.audio)}
                                                                                                      </span>

                                                                                                      <span>
                                                                                                            {phonetic.text}

                                                                                                      </span>
                                                                                                      <span >

                                                                                                            <svg
                                                                                                                  id="speaker"
                                                                                                                  onClick={() => {
                                                                                                                        play(phonetic.audio)
                                                                                                                        //alert(phonetic.audio)
                                                                                                                  }}
                                                                                                                  xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 96 960 960" width="25"><path d="M560 925v-62q97-28 158.5-107.5T780 575q0-101-61-181T560 287v-62q124 28 202 125.5T840 575q0 127-78 224.5T560 925ZM120 696V456h160l200-200v640L280 696H120Zm420 48V407q55 17 87.5 64T660 576q0 57-33 104t-87 64ZM420 408 307 516H180v120h127l113 109V408Zm-94 168Z" /></svg>
                                                                                                      </span>
                                                                                                </div>


                                                                                          )
                                                                                    }
                                                                              })
                                                                        }

                                                                  </div>
                                                                  {
                                                                        // result.meanings[0].definitions.map((definition)=>{
                                                                        //        console.log(definition.defintion)
                                                                        // })
                                                                        result.meanings[0].definitions.map((definition, index) => {
                                                                              console.log(definition)
                                                                              return (
                                                                                    <>
                                                                                          <p className="definition text-gray"  >
                                                                                                {
                                                                                                      index + 1 + ". " + definition.definition
                                                                                                }
                                                                                          </p>
                                                                                          <p>
                                                                                                {
                                                                                                      console.log(definition.example)
                                                                                                }
                                                                                          </p>
                                                                                    </>

                                                                              )
                                                                        })
                                                                  }
                                                            </div>
                                                      )
                                                })
                                          }

                                    </>

                                    :
                                    <LoadingDiv />

                        }

                  </div>
            </>
      )

}