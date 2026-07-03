import { Routes, Route, Navigate, useParams } from "react-router-dom";

import DirectoryCard from "./components/DirectoryCard.jsx";
import ReferrerCard from "./components/ReferrerCard.jsx";
import { ContestsProvider } from "./ContestsContext";

function LegacyContestRedirect() {
  const { contestId } = useParams();
  return <Navigate to={`/?contestId=${encodeURIComponent(contestId)}`} replace />;
}

export default function App() {
  return (
    <ContestsProvider>
      <main className="page shell">
        <Routes>
          <Route path="/" element={<DirectoryCard />} />
          <Route path="/refer" element={<ReferrerCard />} />
          <Route path="/:contestId" element={<LegacyContestRedirect />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </ContestsProvider>
  );
}
