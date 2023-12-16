import { observer } from "mobx-react-lite";
import { Button } from "@/components/ui/button";
import CustomCard from "@/components/CustomCard/CustomCard";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  
  const navigate = useNavigate();

  return (
    <div>
      <header className="w-screen flex-col justify-center py-5 border-b-4 my-5">
        <h1 className="text-4xl font-bold mb-4 overflow-hidden text-center">
          Dashboard
        </h1>
        <p className="text-lg mb-4 text-center">
          Welcome to your dashboard. Here you can find information about your
          registered homes.
        </p>
      </header>
      <div className="flex justify-end px-4">
        <Button onClick={() => navigate("/home-add")}>Add new home</Button>
      </div>
      <div className="p-4">
        <CustomCard title="Home 1" description="Home 1 description" />
      </div>
    </div>
  );
};

export default observer(Dashboard);
