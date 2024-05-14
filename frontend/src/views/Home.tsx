import { FunctionComponent } from "react";

interface HomeViewProps {}

const HomeView: FunctionComponent<HomeViewProps> = () => {
  return (
    <div className="flex-1 bg-[#F1F5F9]">
      <h2>Home page!</h2>
    </div>
  );
};

export default HomeView;
