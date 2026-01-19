import MyCard from "@/components/cards/MyCard";

const GridLayoutTemplate = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MyCard />
        <MyCard />
        <MyCard />
      </div>
    </div>
  );
};

export default GridLayoutTemplate;
