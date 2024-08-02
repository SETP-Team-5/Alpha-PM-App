import { auth } from "@/lib/auth";

export const ProjectList: any = async () => {
  const session = await auth();
  console.log(session);

  return <div>Project List</div>;
};

export default ProjectList;
