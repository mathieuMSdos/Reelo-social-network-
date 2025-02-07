import { FlickeringGrid } from "./Flickering-grid";

interface FlickeringWrapperProps {
  className?: string;
}

const FlickeringWrapper = ({ className }: FlickeringWrapperProps) => {
  return (
    <div className={`w-full absolute inset-0 ${className}`}>
      <FlickeringGrid color="#9E6CEE" />
      <div
        className="absolute w-full h-full inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 60%, #FAFAFA 90%)",
        }}
      />
    </div>
  );
};

export default FlickeringWrapper;
