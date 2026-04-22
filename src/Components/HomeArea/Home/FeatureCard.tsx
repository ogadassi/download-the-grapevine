import { SvgIconProps } from "@mui/material";
import React from "react";

interface FeatureCardProps {
  icon: React.ReactElement<SvgIconProps>;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps): JSX.Element {
  return (
    <div className="FeatureCard">
      <div className="FeatureCard-icon">
        {icon}
      </div>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
}

export default FeatureCard;
