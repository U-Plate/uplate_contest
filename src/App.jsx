import { Routes, Route, Navigate, useParams } from "react-router-dom";

import DirectoryCard from "./components/DirectoryCard.jsx";
import { ContestsProvider } from "./ContestsContext";

function ContestRoute() {
  const { contestId } = useParams();
  return <DirectoryCard contestId={contestId} />;
}

export default function App() {
  return (
    <ContestsProvider>
      <main className="page shell">
        <Routes>
          <Route path="/" element={<DirectoryCard />} />
          <Route path="/:contestId" element={<ContestRoute />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </ContestsProvider>
  );
}
