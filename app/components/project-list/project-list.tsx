import { auth } from "@/lib/auth";

export const ProjectList: any = async () => {
  const session = await auth();

  return <div>Project List</div>;
};

export default ProjectList;
