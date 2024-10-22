import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Adjust the path as needed

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsCollection = collection(db, 'projects');
        const projectsSnapshot = await getDocs(projectsCollection);
        const projectsList = projectsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectsList);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="bg-gray-200 pt-20 text-center py-10">
      <h3 className='text-3xl text-gray-800 font-extrabold text-center mb-3'>
        THINGS I HAVE DESIGNED
      </h3>
      <span className='text-3xl text-[#754ef9] font-extrabold text-center'>Rate My work</span>
      <div className="min-h-fit bg-gray-200 flex justify-center items-start pt-10 py-10">
        <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0" style={{ marginTop: '50px' }}>
          {loading ? ( // Show loader while loading
            <div className="loader-container flex justify-center items-center col-span-full">
              <div className="loader"></div>
            </div>
          ) : projects.length > 0 ? (
            projects.map((project) => (
              <div className="max-w-sm bg-white px-6 pt-5 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500 prcard" key={project.id}>
                <h3 className="mt-1 mb-4 text-[#6244C5] text-2xl font-bold cursor-pointer">{project.title}</h3>
                <div className="relative mb-5">
                  <img className="w-full rounded-xl" src={project.imageUrl} alt={`Project ${project.title}`} />
                </div>
                <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="mt- text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg relative">Preview</a>
              </div>
            ))
          ) : (
            <p>No projects found.</p>
          )}
        </div>

        {/* Loader styles */}
        <style jsx>{`
          .loader-container {
            height: 100px; /* Adjust height as needed */
          }
          .loader {
            border: 8px solid rgba(255, 255, 255, 0.1);
            border-left-color: #007bff; /* Change to your desired color */
            border-radius: 50%;
            width: 50px; /* Adjust size as needed */
            height: 50px; /* Adjust size as needed */
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Projects;
