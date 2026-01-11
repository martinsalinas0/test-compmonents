import TablesJobList from "@/components/forList/TablesJobList";
import { jobs } from "@/lib/data/data";

const AdminJobsListPage = () => {
  return (
    <div>
      AdminJobsListPage
      <TablesJobList data={jobs} />
    </div>
  );
};

export default AdminJobsListPage;
