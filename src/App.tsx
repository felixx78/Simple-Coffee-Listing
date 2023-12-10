import bg from "./assets/bg-cafe.jpg";
import Home from "./pages/Home";

function App() {
  return (
    <div className="text-body min-h-screen bg-[#121315] pb-20 font-semibold text-[#FEF7EE]">
      <div className="">
        <img src={bg} className="min-h-[150px]" alt="" />
      </div>

      <div>
        <Home />
      </div>
    </div>
  );
}

export default App;
