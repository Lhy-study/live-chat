import Chat from "../../layout/Chat/Chat"
import LeftSideBar from "../../layout/LeftSideBar/LeftSideBar"

LeftSideBar
const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <LeftSideBar />
        <Chat />
        {/* <h1>woshihome</h1> */}
      </div>
    </div>
  )
}
export default Home