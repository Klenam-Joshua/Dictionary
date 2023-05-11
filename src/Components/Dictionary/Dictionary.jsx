import "./Dictionary.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Dictionary() {
  const navigate = useNavigate();
  const [word, setWord] = useState(" ");
  return (
    <div className="search_box_container_main">
      <div className="search_box_container">
        <form onSubmit={
          (e) => {
            e.preventDefault();
            navigate('/Definition/' + word)
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
  )
}