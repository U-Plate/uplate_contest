import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { findPerson } from "./data/team.js";
import DirectoryCard from "./components/DirectoryCard.jsx";
import PersonCard from "./components/PersonCard.jsx";

function PersonRoute() {
  const { slug } = useParams();
  const person = findPerson(slug);
  if (!person) return <Navigate to="/" replace />;
  return <PersonCard person={person} />;
}

export default function App() {
  return (
    <main className="page shell">
      <Routes>
        <Route path="/" element={<DirectoryCard />} />
        <Route path="/:slug" element={<PersonRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}
