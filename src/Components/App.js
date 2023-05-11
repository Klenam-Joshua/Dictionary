import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header/Header";
import Dictionary from "./Dictionary/Dictionary";
import "../assets/styles/global.css";
import Definition from "./Definitions/Definition";

export default function App() {

   return (
      <BrowserRouter>
         <Header>
            <Routes>
               <Route path="/" element={<Dictionary />} />
               <Route path="/Definition/:word" element={<Definition />} />
            </Routes>
         </Header>
      </BrowserRouter>
   )

}