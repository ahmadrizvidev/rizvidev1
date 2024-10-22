import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { db, storage } from '../../firebaseConfig';
import { useRouter } from 'next/router';

const AdminPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  
  // Overview section states
  const [totalUsersThisMonth, setTotalUsersThisMonth] = useState(0);
  const [totalActiveUsers, setTotalActiveUsers] = useState(0);

  // Add Project section states
  const [projectTitle, setProjectTitle] = useState('');
  const [projectImage, setProjectImage] = useState(null);
  const [projectURL, setProjectURL] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [projects, setProjects] = useState([]);

  // Contact Forms section states
  const [contactForms, setContactForms] = useState([]);
  const [user, setUser] = useState(null);

  const router = useRouter(); // Initialize router for redirection

  useEffect(() => {
    const auth = getAuth();
    
    // Listener for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // User is signed in
      } else {
        setUser(null); // No user is signed in
        router.push('/rizvi/login'); // Redirect to sign-in page if not authenticated
      }
    });

    const logVisit = async () => {
      try {
        await addDoc(collection(db, 'userVisits'), {
          visitTime: serverTimestamp(),
          userId: user ? user.uid : 'guest', // Log unique user ID
        });
      } catch (error) {
        console.error('Error logging visit:', error);
      }
    };

    const fetchTotalUsersThisMonth = async () => {
      try {
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const usersQuery = query(collection(db, 'userVisits'), where('visitTime', '>=', firstDayOfMonth));
        const usersSnapshot = await getDocs(usersQuery);
        setTotalUsersThisMonth(usersSnapshot.size);
      } catch (error) {
        console.error('Error fetching total users this month:', error);
      }
    };

    const fetchActiveUsers = async () => {
      try {
        const activeUsersQuery = query(collection(db, 'activeUsers'), where('sessionStart', '>=', new Date()));
        const activeUsersSnapshot = await getDocs(activeUsersQuery);
        setTotalActiveUsers(activeUsersSnapshot.size);
      } catch (error) {
        console.error('Error fetching active users:', error);
      }
    };

    const fetchProjects = async () => {
      try {
        const projectsQuery = query(collection(db, 'projects'));
        const projectsSnapshot = await getDocs(projectsQuery);
        const projectsList = projectsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log('Fetched projects:', projectsList); // Log the fetched projects
        setProjects(projectsList);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    const fetchContactForms = async () => {
      try {
        const formsQuery = query(collection(db, 'contacts'));
        const formsSnapshot = await getDocs(formsQuery);
        const formsList = formsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setContactForms(formsList);
      } catch (error) {
        console.error('Error fetching contact forms:', error);
      }
    };

    logVisit();
    fetchTotalUsersThisMonth();
    fetchActiveUsers();
    fetchProjects();
    fetchContactForms();

    const interval = setInterval(fetchActiveUsers, 60000);
    return () => {
      clearInterval(interval);
      unsubscribe(); // Cleanup the auth listener on unmount
    };
  }, [router, user]);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setIsOpen(false);
  };

  const handleImageUpload = (e) => setProjectImage(e.target.files[0]);
  const handleProjectURLChange = (e) => setProjectURL(e.target.value);
  const handleProjectTitleChange = (e) => setProjectTitle(e.target.value);

  const handleAddProject = async (e) => {
    e.preventDefault();

    if (!projectImage || !projectURL || !projectTitle) {
      alert('Please provide the image, URL, and title for the project.');
      return;
    }

    setIsUploading(true);

    const storageRef = ref(storage, `projects/${projectImage.name}`);
    const uploadTask = uploadBytesResumable(storageRef, projectImage);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error('Error uploading image:', error);
        setIsUploading(false);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await addDoc(collection(db, 'projects'), {
            title: projectTitle,
            imageUrl: downloadURL,
            projectUrl: projectURL,
            createdAt: serverTimestamp(),
          });
          alert('Project added successfully!');
          setProjectImage(null);
          setProjectURL('');
          setProjectTitle('');
          fetchProjects();
        } catch (error) {
          console.error('Error adding project:', error);
        } finally {
          setIsUploading(false);
        }
      }
    );
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await deleteDoc(doc(db, 'projects', projectId));
      alert('Project deleted successfully!');
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth); // Sign out the user
      router.push('/rizvi/login'); // Redirect to login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleContactFormClick = (form) => {
    alert(`Details:\nName: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`);
  };

  return (
    <div className="flex flex-col md:flex-row">
      {user ? (
        <>
          <button onClick={toggleMenu} className="p-4 text-gray-600 md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

          <nav className={`fixed inset-0 z-30 bg-gray-800 bg-opacity-75 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} md:relative md:opacity-100 md:pointer-events-auto`}>
            <div className={`bg-white w-64 h-full shadow-md transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
              <button onClick={toggleMenu} className="p-4 text-gray-600 md:hidden">Close</button>
              <ul className="flex flex-col p-4">
                <li className="my-2">
                  <button onClick={() => handleSectionChange('overview')} className="block w-full text-left px-4 py-2 hover:bg-gray-200">Overview</button>
                </li>
                <li className="my-2">
                  <button onClick={() => handleSectionChange('addproject')} className="block w-full text-left px-4 py-2 hover:bg-gray-200">Add Project</button>
                </li>
                <li className="my-2">
                  <button onClick={() => handleSectionChange('contactforms')} className="block w-full text-left px-4 py-2 hover:bg-gray-200">View Upcoming Contact Forms</button>
                </li>
                <li className="my-2">
                  <button onClick={() => handleSectionChange('projects')} className="block w-full text-left px-4 py-2 hover:bg-gray-200">View Projects</button>
                </li>
                <li className="my-2">
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-200">Logout</button>
                </li>
              </ul>
            </div>
          </nav>

          <main className="flex-grow p-6">
            {activeSection === 'overview' && (
              <div>
                <h2 className="text-2xl font-bold">Overview</h2>
                <p>Total Users This Month: {totalUsersThisMonth}</p>
                <p>Total Active Users: {totalActiveUsers}</p>
              </div>
            )}

            {activeSection === 'addproject' && (
              <div>
                <h2 className="text-xl font-bold">Add New Project</h2>
                <form onSubmit={handleAddProject} className="flex flex-col space-y-4">
                  <input type="text" value={projectTitle} onChange={handleProjectTitleChange} placeholder="Project Title" className="border p-2" required />
                  <input type="text" value={projectURL} onChange={handleProjectURLChange} placeholder="Project URL" className="border p-2" required />
                  <input type="file" onChange={handleImageUpload} required />
                  <button type="submit" className="bg-blue-500 text-white p-2">{isUploading ? `Uploading ${uploadProgress}%` : 'Add Project'}</button>
                </form>
              </div>
            )}

            {activeSection === 'contactforms' && (
              <div>
                <h2 className="text-xl font-bold">Contact Forms</h2>
                <ul>
                  {contactForms.map((form) => (
                    <li key={form.id} className="border-b p-2">
                      <h3 className="font-semibold">{form.name}</h3>
                      <button onClick={() => handleContactFormClick(form)} className="text-blue-500 underline">View Details</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeSection === 'projects' && (
              <div>
                <h2 className="text-xl font-bold">Projects</h2>
                {projects.length > 0 ? (
                  <ul>
                    {projects.map((project) => (
                      <li key={project.id} className="border-b p-2 flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{project.title}</h3>
                          <img src={project.imageUrl} alt={project.title} className="h-16 w-16 object-cover" />
                          <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                            {project.projectUrl}
                          </a>
                        </div>
                        <button 
                          onClick={() => handleDeleteProject(project.id)} 
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No projects available.</p>
                )}
              </div>
            )}
          </main>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AdminPage;
