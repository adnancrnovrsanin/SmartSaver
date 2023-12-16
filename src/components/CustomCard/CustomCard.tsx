import { observer } from "mobx-react-lite";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface CustomCardProps {
    title: string;
    description: string;
    onClick?: () => void;
}

const CustomCard: React.FC<CustomCardProps> = ({ title, description, onClick }) => {
    const navigate = useNavigate();

    const changeLocation = () => {
        navigate("/analytics/13894n98-2fwe8-29wef5");
    }

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={changeLocation}>Analytics</Button>
                <Button variant="outline" onClick={onClick}>Home Grid</Button>
            </CardFooter>
        </Card>
    );
};

export default observer(CustomCard);