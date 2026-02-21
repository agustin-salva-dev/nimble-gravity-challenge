import { useState } from "react";
import "./Jobs.css";

const JobCard = ({ job, onSubmit }) => {
  const [repoUrl, setRepoUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!repoUrl) {
      alert("Por favor, ingresa la URL de tu repositorio");
      return;
    }
    onSubmit({ jobId: job.id, repoUrl: repoUrl });
  };

  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <form onSubmit={handleSubmit} className="job-form">
        <input
          type="url"
          placeholder="URL del repositorio (GitHub)"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <hr />
    </div>
  );
};

export default JobCard;
