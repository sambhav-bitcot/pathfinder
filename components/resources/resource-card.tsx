import { Download, LucideStickyNote } from "lucide-react";
import { Card } from "../ui/card";
import DeleteResourcesConfirmation from "./delete-resources-confirmation";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { mockResources } from "@/lib/mock-data";
import { useRouter } from "next/navigation";
type Resource = (typeof mockResources)[number];
type role = "admin" | "student" | "educator";

interface ResourceCardProps {
  resource: Resource;
  role: role;
}

export default function ResourceCard({ resource, role }: ResourceCardProps) {
  const router = useRouter();
  return (
    <Card className=" p-6">
      {/* header */}
      <div className="flex justify-between">
        <div className="flex gap-4 ">
          <div className="bg-primary/25 p-3 rounded-lg flex justify-center items-center ">
            <LucideStickyNote />
          </div>
          <div>
            <p className="font-semibold">{resource.title}</p>
            <p className="text-muted-foreground text-sm">
              {resource.description}
            </p>
          </div>
        </div>
        {/* delete  */}
        {role === "admin" && (
          <DeleteResourcesConfirmation
            resourceTitle={resource.title}
            className=" h-fit w-fit p-2 hover:bg-primary/40 rounded flex justify-center items-center"
          />
        )}
      </div>
      {/* footer */}
      <div className="flex justify-between items-center">
        {/* start */}
        <div className="flex gap-2 items-center ">
          <Badge variant={"secondary"}>{resource.category.toUpperCase()}</Badge>
          <span className="text-muted-foreground">•</span>
          <div className="text-muted-foreground text-sm">{resource.type}</div>
        </div>
        {/* end */}
        <div>
          <Button
            onClick={() => {
              router.push(`admin/uploads/${resource.id}`);
            }}
          >
            <Download /> <span>Download</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
