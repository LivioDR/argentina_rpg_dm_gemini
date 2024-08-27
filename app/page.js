import Header from "./components/Header";
import Footer from "./components/Footer";
import MainScreen from "./components/MainScreen";

export default function Home({firebaseId = "qwertyuiop"}) {

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100vh',
      width: '100vw',
      backgroundImage: 'url(./background.jpeg)'
    }}>
      <Header/>
      <MainScreen firebaseId={firebaseId}/>
      <Footer/>
    </div>  
  );
}
