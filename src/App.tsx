import { useRouter } from './lib/router';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Doctors from './pages/Doctors';
import Chat from './pages/Chat';

function App() {
  const { route, navigate } = useRouter();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar route={route} navigate={navigate} />
      <main className="flex-1">
        {route === 'home' && <Home navigate={navigate} />}
        {route === 'services' && <Services navigate={navigate} />}
        {route === 'doctors' && <Doctors navigate={navigate} />}
        {route === 'chat' && <Chat />}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}

export default App;
