import { ProjectDocument } from "@/models/Project";
import { Button } from "../ui/button";

interface Props {
  project: ProjectDocument;
  deleteProject: any;
}

const AboutProject = (props: Props) => {
  const { project } = props;

  return (
    <div className="w-full ">
      <p>{project.description}</p>
      <Button
        variant="destructive"
        className="my-5"
        onClick={props.deleteProject}
      >
        Delete Project
      </Button>
    </div>
  );
};

export default AboutProject;
