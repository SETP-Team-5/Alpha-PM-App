import { ProjectDocument } from "@/models/Project";

interface Props {
  project: ProjectDocument;
}

const AboutProject = (props: Props) => {
  const { project } = props;

  return (
    <div className="w-full">
      <p>{project.description}</p>
    </div>
  );
};

export default AboutProject;
