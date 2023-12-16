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

interface CustomCardProps {
    title: string;
    description: string;
}

const CustomCard: React.FC<CustomCardProps> = ({ title, description }) => {
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Analytics</Button>
                <Button variant="outline">Home Grid</Button>
            </CardFooter>
        </Card>
    );
};

export default observer(CustomCard);