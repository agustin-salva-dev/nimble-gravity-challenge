import "./App.css";
import { useEffect, useState } from "react";
import { apiService } from "./services/api";
import JobCard from "./components/Jobs";

function App() {
  const [candidate, setCandidate] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const initApp = async () => {
      try {
        setLoading(true);
        const candidateData = await apiService.getCandidateByEmail(
          "salvaagustin03@gmail.com",
        );
        setCandidate(candidateData);

        const jobsData = await apiService.getJobs();
        setJobs(jobsData);
      } catch (err) {
        setError("Error al cargar los datos. Por favor intenta de nuevo.", err);
      } finally {
        setLoading(false);
      }
    };
    initApp();
  }, []);

  const handleApply = async ({ jobId, repoUrl }) => {
    try {
      const payload = {
        uuid: candidate.uuid,
        jobId: jobId,
        candidateId: candidate.candidateId,
        applicationId: candidate.applicationId,
        repoUrl: repoUrl,
      };
      const result = await apiService.applyToJob(payload);
      if (result.ok) {
        alert("¡Postulación enviada con éxito!");
        setSuccess(true);
      }
    } catch (err) {
      alert("Error al enviar la postulación. Revisa la consola.");
      console.error(err);
    }
  };

  if (loading) return <div>Cargando posiciones...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="app-container">
      <h1>Posiciones Abiertas</h1>
      {success && (
        <p style={{ color: "green", fontWeight: "bold", textAlign: "center" }}>
          ¡Postulación enviada con éxito!
        </p>
      )}
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <JobCard key={job.id} job={job} onSubmit={handleApply} />
        ))
      ) : (
        <p>No hay posiciones disponibles en este momento.</p>
      )}
    </div>
  );
}

export default App;
