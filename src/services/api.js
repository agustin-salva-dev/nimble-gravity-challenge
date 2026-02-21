const BASE_URL =
  "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net/api";

export const apiService = {
  getCandidateByEmail: async (email) => {
    try {
      const response = await fetch(
        `${BASE_URL}/candidate/get-by-email?email=${email}`,
      );
      if (!response.ok) throw new Error("Error al obtener datos del candidato");
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getJobs: async () => {
    try {
      const response = await fetch(`${BASE_URL}/jobs/get-list`);
      if (!response.ok) throw new Error("Error al obtener posiciones");
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  applyToJob: async (data) => {
    try {
      const response = await fetch(`${BASE_URL}/candidate/apply-to-job`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Error al enviar la postulación");
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
