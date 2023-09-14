interface StepBarProps {
  actualStep: number;
}

const StepBar: React.FC<StepBarProps> = ({ actualStep }) => {
  return (
    <div className="w-full">
      <div
        className={`h-[2px] bg-green-primary transition-all ${
          actualStep === 1 ? "w-1/2" : "w-full"
        }`}
      />
    </div>
  );
};

export default StepBar;
